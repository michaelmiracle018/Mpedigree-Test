import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

import "./assets/DashBoard.css";
import "./assets/Style.css";

// const deleteCategory =  "https://staging.afcfta.app/api/inventory/category/list/1/";
const registerUrl = "/entity/signup";
const baseURL = "https://staging.afcfta.app/api";
const loginUrl = "/individual/signin";
const category = "/inventory/category/add/";
// const customer = "/inventory/customers/add/";

const token = JSON.parse(localStorage.getItem("signInToken"));
// const id = JSON.parse(localStorage.getItem("userId"));

const store = createStore({
	state: {
		category: [],
		signInToken: null,
		userId: null,
		user: null,
	},
	getters: {
		isLoggedIn: (state) => !!state.signInToken,
		user: (state) => state.user,
		getAllCategories: (state) => state.category,
		ifAuthenticated(state) {
			return state.signInToken !== null;
		},
	},
	actions: {
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
							JSON.stringify(res.data.entities[0].id),
						);
					console.log(res.data);
					commit("loginToken", {
						signInToken: res.data.token,
						userId: res.data.entities[0].id,
					});
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.log(error);
					router.push("/Register");
				});
		},

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
		logout({ commit }) {
			localStorage.removeItem("signInToken");
			localStorage.removeItem("userId");
			router.push("/");
			commit("clearAuth");
		},
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
					commit("newCategoryInfo", { name: res.data.data.category_name });
					commit("newCategoryInfo", { id: res.data.data.id });
				});
		},
		deleteCategory({ commit }, id) {
			return axios
				.delete(`https://staging.afcfta.app/api/inventory/category/add/${id}`, {
					headers: { Authorization: `${token}` },
				})
				.then((res) => {
					console.log(res.data);
					commit("removeCategoryInfo", res.data.data.id);
				});
		},
		// async deleteCustomerInfo({ commit }) {
		// 	const response = await axios.delete(`${baseURL}${customer}`);
		// 	commit("deleteInfo", response.data.token);
		// },
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
		removeCategoryInfo(state, id) {
			state.category = state.category.filter((item) => item.id !== id);
		},
		newCategoryInfo: (state, info) => state.category.push(info),
		// setCategory: (state, info) => state.category = info
	},
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
app.use(VueAxios, axios);
