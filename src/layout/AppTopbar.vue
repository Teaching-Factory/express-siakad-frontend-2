<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '../config/config';
import { clearPermissions, clearToken, clearUser } from '../service/auth';
import { getUser } from '../utiils/local_storage';
import Swal from 'sweetalert2';

const { onMenuToggle } = useLayout();
const user = ref([]);
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
    user.value = getUser();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/public/ubi.png`;
});

const handleLogout = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await axios.get(`${API_URL}/auth/do-logout`);
        console.log(response);
        if (response.status == 200 && response.statusText === 'OK') {
            clearToken();
            clearUser();
            clearPermissions();
            router.push('/');
        }
        Swal.close();
    } catch (error) {
        console.log(error);
    }
};

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <div class="text-container text-icon" style="display: flex; flex-direction: column; margin-left: 10px;">
                <span class="text-white subtitle" style="font-size: 1rem;">Sistem Informasi Akademik</span>
                <span class="text-white title" style="font-size: 1.1rem; font-weight: bold;">Universitas Bakti Indonesia</span>
                
            </div>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars text-white"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v text-white"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div class="dropdown">
                <button class="dropdown-toggle border-0" style="background: none" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="pi pi-user icon-text me-3 fs-4"></i>
                    <span class="user-text">Hi, {{ user ? user : 'Guest' }}</span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="handleLogout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-text, .icon-text {
  color: white;
}
@media (max-width: 1021px) {

  .user-text, .icon-text {
    color: black;
  }
}

@media (max-width: 500px) {
  .text-icon {
    display: none !important;
  }
}
</style>
