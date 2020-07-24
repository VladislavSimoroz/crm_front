export default function() {
    const rules = {}
    
    rules.required = [
        v => !!v || 'Обязательное поле',
    ]

    rules.required_zero_plus = [
        v => (v === 0 || v === '0' || v > 0) || 'Обязательное поле',
    ]

    rules.password = [
        v => !!v || 'Обязательное поле',
        v => (v || '').length > 6 ||
            `Минимум 6 символов`,
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
}

