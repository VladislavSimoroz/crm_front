<template>
    <div
        class="d-flex justify-center align-center py-10"
        style="height: 100%;"
        >

            <div
                style="width: 350px;"
                >

                <v-card
                    elevation="4"
                    class="d-flex flex-column justify-center _align-center px-4 py-6 pt-8"
                    style="background: #1F1F29;"
                    >

                    <img width="160" class="ma-auto" src="/panel/logo/Advisor_logo_horizontal-04.png"/>

                    <!-- <p class="text-center headline grey--text">Message Hub</p>
                    <p class="text-center grey--text text--darken-3">Enter your details to log into your account</p> -->

                    <v-form
                        v-model="auth_login_form_valid"
                        ref="auth_login_form"
                        class="mt-6"
                        :lazy-validation="false"
                        @submit.prevent="auth_login"
                        >
                        <v-text-field
                            v-model="email"
                            :rules="validation.email"
                            dense
                            outlined
                            label="Email"
                            class="mt-4"
                            required
                            ></v-text-field>

                        <v-text-field
                            v-model="password"
                            dense
                            outlined
                            label="Пароль"
                            :append-icon="is_show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="validation.required"
                            :type="is_show_pass ? 'text' : 'password'"
                            @click:append="is_show_pass = !is_show_pass"
                            required
                            ></v-text-field>

                        <div>
                            <v-btn
                                width="200"
                                outlined
                                tile
                                class="d-flex mt-2 mb-2 mx-auto"
                                _click="auth"
                                _disabled
                                type="submit"
                                @click="auth_login"
                                >
                                    Войти
                            </v-btn>                            
                        </div>
                    </v-form>

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
                        Еще не зарегистрировались?
                    </p>

                    <v-btn
                        text
                        width="200"
                        class="mt-1 ma-auto"
                        nuxt
                        to="/auth/registration"
                        >Регистрация</v-btn>

                </v-card>

                <p class="mt-4" style="font-size: 14px; color: #767489; text-align: center;">
                    support@advisorscada.com
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

    data: () => ({
        // auth data
        auth_login_form_valid: false,
        email: '',
        password: '',

        // settings
        is_show_pass: false,
        is_notify: false,
        is_notify_message: '',

        // data validation
        validation: {
            required: [
                v => !!v || 'Обязательное поле',
            ],
            email: [
                v => !!v || 'Обязательное поле',
            ],
        },
    }),

    methods: {
        async auth_login() {
            if (!this.$refs.auth_login_form.validate()) {
                return
            }

            this.$auth.loginWith('local', {
                data: {
                    grant_type : "password",
                    client_id : "1",
                    client_secret : "VTLtzGwj9MK1beK9I0DfcwYS37D51D7Wp7t7H6oj",
                    username: this.email,
                    password: this.password
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch((er) => {
                console.log(er);

                this.is_notify = true
                this.is_notify_message = "Ошибка авторизации"
            });

            // console.log("===", rs)
        }
    },

    mounted() {
        let is_cache = this.$store.state.data.locations && this.$store.state.data.locations.list && this.$store.state.data.locations.list.length > 0
        console.log('== == == LOGIN is_cache', is_cache)
        if(is_cache) {
            window.location.reload()
        }
    },

    components: {
        // ..
    },
}
</script>

<style></style>
