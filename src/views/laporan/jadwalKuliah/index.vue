<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>LAPORAN JADWAL PERKULIAHAN</h5>
            <hr />
            <hr>
            
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
                    <label for="exampleFormControlInput1" class="form-label">Kurikulum</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Kurikulum--</option>
                        <option value="1">Merdeka Belajar</option>
                        <option value="2">K13</option>
                        <option value="3">PBL</option>
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
            
            
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Semester</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Semester --</option>
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
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
<!-- <template>
    <div class="card">
        <div class="card-body">
            <h5>KARTU RENCANA STUDI (KRS)</h5>
            <hr />
            <hr>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Pilih Cetak KRS</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>Angkatan</option>
                        <option value="1">2023</option>
                        <option value="2">2022</option>
                        <option value="3">2021</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                    <input type="date" class="form-control" placeholder="yytr">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                    <textarea name="" id="" class="form-control" rows="10"></textarea>
                    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">  
                    <label for="exampleFormControlInput1" class="form-label">Aida Andinar</label>
                </div>
                <div class="col-lg-6">
                <input type="file" class="form-control">
                    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Share ke public</label>
                </div>
                <div class="col-lg-6">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheckbox">
                        <label class="form-check-label" for="exampleCheckbox">Tampilkan berita di dashboad mahasiswa</label>
                     </div>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12 d-flex justify-content-center">
                    <button class="btn btn-primary">Tampilkan</button>
                </div>
            </div>
        </div>
    </div>
</template> -->