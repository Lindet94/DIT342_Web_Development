<template>
  <b-container>
    <!-- The Modal Register -->
    <div class="modal fade login-modal" id="sem-reg">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modal-content">
          <!-- Modal body -->
          <div class="modal-body login-modal-body">
            <h4 class="modal-title text-center">Create account</h4>
            <br />
            <b-button type="b-button" class="close" data-dismiss="modal">
              <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
            </b-button>

            <b-form class="login-form text-center">
              <div class="form-group">
                <b-form-input
                  v-model="nameInput"
                  type="text"
                  class="input"
                  required
                  autocomplete="off"
                  placeholder="Username"
                />
              </div>

              <div class="form-group">
                <b-form-input
                  v-model="emailInput"
                  type="email"
                  class="input"
                  required
                  autocomplete="off"
                  placeholder="Email"
                />
              </div>

              <div class="form-group">
                <b-form-input
                  v-model="passwordInput"
                  type="password"
                  class="input"
                  required
                  autocomplete="off"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <b-form-input
                  v-model="passwordCheckInput"
                  type="password"
                  class="input"
                  required
                  autocomplete="off"
                  placeholder="Repeat password"
                />
              </div>

              <b-form-group
                id="preferenceLabel"
                label="Preference:"
                v-slot="{ ariaDescribedby }"
              >
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  v-model="preferenceInput"
                  :aria-describedby="ariaDescribedby"
                  name="flavour-2"
                >
                  <b-form-checkbox value="cocktail">Cocktails</b-form-checkbox>
                  <b-form-checkbox value="mocktail">Mocktails</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>

              <div class="alert" id="errorMessage">
                {{ errorMessage }}
              </div>

              <div class="text-center">
                <b-button class="submit-button" v-on:click="registerRequest()">
                  Create account
                </b-button>
              </div>

              <div class="pagination-sm text-center pt-3">
                <a href="#" v-on:click="clearError()" class="text-primary-fau"
                  ><span
                    data-toggle="modal"
                    data-target="#sem-login"
                    data-dismiss="modal"
                    >Already have an account?</span
                  ></a
                >
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export default {
  name: 'registerModal',
  data() {
    return {
      nameInput: '',
      emailInput: '',
      passwordInput: '',
      passwordCheckInput: '',
      preferenceInput: [],
      errorMessage: null
    }
  },
  methods: {
    closeModal() {
      document.getElementById('sem-login').click()
    },
    clearError: function () {
      const self = this
      self.errorMessage = null
    },
    registerRequest() {
      const self = this
      self.errorMessage = null
      this.$store
        .dispatch('register', {
          username: this.nameInput,
          email: this.emailInput,
          password: this.passwordInput,
          passwordCheck: this.passwordCheckInput,
          preference: this.preferenceInput
        })
        .then(() => {
          document.getElementById('sem-reg').click()
        })
        .catch(function (error) {
          self.errorMessage = error.response.data.msg
        })
    }
  }
}
</script>

  <style>
@import '../assets/styles/modal.css';
</style>
