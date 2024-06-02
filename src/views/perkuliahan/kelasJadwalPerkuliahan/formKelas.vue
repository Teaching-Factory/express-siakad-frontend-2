<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>DETAIL KELAS DAN JADWAL MINGGUAN</h5>
                </div>
                <div class="col-lg-6 text-end">
                <button class="btn btn-secondary"> <i class="pi pi-check me-2"></i> Simpan</button>
            </div>
            </div>
            
            <hr>
            
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Semester</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2020/2021 Ganjil</div>
                    
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Kurikulum</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                    
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"> <span class="me-2"> :</span> Pemrograman Terstruktur (2.00 SKS)</div>
                </div>
                <hr style="margin: 0;">
                <div class="row">
                    <div class="d-flex col-12 justify-content-center">
                        <p><strong>Jadwal Mingguan</strong></p>
                    </div>
                </div>
                <hr style="margin-top: -5px;">
                <div class="mb-3 mt-4 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="inputPassword">
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Kapasitas Peserta Kelas</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="inputPassword">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Hari</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                                <option value="">Senin</option>
                                <option value="">Selasa</option>
                                <option value="">Rabu</option>
                                <option value="">Kamis</option>
                                <option value="">Jumat</option>
                                <option value="">Sabtu</option>
                        </select>
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Ruang</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                                <option value="">G.01</option>
                                <option value="">G.02</option>
                                <option value="">G.03</option>
                                <option value="">G.04</option>
                                <option value="">G.05</option>
                                <option value="">G.06</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Mulai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword">
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Selesai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Lingkup</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                                <option value="">Internal</option>
                                <option value="">Eksternal</option>
                        </select>
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Mode Kuliah</label>
                    <div class="col-sm-3">
                        <select name="" class="form-select" id="">
                                <option value="">Online</option>
                                <option value="">Offline</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Tanggal Mulai Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="inputPassword">
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Tanggal Akhir Efektif</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="inputPassword">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>