<script>
import Swal from 'sweetalert2';
import { postData } from '../../../utiils/request';

</script>


<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>FINALISASI DATA PENDAFTAR</h5>
        <div class="card">
            <div class="row">
                <div class="col-md-12">
                    <p>Pastikan anda telah memeriksa kembali semua data yang telah anda masukkan sebelum melakukan finalisasi data</p>
                    <ul>
                    <li>Sebelum melakukan finalisasi data, mohon periksa kembali semua data yang telah Anda masukkan.</li>
                    <li>Setelah anda melakukan finalisasi data, semua data (Identitas, Pilihan Prodi, Foto dan Dokumen) tidak dapat diubah kembali dan dianggap sebagai data yang benar.</li>
                    <li>Apabila ditemukan ketidak sesuaian data yang telah Anda masukkan maka pendaftaran dapat dibatalkan sewaktu-waktu tanpa adanya pemberitahuan.</li>
                    </ul>

                    <div class="form-check my-4">
                        <input type="checkbox" class="form-check-input" id="confirmCheck" v-model="isAgreed" />
                        <label class="form-check-label" for="confirmCheck">
                            Saya menyetujui dan menyatakan bahwa semua data yang telah saya isikan adalah BENAR dan dapat dipertanggungjawabkan.
                        </label>
                    </div>
                    <button class="btn btn-primary" :disabled="!isAgreed" @click="finalizeData">Setuju</button>
                </div>
            </div>
        </div>
    </div>
</template>
