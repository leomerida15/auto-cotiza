<template leng="html">
	<section class="">
		<br />
		<div class="ed-grid s-grid-1 m-grid-2">
			<div class="center black-text">
				<h3>{{ titel }}</h3>
				<h3 class="black-text">{{ sub }}</h3>
			</div>

			<img :src="img" class="z-depth-5" id="img-item" />
		</div>
	</section>
</template>

<script>
	export default {
		name: 'item-1',
		props: ['titel', 'sub', 'img'],
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>

<style lang="scss">
	#img-item {
		border-radius: 6pt;
	}
</style>
