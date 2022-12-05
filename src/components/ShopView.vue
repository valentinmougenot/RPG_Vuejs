<template>
  <div>
    <table>
      <thead>
        <tr>
          <th colspan="2">{{boutique.nom}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stock : {{boutique.itemStock.length}} {{boutique.itemStock.length > 1 ? 'items' : 'item'}}</td>
          <td>Stock : {{boutique.itemCommande.length}} {{boutique.itemCommande.length > 1 ? 'items' : 'item'}}</td>
        </tr>
        <tr>
          <td>
            <ul>
              <li v-for="(item, index) in boutique.itemStock" :key="index">{{item.nom}} : {{item.prix}} po</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="(item, index) in boutique.itemCommande" :key="index">{{item.nom}} : {{item.prix}} po</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  props: {
    boutique: Object
  }
}
</script>

<style scoped>
th, td {
  border: 1px solid black;
}
table {
  border-collapse: collapse;
}

</style>