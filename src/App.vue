<template>
    <AppProvider :theme="theme">
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <n-button type="primary" size="medium" @click="toggleTheme">toggle</n-button>
            <n-calendar></n-calendar>
        </div>
    </AppProvider>
</template>

<script setup lang="ts">
import AppProvider from '@/components/AppProvider/index.vue'
import useTheme from './hooks/useTheme'
import { onMounted } from 'vue'

const { theme, toggleTheme } = useTheme()
// window.$message('adsadsa')
onMounted(() => {
    window.$loadingBar.start()
    setTimeout(() => {
        window.$loadingBar.finish()
        window.$message.success('加载完成，Perfect~')
    }, 500)
})
</script>

<style lang="scss">
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
    background-color: $primaryColor;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
