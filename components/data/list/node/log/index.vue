<template>
  <v-timeline
    align-top
    dense
    class="mt-6"
  >
    <v-timeline-item
      v-for="(v, k) in log"
      :key="v.id"
      color="pink"
      small
      >
      <template v-slot:icon>
        <v-avatar
          :color="get_color_avatar(v)"
          size="36"
        >
          <v-icon
            size="26"
            >{{icon(v)}}
          </v-icon>
        </v-avatar>
      </template>
      <div style="font-weight: light; font-size: 12px;">
         <strong>{{ date_format(v.id,v.created_at)}}</strong>
       </div>
       <div>
         <strong>
          <v-row>
            <p class="">
              {{model(v.model)}} {{fields(v).data.id}} {{v.action}}
            </p>
          </v-row>
          <v-row>
            <p class="">
              Пользователем {{ v.user_name }}
            </p>
          </v-row>
          <v-row>
              <template>
                <v-expansion-panels
                  :flat="flat_expansion_panels"
                  :inset="inset_expansion_panels"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>Детально</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <VuewJson
                        :ditale_data="v"
                      />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </template>
          </v-row>
        </strong>
       </div>
    </v-timeline-item>
  </v-timeline>
</template>

<style scoped>
.v-expansion-panels{
  width: 80%;
}
</style>

<script>

import _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import VuewJson from '~/components/data/manage/vuew-json';

export default {
    props:[
      'limit_filter',
      'dates_filter',
      'action_filter',
      'model_filter',
    ],
    data() { return {
        log: {},
        user_name : '',
        flat_expansion_panels: false,
        inset_expansion_panels: false,
    }},
    watch:{
      limit_filter: function(){
        this.getData()
      },
      dates_filter: function(){
        this.getData()
      },
      action_filter: function(){
        this.getData()
      },
      model_filter: function(){
        // console.log(this.model_filter)
        this.getData()
      }
    },
    methods: {
        icon(s) {
            switch(s.model) {
                case 'App\\Models\\Location': return 'mdi-map-marker'
                case 'App\\Models\\Screen': return 'mdi-fullscreen'
                case 'App\\Models\\User': return 'mdi-account-multiple'
                case 'App\\Models\\Device': return 'mdi-vector-square'
                case 'App\\Models\\Hub': return 'mdi-access-point-network'
                case 'App\\Models\\Panel': return 'mdi-apps'
                case 'App\\Models\\Role': return 'mdi-account-key'
                case 'App\\Models\\PermissionResources': return 'mdi-account-key'
                default: return 'mdi-apps'
            }
        },

        model(s) {
            let name = ""
            switch(s) {
                case 'App\\Models\\Location': return 'Обьект'
                default : return s.split('\\')[2]
            }
        },

        date_format(v,date){
          if(moment().diff(date,'hours') > 1) {
            return date
          }else{
            return moment( date, "YYYY-MM-DD hh:mm:ss").fromNow()
          }
        },

        get_color_avatar(s){
          switch(s.model) {
                case 'App\\Models\\Location': return 'yellow darken-2'
                case 'App\\Models\\Screen': return 'green darken-2'
                case 'App\\Models\\User': return 'brown darken-1'
                case 'App\\Models\\Device': return 'grey darken-2'
                case 'App\\Models\\Hub': return 'light-blue darken-3'
                case 'App\\Models\\Panel': return 'green darken-3'
                case 'App\\Models\\Role': return 'cyan darken-3'
                case 'App\\Models\\PermissionResources': return 'cyan darken-3'
                default: return 'grey'
            }
        },

        link(s) {
            let data = this.fields(s)
            switch(s.model) {
                case 'App\\Models\\Location': return `/locations/${data.data.id}/home`
            }
        },

        fields(s) {
            let data = {}
            try {
                data = JSON.parse(s.result)
            } catch(e) {
                // ..
            }
            return data

            // console.log("// == == LOG", s)
        },
        ditale(s) {
          this.$emit('ditale',s)
        },
        async getData(){
          let data = {
            limit: this.limit_filter,
            date_range: this.dates_filter,
          }
          if(this.action_filter.length > 0 && this.action_filter!='All'){
            data.action=[this.action_filter]
          }

          if(this.model_filter.length > 0 && this.model_filter!='All'){
            data.model= [this.model_filter]
          }

          let log = await this.$axios({
            method: 'post',
            url: `/api/request_log`,
            data: data,
          })

          this.log = log.data.data.filter(v => {
              return v.model != 'App\\Models\\RequestLog' && (v.action == 'store()' || v.action == 'update()' || v.action == 'destroy()' || v.action =='updateMass()')
          })
        }
    },

    async mounted() {
        this.getData()
    },

    components: {
        VuewJson,
    },
}
</script>

