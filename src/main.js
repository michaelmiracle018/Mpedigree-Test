import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

import "./assets/DashBoard.css";
import "./assets/Style.css";

const getCategory = "/inventory/category/list/";
const registerUrl = "/entity/signup";
const baseURL = "https://staging.afcfta.app/api";
const loginUrl = "/individual/signin";
const category = "/inventory/category/add/";
const customer = "/inventory/customers/add/";

const token = JSON.parse(localStorage.getItem("signInToken"));
const userId = localStorage.getItem("userId");

const store = createStore({
	state: {
		customers: [],
		category: [],
		newCategory: "",
		signInToken: null,
		userId: null,
		user: null,
	},
	getters: {
		getAllCustomers: (state) => state.customers,
		isLoggedIn: (state) => !!state.signInToken,
		user: (state) => state.user,
		getAllCategories: (state) => state.category,
		ifAuthenticated(state) {
			return state.signInToken !== null;
		},
	},
	actions: {
		// LOGIN ACTION
		login({ commit }, credential) {
			return axios
				.post(`${baseURL}${loginUrl}`, {
					email: credential.email,
					password: credential.password,
				})
				.then((res) => {
					localStorage.setItem("signInToken", JSON.stringify(res.data.token)),
						localStorage.setItem(
							"userId",
							JSON.stringify(res.data.entities[0].entity.id),
						);
					console.log(res.data);
					commit("loginToken", {
						signInToken: res.data.token,
						userId: res.data.entities[0].entity.id,
					});
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.log(error);
					router.push("/Register");
				});
		},
		//  REGISTER ACTION
		register({ commit }, credential) {
			return axios
				.post(`${baseURL}${registerUrl}`, {
					name: credential.name,
					type: credential.type,
					market: credential.market,
					address: credential.address,
					admin_phone: credential.admin_phone,
					admin_email: credential.admin_email,
					admin_password: credential.admin_password,
					admin_last_name: credential.admin_last_name,
					admin_first_name: credential.admin_first_name,
					admin_other_names: credential.admin_other_names,
				})
				.then((res) => {
					console.log(res.data.token);
					localStorage.setItem("signInToken", JSON.stringify(res.data.token)),
						localStorage.setItem(
							"userId",
							JSON.stringify(res.data.entities[0].id),
						);
					commit("loginToken", {
						signInToken: res.data.token,
						userId: res.data.entities[0].id,
					});
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.error(error);
				});
		},
		// LOGOUT ACTION
		logout({ commit }) {
			localStorage.removeItem("signInToken");
			localStorage.removeItem("userId");
			router.push("/");
			commit("clearAuth");
		},
		// AUTO LOGIN ACTION
		autoLogin({ commit }) {
			const signInToken = JSON.parse(localStorage.getItem("signInToken"));
			const userId = JSON.parse(localStorage.getItem("userId"));
			if (signInToken && userId) {
				router.push("/Dashboard");
			}
			commit("loginToken", {
				signInToken: signInToken,
				userId: userId,
			});
		},
		// CATEGORIES ACTION
		category({ commit }, credential) {
			return axios
				.post(
					`${baseURL}${category}`,
					{
						category_name: credential.category_name,
						entity_id: credential.entity_id,
					},
					{
						headers: {
							Authorization: `${token}`,
						},
					},
				)
				.then((res) => {
					console.log(res.data.data.category_name);
					console.log(res.data.data.id);
					commit("newCategoryInfo", res.data);
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		fetchAllCategories({ commit }) {
			return axios
				.get(`${baseURL}${getCategory}${userId}`, {
					headers: { Authorization: `${token}` },
				})
				.then((res) => {
					console.log(res.data);
					commit("setCategories", res.data.categories);
				})
				.catch((error) => {
					console.log(error);
				});
		},

		deleteCategory({ commit }, categoryId) {
			return axios
				.delete(
					`https://staging.afcfta.app/api/inventory/category/${categoryId}/delete/`,
					{
						headers: { Authorization: `${token}` },
					},
				)
				.then((res) => {
					console.log(res.data.categories);
					commit("removeCategoryInfo", categoryId);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		updateCategoryInfo({ commit }, categoryId) {
			return axios
				.put(
					`https://staging.afcfta.app/api/inventory/category/${categoryId}/update/`, 
					{
						headers: { Authorization: `${token}` },
					},
				)
				.then((res) => {
					// let newCategory = res.data.categories;
					console.log(res.data.categories);
					commit("editCategory", categoryId);
				});
		},
		// CUSTOMERS ACTION
		customer({ commit }, credential) {
			return axios
				.post(
					`${baseURL}${customer}`,
					{
						email: credential.email,
						name: credential.name,
						phone_number: credential.phone_number,
						address: credential.address,
						entity_id: credential.entity_id,
					},
					{
						headers: {
							Authorization: `${token}`,
						},
					},
				)
				.then((res) => {
					console.log(res.data.customer);
					commit("newCustomerInfo", res.data);
					router.push("/Dashboard");
				});
		},
		fetchAllCustomers({ commit }) {
			return axios
				.get(
					`https://staging.afcfta.app/api/inventory/customers/list/${userId}`,
					{
						headers: { Authorization: `${token}` },
					},
				)
				.then((res) => {
					console.log(res.data);
					commit("setCustomers", res.data.customer);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		deleteCustomer({ commit }, uuId) {
			return axios
				.delete(`https://staging.afcfta.app/api/inventory/customers/${uuId}/`, {
					headers: { Authorization: `${token}` },
				})
				.then((res) => {
					console.log(res.data.categories);
					commit("removeCustomerInfo", uuId);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	mutations: {
		loginToken(state, userData) {
			state.signInToken = userData.signInToken;
			state.userId = userData.userId;
		},
		clearAuth(state) {
			state.signInToken = null;
			state.userId = null;
		},
		newCategoryInfo: (state, info) => state.category.push(info),
		setCategories: (state, category) => (state.category = category),
		removeCategoryInfo(state, id) {
			state.category = state.category.filter((item) => item.id !== id);
		},
		editCategory(state, id, edit) {
			state.category = state.category.find((item) => {
				if (item.id === id) {
					item = edit;
				}
			});
		},
		newCustomerInfo: (state, info) => state.customers.push(info),
		setCustomers: (state, customer) => (state.customers = customer),
		removeCustomerInfo(state, id) {
			state.customers = state.customers.filter((item) => item.id !== id);
		},
	},
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.use(VueAxios, axios);
