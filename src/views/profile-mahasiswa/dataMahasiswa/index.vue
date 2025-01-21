<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
import { API_URL } from '../../../config/config';
import axios from 'axios';
import { getToken } from '../../../service/auth';
import Swal from 'sweetalert2';
const profil = ref([]);

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
const nama_wilayah = ref([]);
const email = ref([]);
const handphone = ref([]);
const nik_ayah = ref('');
const nama_ayah = ref([]);
const tanggal_lahir_ayah = ref([]);
const nik_ibu = ref('');
const nama_ibu_kandung = ref([]);
const tanggal_lahir_ibu = ref([]);
const nama_wali = ref([]);
const tanggal_lahir_wali = ref([]);

const jenjang = ref([]);
const penghasilan = ref([]);
const pekerjaan = ref([]);
const tempat_lahir = ref([]);
const id_pendidikan_ayah = ref('');
const id_pekerjaan_ayah = ref('');
const id_penghasilan_ayah = ref('');
const id_pendidikan_ibu = ref('');
const id_pekerjaan_ibu = ref('');
const id_penghasilan_ibu = ref('');
const id_pendidikan_wali = ref('');
const id_pekerjaan_wali = ref('');
const id_penghasilan_wali = ref('');

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

const getBiodata = async () => {
    try {
        const res = await getData('biodata-mahasiswa/get-biodata-mahasiswa-active');
        // console.log(res);
        if (res.status === 200) {
            const data = res.data;
            console.log('mhs', data);
            profil.value = data;
            tempat_lahir.value = data.dataBiodataMahasiswa.tempat_lahir ?? '-';
            nik.value = data.dataBiodataMahasiswa.nik ?? '-';
            nisn.value = data.dataBiodataMahasiswa.nisn ?? '-';
            npwp.value = data.dataBiodataMahasiswa.npwp ?? '-';
            kewarganegaraan.value = data.dataBiodataMahasiswa.kewarganegaraan ?? '-';
            jalan.value = data.dataBiodataMahasiswa.jalan ?? '-';
            dusun.value = data.dataBiodataMahasiswa.dusun ?? '-';
            rt.value = data.dataBiodataMahasiswa.rt ?? '-';
            rw.value = data.dataBiodataMahasiswa.rw ?? '-';
            kelurahan.value = data.dataBiodataMahasiswa.kelurahan ?? '-';
            kode_pos.value = data.dataBiodataMahasiswa.kode_pos ?? '-';
            nama_wilayah.value = data.dataBiodataMahasiswa.Wilayah.nama_wilayah ?? '-';
            email.value = data.dataBiodataMahasiswa.email ?? '-';
            handphone.value = data.dataBiodataMahasiswa.handphone ?? '-';
            nik_ayah.value = data.dataBiodataMahasiswa.nik_ayah ?? '-';
            nama_ayah.value = data.dataBiodataMahasiswa.nama_ayah ?? '-';
            tanggal_lahir_ayah.value = data.dataBiodataMahasiswa.tanggal_lahir_ayah ?? '-';
            nik_ibu.value = data.dataBiodataMahasiswa.nik_ibu ?? '-';
            nama_ibu_kandung.value = data.dataBiodataMahasiswa.nama_ibu_kandung ?? '-';
            tanggal_lahir_ibu.value = data.dataBiodataMahasiswa.tanggal_lahir_ibu ?? '-';
            nama_wali.value = data.dataBiodataMahasiswa.nama_wali ?? '-';
            tanggal_lahir_wali.value = data.dataBiodataMahasiswa.tanggal_lahir_wali ?? '-';
            id_pekerjaan_ayah.value = data.dataBiodataMahasiswa.id_pekerjaan_ayah ?? '-';
            id_pekerjaan_ibu.value = data.dataBiodataMahasiswa.id_pekerjaan_ibu ?? '-';
            id_pekerjaan_wali.value = data.dataBiodataMahasiswa.id_pekerjaan_wali ?? '-';
            id_pendidikan_ayah.value = data.dataBiodataMahasiswa.id_pendidikan_ayah ?? '-';
            id_pendidikan_ibu.value = data.dataBiodataMahasiswa.id_pendidikan_ibu ?? '-';
            id_pendidikan_wali.value = data.dataBiodataMahasiswa.id_pendidikan_wali ?? '-';
            id_penghasilan_ayah.value = data.dataBiodataMahasiswa.id_penghasilan_ayah ?? '-';
            id_penghasilan_ibu.value = data.dataBiodataMahasiswa.id_penghasilan_ibu ?? '-';
            id_penghasilan_wali.value = data.dataBiodataMahasiswa.id_penghasilan_wali ?? '-';
        }
    } catch (error) {
        throw error;
    }
};

const updateBiodataMahasiswa = async () => {
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
            tempat_lahir: tempat_lahir.value,
            nik: nik.value,
            nisn: nisn.value,
            npwp: npwp.value,
            kewarganegaraan: kewarganegaraan.value,
            jalan: jalan.value,
            dusun: dusun.value,
            rt: rt.value,
            rw: rw.value,
            kelurahan: kelurahan.value,
            kode_pos: kode_pos.value,
            telepon: handphone.value,
            handphone: handphone.value,
            email: email.value,
            penerima_kps: '0',
            nomor_kps: null,
            nik_ayah: nik_ayah.value,
            nama_ayah: nama_ayah.value,
            tanggal_lahir_ayah: tanggal_lahir_ayah.value,
            nik_ibu: nik_ibu.value,
            nama_ibu_kandung: nama_ibu_kandung.value,
            tanggal_lahir_ibu: tanggal_lahir_ibu.value,
            nama_wali: nama_wali.value,
            tanggal_lahir_wali: tanggal_lahir_wali.value,
            id_jenis_tinggal: '1',
            id_alat_transportasi: '13',
            id_pendidikan_ayah: id_pendidikan_ayah.value,
            id_pekerjaan_ayah: id_pekerjaan_ayah.value,
            id_penghasilan_ayah: id_penghasilan_ayah.value,
            id_pendidikan_ibu: id_pendidikan_ibu.value,
            id_pekerjaan_ibu: id_pekerjaan_ibu.value,
            id_penghasilan_ibu: id_penghasilan_ibu.value,
            id_pendidikan_wali: id_pendidikan_wali.value,
            id_pekerjaan_wali: id_pekerjaan_wali.value,
            id_penghasilan_wali: id_penghasilan_wali.value
        };

        const response = await axios.put(`${API_URL}/biodata-mahasiswa/update-biodata-mahasiswa-active`, payload, {
            headers: {
                Authorization: token
            }
        });

        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        Swal.close();
        console.error('Error updating data:', error.response ? error.response.data : error.message);
        Swal.fire('GAGAL', `Gagal memperbarui data: ${error.response ? error.response.data.message : error.message}`, 'error');
    }
};

const formatTanggal = (tanggal) => {
    if (!tanggal || typeof tanggal !== 'string') {
        console.error('Input tanggal tidak valid:', tanggal);
        return 'Tanggal tidak tersedia';
    }

    const date = new Date(tanggal.trim()); // Trim untuk memastikan tidak ada spasi
    if (isNaN(date.getTime())) {
        console.error('Gagal memproses tanggal:', tanggal);
        return 'Tanggal tidak valid';
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('id-ID', options).format(date);
};
onMounted(() => {
    getBiodata();
    getJenjang();
    getPekerjaan();
    getPenghasilan();
});
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-12">
                    <div class="d-flex align-items-center justify-content-center">
                        <img class="rounded-circle" alt="User Image" src="../../../../public/ubi.png" width="20%" />
                    </div>
                    <div class="text-center">
                        <h1>{{ profil.dataMahasiswa?.nama_mahasiswa }}</h1>
                        <h5>{{ profil.dataMahasiswa?.nim }} - {{ profil.dataMahasiswa?.Prodi?.nama_program_studi }}</h5>
                        <!-- <button class="btn btn-primary">Dikeluarkan</button> -->
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
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Data Pribadi</button>
                        </li>
                    </ul>

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="data-user">
                            <!-- data mahasiswa -->
                            <div class="row mt-4 mb-4">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div div class="flex justify-content-end gap-2">
                                        <button @click="updateBiodataMahasiswa" class="btn btn-primary"><i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</button>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="row">
                                    <div class="col-lg-2">Nama</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.dataMahasiswa?.nama_mahasiswa }}</div>
                                    <div class="col-lg-2">Nama Ibu Kandung</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.dataBiodataMahasiswa?.nama_ibu_kandung }}</div>
                                </div>

                                <div class="row">
                                    <div class="col-lg-2">Jenis Kelamin</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.dataMahasiswa?.jenis_kelamin === 'P' ? 'Perempuan' : 'Laki-laki' }}</div>
                                    <div class="col-lg-2">Agama</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ profil.dataMahasiswa?.Agama?.nama_agama }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-2">Tempat Lahir</div>
                                    <div class="col-lg-4"><input type="text" class="form-control" v-model="tempat_lahir" id="inputPassword" /></div>
                                    <div class="col-lg-2">Tanggal Lahir</div>
                                    <div class="col-lg-4"><span class="me-2">:</span> {{ formatTanggal(profil.dataMahasiswa?.tanggal_lahir) }}</div>
                                </div>
                                <div class="mb-3 mt-4 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NIK</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nik" id="inputPassword" />
                                        <span>(No KTP Tanpa Tanda Baca )</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">NISN</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="nisn" id="inputPassword" />
                                        <span>(No KTP Tanpa Tanda Baca )</span>
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
                                        <input type="text" class="form-control" v-model="kewarganegaraan" id="inputPassword" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Jalan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="jalan" id="inputPassword" />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Dusun</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="dusun" id="inputPassword" />
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RT</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="rt" id="inputPassword" />
                                        <span>(Input harus angka)</span>
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">RW</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="rw" id="inputPassword" />
                                        <span>(Input harus angka)</span>
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Kelurahan</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="kelurahan" id="inputPassword" />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">KodePos</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="kode_pos" id="inputPassword" />
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
                                        <input type="text" class="form-control" v-model="email" id="inputPassword" />
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Telepon</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="handphone" id="inputPassword" />
                                    </div>
                                </div>
                                <!-- <div class="mb-3 row">
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nama Bank</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                    <label for="inputPassword" class="col-sm-2 col-form-label">Nomor Rekening</label>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" id="inputPassword">
                                    </div>
                                </div> -->
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Ayah</b></p>
                                <label for="inputPassword" class="col-sm-2 col-form-label">NIK Ayah</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="nik_ayah" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama Ayah</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_ayah" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pendidikan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_pendidikan_ayah" v-model="id_pendidikan_ayah">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pekerjaan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_pekerjaan_ayah" v-model="id_pekerjaan_ayah">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Penghasilan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_penghasilan_ayah" v-model="id_penghasilan_ayah">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Ibu</b></p>
                                <label for="inputPassword" class="col-sm-2 col-form-label">NIK Ibu</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="nik_ibu" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama Ibu</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="nama_ibu_kandung" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_ibu" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pendidikan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_pendidikan_ibu" v-model="id_pendidikan_ibu">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pekerjaan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="pekerjaan" v-model="id_pekerjaan_ibu">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Penghasilan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_penghasilan_ibu" v-model="id_penghasilan_ibu">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="mb-3 mt-2 row">
                                <p><b>Wali</b></p>
                                <label for="inputPassword" class="col-sm-2 col-form-label">Nama Wali</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" v-model="nama_wali" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                                <div class="col-sm-10">
                                    <input type="date" class="form-control" v-model="tanggal_lahir_wali" id="inputPassword" />
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pendidikan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_pendidikan_wali" v-model="id_pendidikan_wali">
                                        <option selected disabled hidden>--Pilih Jenjang--</option>
                                        <option v-for="item in jenjang" :key="item.id_jenjang_didik" :value="item.id_jenjang_didik">{{ item.nama_jenjang_didik }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Pekerjaan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_pekerjaan_wali" v-model="id_pekerjaan_wali">
                                        <option selected disabled hidden>--Pilih Pekerjaan--</option>
                                        <option v-for="item in pekerjaan" :key="item.id_pekerjaan" :value="item.id_pekerjaan">{{ item.nama_pekerjaan }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Penghasilan</label>
                                <div class="col-sm-10">
                                    <select class="form-select" id="id_penghasilan_wali" v-model="id_penghasilan_wali">
                                        <option selected disabled hidden>--Pilih Penghasilan--</option>
                                        <option v-for="item in penghasilan" :key="item.id_penghasilan" :value="item.id_penghasilan">{{ item.nama_penghasilan }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- data orang tua -->
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
