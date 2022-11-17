<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <h1>Les personnages</h1>
        <label for="filteractive">filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <label for="filterperso">filtre : </label><input v-model="filter" id="filterperso">
        </div>
        <ul>
          <li v-for="(perso, index) in persosFiltre" :key="index">{{perso.nom}}</li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="6" v-if="persosFiltre.length === 1">
        <table>
          <thead>
          <tr>
            <th>Attributs</th>
            <th>Emplacements</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <ul>
                <li>Niveau: {{persosFiltre[0].niveau}}</li>
                <li>Vie: {{persosFiltre[0].attributs.vie}}</li>
                <li>Vitalité: {{persosFiltre[0].attributs.vitalite}}</li>
                <li>Force: {{persosFiltre[0].attributs.force}}</li>
                <li>Armure: {{persosFiltre[0].attributs.protection}}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Tête
                  <span v-if="getLengthName('head') > 0">
                    [{{getLengthName('head')}}]: {{getItemsName('head')}}
                  </span>
                </li>
                <li>Corps
                  <span v-if="getLengthName('body') > 0">
                    [{{getLengthName('body')}}]: {{getItemsName('body')}}
                  </span>
                </li>
                <li>Mains
                  <span v-if="getLengthName('hands') > 0">
                    [{{getLengthName('hands')}}]: {{getItemsName('hands')}}
                  </span>
                </li>
                <li>Ceinture
                  <span v-if="getLengthName('belt') > 0">
                    [{{getLengthName('belt')}}]: {{getItemsName('hands')}}
                  </span>
                </li>
                <li>Sac à dos
                  <span v-if="getLengthName('bag') > 0">
                    [{{getLengthName('bag')}}]: {{getItemsName('bag')}}
                  </span>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Or : {{persosFiltre[0].or}}</td>
            <td>{{getItemsAchetesLength() > 1 ? 'items achetés' : 'items acheté'}}
              <span v-if="getItemsAchetesLength() > 0">
                [{{getItemsAchetesLength()}}]: {{getItemsAchetes()}}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'PersosView',
  data: () => ({
    filter: '',
    filterActive: false
  }),
  computed: {
    ...mapState(['persos']),
    persosFiltre() {
      if (this.filterActive) {
        return this.persos.filter(p => p.nom.includes(this.filter))
      }
      return this.persos
    }
  },
  methods: {
    getLengthName(name) {
      return this.persosFiltre[0].emplacements.filter(e => e.nom === name)[0].items.length;
    },
    getItemsName(name) {
      return this.persosFiltre[0].emplacements.filter(e => e.nom === name)[0].items.map(i => i.nom).join(', ');
    },
    getItemsAchetesLength() {
      return this.persosFiltre[0].itemsAchetes.length;
    },
    getItemsAchetes() {
      return this.persosFiltre[0].itemsAchetes.map(i => i.nom).join(', ');
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