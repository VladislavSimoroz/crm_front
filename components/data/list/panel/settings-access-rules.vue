<template>
  <div>
    <v-btn
    small
    :color="color_btn"
    @click="save_chenge()"
    :disabled="disabled_btn"
    >Save</v-btn>
    <br>
    <br>
    <v-data-table
    :headers="headers"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    hide-default-footer
    :expand-icon="expand_icon"
    :show-expand="showExpand"
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    >
      <template #item.can_read="{ item }">
        <v-switch
          :color="!is_custom_read(item) ? 'blue' : 'red'"
          v-model="item.can_read"
          @click.native="bootom_cheange(item, 'can_read')"
          ></v-switch>
      </template>
      <template #item.can_write="{ item }">
        <v-switch
          :color="!is_custom_write(item) ? 'blue' : 'red'"
          v-model="item.can_write"
          @click.native="bootom_cheange(item, 'can_write')"
          ></v-switch>
      </template>

      <template #expanded-item="{ item }" >
        <PermissionObject
          :item="item.permission_object"
          :parent="item"
          @bootom_cheange_object="bootom_cheange_object"
        />
      </template>

    </v-data-table>
  </div>
</template>

<script>
import PermissionObject from '~/components/data/list/panel/settings-access-permission-object';

export default {
  props: [
    'item',
  ],
  data: ()=>({
    is_custom_list: [],
    loading : true,
    showExpand:true,
    expanded: [],
    disabled_btn: true,
    color_btn: '',
    expand_icon: 'mdi-menu-down-outline',
    singleExpand: true,
    headers: [
          { text: 'Ресурс',align: 'start', sortable: false, value: 'name' },
          { text: 'Can read', value: 'can_read', sortable: false },
          { text: 'Can write', value: 'can_write', sortable: false },
          { text: '', value: 'data-table-expand' },
        ],
    desserts:[],
  }),
  methods:{
    async getData(){
      let response = await this.$axios.$get('/api/permission_resources/getByRole/'+this.item.id)
      console.log(response)
      this.loading = false
      this.desserts = response.data
    },

    bootom_cheange(item, action){
      let current = item[action]

      item.permission_object.forEach(v => {
        v[action] = current
      })

      this.color_btn = 'primary'
      this.disabled_btn = false
    },

    bootom_cheange_object(item, action, parent){
      let is_all_true = true
      let is_all_false = true

      parent.permission_object.forEach(v => {
        if(!v[action]) {
          is_all_true = false
        }
        if(v[action]) {
          is_all_false = false
        }
      })

      if(!is_all_false && !is_all_true) {
        parent[action] = true
        this.is_custom_list[parent.id] = true
      }

      if(is_all_false) {
        parent[action] = false
      }

      this.color_btn = 'primary'
      this.disabled_btn = false
    },

    is_custom_read(item) {
      if(!item.permission_object || item.permission_object.length == 0) {
        return false
      }

      let custom = false
      item.permission_object.forEach(v => {
        if(item.can_read != v.can_read) {
          custom = true
        }
      })

      return custom
    },
    is_custom_write(item) {
      if(!item.permission_object || item.permission_object.length == 0) {
        return false
      }

      let custom = false
      item.permission_object.forEach(v => {
        if(item.can_write != v.can_write) {
          custom = true
        }
      })

      return custom
    },
    async save_chenge() {
      this.$store.dispatch('config/menu/updateMenu');
      let data_seve = JSON.parse(JSON.stringify(this.desserts))

      data_seve.forEach(v => {
        if(v.can_read == true){
          v.can_read = 1
        }
        if(v.can_read == false){
          v.can_read = 0
        }
        if(v.can_write == true){
          v.can_write = 1
        }
        if(v.can_write == false){
          v.can_write = 0
        }
        v.permission_object.forEach(e =>{
          if(e.can_read == true){
            e.can_read = 1
          }
          if(e.can_read == false){
            e.can_read = 0
          }
          if(e.can_write == true){
            e.can_write = 1
          }
          if(e.can_write == false){
            e.can_write = 0
          }
          if(e.can_read != v.can_read) {
            v.can_read = 2
          }
          if(e.can_write != v.can_write) {
            v.can_write = 2
          }
        })
      })

      let save = await this.$axios.$post('/api/permission_resources/update',data_seve)

      this.color_btn = ''
      this.disabled_btn = true
    }

  },
  mounted() {
    this.getData()
  },
  components: {
    PermissionObject
  }
}
</script>
