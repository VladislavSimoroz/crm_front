<template>
  <v-app>
<!--    <MessagesPopup-->
<!--      :messages="messages_popup"-->
<!--      :timeout="2000"-->
<!--    />-->
<!--    <SnackBar/>-->
    <Menu/>
    <NavBar
      :count_messages="count_messages"
    />
    <v-content
      fluid
      style="background-color: #24242C !important;"
    >
      <v-container
        fluid
        class="ma-0 pa-0"
      >
<!--        <MessagesStatic-->
<!--          :messages="messages_static"-->
<!--        />-->
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import SnackBar from '../components/layout/notifications'
  import NavBar from '~/components/layout/nav_bar'
  import Menu from '~/components/layout/menu'

  export default {
    data(){
      return {
        // messages_popup:[],
        // messages_static:[],
        // messages_timeout: 0,
        count_messages:0,
        // messages_bels:[],
      }
    },
    middleware: 'check-permission',
    methods: {
      // async getMessages() {
      //   await this.$store.dispatch('data/messages/fetchList')
      //   this.messages =this.$store.getters[`data/messages/list`]
      //   this.messages_bels = []
      //   this.messages_popup = []
      //   this.messages.filter((message)=>{
      //     if (message.is_static === 0 && !message.watch) {
      //       let has_mess_bels = false
      //       this.messages_bels.forEach(ms => {
      //         if (ms.id === message.id) {
      //           has_mess_bels = true
      //         }
      //       })
      //       if(!has_mess_bels ) {
      //         this.messages_bels.push(message)
      //       }
      //     }
      //   })
      //   this.messages.filter((message)=>{
      //     if (message.is_static === 0) {
      //       let has_mess = false
      //       this.messages_popup.forEach(ms => {
      //         if (ms.id === message.id) {
      //           has_mess = true
      //         }
      //       })
      //       if(!has_mess && message.watch_popup === false) {
      //         this.messages_popup.push(message)
      //       }
      //     }else{
      //       let has_mess_static = false
      //       this.messages_static.forEach(ms => {
      //         if (ms.id === message.id) {
      //           has_mess_static = true
      //         }
      //       })
      //       if(!has_mess_static && message.watch === false) {
      //         this.getDismissible(message)
      //         this.messages_static.push(message)
      //       }
      //     }
      //   })
      //   this.count_messages = this.messages_bels.length
      //   this.messages_timeout = setTimeout(this.getMessages,2000)
      // },
      // getDismissible(mess){
      //   switch (mess.can_close) {
      //     case 1:
      //       mess.dismissible = true
      //       break;
      //     case 0:
      //       mess.dismissible = false
      //       break;
      //     default:
      //       mess.dismissible = false
      //       break;
      //   }
      // },
    },
    mounted() {
      // this.getMessages()
    },
    beforeDestroy () {
      // clearInterval(this.messages_timeout)
    },
    components: {
      SnackBar,
      NavBar,
      Menu,
    },
  }
</script>

<style>
  .nav-active {
    background: none !important;
  }

  .nav-active::before {
    background: #2B2B35 !important;
  }

  .nav-active i.icon.v-icon {
    color: #fff !important;
    caret-color: #fff !important;
  }

  .nav-active .v-list-item__title {
    color: #ffffff !important;
    caret-color: #fff !important;
  }

  .node-list-search {
    border: none !important;
  }

  .node-list-search .v-input__control {
    height: 40px !important;
    margin: 0 !important;
    border: none !important;
  }

  .node-list-search i {
    color: #7A788D !important;
  }
</style>
