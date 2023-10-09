<template>
    <div id="community">
        <b>自由掲示板</b>
        <Board Url="/community/" :boards="getCList" />
    </div>
    <div id="resources">
        <b>学習情報掲示板</b>
        <Board Url="/qna/" :boards="getQList" />
    </div>
</template>

<script>
import Board from "../components/freeboard/Board.vue";

export default {
    data() {
        return {
            getCList: [],
            getQList: [],
        };
    },
    components: {
        Board,
    },
    mounted() {
        this.getCData();
        this.getQData();
    },
    methods: {
        async getCData() {
            try {
                const getCList = await this.$store.dispatch("community/fetchPosts");
                this.getCList = getCList
                console.log(getCList);
            } catch (err) {
                console.error(err);
            }
        },
        async getQData() {
            try {
                const getQList = await this.$store.dispatch("qna/fetchQnas");
                this.getQList = getQList
                console.log(getQList);
            } catch (err) {
                console.error(err);
            }
        },
    },
};
</script>
