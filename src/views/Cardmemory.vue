<template>
    <div>
      <h1>カードメモリーゲーム</h1>
      <button v-if="!gameStarted" class="btn btn-outline-secondary mb-3" @click="customUseImg">カスタムイメージ使用</button>
      <div v-if="!gameStarted">
        <button class="btn btn-outline-primary mb-3" @click="startGame">スタート</button>
      </div>
      <div v-else>
        <div>
          <p>トータル点数: {{ totalScore }}</p>
          <p>残り時間　: {{ timeRemaining }}秒</p>
        </div>
        <div class="grid grid-cols-4 gap-y-8 justify-items-center" v-if="gameStarted">
          <div v-for="(card, index) in cards" :key="index">
            <div class="card" :class="{ flipped: card.visible }" @click="handleCardClick(index)"
              :style="{ pointerEvents: clickable ? 'auto' : 'none' }">
              <div class="card-front" :style="{ visibility: card.visible ? 'visible' : 'hidden' }">
                <img :src="card.value" alt="카드 앞면" :style="{ width: cardImageWidth, height: cardImageHeight }">
              </div>
              <div class="card-back" :data-number="card.value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            gameStarted: false,
            timeRemaining: 60,
            totalScore: 0,
            overGame: false,
            cards: [],
            flippedCards: [],
            cardValues: [],
            clickable: true,
            game_id: 1,
            cuslist: '',
            realcard: '',
            selectedFile: null,
            cardImageWidth: '100px', // 초기 이미지 너비 설정
            cardImageHeight: '140px', // 초기 이미지 높이 설정
        };
    },
    computed: {
        shuffledCardValues() {
            return this.shuffleArray(this.cardValues.slice());
        }
    },
    mounted() {
        this.getCard()
    },
    methods: {
        resizeImage(newWidth, newHeight) {
            this.cardImageWidth = newWidth;
            this.cardImageHeight = newHeight;
        },
        startGame() {
            this.gameStarted = true;
            this.timeRemaining = 60;
            this.totalScore = 0;
            /* while (this.shuffledCardValues.length < 16) {
                this.shuffledCardValues.pop()
            } */
            this.cards = this.shuffledCardValues.slice(0,8).map(value => ({
                value,
                visible: true
            }));
            setTimeout(() => {
                this.cards.forEach(card => {
                    card.visible = false;
                });
                this.clickable = true;
            }, 5000);
            this.startTimer()
            this.clickable = false;
        },
        startTimer() {
            let startTime = Date.now();
            let intervalID = setInterval(() => {
                this.postGameOver();
            }, 59990);

            this.timer = setInterval(() => {
                const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
                this.timeRemaining = Math.max(0, 60 - elapsedTime);
                if (this.timeRemaining === 0) {
                    clearInterval(this.timer);
                    clearInterval(intervalID); // clear interval here
                    this.gameOver();
                }
            }, 100);
        },
        shuffleArray(array) {
            let currentIndex = array.length;
            let temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        handleCardClick(index) {
            if (!this.gameStarted || !this.clickable) {
                return;
            }

            const card = this.cards[index];

            if (card.visible || this.flippedCards.length === 2) {
                return;
            }

            card.visible = true;

            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.checkForMatch();
            }
        },
        checkForMatch() {
            const card1 = this.flippedCards[0];
            const card2 = this.flippedCards[1];

            if (card1.value === card2.value) {
                this.totalScore += 10;

                const numMatches = this.cards.filter(card => card.visible).length / 2;

                if (numMatches === this.cardValues.length / 2) {
                    this.postGameOver();
                    let intervalID = setInterval(() => {
                        this.gameOver();
                    }, 1000);
                }

                this.clickable = false;
                setTimeout(() => {
                    this.flippedCards = [];
                    this.clickable = true;
                }, 1000);
            } else {
                setTimeout(() => {
                    card1.visible = false;
                    card2.visible = false;
                    this.flippedCards = [];
                }, 1000);
            }
        },
        gameOver() {
            this.gameStarted = false;
            this.$router.go(0);
        },
        async postGameOver() {
            try {
                await this.$store.dispatch("game/storeScore", {
                    game_id: 1,
                    score: this.totalScore
                });
            } catch (err) {
                console.error(err);
            }
        },
        async customUseImg() {
            try {
                const cuslist = await this.$store.dispatch("game/indexCustomImg", this.game_id);
                this.cuslist = cuslist;

                // 커스텀 이미지를 카드에 적용
                for (let i = 0; i < this.cuslist.length; i++) {
                    this.cardValues[2 * i] = this.cuslist[i].imgpath;
                    this.cardValues[2 * i + 1] = this.cuslist[i].imgpath;
                }
            } catch (err) {
                console.error(err);
            }
        },
        async getCard() {
            try {
                const cuslist = await this.$store.dispatch("game/indexImg", this.game_id);
                console.log(cuslist);
                this.realcard = cuslist;

                // 게임 이미지를 카드에 적용
                for (let i = 0; i < this.realcard.data.length; i++) {
                    this.cardValues[2 * i] = this.realcard.data[i].imgpath;
                    this.cardValues[2 * i + 1] = this.realcard.data[i].imgpath;
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
}
</script>

<style>
.card-front img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지 비율 유지 */
}

.card-front {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.card-container {
    perspective: 1000px;
}


.card-back {
    transform: rotateY(180deg);
    background-color: #ff8686;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.card.flipped {
    transform: rotateY(180deg);
}
</style>
