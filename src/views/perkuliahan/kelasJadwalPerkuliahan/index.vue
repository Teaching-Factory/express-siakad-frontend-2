<template>
    <div class="card">
        <div class="card-body">
            <h5>KELAS DAN JADWAL PERKULIAHAN</h5>
            <hr />

            <div class="card card-theme">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-md-6 col-lg-12">
                            <h6 class="text-dark">Keterangan :</h6>
                            <p class="lh-1 text-small">
                                1. Fitur ini di gunakan untuk menyimpan jadwal perkuliahan yang di buka, dosen pengajar, seta peserta kelas / KRS mahasiswa setiap periode
                                <br />2. Sebelum memasukkan dosen mengajar, pastikan dosen tersebut sudah tercatat penugasannya pada tahun ajaran yang berlaku <br />3. Setting realisasi pertemuan dan dosen pengajar ada pada feeder
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card card-theme">
                <div class="card-body">
                    <div class="row">
                        <div class="col-6 xl:col-2">
                            <span>Program Studi</span>
                        </div>
                        <div class="col-6 xl:col-4">
                            <div class="form-group">
                                <select class="form-control">
                                    <option>---Pilih Program Studi---</option>
                                    <option>S1 Teknik Informatika</option>
                                    <option>S1 Pendidikan Fisika</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 xl:col-2">
                            <span>Periode</span>
                        </div>
                        <div class="col-6 xl:col-4">
                            <div class="form-group">
                                <select class="form-control">
                                    <option>---Pilih Periode---</option>
                                    <option>2023/2024 Genap</option>
                                    <option>2023/2024 Ganjil</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 xl:col-2">
                            <span>Kurikulum</span>
                        </div>
                        <div class="col-6 xl:col-4">
                            <div class="form-group">
                                <select class="form-control">
                                    <option>---Pilih Kurikulum---</option>
                                    <option>2013</option>
                                    <option>Merdeka</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6 xl:col-2">
                            <span>Semester</span>
                        </div>
                        <div class="col-6 xl:col-4">
                            <div class="form-group">
                                <select class="form-control">
                                    <option>---Pilih Semester---</option>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary my-4">Tampilkan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
