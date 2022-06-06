<template>
	<form action="#!" id="main">
		<h2>Login With Your Account</h2>
		<div class="input-parent">
			<label for="username">Email</label>
			<input type="text" class="username" v-model="email" required />
		</div>

		<div class="input-parent">
			<label for="password">Password</label>
			<input type="password" class="username" v-model="password" required />
		</div>

		<button type="submit" @click.prevent="submit(credential)">Login</button>
		<br />
		<br />
		<span class="text">Don't have an account? sign up now!</span>
		<br />
		<router-link class="sign-up-btn" to="/Register">Sign Up</router-link>
	</form>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		submit() {
			const credential = { email: this.email, password: this.password };
			this.$store.dispatch("login", {
				email: credential.email,
				password: credential.password,
			});
		},
		
	},
};
</script>

<style scoped>
.text {
	display: flex;
	justify-content: center;
}

.sign-up-btn {
	color: #fff;
	background-color: none;
	text-align: center;
	text-decoration: none;
	font-weight: bold;
	font-size:1rem;
	display: flex;
	justify-content:center;
}

.sign-up-btn:hover {
	color: aqua;

}
</style>
