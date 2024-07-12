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
            <div class="row d-flex justify-content-center mb-3 mt-4">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester Berlaku (Aktif)</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester KRS</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Semester Nilai</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Batas SKSnya KRS untuk Sarjana dan Diploma</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>2023/2024 Ganjil</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                        <option>2023/2024 Genap</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Perhitungan Cetak Transkrip</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Nilai Tertinggi</option>
                        <option>Nilai Terbaru</option>
                    </select>
                </div>
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Wilayah Penandatanganan Laporan</label>
                </div>
                <div class="col-lg-3">
                    <input type="text" class="form-control" id="inputPassword" placeholder="Banyuwangi">
                </div>
                
            </div>
            <div class="row d-flex justify-content-end mb-3">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Label Dosen Wali</label>
                </div>
                <div class="col-lg-3">
                    <select  class="form-select" aria-label="Default select example">
                        <option value="" selected disabled hidden>Pembimbing Akademik</option>
                        <option>Dosen Wali</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <ol class="lh-2 text-small">
                        <li>Fitur ini digunakan untuk mengubah periode semester yang aktif.</li>
                        <li>Fitur ini digunakan untuk mengubah status pembukaan penilaian, KRS & KHS.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
