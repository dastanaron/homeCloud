<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ pathInfo.base }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{ pathInfo.dir }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>{{ pathInfo.ext }}</div>

        <div><!--Запихать сюда инфор о файле !--></div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          @click="showDialog"
        >
          <v-icon>mdi-play-box</v-icon> Play
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="isMovieDialogShow" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Просмотр</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!--Тут могут быть кнопки!-->
          </v-toolbar-items>
        </v-toolbar>
        <video v-if="srcToVideo" :src="srcToVideo" :controls="controlElementActive" :width="videoDialogWidth" :height="videoDialogHeight"></video>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'movie-preview',
  props: {
    pathInfo: {
      type: Object,
      required: true,
    },
    videoDialogHeight: {
      type: String,
      default: '80%'
    },
    videoDialogWidth: {
      type: String,
      default: '100%'
    },
    controlElementActive: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isMovieDialogShow: false,
  }),
  computed: {
      srcToVideo() {
        return this.isMovieDialogShow ? this.$root.context.env.VIDEO_FILE_PATH_LINK + '/' + this.pathInfo.base : '';
      }
  },
  methods: {
    showDialog() {
      this.isMovieDialogShow = true;
    },
    closeDialog() {
      this.isMovieDialogShow = false;
    },
  }
}
</script>