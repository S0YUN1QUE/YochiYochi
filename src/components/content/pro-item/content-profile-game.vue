<template>
    <div class="font-bold">
        <p class="text-8xl">掛け算, 引き算, 九九ゲーム</p>
        <p class="text-8xl mt-20">{{ number1 }} {{ operator }} {{ number2 }} = ?</p>
        <div class="flex justify-center items-stretch align-middle mt-10">
            <p class="text-4xl self-center">正解: </p>
            <input v-model="answer" class="text-xl border-4 border-red-400 py-2 text-center mx-10 self-center">
            <p class="text-3xl border-4 border-blue-200 self-center w-[20%] py-2 hover:border-blue-400 cursor-pointer" @click="result">入力</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                number1: Number,
                number2: Number,
                operList: ["+", "-", "X"],
                operator: "",
                answer: 0,
            }
        },
        mounted() {
            this.randomOper()
            if(this.operator == "X") {
                this.randomNumber(9)
            } else {
                this.randomNumber()
            }
        },
        methods: {
            random(limit, first = 1) {
                return Math.trunc(Math.random() * limit + first)
            },
            randomNumber(limit = 100) {
                this.number1 = this.random(limit)
                this.number2 = this.random(limit)
            },
            randomOper() {
                this.operator = this.operList[this.random(3, 0)]
            },
            result() {
                var res = Number
                
                if(this.operator == "+") {
                    res = this.number1 + this.number2
                } else if(this.operator == "-") {
                    res = this.number1 - this.number2
                } else if(this.operator == "X") {
                    res = this.number1 * this.number2
                }

                if(this.answer == res) {
                    alert("정답")
                    this.$emit("profile")
                } else {
                    alert("땡")
                    location.reload()
                }
            }
        }
    }
</script>