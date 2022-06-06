<template>
	<div v-if="!auth" class="nav-container">
		<div class="btn-container">
			<div class="sign-up-container">
				<router-link class="btn-link" to="/Register">Sign Up</router-link>
			</div>
			<div class="log-out-container">
				<router-link to="/logout" v-if="auth" class="btn-link" @click="handleLogout">logout</router-link>
			</div>
		</div>
	</div>

	<router-view />
</template>

<script>
export default {
	methods: {
		handleLogout() {
			this.$store.dispatch("logout");
		},
	},
	created() {
		this.$store.dispatch("autoLogin");
	},
	computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
	},
};
</script>

<style scoped>
.nav-container {
	width: 100vw;
	height: 10%;
	background-color: #131212;
	color: #fff;
	padding: 0.5em;
}
.btn-container {
	width: 100%;
	height: 10%;
	background-color: #131212;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}

.btn-link {
	color: #fff;
	font-weight: bold;
	font-size: 1.3rem;
	text-transform: capitalize;
	background-color: #131212;
	border: none;
	outline: none;
	margin-right: 1rem;
	text-decoration: none;
	cursor: pointer;
}

.btn-link:hover {
	color: aqua;
}
</style>
