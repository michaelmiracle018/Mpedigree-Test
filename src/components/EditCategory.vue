<template>
	<div class="container">
		<div class="container-wrap">
			<form action="#!" id="main">
				<h2>Edit Category</h2>

				<div class="input-parent">
					<label for="username">Name</label>
					<input type="text" class="username" required />
				</div>
				<button type="submit" @click.prevent="submit()">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
	background-color: rgba(0, 0, 0, 0.1);
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 100px;
	z-index: 3;
}

.container-wrap {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 100px;
	z-index: 3;
}
</style>
