<template>
  <div class="table">
    <td class="head" >{{ cocktail.cocktail_name }}</td>
    <td>{{ cocktail.glass }}</td>
      <div class="table-Ingredients btn btn-success" v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }} </div>
    </div>
</template>

<script>
export default {
  name: 'cocktail-item',
  props: ['cocktail'],
  data() {
    return {
      ingredients: []
    }
  },
  mounted() {
    fetch('/api/cocktails/ingredientsName/' + this.cocktail._id)
      .then(response => response.json())
      .then(data => { this.ingredients = data })
      .catch(err => console.log(err.message))
  }
}

</script>

<style>
.table {
  background-color: white;
  height: 100px;
  padding: 5px;
  margin-top: 5px;
}
.table-Ingredients{
    padding: 5px;
    padding-right: 100px;
    padding-left: 100px;
    float: right;
    background-color: green;
    width: fit-content !important;
}
.btn-success{
  width: fit-content !important;
}
.head{
  font-weight: bold;
  text-decoration: underline;
}
</style>
