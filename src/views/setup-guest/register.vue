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
                        <div class="col-lg-7">
                            <h1 class="display-4 fw-bold text-dark">
                                <span class="fw-light d-block">Selamat Datang di</span>Sistem Informasi Akademik
                            </h1>
                            <p class="fs-4 fw-normal text-muted mt-3">Siap Mendukung Kampus Anda Bertransformasi secara Digital</p>
                        </div>
                        <div class="col-lg-5 mt-5">
                            <div class="flex flex-column align-items-center justify-content-center">
                                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, #343434 10%, rgba(33, 150, 243, 0) 30%)">
                                    <div class="w-full surface-card py-7 px-5 sm:px-8" style="border-radius: 53px">
                                <div class="text-center mb-5">
                                    <div class="text-900 text-3xl font-medium mb-3">Register</div>
                                </div>

                                <form >
                                    <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                                    <InputText id="username" type="text" placeholder="Masukkan Username" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                    <span  class="text-red-500"></span>

                                    <label for="username" class="block text-900 text-xl font-medium mb-2">Nama</label>
                                    <InputText id="username" type="text" placeholder="Masukkan Nama Lengkap" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                    <span  class="text-red-500"></span>

                                    <label for="username" class="block text-900 text-xl font-medium mb-2">Email</label>
                                    <InputText id="username" type="text" placeholder="Masukkan Email" class="w-full md:w-30rem mb-3" style="padding: 1rem" /> <br />
                                    <span  class="text-red-500"></span>

                                    <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                                    <Password id="password1" placeholder="Masukkan Password" :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                                    <span  class="text-red-500"></span>

                                    <router-link to="/setup-guest/get-started/register/settingws" class="btn btn-primary w-full p-3 text-xl" style="background-color: #343434" type="submit">Daftar</router-link>
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