<template>
	<section class="list-sects">
		<div class="ed-grid s-grid-2 m-grid-12">
			<div class="m-x-11">
				<a @click="see = 'card'" class="btn-floating btn-large waves-effect waves-light btn-flat">
					<i class="black-text material-icons">grid_on</i>
				</a>
			</div>
			<div class="m-x-12">
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
								<th data-field="products">Productos</th>
								<th data-field="function">Funciones</th>
							</tr>
						</thead>
						<tbody>
							<list-table
								v-for="(section, i) in sections"
								:key="i"
								:i="i"
								:id_section="section.id"
								:price="section.price"
								:name_section="section.name"
								:products="section.products"
							/>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div v-else-if="see === 'card'" class="ed-grid s-grid-1 m-grid-3 lg-grid-4">
			<list-card
				v-for="(section, i) in sections"
				:key="i"
				:i="i"
				:id_section="section.id"
				:price="section.price"
				:name_section="section.name"
				:products="section.products"
			/>
		</div>
	</section>
</template>

<script>
	// modules
	import { mapState, mapActions } from 'vuex';
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
		computed: { ...mapState('sections', ['sections']) },
	};
</script>

<style scoped lang="scss"></style>
