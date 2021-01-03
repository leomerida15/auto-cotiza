<template>
	<section class="section">
		<list-sects />
		<float-btn type="sections" />
	</section>
</template>

<script>
	// modules
	// components
	import listSects from '@/components/dash/list-sects/';
	import floatBtn from '@/components/float-btn/';

	export default {
		name: 'section',
		props: [],
		components: { listSects, floatBtn },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>
