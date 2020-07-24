<template>
    <layout>
        <template v-slot:body>

            <div
                class="mt-3 py-4 pl-6"
                style="height: 70px; background: #1F1F29; border-radius: 6px;"
                >
                <v-btn
                    text
                    _color="#7A788D"
                    class="ma-0 elevation-0"
                    style="padding: 0; color: #7A788D; text-transform: none;"
                    nuxt
                    to="/users"
                    exact
                    >
                    <v-icon>mdi-chevron-left</v-icon>
                    <span class="ml-2">Назад</span>
                </v-btn>

                <v-btn
                    _text
                    _color="#7A788D"
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    _style="padding: 0; text-transform: none;"
                    exact
                    >
                    <v-icon>mdi-settings</v-icon>
                    <span class="ml-4">Настройки</span>
                </v-btn>
            </div>

            <br/>

            <v-card
                class="px-4 pb-6"
                style="background: #1F1F29; border-radius: 6px;"
                >

                <div
                    class="d-flex flex-row pa-4 py-3 pl-0"
                    style="border-bottom: 2px solid #4B4B54 !important;"
                    >

                    <span class="subtitle-1 font-weight-bold">Просмотр Аккаунта</span>

                </div>

                <v-form
                    v-model="form_data_node_valid"
                    ref="auth_login_form"
                    :lazy-validation="false"
                    @submit.prevent
                    class="mt-6"
                    >
                    <v-text-field
                        v-model="data_node.name"
                        _rules="validation.email"
                        dense
                        outlined
                        label="Имя"
                        class="mt-8"
                        required
                        ></v-text-field>

                    <v-text-field
                        v-model="data_node.email"
                        _rules="validation.email"
                        dense
                        outlined
                        label="Email"
                        class="mt-2"
                        required
                        ></v-text-field>

                    <v-text-field
                        v-model="data_node.position"
                        _rules="validation.email"
                        dense
                        outlined
                        label="Должность"
                        class="mt-2"
                        required
                        ></v-text-field>

                    <v-divider></v-divider>

                    <v-btn
                        width="140"
                        outlined
                        color="red"
                        class="mt-6"
                        >
                        Сохранить
                    </v-btn>

                </v-form>
            </v-card>

        </template>
    </layout>
</template>

<script>
import Layout from '~/components/layout/nodes.view';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'

// data models
const data_model = 'data/users'

export default {
    async fetch({ store, route }) {
        await store.dispatch(`${data_model}/fetchSingle`, {
            id: route.params._
        })
    },

    data: () => ({
        // data node valid
        form_data_node_valid: false,
    }),

    methods: {
        ...mapActions(data_model, {
            data_node_fetch: 'fetchSingle',
            data_node_update: 'update'
        }),
        // ..
    },

    computed: {
        ...mapGetters(data_model, {
            data_node_rq: 'byId'
        }),

        data_node: {
            get() {
                return JSON.parse(JSON.stringify(this.data_node_rq(this.$route.params._)))
                // return this.data_node_rq(this.$route.params._);
            },
            set() {
                // ..
            },
        }
    },

    mounted() {
        // switch active nodes
        this.$store.commit('layout/update_nodes', [
            'Аккаунты',
            // this.data_node.name,
        ])
    },

    components: {
        Layout,
    },
}
</script>

<style>

/* ... */

</style>
