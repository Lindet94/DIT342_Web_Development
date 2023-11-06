<template>

  <div class="text-center">

    <button
      type="button"
      class="btn btn-primary m-2"
      v-b-modal.create-bar
      @click="addClick()"
    >
      Create Bar
    </button>

    <b-modal
      id="create-bar"
      title="Create Bar"
      class="modal fade login-modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer
    >
    <div>
      <form ref="form" @submit="handleSubmit">
        <b-form-group
          label-for="bar-input"
          invalid-feedback="Bar is required"
          :state="nameState"
        >
          <b-form-input
          class="input"
           placeholder="Bar name"
            id="bar-input"
            v-model="bar_name"
            :state="nameState"
            required
          ></b-form-input>
          <b-form-input
          class="input"
            placeholder="Adress"
            id="bar-input"
            v-model="adress"
            :state="nameState"
            required
          ></b-form-input>
          <b-form-input
          class="input"
            placeholder="Opening hours"
            id="bar-input"
            v-model="openingHours"
            :state="nameState"
            required
          ></b-form-input>
          <b-form-input
          class="input"
            placeholder="Description"
            id="bar-input"
            v-model="bar_description"
            :state="nameState"
            required
          ></b-form-input>
          <b-form-input
          class="input"
            placeholder="Category"
            id="bar-input"
            v-model="bar_category"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="button" @click="handleSubmit()" class="submit-button">Create</b-button>
      </form>
    </div>

    </b-modal>

    <div class="space"></div>
<div overflow:hidden id="hej">
  <input class="input" id="searchBar" type="text" v-model="search" placeholder="Search bars..">
</div>

    <div id ="checkboxes">
      <label>Rock</label>
      <input type="checkbox" value="Rock" v-model="bars_categories">
      <label>Jazz</label>
      <input type="checkbox" value="Jazz" v-model="bars_categories">
      <label>Lounge</label>
      <input type="checkbox" value="Lounge" v-model="bars_categories">
      <label>Other</label>
      <input type="checkbox" value="Other" v-model="bars_categories">
    </div>

    <b-container class="bar-container">
      <b-row class="font-weight-bold">
        <b-col>Bar Name</b-col>
        <b-col>Adress</b-col>
        <b-col>Opening Hours</b-col>
        <b-col>Bar description</b-col>
        <b-col>Actions</b-col>
      </b-row>

      <b-row
        class="bar-data"
        v-for="bar in filteredBars"
        v-bind:key="bar.id"
      >

        <b-col class="column-ID">{{ bar.bar_name }}</b-col>
        <b-col class="column-name">{{ bar.adress }}</b-col>
        <b-col class="column-name">{{ bar.openingHours }}</b-col>
        <b-col class="column-name">{{ bar.bar_description }}</b-col>
        <b-col class="column-buttons">
          <!-- <b-icon icon="pen" class="border rounded h3 mb-1"  @click="editClick(ingredient)"></b-icon>
        <b-icon icon="trash" class="border rounded h3 mb-1" @click="deleteClick(ingredient._id)"></b-icon> -->

          <button
            type="button"
            class="btn btn-light mr1"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="editClick(bar)"
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
            @click="deleteClick(bar._id)"
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

    <b-container class="mobilebar" fluid="lg" v-for="bar in filteredBars" v-bind:key="bar.id">
      <div class="text-left">
        <b-col class="font-weight-bold">Bar Name: {{ bar.bar_name }} </b-col>
        <b-col class="font-weight-bold">Adress: {{ bar.adress }} </b-col>
        <b-col class="font-weight-bold">Opening hours: {{ bar.openingHours }}</b-col>
        <b-col class="font-weight-bold">Description: {{ bar.bar_description }}</b-col>
        <b-col class="font-weight-bold">Actions</b-col>

        <b-col class="column-buttons">
          <!-- <b-icon icon="pen" class="border rounded h3 mb-1"  @click="editClick(ingredient)"></b-icon>
        <b-icon icon="trash" class="border rounded h3 mb-1" @click="deleteClick(ingredient._id)"></b-icon> -->
          <button
            type="button"
            class="btn btn-light mr1"
            data-toggle="modal"
            data-target="#exampleModal"
            @click="editClick(bar)"
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
            @click="deleteClick(bar._id)"
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

      </div>
    </b-container>

    <b-modal id="edit-modal" title="Edit Bar">
      <b-form>
        <b-form-input v-model="bar_name"></b-form-input><br />
        <b-form-input v-model="adress"></b-form-input><br />
        <b-form-input v-model="openingHours"></b-form-input><br />
        <b-form-input v-model="bar_description"></b-form-input><br />
        <b-form-input v-model="bar_category"></b-form-input><br />
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
Vue.use(BootstrapVueIcons)

export default {
  data() {
    return {
      search: '',
      bars: [],
      bars_categories: [],
      nameState: null,
      barId: 0,
      bar: '',
      bar_name: '',
      adress: '',
      openingHours: '',
      bar_description: '',
      bar_category: ''
    }
  },
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/bars')
      .then((response) => {
        this.bars = response.data.bars
      })
      .catch((error) => {
        this.bars = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  computed: {
    filteredBars: function () {
      return this.filteredBarsbySearch(this.filteredBarsbyCheckbox(this.bars))
    }
  },
  methods: {
    rephreshData() {
      Api.get('/bars').then((response) => {
        this.bars = response.data.bars
      })
    },
    filteredBarsbyCheckbox: function (bars) {
      return bars.filter(bars => {
        for (let i = 0; i < bars.bar_category.length; i++) {
          if ((bars.bar_category).includes(this.bars_categories)) {
            console.log(bars.bar_category)
            return this.bars
          }
        }
        return null
      })
    },
    filteredBarsbySearch(bars) {
      return bars.filter(bar => bar.bar_description.includes(this.search.toLowerCase()))
    },
    addClick() {
      this.barId = 0
      this.bar_name = ''
      this.adress = ''
      this.openingHours = ''
      this.bar_description = ''
      this.bar_category = ''
    },
    editClick(bar) {
      this.barId = bar._id
      this.bar_name = bar.bar_name
      this.adress = bar.adress
      this.openingHours = bar.openingHours
      this.bar_description = bar.bar_description
      this.bar_category = bar.bar_category
      this.$bvModal.show('edit-modal')
    },
    createClick() {
      Api.post('/bars', {
        bar_name: this.bar_name,
        adress: this.adress,
        openingHours: this.openingHours,
        bar_description: this.bar_description,
        bar_category: this.bar_category
      })
        .then((response) => {
          this.rephreshData()
          alert(response.data)
        })
        .catch((error) => {
          this.bars = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    updateClick() {
      Api.put('/bars/' + this.barId, {
        bar_name: this.bar_name,
        adress: this.adress,
        openingHours: this.openingHours,
        bar_description: this.bar_description,
        bar_category: this.bar_category
        // ingredients: [{ _id: this.ingredients }]
      })
        .then((response) => {
          this.rephreshData()
          alert(response.data)
        })
        .catch((error) => {
          this.bars = []
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
      Api.delete('/bars/' + id).then(
        (response) => {
          this.rephreshData()
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
      this.bar = ''
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
        this.$bvModal.hide('create-bar')
      })
    }
  }
}
</script>

<style>
@import '../assets/styles/modal.css';
.bar-container {
  background-color: #2b2828;
  color: rgb(255, 255, 255);
  border-radius: 10px;
  padding: 1%;
}

.mobile-bar-container {
  background-color: rgb(0, 0, 0);
}

.column-bar-ID{
  background-color: rgb(19, 17, 17);
  border-color: rgb(255, 255, 255);
    border-style: solid;

}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}

#checkboxes label{
  display: inline-block
}

.mobilebar{
  background-color: rgb(10, 9, 9);
  padding: 10px
}

.space{
  padding: 10px
}

@media only screen and (min-width: 768px) {
  [class*="mobilebar"] {
    display: none
  }
}

@media only screen and (max-width: 768px) {
  [class*="bar-container"] {
    display: none
  }
}

</style>
