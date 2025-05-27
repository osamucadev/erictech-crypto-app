<template>
    <div class="image-upload">
        <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="profile-preview">
        <div v-else class="profile-placeholder">{{ initial }}</div>

        <input type="file" id="profileImage" accept="image/jpeg, image/png" @change="onFileChange" class="file-input" />
        <label for="profileImage" class="upload-button">
            {{ imageUrl ? changeLabel : selectLabel }}
        </label>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    imageUrl: string
    initial: string
    selectLabel: string
    changeLabel: string
}>()

const emit = defineEmits<{
    (e: 'file-selected', file: File): void
}>()

const onFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.files?.[0]) {
        emit('file-selected', input.files[0])
    }
}
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