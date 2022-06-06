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
		<button type="submit" @click.prevent="submit(credential)">Submit</button>
	</form>
	<div class="info-container" v-for="(info, index) in collectInfo" :key="index">
		<h2>
			{{ info }}
			<i class="fa-solid fa-times" @click="removeInfo(index)"></i>
		</h2>
	</div>
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
			entityId: 1,
		};
	},
	methods: {
		...mapActions(["customer"]),
		submit() {
			const credential = {
				email: this.email,
				phone: this.phone,
				address: this.address,
				name: this.name,
				entityId: 1,
			};
			this.customer(credential);
			// if (
			// 	this.name !== "",
			// 	this.email !== "",
			// 	this.phone !== "",
			// 	this.market !== "",
			// 	this.address !== ""
			// ) {
			// }
		},
	},
};
</script>

<style scoped>
</style>
