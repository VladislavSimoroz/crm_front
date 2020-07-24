<template>
  <div>
    <v-card
      class="mt-4 pa-6"
      style="min-height: 500px; max-width: 100%; color: #7A788D !important; background: #1F1F29;"
    >
      <v-row no-gutters>
        <v-col>
          <p class="ma-0">Тарифный план</p>
          <p class="ma-0 mt-2 white--text font-weight-bold" >{{ company_data.tariffplan ? company_data.tariffplan.name : '&mdash;' }}</p>
          <p class="ma-0 mt-1 white--text font-weight-light" style="font-size: 12px;"></p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Действует</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">
            С {{ company_data.date_start_tariff ? company_data.date_start_tariff.slice(0,10) : '&mdash;' }}
            по {{ company_data.date_end_tariff ? company_data.date_end_tariff.slice(0,10) : '&mdash;'  }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Цена тарифа</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">{{ company_data.tariffplan ? company_data.tariffplan.price : '&mdash;' }} $</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Денег на счету</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">{{ company_data.credits ? company_data.credits : '&mdash;' }} $</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Обектов</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">
            Использовано {{ company_data.used ? company_data.used.loacation : '&mdash;' }}
            C {{ company_data.tariffplan ? company_data.tariffplan.max_locations : '&mdash;' }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Устройств</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">
            Использовано {{ company_data.used ? company_data.used.devices : '&mdash;' }}
            C {{ company_data.tariffplan ? company_data.tariffplan.max_devices : '&mdash;' }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="ma-0">Юзеров</p>
          <p class="ma-0 mt-2 white--text font-weight-bold">
            Использовано {{ company_data.used ? company_data.used.users : '&mdash;' }}
            C {{ company_data.tariffplan ? company_data.tariffplan.max_users : '&mdash;' }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          v-if="btn"
          width="140"
          _:loading="form_data_node_loading"
          outlined
          color=""
          class="mt-6"
          nuxt
          to="/settings/billing"
        >
          Детально
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props:[
    'company_data',
    'btn'
  ],
}
</script>
