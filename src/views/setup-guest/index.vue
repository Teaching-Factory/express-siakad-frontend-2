<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted } from 'vue';
import { API_URL } from '../../config/config';
// import router from '../../router';

const getStartedSetup = async () => {
    Swal.fire({
        title: 'Loading...',
        html: 'Sedang Memuat Data',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    const response = await axios.get(`${API_URL}/setup-guest/get-started`);
    Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
        window.location.href = '/setup-guest/get-started/register';
    });

    console.log('data : ', response);
    Swal.close();
};

// onMounted(() => {
//     getStartedSetup();
// });

function smoothScroll(id) {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
}
</script>

<template>
    <div class="bg-light">
        <div id="home" class="container-fluid landing-wrapper" style="height: 100vh; overflow-y: auto;">
            <div
                id="hero"
                class="d-flex flex-column pt-6 px-4 px-lg-5 "
                style="min-height: 100vh; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)"
            >
                <div class="mx-4 mx-md-5 h-100 d-flex align-items-center justify-content-center">
                    <div class="row d-flex align-items-center justify-content-center w-100">
                        <div class="col-lg-7">
                            <h2 class="display-4 fw-bold text-dark"><span class="fw-light d-block"></span>Sistem Informasi Akademik</h2>
                            <p class="fs-5 fw-normal text-muted mt-3"> <b>SIACLOUD</b> hadir untuk memudahkan manajemen akademik kampus Anda dengan teknologi terkini yang up-to-date mengikuti regulasi pemerintah. 
                                Nikmati pelaporan data yang <b>otomatis, akurat, dan aman,</b> langsung ke <b>Kemendikbud-Ristek</b>, tanpa pusing!
                                <br><b>SIACLOUD</b> cocok untuk Semua Jenis Perguruan Tinggi Dari kampus kecil hingga besar dan membantu Anda berkembang lebih pesat!
                            </p>
                            <div class="mt-5 mb-4">
                                <h5 class="fw-bold text-dark">✨ Kenapa Memilih SIACLOUD?</h5>
                                <ul class="fs-5 text-muted mt-3">
                                    <li><b>Integrasi Lengkap:</b> Terhubung dengan e-learning dan pembayaran online.</li>
                                    <li><b>Fleksibilitas Tanpa Batas:</b> Role user yang dapat disesuaikan untuk kebutuhan setiap kampus.</li>
                                    <li><b>Keamanan Terjamin:</b> Perlindungan data kampus Anda adalah prioritas kami.</li>
                                    <li><b>Efisiensi Maksimal:</b> Hemat waktu dan tenaga dengan sistem yang serba otomatis.</li>
                                </ul>
                                <p class="fs-5 mt-3">  
                                    <br>Klik tombol Get Started di bawah ini dan temukan bagaimana SIACLOUD dapat mendukung transformasi digital kampus Anda!
                                </p>
                            </div>

                            <button @click="getStartedSetup" type="submit" class="btn btn-primary btn-lg">Get Started</button>
                        </div>
                        <div class="col-lg-5">
                            <img :src="'/layout/images/apps.png'" style="border-radius: 8px" alt="Deskripsi Gambar" class="img-fluid mb-2" />
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