export default function({ store,route }) {
  let route_now = route.name.split('-')[0]
  let store_menu = store.$app_config.menu_config
  
  let acsess = false
  
  store_menu.filter((items) => {
    
    if (typeof (items) === 'object' ){
      items.filter((item) => {
        if (item.to.split('/')[1] === route_now && item.access === true) {
          acsess = true;
        }
      })
    }
  })
  
  console.log("middleware", acsess);
}