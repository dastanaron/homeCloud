<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        {{ $t('home.title') }}
      </div>
      <v-card></v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
//const Cookie = process.client ? require('~/Library/Cookie.js') : null;
//import {Cookie} from '~/Library/Cookie.js';

export default {
  mounted() {
    //console.log(Cookie);
  },
  components: {

  }
}
</script>
