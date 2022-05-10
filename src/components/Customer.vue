<template>
  <form action="#!" id="main">
		<h2>Customer account</h2>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Name</label>
				<input type="text" id="username-first" v-model="name" required />
			</div>

			<div class="input-register">
				<label for="password" >Email</label>
				<input type="text" id="username" v-model="email" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Phone</label>
				<input type="text" id="username-first" v-model="phone" required />
			</div>

			<div class="input-register">
				<label for="password" >Address</label>
				<input type="text" id="username" v-model="address" required />
			</div>
		</div>
		<div class="input-register">
				<label for="password" class="label-last" >Market</label>
				<input type="text" id="username-last" v-model="market" required />
			</div>

		<button type="submit" @click.prevent="submit()">Submit</button>
  </form>
  <div class="info-container" v-for="(info, index) in collectInfo" :key="index">
		<h2>
			{{ info }}
			<i class="fa-solid fa-times" @click="removeInfo(index)"></i>
		</h2>
	</div>
</template>

<script>
export default {
data() {
		return {
			collectInfo: [],
			name: "",
			email: "",
			phone: "",
			market: "",
			address: "",
			entityId: 1,
		};
	},
	methods: {
		submit() {
			if (
				(this.name !== "",
				this.email !== "",
				this.phone !== "",
				this.market !== "",
				this.address !== "")
			) {
				this.collectInfo.push(
					this.name,
					this.phone,
					this.address,
					this.market,
					this.email,
				);

			}
		},
        removeInfo(index) {
            this.collectInfo = this.collectInfo.filter((info, i) => i !== index) 
            
        },
	},
}
</script>

<style scoped>
.fa-solid {
	color: red;
}


.info-container h2{
	background: black;
	margin:  20px 30rem;
	padding: 5px;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	color: white;
}



</style>