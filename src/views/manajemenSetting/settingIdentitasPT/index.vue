<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import vSelect from 'vue-select';

const pt = ref([]);

const id_perguruan_tinggi = ref('')
const email = ref('') 
const telepon = ref('') 
const faximile = ref('') 
const website = ref('') 
const dusun = ref('') 
const jalan = ref('') 
const rt_rw = ref('') 
const kelurahan = ref('') 
const kode_pos = ref('') 
const lintang_bujur = ref('') 
const bank = ref('') 
const unit_cabang = ref('') 
const mbs = ref('') 
const luas_tanah_milik = ref('') 
const luas_tanah_bukan_milik = ref('') 
const nama_status_milik = ref('') 
const id_status_milik = ref('') 
const sk_pendirian = ref('') 
const tanggal_sk_pendirian = ref('') 
const status_perguruan_tinggi = ref('') 
const sk_izin_operasional = ref('') 
const nomor_rekening = ref('') 
const tanggal_izin_operasional = ref('') 

const getPerguruanTinggi = async () => {
    try {
        const res = await getData('perguruan-tinggi');
        console.log('pt', res.data);
        if (res.status === 200) {
            pt.value = res.data.data.map(item =>  ({
                value: item.id_perguruan_tinggi,
                value: item.nama_perguruan_tinggi
            }));
        }
    } catch(error) {
        throw error
    }
}

const getIdentitasPt = async () => {
    try {
        const res = await getData('profil-pt');
        if(res.status === 200) {
            const data = res.data.data;
            id_perguruan_tinggi.value = data[0].PerguruanTinggi.nama_perguruan_tinggi;
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
    } catch(error) {
        throw error
    }
}

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
                    <h5><i class="pi pi-user me-2"></i>SETTING  IDENTITAS PERGURUAN TINGGI</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                        <button class="btn btn-danger"> <i class="pi pi-times mr-2"></i> Batal</button>
                    </div>
                </div>
            </div>
            <hr>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Logo Perguruan Tinggi</label>
                </div>
                <div class="col-lg-6">
                <input type="file" class="form-control">    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Perguruan Tinggi</label>
                </div>
                <div class="col-lg-6">
                    <v-select v-model="id_perguruan_tinggi" :options="pt"></v-select>
                    <!-- <select class="form-select" aria-label="Default select example" v-model="id_perguruan_tinggi"> -->
                        <!-- <option selected disabled hidden>-- Pilih Perguruan Tinggi--</option>
                        <option v-for="perguruanTinggi in pt" :key="perguruanTinggi.id_perguruan_tinggi" :value="perguruanTinggi.id_perguruan_tinggi">
                            {{ perguruanTinggi.nama_perguruan_tinggi }}
                        </option> -->
                    <!-- </select> -->
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Telepon</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="telepon" >
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Faximile</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="faximile">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="email" >
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Website</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="website" >
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Wilayah</label>
                </div>
                <div class="col-lg-6">
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Wilayah--</option>
                        <option value="1">--</option>
                        <option value="2">--</option>
                    </select>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Jalan</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="jalan" >
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Dusun</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="dusun" >
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">RT/RW</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="rt_rw">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kelurahan</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="kelurahan">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kode Pos</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="kode_pos">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Lintang Bujur</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="lintang_bujur">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Bank</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="bank">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Unit Cabang</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="unit_cabang">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">No. Rekening</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="nomor_rekening">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">MBS</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="mbs">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Luas Tanah Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="luas_tanah_milik">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Luas Tanah Bukan Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="luas_tanah_bukan_milik">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">SK Pendirian</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="sk_pendirian">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal SK Pendirian</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="tanggal_sk_pendirian">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">ID Status Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="id_status_milik">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Nama Status Milik</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="nama_status_milik">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Status Perguruan Tinggi</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="status_perguruan_tinggi">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">SK Izin Operasional</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="sk_izin_operasional">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Izin Operasional</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" v-model="tanggal_izin_operasional">
                </div>
            </div>        
        </div>
    </div>
</template>