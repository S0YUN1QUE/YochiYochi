<template>
    <div id="wrap">
        <div id="content">
            <div id="banner">
                <BannerListItem></BannerListItem>
            </div>
            <div id="event-slider" class="mt-10">
                <SliderListItem></SliderListItem>
            </div>
            <div id="event-list" class="mt-10">
                <p class="text-xl font-extrabold pl-3">Event</p>
                <EventListItem :title="evnet_title" :created_at="evnet_created_at"></EventListItem>
                <EventListItem :title="evnet_title" :created_at="evnet_created_at"></EventListItem>
                <EventListItem :title="evnet_title" :created_at="evnet_created_at"></EventListItem>
            </div>
            <div id="store" class="mt-10">
                <p class="text-xl font-extrabold pl-3">Store</p>
                <div class="flex justify-around">
                    <StoreListItem></StoreListItem>
                    <StoreListItem></StoreListItem>
                    <StoreListItem></StoreListItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BannerListItem from '../components/service/banner-list-item.vue';
import SliderListItem from '../components/service/slider-list-item.vue';
import EventListItem from '../components/service/service-list-item.vue';
import StoreListItem from '../components/service/store-list-item.vue';

export default {
    data() {
        return {
            evnet_title: 'オープンイベント : 初めて購入した場合ただ',
            evnet_created_at: '2012-03-04',
        }
    },
    mounted() {

    },
    methods: {

    },
    components: {
        BannerListItem,
        SliderListItem,
        EventListItem,
        StoreListItem,
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