<template>
    <div>
        <li @click="toggleVisible"
            class="mt-2 bg-white rounded-lg drop-shadow-lg p-2 px-4 overflow-hidden tracking-tight cursor-pointer">
            <p class="text-md font-semibold">{{ question }}</p>
        </li>
        <li v-if="visible" class="pl-4 py-2">
            <span>ㄴ 返答 : </span>
            <span class="text-sm">{{ comments }}</span>
        </li>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        }
    },
    methods: {
        toggleVisible(e) {
            e.preventDefault();
            this.visible = !this.visible
        },
    },
    props: ['question', 'comments'],
}
</script>