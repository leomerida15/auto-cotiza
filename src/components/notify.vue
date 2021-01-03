<template>
	<section :class="'notify ed-grid s-grid-1'">
		<div class="waves-effect waves-light btn green" v-if="state === 'ok'">{{ message }}</div>
		<div class="waves-effect waves-light btn red" v-else-if="state === 'err'">{{ message }}</div>
		<div class="waves-effect waves-light btn blue" v-else-if="state === 'load'">{{ message }}</div>
	</section>
</template>

<script>
	export default {
		name: 'notify',
		props: {
			state: {
				type: String,
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
			action: {
				type: Function,
				required: false,
			},
		},
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>

<style scoped lang="scss">
	// .notify {

	// }
</style>
