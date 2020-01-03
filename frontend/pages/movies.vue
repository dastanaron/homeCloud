<template>
  <v-layout>
    <v-row>
      <v-col :md="3" v-for="i in 12" :key="i">
        <movie-preview></movie-preview>
      </v-col>
    </v-row>
    
  </v-layout>
</template>

<script>
import MoviePreview from '~/components/MoviePreview.vue'


export default {
  async asyncData ({ params }) {
    const data = {};
    console.log(params);
    
    return { data: data }
  },
  data: () => ({

  }),
  mounted() {
    
  },
  components: {
    MoviePreview,
  }
}
</script>