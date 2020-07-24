<template>
    <layout>
        <template v-slot:body>
            <div
                class="mt-3 py-4 pl-6"
                style="height: 70px; background: #1F1F29; border-radius: 6px;"
                >
                <v-btn
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    nuxt
                    :to="`/settings/account`"
                    exact
                    >
                    <v-icon>mdi-account</v-icon>
                    <span class="ml-4">Акаунт</span>
                </v-btn>
                <v-btn
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    nuxt
                    :to="`/settings/permissions`"
                    exact
                    >
                    <v-icon>mdi-account-supervisor</v-icon>
                    <span class="ml-4">Права доступа</span>
                </v-btn>
                <v-btn
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    nuxt
                    :to="`/settings/basic`"
                    exact
                    >
                    <v-icon>mdi-eye-settings-outline</v-icon>
                    <span class="ml-4">Основные</span>
                </v-btn>
                <v-btn
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    nuxt
                    :to="`/settings/billing`"
                    exact
                    >
                    <v-icon>mdi-credit-card-settings-outline</v-icon>
                    <span class="ml-4">Биллинг</span>
                </v-btn>
                <v-btn
                    class="ml-6 elevation-0"
                    style="color: #7A788D; text-transform: none; background: none;"
                    nuxt
                    :to="`/settings/company`"
                    exact
                    >
                    <v-icon>mdi-home-edit-outline</v-icon>
                    <span class="ml-4">Настройки компании</span>
                </v-btn>
            </div>
            <nuxt-child />
        </template>
    </layout>
</template>

<script>
import Layout from '~/components/layout/nodes.list';

export default {
    data: () => ({
        // ..
    }),

    watch: {
        // ..
    },

    methods: {
        // ..
    },

    components: {
        Layout,
    },

    mounted() {
        // ..
    },
}
</script>