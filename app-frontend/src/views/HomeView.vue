<template>
    <div class="login-container">
        <div class="login-card">
            <h1>{{ $t('login.title') }}</h1>

            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <input type="email" id="email" v-model="form.email" required :placeholder="$t('login.email')"
                        class="input-field" />
                </div>

                <div class="form-group">
                    <input type="password" id="password" v-model="form.password" required
                        :placeholder="$t('login.password')" class="input-field" />
                </div>

                <button type="submit" :disabled="loading" class="submit-button">
                    {{ loading ? $t('login.loading') : $t('login.submit') }}
                </button>

                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>
            </form>

            <div class="footer-links">
                <router-link to="/register" class="link">
                    {{ $t('login.createAccount') }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const loading = ref(false)
const errorMessage = ref('')

const form = ref({
    email: '',
    password: ''
})

const handleLogin = async () => {
    try {
        loading.value = true
        errorMessage.value = ''

        await auth.login(form.value)
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Login failed'
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 59px);
    box-sizing: border-box;
    background-color: #f5f7fa;
    padding: 20px;
}

.login-card {
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

.error-message {
    color: #ff4444;
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
}

.footer-links {
    margin-top: 25px;
    text-align: center;
}

.link {
    color: #42b983;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.link:hover {
    text-decoration: underline;
}
</style>