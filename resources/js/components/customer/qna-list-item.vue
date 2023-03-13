<template>
    <a href="/customer/qnaDetail">
        <li class="flex mt-2 bg-white border-b">
            <p class="basis-1/12 text-center bg-slate-100">{{ list }}</p>
            <p class="flex-1 px-4 bg-slate-200">{{ title }}</p>
            <p class="basis-1/12 text-center bg-slate-300">{{ writer }}</p>
            <p class="basis-2/12 text-center bg-slate-400">{{ created_at }}</p>
            <p class="basis-1/12 text-center bg-slate-500" v-if="!visible">답변중</p>
            <p class="basis-1/12 text-center bg-slate-500" v-else>답변완료</p>
        </li>
    </a>
</template>

<script>
export default {
    props: ['list', 'title', 'writer', 'created_at', 'question'],
    data() {
        return {
            visible: this.question,
        }
    },
    methods: {
    },
}
</script>