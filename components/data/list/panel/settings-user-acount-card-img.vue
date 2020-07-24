<template>
  <v-card
    class="mt-4 pa-6"
      style="min-height: 400px; color: #7A788D !important; background: #1F1F29;"
  >
    <div>
      <div style="overflow: hidden; min-height: 100px;">
        <img
          :src="user_image"
          style="margin: 0; padding: 0; max-width: 100%; border-radius:30px"
        />
      </div>
      <!-- <v-divider class="mt-6"></v-divider> -->
      <br>
      <div class="d-flex flex-row">
        <v-file-input
          ref="import_file"
          accept=".png,.jpg,.jpeg,.bmp"
          label="Изображение"
          outlined
          dense
          :loading="import_save_loading"
          @change="import_save_change"
        ></v-file-input>
        <v-btn
          width="140"
          :loading="import_save_loading"
          outlined
          color="red"
          class="ml-6"
          :disabled="disabled_buttom"
          @click="import_save_action"
          >
          Сохранить
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props:[
    'user_data',
    'user_image',
    'import_save_loading',
  ],

  data() {return {
    import_data_file : '',
    disabled_buttom: true,
  }},
  methods: {
    async import_save_action(){
      this.$emit('import_save_action',this.import_data_file)
    },
    import_save_change(file) {
      this.disabled_buttom = false
      this.import_data_file = file
    },
  },
}
</script>
