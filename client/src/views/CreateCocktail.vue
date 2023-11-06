<template>
  <div v-if="loggedIn">
    <div id="tableContainer">
      <div class="add-delete-buttons">
        <div>
          <button
            type="button"
            class="btn btn-primary m-2 fload-end top-button"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="addClick()"
          >
            Add Cocktail
          </button>
        </div>

        <div>
          <button
            type="button"
            class="btn btn-primary m-2 fload-end top-button"
            @click="deleteAll()"
          >
            Delete All Cocktails
          </button>
        </div>
      </div>
        <table class="table table-stripped">
          <thead class="thead-dark">
            <tr>
              <th>Cocktail Id</th>
              <th>Cocktail Name</th>
              <th>Cocktail Glass</th>
              <th>Cocktail Ingredients</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cocktail in cocktails" v-bind:key="cocktail.id">
              <td>{{ cocktail._id }}</td>
              <td>{{ cocktail.cocktail_name }}</td>
              <td>{{ cocktail.glass }}</td>
              <td>{{ cocktail.ingredients }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-light mr1"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  @click="editClick(cocktail)"
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
                  @click="deleteClick(cocktail._id)"
                  class="btn btn-light mr1"
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
                <button
                  type="button"
                  @click="viewCocktail(cocktail)"
                  class="btn btn-light mr1"
                  data-toggle="modal"
                  data-target="#viewCocktailModal"
                >
                  View Cocktail
                </button>
              </td>
            </tr>
          </tbody>
        </table>

    </div>

    <!-- Mobile -->

    <div class="for-padding-purposes"></div>

    <b-container
      class="cocktail-mobile-layout"
      v-for="cocktail in cocktails"
      v-bind:key="cocktail.id"
    >
      <b-col class="font-weight-bold">Cocktail ID</b-col>
      <b-col class="column-ID">{{ cocktail._id }}</b-col>
      <b-col class="font-weight-bold">Cocktail Name</b-col>
      <b-col class="column-name">{{ cocktail.cocktail_name }}</b-col>
      <b-col class="font-weight-bold">Cocktail Glass</b-col>
      <b-col class="column-name">{{ cocktail.glass }}</b-col>
      <b-col class="font-weight-bold">Cocktail Ingredients</b-col>
      <b-col class="column-name">{{ cocktail.ingredients }}</b-col>
      <b-col class="font-weight-bold">Actions</b-col>

      <b-col class="column-buttons">
        <button
          type="button"
          @click="viewCocktail(cocktail)"
          class="btn btn-light mr1"
          data-toggle="modal"
          data-target="#viewCocktailModal"
        >
          View Cocktail
        </button>
        <!-- <b-icon icon="pen" class="border rounded h3 mb-1"  @click="editClick(ingredient)"></b-icon>
        <b-icon icon="trash" class="border rounded h3 mb-1" @click="deleteClick(ingredient._id)"></b-icon> -->
        <button
          type="button"
          class="btn-primary mr1"
          data-toggle="modal"
          data-target="#exampleModal"
          @click="editClick(cocktail)"
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
          @click="deleteClick(cocktail._id)"
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

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <tbody>
                <input
                  placeholder="Cocktail name"
                  class="input"
                  v-model="cocktail_name"
                />
                <input
                  placeholder="Cocktail glass"
                  type=""
                  class="input"
                  v-model="glass"
                />
                <input
                  placeholder="Cocktail recipe"
                  type=""
                  class="input"
                  v-model="recipe"
                />
                <div>
                  <input
                    placeholder="Cocktail ingredients"
                    type="text"
                    class="input"
                    v-model="newIngredient"
                    v-on:keyup.enter="addIngredient"
                  />
                  <ol>
                    <li v-for="ingredient in ingredientList" :key="ingredient">
                      <span>{{ ingredient._id }}</span>
                    </li>
                  </ol>
                </div>
              </tbody>
            </div>
            <div class="alert" id="errorMessage">
              {{ errorMessage }}
            </div>

            <button
              type="button"
              @click="createClick()"
              v-if="cocktailId == 0"
              class="submit-button"
            >
              Create
            </button>
            <button
              type="button"
              @click="updateClick()"
              v-if="cocktailId != 0"
              class="submit-button"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="viewCocktailModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLabel">
              {{ cocktail_name }}
            </h2>
          </div>
          <div class="modal-body">
            <hr />
            <b-row>
              <b-col class="colForm"><h4>Glass</h4></b-col>
              <b-col class="colForm" cols="8"
                ><h4>{{ glass }}</h4></b-col
              >
            </b-row>
            <hr />
            <b-row>
              <b-col class="colForm"><h4>Recipe</h4></b-col>
              <b-col class="colForm" cols="8"
                ><p>{{ recipe }}</p></b-col
              >
            </b-row>
            <hr />
            <b-row>
              <b-col class="colForm"><h4>Ingredients</h4></b-col>
              <b-col class="colForm1" cols="10">
                <div>
                  <ol>
                    <li v-for="ingredient in ingredientList" :key="ingredient">
                      <span>{{ ingredient._id }}</span>
                      <button
                        type="button"
                        @click="
                          deleteIngredientClick(cocktailId, ingredient._id)
                        "
                        class="btn trashIcon"
                      >
                        <b-icon-trash></b-icon-trash>
                      </button>
                    </li>
                  </ol></div
              ></b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <label for="ingredientNameHello"> Add ingredient</label>
                <input
                  id="ingredientNameHello"
                  type="text"
                  class="input"
                  v-model="ingID"
                />
                <b-button
                  type="button"
                  @click="addIngredientCocktail()"
                  class="submit-button"
                  >Add</b-button
                >
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { Api } from '@/Api'
import { authComputed } from '../vuex/helpers.js'

export default {
  data() {
    return {
      cocktails: [],
      modalTitle: '',
      cocktail_name: '',
      glass: '',
      ingredients: '',
      cocktailId: 0,
      newIngredient: '',
      ingredientList: [],
      recipe: '',
      cocktailRating: '',
      errorMessage: null
    }
  },
  metaInfo: {
    script: [
      { src: 'https://unpkg.com/vue@3' },
      { src: 'https://unpkg.com/vue-router@4' }
    ]
  },
  computed: {
    ...authComputed
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/cocktails')
      .then((response) => {
        this.cocktails = response.data.cocktails
      })
      .catch((error) => {
        this.cocktails = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  methods: {
    refreshData() {
      Api.get('/cocktails').then((response) => {
        this.cocktails = response.data.cocktails
      })
    },
    addClick() {
      this.modalTitle = 'Add Cocktail'
      this.cocktailId = 0
      this.cocktail_name = ''
      this.glass = ''
      this.recipe = ''
      this.ingredients = ''
      this.cocktailRating = 0
    },
    editClick(cocktail) {
      this.modalTitle = 'Edit Cocktail'
      this.cocktailId = cocktail._id
      this.cocktail_name = cocktail.cocktail_name
      this.recipe = cocktail.recipe
      this.glass = cocktail.glass
      this.ingredientList = cocktail.ingredients
    },
    viewCocktail(cocktail) {
      Api.get('/cocktails/' + cocktail._id)
      this.modalTitle = 'View Cocktail'
      this.cocktailId = cocktail._id
      this.cocktail_name = cocktail.cocktail_name
      this.recipe = cocktail.recipe
      this.glass = cocktail.glass
      this.ingredientList = cocktail.ingredients
      this.cocktailRating = cocktail.cocktailRating
    },
    addIngredient: function () {
      const text = this.newIngredient.trim()
      if (text) {
        this.ingredientList.push({ _id: text })
        this.newIngredient = ''
      }
    },
    createClick() {
      const self = this
      self.errorMessage = null
      Api.post('/cocktails', {
        cocktail_name: this.cocktail_name,
        recipe: this.recipe,
        glass: this.glass,
        ingredients: this.ingredientList,
        cocktailRating: this.cocktailRating
      })
        .then((response) => {
          this.refreshData()
        })
        .then(function () {
          document.getElementById('exampleModal').click()
        })
        .catch(() => {
          self.errorMessage = 'Invalid input'
          //   TODO: display some error message instead of logging to console
        })
    },
    updateClick() {
      Api.put('/cocktails/' + this.cocktailId, {
        cocktail_name: this.cocktail_name,
        glass: this.glass,
        ingredients: this.ingredientList
      })
        .then((response) => {
          this.refreshData()
        })
        .catch((error) => {
          this.cocktails = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    addIngredientCocktail() {
      Api.post('/cocktails/' + this.cocktailId + '/ingredients/', {
        _id: this.ingID
      })
        .then((response) => {
          this.refreshData()
        })
        .catch((error) => {
          this.cocktails = []
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
      Api.delete('/cocktails/' + id).then(
        (response) => {
          this.refreshData()
        }
      )
    },
    deleteIngredientClick(id, id1) {
      console.log(JSON.stringify(id))
      console.log(JSON.stringify(id1))

      if (!confirm('Are you sure?')) {
        return
      }
      Api.delete(
        '/cocktails/' + id + '/ingredients/' + id1
      ).then((response) => {
        this.refreshData()
      })
    },
    deleteAll() {
      if (!confirm('Are you sure?')) {
        return
      }
      if (!confirm('No but like really sure?')) {
        return
      }
      Api.delete('/cocktails/').then((response) => {
        this.refreshData()
      })
    }
  }
}
</script>
<style>
@import '../assets/styles/modal.css';

#tableContainer {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0%;
  background-color: transparent !important;
}
table-stripped{
  background-color: transparent !important;
}
tbody{
  background-color: rgb(29, 29, 29) !important;
  color: rgb(255, 255, 255) !important;
}

.TitleCocktail {
  float: left;
  padding: 5px;
  color: black;
}

.h4 {
  color: black;
}

.textRec {
  color: black;
  float: left;
  padding-left: 5%;
}

.rating {
  padding-top: 3.5%;
  padding-left: 80%;
  color: black;
}

.cocktail-mobile-layout {
  background-color: #312b2b;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 5%;
}

.add-delete-buttons {
  padding-left: 5%;
}

.for-padding-purposes {
  padding: 18%;
}

@media only screen and (min-width: 768px) {
  [class*='cocktail-mobile-layout'] {
    display: none;
  }
}

@media only screen and (max-width: 768px) {
  [class*='table'] {
    display: none;
  }
  #tableContainer {
  padding-left: 0%;
  padding-right: 0%;
  padding-top: 0% !important;
}
}
</style>
