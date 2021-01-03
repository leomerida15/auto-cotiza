<template>
	<router-view />
</template>

<script>
	import { mapActions } from 'vuex';
	export default {
		name: 'App',
		props: [],
		components: {},
		mounted() {
			this.get_sections();
			this.get_products();
		},
		data() {
			return {};
		},
		methods: { ...mapActions('sections', ['get_sections']), ...mapActions('products', ['get_products']) },
		computed: {},
	};
</script>

<style lang="scss" src="./sass/index.scss"></style>
