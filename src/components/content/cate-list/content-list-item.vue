<template>
    <div v-if="cate == `all`" class="cateTest">
        <p v-for="item in all" :key="item" :class="`category`" :style="{backgroundColor: item.color}" @click="viewTopic, moveUrl(item.name)">{{ item.name }}</p>
    </div>
    <div v-if="cate == `health`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in health" :key="item" :class="`category`" :style="{backgroundColor: item.color}">{{ item.name }}</p>
    </div>
    <div v-if="cate == `human`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in human" :key="item" :class="`category`" :style="{backgroundColor: item.color}">{{ item.name }}</p>
    </div>
    <div v-if="cate == `natural`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in natural" :key="item" :class="`category`" :style="{backgroundColor: item.color}">{{
            item.name }}</p>
    </div>
    <div v-if="cate == `exp`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in exp" :key="item" :class="`category`" :style="{backgroundColor: item.color}">{{
            item.name }}</p>
    </div>
    <div v-if="cate == `lang`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in lang" :key="item" :class="`category`" :style="{backgroundColor: item.color}">{{
            item.name }}</p>
    </div>
</template>

<script>
export default {
    props: ['cate'],
    data() {
        return {//           빨                    핑                     파                 녹                     노
            // color: ["rgb(243, 81, 82)", "rgb(251, 110, 208)", "rgb(36, 107, 189)", "rgb(9, 181, 128)", "rgb(254, 198, 57)"],
            // 전체, 건강, 인관관계, 환경, 표현, 언어
            all: [{ name: "봄", color: "rgb(243, 81, 82)" }, { name: "여름", color: "rgb(36, 107, 189)" }, { name: "가을", color: "rgb(9, 181, 128)" },
            { name: "겨울", color: "rgb(9, 181, 128)" }, { name: "영진", color: "rgb(243, 81, 82)" }, { name: "파이팅", color: "rgb(36, 107, 189)" }],
            health: [{ name: "계절꽃잡기", color: "rgb(243, 81, 82)" }, { name: "온몸비틀기", color: "rgb(36, 107, 189)" }, { name: "동작따라하기", color: "rgb(9, 181, 128)" },
            { name: "체조해봐요", color: "rgb(9, 181, 128)" }, { name: "술래잡기", color: "rgb(243, 81, 82)" }, { name: "링피트", color: "rgb(36, 107, 189)" }],
            human: [{ name: "인삿말맞추기", color: "rgb(243, 81, 82)" }, { name: "내가누구게?", color: "rgb(36, 107, 189)" }, { name: "대화를이어보자", color: "rgb(9, 181, 128)" },
            { name: "칭찬해봐요", color: "rgb(9, 181, 128)" }, { name: "범인은 누구", color: "rgb(243, 81, 82)" }, { name: "뭐하니", color: "rgb(36, 107, 189)" }],
            natural: [{ name: "카드 기억 게임", color: "rgb(243, 81, 82)" }, { name: "주제맞추기", color: "rgb(36, 107, 189)" }, { name: "집짓기", color: "rgb(9, 181, 128)" },
            { name: "여긴어디?", color: "rgb(9, 181, 128)" }, { name: "분리수거하기", color: "rgb(243, 81, 82)" }, { name: "북극곰의눈물", color: "rgb(36, 107, 189)" }],
            exp: [{ name: "그림 그리기", color: "rgb(243, 81, 82)" }, { name: "응원해 봐요", color: "rgb(36, 107, 189)" }, { name: "몸으로말해요", color: "rgb(9, 181, 128)" },
            { name: "감정표현하기", color: "rgb(9, 181, 128)" }, { name: "날 따라 해봐요", color: "rgb(243, 81, 82)" }, { name: "동물맞추기", color: "rgb(36, 107, 189)" }],
            lang: [{ name: "산성비 게임", color: "rgb(243, 81, 82)" }, { name: "글자쓰기", color: "rgb(36, 107, 189)" }, { name: "단어맞추기", color: "rgb(9, 181, 128)" },
            { name: "오늘의명언", color: "rgb(9, 181, 128)" }, { name: "장문쓰기", color: "rgb(243, 81, 82)" }, { name: "속담맞추기", color: "rgb(36, 107, 189)" }],
        }
    },
    methods: {
        viewTopic(e) {
            this.$emit("viewTopic", e.target.textContent)
        },
        moveUrl(n) {
            if (n === '카드 기억 게임') {
                this.$router.push({ name: 'cardmemory' })
            } else if (n === '산성비 게임') {
                this.$router.push({ name: 'rainscore' })
            } else if (n === '그림 그리기') {
                this.$router.push({ name: 'draw' })
            } else if (n === '계절꽃잡기') {
                this.$router.push({ name: 'movenetRain'})
            } else if (n === '주제맞추기') {
                this.$router.push({ name: 'picturesort'})
            }
        }
    }
}
</script>

<style scoped>
.category {
    border-width: 1px;
    border-radius: 1.5rem
        /* 24px */
    ;
    padding-top: 5rem
        /* 80px */
    ;
    padding-bottom: 5rem
        /* 80px */
    ;
    margin-bottom: 4rem;
    width: 15rem
        /* 240px */
    ;
    color: white;
    cursor: pointer;
}

.cateTest {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: space-between;
    margin-top: 6rem
        /* 96px */
    ;
    font-weight: 600;
    font-size: 1.875rem
        /* 30px */
    ;
    line-height: 2.25rem
        /* 36px */
    ;
    user-select: none; /* Standard */
}
</style>