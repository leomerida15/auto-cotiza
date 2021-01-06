<template>
	<section class="section">
		<list-sects />
		<float-btn type="sections" />
	</section>
</template>

<script>
	// modules
	import { mapActions } from 'vuex';
	// components
	import listSects from '@/components/dash/list-sects/';
	import floatBtn from '@/components/float-btn/';

	export default {
		name: 'section',
		props: [],
		components: { listSects, floatBtn },
		mounted() {
			this.get_sections();
		},
		data() {
			return {};
		},
		methods: { ...mapActions('sections', ['get_sections']) },
		computed: {},
	};
</script>
