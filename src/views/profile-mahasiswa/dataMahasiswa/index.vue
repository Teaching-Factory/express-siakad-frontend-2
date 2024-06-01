<script setup>
import { ref, onBeforeMount } from 'vue';
const customer1 = ref([]);
const loading1 = ref(false);
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};

onBeforeMount(() => {
    customer1.value = [
        {
            no: '1',
            prodi: 'S1 Teknik Informatika',
            angkatan: '2009',
            nim: '12345678',
            name: 'John Doe',
            sistemkuliah: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Sistem Kuliah</option>
                    <option value="option2">Karyawan</option>
                    <option value="option3">Reguler</option>
                </select>
            </div>`,
        }, {
            no: '2',
            prodi: 'S1 Teknik Informatika',
            angkatan: '2009',
            nim: '12345678',
            name: 'John Doe',
            sistemkuliah: `
            <div class="actions gap-2">
                <select class="form-select" id="sistemkuliahDropdown">
                    <option value="option1">--Pilih Sistem Kuliah</option>
                    <option value="option2">Karyawan</option>
                    <option value="option3">Reguler</option>
                </select>
            </div>`,
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-12 ">
                    <div class="d-flex align-items-center justify-content-center">
                        <img class="rounded-circle" alt="User Image" src="../../../../public/ubi.png" width="20%">
                    </div>
                    <div class="text-center">
                        <h1>Aida Andinar Maulidiana</h1>
                        <h5>287643275 - S-1 TEKNIK INFORMATIKA</h5>
                        <button class="btn btn-primary">Dikeluarkan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab"
                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                aria-selected="true">Data Pribadi</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab"
                                data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                aria-selected="false">Data Orangtua</button>
                        </li>
                    </ul>


                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel"
                            aria-labelledby="data-user">

                                <!-- data mahasiswa -->
                                <div class="row mt-4 mb-4">
                                    <div class="col-lg-12 d-flex justify-content-end">
                                        <div   div class="flex justify-content-end gap-2">
                                        <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Batal</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="row">
                                    <div class="col-lg-2">Nama</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> Aida Andinar Maulidiana</div>
                                    <div class="col-lg-2">Nama Ibu Kandung</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> -</div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2">Tempat Lahir</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> BANYUWANGI</div>
                                    <div class="col-lg-2">Tanggal Lahir</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> 18 MEI 2002</div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2">Jenis Kelamin</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> Perempuan</div>
                                    <div class="col-lg-2">Agama</div>
                                    <div class="col-lg-4"> <span class="me-2">:</span> Islam</div>
                                </div>
                                <div class="mb-3 mt-4 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NIK</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                        <span>(No KTP Tanpa Tanda Baca )</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NISN</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                        <span>(No KTP Tanpa Tanda Baca )</span>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NPWP</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                        <span>(Maksimal NPWP 15 digit & harus angka)</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">KWN</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Jalan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Dusun</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RT</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                        <span>(Input harus angka)</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RW</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                        <span>(Input harus angka)</span>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Kelurahan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">KodePos</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Kecamatan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Telepon</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nama Bank</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Rekening</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Telepon</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- data orang tua -->
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div   div class="flex justify-content-end gap-2">
                                        <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Batal</button>
                                    </div>
                                </div>
                                <p><b>Ayah</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIK Ayah</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Ayah</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option value="1">D4/S1</option>
                                        <option value="2">SMK Sederajat</option>
                                        <option value="3">SMP Sederajat</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option value="1">Wiraswasta</option>
                                        <option value="2">PNS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option value="1">> 500.000</option>
                                        <option value="2">1.000.000 - 3.000.000</option>
                                        <option value="3">3.000.000 - 5.000.000</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Ibu</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIK Ibu</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Ibu</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option value="1">D4/S1</option>
                                        <option value="2">SMK Sederajat</option>
                                        <option value="3">SMP Sederajat</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option value="1">Wiraswasta</option>
                                        <option value="2">PNS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option value="1">> 500.000</option>
                                        <option value="2">1.000.000 - 3.000.000</option>
                                        <option value="3">3.000.000 - 5.000.000</option>
                                    </select>
                                </div>
                            </div>
                
                            <div class="mb-3 mt-2 row">
                                <p><b>Wali</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Wali</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option value="1">D4/S1</option>
                                        <option value="2">SMK Sederajat</option>
                                        <option value="3">SMP Sederajat</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option value="1">Wiraswasta</option>
                                        <option value="2">PNS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option value="1">> 500.000</option>
                                        <option value="2">1.000.000 - 3.000.000</option>
                                        <option value="3">3.000.000 - 5.000.000</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
