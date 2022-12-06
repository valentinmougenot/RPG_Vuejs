<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <h1>Les villes</h1>
        <label for="filteractive">filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <label for="filtertown">filtre : </label><input v-model="filter" id="filtertown">
        </div>
        <ul>
          <li v-for="(ville, index) in villesFiltre" :key="index">{{ville.nom}}</li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="6" v-if="villesFiltre.length === 1">
        <table>
          <thead>
          <tr>
            <td>Rues : {{villesFiltre[0].rues.length}}</td>
            <td>Boutiques</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(rue, index) in villesFiltre[0].rues" :key="index">
            <td>{{rue.nom}} : {{rue.boutiques.length}}</td>
            <td>
<!--              <ul>
                <li v-for="(boutique, index) in rue.boutiques" :key="index">{{boutique.nom}} : {{boutique.itemStock.length}} {{boutique.itemStock.length > 1 ? 'articles' : 'article'}} en stock, {{boutique.itemCommande.length}} sur commande</li>
              </ul>-->
              <CheckedList
                :data="rue.boutiques"
                :fields="['nom']"
                :itemCheck="false"
                :checked="[]"
                :itemButton="{show: true, text: 'Sélectionner'}"
                :listButton="{show: false, text: ''}"
                @item-button-clicked="itemButtonClicked($event, index)"
                ></CheckedList>
            </td>
          </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <ShopView
      v-if="$store.state.currentBoutique"
    :boutique="$store.state.currentBoutique">
    </ShopView>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  components: {
    CheckedList: () => import('@/components/CheckedList.vue'),
    ShopView: () => import('@/components/ShopView.vue')
  },
  data: () => ({
    filter: '',
    filterActive: false,
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      if (this.filterActive) {
        return this.villes.filter(v => v.nom.includes(this.filter))
      }
      return this.villes
    }
  },
  methods: {
    itemButtonClicked(i, j) {
      this.$store.commit('setCurrentBoutique', this.villesFiltre[0].rues[j].boutiques[i])
    }
  },
  updated() {
    if (this.villesFiltre.length !== 1) {
      this.$store.commit('setCurrentBoutique', null)
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
