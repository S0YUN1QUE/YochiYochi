<template>
    <div class="flex text-2xl user-select-none">
        <div class="basis-1/6 rounded-full bg-slate-800 text-white py-14 font-bold cursor-pointer" @click="checkPro">プロフィール</div>
        <div class="basis-10"></div>
        <div class="flex flex-1 py-14 rounded-full" style="background-color: rgb(254, 198, 57, 0.8)">
            <p class="basis-1/12"></p>
            <p id="all" class="basis-2/6 font-bold hover:text-[30px] cursor-pointer" @click="categoryChange">全体</p>
            <p id="health" class="basis-1/6 font-semibold hover:text-[30px] cursor-pointer" @click="categoryChange">健康</p>
            <p id="human" class="basis-2/6 font-semibold hover:text-[30px] cursor-pointer" @click="categoryChange">人間関係</p>
            <p id="natural" class="basis-1/6 font-semibold hover:text-[30px] cursor-pointer" @click="categoryChange">環境</p>
            <p id="exp" class="basis-1/6 font-semibold hover:text-[30px] cursor-pointer" @click="categoryChange">表現</p>
            <p id="lang" class="basis-1/6 font-semibold hover:text-[30px] cursor-pointer" @click="categoryChange">言語</p>
            <p class="basis-1/12"></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            t: ["color: green"],
        }
    },
    props: ['me'],
    mounted() {
        if(this.me == "all") {
            document.querySelector("#all").style = this.t;
        }
    },
    methods: {
        categoryChange(e) {
            this.$emit('categoryChange', e.target.id);
        },
        checkPro() {
            this.$emit('checkPro')
        }
    },
    watch: {
        me() {
            if(this.me == "all") {
                document.querySelector("#all").style = this.t;
            } else { document.querySelector("#all").style = ''; }
            if(this.me == "health") {
                document.querySelector("#health").style = this.t;
            } else { document.querySelector("#health").style = ''; }
            if(this.me == "human") {
                document.querySelector("#human").style = this.t;
            } else { document.querySelector("#human").style = ''; }
            if(this.me == "natural") {
                document.querySelector("#natural").style = this.t;
            } else { document.querySelector("#natural").style = ''; }
            if(this.me == "exp") {
                document.querySelector("#exp").style = this.t;
            } else { document.querySelector("#exp").style = ''; }
            if(this.me == "lang") {
                document.querySelector("#lang").style = this.t;
            } else { document.querySelector("#lang").style = ''; }
        }
    }

}
</script>