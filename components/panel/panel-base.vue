<template>
    <v-dialog
        v-model="panel_active"
        max-width="500px"
        >
        <v-card
            outlined
            class="px-4 py-4"
            style="background: #1F1F29;"
            >
            <p class="subtitle-1 white--text">
                <v-icon
                    v-if="panel.head_icon"
                    class="mr-4"
                    >
                    {{panel.head_icon}}
                </v-icon>
                <span>{{panel.head_title}}</span>
            </p>

            <v-divider class="my-4 mt-2 mb-8"></v-divider>

            <slot name="body"></slot>

            <v-card-actions class="mt-8 pa-0">
                <v-spacer></v-spacer>
                <v-btn
                    tile
                    outlined
                    color="white"
                    _color="blue darken-1"
                    text
                    @click="(panel.fn_hide && panel.fn_hide.action) ? panel.fn_hide.action() : (panel_active = false)"
                    class="px-4"
                    >
                    {{panel.fn_hide && panel.fn_hide.name || 'CLOSE'}}
                </v-btn>
                <v-btn
                    v-if="panel.fn_action"
                    tile
                    outlined
                    color="red"
                    _color="green darken-1"
                    text
                    class="ml-6 px-4"
                    :loading="fn_action_loading"
                    @click="fn_action()"
                    >
                    {{panel.fn_action.name || 'ACTION'}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'panel-base',

    props: [
        'value',
        'panel'
    ],

    data: () => ({
        fn_action_loading: false,
    }),

    computed: {
        panel_active: {
            get: function() {
                return this.value;
            },
            set: function(v) {
                this.$emit('input', v)
            },
        },
    },

    methods: {
        fn_action: function() {
            if(this.panel.fn_action) {
                if(this.panel.fn_action.loading) {
                    this.fn_action_loading = true;
                }
                if(this.panel.fn_action.verify && !this.panel.fn_action.verify()) {
                    this.fn_action_loading = false;
                    return
                }
                if(this.panel.fn_action.action) {
                    this.panel.fn_action.action();
                }

                let to = 1000;
                if(this.panel.fn_action.save_timeout) {
                    to = this.panel.fn_action.save_timeout;
                }
                setTimeout(() => {
                    this.fn_action_loading = false;
                    this.panel_active = false;
                }, to);
            }
            // setTimeout(() => {panel.fn_action.action ? panel.fn_action.action() : ''}, 3000)
        },
    },
}
</script>
