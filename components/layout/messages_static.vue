<template>
  <div>
      <v-alert
        v-for="(message , i) in messages"
        :key="message.id"
        :value="true"
        color="error"
        :icon="message.icon"
        class="white--text message-static"
        :dismissible="message.dismissible"
        @input="close(i,message.id)"
      >
        <h3 style="display: inline-block!important;"> {{ message.title }} </h3>
        <p style="display: inline-block!important;"> {{ message.short_description }} </p>

        <v-expand-transition>
          <div v-show="ditale_description[i]">
            <v-divider></v-divider>
            <v-card-text>
              {{ message.description }}
            </v-card-text>
          </div>
        </v-expand-transition>

        <v-icon
          small
          class="mr-2"
          @click="changeDitaleDescription(i)"
        >
          mdi-menu-down-outline
        </v-icon>
      </v-alert>
  </div>
</template>

<script>
  export default {
    props: [
      'messages',
    ],
    data(){
      return {
        ditale_description: {},
      }
    },
    mounted() {
      for (let index = 0; index < this.messages.length; index++) {
        this.$set(this.ditale_description, [index], false)
      }
      console.log(this.messages)
    },
    methods:{
      changeDitaleDescription(i){
        this.$set(this.ditale_description, [i], !this.ditale_description[i])
      },
      async close (i,message_id) {
        let data = {
          "message_id":message_id
        }
        let response = await this.$axios.$post('api/messages_user_close',data)
        this.$delete(this.messages, [i])
      },
    }
  }
</script>

<style>
  .message-static{
    border-radius: 10px;
    width: 58%;
  }
</style>