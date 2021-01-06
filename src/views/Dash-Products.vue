<template>
	<section class="section">
		<list-prods />
		<float-btn type="products" />
	</section>
</template>

<script>
	// modules
	import { mapActions } from 'vuex';
	// components
	import listProds from '@/components/dash/list-prods/';
	import floatBtn from '@/components/float-btn/';

	export default {
		name: 'products',
		props: [],
		components: { listProds, floatBtn },
		mounted() {
			this.get_sections();
			this.get_products();
		},
		data() {
			return {};
		},
		methods: {
			...mapActions('sections', ['get_sections']),
			...mapActions('products', ['get_products']),
		},
		computed: {},
	};
</script>
