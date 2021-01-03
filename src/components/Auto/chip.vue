<template>
	<div class="chip">
		<p>
			<label>
				<input v-model="show" @click="check(i)" type="checkbox" />
				<span>{{ name }}</span>
			</label>
		</p>
	</div>
</template>

<script>
	// modules
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'chip',
		props: ['name', 'id_section', 'i'],
		mounted() {},
		data() {
			return { show: false };
		},
		methods: {
			...mapMutations(['add_sistem', 'delete_sistem']),
			check(i) {
				if (this.show) {
					const { id } = this.sections[i];
					this.delete_sistem(id);
				} else {
					const body = this.sections[i];
					this.add_sistem(body);
				}
			},
		},
		computed: { ...mapState('sections', ['sections']) },
	};
</script>

<style scoped lang="scss"></style>
