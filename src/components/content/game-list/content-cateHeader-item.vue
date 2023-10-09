<template>
    <div class="flex items-center text-3xl user-select-none">
        <div class="basis-1/6 py-12 rounded-full bg-black text-white font-bold cursor-pointer" @click="checkPro">プロフィール</div>
        <div class="basis-10"></div>
        <div class="flex flex-1 py-12 rounded-full border bg-gray-500 text-4xl">
            <p class="basis-1/12"></p>
            <font-awesome-icon class="basis-1/12 cursor-pointer" icon="fa-solid fa-bars" @click="backList"/>
            <font-awesome-icon class="basis-1/12 cursor-pointer" icon="fa-solid fa-chevron-left" @click="cateDown"/>
            <p class="flex-1 text-white font-semibold">{{ cate[page] }}</p>
            <font-awesome-icon class="basis-1/12 cursor-pointer" icon="fa-solid fa-chevron-right" @click="cateUp"/>
            <p class="basis-1/12"></p>
        </div>
        <div class="basis-10"></div>
        <div class="basis-1/5 px-2 py-14 rounded-3xl text-2xl text-white font-semibold" :style="{ backgroundColor: 'rgb(9, 181, 128)'}">ポイント: {{ point }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 0,
            cate: ["봄", "여름", "가을", "겨울", "영진", "파이팅"],
            point: 0,
        }
    },
    props: ["topic"],
    methods: {
        cateUp() {
            if(this.page < this.cate.length - 1) {
                this.page += 1
                this.$emit("gameCate", this.cate[this.page])
            } else {
                this.page = 0
                this.$emit("gameCate", this.cate[this.page])
            }
        },
        cateDown() {
            if(this.page == 0) {
                this.page = this.cate.length -1
                this.$emit("gameCate", this.cate[this.page])
            } else {
                this.page -= 1
                this.$emit("gameCate", this.cate[this.page])
            }
        },
        backList() {
            this.$emit('backList')
        },
        checkPro() {
            this.$emit('checkPro')
        },
        async getPoint() {
            const po = await this.$store.dispatch("game/indexScore")

            po.forEach(data => {
                this.point += data.score
            });
        }
    },
    mounted() {
        this.page = this.cate.findIndex(cate => cate == this.topic)
        this.$emit("gameCate", this.cate[this.page])
        this.getPoint()
    }
}
</script>