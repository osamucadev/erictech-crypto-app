<template>
    <div class="edit-profile-container">
        <h1>{{ t('editProfile.title') }}</h1>

        <form @submit.prevent="handleSubmit" class="edit-form">
            <div class="form-group">
                <label for="profileImage">{{ t('editProfile.profileImage') }}</label>
                <ProfileImageUploader :image-url="previewImage || `${viteBaseApiUrl}${form.profileImage}`"
                    :initial="userInitial" :select-label="t('editProfile.selectImage')"
                    :change-label="t('editProfile.changeImage')" @file-selected="handleImageChange" />
            </div>

            <div class="form-group">
                <label for="name">{{ t('editProfile.name') }}</label>
                <input type="text" id="name" v-model="form.name" required class="input-field" :disabled="loading">
            </div>

            <div class="form-group">
                <label for="email">{{ t('editProfile.email') }}</label>
                <input type="email" id="email" v-model="form.email" required class="input-field" :disabled="loading">
            </div>

            <div class="form-group">
                <label for="description">{{ t('editProfile.description') }}</label>
                <textarea id="description" v-model="form.description" class="textarea-field"
                    :disabled="loading"></textarea>
            </div>

            <div class="form-actions">
                <button type="button" @click="handleCancel" class="cancel-button">
                    {{ t('editProfile.cancel') }}
                </button>
                <button type="submit" :disabled="loading" class="submit-button">
                    {{ loading ? t('editProfile.saving') : t('editProfile.saveChanges') }}
                </button>
            </div>

            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useEditProfile } from '@/composables/useEditProfile'
import ProfileImageUploader from '@/components/ProfileImageUploader.vue'

const { t } = useI18n()
const viteBaseApiUsersUrl = import.meta.env.VITE_BASE_API_USERS_URL
const viteBaseApiUrl = import.meta.env.VITE_BASE_API_URL

const {
    form,
    loading,
    errorMessage,
    successMessage,
    previewImage,
    userInitial,
    handleSubmit,
    handleCancel,
    handleImageChange
} = useEditProfile(viteBaseApiUsersUrl)
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
