<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>KARTU RENCANA STUDI (KRS)</h5>
            <hr>
            
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-danger text-center" role="alert">
                        Tidak bisa melakukan KRS. Status mahasiswa pada periode ini BELUM DI-SET. Silahkan menghubungi bagian akademik terkait.
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-12">
                    <div class="alert alert-warning text-center" role="alert">
                        IPS (Semester Lalu) Anda belum dihitung, hubungi admin kampus Anda untuk meminta menghitung IPS Anda
                    </div>
                </div>
            </div>
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
                    <div class="col-lg-4"> <span class="me-2">:</span> : Aida Andinar Maulidiana</div>
                    <div class="col-lg-2">Jenis Kelamin</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> Perempuan</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Status Mahasiswa</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> : belum di setting</div>
                    <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                </div>
                <hr style="border: 1px solid #000">
                <div class="row">
                    <div class="col-lg-2">Dosen Wali</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> : Sudarmono</div>
                    <!-- <div class="col-lg-2">IPS Semester Lalu</div>
                    <div class="col-lg-4"> <span class="me-2">:</span> -</div> -->
                </div>
                <hr style="border: 1px solid #000">
            </div>
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nomor Mata Kuliah</th>
                        <th>Kelas</th>
                        <th>Dosen Pengajar</th>
                        <th>Ruang</th>
                        <th>Hari</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>SKS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>325325</td>
                        <td>4A</td>
                        <td>Pak Puh</td>
                        <td>GKT</td>
                        <td>Selasa</td>
                        <td>08:00</td>
                        <td>16:00</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>325325</td>
                        <td>4A</td>
                        <td>Pak Puh</td>
                        <td>GKT</td>
                        <td>Selasa</td>
                        <td>08:00</td>
                        <td>16:00</td>
                        <td>21</td>
                    </tr>
                    <tr>
                        <td  class="text-center" colspan="8">Total SKS</td>
                        <td>0</td>
                    </tr>
                    <tr >
                        <td class="text-center" colspan="8">Batas SKS</td>
                        <td>12</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>