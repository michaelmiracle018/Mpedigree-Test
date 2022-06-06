<template>
	<form action="#!" id="main">
		<h2>Register Account</h2>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Name</label>
				<input type="text" id="username-first" v-model="name" required />
			</div>

			<div class="input-register">
				<label for="password">Type</label>
				<input type="text" id="username" v-model="type" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Other Names</label>
				<input type="text" id="username-first" v-model="otherNames" required />
			</div>

			<div class="input-register">
				<label for="password">Admin First Name</label>
				<input type="text" id="username" v-model="adminFirstName" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Admin Last Name</label>
				<input
					type="text"
					id="username-first"
					v-model="adminLastName"
					required
				/>
			</div>

			<div class="input-register">
				<label for="password">Address</label>
				<input type="text" id="username" v-model="address" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Admin Phone</label>
				<input
					type="text"
					id="username-first"
					v-model.number="adminPhone"
					required
				/>
			</div>

			<div class="input-register">
				<label for="password">Admin Email</label>
				<input type="text" id="username" v-model="adminEmail" required />
			</div>
		</div>
		<div class="input-register">
			<label for="password" class="label-last">Admin Password</label>
			<input
				type="password"
				id="username-last"
				v-model="adminPassword"
				required
			/>
		</div>

		<button type="submit" @click.prevent="submit(credential)">Login</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			adminFirstName: "",
			adminLastName: "",
			adminEmail: "",
			type: "",
			market: 1,
			otherNames: "",
			name: "",
			adminPassword: "",
			address: "",
			adminPhone: "",
		};
	},
	methods: {
		submit() {
			const credential = {
				name: this.name,
				type: this.type,
				market: this.market,
				address: this.address,
				admin_email: this.adminEmail,
				admin_phone: this.adminPhone,
				admin_password: this.adminPassword,
				admin_other_names: this.otherNames,
				admin_last_name: this.adminLastName,
				admin_first_name: this.adminFirstName,
			};
			this.$store.dispatch("register", credential);
			this.adminFirstName = "";
			this.adminLastName = "";
			this.adminEmail = "";
			this.type = "";
			this.otherNames = "";
			this.name = "";
			this.adminPassword = "";
			this.address = "";
			this.adminPhone = "";
		},
	},
};
</script>

<style>
.token {
	color: #fff;
}
</style>
