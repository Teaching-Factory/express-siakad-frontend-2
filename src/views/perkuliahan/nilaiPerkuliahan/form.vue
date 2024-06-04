<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>DETAIL NILAI PERKULIAHAN</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <router-link to="/nilai-perkuliahan" class="btn btn-secondary me-2"> <i class="pi pi-bars mr-2"></i> Daftar</router-link>
                        <button class="btn btn-success me-2"> <i class="pi pi-upload mr-2"></i> Upload Excel</button>
                        <router-link to="/nilai-perkuliahan" class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</router-link>
                        <button class="btn btn-danger"> <i class="pi pi-times mr-2"></i> Batal</button>
                    </div>
                </div>
                <!-- <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <button class="btn btn-secondary me-2"> <i class="pi pi-bars mr-2"></i> Daftar</button>
                    <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                    <button class="btn btn-danger"> <i class="pi pi-times mr-2"></i> Batal</button>
                </div> -->

            </div>
            <hr>
            <!-- <h5><i class="pi pi-user me-2"></i>DETAIL NILAI PERKULIAHAN</h5>
            <hr> -->
            
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2020/2021 Genap</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Kapita Selekta</div>
                    <div class="col-lg-2">Nama Kelas</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2022</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Dosen Pengajar</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Sudarmono</div>
                    <div class="col-lg-2">Ruang Perkuliahan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Lokasi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                    <div class="col-lg-2">Waktu Perkuliahan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table class="table table-bordered">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th rowspan="3">No</th>
                            <th rowspan="3">NIM</th>
                            <th rowspan="3">Nama Mahasiswa</th>
                            <th rowspan="3">Angkatan</th>
                            <th class="text-center" colspan="4">Nilai</th>
                            <th rowspan="3">Nilai AKhir</th>
                            <th rowspan="3">Nilai Huruf</th>
                        </tr>
                        <tr>
                            <th>Presensi</th>
                            <th>Tugas</th>
                            <th>Ujian Tengah Semester</th>
                            <th>Ujian Akhir Semester</th>
                        </tr>
                        <tr>
                            <th>10%</th>
                            <th>20%</th>
                            <th>30%</th>
                            <th>40</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Aida Andinar</td>
                            <td>2020</td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <input type="text" class="form-control" >
                            </td>
                            <td>
                                <select name="" class="form-select" id="">
                                    <option value="">AIDA</option>
                                    <option value="">ANDI</option>
                                    <option value="">NAR</option>
                                    <option value="">MAU</option>
                                    <option value="">LIDI</option>
                                    <option value="">ANA</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>