export const state = () => ({
  menu_config: {
    item: [
      // [
      //   {
      //     icon: 'mdi-home-roof',
      //     title: 'Консоль',
      //     to: '/home',
      //     access: false,
      //   },
      //   {
      //     icon: 'mdi-map-marker',
      //     title: 'Обьекты',
      //     to: '/locations',
      //     access: false,
      //   },
      // ], [
      //   {
      //     icon: 'mdi-apps',
      //     title: 'Экраны',
      //     to: '/panels',
      //     access: false,
      //   },
      //   {
      //     icon: 'mdi-chart-timeline-variant',
      //     title: 'Аналитика',
      //     to: '/analytics',
      //     access: false,
      //   },
      // ],
      [
        {
          icon: 'mdi-account-multiple',
          title: 'Пользователи',
          to: '/users',
          badge_color: 'primary',
          access: false,
        },
        // {
        //   icon: 'mdi-account-details-outline',
        //   title: 'Логирование',
        //   to: '/userlog',
        //   access: false,
        // },
        {
          icon: 'mdi-dock-left',
          title: 'Настройки',
          to: '/settings/account',
          access: false,
        },
        // {
        //   icon: 'mdi-code-brackets',
        //   title: 'Отладка',
        //   to: '/debugging',
        //   access: false,
        // },
        // {
        //   icon: 'mdi-android-messages',
        //   title: 'Сообщения',
        //   to: '/messages',
        //   access: false,
        // },
      ]
    ]
  }
})

export const getters = {
  getAllMenu(state) {
    return state.menu_config.item;
  }
}

export const actions = {
  async updateMenu(state){
    await state.dispatch('data/app_config/fetchList',{},{root:true});
    let menu = state.rootGetters['data/app_config/list'];
    state.commit('changeMenu',menu)
  }
}

export const mutations  ={
  changeMenu (state,menu) {
    state.menu_config.item.filter((items) => {
      if (typeof (items) === 'object' ){
        items.filter((item) => {
          menu.forEach((e) => {
            if (item.to.split('/')[1] === e.route.split('/')[1]) {
              item.access = true
            }
          })
        })
      }
    })
  },
}