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
          <td>Sur commande : {{boutique.itemCommande.length}} {{boutique.itemCommande.length > 1 ? 'items' : 'item'}}</td>
        </tr>
        <tr>
          <td>
            <CheckedList :data="boutique.itemStock"
                         :fields="['nom', 'prix']"
                         :itemCheck="true"
                         :checked="selectedItem"
                         :itemButton="{show: true, text: 'achat'}"
                         :listButton="{show: true, text: 'Acheter selectionnes'}"
                         @item-button-clicked="commande"
                         @list-button-clicked="commandeAll"
            >
            </CheckedList>
          </td>
          <td>
            <CheckedList
               :data="boutique.itemCommande"
               :fields="['nom', 'prix']"
               :itemCheck="false"
               :checked="[]"
               :itemButton="{show: true, text: 'Commande'}"
               :listButton="{show: false, text: ''}"
            ></CheckedList>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ShopView",
  components: {
    CheckedList: () => import("@/components/CheckedList.vue")
  },
  props: {
    boutique: Object
  },
  computed: {
    selectedItem(){
      return Array(this.boutique.itemStock.length).fill(true)
    },
  },
  methods: {
    commande(i){
      if (this.canBuy(i)){
        this.$store.commit('sell', this.boutique.itemStock[i])
      }
      console.log('commande')
    },
    commandeAll(){
      this.canBuy();
      console.log('commandeAll')
    },
    canBuy(i){
      return this.boutique.itemStock[i].prix <= this.$store.getters.getPersoOr
    }
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