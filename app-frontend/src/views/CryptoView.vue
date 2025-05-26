<template>
    <div class="crypto-view">
        <router-link to="/" class="back-link">
            {{ $t('crypto.details.back') }}
        </router-link>

        <div class="crypto-header">
            <img :src="crypto.image?.large" :alt="crypto.name" class="crypto-image">
            <h1>{{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})</h1>
        </div>

        <div class="crypto-details">
            <!-- Seção de Preços e Mercado -->
            <div class="detail-section">
                <h2>{{ $t('crypto.details.price') }}</h2>
                <div class="price-display">
                    <span class="price">${{ formatNumber(crypto.market_data?.current_price?.usd) }}</span>
                    <span :class="priceChangeClass">
                        {{ formatPercentage(crypto.market_data?.price_change_percentage_24h) }}
                    </span>
                </div>

                <div class="market-info">
                    <div class="info-item">
                        <span class="label">{{ $t('crypto.details.marketCap') }}:</span>
                        <span>${{ formatNumber(crypto.market_data?.market_cap?.usd) }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">{{ $t('crypto.details.rank') }}:</span>
                        <span>#{{ crypto.market_cap_rank }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">{{ $t('crypto.details.supply') }}:</span>
                        <span>{{ formatNumber(crypto.market_data?.circulating_supply) }} {{ crypto.symbol.toUpperCase()
                        }}</span>
                    </div>
                    <div class="info-item">
                        <span class="label">{{ $t('crypto.details.totalSupply') }}:</span>
                        <span>
                            {{ crypto.market_data?.max_supply ? formatNumber(crypto.market_data.max_supply) : '∞' }}
                            {{ crypto.symbol.toUpperCase() }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Seção de Histórico -->
            <div class="detail-section">
                <h2>{{ $t('crypto.details.allTimeHigh') }}</h2>
                <div class="info-item">
                    <span class="label">Price:</span>
                    <span>${{ formatNumber(crypto.market_data?.ath?.usd) }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Date:</span>
                    <span>{{ formatDate(crypto.market_data?.ath_date?.usd) }}</span>
                </div>
                <div class="info-item">
                    <span class="label">From ATH:</span>
                    <span class="negative">
                        {{ formatPercentage(crypto.market_data?.ath_change_percentage?.usd) }}
                    </span>
                </div>

                <h2>{{ $t('crypto.details.allTimeLow') }}</h2>
                <div class="info-item">
                    <span class="label">Price:</span>
                    <span>${{ formatNumber(crypto.market_data?.atl?.usd) }}</span>
                </div>
                <div class="info-item">
                    <span class="label">Date:</span>
                    <span>{{ formatDate(crypto.market_data?.atl_date?.usd) }}</span>
                </div>
                <div class="info-item">
                    <span class="label">From ATL:</span>
                    <span class="positive">
                        {{ formatPercentage(crypto.market_data?.atl_change_percentage?.usd) }}
                    </span>
                </div>
            </div>

            <!-- Seção de Descrição -->
            <div class="detail-section">
                <h2>{{ $t('crypto.details.description') }}</h2>
                <p class="description">{{ crypto.description?.en || 'No description available' }}</p>

                <h2>{{ $t('crypto.details.categories') }}</h2>
                <div class="categories">
                    <span v-for="category in crypto.categories" :key="category" class="category-tag">
                        {{ category }}
                    </span>
                </div>
            </div>

            <!-- Seção de Links -->
            <div class="detail-section">
                <h2>{{ $t('crypto.details.links') }}</h2>
                <div class="links">
                    <a v-if="crypto.links?.homepage?.[0]" :href="crypto.links.homepage[0]" target="_blank" class="link">
                        {{ $t('crypto.details.homepage') }}
                    </a>
                    <a v-for="(site, index) in crypto.links?.blockchain_site?.filter(Boolean).slice(0, 2)" :key="index"
                        :href="site" target="_blank" class="link">
                        {{ $t('crypto.details.blockchain') }} {{ index + 1 }}
                    </a>
                    <a v-if="crypto.links?.repos_url?.github?.[0]" :href="crypto.links.repos_url.github[0]"
                        target="_blank" class="link">
                        {{ $t('crypto.details.github') }}
                    </a>
                    <a v-if="crypto.links?.subreddit_url" :href="crypto.links.subreddit_url" target="_blank"
                        class="link">
                        {{ $t('crypto.details.reddit') }}
                    </a>
                </div>
            </div>
        </div>

        <p class="last-updated">
            {{ $t('crypto.details.lastUpdated') }}: {{ formatDate(crypto.last_updated) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { params } = useRoute()

const crypto = ref({
    id: '',
    name: '',
    symbol: '',
    image: {
        large: '',
    },
    categories: [],
    links: {
        blockchain_site: [],
        homepage: [],
        repos_url: { github: [] },
        subreddit_url: ''
    },
    market_data: {
        price_change_percentage_24h: 0, current_price: {
            usd: 0
        },
        market_cap: {
            usd: 0
        },
        circulating_supply: 0,
        max_supply: 0,
        ath: { usd: 0 },
        ath_date: { usd: '' },
        ath_change_percentage: { usd: 0 },
        atl: { usd: 0 },
        atl_date: { usd: '' },
        atl_change_percentage: { usd: 0 }
    },
    description: { en: '' },
    market_cap_rank: 0,
    last_updated: ''
})

const priceChangeClass = computed(() => {
    const change = crypto.value.market_data?.price_change_percentage_24h
    return {
        'positive': change > 0,
        'negative': change < 0
    }
})

const formatNumber = (num: number) => {
    if (!num) return 'N/A'
    return new Intl.NumberFormat('en-US').format(num)
}

const formatPercentage = (num: number) => {
    if (num === undefined || num === null) return 'N/A'
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
}

const fetchCryptoDetails = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error(t('errors.noToken'))

        const response = await fetch(`${import.meta.env.VITE_BASE_API_CRYPTO_URL}/details/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) throw new Error(t('errors.fetchFailed'))

        const data = await response.json()
        crypto.value = data

    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    fetchCryptoDetails()
})
</script>

<style scoped>
.crypto-view {
    max-width: 1000px;
    margin: 0 auto;
    padding: 30px;
}

.back-link {
    display: inline-block;
    margin-bottom: 20px;
    color: #42b983;
    text-decoration: none;
    font-weight: 500;
}

.back-link:hover {
    text-decoration: underline;
}

.crypto-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.crypto-image {
    width: 60px;
    height: 60px;
}

.crypto-details {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.detail-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

h1 {
    font-size: 28px;
    color: #333;
    margin: 0;
}

h2 {
    font-size: 18px;
    color: #333;
    margin: 20px 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
}

.price-display {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.price {
    font-size: 28px;
    font-weight: 600;
}

.positive {
    color: #42b983;
}

.negative {
    color: #ff4444;
}

.market-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.info-item {
    display: flex;
    gap: 8px;
}

.label {
    color: #666;
    font-weight: 500;
}

.description {
    color: #333;
    line-height: 1.6;
}

.categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.category-tag {
    background: #f0f0f0;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    color: #555;
}

.links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.link {
    color: #42b983;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.last-updated {
    margin-top: 30px;
    color: #888;
    font-size: 14px;
    text-align: right;
}
</style>