<template>
	<section class="create">
		<form @submit.prevent="create" class="ed-grid s-grid-1 m-grid-2" enctype="multipart/form-data">
			<div>
				<div v-if="notify.state != ''" @click="clear">
					<Notify :state="notify.state" :message="notify.message" />
				</div>
				<h3 class="m-cols-2 sub-titel">Crear Producto</h3>

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

				<div class="input-field">
					<i class="material-icons prefix">mode_edit</i>
					<textarea v-model="desc" maxlength="60" id="icon_prefix2" class="materialize-textarea"></textarea>
					<label for="icon_prefix2">Descriccion</label>
				</div>

				<div class="input-field">
					<i class="material-icons prefix">reorder</i>
					<select v-model="sects" multiple>
						<option value="0" disabled selected>Choose your option</option>
						<option v-for="(section, i) in sections" :value="section.id" :key="i">{{ section.name }}</option>
					</select>
				</div>

				<button :disabled="valid_form" class="btn waves-effect waves-light" type="submit" name="action">
					Crear
					<i class="material-icons right">send</i>
				</button>
				<div class="file-field input-field waves-effect waves-light btn">
					Imagen
					<input type="file" ref="file" @change="previewImage" accept="image/*" />
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
	import Axios from 'axios';
	import M from 'materialize-css';
	// components
	import Notify from '../notify';

	export default {
		name: 'create-card',
		props: ['item'],
		components: { Notify },
		mounted() {
			const elems = document.querySelectorAll('select');
			M.FormSelect.init(elems);
		},
		data() {
			return {
				name: '',
				desc: '',
				price: '',
				files: {},
				files_valid: false,
				imageData: '',
				sects: [0],
				notify: { state: '', message: '' },
			};
		},
		methods: {
			...mapActions('products', ['create_product', 'get_products']),
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
					body.append('desc', this.desc);
					body.append('price', this.price);
					body.append('files', this.files);
					body.append('sects', this.sects);

					const resp = await this.create_product(body);
					if (!resp) throw 'err';

					this.name = '';
					this.price = '';
					this.desc = '';
					this.files = {};
					this.imageData = '';
					this.sects = [];
					this.files_valid = false;
					this.notify = { state: 'ok', message: 'Su Producto fue creada con Exito' };
				} catch (err) {
					this.notify = { state: 'err', message: 'Su Producto No fue creada' };
				}
			},
			clear() {
				this.notify.state = '';
				this.notify.message = '';
			},
		},
		computed: {
			...mapState(['api']),
			...mapState('sections', ['sections']),
			valid_form() {
				let valid = 0;
				if (this.name) valid++;
				if (this.price) valid++;
				if (this.desc) valid++;
				if (this.files_valid) valid++;
				return valid === 4 ? false : true;
			},
		},
	};
</script>

<style scoped lang="scss">
	.sub-titel {
		margin: 0;
	}
</style>
