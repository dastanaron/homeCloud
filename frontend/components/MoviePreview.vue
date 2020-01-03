<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>Movie Name</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ path }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>.avi</div>

      <div>mp4 mp3</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
      >
        <v-icon>mdi-play-box</v-icon> Play
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'movie-preview',
  props: {
    path: {
      type: String,
      required: true,
    }
  }
}
</script>