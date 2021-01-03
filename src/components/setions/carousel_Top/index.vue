<template>
	<section class="index">
		<VueSlickCarousel v-bind="settings" ref="carousel" class=" center">
			<div
				@mouseover="hover = true"
				@mouseleave="hover = false"
				v-for="(item, i) in items"
				:key="i"
				class="carousel-item grey lighten-3  white-text"
				:href="item.href"
			>
				<Item :img="item.img" :sub="item.sub" :titel="item.titel" />
			</div>
		</VueSlickCarousel>
		<div class="progress">
			<div class="determinate" :style="'width: ' + counter + '%'"></div>
		</div>
	</section>
</template>

<script>
	import M from 'materialize-css';
	// components
	import Item from './item';

	export default {
		name: 'Sections-carousel',
		props: [],
		components: { Item },
		mounted() {
			const arrows = document.querySelectorAll('.slick-arrow');

			arrows.forEach((arrow) => arrow.classList.add('hide'));
		},
		data() {
			return {
				hover: false,
				items: [
					{ img: 'img/item1.png', titel: 'Diseño de Web CMS', sub: 'Gestionable y con CEO', href: '#one!' },
					{ img: 'img/item2.png', titel: 'Apps en las tiendas', sub: 'IOS y Android', href: '#two!' },
					{ img: 'img/item3.png', titel: 'Auto Cotizate,', sub: 'Mas rapido y Mas facil', href: '#three!' },
				],
				counter: 0,
				settings: {
					dots: true,
				},
			};
		},
		created() {
			let result = this.$crontab.addJob({
				name: 'counter',
				interval: {
					seconds: '/1',
				},
				job: this.countUp,
			});
		},
		methods: {
			countUp() {
				if (this.counter < 100) this.counter += 15;
				else if (this.counter >= 100) {
					this.counter = 0;
					if (!this.hover) this.$refs.carousel.next();
				}
			},
		},
		computed: {},
	};
</script>

<style lang="scss">
	.progress {
		margin-top: 0;
	}
</style>
