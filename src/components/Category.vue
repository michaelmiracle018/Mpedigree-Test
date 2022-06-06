<template>
	<form action="#!" id="main">
		<h2>Category Account</h2>

		<div class="input-parent">
			<label for="username">Name</label>
			<input type="text" class="username" v-model="name" required />
		</div>
		<button type="submit" @click.prevent="submit()">Submit</button>
	</form>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return {
			name: "",
			entityId: 1,
		};
	},
	methods: {
		...mapActions(["category"]),
		submit() {
			const credential = {
				category_name: this.name,
				entity_id: this.entityId,
			};
			this.$store.dispatch("category", credential);
		},
	},
};
</script>

<style></style>
