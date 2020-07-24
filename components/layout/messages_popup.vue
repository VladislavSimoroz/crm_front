<template>
  <div>
    <v-snackbar
      v-model="message_status"
      :color="message_active.type"
      right
      :timeout="timeout"
      top
      :rounded="true"
      transition="scroll-y-transition"
    >
      <div>
       <v-row>
         <v-col md="1">
           <v-icon
             color="#444351"
             size="15"
             class="icon"
           >
             mdi-information-outline
           </v-icon>
         </v-col>
         <v-col md="auto">
           <div>
             <h3>{{ message_active.title }}</h3>
             <div>{{ message_active.description }}</div>
           </div>
         </v-col>
         <v-col md="auto">
           <div class="action-button">
             <v-btn
               @click="close_message"
               text
             >
               CLOSE
             </v-btn>
           </div>
         </v-col>
       </v-row>

      </div>
    </v-snackbar>
  </div>
</template>
<script>
  export default {
    props:[
      'messages',
      'timeout'
    ],
    data() {
      return {
        message_status: false,
        message_status_wait: false,
        list_shown: {},
        message_active: {},
      };
    },
    watch: {
      messages() {
        this.message_queue()
      },

      message_status(v) {
        if(v === false) {
          this.close_message_update()
          this.message_status_wait = true
          setTimeout(() => {
            this.message_status_wait = false
            this.message_queue()
          }, 1000)
        }
      },
    },
    methods: {
      message_queue() {
        let mess = this.messages

        if(mess.length > 0 && this.message_status !== true && !this.message_status_wait) {
          let active = null
          mess.forEach((v, k) => {
            if(!this.list_shown[v.id] && !active) {
              active = v
            }
          })

          if(!active) {
            return
          }

          this.$nextTick(() => {
            this.message_active = active
            this.list_shown[this.message_active.id] = true
            this.message_status = true
          })
        }
      },

      async close_message() {
        this.message_status = false
        await this.close_message_update()
      },

      async close_message_update() {
        let data = {
          "message_id":this.message_active.id,
          "watch_popup":true
        }
        await this.$axios.$post('api/messages_user_close',data)
      },
    }
  };
</script>