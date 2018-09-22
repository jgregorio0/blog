<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="authUser">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="pass">Password</AppControlInput>
        <AppButton type="submit">Login</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
  import AppControlInput from '@/components/UI/AppControlInput'
  import AppButton from '@/components/UI/AppButton'

  export default {
    name: 'AdminAuthPage',
    components: {
      AppControlInput,
      AppButton
    },
    data () {
      return {
        email: '',
        pass: ''
      }
    },
    methods: {
      authUser () {
        this.$store.dispatch('authUser', {
          email: this.email,
          pass: this.pass
        })
          .then(() => {
            this.$router.push('/admin')
          })
      }
    }
  }
</script>
