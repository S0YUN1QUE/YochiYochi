<template>
    <div class="flex items-center mt-4 font-semibold user-select-none">
        <div class="basis-1/2">
            <RadarChart :radarData="userScore" :key="userScore"></RadarChart>
        </div>
        <div class="flex-1">
            <div class="flex justify-center">
                <div class="flex-1">
                    <p class="top text-3xl">レベル</p>
                    <div class="border-2 border-gray-400 py-4 mt-3">
                        <p class="tb">健康Lv.{{ userLevel[0] }}</p>
                        <p class="tb">人間関係Lv.{{ userLevel[1] }}</p>
                        <p class="tb">環境Lv.{{ userLevel[2] }}</p>
                        <p class="tb">言語Lv.{{ userLevel[3] }}</p>
                        <p class="tb">表現Lv.{{ userLevel[4] }}</p>
                    </div>
                </div>
                <div class="basis-1/6 h-1 border-b-2 border-gray-400 mt-32"></div>
                <div class="flex-1">
                    <p class="top">ポイント</p>
                    <div class="border-2 border-gray-400 py-4 mt-3">
                        <p class="tb">健康: {{ userScore[0] }}</p>
                        <p class="tb">人間関係: {{ userScore[1] }}</p>
                        <p class="tb">環境: {{  userScore[2] }}</p>
                        <p class="tb">言語: {{ userScore[3] }}</p>
                        <p class="tb">表現: {{  userScore[4] }}</p>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex justify-between">
                    <p class="top">学習履歴</p>
                    <p class="bg-black text-white p-2 text-xl rounded-xl cursor-pointer hover:text-amber-300"
                        @click="detail">詳細</p>
                </div>
                <div class="flex justify-around rounded-xl border-2 border-gray-400 py-5 mt-3 text-lg">
                    <p class="rounded-3xl w-[30%] py-10" :style="{ backgroundColor: color[index]}" v-for="item, index in userHis" :key="index">
                        {{ item.name }}
                    </p>
                    <!-- <p class="bg-sky-500 rounded-3xl w-[30%] py-10">놀이2</p>
                    <p class="bg-green-500 rounded-3xl w-[30%] py-10">놀이3</p> -->
                </div>
            </div>
        </div>
    </div>
    <div class="flex justify-start">
        <p class="text-xl font-semibold cursor-pointer bg-black text-white rounded-lg p-2 hover:text-amber-300 mt-3 user-select-none"
            @click="backGame">戻る</p>
    </div>
</template>

<script>
import RadarChart from "../../charts/RadarChart.vue"

export default {
    data() {
        return {
            userScore: [0,0,0,0,0], // cate: 1: health, 2: human, 3: natural, 4: exp, 5: lang,
            userLevel: [0,0,0,0,0],
            userHis : [],
            color: ["rgb(243, 81, 82)", "rgb(36, 107, 189)", "rgb(9, 181, 128)"]
        }
    },
    components: {
        RadarChart,
    },
    methods: {
        detail() {
            this.$emit('detail')
        },
        backGame() {
            this.$emit("backGame")
        }
    },
    async mounted() {
        // cate: 1: health, 2: human, 3: natural, 4: exp, 5: lang,
        // const user = await this.$store.dispatch("auth/user") // 유저 정보
        const score = await this.$store.dispatch("game/indexScore") // 유저 게임 스코어
        const gameList = await this.$store.dispatch("game/indexGame") // 게임목록
        
        const newScore = Array.from(this.userScore) // 현재 userScore 배열 복사
        const level = Array.from(this.userLevel)
        var count = 0
        
        score.forEach(data => {
            if(count < 3) {
                const foundGame = gameList.find(game => game.id === data.game_id)
                if(foundGame) {
                    this.userHis.push(foundGame)
                }
                count++
            }
            newScore[data.games.category-1] += data.score
            level[data.games.category-1] += Math.floor(data.score / 10) >= 1 ? Math.floor(data.score / 10) : 0
        });
        this.userScore = newScore
        this.userLevel = level
        console.log(this.userHis)
        
    }
}
</script>

<style>
.top {
    font-size: 1.875rem
        /* 30px */
    ;
    line-height: 2.25rem
        /* 36px */
    ;
}

.tb {
    font-size: 1rem
        /* 16px */
    ;
    line-height: 1.5rem
        /* 24px */
    ;
}

.colorRed {
    background-color: rgb(243, 81, 82);
}

.colorBlue {
    background-color: rgb(36, 107, 189);
}

.colorGreen {
    background-color: rgb(9, 181, 128);
}
</style>