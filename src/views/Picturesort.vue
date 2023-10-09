<template>
  <div class="container">
    <h1>絵を分けて見よう!</h1>
    <div v-if="!gameStarted">
      <button @click="startGame">スタート</button>
    </div>
    <div v-else>
      <div class="score">点数: {{ score }}</div>
      <div class="picture">
        <img :src="currentPicture.imgpath" :alt="currentPicture.name" />
      </div>
      <div class="buttons">
        <button
          v-for="(category, index) in categories"
          :key="index"
          @click="checkAnswer(currentPicture, category)"
          :disabled="isNextDisabled"
        >
          {{ category }}
        </button>
      </div>
      <div v-if="answerMessage" class="answer">
        <h2>{{ answerMessage }}</h2>
      </div>
      <div v-else-if="answer[current] === '정답'" class="answer">
        <h2>正解です!</h2>
        <button @click="nextCategory">次のカテゴリー</button>
      </div>
      <div v-if="answer[current] === '틀림'" class="answer">
        <h2>はずれです</h2>
      </div>
      <div v-if="wrongCount === 3" class="modal">
        <div class="modal-content">
          <h2>ゲームが終了しました。</h2>
          <p>最終点数: {{ score }}</p>
          <button @click="restartGame">やり直す</button>
        </div>
      </div>
      <div
        v-if="wrongCount === 3 && gameOver === true"
        class="modal-backdrop"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pictures: [],
      categories: ["spring", "summer", "autumn", "winter"],
      answer: ["", "", "", ""],
      current: 0,
      answerMessage: "",
      score: 0,
      game_id: 1,
      wrongCount: 0,
      gameStarted: false,
      isNextDisabled: false,
      gameOver: false,
    };
  },
  created() {
    this.current = Math.floor(Math.random() * this.categories.length);
  },
  computed: {
    currentPicture() {
      return this.pictures[this.current];
    },
    currentCategory() {
      return this.categories[this.current];
    },
  },
  methods: {
    async startGame() {
      await this.getImg();
      this.gameStarted = true;
    },
    async checkAnswer(picture, category) {
      if (picture.contentcategories.name === category) {
        this.answerMessage = "正解です!";
        this.score += 10;
        this.isNextDisabled = true;

        // 타이머를 설정하고 ID를 저장합니다.
        this.answerTimeoutId = setTimeout(() => {
          this.answerMessage = "";
          this.answer[this.current] = "正解";
        }, 1000);
      } else {
        this.answerMessage = "はずれです!";
        this.wrongCount++;
        if (this.wrongCount === 3) {
          this.gameOver = true;
          await this.postGameOver();
        }
        // 이전에 설정한 타이머를 취소합니다.
        clearTimeout(this.answerTimeoutId);
      }
    },
    nextCategory() {
      let newCategory = this.current;
      while (newCategory === this.current) {
        newCategory = Math.floor(Math.random() * this.categories.length);
      }
      this.current = newCategory;
      this.answer = ["", "", "", ""];
      this.isNextDisabled = false;
    },

    async postGameOver() {
      try {
        this.gameOver = true;
        await this.$store.dispatch("game/storeScore", {
          game_id: 1,
          score: this.score,
        });
      } catch (err) {
        console.error(err);
      }
    },

    async getImg() {
      try {
        const rq = await this.$store.dispatch("game/indexImg", this.game_id);
        this.pictures = rq.data;
      } catch (error) {
        console.error(error);
      }
    },

    restartGame() {
      this.answerMessage = "";
      this.score = 0;
      this.wrongCount = 0;
      this.gameStarted = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #1abc9c;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #16a085;
}

.picture {
  margin-top: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.answer {
  margin-top: 2rem;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

button.next {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button.next:hover {
  background-color: #2980b9;
}

button[disabled] {
  opacity: 0.5;
  background-color: gray;
  cursor: not-allowed;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: block; /* 모달백드랍 스타일에서 display 값을 block으로 변경 */
}
</style>
