import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    currentPerso: null,
    currentBoutique: null,
  }),
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateVilles(state, villes) {
      state.villes = villes
    },
    updatePersos(state, persos) {
      state.persos = persos
    },
    setCurrentPerso(state, perso) {
      state.currentPerso = perso
    },
    setCurrentBoutique(state, boutique) {
        state.currentBoutique = boutique
    },
    sell(state, item) {
      if (state.currentPerso) {
        state.currentPerso.itemsAchetes.push(item)
        state.currentBoutique.itemStock.splice(state.currentBoutique.itemStock.indexOf(item), 1)
        state.currentPerso.or -= item.prix
      }
    },
    stock(state, item) {
      state.currentBoutique.itemStock.push(item)
    },
    resell(state, data) {
      if (state.currentBoutique) {
        state.currentBoutique.itemStock.push(data.item)
        state.currentPerso.itemsAchetes.splice(state.currentPerso.itemsAchetes.indexOf(data.item), 1)
        state.currentPerso.or += data.gold
      }
    },
    assign(state, data) {
        data.body.items.push(data.item)
    },
    unassign(state, data) {
        data.body.items.splice(data.body.items.indexOf(data.item), 1)
    }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async getAllTowns({commit}) {
      console.log('récupération des villes');
      let response = await TownService.getAllTowns()
      if (response.error === 0) {
        commit('updateVilles', response.data)
      } else {
        console.log(response.data)
      }
    },
    async getAllCharacs({commit}) {
      console.log('récupération des personnages');
      let response = await CharacService.getAllCharacs()
      if (response.error === 0) {
        commit('updatePersos', response.data)
      } else {
        console.log(response.data)
      }
    },
    async order(context, data) {
      setTimeout(() => {
        context.commit('stock', data.item)
      }, data.time)
    }
  },
    // getters = fonctions pour récupérer des données du state
    getters: {
        getPersoOr(state) {
            if (state.currentPerso) {
              return state.currentPerso.or
            }
            return 0;
        }
    }
})
