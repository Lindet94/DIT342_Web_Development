<template>
  <b-container>
    <!-- The Modal Login -->
    <div
      class="modal fade login-modal"
      id="changePassword"
      hide-footer
      title="Change password"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" id="password-modal">
          <!-- Modal body -->
          <div class="modal-body login-modal-body">
            <h4 class="modal-title text-center">Change password</h4>
            <br />

            <b-form class="login-form">
              <div class="form-group">
                <b-form-input
                  v-model="passwordInput"
                  type="password"
                  class="input"
                  required
                  id="emailInput"
                  placeholder="Password"
                />
              </div>

              <div class="form-group">
                <b-form-input
                  v-model="repeatPasswordInput"
                  type="password"
                  class="input"
                  required
                  placeholder="Repeat password"
                />
              </div>

              <div class="alert" id="errorMessage">
                {{ errorMessage }}
              </div>

              <b-button class="submit-button text-center" v-on:click="updatePassword()">
                Submit
              </b-button>
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
import { Api } from '@/Api'

export default {
  name: 'loginModal',
  data() {
    return {
      passwordInput: '',
      repeatPasswordInput: '',
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
      this.modalInstance = new Modal(document.getElementById('changePassword'), {
        target: '#changePassword',
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
      document.getElementById('changePassword').click()
    },
    updatePassword() {
      const self = this
      self.errorMessage = null
      const id = JSON.parse(localStorage.getItem('user')).userId
      console.log(JSON.parse(localStorage.getItem('user')).userId)
      // JSON.parse(localStorage.getItem('user')).id
      Api.patch('/users/' + id, {
        password: this.passwordInput,
        passwordCheck: this.repeatPasswordInput
      })
        .then(function () {
          document.getElementById('changePassword').click()
        })
        .catch(function (error) {
          console.log(error)
          self.errorMessage = error.response.data.msg
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
#errorMessage {
  padding: 0px;
  color: #e84e4f;
}

#closeIcon{
  color: white;
}

.modal{
  text-align: center !important;
}

/* From uiverse.io */
.submit-button {
  margin-top: 6px;
  padding: 0.6em 1.5em !important;
  font-size: 14px !important;
  letter-spacing: 2.5px !important;
  font-weight: 1000 !important;
  color: rgb(60, 60, 60) !important;
  background-color: rgb(197, 197, 197) !important;
  border: none !important;
  border-radius: 45px !important;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s !important;
  cursor: pointer;
  outline: none !important;
}

.submit-button:hover {
  background-color: #23c483 !important;
  color: #fff !important;
  transform: translateY(-3px);
}

.submit-button:active {
  transform: translateY(-1px);
}

/* From uiverse.io by @adamgiebl */
.modal-title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
}

#password-modal {
  border-radius: 20px;
  background: #212121;
}

#register-modal {
  border-radius: 20px;
  background: #212121;
}

/* From uiverse.io by @alexruix */
.input {
  width: 65% !important;
  margin-left: 17.5%;
  line-height: 28px !important;
  border: 2px solid transparent !important;
  border-bottom-color: #777 !important;
  padding: 0.2rem 0 !important;
  padding-left: 0.5rem !important;
  outline: none !important;
  background-color: transparent !important;
  color: rgb(165, 165, 165) !important;
  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
}

.input:focus,
input:hover {
  outline: none !important;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  border-color: #777 !important;
}
</style>
