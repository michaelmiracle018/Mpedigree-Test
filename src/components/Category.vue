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
import {
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            name: "",
            entityId: 1,
            valid: true,
        };
    },
    methods: {
        ...mapActions(['category']),
       
        submit() {
            
            if (this.valid) {
                this.submitted = true;
                this.login({
                    category_name: this.name,
                    entity_id: this.entityId
                });
            }
        },
    },
}
</script>

<style>

</style>
