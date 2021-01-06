<template>
	<div class="home">
		<Nav-Bar />
		<carousel-top />
		<Auto />
	</div>
</template>

<script>
	// @ is an alias to /src
	//components
	import NavBar from '@/components/NavBar/';
	import carouselTop from '@/components/setions/carousel_Top/';
	import Auto from '@/components/Auto/';

	// Modules
	import { mapActions } from 'vuex';
	// import M from 'materialize-css'

	export default {
		name: 'NavBarHome',
		components: { NavBar, carouselTop, Auto },
		mounted() {
			this.get_relations();
		},
		computed: {},
		methods: { ...mapActions(['get_relations']) },
	};
</script>
