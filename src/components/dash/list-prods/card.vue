<template>
	<div class="card">
		<div class="card-image">
			<img :src="path" />
		</div>
		<div v-if="edit" class="card-content">
			<span class="card-title">{{ name }}</span>
			<p>ID: {{ id_product }} || Price: {{ price }}</p>
			<p>Productos:</p>
			<div class="chis">
				<div v-for="(section, i) in sections" :key="i" class="chip">
					{{ section.name }}
				</div>
			</div>
		</div>
		<div v-if="edit" class="card-action ed-grid s-grid-2">
			<a @click="delete_action(i)" class="waves-effect waves-light btn btn-small red">DELETE</a>
			<a @click="on_edit()" class="waves-effect waves-light btn btn-small green">EDIT</a>
		</div>

		<form v-if="!edit" class="card-content">
			<div>
				<div class="input-field">
					<input v-model="body.name" placeholder="Nombre" type="text" class="validate" />
				</div>
				<div class="input-field">
					<input v-model="body.price" placeholder="Precio" type="number" class="validate" />
				</div>
			</div>
			<p>Secciones:</p>
			<div class="chis">
				<div v-for="(section, i) in sections" :key="i" class="chip">
					{{ section.name }}
				</div>
			</div>
		</form>
		<div v-if="!edit" class="card-action ed-grid s-grid-2">
			<a @click="edit = !edit" class="waves-effect waves-light btn btn-small red">No Guardar</a>
			<a @click="save_edit(i)" class="waves-effect waves-light btn btn-small green">Guerdar</a>
		</div>
	</div>
</template>

<script>
	// modules
	import { mapState, mapActions } from 'vuex';
	import M from 'materialize-css';
	import axios from 'axios';

	export default {
		name: 'card',
		props: {
			id_product: { required: true },
			name: { required: true },
			price: { required: true },
			sections: { type: Array, required: true },
			i: { type: Number, required: true },
			path: { required: true },
		},
		mounted() {
			M.AutoInit();
			const e = document.querySelectorAll('.chips');
			M.Chips.init(e);
		},
		data() {
			return {
				edit: true,
				body: { name: '', price: '' },
			};
		},
		methods: {
			...mapActions('products', ['delete_product', 'edit_product']),
			async delete_action(i) {
				// Use sweetalert2
				const alerta = await this.$swal.fire({
					title: 'Esta seguro que desea eliminar este Producto?',
					text: 'Una ves eliminado no podra recuperarlo!',
					// type: 'warning',
					icon: 'question',
					showDenyButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'SI',
				});

				if (alerta.value) this.delete_product(i);
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
						const resp = await this.edit_product([i, body]);

						this.edit = !this.edit;
					}
				} catch (err) {
					console.log(err);
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
