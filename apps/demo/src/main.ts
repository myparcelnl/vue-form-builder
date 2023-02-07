import './assets/main.scss';
import App from './App.vue';
import {MyParcelFormBuilderPlugin} from '@myparcel/vue-form-builder/src';
import {VueQueryPlugin} from '@tanstack/vue-query';
import {createApp} from 'vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(MyParcelFormBuilderPlugin);

app.mount('#app');
