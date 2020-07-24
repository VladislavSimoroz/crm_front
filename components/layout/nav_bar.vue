<template>
  <v-app-bar
    app
    flat
    fixed
    style="background: #1F1F29; border-bottom: 1px solid #383741;"
  >
    <span
      v-if="layout_nodes[0]"
      class="ml-4"
      style="color: #7A788D; font-weight: bold;"
    >
      {{layout_nodes[0]}}
    </span>

    <v-icon
      v-if="layout_nodes[1]"
      color="#7A788D"
    >
      mdi-chevron-right
    </v-icon>

    <span
      v-if="layout_nodes[1]"
      class="font-weight-black"
    >
      {{layout_nodes[1]}}
    </span>

    <v-icon
      v-if="layout_nodes[2]"
      color="#7A788D"
    >
      mdi-chevron-right
    </v-icon>

    <span
      v-if="layout_nodes[2]"
      class="font-weight-black"
      style="color: #7A788D; font-weight: bold;"
    >
      {{layout_nodes[2]}}
    </span>
    <v-spacer></v-spacer>
    <v-divider
      class="mx-1"
      vertical
    ></v-divider>

    <v-badge
      bordered
      bottom
      color="deep-purple accent-4"
      offset-x="20"
      offset-y="20"
      :content="count_messages"
      >
      <v-btn

        icon
        color="#444351"
        class="mx-2"
        nuxt
        to="/messages"
        >
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-badge>

<!--    <v-btn-->
<!--      v-if="this.$store.state.data.device_data.fail"-->
<!--      icon-->
<!--      color="red darken-1"-->
<!--      class="mx-2"-->
<!--      nuxt-->
<!--      to="/signals"-->
<!--    >-->
<!--      <v-icon>mdi-bell</v-icon>-->
<!--    </v-btn>-->

    <v-divider
      class="mx-1"
      vertical
    ></v-divider>

    <v-btn
      icon
      color="#444351"
      class="mx-2"
    >
      <v-icon>mdi-dots-horizontal</v-icon>
    </v-btn>

    <v-divider
      class="mx-1"
      vertical
    ></v-divider>

    <v-menu
      transition="slide-y-transition"
      bottom
      right
      :offset-y="true"
      content-class="elevation-1"
      style="background: #1F1F29 !important;"
    >
      <template v-slot:activator="{ on }">
        <v-card
          flat
          class="d-flex flex-columns align-center ma-0 pa-0 py-2 px-6 pr-2"
          v-on="on"
          style="background: #1F1F29 !important;"
        >
          <div class="mr-4">
            <v-icon
              size="36"
              color="#444351"
            >
              mdi-account-circle
            </v-icon>
          </div>
          <div class="mr-2" style="min-width: 120px;">
            <p
              class="ma-0 pa-0 white--text font-weight-bold"
              style="line-height: 10px !important; font-size: 14px; opacity: 0.7;"
            >
              {{$store.state.auth.user.name}}
            </p>
            <p
              class="ma-0 pa-0 mt-2 grey--text text--lighten-1 font-weight-bold"
              style="line-height: 10px !important; font-size: 12px; opacity: 0.5;"
            >
              {{$store.state.auth.user.company.name}}
            </p>
          </div>
          <div>
            <v-icon
              class="mr-2"
            >
              mdi-chevron-down
            </v-icon>
          </div>
        </v-card>
      </template>
      <v-list>
        <v-list-item
          v-for="(action, i) in account_menu"
          :key="i"
          dense
          @click="action.action"
        >
          <v-list-item-title>{{ action.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    props:[
      'count_messages'
    ],
    data: function () {
      return{
        account_menu: [
          {
            name: 'Account',
            action: () => {
              // ..
            }
          },
          {
            name: 'Logout',
            action: () => {
              this.auth_logout()
            }
          },
        ],
      }
    },
    methods: {
      async auth_logout() {
        this.$auth.logout()
      }
    },
    computed: {
      layout_nodes() {
        return this.$store.state.layout.nodes
      },
    },
  }
</script>
