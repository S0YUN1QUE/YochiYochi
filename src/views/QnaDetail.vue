<template>
    <div id="wrap">
        <div id="content">

            <div class="px-4 py-3 mt-2 border-2 rounded-lg border-yellow-300">

                <div class="border-dashed border-b-4 flex p-3 items-center">
                    <p class="bg-orange-400 rounded-lg p-2 font-extrabold text-white">category</p>
                    <p class="pl-4 text-xl font-extrabold rounded-xl flex-1">{{ title }}</p>
                    <p class="font-extrabold">作成者: </p>
                    <p class="font-extrabold pl-1">{{ writer }}</p>
                    <p class="font-extrabold pl-4">作成日: </p>
                    <p class="font-extrabold pl-1">{{ created_at }}</p>
                </div>

                <div class="px-10 py-5 bg-green-50">
                    <p class="text-base indent-8 whitespace-normal">
                        {{ content }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>
   
<script>
export default {
    data() { //변수생성
        return {
            title: 'title',
            writer: '윤영운',
            created_at: '2012-12-24',
            read_to: 1557,
            content: 'uhahagheqwehrqewrhsrfqweahewqerhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',

        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {

        },
    }
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
    min-height: 720px;
}
</style>