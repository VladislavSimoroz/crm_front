<template>
  <div>
    <card-base class_data="pb-10">
      <div class="d-flex flex-row pa-4 py-3" style="border-bottom: 2px solid #24242E !important;">
        <div>
          <v-btn
            text
            color="#7A788D"
            style="margin-left: 5px; padding: 0;"
            @click="panel_manage.show_create"
          >
            <v-icon>mdi-plus-circle-outline</v-icon>
            <span class="ml-4">Добавить {{name_single}}</span>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
      </div>
      <list-base
        :type="type"
        :data_model="data_model"
        :name_single="name_single"
        :name_plural="name_plural"
        :headers="headers"
        :items="data_list"
        :item_status="item_status"
        :item_action="item_action"
        :item_action_menu="item_action_menu"
        :icon="icon"
        :search="search"
        :panel_manage="panel_manage"
        :panel_delete="panel_delete"
        :link="link"
        :link_fn="link_fn"
      ></list-base>


      <panel-base
        v-if="type == 'users'"
        v-model="panel_manage.status"
        :panel="panel_manage.options"
      >
        <template v-slot:body>
          <v-form v-model="panel_manage.valid" ref="panel_manage_form" @submit.prevent>
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
              :rules="validation_rules.required"
              outlined
              dense
              label="Email"
              required
              class="mb-1"
            ></v-text-field>
            <v-text-field
              v-if="panel_manage.insert"
              v-model="panel_manage.item.password"
              :rules="validation_rules.required"
              dense
              outlined
              label="Пароль"
              :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
              required
              :type="is_show_pass ? 'text' : 'password'"
              @click:append="is_show_pass = !is_show_pass"
            ></v-text-field>
            <v-divider></v-divider>
          </v-form>
        </template>
      </panel-base>

      <panel-base v-model="panel_delete.status" :panel="panel_delete.options">
        <template v-slot:body>
          <v-form v-model="panel_delete.valid" ref="panel_delete_form" @submit.prevent>
            <span class="font-weight-thin">{{name_single}}:</span>
            <span class="ml-4 font-weight-black">{{panel_delete.item.name}}</span>
          </v-form>
        </template>
      </panel-base>



      <panel-base
        v-if="type == 'roles'"
        v-model="panel_manage.status"
        :panel="panel_manage.options"
      >
        <template v-slot:body>
          <v-form v-model="panel_manage.valid" ref="panel_manage_form" @submit.prevent>
            <v-text-field
              v-model="panel_manage.item.name"
              outlined
              dense
              required
              :rules="validation_rules.required"
              label="Название Роли"
              class="mb-1"
            ></v-text-field>
            <v-text-field
              v-model="panel_manage.item.description"
              outlined
              dense
              label="Описание"
              class="mb-1"
            ></v-text-field>
          </v-form>
        </template>
      </panel-base>


    </card-base>
  </div>
</template>

<script>
import CardBase from "~/components/card/base";
import ListBase from "~/components/data/list/base";
import PanelBase from "~/components/panel/panel-base";
import ValidationRules from "~/plugins/validation";

import {
  mapState,
  mapGetters,
  mapAllGetters,
  mapActions,
  mapMutations
} from "vuex";

export default {
  name: "list-manage-base",

  props: [
    "type",
    "manage",
    "filter",
    "name_single",
    "name_plural",
    "headers",
    "items",
    "item_status",
    "item_action",

    // параметры для фильтрации
    "item_base",
    "devices_connections_filter",

    "enable_tags",

    // 'item_action_menu',
    "icon",
    "link",
    "link_fn"
  ],
  data() {
    return {
      data_model: "",
      api_tags_type: "",
      search: "",
      item_action_menu: [],

      // curr_loc_id: parseInt(this.filter.location_id),

      is_show_pass: false,

      // ..

      data_tags_active: [],
      data_tags_list: [],
      data_tags_active_slice: false,

      // ..

      panel_manage_item_hub_id: 0,
      panel_manage_item_device_in: 0,
      panel_manage_item_device_out: 0,
      panel_manage_item_param_in: 0,
      panel_manage_item_param_in_type: "",
      panel_manage_item_param_out: 0,
      panel_manage_item_param_out_type: "",

      data_model_select_hub_devices_list: [],
      data_model_select_param_in_list: [],
      data_model_select_param_out_list: [],

      // ..

      panel_manage: {
        status: false,
        reset_status: false,
        history_status: false,
        item: {},
        item_index: 0,
        action_type: "replace",
        valid: false,

        // история изменений
        history_list: [],

        options: {
          head_title: "",
          head_icon: "",
          fn_action: {
            name: "",
            loading: true,
            verify: () => {
              if (
                this.$refs.panel_manage_form &&
                this.$refs.panel_manage_form.validate()
              ) {
                return true;
              }
              return false;
            },
            action: async params => {
              if (this.panel_manage.action_type == "create") {
                let rs = await this.$store.dispatch(
                  `${this.data_model}/create`,
                  {
                    data: this.panel_manage.item
                  }
                );

                this.$emit("onCreate");
                this.$emit("onUpdate");
              }
              if (
                this.panel_manage.action_type == "replace" ||
                this.panel_manage.action_type == "replace_counter"
              ) {
                let rs = await this.$store.dispatch(
                  `${this.data_model}/replace`,
                  {
                    id: this.panel_manage.item.id,
                    data: this.panel_manage.item
                  }
                );

                this.$emit("onUpdate");
              }
              await this.$store.dispatch(`${this.data_model}/fetchList`);
            }
          },
          fn_hide: {
            name: "Отмена",
            action: () => {
              this.panel_manage.status = false;
            }
          }
        },

        show_update: async (item, options) => {
          let rs = await this.$store.dispatch(
            `${this.data_model}/fetchSingle`,
            {
              id: item.id
            }
          );

          if (rs && rs.data && rs.data.data) {
            // console.log("== single", rs.data.data)
            item = rs.data.data;
          }

          this.panel_manage.options.head_icon = this.icon;
          this.panel_manage.status = true;
          this.panel_manage.options.head_title = `Редактировать ${this.name_single}`;
          this.panel_manage.options.fn_action.name = "Сохранить";

          item = JSON.parse(JSON.stringify(item));

          this.panel_manage.item = Object.assign({}, item);
          this.panel_manage.item_index = this.data_list.indexOf(item);


          this.panel_manage_reset(item);

          // console.log('this.panel_manage.item', this.panel_manage.item)
        },

        show_create: item => {
          item = item || {};
          if (this.manage && this.manage.on_create_show) {
            item = this.manage.on_create_show(item);
          }
          if (this.item_base) {
            item = this.item_base;
          }

          this.panel_manage.options.head_icon = this.icon;
          this.panel_manage.status = true;
          this.panel_manage.options.head_title = `Добавить ${this.name_single}`;
          this.panel_manage.options.fn_action.name = "Добавить";
          this.panel_manage.item = Object.assign({}, item);
          this.panel_manage.item_index = 0;
          this.panel_manage.action_type = "create";

          this.panel_manage_reset();
        },
      },

      panel_delete: {
        status: false,
        item: {},
        item_index: 0,
        insert: false,
        valid: false,

        options: {
          head_title: "",
          head_icon: "",
          fn_action: {
            name: "",
            loading: true,
            verify: () => {
              if (this.$refs.panel_delete_form.validate()) {
                return true;
              }
              return false;
            },
            action: async () => {
              let rs = await this.$store.dispatch(
                `${this.data_model}/destroy`,
                {
                  id: this.panel_delete.item.id,
                  data: this.panel_delete.item
                }
              );
              await this.$store.dispatch(`${this.data_model}/fetchList`);
            }
          },
          fn_hide: {
            name: "Отмена",
            action: () => {
              this.panel_delete.status = false;
            }
          }
        },

        show: item => {
          item = item || {};

          this.panel_delete.options.head_icon = this.icon;
          this.panel_delete.status = true;
          this.panel_delete.options.head_title = `Удалить ${this.name_single}`;
          this.panel_delete.options.fn_action.name = "Удалить";
          this.panel_delete.item = item || {};
          this.panel_delete.item_index = 0;
          this.panel_delete.insert = true;
        }
      },
    };
  },

  methods: {
    panel_manage_reset(item) {
      if (item) {
        this.panel_manage_item_hub_id = item.hub_id;
        this.panel_manage_item_device_in = item.device_in;
        this.panel_manage_item_device_out = item.device_out;
        this.panel_manage_item_param_in = item.param_in;
        this.panel_manage_item_param_out = item.param_out;
        return;
      }

      this.panel_manage_item_hub_id = 0;
      this.panel_manage_item_device_in = 0;
      this.panel_manage_item_device_out = 0;
      this.panel_manage_item_param_in = 0;
      this.panel_manage_item_param_out = 0;
    },

    async model_init(model, conf) {
      let list = this.$store.getters[`${model}/list`];
      if (list.length == 0) {
        await this.$store.dispatch(`${model}/fetchList`);
      }

      if (this.enable_tags) {
        let tags_list = await this.$axios.get(
          `/api/${this.api_tags_type}/tags`,
          {}
        );
        if (
          tags_list.data &&
          tags_list.data.data &&
          tags_list.data.data.length > 0
        ) {
          this.data_tags_list = tags_list.data.data;
        }
      }
    }
  },

  computed: {
    ...mapGetters("data/roles", {
      data_model_roles_list: "list"
    }),

    data_list() {
      let list = this.$store.getters[`${this.data_model}/list`];

      if (this.data_tags_active && this.data_tags_active.length > 0) {
        list = list.filter(v => {
          let tag_active = false;
          this.data_tags_active.forEach(ft => {
            v.tags.forEach(vt => {
              if (vt.name == ft.name) {
                tag_active = true;
              }
            });
          });

          return tag_active ? v : false;
        });
      }
      return list;
    },

    validation_rules() {
      return ValidationRules();
    },

    // tags
    get_data_tags_list() {
      if (!this.data_tags_active_slice) {
        return this.data_tags_list.slice(0, 3);
      } else {
        return this.data_tags_list;
      }
    }
  },

  created() {
    if (this.type == "users") {
      this.data_model = "data/users";

      this.model_init("data/users");
      // this.$store.dispatch(`data/hubs/fetchList`);

      this.item_action_menu = [
        {
          icon: "mdi-circle-edit-outline",
          title: "Редактировать",
          action: this.panel_manage.show_update
        },
        {
          icon: "mdi-close-circle-outline",
          title: "Удалить",
          action: this.panel_delete.show
        }
        // {icon: 'mdi-close', title: 'DELETE', action: this.panel_manage.},
      ];
    }
    if (this.type == "roles") {
      this.data_model = "data/roles";

      this.item_action_menu = [
        {
          icon: "mdi-circle-edit-outline",
          title: "Редактировать",
          action: this.panel_manage.show_update
        },
        {
          icon: "mdi-close-circle-outline",
          title: "Удалить",
          action: this.panel_delete.show
        }
        // {icon: 'mdi-close', title: 'DELETE', action: this.panel_manage.},
      ];

      this.model_init("data/roles");
    }
  },

  components: {
    CardBase,
    ListBase,
    PanelBase,
  }
};
</script>
<style scoped>
.v-chip {
  padding-right: 4px !important;
}
.icon-delete-tag {
  border-radius: 10px;
  height: 20px;
  width: 20px;
  text-align: center;
}
.icon-delete-tag:hover {
  background-color: #277a1c;
}
.icon-delete-tag .v-icon {
  margin-bottom: 2px;
}
</style>
