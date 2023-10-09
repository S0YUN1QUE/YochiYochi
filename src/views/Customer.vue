<template>
    <div id="wrap">
        <div id="content">
            <div id="note">
                <!-- 포커스 하기 -->
                <p class="text-xl font-extrabold pl-3 border-b-2">告知</p>
                <div v-for="(item, index) in notice_list" :key="index">
                    <NoticeListItem :title="item.post_title" :created_at="item.created_at.slice(0, 10)"
                        :notice_index="index">
                    </NoticeListItem>
                </div>
                <ul class="pt-3">
                    <li class="flex justify-center">
                        <p class="px-2 mx-1 border-2 ">{{ "<" }}</p>
                                <p class="px-2 mx-1 border-2">{{ notice_page }}</p>
                                <p class="px-2 mx-1 border-2">{{ ">" }}</p>
                    </li>
                </ul>
            </div>
            <div id="faq" style="padding-top: 30px;">
                <p class="text-xl font-extrabold pl-3">よく聞く質問</p>
                <ul>
                    <FaqListItem :question="faq_question" :comments="faq_comments"></FaqListItem>
                </ul>
            </div>
            <div id="qna" style="padding-top: 30px;">
                <p class="text-xl font-extrabold pl-3">Qna</p>
                <ul>
                    <QnaListItem :list="10" :title="qna_title" :writer="qna_writer" :created_at="qna_created_at"
                        :question="qna_question"></QnaListItem>
                </ul>
                <div class="flex justify-end mt-4">
                    <div class="border rounded-lg p-1 bg-red-300 cursor-pointer mr-5">質問する</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FaqListItem from '../components/customer/faq-list-item.vue';
import NoticeListItem from '../components/customer/notice-list-item.vue';
import QnaListItem from '../components/customer/qna-list-item.vue';

export default {
    data() {
        return {
            notice_list: [],
            faq_list: [],
            qna_list: [],
            notice_page: 1,
        }
    },
    async mounted() {
        try {
            /* for(var i = 1; i < 50; i++) {
                const store = {qna_title: `test`, qna_content: `testContent`, category: 1, attachment: null}
                this.$store.dispatch("qna/createQna", store)
            } */
            this.qna_list = await this.$store.dispatch("qna/fetchQnas")
            console.log(this.qna_list)
        } catch (error) {
            console.log(error)
        }
    },
    methods: {

    },
    components: {
        NoticeListItem,
        FaqListItem,
        QnaListItem,
    },
}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}

#content {
    border-radius: 10px;
    padding: 50px;
    margin-top: 50px;
    width: 75%;
    background-color: rgb(255, 255, 255);
    min-height: 720px;
}
</style>