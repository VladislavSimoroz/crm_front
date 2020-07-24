<template>
  <v-row
    no-gutters
    justify="center"
    align="start"
  >
    <v-col>

      <slot name="head"></slot>

      <v-row
        justify="center"
        class="px-7"
      >
        <slot name="info"></slot>
      </v-row>

      <v-row
        justify="center"
        class="px-7"
      >

        <v-col
          cols="12"
        >
          <slot name="body"></slot>
        </v-col>

      </v-row>

      <slot name="panel"></slot>

    </v-col>
  </v-row>
</template>

<script>
  export default {
    // ..
  }
</script>
