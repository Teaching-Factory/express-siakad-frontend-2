<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { get, postData, putData } from '../../../utiils/request';
import { onMounted } from 'vue';
const router = useRouter();
const route = useRoute();
const nama_jenis_tagihan = ref('');
const status = ref('');
const loading = ref(false);
const formMode = ref('create');

const fetchDataForUpdate = async () => {
    try {
        const res = await get(`jenis-tagihan/${route.params.id}/get`);
        console.log('data', res.data.data.nama_jenis_tagihan);
        if (res.status === 200 ) {
            const data =  res.data.data
            nama_jenis_tagihan.value = data.nama_jenis_tagihan;
            status.value = data.status;
            formMode.value = 'update';
        } else {
            throw new Error('Gagal')
        }
    } catch (error) {
        throw error
    }
}

const submit = async () => {
    try {
        loading.value = true;
        let res;
        if(formMode.value === 'create') {
            res = await postData('jenis-tagihan/create', {
                nama_jenis_tagihan: nama_jenis_tagihan.value,
                status: status.value,
            });
        } else if(formMode.value = 'update' &&  route.params.id) {
            res = await putData(`jenis-tagihan/${route.params.id}/update`, {
                nama_jenis_tagihan: nama_jenis_tagihan.value,
                status: status.value,
            });
        }

        const data = res.data;
        if(res.status == 201 || res.status == 200  ) {
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                text: `Jenis Tagihan berhasil ${formMode.value === 'create' ? 'ditambahkan' : 'diperbarui'}`
            }).then(() => {
                router.push('/jenis-tagihan')
            });
        }
    } catch (error) {
        console.error('Error');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat membuat data',
        });
    } finally{
        loading.value = false;
    }
}

onMounted(() => {
    if(route.params.id)  {
        fetchDataForUpdate();
    }
})

</script>

<template>
    <div class="card">
        <form @submit.prevent="submit">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>{{formMode === 'create' ? 'TAMBAH' : 'EDIT' }} JENIS TAGIHAN</h5>
                </div>
                <div class="col-lg-8 d-flex justify-content-end">
                    <router-link to="/jenis-tagihan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                    <button type="submit" class="btn btn-success me-2" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span v-else><i class="pi pi-check me-2"></i> {{ formMode === 'create' ? 'Simpan' : 'Update' }}</span>
                    </button>
                    <!-- <button type="reset" class="btn btn-danger" ><i class="pi pi-refresh me-2"></i> Reset</button> -->
                </div>
            </div>
            <hr />
            <div class="mb-3 row d-flex justify-content-center">
                <label for="namaJenisTagihan" class="col-sm-2 col-form-label">Nama Jenis Tagihan </label>
                <div class="col-md-8">
                    <input type="text" class="form-control" id="namaJenisTagihan" v-model="nama_jenis_tagihan"  />
                </div>
            </div>
            <div class="mb-3 row d-flex justify-content-center">
                <label for="status" class="col-sm-2 col-form-label">Status</label>
                <div class="col-md-8">
                <select class="form-select" id="status" v-model="status">
                    <option value="true">Aktif</option>
                    <option value="false">Tidak Aktif</option>
                </select>
                </div>
            </div>
        </form>
    </div>
</template>