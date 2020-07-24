<template>
  <div>
    <v-row class="mt-1">
      <v-col>
        <list-manage-base
          ref="list_manage_roles"
          type="roles"
          name_single="Роль"
          name_plural="Роли"
          :data_model="'data/roles'"
          :headers="[
              { text: '', value: 'icon', align: 'left', width: 40, sortable: false },
              { text: 'Роль', value: 'name', align: 'left', width: 180 },
              { text: '', value: 'space', align: 'left', sortable: false },
              { text: '', value: 'action', align: 'right', width: 40, sortable: false },
          ]"
          :item_status="{
              //type: 'status_location'
          }"
          :item_action="item_action"
          icon="mdi-account-supervisor-outline"
          ></list-manage-base>

        <v-dialog
            v-model="panel_dialog"
            max-width="80%"
            >
            <v-card
                outlined
                class="px-4 py-4"
                style="background: #1F1F29;"
                >
                <p class="subtitle-1 white--text">
                    <v-icon
                        class="mr-4"
                        >
                        {{panel_dialog_users.head_icon}}
                    </v-icon>
                    <span>{{panel_dialog_users.head_title}}</span>
                </p>

                <v-divider class="my-4 mt-2 mb-8"></v-divider>

                <UsersTables
                  :user_data="user_data"
                  @update_user_data="update_user_data"
                />

                <v-card-actions class="mt-8 pa-0">
                    <v-spacer></v-spacer>
                    <v-btn
                        tile
                        outlined
                        color="white"
                        text
                        class="px-4"
                        @click="panel_dialog = false"
                        >
                        {{panel_dialog_users.btn_action.btn_name}}
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import Layout from '~/components/layout/nodes.list';
import ListManageBase from '~/components/data/manage/base';
import UsersTables from '~/components/data/list/panel/settings-access-rule-users-table';

const data_model = 'data/roles'

export default {
  data() { return {
    panel_dialog: false,
    user_data:{
      this_role:[],
      not_this_role:[]
    },
    panel_dialog_users:{
      head_icon : 'mdi-account',
      head_title : '',
      btn_action:{
        btn_name:"Закрыть"
      },
    },
    item_action:[
      {
        icon: 'mdi-account-group',
        color: '#7A920A',
        name: 'Пользователи',
        fn: this.get_users,
      },
      {
        icon: 'mdi-menu-down-outline',
        color: '#7A920A',
        name: 'Показать права',
        panel: {type: 'settings_access_rule'},
      },
    ],

  }},
  methods: {
    async delete_role(item){
      let response = await this.$axios.$delete('/api/roles/'+item.id)
      this.getData(item)
    },
    get_users(item) {
      this.panel_dialog = true
      this.getData(item)
    },
    update_user_data(item){
      this.get_users(item)
    },
    async getData(item){
        let response = await this.$axios.$get('/api/users')
        this.panel_dialog_users.head_title = 'Роль '+item.name
        this.user_data.this_role = [],
        this.user_data.not_this_role = [],
        response.data.forEach(e => {
          if(e.role_id == item.id) {
            e.this_role = 1
            e.user_table_action_icon = ''
            e.role_item_id = item.id
            e.item = item
            this.user_data.this_role.push(e)
          }else{
            e.this_role = 0
            e.user_table_action_icon = 'mdi-plus'
            e.role_item_id = item.id
            e.item = item
            this.user_data.not_this_role.push(e)
          }
        })
    },
  },
  components: {
        ListManageBase,
        Layout,
        UsersTables,
  },
  computed:{
    validation_rules() {
            return ValidationRules()
    },
  }
}
</script>
