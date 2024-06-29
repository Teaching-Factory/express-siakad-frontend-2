<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU HASIL STUDI (KRS)</h5>
            <hr />
            <hr>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Nama Mahasiswa</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>--Pilih Angkatan--</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Periode</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Periode--</option>
                        <option value="1">2023/2024 Genap</option>
                        <option value="2">2023/2024 Ganjil</option>
                        <option value="3">2022/2023 Ganjil</option>
                    </select>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <router-link to="/cetak-khs-mahasiswa" class="btn btn-primary">Tampilkan</router-link>
                </div>
            </div>
        </div>
    </div>
</template>