<template>
  <b-container>
    <!-- The Modal Login -->
    <div
      class="modal fade login-modal"
      id="sem-login"
      hide-footer
      title="Sign in"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="modal-content">
          <!-- Modal body -->
          <div class="modal-body login-modal-body">
            <h4 class="modal-title text-center">Login</h4>
            <br />

            <b-form class="login-form">
              <div class="form-group">
                <b-form-input
                  v-model="emailInput"
                  type="email"
                  class="input"
                  required
                  placeholder="Email"
                />
              </div>

              <div class="form-group">
                <b-form-input
                  v-model="passwordInput"
                  type="password"
                  class="input"
                  required
                  placeholder="Password"
                />
              </div>

              <div class="alert" id="errorMessage">
                {{ errorMessage }}
              </div>

              <b-button
                class="submit-button text-center"
                v-on:click="loginRequest()"
              >
                Login
              </b-button>

              <div class="pagination-sm text-center pt-3">
                <a href="#" v-on:click="clearError()" class="text-primary-fau"
                  ><span
                    data-toggle="modal"
                    data-target="#sem-reg"
                    data-dismiss="modal"
                    >Don't have an account?</span
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
import { Modal } from 'bootstrap'

export default {
  name: 'loginModal',
  data() {
    return {
      emailInput: '',
      passwordInput: '',
      errorMessage: null
    }
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      modalInstance: null
    }
  },
  watch: {
    showModal(newValue, oldValue) {
      console.log(newValue)
      if (newValue === true) {
        this.modalActive()
      }
    }
  },
  methods: {
    modalActive: function () {
      this.modalInstance = new Modal(document.getElementById('sem-login'), {
        target: '#sem-login',
        backdrop: 'static'
      })
      this.modalInstance.show()
    },
    hideModal: function () {
      console.log('closed')
      this.modalInstance.hide()
      this.$emit('closeModal')
    },
    closeModal() {
      document.getElementById('sem-login').click()
    },
    loginRequest() {
      const self = this
      self.errorMessage = null
      this.$store
        .dispatch('login', {
          email: this.emailInput,
          password: this.passwordInput
        })
        .then(function () {
          document.getElementById('sem-login').click()
        })
        .catch((err) => {
          console.log(err.response.data.msg)
          self.errorMessage = err.response.data.msg
        })
    },
    clearError: function () {
      const self = this
      self.errorMessage = null
    }
  }
}
</script>
<style>
@import '../assets/styles/modal.css';
</style>
