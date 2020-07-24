<template>
    <panel-base
        v-model="__status"
        :panel="options"
        >
        <template v-slot:body>
            <v-form
                v-model="form_valid"
                ref="panel_manage_form"
                @submit.prevent
                >
                <v-text-field
                    v-model="item.name"
                    :rules="validation_rules.required"
                    outlined
                    dense
                    label="Название Тега"
                    required
                    class="mb-1"
                    ></v-text-field>
            </v-form>
        </template>
    </panel-base>
</template>

<script>
import PanelBase from '../panel-base'
import ValidationRules from '~/plugins/validation';

export default {
    name: 'panel-action-base',

    props: [
        'status',
    ],

    data() { return {

        validation_rules: ValidationRules,

        // ..

        options: {
            head_title: '',
            head_icon: 'mdi-map-marker',

            fn_action: {
                name: '',
                loading: true,
                verify: () => {
                    // if (this.$refs.panel_manage_form.validate()) {
                    //     return true;
                    // }
                    // return false;
                },
                action: async () => {
                    // if(this.insert) {
                        // let rs = await this.$axios({
                        //     method: 'post',
                        //     url: `/api/tags/location`,
                        //     // url: `/api/tags/location/${this.data_node.id}`,
                        //     data: this.panel_manage.item,
                        // })

                        // rs = await this.$axios.get(`/api/tags/location`, {})
                        // if(rs.data && rs.data.data && rs.data.data.length > 0) {
                        //     this.data_tags_list = rs.data.data
                        // }

                        // let rs = await this.$axios.put(`/api/tags/location/${this.data_node.id}`, {
                        //     name: this.data_node.name,
                        //     // location_id: this.data_node.id,
                        // })

                        // await this.data_action_list()
                    // } else {
                        // ..
                    // }
                },
            },
            fn_hide: {
                name: 'Отмена',
                action: () => {
                    this.__status = false;
                },
            },
        },

        item: {},
        item_index: 0,
        insert: false,
        
        form_valid: false,
        show_pass: false,

        show_update: (item) => {
            this.__status = true;
            this.options.head_title = 'Редактировать Тег';
            this.options.fn_action.name = 'Сохранить';
            this.item = Object.assign({}, item);
            this.item_index = this.list.indexOf(item);
            this.insert = false;
        },

        show_create: () => {
            this.__status = true;
            this.options.head_title = 'Добавить Тег';
            this.options.fn_action.name = 'Добавить';
            this.item = {};
            this.item_index = 0;
            this.insert = true;
        },

    }},

    computed: {
        __status: {
            get: function() {
                return this.status;
            },
            set: function(v) {
                this.$emit('status', v)
            },
        },
    },

    methods: {
        // ..
    },

    components: {
        PanelBase,
    },
}
</script>
