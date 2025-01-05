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
import { onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '../../../config/config';

const logoUrl = computed(() => {
    return `/layout/images/logo.png`;
});
const usernameError = ref('');
const passwordError = ref('');
const profilePT = ref([]);

const handleSubmit = async () => {
    usernameError.value = '';
    passwordError.value = '';

    // Validasi input
    if (!username.value) {
        usernameError.value = 'Username is required';
    }
    if (!password.value) {
        passwordError.value = 'Password is required';
    }
    if (!username.value || !password.value) {
        return;
    }

    // Pastikan reCAPTCHA sudah dimuat sebelum mengambil token
    const captchaToken = grecaptcha.getResponse();
    if (!captchaToken) {
        Swal.fire('Error', 'Please complete the CAPTCHA', 'error');
        return;
    }

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
        const res = await login(username.value, password.value, captchaToken);
        Swal.close();
        if (res.status === 200) {
            console.log('login berhasil');
            router.push('/dashboard');
        } else {
            console.error('login failed:', res.message);
            if (res.message === 'Invalid username or password') {
                usernameError.value = 'Invalid username or password';
                passwordError.value = 'Invalid username or password';
            }
        }
    } catch (error) {
        console.error('login error', error.message);
        // usernameError.value = 'Invalid username or password';
        passwordError.value = 'Invalid username or password';
    }
};

const getProfilePT = async () => {
    try {
        const response = await axios.get(`${API_URL}/perguruan-tinggi-guest/get-pt-active`);
        profilePT.value = response.data.data;
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

onMounted(() => {
    getProfilePT();

    if (window.grecaptcha) {
        window.grecaptcha.render('chapta', {
            sitekey: '6LfWOU4qAAAAAAvkEGv0-z9QlKMqqC2-GN748h4z'
        });
    }
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #343434 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-6 px-4 sm:px-6" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img :src="profilePT?.foto_profil_pt || logoUrl" alt="Image" height="100" class="mb-3" />

                        <div class="text-900 text-3xl font-medium mb-3">{{ profilePT?.PerguruanTinggi?.nama_perguruan_tinggi || 'Nama Instansi' }}</div>
                    </div>

                    <form @submit.prevent="handleSubmit">
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" type="text" placeholder="Masukkan Username" class="w-full md:w-30rem mb-3" style="padding: 1rem" v-model="username" /> <br />
                        <span v-if="usernameError" class="text-red-500">{{ usernameError }}</span>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Masukkan Password" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>

                        <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: #343434">Forgot password?</a>
                        </div> -->

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div id="chapta" class="g-recaptcha" data-sitekey="6LfWOU4qAAAAAAvkEGv0-z9QlKMqqC2-GN748h4z"></div>
                        </div>

                        <Button label="LOGIN" class="w-full p-3 text-xl" style="background-color: #343434" type="submit"></Button>
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
.text-red-500 {
    color: #f56565;
}
</style>
