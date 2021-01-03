<template>
	<div>
		<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper black z-depth-5">
					<a href="#" class="brand-logo left logo"><img src="@/assets/img/logo.png" alt="logo" /></a>

					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li>
							<a class="modal-trigger" href="#auth" @click="auth_inverse('login')">
								login
							</a>
						</li>
						<li><a class="modal-trigger" href="#auth" @click="auth_inverse('register')">register</a></li>
					</ul>

					<a data-target="slide-out" class="sidenav-trigger right">
						<i class="material-icons">menu</i>
					</a>
				</div>
			</nav>
		</div>

		<div id="auth" class="modal grey lighten-2"><Auth /></div>

		<ul id="slide-out" class="sidenav ">
			<li>
				<div class="user-view">
					<div class="background black"></div>
					<a href="#name"><span class="yellow-text name ">CodeGO</span></a>
				</div>
			</li>

			<li>
				<a class="modal-trigger" href="#auth" @click="auth_inverse('login')">
					login
				</a>
			</li>
			<li><a class="modal-trigger" href="#auth" @click="auth_inverse('register')">register</a></li>
		</ul>
	</div>
</template>

<script>
	// Module
	import { mapState, mapMutations } from 'vuex';
	import M from 'materialize-css';

	// components
	import Auth from '@/components/Auth';

	export default {
		name: 'NavBarHome',
		props: [],
		components: { Auth },
		mounted() {
			const elems = document.querySelectorAll('.sidenav');
			M.Sidenav.init(elems, { draggable: true });
		},
		data() {
			return {};
		},
		methods: { ...mapMutations(['auth_inverse']) },
		computed: { ...mapState(['type_auth']) },
	};
</script>

<style lang="scss">
	.logo {
		width: 4.4rem;
		height: 4.4rem;
	}
	#auth {
		width: 280px;
	}
</style>
