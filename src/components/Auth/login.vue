<template>
	<div class="s-center">
		<form @submit.prevent="login" class="modal-content">
			<div class="ed-grid s-grid-2">
				<div class="s-cols-2" v-if="notify.state != ''" @click="clear">
					<Notify :state="notify.state" :message="notify.message" />
				</div>

				<div class="s-cols-2">
					<v-icon :name="face" scale="3.5" class="black-text" @mouseover="face = face_one" @mouseleave="face = face_two" />
				</div>

				<span class="s-cols-2">Entrar</span>

				<div class="s-left">
					<a
						@mouseover="(size.g = ' btn-large'), (face = 'laugh-wink')"
						@mouseleave="(size.g = ' btn-small'), (face = face_two)"
						:class="['btn-floating waves-effect waves-light transparent', size.g]"
						@click="social_auth('Gmail')"
					>
						<img src="@/assets/img/redes/google.svg" alt="" />
					</a>
				</div>
				<div class="s-right">
					<a
						@mouseover="(size.f = ' btn-large'), (face = 'laugh-wink')"
						@mouseleave="(size.f = ' btn-small'), (face = face_two)"
						:class="['btn-floating waves-effect waves-light transparent', size.f]"
						@click="social_auth('face')"
					>
						<img src="@/assets/img/redes/facebook.svg" alt="" />
					</a>
				</div>

				<!-- <pre>{{ size.g }}</pre> -->

				<div class="input-field s-cols-2">
					<input v-model="email" id="register_user" type="email" class="validate" />
					<label for="register_user">Correo</label>
				</div>
				<div class="input-field s-cols-2">
					<input v-model="password" id="register_pass" type="password" class="validate" />
					<label for="register_pass">Contraseña</label>
				</div>

				<div class="s-cols-2">
					<button :disabled="LoginDisabled" class="btn amber waves-effect waves-light curve" type="submit" name="action">
						entrar
						<i class="material-icons right">send</i>
					</button>
				</div>
				<div class="s-cols-2" @click="auth_inverse('register')"><span>No estoy Registrado</span></div>
			</div>
		</form>
	</div>
</template>

<script>
	// modules
	import { mapState, mapMutations } from 'vuex';
	import axios from 'axios';
	import firebase from 'firebase';

	// components
	import Notify from '../notify';
	export default {
		name: 'login',
		props: [],
		components: { Notify },
		mounted() {},
		data() {
			return {
				face: 'smile',
				face_one: 'laugh',
				face_two: 'smile',
				email: '',
				password: '',
				password_confi: '',
				size: { g: ' btn-small', f: ' btn-small' },
				notify: { state: '', message: '' },
			};
		},
		methods: {
			...mapMutations(['auth_inverse', 'clear_pays']),
			async login() {
				try {
					// obj for the petition
					const data = { email: this.email, password: this.password };
					// petition
					const resp = await axios.post(this.api + '/login', data);
					// filter the respues
					const { message, info } = resp.data;

					localStorage.setItem('token', info.token);

					// notify of the proces
					this.notify = { state: 'ok', message };

					// rediret
					this.$router.push('/Admin/home');
				} catch (err) {
					const { message } = err.response.data;
					console.log(err);
					// error catch
					this.notify = { state: 'err', message };
				}
			},
			async social_auth(serv) {
				try {
					let provider;
					switch (serv) {
						case 'Gmail':
							provider = new firebase.auth.GoogleAuthProvider();
							break;
						case 'face':
							provider = new firebase.auth.FacebookAuthProvider();
							break;
					}

					const resp_auth = await firebase.auth().signInWithPopup(provider);

					const { isNewUser } = resp_auth.additionalUserInfo;
					const { email } = firebase.auth().currentUser;

					if (firebase.auth().currentUser) {
						const data = { isNewUser, email };

						console.log(data);

						const resp = await axios.post(this.api + '/social', data);

						// filter the respues
						const { message, info } = resp.data;

						localStorage.setItem('token', info.token);

						// notify of the proces
						this.notify = { state: 'ok', message: 'OK' };

						// rediret
						this.$router.push('/Admin/home');
					} else throw 'err';
				} catch (err) {
					this.notify = { state: 'err', message: 'err' };
				}
			},
			clear() {
				this.notify.state = '';
				this.notify.message = '';
			},
		},
		computed: {
			...mapState(['api']),
			LoginDisabled() {
				if (
					this.email != '' &&
					this.password != '' &&
					this.password.length >= 6 &&
					this.email.indexOf('@') != -1 &&
					this.email.lastIndexOf('.com') != -1
				) {
					return false;
				} else {
					return true;
				}
			},
		},
	};
</script>

<style scoped lang="scss"></style>
