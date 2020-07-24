import {createCRUD} from '~/plugins/crud';

const crudModule = createCRUD({
    resource: 'users',
    actions: {
        async change_code(context, data) {
            let rs = await this.$axios.post(`/api/device/change_code/${data.id}`, data);
            if (rs.data && rs.data.success) {
                return rs.data.data;
            } else {
                console.error(rs.data)
            }
        }
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
