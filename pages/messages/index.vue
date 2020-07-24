<template>
  <layout>
    <template v-slot:body>
      <v-row class="mt-1">
        <v-col
          cols="6"
        >
          <v-card
            class="pa-6"
            style="min-height: 800px; color: #7A788D !important; background: #1F1F29;"
          >
            <p class="font-weight-bold">Messages</p>
            <v-btn
              :outlined="interval == null"
              color='primary'
              dark
              depressed
              @click="getData()"
            >
              Reload
            </v-btn>
            <br/>
            <br/>
            <br/>
            <div
              class="d-flex flex-column "
            >
              <div>
                <v-timeline
                  dense
                >
                  <v-slide-x-reverse-transition
                    group
                    hide-on-leave
                  >
                    <v-timeline-item
                      v-for="(message , i) in messages"
                      :key="message.id"
                      :color="message.type"
                      small
                      left
                      :fill-dot='false'
                    >
                      <v-alert
                        :value="true"
                        :color="message.type"
                        :icon="message.icon"
                        class="white--text"
                        _dismissible="message.dismissible"
                        _input="close(i,message.id)"
                      >
                        <h3> {{ message.title }} </h3>
                        <p> {{ message.short_description }} </p>

                        <v-expand-transition>
                          <div v-show="ditale_description[i]">
                            <v-divider></v-divider>
                            <v-card-text>
                              {{ message.description }}
                            </v-card-text>
                          </div>
                        </v-expand-transition>

                        <v-btn
                          dark
                          depressed
                          @click="changeDitaleDescription(i)"
                        >
                          Детально
                        </v-btn>
                      </v-alert>
                    </v-timeline-item>
                  </v-slide-x-reverse-transition>
                </v-timeline>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="6"
        >
          <v-card
            class="pa-6"
            style="min-height: 800px; color: #7A788D !important; background: #1F1F29;"
          >
            <p class="font-weight-bold">Filter</p>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </layout>
</template>

<script>
import Layout from '~/components/layout/nodes.list';

export default {
  data() { return {
        interval: null,
        messages:[],
        ditale_description: {},
        nonce: 2,
    }},
    methods: {
      async getData(){
        await this.$store.dispatch('data/messages/fetchList')
        this.messages = this.$store.getters[`data/messages/list`]

        for (let index = 0; index < this.messages.length; index++) {
          this.$set(this.ditale_description, [index], false)
        }
        this.messages.forEach((message,i)=>{
          this.close(i,message.id)
        })
        this.getIcon()
        this.getDismissible()
      },
      async close (i,message_id) {
        let data = {
          "message_id":message_id
        }
        let response = await this.$axios.$post('api/messages_user_close',data)
        // this.$delete(this.messages, [i])
      },
      getIcon(){
        this.messages.forEach((e ,i, arr)=>{
          switch (e.type) {
            case 'info':
              e.icon = 'mdi-information'
              break;
            case 'warning':
              e.icon = 'mdi-alert'
              break;
            case 'error':
              e.icon = 'mdi-alert-circle'
              break;
            case 'success':
              e.icon = 'mdi-check-circle'
              break;

            default:
              e.icon = 'mdi-information'
              break;
          }
        })
      },
      getDismissible(){
        this.messages.forEach((e ,i, arr)=>{
          switch (e.can_close) {
            case 1:
              e.dismissible = true
              break;
            case 0:
              e.dismissible = false
              break;
            default:
              e.dismissible = false
              break;
          }
        })
      },
      changeDitaleDescription(i){
        this.ditale_description[i] = !this.ditale_description[i]
      },
    },

    mounted() {
        // switch active nodes
        this.getData()
        this.$store.commit('layout/update_nodes', [
            'Сигналы',
        ])
    },

    components: {
        Layout,
        // ..
    },
}
</script>
