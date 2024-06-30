<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { layoutConfig } = useLayout();
const checked = ref(false);
const username = ref('');
const password = ref('');
import { login } from '../../../service/login';
import Swal from 'sweetalert2';

const logoUrl = computed(() => {
    return `/layout/images/ubi.jpg`;
});

const handleSubmit = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            timer: 1000,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const res = await login(username.value, password.value);
        Swal.close();
        if (res.status === 200) {
            console.log('login berhasil');
            router.push('/dashboard');
        } else {
            console.error('login failed:', res.message);
        }
    } catch (error) {
        console.error('login eror', error.message);
    }
};
</script>


<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="logoUrl" alt="Image" height="100" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Nama Instansi</div>
                    </div>

                    <form @submit.prevent="handleSubmit">
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" type="text" placeholder="Input Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" type="submit"></Button>

                        <!-- Tampilkan pesan kesalahan jika ada -->
                        <div v-if="errorMessage" class="text-red-500 mt-3">{{ errorMessage }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
