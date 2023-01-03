<template>
  <v-app>
    <NavBar
      :titles="[{text: 'Persos', color: 'primary', path: '/persos'}, {text: 'Ville', color: 'secondary', path: '/towns'}]"
    ></NavBar>
    <v-main>
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar: () => import('@/components/NavBar'),
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['getAllTowns', "getAllCharacs"]),
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>
