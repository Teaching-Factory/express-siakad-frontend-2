<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>JADWAL PERKULIAHAN</h5>
            <hr>
            <div class="row mt-3">
                <div class="col-lg-10 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode</option>
                            <option value="1">2020</option>
                            <option value="2">2021</option>
                            <option value="3">2022</option>
                            <option value="4">2023</option>
                            <option value="5">2024</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
            </div>
            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">NIM</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> 3256767i</div>
                    <div class="col-lg-2">Jurusan</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> S1 Teknik Informatika</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Nama</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Aida Andinar Maulidiana</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Perempuan</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                    <div class="col-lg-2">Agama</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> tidak diisi</div>
                </div>
            </div>
            <div style="overflow-x: auto;">
                <table class="table table-bordered text-center">
                    <thead class="table-dark align-middle">
                        <tr>
                            <th  rowspan="2">No</th>
                            <th  rowspan="2">Kode Mata Kuliah</th>
                            <th  rowspan="2">Nama Mata Kuliah</th>
                            <th  rowspan="2">SKS</th>
                            <th  rowspan="2">Kelas</th>              
                            <th  colspan="3">Jadwal Perkuliahan</th>              
                        </tr>
                        <tr>
                            <th>Ruang</th>
                            <th>Hari</th>
                            <th>Waktu</th>  
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>G8.98</td>
                            <td>Selasa</td>
                            <td>09.10-10.10</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>325325</td>
                            <td>Kapita Selekta</td>
                            <td>2</td>
                            <td>4</td>
                            <td>G8.98</td>
                            <td>Selasa</td>
                            <td>09.10-10.10</td>
                        </tr>
                        <tr>
                            <td  class="text-center" colspan="7">Total SKS</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>