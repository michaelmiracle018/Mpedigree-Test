
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
		meta: {
			title: "Login",
		},
	},

	{
		path: "/Register",
		name: "Register",
		component: Register,
		meta: {
			title: "Register",
		},
	},

	{
		path: "/DashBoard",
		name: "DashBoard",
		component: DashBoard,
		meta: {
			title: "DashBoard",
		},
	},
	{
		path: "/Customer",
		name: "Customer",
		component: Customer,
		meta: {
			title: "Customer",
		},
	},
	{
		path: "/Category",
		name: "Category",
		component: Category,
		meta: {
			title: "Category",
		},
	},
];
const router = new createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | Text`;
	next();
});
export default router;
