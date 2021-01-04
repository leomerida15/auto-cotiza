import axios from 'axios';
import { production } from '../global';

export default {
	namespaced: true,
	state: {
		sections: [],
		api: production ? 'https://auto-cotiza-muestra.herokuapp.com' : 'http://localhost:5000',
		edit: false,
	},
	mutations: {
		define_sections: (state, info) => (state.sections = info),
		push_sections: (state, info) => state.sections.push(info),
		delete_section: (state, i) => state.sections.splice(i, 1),
		edit_section: (state, data) => {
			const i = data[0];
			const body = data[1];

			const price = parseInt(body.price);

			state.sections[i].name = body.name;
			state.sections[i].price = price;
		},
	},
	actions: {
		async create_section({ commit, state }, body) {
			try {
				// define Token  in the headres
				const headers = { token: localStorage.getItem('token') };
				const resp = await axios.post(state.api + '/section', body, { headers });

				commit('push_sections', resp.data.info);

				return true;
			} catch (err) {
				return false;
			}
		},
		async get_sections({ commit, state }) {
			try {
				// define data state
				const { api, sections } = state;

				if (sections.length < 1) {
					// define token
					const headers = { token: localStorage.getItem('token') };

					// petition GET sections
					const resp = await axios.get(state.api + '/sections', { headers });
					const { info } = resp.data;

					// activate mutation
					commit('define_sections', info);

					return true;
				}
			} catch (err) {
				console.err(err);
			}
		},
		async delete_section({ state, commit }, i) {
			try {
				const { id } = state.sections[i];
				const headers = { token: localStorage.getItem('token') };

				const resp = await axios.delete(state.api + '/section/' + id, { headers });
				commit('delete_section', i);
			} catch (err) {
				console.error(err);
			}
		},
		async edit_section({ state, commit }, data) {
			try {
				const i = data[0];

				if (data[1].name === '') data[1].name = state.sections[i].name;
				if (data[1].price === '') data[1].price = state.sections[i].price;

				const body = data[1];

				// define id and token
				const { id } = state.sections[i];
				const headers = { token: localStorage.getItem('token') };
				const resp = await axios.put(state.api + '/section/' + id, body, { headers });

				// on mutation
				if (resp.data.state) commit('edit_section', data);

				return resp.data.state;
			} catch (err) {
				console.error(err);
			}
		},
	},
};
