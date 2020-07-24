export default function (ctx, inject) {
  let config = {
    menu_config: ctx.store.getters["config/menu/getAllMenu"]
  }
  
  ctx.store.dispatch(`data/app_config/fetchList`)
  // console.log('state',ctx.store.getters)
  
  inject('app_config', config)
}