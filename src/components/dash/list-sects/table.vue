<template>
	<tr>
		<!-- view -->
		<td v-if="!edit">{{ id_section }}</td>
		<td v-if="!edit">{{ name_section }}</td>
		<td v-if="!edit">{{ price }}</td>
		<td v-if="!edit">
			<div class="chips-table">
				<div v-for="(product, j) in products" :key="j" class="chip">
					{{ product.name }}
				</div>
			</div>
		</td>
		<td v-if="!edit" class="ed-grid s-grid-2">
			<a @click="delete_action(i)" class="waves-effect waves-light btn btn-small red">DELETE</a>
			<a @click="on_edit()" class="waves-effect waves-light btn btn-small green">EDIT</a>
		</td>

		<!-- edit -->

		<td v-if="edit">{{ id_section }}</td>
		<td v-if="edit">
			<div class="input-field">
				<input v-model="body.name" placeholder="Nombre" type="text" class="validate" />
			</div>
		</td>
		<td v-if="edit">
			<div class="input-field">
				<input v-model="body.price" placeholder="Precio" type="number" class="validate" />
			</div>
		</td>
		<td v-if="edit">
			<div class="chis-table">
				<div v-for="(product, j) in products" :key="j" class="chip">
					{{ product.name }}
				</div>
			</div>
		</td>
		<td v-if="edit" class="ed-grid s-grid-2">
			<a @click="edit = !edit" class="waves-effect waves-light btn btn-small red">No Guardar</a>
			<a @click="save_edit(i)" class="waves-effect waves-light btn btn-small green">Guerdar</a>
		</td>
	</tr>
</template>

<script>
	// modules
	import { mapState, mapActions } from 'vuex';
	import M from 'materialize-css';
	import axios from 'axios';

	export default {
		name: 'table',
		props: {
			id_section: { required: true },
			name_section: { required: true },
			price: { required: true },
			products: { type: Array, required: true },
			i: { type: Number, required: true },
		},
		mounted() {
			M.AutoInit();
			const e = document.querySelectorAll('.chips');
			M.Chips.init(e);
		},
		data() {
			return {
				edit: false,
				body: { name: '', price: '' },
			};
		},
		methods: {
			...mapActions('sections', ['delete_section', 'edit_section']),
			async delete_action(i) {
				// Use sweetalert2
				const alerta = await this.$swal.fire({
					title: 'Esta seguro que desea eliminar esta seccion?',
					text: 'Una ves eliminada no podra recuperarla!',
					// type: 'warning',
					icon: 'question',
					showDenyButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'SI',
				});

				if (alerta.value) this.delete_section(i);
			},
			async save_edit(i) {
				try {
					// Use sweetalert2
					const alerta = await this.$swal.fire({
						title: 'Esta seguro que desea editar esta seccion?',
						text: 'Una ves eliminada no podra recuperarla!',
						// type: 'warning',
						icon: 'question',
						showDenyButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'SI',
					});

					const body = { name: this.body.name, price: this.body.price };

					if (alerta.value) {
						const resp = await this.edit_section([i, body]);

						this.edit = !this.edit;
					}
				} catch (err) {
					if (typeof err != 'string') alert(err);
					else alert(err.response.message);
				}
			},
			on_edit() {
				this.edit = !this.edit;
			},
		},
		computed: { ...mapState(['api']) },
	};
</script>

<style scoped lang="scss"></style>
