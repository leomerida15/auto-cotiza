import axios from 'axios';
import { production } from '../global';

export default {
	namespaced: true,
	state: {
		products: [],
		api: production ? 'https://auto-cotiza-muestra.herokuapp.com' : 'http://localhost:5000',
		edit: false,
	},
	mutations: {
		define_products: (state, info) => (state.products = info),
		push_products: (state, info) => state.products.push(info),
		delete_product: (state, i) => state.products.splice(i, 1),
		edit_product: (state, data) => {
			const i = data[0];
			const body = data[1];

			const price = parseInt(body.price);

			state.products[i].name = body.name;
			state.products[i].price = price;
		},
	},
	actions: {
		async create_product({ commit, state }, body) {
			try {
				// define Token  in the headres
				const headers = { token: localStorage.getItem('token') };
				const resp = await axios.post(state.api + '/product', body, { headers });

				commit('push_products', resp.data.info);

				return true;
			} catch (err) {
				return false;
			}
		},
		async get_products({ commit, state }) {
			try {
				// define data state
				const { api, products } = state;

				if (products.length < 1) {
					// define token
					// petition GET products
					const resp = await axios.get(api + '/products');
					const { info } = resp.data;
					// activate mutation
					commit('define_products', info);
				}
			} catch (err) {
				console.err(err);
			}
		},
		async delete_product({ state, commit }, i) {
			try {
				// define id and token
				const { id } = state.products[i];
				const headers = { token: localStorage.getItem('token') };

				await axios.delete(state.api + '/product/' + id, { headers });

				// mutation
				commit('delete_product', i);
			} catch (err) {
				console.error(err);
			}
		},
		async edit_product({ state, commit }, data) {
			try {
				const i = data[0];

				if (data[1].name === '') data[1].name = state.products[i].name;
				if (data[1].price === '') data[1].price = state.products[i].price;

				const body = data[1];

				// define id and token
				const { id } = state.products[i];
				const headers = { token: localStorage.getItem('token') };
				const resp = await axios.put(state.api + '/product/' + id, body, { headers });

				// on mutation
				commit('edit_product', data);

				return resp.data.state;
			} catch (err) {
				console.error(err);
			}
		},
	},
};
