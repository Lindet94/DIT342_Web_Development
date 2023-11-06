<template>
  <div>
    <body class="page">
      <div>
        <div>
          <div div style="text-align: center">
            <table class="table-dark ingredients">
              <thead>
                <tr>
                  <th scope="col">Ingredients</th>
                  <th>
                    <input
                      type="checkbox"
                      class="checkbox"
                      :checked="allSelected"
                      @click="selectAll"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ingredient in ingredients" :key="ingredient._id">
                  <td>
                    <ingredient-item
                      class="ingredient-table-data"
                      v-bind:ingredient="ingredient"
                    />
                  </td>
                  <input
                    type="checkbox"
                    class="checkbox"
                    v-model="ingredient.selected"
                  />
                </tr>
              </tbody>
            </table>
            <div>
              <table class="table-dark">
                <thead>
                  <tr>
                    <th scope="col">Cocktails</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <b-col
                      v-for="cocktail in filteredCocktails"
                      v-bind:key="cocktail._id"
                    >
                      <cocktail-item v-bind:cocktail="cocktail" />
                    </b-col>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <b-container class="ingredients-mobile-container">
            <b-row>
              <b-col class="font-weight-bold">Ingredient</b-col>
            </b-row>

            <b-row v-for="ingredient in ingredients" v-bind:key="ingredient.id">
              <b-col
                >{{ ingredient.ingredient_name }}
                <label class="container1">
                  <input type="checkbox" v-model="ingredient.selected"/>
                  <div class="checkmark"></div> </label
              ></b-col>
            </b-row>
          </b-container>
          <br />
          <b-container class="cocktails-mobile-container">
            <b-row>
              <b-col class="font-weight-bold">Cocktails</b-col>
            </b-row>

            <b-row
              v-for="cocktail in filteredCocktails"
              v-bind:key="cocktail._id"
            >
              <b-col
                >{{ cocktail.cocktail_name }}
                <td>
                  <cocktail-item v-bind:cocktail="cocktail" />
                </td>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <div></div>
      </div>
    </body>
  </div>
</template>

<script>
import cocktailItem from '../components/cocktailItem.vue'
import { Api } from '@/Api'
import ingredientItem from '../components/ingredientItem.vue'

export default {
  name: 'cocktails',
  components: {
    'cocktail-item': cocktailItem,
    'ingredient-item': ingredientItem
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/cocktails')
      .then((response) => {
        this.cocktails = response.data.cocktails
        // console.log(this.cocktails)
      })
      .catch((error) => {
        this.cocktails = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })

    Api.get('/ingredients')
      .then((response) => {
        this.ingredients = response.data.ingredients
        this.ingredients.forEach((ingredient) =>
          this.$set(ingredient, 'selected', false)
        )
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
  computed: {
    allSelected() {
      return this.ingredients.every((ingredient) => ingredient.selected)
    },
    filteredCocktails: function () {
      const newList = []
      const newcocktailList = []
      const countIngredients = []
      return this.cocktails.filter((cocktails) => {
        for (let i = 0; i < cocktails.ingredients.length; i++) {
          countIngredients.push(cocktails.ingredients[i]._id)
        }
        for (let i = 0; i < cocktails.ingredients.length; i++) {
          const text = String(this.currentSelections)
          const newSelection = text.split(',')
          if (
            newSelection.length === 1 &&
            cocktails.ingredients.length <= 1 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (
            newSelection.length === 2 &&
            cocktails.ingredients.length <= 2 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (
            newSelection.length === 3 &&
            cocktails.ingredients.length <= 3 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (
            newSelection.length === 4 &&
            cocktails.ingredients.length <= 4 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (
            newSelection.length === 5 &&
            cocktails.ingredients.length <= 5 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (
            newSelection.length === 6 &&
            cocktails.ingredients.length <= 6 &&
            newSelection.every((ai) => countIngredients.includes(ai))
          ) {
            if (newSelection.includes(cocktails.ingredients[i]._id)) {
              newList.push(this.cocktails)
              return newList
            }
          } else if (this.allSelected === true) {
            return cocktails
          }
          if (cocktails.ingredients[i]._id !== newSelection) {
            newList.push(this.currentSelections)
            return newcocktailList & newList
          }
        }
        return newList
      })
    }
  },
  methods: {
    selectAll() {
      const allS = this.allSelected
      this.ingredients.forEach((ingredient) => {
        ingredient.selected = !allS
      })
    }
  },
  data() {
    return {
      cocktails: [],
      ingredients: [],
      text: '',
      currentSelections: [],
      cocktails_ingredients: []
    }
  },
  watch: {
    ingredients: {
      handler() {
        this.currentSelections = this.ingredients
          .filter((ingredient) => ingredient.selected)
          .map((ingredient) => ingredient._id)

          .toString()
      },
      deep: true
    }
  }
}
</script>

<style>
.table-dark {
  min-width: 600px;
  padding: 10px;
  margin-top: 5%;
  margin-left: 5%;
  border-radius: 10px;
  float: left;
}
.colTable {
  background-color: grey;
}
.table {
  background-color: rgb(31, 30, 30);
  color: WHITE !important;
}

/* .tables{
  margin: auto;
  border: 3px solid green;
  padding: 100px
} */

.ingredients {
  min-width: 200px;
  border-radius: 10px;
}

.ingredient-table-data {
  height: 50px;
}

.table-dark-mobile {
  min-width: 200px;
}
.ingredients-mobile-container {
  padding-top: 5%;
}
.ingredients-mobile {
  min-width: 200px;
  border-radius: 10px;
}

@media only screen and (min-width: 768px) {
  [class*='ingredients-mobile-container'] {
    display: none;
  }

  [class*='cocktails-mobile-container'] {
    display: none;
  }
}
</style>
