<script setup>


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
            <div id="hero" class="d-flex flex-column pt-6 px-4 px-lg-5 overflow-hidden vh-100" style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%);">
                <div class="mx-4 mx-md-5 h-100 d-flex align-items-center justify-content-center">
                    <div class="row d-flex align-items-center justify-content-center w-100">
                        <div class="col-lg-8">
                            <h1 class="display-4 fw-bold text-dark">
                                <span class="fw-light d-block">Selamat Datang di</span>Sistem Informasi Akademik
                            </h1>
                            <p class="fs-4 fw-normal text-muted mt-3">Siap Mendukung Kampus Anda Bertransformasi secara Digital</p>
                            <router-link to="/setup-guest/get-started/register" class="btn btn-primary btn-lg">Get Started</router-link>
                        </div>
                        <div class="col-lg-4">
                            <div class="border-1 p-1" style="border-radius: 10px;">
                                <img :src="'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'" style="border-radius: 8px;" alt="Deskripsi Gambar" class="img-fluid mb-2" />
                                <p class="m-0 text-center fw-bold text-muted">Aida Andinar Maulidiana</p>
                                <p class="m-0 small text-muted text-center">~Kadal Gurun~</p>    
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