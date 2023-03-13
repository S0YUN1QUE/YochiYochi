<template>
    <div id="wrap">
        <div id="content">
            <div id="note">
                <p class="text-xl font-extrabold pl-3 border-b-2">공지사항</p>
                <ul>
                    <NoticeListItem :title="notice_title" :created_at="notice_created_at">
                    </NoticeListItem>
                </ul>
            </div>
            <div id="faq" style="padding-top: 30px;">
                <p class="text-xl font-extrabold pl-3">자주 묻는 질문</p>
                <ul>
                    <FaqListItem
                        question="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ut, fugiat facere incidunt voluptas minima unde. Rem nostrum, deleniti laudantium optio porro, eaque fugiat exercitationem necessitatibus nobis iure voluptatem et?"
                        comments="that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page ">
                    </FaqListItem>
                    <FaqListItem :question="faq_question" :comments="faq_comments"></FaqListItem>
                </ul>
            </div>
            <div id="qna" style="padding-top: 30px;">
                <p class="text-xl font-extrabold pl-3">Qna</p>
                <ul>
                    <QnaListItem :list="qna_list" :title="qna_title" :writer="qna_writer" :created_at="qna_created_at"
                        :question="qna_question"></QnaListItem>
                    <!-- 'list', 'title', 'writer', 'created_at',  question = "답변중", 'to' -->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import FaqListItem from './faq-list-item.vue';
import NoticeListItem from './notice-list-item.vue';
import QnaListItem from './qna-list-item.vue';

export default {
    data() {
        return {
            notice_title: 'test',
            notice_created_at: '2012',
            faq_question: 'question',
            faq_comments: 'qq',
            qna_list: 10,
            qna_title: 'tit',
            qna_writer: 'wrw',
            qna_created_at: '1231',
            qna_question: false,
        }
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

#wrap {
    display: flex;
    justify-content: center;
}

#content {
    border-radius: 10px;
    padding: 50px;
    margin-top: 50px;
    width: 75%;
    background-color: rgb(255, 255, 255);
}


h1 {

    padding-bottom: 10px;
    font-size: xx-large;
}
</style>