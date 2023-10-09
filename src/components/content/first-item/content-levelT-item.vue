<template>
    <div>
        <div class="font-bold text-[60px]">テストを行いますか？</div>
        <div class="flex justify-between font-bold text-2xl mt-24">
            <p class="p-12 w-[35%] rounded-full bg-red-200 hover:border-black border-2 cursor-pointer" @click="levelTest">はい</p>
            <p class="p-12 w-[35%] rounded-full bg-red-200 hover:border-black border-2 cursor-pointer" @click="levelTest">いいえ</p>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            levelTest(e) {
                this.$emit('levelTest', e.target.textContent);
            }
        }
    }
</script>