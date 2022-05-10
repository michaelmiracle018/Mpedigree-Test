<template>
	<div class="wrapper">
		<div class="sidebar">
			<button class="btn"><i class="fa-solid fa-times"></i></button>
			<ul>
				<li>
					<router-link class="nav-link pr-3 m-2 link" to="/Category"
						>Category</router-link
					>
				</li>
				<li>
					<router-link class="nav-link pr-3 m-2 link" to="/Customer"
						>Customer</router-link
					>
				</li>
			</ul>
		</div>
		<div class="main">
			<div class="head">
				<div class="head-title">
					<h1>DashBoard</h1>
					<span>DashBoard Content</span>
				</div>
				<div class="head-search">
					<input type="search" placeholder="search" />
				</div>
			</div>
			<div class="main-board">
				<div class="card-board">
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	
};
</script>

<style></style>
