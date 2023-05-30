import './assets/main.scss';
import {createApp} from 'vue';
import {VueQueryPlugin} from '@tanstack/vue-query';
import {MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder/src';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(MyParcelFormBuilderPlugin);

app.mount('#app');
