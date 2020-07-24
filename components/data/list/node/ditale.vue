<template>
  <v-card
    class="px-4 py-8"
    style="min-height: 800px; color: #7A788D !important; background: #1F1F29;"
  >
    <p class="font-weight-black">Фильтры</p>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="items_limit_selected"
          :items="items_limit"
          item-text="title"
          item-value="value"
          label="Количество записей"
          @change="onChangeNumberRecords($event)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              label="Дата"
              readonly
              @change="cheange_date()"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date"  range></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="items_action_selected"
          :items="items_action"
          item-text="title"
          item-value="value"
          label="Метод"
          @change="onChangeAction($event)"
        ></v-select>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="items_model_selected"
          :items="items_model"
          item-text="title"
          item-value="value"
          label="Модель"
          @change="onChangeModel($event)"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import VuewJson from '~/components/data/manage/vuew-json';
import moment from 'moment';

export default {
  props:[
    'ditale_data',
    'dates_filter'
  ],
  data: () => ({
    date:  [moment().format("YYYY-MM-DD"),moment().format("YYYY-MM-DD")],
    items_limit_selected: {title: '10', value: '10'},
    items_limit: [
      {title: '1 елемент', value: '1'},
      {title: '10 елементов', value: '10'},
      {title: '15 елементов', value: '15'},
      {title: '25 елементов', value: '25'},
      {title: '50 елементов', value: '50'},
    ],
    items_action_selected: { title :'All' , value: 'All'},
    items_action: [
      {title :'All' , value: 'All'},
      {title :'update',value: 'update()'},
      {title :'destroy',value: 'destroy()'},
      {title :'store',value: 'store()'},
      {title :'updateMass',value: 'updateMass()'},
    ],
    items_model_selected: {title: 'All', value: ''},
    items_model: [
      {title: 'All', value: ''},
      {title: 'Location', value: 'App\\Models\\Location'},
      {title: 'Screen', value: 'App\\Models\\Screen'},
      {title: 'User', value: 'App\\Models\\User'},
      {title: 'Device', value: 'App\\Models\\Device'},
      {title: 'Hub', value: 'App\\Models\\Hub'},
      {title: 'Panel', value: 'App\\Models\\Panel'},
      {title: 'Role', value: 'App\\Models\\Role'},
      {title: 'PermissionResources', value: 'App\\Models\\PermissionResources'},

    ],
  }),
  methods: {
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
    onChangeNumberRecords(event) {
      this.$emit('chenge_limit',event)
    },
    onChangeAction(event) {
      this.$emit('chenge_action',event)
    },
    onChangeModel(event){
      this.$emit('chenge_model',event)
    },
  },
  watch:{
    date: function(item){
      if(item.length > 1){
        this.$emit('chenge_dates',item)
      }
    }
  },
  components:{
    VuewJson,
  },
  computed: {
    dateRangeText () {
      // console.log(this.date)
      return this.date.join(' ~ ')
    },
  },
}
</script>
