import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// modules
import sections from './modules/sections';
import products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		type_auth: 'login',
		api: 'http://localhost:5000',
		pays: {
			total: 0,
			sistems: [],
			functions: [],
		},
	},
	mutations: {
		auth_inverse(state, type) {
			state.type_auth = type;
		},
		add_sistem(state, body) {
			state.pays.sistems.push(body);

			const i = state.pays.sistems.length - 1;

			if (state.pays.functions.length > 0) {
				state.pays.functions.forEach((function_) => {
					state.pays.sistems[i].price = state.pays.sistems[i].price + function_.price;
				});
			}

			const { sistems } = state.pays;
			state.pays.total = 0;
			sistems.forEach((sistem, i) => {
				state.pays.total = state.pays.total + sistem.price;
			});
		},
		delete_sistem(state, id) {
			const { sistems, functions } = state.pays;

			for (let i = 0; i < sistems.length; i++) {
				const sistem = sistems[i];

				if (sistem.id === id) {
					functions.forEach((function_) => {
						state.pays.sistems[i].price = state.pays.sistems[i].price - function_.price;
					});
					state.pays.sistems.splice(i, 1);
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
	},
	actions: {
		clear_pays({ commit, state }) {
			state.pays.functions.forEach(async (function_) => commit('delete_function', function_.id));

			state.pays.sistems.forEach(async (sistem) => commit('delete_sistem', sistem.id));

			return true;
		},
	},
	modules: { sections, products },
});
