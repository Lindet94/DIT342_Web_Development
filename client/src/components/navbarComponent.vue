<template>
  <div>
    <b-navbar id="navbarCool" toggleable="lg">
      <b-navbar-brand id="brand" to="/">BartendR</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/cocktails">Cocktails</b-nav-item>
          <b-nav-item to="/bars">Bars</b-nav-item>
          <b-nav-item v-if="loggedIn" to="/createCocktail"
            >Create cocktail</b-nav-item
          >
          <b-nav-item v-if="loggedIn" to="/createIngredient"
            >Create ingredient</b-nav-item
          >
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="loggedIn" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item
              data-toggle="modal"
              data-target="#changePassword"
              data-dismiss="modal"
              >Change password</b-dropdown-item
            >
            <b-dropdown-item @click="logout" to="/">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else right>
            <b-nav-item
              v-if="!loggedIn"
              right
              data-toggle="modal"
              data-target="#sem-login"
              data-dismiss="modal"
              >Sign in</b-nav-item
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <loginModal />
    <RegisterModal />
    <PasswordModal />
  </div>
</template>

<script>
import { authComputed } from '../vuex/helpers.js'
import loginModal from './loginModal.vue'
import RegisterModal from './registerModal.vue'
import PasswordModal from './passwordModal.vue'

export default {
  components: {
    loginModal,
    RegisterModal,
    PasswordModal
  },
  data() {
    return {
      dataModal: false
    }
  },
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
#brand {
  font-weight: bold;
  font-size: 25px;
  color: rgba(255, 255, 255, 0.87) !important;
}
.dropdown-item {
  color: #212121 !important;
  font-size: 16px;
}
ul li a li a {
  color: white !important;
  font-size: 20px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  padding: 0px !important;
}
nav ul li a {
  color: white !important;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6) !important;
}

nav.navbar {
  border-radius: 15px;
  background: #212121;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

/* change navbar background on collapse */
@media (max-width: 768px) {
  nav.navbar {
    background: #212121;
  }
}
</style>
