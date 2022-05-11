import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

import "./assets/DashBoard.css";
import "./assets/Style.css";

const RegisterUrl = "/entity/signup";
const baseUrl = "https://staging.afcfta.app/api";
const loginUrl = "/individual/signin";
const customerCategory = "/inventory/customers/add";
const customer = "/inventory/customers/add";

const store = createStore({
	state() {
		return {
			addCustomers: [],
			createCategories: [],
			signInToken: null,
			successMessage: "",
		};
	},
	mutations: {
		setLogInToken(state, signInToken) {
			state.signInToken = signInToken;
		},
		successMessage(state, token) {
			state.signInToken = token;
		},
		customer(state, payload) {
			state.addCustomers = payload;
		},
		customerCategory(state, payload) {
			state.createCategories = payload;
		},
	},
	actions: {
		login(context, credentials) {
			return axios
				.post(`${baseUrl}${loginUrl}`, {
					email: credentials.email,
					password: credentials.password,
				})
				.then((res) => {
					console.log(res);
					context.commit("setLoginToken", res.data.token);
					return true;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		register(context, credentials) {
			return axios
				.post(`${baseUrl}${RegisterUrl}`, {
					name: credentials.name,
					type: credentials.type,
					market: credentials.market,
					address: credentials.address,
					admin_phone: credentials.admin_phone,
					admin_email: credentials.admin_email,
					admin_password: credentials.admin_password,
					admin_last_name: credentials.admin_last_name,
					admin_first_name: credentials.admin_first_name,
					admin_other_names: credentials.admin_other_names,
				})
				.then((res) => {
					context.commit("successMessage", res.data.token);
					return true;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		newCustomer(context, credentials) {
			return axios
				.post(`${baseUrl}${customer}`, {
					name: credentials.name,
					email: credentials.email,
					phone_: credentials.phone,
					address: credentials.address,
					entity_id: credentials.entity_id,
					category_id: credentials.category_id,
				})
				.then((res) => {
					context.commit("customer", res.data.token);
					return true;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		category(context, credentials) {
			return axios
				.post(`${baseUrl}${customerCategory}`, {
					category_name: credentials.category_name,
					entity_id: credentials.entity_id,
				})
				.then((res) => {
					context.commit("customerCategory", res.data.token);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	getters: {
		getSignUpToken(state) {
			state.successMessage

		},
		getLogin(state) {
			return state.setLoginToken;
		},
	},
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.use(VueAxios, axios);
