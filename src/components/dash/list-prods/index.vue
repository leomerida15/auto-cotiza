<template>
	<div class="list-sects">
		<div class="ed-grid s-grid-6 m-grid-12">
			<h2 class="top-name">Productos</h2>

			<div class="s-x-5 m-x-11">
				<a @click="see = 'card'" class="btn-floating btn-large waves-effect waves-light btn-flat">
					<i class="black-text material-icons">grid_on</i>
				</a>
			</div>
			<div class="s-x-6 m-x-12">
				<a @click="see = 'list'" class="btn-floating btn-large waves-effect waves-light btn-flat">
					<i class="black-text material-icons">format_list_numbered</i>
				</a>
			</div>
		</div>
		<br />
		<div v-if="see === 'list'" class="ed-grid s-grid-1">
			<div class="card">
				<div class="card-content">
					<table class="bordered highlight responsive-table">
						<thead>
							<tr>
								<th data-field="id">ID</th>
								<th data-field="name">Nombre</th>
								<th data-field="price">Precio</th>
								<th data-field="products">Secciones</th>
								<th data-field="function">Funciones</th>
							</tr>
						</thead>
						<tbody>
							<list-table
								v-for="(product, i) in products"
								:key="i"
								:i="i"
								:id_product="product.id"
								:price="product.price"
								:name="product.name"
								:sections="product.sections"
							/>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div v-else-if="see === 'card'" class="ed-grid s-grid-1 m-grid-3 lg-grid-4">
			<list-card
				v-for="(product, i) in products"
				:key="i"
				:i="i"
				:id_product="product.id"
				:price="product.price"
				:name="product.name"
				:sections="product.sections"
				:path="product.path"
			/>
		</div>
	</div>
</template>

<script>
	// modules
	import { mapState } from 'vuex';
	// components
	import listTable from './table';
	import listCard from './card';

	export default {
		name: 'list-sects',
		props: [],
		components: { listTable, listCard },
		mounted() {},
		data() {
			return { see: 'card' };
		},
		methods: {},
		computed: { ...mapState('products', ['products']) },
	};
</script>

<style scoped lang="scss">
	.top-name {
		margin: 0;
	}
</style>
