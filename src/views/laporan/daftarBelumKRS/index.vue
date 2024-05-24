<template>
    <div class="card">
        <div class="card-body">
            <h5>EXPORT DATA MAHASISWA BELUM KRS</h5>
            <hr />
            <hr>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Angkatan</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Angkatan  --</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih program studi --</option>
                        <option value="1">S1 Teknik Informatika</option>
                        <option value="2">S1 Pendidikan Fisika</option>
                        <option value="3">S1 Pendidikan Kimia</option>
                    </select>
                </div>
            </div>
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Format</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Format--</option>
                        <option value="1">EXCEL</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Penandatanganan</label>
                </div>
                <div class="col-lg-6">
                    <input type="date" class="form-control">
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template>