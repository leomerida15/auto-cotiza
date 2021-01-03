import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
// Admin
// import Admin from '../views/Admin/';
import Dash from '../views/Dash.vue';
import Products from '../views/Dash-Products.vue';
import Sections from '../views/Dash-Sections.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: {
			requiresAuth: false,
		},
		component: Home,
	},
	{
		path: '/Admin',
		name: 'Admin',
		meta: {
			requiresAuth: true,
		},
		component: Dash,
		children: [
			{ path: 'sections', component: Sections },
			{ path: 'products', component: Products },
			{ path: 'home', component: Products },
		],
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (localStorage.getItem('token')) next();
		else next({ name: 'Home' });
	} else {
		if (localStorage.getItem('token')) next({ name: 'Admin' });
		else next();
	}
});
export default router;
