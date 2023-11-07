<template>
    <div>
        <canvas class="rounded-4 border border-success p-2 mb-2 border-opacity-75" ref="canvas"></canvas>
        <div v-if="isFinished" class="game-finished">
            <h2>おめでとうございます!</h2>
            <p>全問正解です.</p>
            <button class="btn btn-outline-secondary mb-3" v-if="isFinished" @click="completePage">やり直す</button>
        </div>
        <div v-if="this.typed" class="d-flex flex-column align-items-center">
            <input class="form-control mb-2 rains-container" type="text" :value="this.typed"
                aria-label="Disabled input example" disabled readonly />
        </div>
        <button class="btn btn-outline-primary mb-3" v-if="!isStarted && !isFinished" @click="startGame">スタート</button>
        <button class="btn btn-outline-secondary mb-3" v-if="isGameOver" @click="restartGame">やり直す</button>
    </div>
</template>

<script>
import { toHandlers } from 'vue';
import { useRouter } from 'vue-router';
export default {
    data() {
        return {
            targets: [],
            typed: '',
            score: 0,
            speed: 0.2,
            targetsPerSecond: 1,
            level: 1,
            width: 0,
            height: 0,
            targetsX: [],
            targetsY: 0,
            targetsWidth: 50,
            targetsHeight: 50,
            font: '24px sans-serif',
            isGameOver: false,
            isStarted: false,
            recognition: null,
            recognitionSupported: false,
            targetsPerSecond: 0.3, // 1초에 targets가 떨어지는 개수
            targetsInterval: null,
            isFinished: false,
            word: [],
            isScorePosted: false // 최종 점수가 서버에 전송되었는지 여부를 나타내는 변수
        };
    },
    mounted() {
        this.getWord()
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        this.isScorePosted = false;
        this.width = canvas.width = 800;
        this.height = canvas.height = 600;
        this.isFinished = false
        this.recognitionSupported = 'webkitSpeechRecognition' in window;
        // targetsX 배열을 초기화합니다.
        this.targetsX = Array.from({ length: this.targets.length }, () => Math.random() * (this.width - this.targetsWidth));
        this.targetsInterval = setInterval(() => {
            this.targetsX = Array.from({ length: this.targets.length }, () => Math.random() * (this.width - this.targetsWidth));
            this.targetsY = -100;
        }, 10000 / this.targetsPerSecond);
        const router = useRouter();
        this.router = router
        setInterval(() => {
            this.moveTargets();
        }, 1000000 / this.targetsPerSecond);
        if (this.recognitionSupported) {
            console.log('음성인식');
            this.recognition = new webkitSpeechRecognition();
            this.recognition.lang = 'ja-JP';
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.onresult = null;
            this.recognition.onresult = event => {
                const result = event.results[event.results.length - 1];
                const word = result[0].transcript.trim();
                if (result.isFinal) {
                    this.typed = word.replace(/。$/, ''); // 마침표 제거
                } else {
                    // show interim results
                    this.typed = this.typed.replace(/(\s+\S+)?\。$/, ` ${word}`);
                    console.log(this.typed)
                    return; // 이 부분을 추가하여 더 이상 함수를 진행하지 않도록 합니다.
                }
            };
            this.recognition.onerror = error => {
                console.error(error);
            };
        } else {
            console.warn('Speech recognition is not supported in this browser.');
        }
        const loop = () => {
            if (this.isGameOver) {
                this.drawGameOver(ctx);
                return this.postGameOver();
            }
            ctx.clearRect(0, 0, this.width, this.height);
            this.moveTargets();
            this.drawTargets(ctx);
            this.checkCollisions();
            this.drawScore(ctx);
            if (this.isStarted) {
                requestAnimationFrame(loop);
            }
            if (this.isScorePosted && this.targets.length === 0) {
                this.completeWord(ctx)
            }
        };
        this.loop = loop;
        requestAnimationFrame(this.loop);
    },
    methods: {
        shuffle(array) {
            let currentIndex = array.length;
            let temporaryValue, randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        },
        startGame() {
            if (this.level === 1) {
                const numTargetsToAdd = 7;
                for (let i = 0; i < numTargetsToAdd; i++) {
                    let randomIndex;
                    do {
                        randomIndex = Math.floor(Math.random() * this.word.length);
                    } while (this.targets.includes(this.word[randomIndex].word))
                    this.targets.push(this.word[randomIndex].word);
                }
                this.shuffle(this.targets);
                console.log(this.targets);
            }
            this.isStarted = true;
            this.targetsY = -100;
            this.isGameOver = false;
            this.score = 0;
            this.typed = '';
            this.isFinished = false; // 추가
            if (this.recognitionSupported && !this.recognition.running) {
                this.recognition.start();
            }
            // targetsX 배열을 초기화합니다.
            this.targetsX = Array.from({ length: this.targets.length }, () => Math.random() * (this.width - this.targetsWidth));
            requestAnimationFrame(this.loop);
        },
        restartGame() {
            this.$router.go(0)
        },
        getRandomTarget() {
            return this.targets[Math.floor(Math.random() * this.targets.length)];
        },
        moveTargets() {
            this.targetsY += this.speed / this.targetsPerSecond;
            for (let i = 0; i < this.targets.length; i++) {
                let y = this.targetsY + i * (this.targetsHeight + 10);
                const x = this.targetsX[i] + this.targetsWidth / 2;
                if (y >= this.height) {
                    this.isGameOver = true;
                    // this.postGameOver()
                }
                if (this.typed === this.targets[i]) {
                    this.typed = '';
                    this.score++;
                    this.targets.splice(i, 1);
                    this.targetsX.splice(i, 1);
                    // this.targets.unshift(''); // 배열의 첫 번째 요소를 빈 문자열로 채웁니다.
                    i--;
                }
            }
        },
        drawTargets(ctx) {
            ctx.font = this.font;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            for (let i = 0; i < this.targets.length; i++) {
                const x = this.targetsX[i] + this.targetsWidth / 2;
                const y = this.targetsY + i * (this.targetsHeight + 10); // 수정
                ctx.fillText(this.targets[i], x, y);
            }
        },
        checkCollisions() {
            const lastTargetIndex = Math.floor((this.typed.length - 1) / 5);
            const targetIndex = lastTargetIndex + 1;
            const target = this.targets[targetIndex];
            if (target && this.typed === target) {
                this.typed = this.typed.slice(0, target.length);
                this.score += 10;
                this.targetsPerSecond += 0.1;
                this.speed += 0.1;
                this.targetsY = -100;
                // 해당 원소를 배열에서 제거하고
                const targetIndex = this.targets.indexOf(target);
                this.targets.splice(targetIndex, 1);
                // 그 자리를 비웁니다.
                this.targets.splice(targetIndex, 0, '');
                this.targetsX.splice(targetIndex, 0, 0);
            }
            if (this.targets.length === 0) {
                // 게임이 끝난 경우
                // this.ctx.clearRect(0, 0, this.width, this.height);
                this.completePage(); // 여기에 completePage() 함수 호출 추가
                return;
            }
        },
        startFont(ctx) {
            ctx.font = "60px sans-serif";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Start", this.width / 2, this.height / 2);
            ctx.font = "36px sans-serif";
        },
        drawScore(ctx) {
            ctx.font = this.font;
            ctx.fillStyle = "black";
            ctx.textAlign = "left";
            ctx.fillText(`Score: ${this.score}`, 10, 50);
        },
        drawGameOver(ctx) {
            ctx.font = "60px sans-serif";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", this.width / 2, this.height / 2);
            ctx.font = "36px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 + 50);
        },
        completeWord(ctx) {
            ctx.font = "60px sans-serif";
            ctx.fillStyle = "green";
            ctx.textAlign = "center";
            ctx.fillText("Game Complete", this.width / 2, this.height / 2);
            ctx.font = "36px sans-serif";
            ctx.fillStyle = "black";
            ctx.fillText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 + 50);
        },
        completePage() {
            // 이미 최종 점수가 전송된 경우 함수를 빠져나옵니다.
            if (this.isScorePosted) return;
            // 최종 점수를 서버에 전송합니다.
            this.postGameOver();
            // isScorePosted 변수를 true로 설정합니다.
            this.isScorePosted = true;
        },
        async getWord() {
            try {
                const cuslist = await this.$store.dispatch("game/indexWord", 5);
                this.word = cuslist
            } catch (err) {
                console.error(err);
            }
        },
        async postGameOver() {
            try {
                await this.$store.dispatch("game/storeScore", {
                    game_id: 5,
                    score: this.score
                });
                return;
            } catch (err) {
                console.error(err);
            }
        },
    }
}
</script>

<style>
canvas {
    border: 2px solid black;
    display: block;
    margin: 0 auto;
}
.rains-container {
    width: 20em;
    text-align: center;
}
</style>
