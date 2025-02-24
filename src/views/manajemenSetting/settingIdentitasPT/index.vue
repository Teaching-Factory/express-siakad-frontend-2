<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import vSelect from 'vue-select';
import axios from 'axios';
import { API_URL } from '../../../config/config';
import { getToken } from '../../../service/auth';
import Swal from 'sweetalert2';

const pt = ref([]);

const nama_perguruan_tinggi = ref('');
const foto_profil_pt = ref('');
const email = ref('');
const telepon = ref('');
const faximile = ref('');
const website = ref('');
const dusun = ref('');
const jalan = ref('');
const rt_rw = ref('');
const kelurahan = ref('');
const kode_pos = ref('');
const lintang_bujur = ref('');
const bank = ref('');
const unit_cabang = ref('');
const mbs = ref('');
const luas_tanah_milik = ref('');
const luas_tanah_bukan_milik = ref('');
const nama_status_milik = ref('');
const id_status_milik = ref('');
const sk_pendirian = ref('');
const tanggal_sk_pendirian = ref('');
const status_perguruan_tinggi = ref('');
const sk_izin_operasional = ref('');
const nomor_rekening = ref('');
const tanggal_izin_operasional = ref('');

const getPerguruanTinggi = async () => {
    try {
        const res = await getData('perguruan-tinggi');
        console.log('pt', res.data);
        if (res.status === 200) {
            pt.value = res.data.data.map((item) => ({
                value: item.nama_perguruan_tinggi
                // value: item.nama_perguruan_tinggi
            }));
        }
    } catch (error) {
        throw error;
    }
};

const getIdentitasPt = async () => {
    try {
        const res = await getData('profil-pt');
        if (res.status === 200) {
            const data = res.data.data;
            nama_perguruan_tinggi.value = data[0].PerguruanTinggi.nama_perguruan_tinggi;
            // foto_profil_pt.value = data[0].foto_profil_pt;
            email.value = data[0].email;
            telepon.value = data[0].telepon;
            faximile.value = data[0].faximile;
            website.value = data[0].website;
            jalan.value = data[0].jalan;
            dusun.value = data[0].dusun;
            rt_rw.value = data[0].rt_rw;
            kelurahan.value = data[0].kelurahan;
            kode_pos.value = data[0].kode_pos;
            tanggal_izin_operasional.value = data[0].tanggal_izin_operasional;
            lintang_bujur.value = data[0].lintang_bujur;
            bank.value = data[0].bank;
            unit_cabang.value = data[0].unit_cabang;
            mbs.value = data[0].mbs;
            nomor_rekening.value = data[0].nomor_rekening;
            luas_tanah_milik.value = data[0].luas_tanah_milik;
            luas_tanah_bukan_milik.value = data[0].luas_tanah_bukan_milik;
            nama_status_milik.value = data[0].nama_status_milik;
            id_status_milik.value = data[0].id_status_milik;
            sk_pendirian.value = data[0].sk_pendirian;
            tanggal_sk_pendirian.value = data[0].tanggal_sk_pendirian;
            status_perguruan_tinggi.value = data[0].status_perguruan_tinggi;
            sk_izin_operasional.value = data[0].sk_izin_operasional;
        }
    } catch (error) {
        throw error;
    }
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 1 * 10240 * 10240; // 1MB in bytes

    if (!validTypes.includes(file.type)) {
        Swal.fire('GAGAL', 'File harus berjenis jpg, jpeg, atau png.', 'error');
        foto_profil_pt.value = null;
        return;
    }

    if (file.size > maxSize) {
        Swal.fire('GAGAL', 'Ukuran file tidak boleh lebih dari 10 MB.', 'error');
        foto_profil_pt.value = null;
        return;
    }

    foto_profil_pt.value = file;
};

const updateProfilePt = async () => {
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

        const formData = new FormData();
        // Tambahkan data ke formData
        formData.append('foto_profil_pt', foto_profil_pt.value);
        formData.append('nama_perguruan_tinggi', nama_perguruan_tinggi.value);
        formData.append('telepon', telepon.value);
        formData.append('faximile', faximile.value);
        formData.append('email', email.value);
        formData.append('website', website.value);
        formData.append('jalan', jalan.value);
        formData.append('kode_pos', kode_pos.value);

        const response = await axios.put(`${API_URL}/profil-pt/update-profil-pt-active`, formData, {
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
onMounted(() => {
    getIdentitasPt();
    getPerguruanTinggi();
});
</script>
<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>SETTING IDENTITAS PERGURUAN TINGGI</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button @click="updateProfilePt" class="btn btn-primary me-2"><i class="pi pi-save mr-2"></i> Simpan</button>
                        <button class="btn btn-danger"><i class="pi pi-times mr-2"></i> Batal</button>
                    </div>
                </div>
            </div>
            <hr />

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Logo Perguruan Tinggi <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input @change="handleFileUpload" type="file" class="form-control" title="Upload logo disini" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Nama Perguruan Tinggi <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="nama_perguruan_tinggi" />
                </div>
                <!-- <div class="col-lg-6">
                    <v-select v-model="nama_perguruan_tinggi" :options="pt"></v-select>
                </div> -->
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Telepon <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="telepon" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Faximile <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="faximile" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Email <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="email" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Website <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="website" />
                </div>
            </div>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Jalan <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="jalan" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kode Pos <span class="text-danger">*</span></label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="kode_pos" />
                </div>
            </div>
            <!-- <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Dusun</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="dusun" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">RT/RW</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="rt_rw" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kelurahan</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="kelurahan" />
                </div>
            </div> -->

            <!-- <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Lintang Bujur</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="lintang_bujur" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Bank</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="bank" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Unit Cabang</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="unit_cabang" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">No. Rekening</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="nomor_rekening" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">MBS</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="mbs" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Luas Tanah Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="luas_tanah_milik" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Luas Tanah Bukan Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="luas_tanah_bukan_milik" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">SK Pendirian</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="sk_pendirian" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal SK Pendirian</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="tanggal_sk_pendirian" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">ID Status Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="id_status_milik" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Nama Status Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="nama_status_milik" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Status Perguruan Tinggi</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="status_perguruan_tinggi" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">SK Izin Operasional</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="sk_izin_operasional" />
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Izin Operasional</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="tanggal_izin_operasional" />
                </div>
            </div> -->
        </div>
    </div>
</template>