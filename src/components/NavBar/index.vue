<template>
	<div>
		<div v-show="type === 'home'"><Home /></div>
		<div v-show="type === 'admin'"><Admin /></div>
	</div>
</template>

<script>
	// modules
	import M from 'materialize-css';
	// components
	import Home from '@/components/NavBar/home';
	import Admin from '@/components/NavBar/admin';

	export default {
		name: 'NavBar',
		props: { type: { type: String, default: 'home' } },
		components: { Home, Admin },
		mounted() {
			M.AutoInit();
			let elems = document.querySelectorAll('.modal');
			M.Modal.init(elems);
		},
		data() {
			return { type_auth: 'login' };
		},
		methods: {},
		computed: {},
	};
</script>

<style lang="scss">
	.logo {
		width: 4rem;
		height: 4rem;
	}
	#auth {
		width: 280px;
	}
</style>
