import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// libs extras
// styles
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'sweetalert2/dist/sweetalert2.min.css';

// modulos extras
// Code
import VueCrontab from 'vue-crontab';
import VueFeather from 'vue-feather';
import VSwitch from 'v-switch-case';
import VueSweetalert2 from 'vue-sweetalert2';
import firebase from 'firebase/app';
import 'firebase/auth';

// components
import VueSlickCarousel from 'vue-slick-carousel';
import vSelect from 'vue-select';

// Icons
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

Vue.use(VSwitch);
Vue.use(VueFeather);
Vue.use(VueCrontab);
Vue.use(VueSweetalert2);

Vue.component('v-select', vSelect);
Vue.component('VueSlickCarousel', VueSlickCarousel);
Vue.component('v-icon', Icon);

Vue.config.productionTip = false;

const firebaseConfig = {
	apiKey: 'AIzaSyAQdGNMo315RKhio4t6jq0xG5K2pZvzy7o',
	authDomain: 'auto-cotiza.firebaseapp.com',
	projectId: 'auto-cotiza',
	storageBucket: 'auto-cotiza.appspot.com',
	messagingSenderId: '364600860765',
	appId: '1:364600860765:web:0804d7a192d68b2799edb4',
};

firebase.initializeApp(firebaseConfig);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
