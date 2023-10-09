<template>
    <a href="/customer/qnaDetail">
        <li class="flex mt-2 border-b">
            <p class="basis-1/12 text-center">{{ list }}</p>
            <p class="flex-1 px-4 text-ellipsis overflow-hidden">{{ title }}</p>
            <p class="basis-1/12 text-center">{{ writer }}</p>
            <p class="basis-2/12 text-center">{{ created_at }}</p>
            <p class="basis-1/12 text-center" v-if="!visible">返答中</p>
            <p class="basis-1/12 text-center" v-else>返答完了</p>
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