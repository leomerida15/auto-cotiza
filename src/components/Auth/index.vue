<template>
	<section class="auth ">
		<div v-if="type_auth === 'login'"><login /></div>
		<div v-if="type_auth === 'register'"><register /></div>
	</section>
</template>

<script>
	// module
	import { mapState } from 'vuex';
	import M from 'materialize-css';
	// components
	import login from './login';
	import register from './register';
	export default {
		name: 'Auth',
		props: { type: { type: String } },
		components: { login, register },
		mounted() {
			let elems = document.querySelectorAll('.modal');
			M.Modal.init(elems);
		},
		data() {
			return {};
		},
		methods: {},
		computed: { ...mapState(['type_auth']) },
	};
</script>

<style scoped lang="scss"></style>
