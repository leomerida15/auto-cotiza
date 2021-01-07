import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// modules
import sections from './modules/sections';
import products from './modules/products';
import { production } from './global';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		type_auth: 'login',
		api: production ? 'https://auto-cotiza-muestra.herokuapp.com' : 'http://localhost:5000',
		pays: {
			total: 0,
			sistems: [],
			functions: [],
		},
		relations: [],
		lists: [],
	},
	mutations: {
		auth_inverse(state, type) {
			state.type_auth = type;
		},
		add_sistem(state, body) {
			// insert nuw sistem
			state.pays.sistems.push(body);
			const products = body.products;

			// define index and valid the existen function in the sistem
			const i = state.pays.sistems.length - 1;
			if (state.pays.functions.length > 0) {
				state.pays.functions.forEach((function_) => {
					if (products.indexOf(function_) != -1) {
						state.pays.sistems[i].price = state.pays.sistems[i].price + function_.price;
					}
				});
			}

			// define total
			const { sistems } = state.pays;
			state.pays.total = 0;
			sistems.forEach((sistem, i) => {
				state.pays.total = state.pays.total + sistem.price;
			});

			// valid and push fuction in the list
			products.forEach((product) => {
				const valid = state.lists.filter((list) => (list.id === product.id ? true : false));
				Promise.all(valid);

				if (valid.length === 0) state.lists.push(product);
			});
		},
		delete_sistem(state, id) {
			// define vars
			const { sistems, functions } = state.pays;
			const products = [];

			// remove the sistem
			sistems.forEach((sistem, i) => {
				if (sistem.id === id) {
					sistem.products.forEach((product) => products.push(product));

					state.pays.sistems.splice(i, 1);
				}
			});

			// valid and remove the product
			for (let j = 0; j < products.length; j++) {
				const product = products[j];

				// if do not existen sistems
				if (state.pays.sistems.length === 0) {
					state.lists = [];
					state.pays.total = 0;
					state.pays.functions = [];
				} else {
					// if do yes existen sistems
					sistems.forEach((sistem, i) => {
						// valid the existence of the product in other sistem
						const { products } = sistem;
						const valid_product = [];

						for (let k = 0; k < products.length; k++) {
							const e = products[k];

							if (e.id === product.id) {
								valid_product.push('');
							}
						}

						// remove value an data of product inValid
						if (valid_product.length === 0) {
							state.lists.forEach((item, k) => {
								if (item.id === product.id) {
									for (let i = 0; i < functions.length; i++) {
										const function_ = functions[i];

										if (function_.id === product.id) {
											const { sistems } = state.pays;

											sistems.forEach((sistem, j) => {
												state.pays.sistems[j].price = sistems[j].price - function_.price;
											});

											state.pays.functions.splice(i, 1);
										}
									}

									state.lists.splice(k, 1);
								}
							});
						}
					});
				}
			}

			state.pays.total = 0;
			sistems.forEach((sistem, i) => {
				state.pays.total = state.pays.total + sistem.price;
			});

			return true;
		},
		add_function(state, body) {
			state.pays.functions.push(body);

			const { sistems } = state.pays;

			sistems.forEach((sistem, i) => {
				state.pays.sistems[i].price = sistems[i].price + body.price;
			});

			state.pays.total = 0;
			sistems.forEach((sistem, i) => {
				state.pays.total = state.pays.total + sistem.price;
			});
		},
		delete_function(state, id) {
			const { functions } = state.pays;

			for (let i = 0; i < functions.length; i++) {
				const function_ = functions[i];

				if (function_.id === id) {
					const { sistems } = state.pays;

					sistems.forEach((sistem, j) => {
						state.pays.sistems[j].price = sistems[j].price - function_.price;
					});

					state.pays.functions.splice(i, 1);
				}
			}

			state.pays.total = 0;
			sistems.forEach((sistem, i) => {
				state.pays.total = state.pays.total + sistem.price;
			});

			return true;
		},
		define_relations: (state, info) => {
			state.relations = info;
		},
	},
	actions: {
		clear_pays({ commit, state }) {
			state.pays.functions.forEach(async (function_) => commit('delete_function', function_.id));

			state.pays.sistems.forEach(async (sistem) => commit('delete_sistem', sistem.id));

			return true;
		},
		async get_relations({ commit, state }) {
			try {
				const resp = await axios.get(state.api + '/relations');

				commit('define_relations', resp.data.info);
			} catch (err) {
				console.error(err);
			}
		},
	},
	modules: { sections, products },
});
