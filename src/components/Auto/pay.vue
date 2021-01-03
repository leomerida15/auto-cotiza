<template>
	<section class="pay">
		<table>
			<thead>
				<tr>
					<th>Total</th>
					<th>Pagar</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>{{ pays.total }}</td>
					<td><a class="waves-effect waves-light btn ">Pagar</a></td>
				</tr>
			</tbody>

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
