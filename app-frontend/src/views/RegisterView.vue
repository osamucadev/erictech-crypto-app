<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

onMounted(() => {
    if (auth.isAuthenticated) {
        router.push({ name: 'dashboard' })
    }
})

</script>

<template>
    <RegisterForm />
</template>

<style scoped></style>