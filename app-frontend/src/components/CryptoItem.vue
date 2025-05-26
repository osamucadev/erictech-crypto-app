<template>
    <div class="crypto-item" @click="navigateToCrypto">
        <img :src="crypto.image" :alt="crypto.name" class="crypto-image">
        <div class="crypto-info">
            <h3>{{ crypto.name }}</h3>
            <div class="crypto-details">
                <span class="symbol">{{ crypto.symbol.toUpperCase() }}</span>
                <span class="price">${{ formattedPrice }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
    crypto: {
        type: Object,
        required: true
    }
})

const router = useRouter()

const formattedPrice = computed(() => {
    return props.crypto.current_price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
})

const navigateToCrypto = () => {
    router.push(`/crypto/${props.crypto.id}`)
}
</script>

<style scoped>
.crypto-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.crypto-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.crypto-image {
    width: 40px;
    height: 40px;
    margin-right: 15px;
}

.crypto-info {
    flex: 1;
}

.crypto-info h3 {
    text-align: left;
    margin: 0 0 5px 0;
    font-size: 16px;
    color: #333;
}

.crypto-details {
    display: flex;
    justify-content: space-between;
}

.symbol {
    color: #666;
    font-size: 14px;
}

.price {
    font-weight: 600;
    color: #42b983;
}
</style>