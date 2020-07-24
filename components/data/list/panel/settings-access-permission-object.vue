<template>
  <layout v-if="item.length > 0">

    <template v-slot:body >
      <v-data-table
      :headers="headers"
      :items="item"
      hide-default-footer
      item-key="id"
      class="elevation-1"
      >

        <template #item.can_read="{ item }">
          <v-switch v-model="item.can_read" @click.native="bootom_cheange(item, 'can_read')"></v-switch>
        </template>
        <template #item.can_write="{ item }">
          <v-switch v-model="item.can_write" @click.native="bootom_cheange(item, 'can_write')"></v-switch>
        </template>

      </v-data-table>
    </template>
  </layout>
</template>

<script>
import Layout from '~/components/layout/nodes.list';

export default {
  props:[
    'item',
    'parent',
  ],
  data: ()=>({
    loading : true,
    expanded: [],
    singleExpand: false,
    headers: [
          { text: 'Ресурс',align: 'start', sortable: false, value: 'name' },
          { text: 'Can read', value: 'can_read', sortable: false },
          { text: 'Can write', value: 'can_write', sortable: false },

        ],
    desserts:[],
  }),
  components: {
        Layout,
  },
  methods:{
    bootom_cheange(item,action){
      this.$emit('bootom_cheange_object',item,action, this.parent)
    },
  }
}
</script>
