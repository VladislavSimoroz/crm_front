<template>
  <div>
    <v-row>
      <v-col md="3">
        <CompanyTariffCard
          :company_data="company_data"
          :btn="false"
        />
      </v-col>
      <v-col md="9">
        <BillingInvoices

        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CompanyTariffCard from '~/components/data/list/panel/settings-company-tariff';
import BillingInvoices from '~/components/data/list/panel/settings-billing-invoices';

export default {
  data() { return {
    company_data: {},
  }},
  methods: {
    async getData(){
        let company_id = this.$store.$auth.$state.user.company.id
        let response = await this.$axios.$get('api/company/'+company_id)
        this.company_data = response.data
    },
  },
  mounted() {
    this.getData()
  },
  components: {
    CompanyTariffCard,
    BillingInvoices,
  },
}
</script>
