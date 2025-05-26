<template>
    <footer class="app-footer">
        <div class="language-buttons">
            <button @click="changeLanguage('en')" :class="{ active: currentLocale === 'en' }">
                {{ $t('footer.english') }}
            </button>
            <button @click="changeLanguage('pt-BR')" :class="{ active: currentLocale === 'pt-BR' }">
                {{ $t('footer.portuguese') }}
            </button>
            <button @click="changeLanguage('es')" :class="{ active: currentLocale === 'es' }">
                {{ $t('footer.spanish') }}
            </button>
        </div>

        <button v-if="auth.isAuthenticated" @click="auth.logout()" class="logout-button">
            {{ $t('footer.logout') }}
        </button>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const { locale } = useI18n()
const currentLocale = locale
const isLoggedIn = ref(false)

onMounted(() => {
    checkAuthStatus()
})

const checkAuthStatus = () => {
    isLoggedIn.value = localStorage.getItem('token') !== null
}

const changeLanguage = (lang: string) => {
    locale.value = lang
    localStorage.setItem('locale', lang)
}
</script>

<style scoped>
.app-footer {
    box-sizing: border-box;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: #f5f5f5;
    border-top: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.language-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.app-footer button {
    margin: 0;
    padding: 0.25rem 0.5rem;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    width: 80px;
}

.app-footer button.active {
    background-color: #42b983;
    color: white;
    border-color: #42b983;
}

.logout-button {
    width: 100px !important;
    background-color: #ff4444 !important;
    color: white !important;
    border-color: #ff4444 !important;
    margin: 0 auto !important;
}

.logout-button:hover {
    background-color: #cc0000 !important;
}
</style>