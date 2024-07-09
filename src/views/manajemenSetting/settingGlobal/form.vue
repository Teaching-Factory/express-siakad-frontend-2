<template>
    <div class="card">
        <div class="row">
            <div class="col-lg-5">
                <h5><i class="pi pi-user me-2"></i> EDIT SETTING GLOBAL</h5>
            </div>
            <div class="col-lg-7 d-flex justify-content-end">
                <router-link to="/setting-global" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                <button type="submit" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</button>
                <router-link to="/setting-global" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Reset</router-link>
            </div>
        </div>
        <hr />
        <div class="card" style="padding: 0rem 1rem 0rem 1rem">
            <div class="row mt-3">
                <div class="col-lg-3">Semester Berlaku (Aktif)</div>
                <div class="col-lg-3"><span class="me-2">:</span> 2023/2024 Ganjil</div>
                <div class="col-lg-3">Semester KRS</div>
                <div class="col-lg-3"><span class="me-2">:</span> 2023/2024 Ganjil</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-3">Semester Nilai</div>
                <div class="col-lg-3"><span class="me-2">:</span> 2023/2024 Ganjil</div>
                <div class="col-lg-3">Batas SKSnya KRS untuk Sarjana dan Diploma</div>
                <div class="col-lg-3"><span class="me-2"> :</span> 24</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-3">Perhitungan Cetak Transkrip</div>
                <div class="col-lg-3"><span class="me-2">:</span> Nilai Tertinggi</div>
                <div class="col-lg-3">Wilayah Penandatanganan Laporan</div>
                <div class="col-lg-3"><span class="me-2"> :</span> Banyuwangi</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
