<template>
    <div v-if="cate == `all`" class="cateTest">
        <p v-for="item in all" :key="item" :class="`category`" :style="{backgroundColor: item.color}" @click="viewTopic, moveUrl(item.name)" class="max-h-48">{{ item.name }}</p>
    </div>
    <div v-if="cate == `health`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in health" :key="item" :class="`category`" :style="{backgroundColor: item.color}" class="max-h-48">{{ item.name }}</p>
    </div>
    <div v-if="cate == `human`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in human" :key="item" :class="`category`" :style="{backgroundColor: item.color}" class="max-h-48">{{ item.name }}</p>
    </div>
    <div v-if="cate == `natural`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in natural" :key="item" :class="`category`" :style="{backgroundColor: item.color}" class="max-h-48">{{
            item.name }}</p>
    </div>
    <div v-if="cate == `exp`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in exp" :key="item" :class="`category`" :style="{backgroundColor: item.color}" class="max-h-48">{{
            item.name }}</p>
    </div>
    <div v-if="cate == `lang`" class="cateTest">
        <p @click="moveUrl(item.name)" v-for="item in lang" :key="item" :class="`category`" :style="{backgroundColor: item.color}" class="max-h-48">{{
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
            all: [{ name: "春", color: "rgb(243, 81, 82)" }, { name: "名前", color: "rgb(36, 107, 189)" }, { name: "秋", color: "rgb(9, 181, 128)" },
            { name: "冬", color: "rgb(9, 181, 128)" }, { name: "YON JINN", color: "rgb(243, 81, 82)" }, { name: "ハイト", color: "rgb(36, 107, 189)" }],
            health: [{ name: "季節花摘まみ", color: "rgb(243, 81, 82)" }, { name: "全身ひねる", color: "rgb(36, 107, 189)" }, { name: "真似する", color: "rgb(9, 181, 128)" },
            { name: "体操", color: "rgb(9, 181, 128)" }, { name: "鬼ごっこ", color: "rgb(243, 81, 82)" }, { name: "リングピット", color: "rgb(36, 107, 189)" }],
            human: [{ name: "挨拶", color: "rgb(243, 81, 82)" }, { name: "だ～れだ?", color: "rgb(36, 107, 189)" }, { name: "話を続ける", color: "rgb(9, 181, 128)" },
            { name: "褒めよう", color: "rgb(9, 181, 128)" }, { name: "犯人は誰か", color: "rgb(243, 81, 82)" }, { name: "何してる？", color: "rgb(36, 107, 189)" }],
            natural: [{ name: "カードメモリーゲーム", color: "rgb(243, 81, 82)" }, { name: "タイトルを当てよう", color: "rgb(36, 107, 189)" }, { name: "家作り", color: "rgb(9, 181, 128)" },
            { name: "ここはどこ?", color: "rgb(9, 181, 128)" }, { name: "リサイクル", color: "rgb(243, 81, 82)" }, { name: "涙", color: "rgb(36, 107, 189)" }],
            exp: [{ name: "お描き", color: "rgb(243, 81, 82)" }, { name: "応援しよう", color: "rgb(36, 107, 189)" }, { name: "体で話す", color: "rgb(9, 181, 128)" },
            { name: "感情表現する", color: "rgb(9, 181, 128)" }, { name: "真似してみて", color: "rgb(243, 81, 82)" }, { name: "動物当てよう", color: "rgb(36, 107, 189)" }],
            lang: [{ name: "酸性雨ゲーム", color: "rgb(243, 81, 82)" }, { name: "字書き", color: "rgb(36, 107, 189)" }, { name: "単語合わせ", color: "rgb(9, 181, 128)" },
            { name: "今日の名言", color: "rgb(9, 181, 128)" }, { name: "文字書き", color: "rgb(243, 81, 82)" }, { name: "諺", color: "rgb(36, 107, 189)" }],
        }
    },
    methods: {
        viewTopic(e) {
            this.$emit("viewTopic", e.target.textContent)
        },
        moveUrl(n) {
            if (n === 'カードメモリーゲーム') {
                this.$router.push({ name: 'cardmemory' })
            } else if (n === '酸性雨ゲーム') {
                this.$router.push({ name: 'rainscore' })
            } else if (n === 'お描き') {
                this.$router.push({ name: 'draw' })
            } else if (n === '季節花摘まみ') {
                this.$router.push({ name: 'movenetRain'})
            } else if (n === 'タイトルを当てよう') {
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