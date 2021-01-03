<template>
	<section class="ed-grid s-grid-2 m-grid-4">
		<div class="s-cols-2 m-cols-4">
			<div v-if="type === 'product'"><create-card /></div>
			<div v-if="type === 'section'"><create-section /></div>
		</div>
	</section>
</template>

<script>
	// components
	import createCard from './create-card';
	import createSection from './create-section';

	export default {
		name: 'Create',
		props: { type: { type: String } },
		components: { createCard, createSection },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>

<style scoped lang="scss">
	// .index {
	// }
</style>
