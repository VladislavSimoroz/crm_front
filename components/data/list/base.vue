<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="id"
    :search="search"
    _hide-default-header
    :hide-default-footer="!(items && items.length >= 10)"
    :expanded.sync="expanded"
    :options="{
            itemsPerPage: 100,
        }"
    :sort-by="'id'"
    :sort-desc="true"
    class="elevation-0"
    :class="`list-${type}`"
    style="color: #7A788D !important; background: none;"
  >

    <template #top>
      <v-menu
        v-model="menu_status"
        :position-x="menu_pos_x"
        :position-y="menu_pos_y"
        absolute
        _offset-x
        _offset-y
        _style="background: #1F1F29 !important;"
      >
        <v-list
          dense
          style="min-width: 200px; background: #1F1F29 !important; border: 1px solid #888; border-radius: 6px;"
        >
          <div v-for="(v, k) in item_action_menu" :key="k">
            <v-list-item
              v-if="check_menu_item(v.check)"
              @click="v.action(menu_item)"
            >
              <v-list-item-icon
                class="mr-2 pa-0"
              >
                <v-icon small class="ma-0 pa-0">{{ v.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ v.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </v-list>
      </v-menu>
    </template>

    <template #expanded-item="{ headers, item }">
      <td
        :colspan="headers.length"
        style="background: #1A1A22;"
      >
        <div
          class="list-expand-boby"
          style="display: block; min-height: 200px;"
        >

          <list-panel-settings-access-rules
            v-if="panel.type == 'settings_access_rule' && panel_item.id == item.id"
            :item="item"
          ></list-panel-settings-access-rules>

        </div>
      </td>
    </template>

    <template #item.icon="{ item }">
      <v-icon
        size="20"
        class="ma-0"
        color="#7A788D"
      >{{icon}}
      </v-icon>
    </template>

    <template #item.name="{ item }">
      <v-btn
        _width="170"
        text
        color="#7A788D"
        class="btn-node-location text-left"
        style="text-transform: none; padding: 0 !important; min-width: 10px;"
        nuxt
        @click="name_item_click(item.id)"
      >
        <div
          class="text-left"
          style="display: block; height: 36px !important; padding-top: 4px; overflow: hidden; text-overflow: ellipsis; max-width: 170px;"
        >
          <p
            class="font-weight-black"
            style="height: 14px; line-height: 14px; margin: 0; padding: 0;"
          >
            {{item.name}}
          </p>
          <p
            class="text-left"
            style="height: 14px; line-height: 14px; margin: 0; padding: 0; padding-top: 6px; font-size: 10px; color: #7A788D; opacity: 0.7;"
          >
            {{item.address || item.description || '&mdash;'}}
          </p>
        </div>
      </v-btn>
    </template>

    <template #item.status="{ item }">
      <v-icon
        v-if="item_status.type == 'status_toggle' && !status_loading[item.id]"
        size="30"
        :color="item.status ? '#7A920A' : '#444351'"
        _color="#444351"
        class="mr-6"
        @click="toggle_status(item)"
      >{{item.status ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off-outline'}}
      </v-icon>
      <v-progress-circular
        v-if="item_status.type == 'status_toggle' && status_loading[item.id]"
        :size="20"
        :width="2"
        indeterminate
        color="#7A920A"
      ></v-progress-circular>
    </template>

    <template #item.action="{ item }">
      <div class="d-flex flex-row">

        <v-btn
          v-for="(v, k) in item_action"
          :key="k"
          nuxt
          :to="(v.link && v.link(item)) || ''"
          @click="() => (v.action && item_action_fn(v.action, item)) || (v.fn && v.fn(item)) || (v.panel && show_panel(v.panel, item)) || ''"
          icon
          class="ml-3"
          :style="[v.panel && (panel.type == v.panel.type) && 'background-color: #333 !important;']"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                :color="v.color || '#7A788D'"
                _color="#444351"
                v-on="on"
              >{{v.icon}}
              </v-icon>
            </template>
            <span>{{v.name}}</span>
          </v-tooltip>

          <!-- <v-icon
              :color="v.color || '#7A788D'"
              _color="#444351"
              >{{v.icon}}</v-icon> -->
        </v-btn>

        <v-btn
          v-if="item_action_menu && item_action_menu.length > 0"
          @click="e => show_mwnu(e, item)"
          icon
          class="ml-3"
        >
          <v-icon
            color="#444351"
          >mdi-dots-vertical
          </v-icon>
        </v-btn>

      </div>
    </template>

  </v-data-table>
</template>

<script>
  import ListPanelSettingsAccessRules from '~/components/data/list/panel/settings-access-rules';

  import moment from 'moment'
  import _ from 'lodash'
  import $ from 'jquery'

  import {mapState, mapGetters, mapAllGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'list-base',

    props: [
      'type',
      'data_model',
      'name_single',
      'name_plural',
      'headers',
      'items',
      'item_status',
      'item_action',
      'item_action_menu',
      'panel_manage',
      'panel_delete',
      'icon',
      'search',
      'link',
      'link_fn',
    ],

    data() {
      return {

        panel: {},
        panel_item: {},
        expanded: [],
        status_loading: {},

        menu_item: {},
        menu_show_condition: {},
        menu_current_item: null,
        menu_status: false,
        menu_pos_x: 0,
        menu_pos_y: 0,

        update_interval: 0,

      }
    },

    methods: {
      show_mwnu(e, item) {
        e.preventDefault()
        this.menu_current_item = item;
        this.menu_status = false
        this.menu_pos_x = e.clientX - 160
        this.menu_pos_y = e.clientY
        this.$nextTick(() => {
          this.menu_item = item
          this.menu_status = true
        })
      },

      show_panel(panel, item) {

        if (panel.type == this.panel.type && item.id == this.panel_item.id) {
          this.panel = {}
          this.panel_item = {}
          this.expanded = []
          return
        }

        if (item.id != this.panel_item.id) {
          this.panel = {}
          this.panel_item = {}
          this.expanded = []
        }

        this.$nextTick(() => {
          this.panel = panel
          this.panel_item = item
          this.expanded = [
            {id: item.id}
          ]
        })
      },

      async toggle_status(item) {
        // this.status_loading[item.id] = true

        let rs = await this.$store.dispatch(`${this.data_model}/replace`, {
          id: item.id,
          data: {
            status: item.status ? 0 : 1,
          },
        })
        await this.$store.dispatch(`${this.data_model}/fetchList`);

      },
      // item actions
      item_action_fn(action, item) {
        if (action == 'manage') {
          this.panel_manage.show_update(item)
        }
        if (action == 'delete') {
          this.panel_delete.show(item)
        }
      },

      // click on name {Tair}
      name_item_click(id) {
        if (this.link) {
          this.$router.push(`/${this.link}/${id}`);
        } else if (this.link_fn) {
          this.$router.push(this.link_fn(id));
        }
      },

      // Проверяем надо ли создавать кнопку меню {Tair}
      check_menu_item(check) {
        if (check && this.menu_current_item) {
          if (typeof check.name == 'string') {
            return this.menu_current_item[check.name] == check.value;
          }
        } else {
          return true;
        }
      }
    },

    computed: {
      // ..
    },

    mounted() {
      //
    },

    beforeDestroy() {
      clearInterval(this.update_interval)
    },

    components: {
      ListPanelSettingsAccessRules,
    },
  }
</script>

<style>
  /* data table styles */


  .list-expand-boby {
    padding: 20px 10px;
    /* border-left: 6px solid #6D7768 !important; */
  }


  .v-data-table__wrapper {
    overflow: hidden !important;
  }

  .v-data-table__wrapper thead {
    color: #7A788D !important;
    background: #2B2B35 !important;
  }

  .v-data-table__wrapper thead th {
    height: auto !important;
    /* padding: 10px 0 !important; */
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    color: #7A788D !important;
  }

  .v-data-table__wrapper tbody td {
    height: 60px !important;
    color: #7A788D !important;
  }


  .v-data-table__wrapper tbody td:first-child {
    border-left: 6px solid #650262 !important;
  }

  .list-locations .v-data-table__wrapper tbody td:first-child {
    border-left: 6px solid #650262 !important;
  }

  .list-hubs .v-data-table__wrapper tbody td:first-child {
    border-left: 6px solid #3C442C !important;
  }

  .list-devices .v-data-table__wrapper tbody td:first-child {
    border-left: 6px solid #980000 !important;
  }


  .v-data-table__wrapper tbody tr:not(.v-data-table__expanded__content):hover td:first-child {
    border-left: 6px solid #7A920A !important;
  }


  .v-data-table__wrapper tr.v-data-table__expanded__content td:first-child {
    border-left: 6px solid #6D7768 !important;
  }


  .list-devices .v-data-table__expanded tbody td:first-child {
    border-left: 6px solid #5D6857 !important;
  }

  .v-data-table__wrapper tbody tr:not(.v-data-table__expanded__content):hover {
    color: #7A788D !important;
    background: #24242C !important;
  }

  .btn-node-location .v-btn__content {
    /* height: 40px !important; */
    justify-content: start !important;
  }

</style>
