<template>
  <v-layout>
    <v-row v-if="videoFiles.length > 0">
      <v-col :md="3" v-for="(fileInfo, index) in videoFiles" :key="index">
        <movie-preview
          :path-info="fileInfo.pathInfo"
        ></movie-preview>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :md="3">
        Нет видео доступного для просмотра
      </v-col>
    </v-row>    
  </v-layout>
</template>

<script>
import MoviePreview from '~/components/MoviePreview.vue';

const GET_VIDEO_FILES_COMMAND = 'getVideoFiles';

export default {
  async asyncData ({ params }) {
    if (process.server) {
      //return { videoFiles: ["/home/dastanaron/Видео/nuxt.mp4","/home/dastanaron/Видео/randomcolor.mp4"] }
    }
  },
  data: () => ({
    videoFiles: [],
  }),
  methods: {
    loadVideoFiles() {
      let socket = new WebSocket(this.$root.context.env.MOVIE_SOCKET);

      socket.onopen = (event) => {
        socket.send(JSON.stringify({command: GET_VIDEO_FILES_COMMAND, path: this.$root.context.env.PATH_TO_VIDEO}));
      };

      socket.onmessage = (event) => {
        let decodedMessage = JSON.parse(event.data);
        if(decodedMessage.data !== undefined) {
          this.videoFiles = decodedMessage.data;
        }
      };

      socket.onclose = (event) => {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          console.log('[close] Соединение прервано');
        }
      };
    },
  },
  mounted() {
    this.loadVideoFiles();
  },
  components: {
    MoviePreview,
  }
}
</script>