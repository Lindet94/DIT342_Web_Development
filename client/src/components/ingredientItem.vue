<template>
    <div class="table">
          <td>{{ ingredient.ingredient_name }}</td>
    </div>
</template>

<script>
export default {
  name: 'ingredient-item',
  props: ['ingredient']
}
</script>

<style>
/* .table{
  background-color: white;
  height: 100px;
  padding: 5px;
  margin-top: 5px;
} */
</style>
