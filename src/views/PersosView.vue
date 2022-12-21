<template>
  <v-container>
    {{persosFiltre[0]}}
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <h1>Les personnages</h1>
        <label for="filteractive">filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
        <div v-if="filterActive">
          <v-select
            v-model="filter"
            :items="getPersosName()"
            @change="$store.commit('setCurrentPerso', persos.filter(perso => perso.nom === filter)[0])"
            label="Filtres"></v-select>
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
            <td>
              <CheckedList
                :data="persosFiltre[0].itemsAchetes"
                :fields="['nom']"
                :itemCheck="true"
                :checked="selectedItems"
                :itemButton="{show: true, text: 'infos'}"
                :listButton="{show: true, text: 'infos'}"
                @item-button-clicked="showItemInfo"
                @list-button-clicked="showListInfo"
                @checked-changed="changeSelectedItems"
              ></CheckedList>
            </td>
          </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <v-row v-if="persosFiltre.length === 1">
      <v-col>
        <v-select
            v-model=selectedItemName
            :items="persosFiltre[0].itemsAchetes.map(item => item.nom)"
            label="Sélectionner un item"></v-select>
        <v-btn @click="resellItem">Revendre</v-btn>
      </v-col>
      <v-col>
        <v-select
            v-model=selectedBodyName
            :items="persosFiltre[0].emplacements.map(empl => empl.nom)"
            label="Partie du corps sur laquelle (dés)assigner l'item"></v-select>
        <v-btn @click="assignItem">(Dés)assigner</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import {mapState} from "vuex";
import {itemLimits} from "@/services/data.service";
export default {
  name: 'PersosView',
  components: {
    CheckedList: () => import('@/components/CheckedList'),
  },

  data: () => ({
    filter: '',
    filterActive: false,
    selectedItemName: null,
    selectedBodyName: null,
  }),
  computed: {
    ...mapState(['persos']),
    persosFiltre() {
      if (this.filterActive) {
        return this.persos.filter(p => p.nom.includes(this.filter))
      }
      return this.persos
    },
    selectedItems() {
      return new Array(this.persosFiltre[0].itemsAchetes.length).fill(true)
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
    },

    getPersosName() {
      let result = [];
      this.persos.forEach(p => {
        result.push(p.nom);
      });
      return result;
    },
    showItemInfo(i) {
      alert(this.persosFiltre[0].itemsAchetes[i].nom + ' : ' + this.persosFiltre[0].itemsAchetes[i].prix);
    },
    showListInfo() {
      let message = '';
      for(var i = 0; i < this.persosFiltre[0].itemsAchetes.length; i++) {
        if (this.selectedItems[i]) {
          message += this.persosFiltre[0].itemsAchetes[i].nom + ' : ' + this.persosFiltre[0].itemsAchetes[i].prix + '\n';
        }
      }
      alert(message);
    },
    changeSelectedItems(i) {
      this.selectedItems[i] = !this.selectedItems[i];
    },
    resellItem() {
      const item = this.persosFiltre[0].itemsAchetes.filter(i => i.nom === this.selectedItemName)[0];
      const coef = (Math.floor(Math.random() * (90 - 40 + 1)) + 40) / 100;
      const prix = Math.floor(item.prix * coef);
      if (confirm('Voulez-vous vraiment revendre ' + item.nom + ' pour ' + prix + ' po ?')) {
        this.$store.commit('resell', {perso: this.persosFiltre[0], item: item, gold: prix});
      }
    },
    assignItem() {
      const item = this.persosFiltre[0].itemsAchetes.filter(i => i.nom === this.selectedItemName)[0];
      const body = this.persosFiltre[0].emplacements.filter(e => e.nom === this.selectedBodyName)[0];
      const itemLimites = itemLimits.filter(i => i.slot === body.nom)[0];
      if (!body.items.includes(item)) {
        if (itemLimites.limit <= body.items.length) {
          alert('Il y a trop d\'items sur cette partie du corps');
        }
        else if (!itemLimites.types.includes(item.type)) {
          alert('Ce type d\'item ne peut pas être placé sur cette partie du corps');
        }
        else if (confirm('Voulez-vous vraiment assigner ' + item.nom + ' à ' + body.nom + ' ?')) {
          this.$store.commit('assign', {item: item, body: body});
        }
      }
      else {
        if (confirm('Voulez-vous vraiment désassigner ' + item.nom + ' de ' + body.nom + ' ?')) {
          this.$store.commit('unassign', {item: item, body: body});
        }
      }
    }
  },
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