<template>
    <div class="not-found">
        <h1>{{ $t('notFound.title') }}</h1>
        <p>{{ $t('notFound.message') }}</p>
        <router-link to="/">{{ $t('notFound.backButton') }}</router-link>
    </div>s
</template>

<style scoped>
.not-found {
    text-align: center;
    padding: 2rem;
}

.not-found a {
    color: #42b983;
    text-decoration: none;
}

.not-found a:hover {
    text-decoration: underline;
}
</style>