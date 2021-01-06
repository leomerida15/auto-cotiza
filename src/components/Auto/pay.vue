<template>
	<section class="pay">
		<table class="striped">
			<thead>
				<tr>
					<th>Sistemas</th>
					<th>Precio</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(sistem, i) in pays.sistems" :key="i">
					<td>{{ sistem.name }}</td>
					<td>{{ sistem.price }}</td>
				</tr>
			</tbody>

			<thead>
				<tr>
					<th>Funciones</th>
					<th>Precio</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(function_, i) in pays.functions" :key="i">
					<td>{{ function_.name }}</td>
					<td>{{ function_.price }}</td>
				</tr>
			</tbody>

			<thead>
				<tr>
					<th></th>

					<th>Total</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td><a class="waves-effect waves-light btn ">Pagar</a></td>
					<td>{{ pays.total }}</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script>
	// modules
	import { mapState } from 'vuex';
	export default {
		name: 'pay',
		props: [],
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {
			...mapState('sections', ['sections']),

			...mapState(['pays']),
		},
	};
</script>

<style scoped lang="scss"></style>
