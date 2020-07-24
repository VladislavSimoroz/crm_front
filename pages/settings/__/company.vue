<template>
  <div>
      <v-row>
        <v-col md="3">
          <UsersAccountCardImg
            :user_image="user_image"
            :user_data="user_data"
            :import_save_loading="import_save_loading"
            @import_save_action="import_save_action"
          />
        </v-col>
        <v-col md="4">
          <CompanyTariffCard
          :company_data="user_data"
          :btn="true"
          />
        </v-col>
        <v-col md="5">
          <CompanyCard
          :user_data="user_data"
          :form_data_node_loading="form_data_node_loading"
          @data_update="data_update"
          />
        </v-col>
      </v-row>
  </div>
</template>


<script>
import CompanyCard from '~/components/data/list/panel/settings-company-card';
import CompanyTariffCard from '~/components/data/list/panel/settings-company-tariff';
import UsersAccountCardImg from '~/components/data/list/panel/settings-user-acount-card-img';


export default {
  data() { return {
    user_data: {},
    user_image: '',
    import_save_loading: false,
    import_data_file: '',
    form_data_node_loading: false,
  }},
  methods: {
    async getData(){
        let company_id = this.$store.$auth.$state.user.company.id
        let response = await this.$axios.$get('api/company/'+company_id)
        this.user_data = response.data
        // console.log(response.data.fs.length)
        if(response.data && response.data.fs.length > 0 && response.data.fs[0]["dir"]) {
          this.user_image = this.$env('SERVER_BASE') + 'storage/' +  response.data.fs[0].dir
        }else{
          this.user_image = '/files/avatar_default.jpg'
        }
    },
    async import_save_action(import_data_file){
      this.import_save_loading = true;
      this.import_data_file = import_data_file

      let formData = new FormData();
      formData.append('file', this.import_data_file);
      let rs = await this.$axios.post(`/api/company/${this.user_data.id}/img`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((rs) => {
          var data = rs.data.data[0];
          if(data  && data["dir"]) {
            this.user_image = this.$env('SERVER_BASE') + 'storage/' + data.dir
          }else{
            this.user_image = this.$env('SERVER_BASE') + 'storage/' + rs.data.data.dir
          }
        }).catch(function(e) {
          console.log("== == !! UPLOAD FAIL", e);
          return
        });

      this.import_save_loading = false;
    },
    async data_update(){
      this.form_data_node_loading = true
      setTimeout(() => {
        this.form_data_node_loading = false
      }, 1000)
      let rs = await this.$axios.put(`/api/company/${this.user_data.id}`, this.user_data, {
      })
    }
  },
  mounted() {
    this.getData()
  },
  components: {
    CompanyCard,
    UsersAccountCardImg,
    CompanyTariffCard,
  },
}
</script>
