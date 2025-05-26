<template>
    <div class="dashboard-container">
        <!-- Seção 1: Perfil do Usuário -->
        <div class="profile-section">
            <div class="profile-header">
                <div class="profile-image-container">
                    <img v-if="user.profileImage" :src="'http://localhost:5000/' + user.profileImage" alt="Profile"
                        class="profile-image">
                    <div v-else class="profile-placeholder" :style="{ backgroundColor: randomColor }">
                        {{ userInitial }}
                    </div>
                </div>

                <div class="detail-item">
                    <h1>{{ user.name || '-' }}</h1>
                    <span class="detail-value">{{ user.email || '-' }}</span>
                </div>
            </div>

            <div class="profile-details">
                <div class="detail-item">
                    <span class="detail-value">{{ user.description || t('dashboard.noDescription') }}</span>
                </div>
            </div>

            <button @click="navigateToEdit" class="edit-button">
                {{ t("dashboard.editProfileButton") }}
            </button>
        </div>

        <!-- Seção 2: Crypto -->
        <CryptoSection />
    </div>
</template>

<script setup lang="ts">
import CryptoSection from '@/components/CryptoSection.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const user = ref({
    _id: '',
    name: '',
    email: '',
    description: '',
    profileImage: ''
})

const colors = ['#42b983', '#647eff', '#ff9800', '#e91e63', '#9c27b0']
const randomColor = colors[Math.floor(Math.random() * colors.length)]

const userInitial = computed(() => {
    return user.value.name?.charAt(0).toUpperCase() || 'U'
})

const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token não encontrado')

        const response = await fetch(`${import.meta.env.VITE_BASE_API_USERS_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar dados')

        const data = await response.json()

        user.value = {
            _id: data._id,
            name: data.name,
            email: data.email,
            description: data.description || '',
            profileImage: data.profileImage || ''
        }

    } catch (error) {
        if (error instanceof Error && error.message.includes('')) {
            handleLogout()
        }
    }
}

const navigateToEdit = () => {
    router.push('/edit')
}

const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push({ name: 'home' })
}

onMounted(() => {
    fetchUserData()
})
</script>

<style scoped>
.dashboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 93px);
    box-sizing: border-box;
    gap: 30px;
}

.profile-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
}

.profile-image-container {
    width: 80px;
    height: 80px;
}

.profile-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.profile-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 32px;
    font-weight: bold;
}

.profile-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 25px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.detail-item h1 {
    margin: 0;
}

.detail-label {
    font-weight: 600;
    color: #333;
}

.detail-value {
    color: #666;
}

.crypto-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
    text-align: center;
}

.crypto-section h2 {
    color: #333;
    margin-bottom: 10px;
}

.crypto-text {
    color: #666;
    font-size: 16px;
}

.edit-button {
    padding: 12px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

.edit-button:hover {
    background-color: #3aa876;
}
</style>