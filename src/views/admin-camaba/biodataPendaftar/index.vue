<script setup>
import { computed, onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';
import Swal from 'sweetalert2';

const selectedSekolah = ref('');
const nama_wilayah = ref('');
const nama_sekolah = ref('');
const profil = ref([]);
const fotoProfile = ref([]);

const nama_lengkap = ref([]);
const tempat_lahir = ref([]);
const tanggal_lahir = ref([]);
const jenis_kelamin = ref([]);

const id_sekolah = ref([]);

const id_wilayah = ref([]);

const nik = ref([]);
const nisn = ref([]);
const npwp = ref([]);
const kewarganegaraan = ref([]);
const jalan = ref([]);
const dusun = ref([]);
const rt = ref([]);
const rw = ref([]);
const kelurahan = ref([]);
const kode_pos = ref([]);
const email = ref([]);
const handphone = ref([]);
const nik_ayah = ref([]);
const nama_ayah = ref([]);
const tanggal_lahir_ayah = ref([]);
const nik_ibu = ref([]);
const nama_ibu_kandung = ref([]);
const tanggal_lahir_ibu = ref([]);
const nama_wali = ref([]);
const tanggal_lahir_wali = ref([]);
const jenjang = ref([]);
const penghasilan = ref([]);
const pekerjaan = ref([]);
const id_agama = ref('');
const id_jenis_tinggal = ref('');
const id_pendidikan_ayah = ref('');
const id_pekerjaan_ayah = ref('');
const id_penghasilan_ayah = ref('');
const id_pendidikan_ibu = ref('');
const id_pekerjaan_ibu = ref('');
const id_penghasilan_ibu = ref('');
const id_pendidikan_wali = ref('');
const id_pekerjaan_wali = ref('');
const id_penghasilan_wali = ref('');

const agamas = ref([]);
const sekolahs = ref([]);

const jenis_tinggal = ref([]);

const logoUrl = computed(() => {
    return `/layout/images/ubi.jpg`;
});

const getJenjang = async () => {
    try {
        const res = await getData('jenjang-pendidikan');
        if (res.status === 200) {
            const data = res.data.data;
            console.log('jenjang', data);
            jenjang.value = data;
        }
    } catch (error) {
        throw error;
    }
};
const getPenghasilan = async () => {
    try {
        const res = await getData('penghasilan');
        if (res.status === 200) {
            const data = res.data.data;
            console.log('pengahilsan', data);
            penghasilan.value = data;
        }
    } catch (error) {
        throw error;
    }
};
const getPekerjaan = async () => {
    try {
        const res = await getData('pekerjaan');
        if (res.status === 200) {
            const data = res.data.data;
            console.log('pekrjaan', data);
            pekerjaan.value = data;
        }
    } catch (error) {
        throw error;
    }
};
const getJenisTinggal = async () => {
    try {
        const res = await getData('jenis-tinggal/');
        if (res.status === 200) {
            const data = res.data.data;
            console.log('jenis tinggal', data);
            jenis_tinggal.value = data;
        }
    } catch (error) {
        throw error;
    }
};
const getAgama = async () => {
    try {
        const res = await getData('agama/');
        if (res.status === 200) {
            const data = res.data.data;
            console.log('agama', data);
            agamas.value = data;
        }
    } catch (error) {
        throw error;
    }
};

const getFotoProfile = async () => {
    try {
        const response = await getData('camaba/get-camaba-aktif');
        fotoProfile.value = response.data.data;

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Gagal mengambil data :', error);
    }
};

const getBiodata = async () => {
    try {
        const res = await getData('biodata-camaba/get-biodata-camaba-aktif');
        // console.log(res);
        if (res.status === 200) {
            const data = res.data.data;
            console.log('mhs', data);
            profil.value = res.data.data;
            nama_lengkap.value = data.Camaba?.nama_lengkap ?? '';
            tempat_lahir.value = data.Camaba?.tempat_lahir ?? '';
            tanggal_lahir.value = data.Camaba?.tanggal_lahir ?? '';
            jenis_kelamin.value = data.Camaba?.jenis_kelamin ?? '';
            nama_sekolah.value = data.Sekolah?.sekolah ?? '';
            id_sekolah.value = data.id_sekolah ?? '';
            nama_wilayah.value = data.Wilayah?.nama_wilayah ?? '';
            id_wilayah.value = data.id_wilayah ?? '';
            nik.value = data.nik ?? '';
            nisn.value = data.nisn ?? '';
            npwp.value = data.npwp ?? '';
            kewarganegaraan.value = data.kewarganegaraan ?? '';
            jalan.value = data.jalan ?? '';
            dusun.value = data.dusun ?? '';
            rt.value = data.rt ?? '';
            rw.value = data.rw ?? '';
            kelurahan.value = data.kelurahan ?? '';
            kode_pos.value = data.kode_pos ?? '';
            email.value = data.email ?? '';
            handphone.value = data.handphone ?? '';
            nik_ayah.value = data.nik_ayah ?? '';
            nama_ayah.value = data.nama_ayah ?? '';
            tanggal_lahir_ayah.value = data.tanggal_lahir_ayah ?? '';
            nik_ibu.value = data.nik_ibu ?? '';
            nama_ibu_kandung.value = data.nama_ibu_kandung ?? '';
            tanggal_lahir_ibu.value = data.tanggal_lahir_ibu ?? '';
            nama_wali.value = data.nama_wali ?? '';
            tanggal_lahir_wali.value = data.tanggal_lahir_wali ?? '';
            id_pendidikan_ayah.value = data.id_pendidikan_ayah ?? '';
            id_pekerjaan_ayah.value = data.id_pekerjaan_ayah ?? '';
            id_penghasilan_ayah.value = data.id_penghasilan_ayah ?? '';
            id_pendidikan_ibu.value = data.id_pendidikan_ibu ?? '';
            id_pekerjaan_ibu.value = data.id_pekerjaan_ibu ?? '';
            id_penghasilan_ibu.value = data.id_penghasilan_ibu ?? '';
            id_pendidikan_wali.value = data.id_pendidikan_wali ?? '';
            id_pekerjaan_wali.value = data.id_pekerjaan_wali ?? '';
            id_penghasilan_wali.value = data.id_penghasilan_wali ?? '';
            id_agama.value = data.id_agama ?? '';
            id_jenis_tinggal.value = data.id_jenis_tinggal ?? '';
        }
    } catch (error) {
        throw error;
    }
};
const updateBiodataCamaba = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();

        const payload = {
            nama_lengkap: nama_lengkap.value,
            tempat_lahir: tempat_lahir.value,
            tanggal_lahir: tanggal_lahir.value,
            jenis_kelamin: jenis_kelamin.value,
            email: email.value,
            id_agama: id_agama.value,
            nama_ibu_kandung: nama_ibu_kandung.value,
            nik: nik.value,
            nisn: nisn.value,
            npwp: npwp.value,
            kewarganegaraan: kewarganegaraan.value,
            jalan: jalan.value,
            dusun: dusun.value,
            rt: rt.value,
            rw: rw.value,
            kelurahan: kelurahan.value,
            id_wilayah: id_wilayah.value,
            kode_pos: kode_pos.value,
            handphone: handphone.value,
            id_jenis_tinggal: id_jenis_tinggal.value,
            id_sekolah: id_sekolah.value
        };

        const response = await axios.put(`${API_URL}/biodata-camaba/camaba-aktif/data-diri/update`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/biodata-pendaftar';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};
const updateBiodataOrtu = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = getToken();

        const payload = {
            nik_ayah: nik_ayah.value,
            nama_ayah: nama_ayah.value,
            tanggal_lahir_ayah: tanggal_lahir_ayah.value,
            id_pendidikan_ayah: id_pendidikan_ayah.value,
            id_pekerjaan_ayah: id_pekerjaan_ayah.value,
            id_penghasilan_ayah: id_penghasilan_ayah.value,
            nik_ibu: nik_ibu.value,
            tanggal_lahir_ibu: tanggal_lahir_ibu.value,
            id_pendidikan_ibu: id_pendidikan_ibu.value,
            id_pekerjaan_ibu: id_pekerjaan_ibu.value,
            id_penghasilan_ibu: id_penghasilan_ibu.value,
            nama_wali: nama_wali.value,
            tanggal_lahir_wali: tanggal_lahir_wali.value,
            id_pendidikan_wali: id_pendidikan_wali.value,
            id_pekerjaan_wali: id_pekerjaan_wali.value,
            id_penghasilan_wali: id_penghasilan_wali.value
        };

        const response = await axios.put(`${API_URL}/biodata-camaba/camaba-aktif/data-ortu/update`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.href = '/biodata-pendaftar';
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

onMounted(() => {
    getFotoProfile();
    getBiodata();
    getJenjang();
    getPekerjaan();
    getPenghasilan();
    getJenisTinggal();
    getAgama();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h5><i class="pi pi-user me-2"></i>BIODATA DIRI</h5>
            <hr />
            <div class="row">
                <div class="col-md-12">
                    <div class="d-flex align-items-center justify-content-center">
                        <img class="rounded-circle" alt="User Image" :src="`${fotoProfile?.foto_profil}`" width="10%" />
                    </div>
                    <div class="text-center mt-3">
                        <h4>{{ profil?.Camaba?.nama_lengkap }}</h4>
                        <h6>{{ profil?.Camaba?.nomor_daftar }}</h6>
                        <h6>UMUM | REGULER</h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-8">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="data-user" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Data Pribadi</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="data-wali" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Data Orangtua</button>
                                </li>
                            </ul>
                        </div>
                        <div class="col-4">
                            <div div class="flex justify-content-end gap-2">
                                <router-link to="/biodata-pendaftar-cetak" class="btn btn-secondary"> <i class="pi pi-print me-2"></i> Cetak Biodata</router-link>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="data-user">
                            <!-- data mahasiswa -->
                            <div class="row mt-4 mb-4">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div div class="flex justify-content-end gap-2">
                                        <button @click="updateBiodataCamaba" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</button>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="row">
                                    <div class="col-lg-2">No Pendaftaran</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.Camaba?.nomor_daftar }}</div>
                                    <div class="col-lg-2">Tanggal Pendaftaran</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.Camaba?.tanggal_pendaftaran }}</div>
                                </div>
                                <div class="mb-3 mt-4 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nama Lengkap</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nama_lengkap" id="inputPassword" required />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                                    <div class="col-sm-4">
                                        <select class="form-select" id="jenis_kelamin" v-model="jenis_kelamin">
                                            <option selected disabled hidden>-- Pilih Jenis Kelamin --</option>
                                            <option value="Laki-laki">Laki-laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Tempat Lahir</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="tempat_lahir" id="inputPassword" required />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Agama</label>
                                    <div class="col-sm-4">
                                        <select class="form-select" id="id_agama" v-model="id_agama">
                                            <option selected disabled hidden>--Pilih Agama--</option>
                                            <option v-for="item in agamas" :key="item.id_agama" :value="item.id_agama">{{ item.nama_agama }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                                    <div class="col-sm-4">
                                        <input type="date" class="form-control" v-model="tanggal_lahir" id="inputPassword" />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nama Ibu Kandung</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nama_ibu_kandung" id="inputPassword" required />
                                    </div>
                                </div>
                                <hr />
                                <div class="row d-flex mt-3">
                                    <h5>Data Lainnya</h5>
                                </div>
                                <div class="mb-3 mt-4 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NIK</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nik" id="inputPassword" required />
                                        <span>(No KTP Tanpa Tanda Baca )</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NISN</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nisn" id="inputPassword" required />
                                        <span>(No NISN Tanpa Tanda Baca )</span>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NPWP</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="npwp" id="inputPassword" />
                                        <span>(Maksimal NPWP 15 digit & harus angka)</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">KWN</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="kewarganegaraan" id="inputPassword" required />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Jalan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="jalan" id="inputPassword" required />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Dusun</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="dusun" id="inputPassword" required />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RT</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="rt" id="inputPassword" required />
                                        <span>(Input harus angka)</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RW</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="rw" id="inputPassword" required />
                                        <span>(Input harus angka)</span>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Kelurahan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="kelurahan" id="inputPassword" required />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">KodePos</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="kode_pos" id="inputPassword" required />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Kecamatan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nama_wilayah" id="inputPassword" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="email" id="inputPassword" required />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Telepon</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="handphone" id="inputPassword" required />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Jenis Tinggal</label>
                                    <div class="col-sm-4">
                                        <select class="form-select" id="jenis_tinggal" v-model="id_jenis_tinggal">
                                            <option selected disabled hidden>-- Pilih Jenis Tinggal--</option>
                                            <option v-for="item in jenis_tinggal" :key="item.id_jenis_tinggal" :value="item.id_jenis_tinggal">{{ item.nama_jenis_tinggal }}</option>
                                        </select>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Asal SMA/SMK</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nama_sekolah" id="inputPassword" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- data orang tua -->
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div div class="flex justify-content-end gap-2">
                                        <button @click="updateBiodataOrtu" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</button>
                                    </div>
                                </div>
                                <p><b>Data Ayah</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIK Ayah</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nik_ayah" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Ayah</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_ayah" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_pendidikan_ayah" v-model="id_pendidikan_ayah">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_pekerjaan_ayah" v-model="id_pekerjaan_ayah">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_penghasilan_ayah" v-model="id_penghasilan_ayah">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Data Ibu</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIK Ibu</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nik_ibu" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Ibu</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ibu_kandung" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_ibu" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_pendidikan_ibu" v-model="id_pendidikan_ibu">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="pekerjaan" v-model="id_pekerjaan_ibu">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_penghasilan_ibu" v-model="id_penghasilan_ibu">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-2 row">
                                <p><b>Data Wali</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Wali</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_wali" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-8">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_wali" id="inputPassword" required />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pendidikan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_pendidikan_wali" v-model="id_pendidikan_wali">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Pekerjaan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_pekerjaan_wali" v-model="id_pekerjaan_wali">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Penghasilan</label>
                                <div class="col-sm-8">
                                    <select class="form-select" id="id_penghasilan_wali" v-model="id_penghasilan_wali">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
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
