<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref } from 'vue';
import { getData } from '../utiils/request';

const { layoutConfig } = useLayout();
const profilePT = ref([]);

const logoUrl = computed(() => {
    return `/layout/images/logo.png`;
});
const getProfilePT = async () => {
    try {
        const response = await getData(`perguruan-tinggi-guest/get-pt-active`);
        profilePT.value = response.data.data;
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};
onMounted(() => {
    getProfilePT();
});
</script>

<template>
    <div class="layout-footer">
        <img :src="profilePT?.foto_profil_pt || logoUrl" alt="Logo" height="20" class="mr-2" />
        Copyright &copy; 2024 |
        <span class="font-medium ml-2">Sistem Informasi Akademik</span>
    </div>
</template>
<style lang="scss" scoped></style>
