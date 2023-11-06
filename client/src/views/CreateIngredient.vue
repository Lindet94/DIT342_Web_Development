<template class="" >
  <div v-if="loggedIn" class="text-center">
    <button
      type="button"
      class="btn btn-primary m-2"
      v-b-modal.create-ingredient
      @click="addClick()"
    >
      Create Ingredient
    </button>

    <b-modal
      id="create-ingredient"
      class="modal-lg text-center"
      title="Create Ingredient"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
      <form ref="form" @submit="handleSubmit">
        <b-form-group
          label-for="ingredient-input"
          invalid-feedback="Ingredient is required"
          :state="nameState"
        >
          <b-form-input
          class="input"
          placeholder="Ingredient name"
            id="ingredient-input"
            v-model="ingredient_name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="button" @click="handleSubmit()" class="submit-button">Create</b-button>
      </form>
    </b-modal>

    <b-container class="ingredient-container">
      <b-row class="font-weight-bold">
        <b-col class="ingredient-head">Ingredient ID</b-col>
        <b-col>Ingredient Name</b-col>
        <b-col>Actions</b-col>
      </b-row>

      <b-row
        class="ingredient-data"
        v-for="ingredient in ingredients"
        v-bind:key="ingredient.id"
      >

        <b-col class="column-ID">{{ ingredient._id }}</b-col>
        <b-col class="column-name">{{ ingredient.ingredient_name }}</b-col>
        <b-col class="column-buttons">
          <!-- <b-icon icon="pen" class="border rounded h3 mb-1"  @click="editClick(ingredient)"></b-icon>
        <b-icon icon="trash" class="border rounded h3 mb-1" @click="deleteClick(ingredient._id)"></b-icon> -->

          <button
            type="button"
            class="btn btn-light mr1"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="editClick(ingredient)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          <button
            type="button"
            @click="deleteClick(ingredient._id)"
            class="edit-button btn btn-light mr1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
        </b-col>
      </b-row>
    </b-container>

    <!-- For mobile -->

    <b-container class="mobile-layout"  v-for="ingredient in ingredients"
        v-bind:key="ingredient.id">
        <b-col class="font-weight-bold">Ingredient ID</b-col>
        <b-col class="column-ID">{{ ingredient._id }}</b-col>
        <b-col class="font-weight-bold">Ingredient Name</b-col>
        <b-col class="column-name">{{ ingredient.ingredient_name }}</b-col>
        <b-col class="font-weight-bold">Actions</b-col>

        <b-col class="column-buttons">
          <!-- <b-icon icon="pen" class="border rounded h3 mb-1"  @click="editClick(ingredient)"></b-icon>
        <b-icon icon="trash" class="border rounded h3 mb-1" @click="deleteClick(ingredient._id)"></b-icon> -->
          <button
            type="button"
            class="btn btn-light mr1"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="editClick(ingredient)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          <button
            type="button"
            @click="deleteClick(ingredient._id)"
            class="edit-button btn btn-light mr1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
          </button>
        </b-col>
    </b-container>

    <!--  -->

    <b-modal id="edit-modal" title="Edit Ingredient">
      <b-form>
        <b-form-input v-model="ingredient_name"></b-form-input><br />
        <b-button @click="updateClick" type="button" value="submit"
          >Submit</b-button
        >
      </b-form>
    </b-modal>
  </div>

</template>

<script>
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BootstrapVueIcons } from 'bootstrap-vue'
import { Api } from '@/Api'
import { authComputed } from '../vuex/helpers.js'
Vue.use(BootstrapVueIcons)

export default {

  data() {
    return {
      ingredients: [],
      nameState: null,
      ingredientId: 0,
      ingredient: '',
      ingredient_name: ''
    }
  },
  computed: {
    ...authComputed
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/ingredients')
      .then((response) => {
        this.ingredients = response.data.ingredients
      })
      .catch((error) => {
        this.ingredients = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  methods: {
    refreshData() {
      Api.get('/ingredients').then((response) => {
        this.ingredients = response.data.ingredients
      })
    },
    addClick() {
      this.ingredientId = 0
      this.ingredient_name = ''
    },
    editClick(ingredient) {
      this.ingredientId = ingredient._id
      this.ingredient_name = ingredient.ingredient_name
      this.$bvModal.show('edit-modal')
    },
    createClick() {
      Api.post('/ingredients', {
        ingredient_name: this.ingredient_name
      })
        .then((response) => {
          this.refreshData()
          alert(response.data)
        })
        .catch((error) => {
          this.ingredients = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    updateClick() {
      Api.put('/ingredients/' + this.ingredientId, {
        ingredient_name: this.ingredient_name,
        ingredients: [{ _id: this.ingredients }]
      })
        .then((response) => {
          this.refreshData()
          alert(response.data)
        })
        .catch((error) => {
          this.ingredients = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    deleteClick(id) {
      if (!confirm('Are you sure?')) {
        return
      }
      Api.delete('/ingredients/' + id).then(
        (response) => {
          this.refreshData()
        }
      )
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    resetModal() {
      this.ingredient = ''
      this.nameState = null
    },
    checkFormInput() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormInput()) {
        return
      }
      this.createClick()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('create-ingredient')
      })
    }
  }
}
</script>
  <style>

.ingredient-data{
  background-color: #0e0e0e !important;
  color: rgb(255, 255, 255);
}

.top-button {
  float: left;
}
.ingredient-container {
  background-color: #2b2828 !important;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 1%;
}
.mobile-layout {
  background-color: #312b2b;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 1%;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  background-color: rgb(29, 29, 29) !important;
  color: rgb(255, 255, 255) !important;
  border: 1rem !important;
  border-color: white !important;
  padding: 7px;
}

.ingredient-info {
  color: #000000;
}

.mr1{
  border-color: rgb(49, 49, 49) !important;
  background-color: rgb(24, 24, 24) !important;
  color: rgb(131, 131, 131) !important;
}

.mr1:hover{
  border-color: rgb(68, 68, 68) !important;
  background-color: rgb(15, 15, 15) !important;
  color: rgb(255, 255, 255) !important;
}

@media only screen and (min-width: 768px) {
  [class*="mobile-layout"] {
    display: none
  }
}

@media only screen and (max-width: 768px) {
  [class*="ingredient-container"] {
    display: none
  }
  .mr1{
  border-color: rgb(174, 174, 174) !important;
  background-color: rgb(255, 255, 255) !important;
  color: rgb(0, 0, 0) !important;
}

.mr1:hover{
  border-color: rgb(174, 174, 174) !important;
  background-color: rgb(255, 255, 255) !important;
  color: rgb(0, 0, 0) !important;
}

}

</style>
