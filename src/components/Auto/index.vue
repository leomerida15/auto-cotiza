<template>
	<section class="index">
		<div class="ed-grid s-grid-1 m-grid-6">
			<div class="m-cols-6">
				<div class="">
					<Chip v-for="(section, i) in sections" :key="i" :id_section="section.id" :i="i" :name="section.name" />
				</div>
			</div>
			<div class="m-cols-4">
				<div class="card">
					<div class="card-content ed-grid s-grid-2 m-grid-3">
						<Card
							v-for="(product, i) in products"
							:key="i"
							:i="i"
							:desc="product.desc"
							:name="product.name"
							:path="product.path"
						/>
					</div>
				</div>
			</div>
			<div class="m-cols-2">
				<div class="card">
					<div class="card-content"><Pay /></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	// components
	import Card from './cards';
	import Chip from './chip';
	import Pay from './pay';
	// modules
	import Axios from 'axios';
	import { mapState } from 'vuex';
	export default {
		name: 'Auto',
		props: [],
		components: { Card, Chip, Pay },
		async mounted() {},
		data() {
			return {
				data_cards: [],
			};
		},
		methods: {},
		computed: { ...mapState('sections', ['sections']), ...mapState('products', ['products']) },
	};
</script>

<style scoped lang="scss">
	// .index {
	// }
</style>
