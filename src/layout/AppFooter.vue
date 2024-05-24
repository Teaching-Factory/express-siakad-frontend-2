<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/public/ubi.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        Copyright &copy; 2024 |   
        <span class="font-medium ml-2">Sistem Informasi Akademik</span>
    </div>
</template>
<style lang="scss" scoped></style>
