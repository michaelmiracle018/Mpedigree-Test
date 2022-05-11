<template>
  <form action="#!" id="main">
    <h2>Login With Your Account</h2>

    <div class="input-parent">
      <label for="username">Username or Email</label>
      <input type="text" class="username" v-model="email" required/>
      
    </div>

    <div class="input-parent">
      <label for="password">Password</label>
      <input type="password" class="username" v-model="password" required/>
            
    </div>

    <button type="submit" @click.prevent="submit()">Login</button>
     <br>
        <router-link class="btn m-3 btn-outline-primary link" to="/Register">Sign Up Here</router-link>
  </form>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
 data() {
        return {
            email: "",
            password: "",
            valid: false,
        };
    },
    methods: {
        ...mapActions(['login']),
        ...mapGetters(['getLogin']),
        submit() {
                this.login({email:this.email,password:this.password}); 
                console.log(this.getLogin);
                   if(this.getLogin){
                    this.$router.push({path: "/DashBoard"})

            }
            else {
              this.$router.push({path: "/Register"})
            }

        },
        
            
        }
}
</script>

<style scoped>
a {
 display:flex;
 justify-content:center; 
}

</style>