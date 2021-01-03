<template>
	<div>
		<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper black z-depth-5">
					<a href="#" class="brand-logo left logo"><img src="@/assets/img/logo.png" alt="logo" /></a>

					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li>
							<router-link to="/Admin/products">Productos</router-link>
						</li>
						<li>
							<router-link to="/Admin/sections">Secciones</router-link>
						</li>
						<li>
							<a @click="exit">Salir</a>
						</li>
					</ul>

					<a data-target="slide" class="sidenav-trigger right">
						<i class="material-icons">menu</i>
					</a>
				</div>
			</nav>
		</div>

		<ul id="slide" class="sidenav ">
			<li>
				<div class="user-view">
					<div class="background black"></div>
					<a href="#name"><span class="yellow-text name ">CodeGO</span></a>
				</div>
			</li>

			<li>
				<router-link to="/Admin/products">Productos</router-link>
			</li>
			<li>
				<router-link to="/Admin/sections">Secciones</router-link>
			</li>
			<li>
				<a @click="exit">Salir</a>
			</li>
		</ul>
	</div>
</template>

<script>
	// Module
	import M from 'materialize-css';
	// modules
	import { mapState, mapMutations } from 'vuex';

	export default {
		name: 'NavBarAdmin',
		props: [],
		components: {},
		mounted() {
			M.AutoInit();
		},
		data() {
			return {};
		},
		methods: {
			...mapMutations(['delete_function', 'delete_sistem']),
			async exit() {
				const resp_ids = this.pays.functions.map((function_) => function_.id);
				const ids_functions = await Promise.all(resp_ids);

				ids_functions.forEach(async (id) => {
					this.delete_function(id);
				});

				const sistems_ids = this.pays.sistems.map((sistem) => sistem.id);
				const ids_sistems = await Promise.all(sistems_ids);

				ids_sistems.forEach(async (id) => {
					this.delete_sistem(id);
				});

				localStorage.removeItem('token');
				this.$router.push('/');
			},
		},
		computed: { ...mapState(['pays']) },
	};
</script>

<style lang="scss">
	#logo {
		width: 4.4rem;
		height: 4.4rem;
	}
	#auth {
		width: 280px;
	}
</style>
