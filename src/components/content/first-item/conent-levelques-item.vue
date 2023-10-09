<template>
    <div>
        <div class="font-bold text-[60px]">何歳ですか？</div>
        <div class="flex justify-between font-bold text-2xl mt-24">
            <div v-for="item, index in oldList" :key="index">
                <p class="p-12 px-14 rounded-full bg-red-200 hover:border-black border-2 cursor-pointer" @click="saveAge">{{ item.old }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            oldList: [{old:5},{old:6},{old:7}],
            old: Number,
        }
    },
    methods: {
        saveAge(e) {
            this.old = e.target.textContent
            this.$emit("saveAge", this.old)
        }
    },
}
    
</script>