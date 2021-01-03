<template>
	<section class="section">
		<list-prods />
		<float-btn type="products" />
	</section>
</template>

<script>
	// modules
	// components
	import listProds from '@/components/dash/list-prods/';
	import floatBtn from '@/components/float-btn/';

	export default {
		name: 'about',
		props: [],
		components: { listProds, floatBtn },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>
