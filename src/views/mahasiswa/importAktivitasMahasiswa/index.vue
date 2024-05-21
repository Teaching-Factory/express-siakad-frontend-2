<template>
    <div class="card">
        <div class="card-body">
            <h5>IMPORT DATA AKTIVITAS MAHASISWA</h5>
            <hr />
            <div class="card card-theme">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-6 col-md-6 col-lg-6">
                            <span>Download Template</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6">
                            <div class="text-info">
                                <router-link to="">
                                    <span>template_aktivitas_mhs.xls</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-6 col-lg-6">
                            <span>Import Data</span>
                        </div>
                        <div class="col-6 col-md-6 col-lg-6">
                            <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile02" />
                                <label class="input-group-text" for="inputGroupFile02">Upload</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-12">
                            <h6 class="text-dark">Langkah-Langkah :</h6>
                            <p class="lh-1 text-small">
                                1. Download Template data aktivitas Mahasiswa terlebih dahulu
                                <br />2. Pastikan kodeprodi yang anda inputkan sesuai dengan daftar referensi program studi pada feeeder <br />3. Pastikan data yang anda inputkan sudah benar, Data Mahasiswa sudah terdaftar <br />4. Bila terjadi
                                kesalahan import data, silahkan download error hasil import <br />5. Lakukan perbaikan lalu import lagi data tersebut
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-12">
                            <h6 class="text-dark">Catatan :</h6>
                            <p class="lh-1 text-small">1. Halaman import aktivitas mahasiswa hanya digunakan untuk menambah aktivitas baru mahasiswa dan tidak digunakan untuk update aktivitas mahasiswa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
