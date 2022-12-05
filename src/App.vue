<template>
  <v-app>
    <NavBar
      :titles="[{text: 'Persos', color: 'primary'}, {text: 'Ville', color: 'secondary'}]"
      @menu-clicked="menuClicked"
    ></NavBar>
    <v-main>
      <router-view/>
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
    menuClicked(index) {
      if (index === 0) {
        this.$router.push({path: '/persos'})
      } else if (index === 1) {
        this.$router.push({path: '/towns'})
      }
    }
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>
