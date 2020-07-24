<template>
    <v-card style="background-color:#17182D; border-radius:15px;" outlined>
      <v-card-text>

        <vue-json-pretty
          :path="'res'"
          :deep="deep"
          :showLength="showLength"
          :data="JSON.parse(ditale_data.result)"
          :highlightMouseoverNode ="highlightMouseoverNode"
          :showLine="showLine"
        >
        </vue-json-pretty>

      </v-card-text>
    </v-card>
</template>

<script>
import  VueJsonPretty from 'vue-json-pretty'

export default {
  props: [
    'ditale_data'
  ],
  data() {return {
    showLength: true,
    deep: 2,
    highlightMouseoverNode: false,
    showLine: false,
  }},
  components: {
    VueJsonPretty
  }
}
</script>
