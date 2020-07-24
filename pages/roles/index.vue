<template>
    <div
        class="pa-6"
        >
        <v-card
            class="pa-6"
            style="min-height: 800px; color: #7A788D !important; background: #1F1F29;"
            >
            <p class="font-weight-bold">ROLES</p>
            
            <div
                class="d-flex align-center justify-center"
                >
                <p>
                    <v-icon
                        size="200"
                        color="#2D2C34"
                        class="my-10"
                        >mdi-account-cog-outline</v-icon>
                </p>
            </div>

        </v-card>
    </div>
</template>

<script>

export default {
    data: () => ({
        // ..
    }),

    methods: {
        // ..
    },

    mounted() {
        // switch active nodes
        this.$store.commit('layout/update_nodes', [
            'Права доступа',
        ])
    },

    components: {
        // ..
    },
}
</script>

<style>

/* ... */

</style>
