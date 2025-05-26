<template>
    <div class="edit-profile-container">
        <h1>{{ t('editProfile.title') }}</h1>

        <form @submit.prevent="handleSubmit" class="edit-form">
            <div class="form-group">
                <label for="profileImage">{{ t('editProfile.profileImage') }}</label>
                <div class="image-upload">
                    <img v-if="previewImage || form.profileImage"
                        :src="previewImage || 'http://localhost:5000/' + form.profileImage" alt="Preview"
                        class="profile-preview">
                    <div v-else class="profile-placeholder">
                        {{ userInitial }}
                    </div>
                    <input type="file" id="profileImage" accept="image/jpeg, image/png" @change="handleImageChange"
                        class="file-input">
                    <label for="profileImage" class="upload-button">
                        {{ previewImage ? t('editProfile.changeImage') : t('editProfile.selectImage') }}
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label for="name">{{ t('editProfile.name') }}</label>
                <input type="text" id="name" v-model="form.name" required class="input-field">
            </div>

            <div class="form-group">
                <label for="email">{{ t('editProfile.email') }}</label>
                <input type="email" id="email" v-model="form.email" required class="input-field">
            </div>

            <div class="form-group">
                <label for="description">{{ t('editProfile.description') }}</label>
                <textarea id="description" v-model="form.description" class="textarea-field"></textarea>
            </div>

            <div class="form-actions">
                <button type="button" @click="handleCancel" class="cancel-button">
                    {{ t('editProfile.cancel') }}
                </button>
                <button type="submit" :disabled="loading" class="submit-button">
                    {{ loading ? t('editProfile.saving') : t('editProfile.saveChanges') }}
                </button>
            </div>

            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="success-message">
                {{ successMessage }}
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const previewImage = ref('')

const form = ref({
    name: '',
    email: '',
    description: '',
    profileImage: ''
})

const userInitial = computed(() => {
    return form.value.name?.charAt(0).toUpperCase() || 'U'
})

// Search user data
const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token não encontrado')

        const response = await fetch(`${import.meta.env.VITE_BASE_API_USERS_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar dados do usuário')

        const data = await response.json()
        form.value = {
            name: data.name,
            email: data.email,
            description: data.description || '',
            profileImage: data.profileImage || ''
        }

    } catch (error) {
        errorMessage.value = 'Erro ao carregar perfil'
    }
}

// Handle image upload
const handleImageChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.files && input.files[0]) {
        const file = input.files[0]
        if (file.size > 5 * 1024 * 1024) {
            errorMessage.value = 'A imagem deve ter no máximo 5MB'
            return
        }
        previewImage.value = URL.createObjectURL(file)
    }
}

// Send updated data
const handleSubmit = async () => {
    try {
        loading.value = true
        errorMessage.value = ''
        successMessage.value = ''

        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token não encontrado')

        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('email', form.value.email)
        formData.append('description', form.value.description)

        const fileInput = document.getElementById('profileImage') as HTMLInputElement
        if (fileInput.files?.[0]) {
            formData.append('profileImage', fileInput.files[0])
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_API_USERS_URL}/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Erro ao atualizar perfil')
        }

        const data = await response.json()
        successMessage.value = 'Perfil atualizado com sucesso!'

        form.value.profileImage = data.profileImage || form.value.profileImage
        previewImage.value = ''

        setTimeout(() => {
            router.push('/dashboard')
        }, 1000)

    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Erro desconhecido'
    } finally {
        loading.value = false
    }
}

const handleCancel = () => {
    router.push('/dashboard')
}

onMounted(() => {
    fetchUserData()
})
</script>

<style scoped>
.edit-profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
}

.edit-form {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.form-group {
    margin-bottom: 25px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
}

.input-field {
    width: 100%;
    padding: 12px 15px;
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

.textarea-field {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    min-height: 100px;
    resize: vertical;
    box-sizing: border-box;
}

.image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.profile-preview {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #f0f0f0;
}

.profile-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #42b983;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: bold;
}

.file-input {
    display: none;
}

.upload-button {
    padding: 10px 15px;
    background-color: #f0f0f0;
    color: #333;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.upload-button:hover {
    background-color: #e0e0e0;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 30px;
}

.submit-button {
    padding: 12px 25px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #3aa876;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.cancel-button {
    padding: 12px 25px;
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cancel-button:hover {
    background-color: #e0e0e0;
}

.error-message {
    color: #ff4444;
    margin-top: 20px;
    text-align: center;
}

.success-message {
    color: #42b983;
    margin-top: 20px;
    text-align: center;
}
</style>