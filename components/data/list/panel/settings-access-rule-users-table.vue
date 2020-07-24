<template>
  <v-row>
    <v-col md="5">
      <p class="text-center">Пользователи Роли</p>
      <v-data-table
        :headers="headers_has_role"
        :items="user_data.this_role"
        hide-default-footer
        _:sort-by.sync="sortBy"
        _:sort-desc.sync="sortDesc"
        class="elevation-1"
      >

      </v-data-table>
    </v-col>

    <v-col md="7">
      <p class="text-center">Добавить пользователя в Роль</p>
      <v-data-table
        :headers="headers_nor_has_role"
        :items="user_data.not_this_role"
        hide-default-footer
        _:sort-by.sync="sortBy"
        _:sort-desc.sync="sortDesc"
        class="elevation-1"
      >

        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            {{ item.user_table_action_icon }}
          </v-icon>
        </template>

      </v-data-table>
    </v-col>

  </v-row>

</template>

<script>
  export default {
    props:[
      'user_data'
    ],
    data: () => ({
      sortBy:'user_table_action_icon',
      dialog: false,
      sortDesc: false,
      headers_has_role: [
        {
          text: 'Имя',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Роль', value: 'role.name' },
        { text: 'Должность', value: 'position' },
      ],
      headers_nor_has_role: [
        {
          text: 'Имя',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Роль', value: 'role.name' },
        { text: 'Должность', value: 'position' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users_data: [],
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      editItem (item) {
        item.role_id = item.role_item_id
        this.update_user(item)
      },

      async update_user(item){
        let response = await this.$axios.$put('/api/users/'+item.id,item)
        this.$emit('update_user_data',item.item)
      },

      close () {
        this.dialog = false
      },
    },
  }
</script>
