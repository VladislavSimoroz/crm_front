import {createCRUD} from '~/plugins/crud';

const crudModule = createCRUD({
  resource: 'app_config',
  parseList(response) {
    const { data } = response;
    return Object.assign({}, response, {
      data: data.data.menu_config.item
    });
  },
});

const state = () => crudModule.state;
const { actions, mutations, getters } = crudModule;

export {
    state,
    actions,
    mutations,
    getters
}
