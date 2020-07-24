<template>
  <layout>
    <template v-slot:body>
      <v-row class="mt-1">
        <v-col>
          <list-manage-base
            ref="list_manage_users"
            type="users"
            name_single="Пользователь"
            name_plural="Пользователи"
            :data_model="'data/accounts'"
            :headers="[
                            { text: '', value: 'icon', align: 'left', width: 40, sortable: false },
                            { text: 'Имя', value: 'name', align: 'left', width: 180 },
                            { text: 'Email', value: 'email', align: 'left', width: 180 },
                            { text: '', value: 'status', align: 'left', sortable: false },
                            { text: '', value: 'space', align: 'left', sortable: false },
                            { text: '', value: 'action', align: 'right', width: 40, sortable: false },
                        ]"
            :item_status="{
                            type: 'status_users'
                        }"
            :item_action="[
                            {icon: 'mdi-lead-pencil', color: '#7A920A', name: 'Редактировать', action: 'manage'},
                        ]"
            :item_action_menu="[
                            // {icon: 'mdi-close', title: 'DELETE', action: ''},
                        ]"
            icon="mdi-vector-square"
          ></list-manage-base>
        </v-col>
        <v-col cols="3">
          <v-card
            class="px-4 py-8"
            style="min-height: 800px; color: #7A788D !important; background: #1F1F29;"
          >

            <p class="font-weight-black">Управление аккаунтами</p>

            <p class="grey--text text--darken-2">
              Создание аккаунтов для доступа к вашей компании.
            </p>

            <p class="grey--text text--darken-2">
              Всего аккаунтов: <span class="ml-4 white--text display-1">{{data_list.length}}</span>
            </p>

          </v-card>
        </v-col>
      </v-row>

      <panel
        v-model="panel_manage.status"
        :panel="panel_manage.options"
      >
        <template v-slot:body>
          <v-form
            v-model="panel_manage.valid"
            ref="panel_manage_form"
            @submit.prevent
          >
            <v-text-field
              v-model="panel_manage.item.name"
              :rules="validation_rules.required"
              outlined
              dense
              label="Имя"
              required
              class="mb-1"
            ></v-text-field>
            <v-text-field
              v-model="panel_manage.item.email"
              :rules="validation_rules.email"
              outlined
              dense
              label="Email"
              required
              class="mb-1"
            ></v-text-field>
            <v-text-field
              v-model="panel_manage.item.password"
              dense
              outlined
              label="Пароль"
              :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="validation_rules.required"
              required
              :type="is_show_pass ? 'text' : 'password'"
              @click:append="is_show_pass = !is_show_pass"
            ></v-text-field>
          </v-form>
        </template>
      </panel>

    </template>
  </layout>
</template>

<script>
  import Layout from '~/components/layout/nodes.list';
  import Panel from '~/components/panel/base';
  import validation_rules_conf from '~/plugins/validation';
  import {mapMutations, mapGetters, mapActions} from 'vuex'

  import ListManageBase from '~/components/data/manage/base'

  // data models
  const data_model = 'data/users'

  export default {
    fetch({store}) {
      store.dispatch(`${data_model}/fetchList`);
    },
    data() {
      return {
        is_show_pass: false,
        data_list_search: '',
        data_list_headers: [
          {text: '', value: 'icon', align: 'left', width: 40},
          {text: 'Пользователь', value: 'name', align: 'left', width: 200},
          {text: 'Email', value: 'email', align: 'left', width: 200},
          {text: 'Роль', value: 'role', align: 'left'},
          {text: '', value: 'action', align: 'right', width: 40},
        ],

        // ..

        panel_manage: {
          status: false,
          options: {
            head_title: '',
            head_icon: 'mdi-account-multiple',
            fn_action: {
              name: '',
              loading: true,
              verify: () => {
                if (this.$refs.panel_manage_form.validate()) {
                  return true;
                }
                return false;
              },
              action: async () => {
                if (this.panel_manage.insert) {



                  let rs = await this.data_action_create({
                    data: {
                      email: this.panel_manage.item.email,
                      name: this.panel_manage.item.name,
                      password: this.panel_manage.item.password,
                    }
                  })

                  await this.data_action_list()
                }
              },
            },
            fn_hide: {
              name: 'Отмена',
              action: () => {
                this.panel_manage.status = false;
              },
            },
          },

          item: {},
          item_index: 0,
          insert: false,
          valid: false,
          show_pass: false,

          show_update: (item) => {

            this.panel_manage.status = true;
            this.panel_manage.options.head_title = 'Редактировать Аккаунт';
            this.panel_manage.options.fn_action.name = 'Сохранить';

            this.panel_manage.item = Object.assign({}, item);
            this.panel_manage.item_index = this.list.indexOf(item);
            this.panel_manage.insert = false;
          },

          show_create: () => {
            this.panel_manage.status = true;
            this.panel_manage.options.head_title = 'Создать Аккаунт';
            this.panel_manage.options.fn_action.name = 'Создать';
            this.panel_manage.item = {};
            this.panel_manage.item_index = 0;
            this.panel_manage.insert = true;
          },
        },

      }
    },

    methods: {
      ...mapActions(data_model, {
        data_action_create: 'create',
        data_action_update: 'update',
        data_action_list: 'fetchList'
      }),
      // ..
    },

    computed: {
      ...mapGetters(data_model, {
        data_list: 'list',
      }),

      validation_rules() {
        console.log(validation_rules_conf())
        return validation_rules_conf()
      },
    },

    mounted() {
      // switch active nodes
      this.$store.commit('layout/update_nodes', [
        'Аккаунты',
        'Список',
      ])
    },

    components: {
      Layout,
      Panel,
      ListManageBase,
    },
  }
</script>

<style>

</style>
