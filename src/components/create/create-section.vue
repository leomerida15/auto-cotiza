<template>
	<section class="create">
		<form @submit.prevent="create" class="ed-grid s-grid-1 m-grid-2" enctype="multipart/form-data">
			<div>
				<br />
				<div v-if="notify.state != ''" @click="clear">
					<Notify :state="notify.state" :message="notify.message" />
				</div>
				<h3 class="m-cols-2">Crear Seccion</h3>
				<div class="input-field ">
					<i class="material-icons prefix">comment_bank</i>
					<input v-model="name" type="text" id="name_for_create" class="validate" />
					<label for="name_for_create">Nombre</label>
				</div>

				<div class="input-field ">
					<i class="material-icons prefix">monetization_on</i>
					<input v-model="price" type="number" min="1" id="price_for_create" class="validate" />
					<label for="price_for_create">Precio</label>
				</div>

				<div class="ed-container">
					<div class="ed-item s-1-3">
						<button :disabled="valid_form" class="btn waves-effect waves-light" type="submit" name="action">
							Crear
							<i class="material-icons right">send</i>
						</button>
					</div>
					<div class="ed-item s-1-3">
						<div class="file-field input-field waves-effect waves-light btn">
							Imagen
							<input type="file" ref="file" @change="previewImage" accept="image/*" />
						</div>
					</div>
				</div>
			</div>

			<div class="card z-depth-3">
				<img :src="imageData" />
			</div>
		</form>
	</section>
</template>

<script>
	// modules
	import { mapState, mapActions } from 'vuex';
	import axios from 'axios';
	// components
	import Notify from '@/components/notify';
	// instance
	export default {
		name: 'create-section',
		props: [],
		components: { Notify },
		async mounted() {},
		data() {
			return {
				name: '',
				price: '',
				files: {},
				files_valid: false,
				imageData: '',
				notify: { state: '', message: '' },
			};
		},
		methods: {
			...mapActions('sections', ['create_section']),
			previewImage: function(event) {
				const input = event.target;
				this.files = event.target.files[0];
				this.files_valid = true;
				if (input.files && input.files[0]) {
					const reader = new FileReader();

					reader.onload = (e) => (this.imageData = e.target.result);

					reader.readAsDataURL(input.files[0]);
				}
			},
			async create() {
				try {
					const body = new FormData();

					body.append('name', this.name);
					body.append('price', this.price);
					body.append('files', this.files);

					const resp = await this.create_section(body);

					this.name = '';
					this.price = '';
					this.files = {};
					this.imageData = '';
					this.files_valid = false;
					this.notify = { state: 'ok', message: 'Su seccion fue creada con Exito' };
				} catch (err) {
					this.notify = { state: 'err', message: 'Su seccion No fue creada' };
				}
			},
			clear() {
				this.notify.state = '';
				this.notify.message = '';
			},
		},
		computed: {
			...mapState(['api']),
			valid_form() {
				let valid = 0;
				if (this.name) valid++;
				if (this.price) valid++;
				if (this.files_valid) valid++;
				return valid === 3 ? false : true;
			},
		},
	};
</script>

<style scoped lang="scss">
	.file-field {
		margin: 0;
	}
</style>
