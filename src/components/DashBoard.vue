<template>
	<section v-if="auth" class="main-section">
		<main class="sub-section">
			<!-- Navbar -->
			<nav class="navbar">
				<div class="navbar-center">
					<span class="nav-icon">
						<i class="fas fa-bars" @click="toggleSidebar"></i>
					</span>
					<div class="text-container">
						<h1>Admin DashBoard</h1>
					</div>
					<div class="input-container">
						<input type="search" class="input" />
					</div>
					<div class="container-btn">
						<div class="log-out-container">
							<router-link to="/" class="btn-link" @click="handleLogout"
								>logout</router-link
							>
						</div>
					</div>
				</div>
			</nav>
			<!-- End Navbar -->
			<!-- Main DashBoard -->
			<div class="dash-board-container">
				<div class="dash-board-wrapper">
					<div class="category-container">
						<div class="category-wrapper">
							<h1>Category</h1>
							<div
								id="category"
								v-for="item in getAllCategories"
								:key="item.id"
								@dblclick="editCategory(item.id)"
							>
								<ul>
									<li>
										<span class="name">{{ item.category_name }}</span>
										<span class="delete" @click="deleteCategoryInfo(item.id)"
											>Delete</span
										>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="customer-container">
						<div class="customer-wrapper">
							<h1>Customer</h1>
							<table>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Address</th>
									<th>Action</th>
								</tr>
								<tr v-for="customer in getAllCustomers" :key="customer.id">
									<td>{{ customer.name }}</td>
									<td>{{ customer.email }}</td>
									<td>{{ customer.phone_number }}</td>
									<td>{{ customer.address }}</td>
									<td>
										<i class="fa-solid fa-pen-to-square btns"></i>
										<i @click="deleteCustomerInfo(customer.uuid)" class="fa-solid fa-trash btns"></i>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- End Of Main DashBoard -->
			<!-- End Of Category view -->
			<div class="overlay" v-if="showSidebar">
				<div class="btn-overlay">
					<span class="close-btn">
						<i
							class="fa-solid fa-window-close close"
							@click="toggleSidebar"
						></i>
					</span>
					<div class="sidebar">
						<ul>
							<li>
							
								<router-link class="link" to="/Category"> <i class="fa-solid fa-list-check icon"></i> Category</router-link>
							</li>
							<li>
							
								<router-link class="link" to="/Customer"> <i class="fa-solid fa-users icon"></i> Customer</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	</section>
	<router-view />
</template>

<script>
// import EditCategory from "./EditCategory.vue";
import { mapGetters, mapActions } from "vuex";
export default {
	// components: {
	// 	EditCategory
	// },
	computed: {
		...mapGetters(["getAllCategories", "getAllCustomers"]),
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
	},
	methods: {
		...mapActions([
			"deleteCategory",
			"fetchAllCategories",
			"updateCategoryInfo",
			"fetchAllCustomers",
			"deleteCustomer",
		]),
		handleLogout() {
			this.$store.dispatch("logout");
		},
		toggleSidebar() {
			this.showSidebar = !this.showSidebar;
		},
		deleteCategoryInfo(categoryId) {
			this.deleteCategory(categoryId);
		},
		editCategory(categoryId) {
			this.updateCategoryInfo(categoryId);
		},
		deleteCustomerInfo(uuId) {
			this.deleteCustomer(uuId);
		}
	},
	data() {
		return {
			showSidebar: false,
			updateCategory: {}
		};
	},
	created() {
		this.fetchAllCategories(), this.fetchAllCustomers();
	},
};
</script>

<style scoped>
.btns {
	padding: 0.3rem;
	font-size: 12px;
	font-weight: bold;
}

.btn-link {
	color: #fff;
	font-weight: bold;
	font-size: 1.3rem;
	text-transform: capitalize;
	border: none;
	outline: none;
	margin-right: 1rem;
	text-decoration: none;
	cursor: pointer;
}

.btn-link:hover {
	color: aqua;
}

.link {
	color: black;
	font-weight: bold;
	font-size: 1.4rem;
	text-align: center;
	transition: all 0.5s ease-out;
}

 .icon {
	position: relative; 
	left: -40px;
	bottom: -35px;
}

.link:hover {
	color: rgb(87, 199, 199);

}
</style>
