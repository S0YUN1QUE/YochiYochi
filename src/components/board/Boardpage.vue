<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">NO</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">CONTENT</th>
                    <th scope="col">WRITTER</th>
                    <th scope="col" v-show="whatPage == '/community/'">VIEWS</th>
                    <th scope="col" v-show="whatPage == '/qna/'">ANSWER</th>
                    <th scope="col">CREATE_AT</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="p in paginatedData" v-bind:key="p">
                    <td>{{ p.id }}</td>
                    <td v-if="whatPage == '/community/'"><a style="text-decoration: none;" :href="whatPage + p.id">{{
                        p.post_title
                    }}</a></td>
                    <td v-if="whatPage == '/qna/'"><a style="text-decoration: none;" :href="whatPage + p.id">{{
                        p.qna_title }}</a></td>
                    <td v-show="whatPage == '/community/'">{{ p.post_content }}</td>
                    <td v-show="whatPage == '/qna/'">{{ p.qna_content }}</td>
                    <td>{{ p.users.name }}</td>
                    <td v-show="whatPage == '/community/'">{{ p.views }}</td>
                    <td v-show="whatPage == '/qna/'">{{ p.answer }}</td>
                    <td>{{ p.created_at.substring(0, 10) }}</td>
                </tr>
            </tbody>
        </table>
        <div v-show="pageCount > 1" class="btn-cover">
            <button :disabled="this.pageNum === 0" @click="prevPage" class="page-btn btn btn-primary">
                前
            </button>
            <span class="page-count container-fluid ">{{ this.pageNum + 1 }} / {{ pageCount }} ページ</span>
            <button :disabled="this.pageNum >= pageCount - 1" @click="nextPage" class="page-btn btn btn-primary">
                次
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageNum: 0,
        };
    },
    props: {
        listArray: {
            type: Array,
            required: true,
        },
        pageSize: {
            type: Number,
            required: false,
            default: 10,
        },
        whatPage: String,
    },
    methods: {
        nextPage() {
            this.pageNum += 1;
        },
        prevPage() {
            this.pageNum -= 1;
        },
    },
    computed: {
        pageCount() {
            let listLeng = this.listArray.length,
                listSize = this.pageSize,
                page = Math.floor(listLeng / listSize);
            if (listLeng % listSize > 0) page += 1;

            return page;
        },
        paginatedData() {
            const start = this.pageNum * this.pageSize,
                end = start + this.pageSize;
            return this.listArray.slice(start, end);
        },
    },
};
</script>
