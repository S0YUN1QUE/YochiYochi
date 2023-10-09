<template>
    <div class="flex justify-around font-bold text-4xl py-10 user-select-none rounded-md" style="background-color: rgb(254, 198, 57, 0.8);">
        <p id="t1" class="cursor" @click="focusTitle" style="color: rgb(255, 18, 132)">会員情報</p>
        <p id="t2" class="cursor" @click="focusTitle">学習統計</p>
        <p id="t3" class="cursor" @click="focusTitle">購入履歴</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            focus: "t1",
            color: ["color: rgb(254, 136, 10)"],
        }
    },
    mounted() {

    },
    methods: {
        focusTitle(e) {
            this.focus = e.target.id
            if(this.focus == "t1") {
                document.querySelector(`#${this.focus}`).style = this.color;
            } else {document.querySelector(`#t1`).style = "";}
            if(this.focus == "t2") {
                document.querySelector(`#${this.focus}`).style = this.color
            } else {document.querySelector(`#t2`).style = "";}
            if(this.focus == "t3") {
                document.querySelector(`#${this.focus}`).style = this.color
            } else {document.querySelector(`#t3`).style = "";}
            this.$emit("proCate", e.target.id)
        },
    }
    
}
</script>

<style>
.cursor {
    cursor: pointer;
}
</style>