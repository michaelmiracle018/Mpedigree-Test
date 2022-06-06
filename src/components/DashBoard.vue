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
							<router-link to="/logout" class="btn-link" @click="handleLogout">logout</router-link >
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
							<div id="category">
								<ul>
									<li>
										<span class="name">miracle</span>
										<span class="delete">Delete</span>
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
									<th>Market</th>
									<th>Action</th>
								</tr>
								<tr>
									<td>Miracle Michael</td>
									<td>miraclemichael018@gmail.com</td>
									<td>0628929929</td>
									<td>alloway</td>
									<td>great</td>
									<td>
										<i class="fa-solid fa-pen-to-square btns"></i>
										<i class="fa-solid fa-trash btns"></i>
									</td>
								</tr>
								<tr>
									<td>Miracle Michael</td>
									<td>miraclemichael018@gmail.com</td>
									<td>0628929929</td>
									<td>alloway</td>
									<td>great</td>
									<td>
										<i class="fa-solid fa-pen-to-square btns"></i>
										<i class="fa-solid fa-trash btns"></i>
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
						<i class="fa-solid fa-window-close close" @click="toggleSidebar"></i>
					</span>
					<div class="sidebar">
						<ul>
							<li>
								<router-link class="link" to="/Category"
									>Category</router-link
								>
							</li>
							<li>
								<router-link class="link" to="/Customer"
									>Customer</router-link
								>
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
// import Category from "./Category.vue";
import { mapGetters, mapActions } from "vuex";
// import "../assets/DashBoard.css";
export default {
	computed: {
		...mapGetters(["getAllCategories"]),
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
	},
	methods: {
		...mapActions(["deleteCategory"]),
		handleLogout() {
			this.$store.dispatch('logout')
		},
		toggleSidebar() {
			this.showSidebar = !this.showSidebar
		}
	},
	data() {
		return {
			showSidebar: false
		}
	}
};
</script>

<style scoped>
.btns {
	padding: 0.3rem;
	font-size: 12px;
	font-weight: bold;
}

i { 
	cursor: pointer;
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
}

.link:hover {
	color: aqua;
}
</style>
