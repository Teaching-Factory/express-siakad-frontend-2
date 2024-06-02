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
            pertemuan: '1',
            tanggal: '18/05/2024',
            waktu: '09.10 - 10.10',
            ruang: 'G4.08',
            dosen: 'Lukman Hakim',
            materi: 'Sitasi Ilmiah',
            jumlahmhs: '30',
            statuspresensi: 'Aktif',
            aksi: '-',
        },{
            pertemuan: '2',
            tanggal: '18/05/2024',
            waktu: '09.10 - 10.10',
            ruang: 'G4.08',
            dosen: 'Lukman Hakim',
            materi: 'Sitasi Ilmiah',
            jumlahmhs: '30',
            statuspresensi: 'Aktif',
            aksi: '-',
        }
        // Add more dummy data here
    ];
})
</script>

<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>KELAS DAN JADWAL PERKULIAHAN</h5>
            <div class="card" style="padding: 0rem 1rem 0rem 1rem">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-12">
                        <h6 class="text-dark">Keterangan :</h6>
                        <p class="lh-1 text-small">
                            <ol>
                                <li>Fitur ini di gunakan untuk menyimpan jadwal perkuliahan yang di buka, dosen pengajar, seta peserta kelas / KRS mahasiswa setiap periode</li>
                                <li>Sebelum memasukkan dosen mengajar, pastikan dosen tersebut sudah tercatat penugasannya pada tahun ajaran yang berlaku</li>
                                <li>Setting realisasi pertemuan dan dosen pengajar ada pada feeder</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Program Studi</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Program Studi</option>
                            <option value="1">Teknologi Ternak</option>
                            <option value="2">Teknologi Basis Data</option>
                            <option value="3">Perikanan</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Periode</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Periode</option>
                            <option value="1">2021/2022 Genap</option>
                            <option value="2">2021/2022 Ganjil</option>
                            <option value="3">2021/2022 Genap</option>
                            <option value="4">2021/2022 Ganjil</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Kurikulum</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Kurikulum</option>
                            <option value="1">S1 TEKNIK INFORMATIKA</option>
                            <option value="1">D4 TEKNIK INFORMATIKA</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-5 col-md-6 col-sm-6">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Semester</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected disabled hidden>Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6" style="margin-top: 27px;">
                    <button class="btn btn-primary btn-block" style="width: 100%;">Tampilkan</button>
                </div>
                </div>
                <hr/>
            <table class="table table-center table-hover mb-4">
                <thead class="table-primary align-middle">
                    <tr>
                        <th colspan="7">PEMROGRAMAN TERSTRUKTUR [ 2 SKS | TINF 110B]</th>
                        <th class="text-end">
                            <button class="btn btn-secondary me-2"> 1 Kelas </button>
                            <router-link to="/kelas-jadwal-perkuliahan/create-kelas" class="btn btn-success"><i class="pi pi-plus"></i></router-link>
                        </th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr>
                        <td>
                            <i class="pi pi-building">A</i>
                        </td>
                        <td>
                            <i class="pi pi-calendar">Sabtu</i>
                        </td>
                        <td>
                            <i class="pi pi-time">07:00 - 08:00</i>
                        </td>
                        <td>
                            <i class="pi pi-map">Ruang A 102</i>
                        </td>
                        <td>
                            <i class="pi pi-users">1/40</i>
                        </td>
                        <td>
                            <router-link class="btn me-2" to="/kelas-jadwal-perkuliahan/create-dosen" style="background-color: #E87E04; color: #fff;"> <i class="pi pi-users me-2"></i> Detail </router-link>
                            <span>Suroto</span>
                        </td>
                        <td class="text-end">
                            <router-link to="/kelas-jadwal-perkuliahan/create-pesertakelas" class="btn btn-primary me-2"><i class="pi pi-users me-2"></i>Detail Peserta</router-link>
                        </td>
                        <td class="text-end">
                            <button class="btn  me-2 btn-warning"> <i class="pi pi-pencil "></i> </button>
                            <button class="btn  me-2 btn-danger"> <i class="pi pi-trash "></i> </button>
                            <button class="btn  me-2" style="background-color: #E87E04;"><i class="pi pi-user-plus "></i> </button>
                            <button class="btn  me-2 btn-primary"> <i class="pi pi-print "></i> </button>
                            <button class="btn  me-2 btn-success"> <i class="pi pi-copy "></i> </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-center table-hover mb-4">
                <thead class="table-primary align-middle">
                    <tr>
                        <th colspan="7">KAPITA SELEKTA [ 2 SKS | TINF 110B]</th>
                        <th class="text-end">
                            <button class="btn btn-secondary me-2"> 1 Kelas </button>
                            <router-link to="/kelas-jadwal-perkuliahan/create-kelas" class="btn btn-success"><i class="pi pi-plus"></i></router-link>
                        </th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr>
                        <td>
                            <i class="pi pi-building">A</i>
                        </td>
                        <td>
                            <i class="pi pi-calendar">Sabtu</i>
                        </td>
                        <td>
                            <i class="pi pi-time">07:00 - 08:00</i>
                        </td>
                        <td>
                            <i class="pi pi-map">Ruang A 102</i>
                        </td>
                        <td>
                            <i class="pi pi-users">1/40</i>
                        </td>
                        <td>
                            <router-link class="btn me-2" to="/kelas-jadwal-perkuliahan/create-dosen" style="background-color: #E87E04; color: #fff;"> <i class="pi pi-users me-2"></i> Detail </router-link>
                            <span>Suroto</span>
                        </td>
                        <td class="text-end">
                            <router-link to="/kelas-jadwal-perkuliahan/create-pesertakelas" class="btn btn-primary me-2"><i class="pi pi-users me-2"></i>Detail Peserta</router-link>
                        </td>
                        <td class="text-end">
                            <button class="btn  me-2 btn-warning"> <i class="pi pi-pencil "></i> </button>
                            <button class="btn  me-2 btn-danger"> <i class="pi pi-trash "></i> </button>
                            <button class="btn  me-2" style="background-color: #E87E04;"><i class="pi pi-user-plus "></i> </button>
                            <button class="btn  me-2 btn-primary"> <i class="pi pi-print "></i> </button>
                            <button class="btn  me-2 btn-success"> <i class="pi pi-copy "></i> </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
