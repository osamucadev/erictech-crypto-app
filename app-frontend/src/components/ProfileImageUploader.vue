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
</style>
