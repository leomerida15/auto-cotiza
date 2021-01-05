<template>
	<div class="home">
		<Nav-Bar type="admin" />
		<router-view />
	</div>
</template>

<script>
	// @ is an alias to /src
	//components
	import NavBar from '@/components/NavBar/';
	// Modules

	export default {
		name: 'Dash',
		components: { NavBar },
		mounted() {},
		computed: {},
		methods: {},
	};
</script>
