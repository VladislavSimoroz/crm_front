<template>
  <v-navigation-drawer
    app
    v-model="drawer"
    :mini-variant="style_panel_left_minimal"
    mobile-break-point="1"
    mini-variant-width="75"
    class="elevation-0"
    style="background: #1F1F29; border: none !important; box-shadow: none !important;"
  >
    <div
      v-if="style_panel_left_minimal"
      class="d-flex align-center justify-center px-4"
      style="height: 63px;"
    >
      <img
        src="/page/logo_04.png"
        style="width: 30px !important; max-width: 30px !important;"
      />
    </div>

    <div
      v-if="!style_panel_left_minimal"
      class="d-flex align-center justify-start px-4"
      style="height: 63px;"
    >
      <img
        src="/page/logo_horizontal_04.png"
        style="height: 20px !important; max-height: 20px !important;"
      />
      <v-btn
        icon
        class="ml-auto"
        color="#aaa"
        @click.stop="style_panel_left_minimal = !style_panel_left_minimal"
      >
        <v-icon
          size="28"
        >{{ `${style_panel_left_minimal ? 'mdi-menu' : 'mdi-chevron-left'}` }}
        </v-icon>
      </v-btn>
    </div>

    <v-divider
      color="#21212B"
      class="mx-0"
    ></v-divider>

    <div
      v-if="style_panel_left_minimal"
      class="d-flex align-center justify-start px-4"
      style="height: 100px;"
    >
      <v-btn
        icon
        class="mx-auto"
        color="#aaa"
        @click.stop="style_panel_left_minimal = !style_panel_left_minimal"
      >
        <v-icon
          size="28"
        >{{ `${style_panel_left_minimal ? 'mdi-menu' : 'mdi-chevron-left'}` }}
        </v-icon>
      </v-btn>
    </div>

<!--    <div--><!--      v-if="!style_panel_left_minimal"-->
<!--      class="d-flex flex-column align-start justify-center px-4"-->
<!--      style="height: 130px;"-->
<!--    >-->
<!--      <p-->
<!--        class="ma-0"-->
<!--        style="font-size: 18px; font-weight: bold; color: #eee;"-->
<!--      >Тарифный план</p>-->
<!--      <p-->
<!--        class="ma-0"-->
<!--        style="font-size: 12px; font-weight: bold; color: #ddd;"-->
<!--      >-->
<!--        <span style="color: #757484;">Подписка</span>-->
<!--        <span style="color: #727E3C;">aктивна</span>-->
<!--      </p>-->
<!--    </div>-->

    <v-divider
      color="#21212B"
      class="mx-0"
    ></v-divider>

    <div
      v-for="(list, li) in menu"
      :key="li"
    >
      <v-list>
        <v-list-item-group
          v-model="menu_active"
        >
          <v-list-item
            v-for="(item, i) in list"
            v-if="item.access"
            :key="i"
            nuxt
            :to="item.to"
            active-class="nav-active"
          >
            <template v-slot:default="{ active, toggle }">
              <v-tooltip
                right
                nudge-right
                transition="slide-x-reverse-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-list-item-action
                    v-on="on"
                  >
                    <v-badge
                      bordered
                      :color="item.badge ? item.badge_color : ''"
                      dot
                    >
                      <v-icon
                        color="#444351"
                        size="24"
                        class="icon"
                      >
                        {{ item.icon }}
                      </v-icon>
                    </v-badge>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title style="color: #636176; font-weight: bold; font-size: 14px;"
                                       v-text="item.title"/>
                  </v-list-item-content>
                </template>
                <span>{{ item.title }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider
        class="my-1 mx-2"></v-divider>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters , mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        style_panel_left_minimal: true,
        menu_active: 0,
        drawer: true,
        loading: false,
      }
    },
    methods: {
      ...mapActions({
        updateMenu: 'config/menu/updateMenu'
      })
    },
    mounted() {
      this.updateMenu()
    },
    computed: {
      ...mapGetters({
        menu: 'config/menu/getAllMenu'
      })
    }
  }
</script>