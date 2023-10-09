<template>
    <div class="font-semibold text-base user-select-none">
        <div class="flex justify-between text-2xl mt-4">
            <p>学習履歴</p>
            <div class="flex text-xl">
                <p class="mr-3">정렬</p>
                <div class="flex">
                    <p>最新順</p>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" class="mt-1"/>
                </div>
            </div>
        </div>
        <div class="border-2 mt-3 flex justify-around items-center px-2 py-4">
            <div id="left" class="cursor-pointer" @click="pracRecycle">
                <font-awesome-icon class="pointer-events-none" icon="fa-solid fa-chevron-left" style="height: 40px;"/><!-- 왼쪽 -->
            </div>
            <div class="flex flex-1 justify-center">
                <div class="border-2 p-3 mx-2 w-[18%] max-w-[138px]" v-for="item,index in practice" :key="index">
                    <p class="py-9 rounded-3xl mb-3 max-w-[100%]" :style="{ backgroundColor: color[index]}">{{ gameList.find(game => game.id === item.game_id).name }}</p>
                    <p>ポイント: {{ item.score }}</p>
                    <p>領域: {{category[item.games.category-1]}}</p>
                </div>
            </div>
            <div id="right" class="cursor-pointer" @click="pracRecycle">
                <font-awesome-icon class="pointer-events-none" icon="fa-solid fa-chevron-right" style="height: 40px;"/><!-- 오른쪽 -->
            </div>
        </div>
        <div class="flex justify-start text-2xl mt-4">
            <p>うちの子の作品</p>
        </div>
        <div class="border-2 mt-3 px-2 py-5 flex justify-around items-center">
            <div id="left" class="cursor-pointer" @click="artRecycle">
                <font-awesome-icon icon="fa-solid fa-chevron-left" style="height: 40px;" class="pointer-events-none"/>
            </div>
            <div class="border-2 p-3 mx-2 w-[18%] max-w-[138px]" v-for="item,index in artwork" :key="index">
                <img :src="item.img" alt="작품" class="drop-shadow-2xl">
            </div>
            <div id="right" class="cursor-pointer" @click="artRecycle">
                <font-awesome-icon icon="fa-solid fa-chevron-right" style="height: 40px;" class="pointer-events-none"/>
            </div>
        </div>
        <div class="flex justify-start">
            <p @click="detail" class="text-xl cursor-pointer bg-black text-white rounded-lg p-2 hover:text-amber-300 mt-5">戻る</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pracData: [],
            practice: [],
            gameList: [],
            pracPage: 0,
            pracThis: 5,

            artData: [],
            artwork: [],
            artPage: 0,
            artThis: 5,

            color: ["rgb(243, 81, 82)", "rgb(251, 110, 208)", "rgb(36, 107, 189)", "rgb(9, 181, 128)", "rgb(254, 198, 57)"],
            category: ["건강", "인간관계", "환경", "언어", "표현"]
        }
    },
    methods: {
        detail() {
            this.$emit('detail')
        },
        pracRecycle(e) {
            if(e.target.id == "right") {
                if(this.pracData.length > this.pracPage) {
                    this.pracThis = 0
                    this.practice.splice(0,5)
                    for(var i = 0; i < 5; i++) {
                        if(this.pracData.length > this.pracPage) {
                            this.practice.push(this.pracData[this.pracPage])
                            this.pracPage++
                            this.pracThis++
                        }
                    }
                }
            } else if(e.target.id == "left") {
                if(5 < this.pracPage) { // 11 // 4, 9, ....
                    if(this.pracThis < 5) { 
                        this.pracPage -= this.pracThis
                        this.pracThis = 5
                    } else {
                        this.pracPage -= this.pracThis
                    }
                    this.practice.splice(0,5)
                    for(var i = 5; i > 0; i--) {
                        if(this.pracPage == 9) {
                            this.practice.push(this.pracData[this.pracPage - i + 1])
                        } else {
                            this.practice.push(this.pracData[this.pracPage - i])
                        }
                    }
                }
            }
        },
        artRecycle(e) {
            if(e.target.id == "right") {
                if(this.artData.length > this.artPage) {
                    this.artThis = 0
                    this.artwork.splice(0,5)
                    for(var i = 0; i < 5; i++) {
                        if(this.artData.length > this.artPage) {
                            this.artwork.push(this.artData[this.artPage])
                            this.artPage++
                            this.artThis++
                        }
                    }
                }
            } else if(e.target.id == "left") {
                if(5 < this.artPage) { // 11 // 4, 9, ....
                    if(this.artThis < 5) { 
                        this.artPage -= this.artThis
                        this.artThis = 5
                    } else {
                        this.artPage -= this.artThis
                    }
                    this.artwork.splice(0,5)
                    for(var i = 5; i > 0; i--) {
                        if(this.artPage == 9) {
                            this.artwork.push(this.artData[this.artPage - i + 1])
                        } else {
                            this.artwork.push(this.artData[this.artPage - i])
                        }
                    }
                }
            }
        },
    },
    async mounted() {
        this.pracData = await this.$store.dispatch("game/indexScore") // 유저 게임 스코어
        this.gameList = await this.$store.dispatch("game/indexGame") // 게임목록
        
        for(var i = 0; i < 5; i++) {
            if(this.pracData.length > i) {
                this.practice.push(this.pracData[i])
            }
        }

        for(var i = 1; i <= 6; i++) {
            this.artData.push({img: `art/test${i}.jpg`})
        }
        // console.log(this.artData);
        for(var i = 0; i < 5; i++) {
            if(this.artData.length > i) {
                this.artwork.push(this.artData[i])
            }
        }
    }
}
</script>

<style>
</style>