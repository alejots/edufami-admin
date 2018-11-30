<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Edufami Logo" width="120" height="120"> <!-- TODO Actualizar por el logo actual -->
                  <h1 class="flex my-4 primary--text">Edufami</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="username" label="Username" id="username" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn id="button" block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  import { mapActions } from 'vuex'
export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    },
  }),
  mounted () {
    this.USERACCOUNTS_LOGOUT()
  },
  methods: {
    ...mapActions([
      'USERACCOUNTS_LOGIN',
      'USERACCOUNTS_LOGOUT'
    ]),
    login () {
      this.loading = true
      var user = {
        username: this.model.username,
        password: this.model.password
      }
      this.USERACCOUNTS_LOGIN(user).then((res) => {
        console.log(res)
        this.loading = false
        this.$router.push('/dashboard')
      }).catch((err) => {
        this.loading = false
        window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
      })
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
