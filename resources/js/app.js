import './bootstrap';

import Alpine from 'alpinejs';

import { createApp } from 'vue';

// import Slider from './components/main/Slider.vue';

// createApp(Slider).mount('#slider');

import Customer from './components/customer/Customer.vue';
createApp(Customer).mount('#customer');

import NoticeDetail from './components/customer/NoticeDetail.vue';
createApp(NoticeDetail).mount('#Notice');

import QnaDetail from './components/customer/QnaDetail.vue';
createApp(QnaDetail).mount('#qna');

window.Alpine = Alpine;

Alpine.start();
