<template>
	<section class="float-btn">
		<div v-if="type === 'sections'" id="create" class="modal">
			<div class="modal-content"><Create type="section" /></div>
		</div>
		<div v-else-if="type === 'products'" id="create" class="modal">
			<div class="modal-content"><Create type="product" /></div>
		</div>

		<div class="fixed-action-btn click-to-toggle">
			<a class="btn-floating btn-large black waves-effect waves-yellow modal-trigger" :href="type ? '#create' : ''">
				<i class="large material-icons">add</i>
			</a>
		</div>
	</section>
</template>

<script>
	// modules
	import M from 'materialize-css';
	// components
	import Create from '../create/';
	export default {
		name: 'float-btn',
		props: ['type'],
		components: { Create },
		mounted() {
			const elems = document.querySelectorAll('.modal');
			const instances = M.Modal.init(elems);
		},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	};
</script>

<style scoped lang="scss">
	.modal-content {
		padding-bottom: 0;
		padding-top: 0.2rem;
	}
</style>
