<template>
    <div class="crypto-section">
        <h2>Crypto</h2>
        <div class="crypto-list">
            <CryptoItem v-for="crypto in cryptoList" :key="crypto.id" :crypto="crypto" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CryptoItem from './CryptoItem.vue'

const cryptoList = ref([])

const fetchCryptoList = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token não encontrado')

        const response = await fetch(`${import.meta.env.VITE_BASE_API_CRYPTO_URL}/list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar lista de criptomoedas')

        const data = await response.json()
        cryptoList.value = data

    } catch (error) {
        if (error instanceof Error && error.message.includes('401')) {
            console.error('Não autorizado - token inválido ou expirado')
        }
    }
}

onMounted(() => {
    fetchCryptoList()
})
</script>

<style scoped>
.crypto-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.crypto-section h2 {
    color: #333;
    margin-bottom: 20px;
    font-size: 24px;
}

.crypto-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}
</style>