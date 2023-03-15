import './bootstrap';

import Alpine from 'alpinejs';

import {createApp} from 'vue';

import ExampleComponent from './components/ExampleComponent.vue';

createApp(ExampleComponent).mount('#example');

window.Alpine = Alpine;

Alpine.start();
