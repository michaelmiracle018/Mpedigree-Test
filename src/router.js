
import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import DashBoard from "./components/DashBoard.vue";
import Customer from "./components/Customer.vue";
import Category from "./components/Category.vue";


const routes = [
	{
		path: "/",
		name: "/Login",
		component: Login,
	},

	{
		path: "/Register",
		name: "Register",
		component: Register,
	},

	{

		path: "/DashBoard",
		name: "DashBoard",
		component: DashBoard,
	},
	{
		path: "/Customer",
		name: "Customer",
		component: Customer,
	},
	{
		path: "/Category",
		name: "Category",
		component: Category,
	},
];
const router = new createRouter({
	history: createWebHistory(),
	routes,
});
export default router;
