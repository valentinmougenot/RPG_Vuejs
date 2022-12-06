<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <input type="checkbox" v-if="itemCheck" :checked="checked[index]" @change="$emit('checked-changed', index)">
        <span v-for="(value, i) in fields" :key="i">
          {{ item[value] }}
        </span>
        <button v-if="itemButton.show" @click="$emit('item-button-clicked', index)">{{itemButton.text}}</button>
      </li>
    </ul>
    <button v-if="listButton.show" @click="$emit('list-button-clicked')">{{listButton.text}}</button>
  </div>
</template>

<script>

export default {
  name: 'CheckedList',
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
  },
  data : () => {
    return {
    }
  }
}
</script>

<style scoped>
</style>