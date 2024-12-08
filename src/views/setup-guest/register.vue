<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { API_URL } from '../../config/config';
import { setPermissions, setToken, setUser } from '../../service/auth';
import { setSettingGlobal } from '../../utiils/local_storage';
import { post } from '../../utiils/request';

const router = useRouter();
const nama = ref('');
const username = ref('');
const password = ref('');
const email = ref('');

const createUser = async () => {
    try {
        // Proses pembuatan user
        const res = await post(`setup-guest/create-user-super-admin`, {
            nama: nama.value,
            username: username.value,
            password: password.value,
            email: email.value
        });

        if (res.status === 200 && res.data) {
            const { data } = res;
            if (data.token) {
                setToken(data.token); // Menyimpan token ke localStorage
                setUser(data.user); // Menyimpan data user
                setPermissions(data.permissions); // Menyimpan permissions
                setSettingGlobal(data.setting_global_prodi); // Menyimpan setting global
            } else {
                throw new Error('Token tidak tersedia dalam response.');
            }

            // Menampilkan pesan sukses
            Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
                // Redirect ke halaman berikutnya
                router.push('/setup-guest/get-started/register/settingws');
            });
        } else {
            throw new Error('Response API tidak valid.');
        }
    } catch (error) {
        Swal.fire('GAGAL', 'Gagal menambahkan data. Silakan coba lagi.', 'error');
        console.error('Create user error:', error.message);
    }
};

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>

<template>
    <div class="bg-light">
        <div id="home" class="container-fluid landing-wrapper overflow-hidden">
            <div
                id="hero"
                class="d-flex flex-column pt-6 px-4 px-lg-5 overflow-hidden vh-100"
                style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)"
            >
                <div class="mx-4 mx-md-5 h-100 d-flex align-items-center justify-content-center">
                    <div class="row d-flex align-items-center justify-content-center w-100">
                        <div class="col-lg-7">
                            <p class="display-6 fw-bold text-dark"><span class="fw-light d-block"></span>Transformasi Kampus Anda Dimulai di Sini!</p>
                            <div class="mt-4 mb-4">
                                <h5 class="fs-5 text-muted mt-3">Selamat datang di langkah pertama menuju kampus digital modern.
                                    <br>SIACLOUD adalah mitra terpercaya untuk mewujudkan visi kampus Anda sebagai institusi pendidikan berdaya saing tinggi di era digital.
                                    <p>Dengan SIACLOUD, Anda siap untuk:</p>
                                </h5>
                                <h5></h5>
                                <ul class="fs-5 text-muted mt-3">
                                    <p>✨ Meningkatkan efisiensi pengelolaan akademik.</p>
                                    <p>✨ Memudahkan akses dan layanan bagi mahasiswa dan dosen.</p>
                                    <p>✨ Memastikan integrasi data yang aman dan akurat.</p>
                                </ul>
                                <p class="fs-5 mt-4">
                                    <b>Daftarkan Kampus Anda Sekarang!!</b>  
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-5 mt-5">
                            <div class="flex flex-column align-items-center justify-content-center">
                                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #343434 10%, rgba(33, 150, 243, 0) 30%)">
                                    <div class="w-full surface-card py-5 px-4 sm:px-6" style="border-radius: 53px">
                                        <div class="text-center mb-5">
                                            <div class="text-900 text-3xl font-medium mb-3">Register</div>
                                        </div>

                                        <form @submit.prevent="createUser">
                                            <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                                            <InputText id="username" type="text" placeholder="Masukkan Username" v-model="username" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                            <span class="text-red-500"></span>

                                            <label for="username" class="block text-900 text-xl font-medium mb-2">Nama</label>
                                            <InputText id="username" type="text" placeholder="Masukkan Nama Lengkap" v-model="nama" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                            <span class="text-red-500"></span>

                                            <label for="username" class="block text-900 text-xl font-medium mb-2">Email</label>
                                            <InputText id="username" type="text" placeholder="Masukkan Email" v-model="email" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                            <span class="text-red-500"></span>

                                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                                            <Password id="password1" placeholder="Masukkan Password" v-model="password" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                                            <span class="text-red-500"></span>

                                            <button class="btn btn-primary w-full p-3 text-xl" style="background-color: #343434" type="submit">Daftar</button>
                                            <div class="text-center mt-3">
                                                <router-link to="/setup-guest/get-started" class="text-center">Kembali ke beranda</router-link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style>
/* Container styling */
.cta-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
}

/* Primary Button Styling */
.cta-primary {
    background-color: #007bff; /* Warna hijau yang menenangkan */
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.cta-primary:hover {
    background-color: #007bff; /* Warna hover */
    transform: translateY(-2px); /* Efek floating */
}

.cta-primary:active {
    transform: translateY(0); /* Kembali normal saat diklik */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-primary:focus {
    outline: 3px solid #81c784; /* Fokus aksesibilitas */
}

/* Secondary Button Styling */
.cta-secondary {
    color: #4caf50; /* Warna hijau */
    background: transparent;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border: 2px solid #4caf50;
    border-radius: 0.5rem;
    text-decoration: none;
    display: inline-block;
    transition: color 0.3s ease, background-color 0.3s ease, transform 0.2s ease;
}

.cta-secondary:hover {
    background-color: #4caf50; /* Background hijau saat hover */
    color: white;
    transform: translateY(-2px);
}

.cta-secondary:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-secondary:focus {
    outline: 3px solid #81c784;
}
</style>