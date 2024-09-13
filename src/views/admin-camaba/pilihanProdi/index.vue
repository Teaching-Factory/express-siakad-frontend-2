<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';
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


const getJenjang = async () => {
    try {
        const res = await getData('jenjang-pendidikan');
        if(res.status === 200) {
            const data = res.data.data
            console.log('jenjang', data);
            jenjang.value = data.nama_jenjang_didik;
        }
    } catch (error) {
        throw error
    }
}
const getPenghasilan = async () => {
    try {
        const res = await getData('penghasilan');
        if(res.status === 200) {
            const data = res.data.data
            console.log('pengahilsan', data);
            penghasilan.value = data.nama_penghasilan;
        }
    } catch (error) {
        throw error
    }
}
const getPekerjaan = async () => {
    try {
        const res = await getData('pekerjaan');
        if(res.status === 200) {
            const data = res.data.data
            console.log('pekrjaan', data);
            pekerjaan.value = data.nama_pekerjaan;
        }
    } catch (error) {
        throw error
    }
}

const getBiodata = async () => {
    try {
        const res =  await getData('biodata-mahasiswa/get-biodata-mahasiswa-active');
        // console.log(res);
        if(res.status === 200) {
            const data = res.data
            console.log('mhs', data);
            profil.value = data;
            nik.value = data.dataBiodataMahasiswa.nik ?? '-'
            nisn.value = data.dataBiodataMahasiswa.nisn ?? '-'
            npwp.value = data.dataBiodataMahasiswa.npwp ?? '-'
            kewarganegaraan.value = data.dataBiodataMahasiswa.kewarganegaraan ?? '-'
            jalan.value = data.dataBiodataMahasiswa.jalan ?? '-'
            dusun.value = data.dataBiodataMahasiswa.dusun ?? '-'
            rt.value = data.dataBiodataMahasiswa.rt ?? '-'
            rw.value = data.dataBiodataMahasiswa.rw ?? '-'
            kelurahan.value = data.dataBiodataMahasiswa.kelurahan ?? '-'
            kode_pos.value = data.dataBiodataMahasiswa.kode_pos ?? '-'
            nama_wilayah.value = data.dataBiodataMahasiswa.Wilayah.nama_wilayah ?? '-'
            email.value = data.dataBiodataMahasiswa.email ?? '-'
            handphone.value = data.dataBiodataMahasiswa.handphone ?? '-'

            nik_ayah.value = data.dataBiodataMahasiswa.nik_ayah ?? '-'
            nama_ayah.value = data.dataBiodataMahasiswa.nama_ayah ?? '-'
            tanggal_lahir_ayah.value = data.dataBiodataMahasiswa.tanggal_lahir_ayah ?? '-'
            nik_ibu.value = data.dataBiodataMahasiswa.nik_ibu ?? '-'
            nama_ibu_kandung.value = data.dataBiodataMahasiswa.nama_ibu_kandung ?? '-'
            tanggal_lahir_ibu.value = data.dataBiodataMahasiswa.tanggal_lahir_ibu ?? '-'
            nama_wali.value = data.dataBiodataMahasiswa.nama_wali ?? '-'
            tanggal_lahir_wali.value = data.dataBiodataMahasiswa.tanggal_lahir_wali ?? '-'
            id_pekerjaan_ayah.value = data.dataBiodataMahasiswa.id_pekerjaan_ayah ?? '-'
            id_pekerjaan_ibu.value = data.dataBiodataMahasiswa.id_pekerjaan_ibu ?? '-'
        }
    } catch (error) {
        throw error
    }
}

onMounted(()=> {
    getBiodata();
    getJenjang();
    getPekerjaan();
    getPenghasilan();
})

</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5><i class="pi pi-user me-2"></i>PROGRAM STUDI YANG DIPILIH</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <div class="flex justify-content-end gap-2">
                        <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-12 mb-4">
                    <label for="inputPassword" class="col-sm-4 col-form-label">Pilihan 1</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Program Studi--</option>
                        <option value="1">D4 - Teknologi Rekayasa Perangkat Lunak</option>
                        <option value="2">D4 - Bisnis Digital</option>
                    </select>
                </div>
                <div class="col-sm-12 mt-4">
                    <label for="inputPassword" class="col-sm-4 col-form-label">Pilihan 2</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected disabled hidden>-- Pilih Program Studi--</option>
                        <option value="1">D4 - Teknologi Rekayasa Perangkat Lunak</option>
                        <option value="2">D4 - Bisnis Digital</option>
                    </select>
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
