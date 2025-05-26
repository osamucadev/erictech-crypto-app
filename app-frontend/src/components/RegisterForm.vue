<template>
    <div class="register-container">
        <div class="register-card">
            <h1>{{ $t('register.title') }}</h1>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <input type="text" id="name" v-model="form.name" required :placeholder="$t('register.name')"
                        class="input-field" />
                </div>

                <div class="form-group">
                    <input type="email" id="email" v-model="form.email" required :placeholder="$t('register.email')"
                        class="input-field" :class="{ 'input-error': !isEmailValid && form.email }" />
                    <span v-if="!isEmailValid && form.email" class="error-text">
                        {{ $t('register.errors.invalidEmail') }}
                    </span>
                </div>

                <div class="form-group">
                    <input type="password" id="password" v-model="form.password" required
                        :placeholder="$t('register.password')" class="input-field"
                        :class="{ 'input-error': form.password.length > 0 && form.password.length < 6 }" />
                    <span v-if="form.password.length > 0 && form.password.length < 6" class="error-text">
                        {{ $t('register.errors.shortPassword') }}
                    </span>
                </div>

                <div class="form-group">
                    <input type="password" id="confirmPassword" v-model="form.confirmPassword" required
                        :placeholder="$t('register.confirmPassword')" class="input-field"
                        :class="{ 'input-error': !passwordsMatch && form.confirmPassword }" />
                    <span v-if="!passwordsMatch && form.confirmPassword" class="error-text">
                        {{ $t('register.errors.passwordMismatch') }}
                    </span>
                </div>

                <button type="submit" :disabled="!isFormValid" class="submit-button">
                    {{ $t('register.submit') }}
                </button>

                <div v-if="submitMessage" class="message"
                    :class="{ 'success-message': submitSuccess, 'error-message': !submitSuccess }">
                    {{ submitMessage }}
                </div>
            </form>

            <div class="footer-links">
                {{ $t('register.loginPrompt') }} <router-link to="/" class="link">{{ $t('register.loginLink')
                    }}</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const submitMessage = ref('');
const submitSuccess = ref(false);

const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(form.value.email);
});

const passwordsMatch = computed(() => {
    return form.value.password === form.value.confirmPassword;
});

const isFormValid = computed(() => {
    return (
        form.value.name &&
        isEmailValid.value &&
        form.value.password.length >= 6 &&
        passwordsMatch.value
    );
});

async function handleSubmit() {
    const baseApiUsersUrl = import.meta.env.VITE_BASE_API_USERS_URL;

    if (!isFormValid.value) return;

    try {
        const response = await fetch(baseApiUsersUrl + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.value.name,
                email: form.value.email,
                password: form.value.password
            })
        });

        const data = await response.json()

        if (response.ok) {
            submitMessage.value = data.message || t('register.success');
            submitSuccess.value = true;
            form.value = { name: '', email: '', password: '', confirmPassword: '' };
        } else {
            submitMessage.value = data.message || t('register.errors.registrationError');
            submitSuccess.value = false;
        }
    } catch (error) {
        submitMessage.value = t('register.errors.connectionError');
        submitSuccess.value = false;
    }
}
</script>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 59px);
    box-sizing: border-box;
    background-color: #f5f7fa;
    padding: 20px;
}

.register-card {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    color: #333;
    font-weight: 500;
}

.form-group {
    margin-bottom: 20px;
    position: relative;
}

.input-field {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: border 0.3s;
    box-sizing: border-box;
}

.input-field:focus {
    outline: none;
    border-color: #42b983;
}

.input-error {
    border-color: #ff4444;
}

.error-text {
    display: block;
    color: #ff4444;
    font-size: 13px;
    margin-top: 5px;
}

.submit-button {
    width: 100%;
    padding: 14px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.submit-button:hover {
    background-color: #3aa876;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.message {
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
}

.success-message {
    background-color: #e8f5e9;
    color: #2e7d32;
    border: 1px solid #c8e6c9;
}

.error-message {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
}

.footer-links {
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.link {
    color: #42b983;
    text-decoration: none;
    transition: color 0.3s;
}

.link:hover {
    text-decoration: underline;
}
</style>