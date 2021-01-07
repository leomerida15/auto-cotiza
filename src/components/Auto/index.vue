<template>
	<section class="index">
		<div class="ed-grid s-grid-1 m-grid-6">
			<div class="m-cols-4">
				<div class="ed-grid s-grid-1 m-grid-3">
					<ul class="tabs tabs-fixed-width tab-demo z-depth-1 ">
						<li class="tab"><a class="active" href="#test1">Secciones</a></li>
						<li class="tab"><a href="#test2">Productos</a></li>
					</ul>
				</div>

				<div class="card top-0">
					<div class="card-content ">
						<div id="test1">
							<div class="ed-grid s-grid-2 m-grid-3">
								<div v-for="(section, i) in sections" :key="i">
									<cards-sects :i="i" :desc="section.desc" :name="section.name" :path="section.path" />
								</div>
							</div>
						</div>
						<div id="test2">
							<div class="ed-grid s-grid-2 m-grid-3">
								<div v-for="(product, i) in lists" :key="i">
									<cards-prods :body="product" :i="i" :desc="product.desc" :name="product.name" :path="product.path" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="m-cols-2">
				<div class="card">
					<div class="card-content">
						<Pay />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	// components
	import CardsProds from './cards-prods';
	import CardsSects from './cards-sects';
	import Pay from './pay';
	// modules
	import Axios from 'axios';
	import { mapState, mapGetters, mapActions } from 'vuex';
	import M from 'materialize-css';

	export default {
		name: 'Auto',
		props: [],
		components: { CardsProds, CardsSects, Pay },
		async mounted() {
			const el = document.querySelectorAll('.tabs');
			M.Tabs.init(el);
		},
		data() {
			return {
				data_cards: [],
				active: true,
			};
		},
		methods: {},
		computed: { ...mapState('sections', ['sections']), ...mapState(['lists']) },
	};
</script>

<style scoped lang="scss">
	.top-0 {
		margin-top: 0;
	}
</style>
