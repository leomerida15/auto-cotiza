<template>
	<div class="card">
		<div class="card-image">
			<img :src="path" />
			<a v-if="!show" @click="check(body)" class="btn-floating halfway-fab waves-effect waves-light red">
				<i class="material-icons">add</i>
			</a>
			<a v-if="show" @click="check(body)" class="btn-floating halfway-fab waves-effect waves-light green">
				<i class="material-icons">check</i>
			</a>
		</div>
		<div class="card-content">
			<span class="card-title activator grey-text text-darken-4">
				{{ name }}
				<i class="material-icons right">more_vert</i>
			</span>
		</div>
		<div class="card-reveal">
			<span class="card-title grey-text text-darken-4">
				{{ name }}
				<i class="material-icons right">close</i>
			</span>
			<p>{{ desc }}</p>
		</div>
	</div>
</template>

<script>
	// modules
	import { mapState, mapMutations } from 'vuex';
	import Axios from 'axios';
	export default {
		name: 'cards',
		props: ['name', 'desc', 'i', 'path', 'body'],
		data() {
			return {
				show: false,
			};
		},
		async mounted() {},
		methods: {
			...mapMutations(['add_function', 'delete_function']),
			check(body) {
				this.show = !this.show;

				if (!this.show) {
					const { id } = body
					this.delete_function(id);
				} else {
					this.add_function(body);
				}
			},
		},
		computed: { ...mapState('products', ['products']) },
	};
</script>

<style scoped lang="scss">
	// .tabs {
	// }
</style>
