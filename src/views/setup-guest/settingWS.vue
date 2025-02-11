<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { postData } from '../../utiils/request';

const urlFeeder = ref('');
const usernameFeeder = ref('');
const passwordFeeder = ref('');
const status = ref(false);

const createWebSister = async () => {
    // Proses pembuatan user
    const response = await postData(`setting-ws-feeder/create`, {
        url_feeder: urlFeeder.value,
        username_feeder: usernameFeeder.value,
        password_feeder: passwordFeeder.value,
        status: status.value
    });
    Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
        window.location.href = '/setup-guest/get-started/register/settingws/install';
    });
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
        <div id="home" class="container-fluid landing-wrapper" style="height: 100vh; overflow-y: auto">
            <div
                id="hero"
                class="d-flex flex-column pt-6 px-4 px-lg-5"
                style="min-height: 100vh; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)"
            >
                <div class="mx-4 mx-md-5 h-100 d-flex align-items-center justify-content-center">
                    <div class="row d-flex align-items-center justify-content-center w-100">
                        <div class="col-lg-7">
                            <p class="display-6 fw-bold text-dark"><span class="fw-light d-block"></span>Langkah Selanjutnya: Integrasikan Sistem Kampus Anda!</p>
                            <div class="mt-4 mb-4">
                                <h5 class="fs-5 text-muted mt-3">Kini saatnya Anda mengatur koneksi Web Service (WS) untuk memastikan SIACLOUD dapat bekerja dengan sempurna sesuai kebutuhan kampus Anda</h5>
                                <h5></h5>
                                <h5 class="fw-bold text-dark">💡 Apa yang Perlu Dilakukan?</h5>
                                <ul class="fs-5 text-muted mt-3">
                                    <li>Masukkan informasi API Key dan detail Web Service kampus Anda.</li>
                                    <li>Pastikan data yang diinput sesuai untuk menjaga integrasi berjalan lancar.</li>
                                    <li>Hubungkan sistem kampus Anda ke SIACLOUD untuk menikmati kemudahan otomatisasi dan pelaporan.</li>
                                </ul>
                                <p class="fs-5 mt-4">
                                    <b>🚀 Setelah selesai, Anda siap menjalankan transformasi kampus digital dengan penuh percaya diri!</b>
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-5 mt-5">
                            <div class="flex flex-column align-items-center justify-content-center">
                                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #343434 10%, rgba(33, 150, 243, 0) 30%)">
                                    <div class="w-full surface-card py-7 px-5 sm:px-6" style="border-radius: 53px">
                                        <div class="text-center mb-5">
                                            <div class="text-900 text-3xl font-medium mb-3">Setting WS</div>
                                        </div>

                                        <form @submit.prevent="createWebSister">
                                            <label for="username" class="block text-900 text-xl font-medium mb-2">URL Feeder</label>
                                            <InputText id="username" v-model="urlFeeder" type="text" placeholder="Masukkan URL Feeder" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                                            <label for="username" class="block text-900 text-xl font-medium mb-2">Username Feeder</label>
                                            <InputText id="username" type="text" v-model="usernameFeeder" placeholder="Masukkan Username Feeder" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                                            <label for="username" class="block text-900 text-xl font-medium mb-2">Password Feeder</label>
                                            <InputText id="username" type="text" v-model="passwordFeeder" placeholder="Masukkan Password Feeder" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                                            <div>
                                                <label for="statusFeeder" class="block text-900 font-medium text-xl mb-2">Status Feeder</label>
                                                <div class="flex items-center mb-3">
                                                    <input type="radio" v-model="status" id="active" value="true" class="mr-2" />
                                                    <label for="active" class="mr-4">Aktif</label>

                                                    <!-- <input type="radio" id="inactive" value="false" class="mr-2" />
                                                    <label for="inactive">Nonaktif</label> -->
                                                </div>
                                            </div>
                                            <button class="btn btn-primary w-full p-3 text-xl" style="background-color: #343434" type="submit">Simpan</button>
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

<!-- <template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #343434 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Setting WS</div>
                    </div>

                    <form>
                        <label for="username" class="block text-900 text-xl font-medium mb-2">ULR  Feeder</label>
                        <InputText id="username" type="text" placeholder="Masukkan Username" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username Feeder</label>
                        <InputText id="username" type="text" placeholder="Masukkan Nama Lengkap" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                        <label for="username" class="block text-900 text-xl font-medium mb-2">Password Feeder</label>
                        <InputText id="username" type="text" placeholder="Masukkan Email" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />

                        <div>
                            <label for="statusFeeder" class="block text-900 font-medium text-xl mb-2">Status Feeder</label>
                            <div class="flex items-center mb-3">
                            <input
                                type="radio"
                                id="active"
                                value="true"
                                class="mr-2"
                            />
                            <label for="active" class="mr-4">Aktif</label>

                            <input
                                type="radio"
                                id="inactive"
                                value="false"
                                class="mr-2"
                            />
                            <label for="inactive">Nonaktif</label>
                            </div>
                            
                        </div>
                        <router-link to="/setup-guest/get-started/register/settingws" class="btn btn-primary w-full p-3 text-xl" style="background-color: #343434" type="submit">Simpan</router-link>
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
</style> -->