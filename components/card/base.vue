<template>
    <v-card
        :class="class_data"
        style="color: #7A788D !important; background: #1F1F29;"
        :style="style_data"
        >
        <slot></slot>
    </v-card>
</template>

<script>
export default {
    name: 'card-base',

    props: [
        'class_data',
        'style_data',
    ],
}
</script>
