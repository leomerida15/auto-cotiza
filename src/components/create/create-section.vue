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

				<button :disabled="valid_form" class="btn waves-effect waves-light" type="submit" name="action">
					Crear
					<i class="material-icons right">send</i>
				</button>
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
				notify: { state: '', message: '' },
			};
		},
		methods: {
			...mapActions('sections', ['create_section']),
			async create() {
				try {
					const body = {
						name: this.name,
						price: this.price,
					};

					const resp = await this.create_section(body);

					this.name = '';
					this.price = '';
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
				return valid === 2 ? false : true;
			},
		},
	};
</script>

<style scoped lang="scss">
	// .create {
	// }
</style>
