<template>
    <div class="border-2 p-4 mt-4 font-semibold text-[14px] user-select-none" v-for="item, index in purchase" :key="index">
        <div class="flex justify-between">
            <div class="grid grid-cols-2 content-center justify-items-start text-lg">
                <p>{{ item.created_at.substring(0,10).replace(/-/g, ".") }} 注文</p> <!-- 날짜 받아오기 -->
                <p class="ml-5">注文番号: {{item.order_number}}</p>
            </div>
            <div class="bg-blue-400 text-white rounded-lg px-3 py-2 text-[15px] cursor-pointer">注文詳細</div>
        </div>
        <div class="flex border-2 py-4 pl-2 mt-3 rounded-md">
            <div class=" border-r-2" style="max-width: 200px;">
                <img :src="'/item/'+itemData.find(data => data.id === item.item_id).attachment" alt="상품1"> <!-- 상품+상품번호로 저장된거 가져오기-->
            </div>
            <div class="ml-5 flex-1 grid content-center justify-items-start border-r-2">
                <div class="dflex">商品番号: <p class="tblack">{{ itemData.find(data => data.id === item.item_id).id }}</p></div>
                <div class="dflex">商品名: <p class="tblack">{{ itemData.find(data => data.id === item.item_id).item_title }}</p></div>
                <div class="dflex">価格・数量: <p class="tblack">{{ itemData.find(data => data.id === item.item_id).price }}円・{{ item.quantity }}　個</p></div>
                <div class="dflex">住所: <p class="tblack">{{ item.address }}</p></div>
                <div class="dflex">名前・連絡先: <p class="tblack">{{ user.find(data => data.id === item.user_id).name }}・{{ user.find(data => data.id === item.user_id).tel }}</p></div>
                <div class="dflex">配送現況: 
                    <p class="tblack">{{ item.delivery ? "配送済" : "配送中" }}</p>
                </div>
            </div>
            <div class="grid justify-items-center content-center basis-1/5">
                <div class="border-2 border-blue-300 w-[80%] text-blue-300 py-0.5 cursor-pointer">配送照会</div>
                <div class="border-2 mt-2 py-0.5 w-[80%] cursor-pointer">注文・配送 取り消し</div>
                <div v-if="item.delivery" class="border-2 mt-2 py-0.5 w-[80%] cursor-pointer">리뷰 작성하기</div>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center mt-3 user-select-none">
        <div id="purLeft" class="bg-gray-200 py-2 px-2.5 rounded-md cursor-pointer" @click="purRecycle"><font-awesome-icon class="pr-1 pointer-events-none" icon="fa-solid fa-chevron-left"/>이전</div>
        <div class="basis-4"></div>
        <div id="purRight" class="bg-gray-200 py-2 px-2.5 rounded-md cursor-pointer" @click="purRecycle">다음<font-awesome-icon class="pl-1 pointer-events-none" icon="fa-solid fa-chevron-right"/></div>
    </div>
    <div class="flex justify-start user-select-none">
        <p class="text-xl font-semibold cursor-pointer bg-black text-white rounded-lg p-2 hover:text-amber-300 mt-3" @click="backGame">돌아가기</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemData: [],
            purData: [],
            purchase: [],
            user: [],
            page: 0,
        }
    },
    async mounted() {

        this.user.push(await this.$store.dispatch("auth/user"))
        this.itemData = await this.$store.dispatch("itemStore/fetchItems")
        this.purData = await this.$store.dispatch("itemStore/fetchPurchase")

        for(var i = this.page; i < this.page+5; i++) {
            if(this.purData[i] != null) {
                this.purchase.push(this.purData[i])
            }
        }

    },
    methods: {
        backGame() {
            this.$emit("backGame")
        },
        purRecycle(e) {
            if(e.target.id == "purLeft") {
                if(this.page != 0){
                    this.page -= 5
                    this.purchase.splice(0,5)
                    for(var i = this.page; i < this.page+5; i++) {
                        if(this.purData[i] != null) {
                            this.purchase.push(this.purData[i])
                        }
                    }
                }
            } else {
                if(this.page + 5 <= this.purData.length) {
                    this.page += 5
                    this.purchase.splice(0,5)
                    for(var i = this.page; i < this.page+5; i++) {
                        if(this.purData[i] != null) {
                            this.purchase.push(this.purData[i])
                        }
                    }
                }
            }
        }
    }
}
</script>

<style>
.dflex {
    display: flex;
    color:rgb(95, 95, 95);
}

.tblack {
    color:black;
    margin-left: 10px;
}
</style>