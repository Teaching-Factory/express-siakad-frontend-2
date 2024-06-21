<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-6">
                    <h5><i class="pi pi-user me-2"></i>TAMBAH PERTEMUAN BARU</h5>
                </div>
                <div class="col-lg-6 text-end">
                <button class="btn btn-primary"> <i class="pi pi-save me-2"></i> Simpan</button>
            </div>
            </div>
            <hr>
    
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                    <div class="col-lg-2">Semester</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 2020/2021 Ganjil</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"> <span class="me-2"> :</span> Pemrograman Terstruktur (2.00 SKS)</div>
                    <div class="col-lg-2">Kurikulum</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
            </div>

            <div class="card" style="border-radius: none !important">
                <hr style="margin-top: -5px;">
                
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Pertemuan ke-</label>
                    <div class="col-sm-9">
                        <select name="" class="form-select" id="">
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                                <option value="">4</option>
                                <option value="">5</option>
                                <option value="">6</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Kelas</label>
                    <div class="col-sm-3">
                        <input type="date" class="form-control" id="inputPassword">
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
                <div class="mb-3 mt-4 row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Mulai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword">
                    </div>
                    <label for="inputPassword" class="col-sm-3 col-form-label">Jam Selesai</label>
                    <div class="col-sm-3">
                        <input type="time" class="form-control" id="inputPassword">
                    </div>
                </div>
                <div class="mb-3 mt-4 row">
                <div class="col-lg-3">
                    <label for="exampleFormControlInput1" class="form-label">Materi</label>
                </div>
                <div class="col-lg-9">
                    <textarea name="" id="" class="form-control" rows="10"></textarea>
                </div>
            </div>
                
                
            </div>  
        </div>  
    </div>
</template>