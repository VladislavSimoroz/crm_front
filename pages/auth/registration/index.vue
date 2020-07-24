<template>
    <div
        class="d-flex justify-center align-center py-10"
        style="height: 100%;"
        >

            <div
                style="width: 450px;"
                >

                <v-card
                    elevation="4"
                    class="d-flex flex-column justify-center _align-center px-4 py-6 pt-8"
                    style="background: #1F1F29;"
                    >

                    <img width="160" class="ma-auto" src="/panel/logo/Advisor_logo_horizontal-04.png"/>

                    <!-- <p class="text-center headline grey--text">Message Hub</p> -->
                    <!-- <p class="text-center">
                        Регистрация акаунта
                    </p> -->

                    <v-form
                        v-model="auth_registration_form_valid"
                        ref="auth_registration_form"
                        :lazy-validation="false"
                        @submit.prevent
                        class="mt-6"
                        >
                        <v-text-field
                            v-model="registration.name"
                            :rules="validation_rules.required"
                            dense
                            outlined
                            label="Ваше имя"
                            class="mt-4"
                            required
                            ></v-text-field>

                        <v-text-field
                            v-model="registration.company_name"
                            :rules="validation_rules.required"
                            dense
                            outlined
                            label="Компания"
                            required
                            ></v-text-field>

                        <v-divider class="mb-6"></v-divider>

                        <v-text-field
                            v-model="registration.username"
                            :rules="validation_rules.email"
                            dense
                            outlined
                            label="Email"
                            class="mt-4"
                            required
                            ></v-text-field>

                        <v-text-field
                            v-model="registration.password"
                            dense
                            outlined
                            label="Пароль"
                            :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="validation_rules.required"
                            :type="is_show_pass ? 'text' : 'password'"
                            @click:append="is_show_pass = !is_show_pass"
                            required
                            ></v-text-field>

                        <v-text-field
                            v-model="registration.password_confirm"
                            dense
                            outlined
                            label="Повторите пароль"
                            :rules="validation_rules.password_confirm"
                            :type="is_show_pass ? 'text' : 'password'"
                            required
                            ></v-text-field>

                        <v-divider></v-divider>

                    </v-form>

                    <v-btn
                        outlined
                        tile
                        class="mt-8 mb-2 mx-10"
                        _click="auth"
                        _disabled
                        @click="auth_registration"
                        >
                        Создать аккаунт
                    </v-btn>

                    <v-btn
                        text
                        width="200"
                        x-small
                        class="mt-1 ma-auto"
                        >Забыли пароль?</v-btn>

                    <v-divider class="mt-6 mb-3"></v-divider>

                    <p
                        class="mb-0 mt-4 text-center"
                        style="color: #767489;"
                        >
                        Уже есть аккаунт?
                    </p>

                    <v-btn
                        text
                        width="200"
                        class="mt-1 ma-auto"
                        nuxt
                        to="/auth/login"
                        >Войти</v-btn>

                </v-card>

                <p class="mt-4" style="font-size: 14px; color: #767489; text-align: center;">
                    support@advisor.ua
                </p>
            </div>

            <v-snackbar
                v-model="is_notify"
                color="#1F1F29"
                _left="x === 'left'"
                :timeout="3000"
                top="top"
                _vertical="mode === 'vertical'"
                _style=""
                >
                {{is_notify_message}}
                <v-btn
                    dark
                    text
                    @click="is_notify = false"
                    >
                    OK
                </v-btn>
            </v-snackbar>

    </div>
</template>

<script>
export default {
    layout: 'auth',

    // ..
    auth: false,

    data: () => ({

        // registration data
        auth_registration_form_valid: false,
        registration: {
            name: '',
            company_name: '',
            username: '',
            password: '',
            password_confirm: '',
        },

        // settings
        is_show_pass: false,
        is_notify: false,
        is_notify_message: '',

    }),

    methods: {
        async auth_registration() {
            if (!this.$refs.auth_registration_form.validate()) {
                return
            }

            let rs = {};
            try {
                // TODO set default tariff plan
                this.registration.tariff_plan_id = 1

                rs = await this.$axios.post('api/auth/register', this.registration)
            } catch(er) {
                // TODO catch errors
            }

            console.log("REGISTRATION RS: ", this.registration, rs)

            if(!rs.data.success) {
                this.is_notify = true
                this.is_notify_message = rs.data.message + " " + rs.data.data
                return
            }

            try {
                if(rs.data && rs.data.success) {
                    let auth = await this.$auth.loginWith('local', {
                        data: {
                            username: this.registration.username,
                            password: this.registration.password
                        }
                    })

                    this.$router.push({
                        path: '/home'
                    })

                    console.log("auth", auth)
                }
            }
            catch(er) {
                // TODO catch errors
            }

        }
    },

    computed: {

        // input validation
        validation_rules () {
            const rules = {};

            rules.required = [
                v => !!v || 'Обязательное поле',
            ]

            rules.password = [
                v => !!v || 'Обязательное поле',
                v => (v || '').length > 6 ||
                `Минимум 6 символов`,
            ]

            rules.password_confirm = [
                v => (!!v && v) === this.registration.password ||
                'Пароли не совпадают',
            ]

            rules.email = [
                v => !!v || 'Обязательное поле',
                v => /.+@.+\..+/.test(v) || 'Неправильный email',
            ]

            rules.max_len =
                v => (v || '').length <= this.max ||
                `A maximum of ${this.max} characters is allowed`

            rules.no_spaces =
                v => (v || '').indexOf(' ') < 0 ||
                'No spaces are allowed'

            return rules
        },

    },

    components: {
        // ..
    },
}
</script>

<style></style>
