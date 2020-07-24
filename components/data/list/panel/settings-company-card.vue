<template>
  <div>
    <v-card
      class="mt-4 pa-6"
      style="min-height: 500px; max-width: 100%; color: #7A788D !important; background: #1F1F29;"
    >
      <p
        class="mt-6 subtitle-1 font-weight-black"
      >Пользователь</p>
      <v-form
        v-model="form_data_node_valid"
        ref="auth_login_form"
        :lazy-validation="false"
        @submit.prevent
        class="mt-6"
        style="max-width: 100%;"
      >
        <v-text-field
          v-model="user_data.name"
          :rules="validation_rules.required"
          dense
          outlined
          label="Имя"
          class="mt-0"
          required
          @change="cheange_disabled_buttom()"
        ></v-text-field>
        <v-text-field
          v-model="user_data.address"
          dense
          outlined
          label="Адрес"
          class="mt-0"
          @change="cheange_disabled_buttom()"
        ></v-text-field>
        <v-text-field
          v-model="user_data.email"
          dense
          outlined
          label="Почта"
          class="mt-0"
          @change="cheange_disabled_buttom()"
        ></v-text-field>
        <v-text-field
          v-model="user_data.phone"
          dense
          outlined
          label="Телефон"
          class="mt-0"
          @change="cheange_disabled_buttom()"
        ></v-text-field>
        <v-text-field
          v-model="user_data.website"
          dense
          outlined
          label="Сайт"
          class="mt-0"
        ></v-text-field>
        <v-btn
          width="140"
          :loading="form_data_node_loading"
          outlined
          color="red"
          class="mt-6"
          @click="data_update"
          :disabled="disabled_buttom"
          >
          Сохранить
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import validation_rules_conf from '~/plugins/validation';

export default {
  props:[
    'user_data',
    'form_data_node_loading'
  ],
  data() {return {
    form_data_node_valid: false,
    disabled_buttom: true,
  }},

  methods: {
    async data_update() {
      this.disabled_buttom = true
      this.$emit('data_update')
    },
    cheange_disabled_buttom(){
      this.disabled_buttom = false
    },
  },

  computed: {
    validation_rules() {
      return validation_rules_conf()
    },
  },
}
</script>
