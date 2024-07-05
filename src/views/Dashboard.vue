<script setup>
import { onMounted, ref } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { getUser } from '../utiils/local_storage';

const user = ref([]);
onMounted(() => {
    user.value = getUser();
});
const events = ref([
    {
        start: new Date(),
        end: new Date(new Date().getTime() + 3600 * 1000), // 1 hour later
        title: 'Sample Event 1'
    },
    {
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 1) + 3600 * 1000), // 1 hour later, next day
        title: 'Sample Event 2'
    }
]);

const onEventClick = (event) => {
    alert(`Event: ${event.title}`);
};

const onCellClick = (date) => {
    alert(`Clicked on date: ${date}`);
};
</script>

<template>
    <div class="row">
        <div class="col-12 xl:col-4">
            <div class="card">
                <h5>Hi,{{ user ? user : 'Guest' }}</h5>
                <div class="mx-auto font-color mt-2">
                    <span>Saat ini kamu berada di semester 8 dan telah berhasil menempuh sks dari 144 sks. Tetap semangat belajar, ya!</span>
                </div>
                <div class="mt-4">
                    <span class="font-color">IPK Anda</span>
                    <h4>3.03</h4>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-8">
            <div class="row">
                <div class="col-8">
                    <span>Jadwal Hari Ini (Rabu, 06 Maret 2024)</span>
                </div>
                <div class="col-4 text-lg-right">
                    <span>Semester 2023/2024 Ganjil</span>
                </div>
            </div>
            <div class="card bg-theme">
                <div class="row">
                    <div class="col-12 xl:col-8 yl:col-8">
                        <div class="text-danger">
                            <span>Saat ini Anda tidak memiliki jadwal kuliah yang harus diikuti, tetaplah semangat belajar dan menghasilkan karya - karya yang bermanfaat bagi nusa dan bangsa.</span>
                        </div>
                        <div class="mt-3 text-danger">
                            <span>Atau Anda bisa akses halaman berikut : </span>
                        </div>
                    </div>
                    <div class="col-12 xl:col-4 d-flex justify-content-center align-items-center">
                        <img src="../assets/images/gambar.jpg" alt="Gambar" class="img-fluid custom-img" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <div class="card">
                <!-- <template> -->
                <div id="cal">
                    <vue-cal class="vuecal--rounded-theme vuecal--blue-theme" hide-view-selector :time="false" active-view="month" xsmall :disable-views="['week']">
                        <template #arrow-prev>
                            <i class="pi pi-arrow-left"></i>
                        </template>
                        <template #arrow-next>
                            <i class="pi pi-arrow-right"></i>
                        </template>
                    </vue-cal>
                </div>
                <!-- </template> -->
            </div>
        </div>
        <div class="col-5">
            <div class="card" style="height: calc(78vh - 200px)">
                <span><b>KELAS YANG DIBUKA PRESENSI HARI INI</b></span>
                <hr />
                <div class="row bg-theme text-center" style="border-radius: 10px">
                    <div class="col-3">
                        <div class="text-secondary">
                            <small> MATA KULIAH</small>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="text-secondary">
                            <small> KELAS</small>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="text-secondary">
                            <small> PERTEMUAN</small>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="text-secondary">
                            <small> WAKTU</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3">
            <div class="card">
                <span><b>BUKA PRESENSI KELAS</b></span>
                <hr />
                <div class="row">
                    <label for="exampleFormControlInput1" class="form-label">Mata Kuliah</label>
                    <div class="col-sm-12">
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Mata Kuliah</option>
                            <option value="1">Kapita Selekta</option>
                            <option value="2">Pemrograman Web</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-2">
                    <label for="exampleFormControlInput1" class="form-label">Pertemuan ke-</label>
                    <div class="col-sm-12">
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Pertemuan ke-</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <p>Waktu:</p>
                    <p>-</p>
                    <!-- <p>09.00 - 10.00</p> -->
                </div>
                <div class="row mt-2">
                    <button class="btn btn-primary">Buka Presensi</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <span><b>INFORMASI TERBARU</b></span>
                <hr />
                <div class="row bg-theme" style="border-radius: 10px">
                    <div class="col-12">
                        <div class="text-secondary text-center">
                            <small> Tidak ada berita baru</small>
                        </div>
                    </div>
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
    max-height: 350px;
    /* Misalnya, untuk membatasi tinggi gambar */
}

.bg-theme {
    background-color: #fbefea;
}

@import '~vue-cal/dist/vuecal.css';
</style>
