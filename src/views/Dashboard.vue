
<template>
    <div class="grid">
        <div class="col-12 xl:col-4">
            <div class="card">
                <h5>Hi, Aida Andinar</h5>
                <div class="mx-auto font-color mt-2">
                    <span>Saat ini kamu berada di semester 8 dan telah berhasil menempuh sks dari 144 sks. Tetap semangat belajar, ya!</span>
                </div>
                <div class="mt-4">
                    <span class="font-color">IPK Anda</span>
                    <h4>3.03</h4>
                </div>
            </div>

            <div class="card">
                <div class="flex justify-content-between align-items-center mb-5">
                    <h5>Best Selling Products</h5>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-8">
            <div class="row ml-1 mb-1">
                <div class="col-8">
                    <span>Jadwal Hari Ini (Rabu, 06 Maret 2024)</span>
                </div>
                <div class="col-4 text-lg-right">
                    <span>Semester 2023/2024 Ganjil</span>
                </div>
            </div>
            <div class="card bg-theme">
                <div class="row">
                    <div class="col-12 xl:col-7">
                        <div class="text-danger">
                            <span>Saat ini Anda tidak memiliki jadwal kuliah yang harus diikuti, tetaplah semangat belajar dan menghasilkan karya - karya yang bermanfaat bagi nusa dan bangsa.</span>
                        </div>
                        <div class="mt-3 text-danger">
                            <span>Atau Anda bisa akses halaman berikut : </span>
                        </div>
                    </div>
                    <div class="col-12 xl:col-5 d-flex justify-content-center align-items-center">
                        <img src="../assets/images/gambar.jpg" alt="Gambar" class="img-fluid custom-img" />
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5>Notifications</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-img {
    max-width: 120%;
    height: auto;
    /* Atur ukuran maksimal jika diperlukan */
    max-height: 350px; /* Misalnya, untuk membatasi tinggi gambar */
}
.bg-theme {
    background-color: #fbefea;
}
</style>
