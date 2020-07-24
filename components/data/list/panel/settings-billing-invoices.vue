<template>
 <div>
    <v-card
      class="mt-4 pa-6"
      style="min-height: 100%; max-width: 100%; color: #7A788D !important; background: #1F1F29;"
    >
      <v-row no-gutters>
        <v-col>
          <p class="ma-0">Invoices</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="12">
          <v-data-table
            :headers="headers_has_role"
            :items="invoices_data"
            hide-default-footer
            _:sort-by.sync="sortBy"
            _:sort-desc.sync="sortDesc"
            class="elevation-1"
          >
            <template  v-slot:item.is_paid="{ item }">
               <v-icon  color="teal darken-2">{{ icon_boolean(item) }}</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>


<script>
export default {
  data: () => ({
    enabled: null,
    sortBy:'user_table_action_icon',
    dialog: false,
    sortDesc: false,
    headers_has_role: [
      { text: 'Компания', align: 'start', sortable: false, value: 'company.name' },
      { text: 'Сумма', value: 'amount' },
      { text: 'Дата', value: 'date_time' },
      { text: 'Способ оплаты', value: 'method' },
      { text: 'Тарифный план', value: 'tariffplan.name' },
      { text: 'Статус оплаты', value: 'is_paid' ,align: 'center' },
    ],
    invoices_data: [],
  }),
  methods: {
    async getData(){
        let response = await this.$axios.$get('api/billing_invoice')
        this.invoices_data = response.data
    },
    icon_boolean(item){
      console.log(item)
      if(item.is_paid == '1'){
        return 'mdi-checkbox-marked-circle-outline'
      }
      return 'mdi-close-circle-outline'
    }
  },
  mounted() {
    this.getData()
  },
}
</script>
