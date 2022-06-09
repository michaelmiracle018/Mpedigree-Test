<template>
	<form action="#!" id="main">
		<h2>Customer account</h2>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Name</label>
				<input type="text" id="username-first" v-model="name" required />
			</div>

			<div class="input-register">
				<label for="password">Email</label>
				<input type="text" id="username" v-model="email" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Phone</label>
				<input type="text" id="username-first" v-model="phone" required />
			</div>

			<div class="input-register">
				<label for="password">Address</label>
				<input type="text" id="username" v-model="address" required />
			</div>
		</div>
		<button type="submit" @click.prevent="submit">Submit</button>
	</form>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			collectInfo: [],
			name: "",
			email: "",
			phone: "",
			address: "",
			entityId:  localStorage.getItem("userId"),
		};
	},
	methods: {
		...mapActions(["customer"]),
		submit() {
			const credential = {
				email: this.email,
				phone_number: this.phone,
				address: this.address,
				name: this.name,
				entity_id: this.entityId,
			};
			this.$store.dispatch("customer", credential);
		},
		
	},
};
</script>

<style scoped>
</style>
