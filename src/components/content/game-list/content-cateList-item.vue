<template>
    <div class="mt-16 text-white text-xl font-semibold flex items-start justify-between user-select-none">
        <p @click="moveUrls(hmm[0])" class="gList w-[141px] py-14 cursor-point">{{ hmm[0] }}</p>
        <p class="gList w-[141px] py-14 mt-28">{{ hmm[1] }}</p>
        <p class="gList w-[141px] py-14 mt-16">{{ hmm[2] }}</p>
        <p class="gList w-[141px] py-14 mt-24">{{ hmm[3] }}</p>
        <p class="gList w-[141px] py-14 mt-10">{{ hmm[4] }}</p>
    </div>
    <div class="flex justify-start user-select-none">
        <p class="text-xl font-semibold cursor-pointer bg-black text-white rounded-lg p-2 hover:text-amber-300 mt-5"
            @click="backCate">戻る</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //           빨                    핑                     파                 녹                     노
            // color: ["rgb(243, 81, 82)", "rgb(251, 110, 208)", "rgb(36, 107, 189)", "rgb(9, 181, 128)", "rgb(254, 198, 57)"],
            sprCate: ["산성비 게임", "봄게임2", "봄게임3", "봄게임4", "봄게임5"],
            sumCate: ["카드 기억 게임", "여름게임2", "여름게임3", "여름게임4", "여름게임5"],
            autCate: ["그림 그리기", "가을게임2", "가을게임3", "가을게임4", "가을게임5"],
            winCate: ["겨울게임1", "겨울게임2", "겨울게임3", "겨울게임4", "겨울게임5"],
            yunCate: ["영진게임1", "영진게임2", "영진게임3", "영진게임4", "영진게임5"],
            jinCate: ["파이팅1", "파이팅2", "파이팅3", "파이팅4", "파이팅5"],
            hmm: [],

        }
    },
    props: ["gameCategory"],
    mounted() {
        if (this.gameCategory == "봄") {
            this.hmm = this.sprCate
        } else if (this.gameCategory == "여름") {
            this.hmm = this.sumCate
        } else if (this.gameCategory == "가을") {
            this.hmm = this.autCate
        } else if (this.gameCategory == "겨울") {
            this.hmm = this.winCate
        } else if (this.gameCategory == "영진") {
            this.hmm = this.yunCate
        } else if (this.gameCategory == "파이팅") {
            this.hmm = this.jinCate
        }
    },
    watch: {
        gameCategory() {
            if (this.gameCategory == "봄") {
                this.hmm = this.sprCate
            } else if (this.gameCategory == "여름") {
                this.hmm = this.sumCate
            } else if (this.gameCategory == "가을") {
                this.hmm = this.autCate
            } else if (this.gameCategory == "겨울") {
                this.hmm = this.winCate
            } else if (this.gameCategory == "영진") {
                this.hmm = this.yunCate
            } else if (this.gameCategory == "파이팅") {
                this.hmm = this.jinCate
            }
        }
    },
    methods: {
        backCate() {
            this.$emit("backCate")
        },
        moveUrls(n) {
            if (n === '산성비 게임') {
                this.$router.push({ name: 'rainscore' })
            } else if (n === '카드 기억 게임') {
                this.$router.push({ name: 'cardmemory' })
            } else if (n === '그림 그리기') {
                this.$router.push({ name: 'draw' })
            }
        }
    }
}
</script>

<style>
.gList {
    border-width: 1px;
    border-radius: 9999px;
    background-color: rgb(251, 110, 208);
    cursor: pointer;
}
</style>