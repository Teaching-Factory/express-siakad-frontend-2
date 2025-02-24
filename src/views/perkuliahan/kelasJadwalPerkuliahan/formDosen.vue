<script setup>
import Swal from 'sweetalert2';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import Modal from '../../../components/Modal.vue';
// import Modal from '../../../../components/Modal.vue';
import vSelect from 'vue-select';
import { del, getData } from '../../../utiils/request';
import { getToken } from '../../../service/auth';
import axios from 'axios';
import { API_URL } from '../../../config/config';

const route = useRoute();
const isEditMode = ref(false);

const detailKelas = ref([]);
const dosens = ref([]);
const dosenPengajars = ref([]);
const dosenPengajarById = ref([]);
const selectedDosen = ref('');
const id_registrasi_dosen = computed(() => (selectedDosen.value ? selectedDosen.value.id : ''));
const sks = ref('');
const rencana_pertemuan = ref('');
const show = ref(false);
const id_dosen_pengajar = ref(null);
const message = ref('');

const getDosen = async () => {
    try {
        const response = await getData('penugasan-dosen/');
        // Format respons dari API ke format yang sesuai dengan v-select
        dosens.value = response.data.data.map((dosen) => ({
            id: dosen.id_registrasi_dosen, // Properti 'id' atau 'value' sesuai dengan library v-select
            nama_dosen: dosen.Dosen.nama_dosen // Properti 'label' untuk menampilkan nama dosen
        }));
    } catch (error) {
        console.error('Gagal mengambil data dosen:', error);
    }
};
const getDetailKelas = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const id_detail_kelas_kuliah = route.params.id_detail_kelas_kuliah;
        const response = await getData(`detail-kelas-kuliah/${id_detail_kelas_kuliah}/get`);
        const data = response.data.data;

        detailKelas.value = data;
        // console.log('detail : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const getDosenPengajar = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const id_kelas_kuliah = route.params.id_kelas_kuliah;
        const response = await getData(`dosen-pengajar-kelas-kuliah/${id_kelas_kuliah}/get`);
        const data = response.data.data;

        dosenPengajars.value = data;
        console.log('detail : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const getDosenPengajarById = async (id_aktivitas_mengajar) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await getData(`dosen-pengajar-kelas-kuliah/${id_aktivitas_mengajar}/get-dosen-pengajar-kelas-kuliah`);
        const data = response.data;

        dosenPengajarById.value = data;
        (id_registrasi_dosen.value = data.data.id_registrasi_dosen),
            (sks.value = data.data.sks_substansi_total),
            (rencana_pertemuan.value = data.data.rencana_minggu_pertemuan), // Temukan dosen berdasarkan id_registrasi_dosen yang ada pada data
            (selectedDosen.value = dosens.value.find((dosen) => dosen.id === data.data.id_registrasi_dosen) || null);

        // Log untuk memverifikasi data dosen
        console.log('dosen : ', data);
        Swal.close();
    } catch (error) {
        console.error('Gagal mengambil data mahasiswa:', error);
        Swal.fire('Gagal', 'Data Mahasiswa tidak ditemukan.', 'warning').then(() => {});
    }
};

const create = async () => {
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
        const id_kelas_kuliah = route.params.id_kelas_kuliah;

        const payload = {
            sks: sks.value,
            rencana_pertemuan: rencana_pertemuan.value,
            id_registrasi_dosen: id_registrasi_dosen.value
        };

        console.log('Payload:', payload); // Log payload for debugging

        const response = await axios.post(`${API_URL}/dosen-pengajar-kelas-kuliah/${id_kelas_kuliah}/create`, payload, {
            headers: {
                Authorization: token
            }
        });

        const data = response.data;
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil ditambahkan.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        Swal.fire('GAGAL', `Gagal Menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
        console.error('Error:', error.response.data); // Log error response for debugging
    }
};
const update = async () => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id = id_dosen_pengajar.value;
        const token = getToken();

        const payload = {
            sks: sks.value,
            rencana_pertemuan: rencana_pertemuan.value,
            id_registrasi_dosen: id_registrasi_dosen.value
        };

        console.log('Payload:', payload); // Log payload for debugging

        const response = await axios.put(`${API_URL}/dosen-pengajar-kelas-kuliah/${id}/update`, payload, {
            headers: {
                Authorization: token
            }
        });

        const data = response.data;
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            window.location.reload();
        });
    } catch (error) {
        Swal.fire('GAGAL', `Gagal Menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
        console.error('Error:', error.response.data); // Log error response for debugging
    }
};
const setKetua = async (id_aktivitas_mengajar) => {
    try {
        Swal.fire({
            title: 'Loading...',
            html: 'Sedang Memuat Data',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const id_kelas_kuliah = route.params.id_kelas_kuliah;
        const token = getToken();

        const response = await axios.put(
            `${API_URL}/dosen-pengajar-kelas-kuliah/set-ketua-kelas/${id_kelas_kuliah}/${id_aktivitas_mengajar}/update`,
            {},
            {
                headers: {
                    Authorization: token
                }
            }
        );

        // const data = response.data;
        Swal.close();
        Swal.fire('BERHASIL!', 'Data berhasil diperbarui.', 'success').then(() => {
            // window.location.reload();
        });
    } catch (error) {
        Swal.fire('GAGAL', `Gagal Menambahkan data: ${error.response ? error.response.data.message : error.message}`, 'error');
        // console.error('Error:', error.response.data); // Log error response for debugging
    }
};

const deleteItem = async (id_aktivitas_mengajar) => {
    try {
        const response = await del(`dosen-pengajar-kelas-kuliah/${id_aktivitas_mengajar}/delete`);
        if (response.status === 200) {
            message.value = 'Data berhasil dihapus!';
            // Menghapus item dari array sistemKuliahs yang memiliki id yang sesuai
            // sistemKuliahs.value = sistemKuliahs.value.filter((data) => data.id !== id);
        } else {
            message.value = 'Terjadi kesalahan: ' + response.statusText;
        }
    } catch (error) {
        message.value = 'Terjadi kesalahan: ' + error.message;
    }
};

const confirmDelete = (id_aktivitas_mengajar) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Data ini akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            deleteItem(id_aktivitas_mengajar);
            Swal.fire('BERHASIL!', 'Data berhasil dihapus.', 'success');
            dosenPengajars.value = dosenPengajars.value.filter((data) => data.id_aktivitas_mengajar !== id_aktivitas_mengajar);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};
const confirm = (id_aktivitas_mengajar) => {
    Swal.fire({
        title: 'Apa Kamu Yakin?',
        text: 'Set Ketua Kelas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, saya yakin!',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then(async (result) => {
        // Gunakan async untuk menunggu proses selesai
        if (result.isConfirmed) {
            await setKetua(id_aktivitas_mengajar); // Tunggu sampai setKetua selesai
            Swal.fire('BERHASIL!', 'Data berhasil Diperbarui.', 'success').then(() => {
                window.location.reload();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('BATAL', 'Data Anda Tidak Jadi Dihapus', 'error');
        }
    });
};

const showModal = () => {
    show.value = true;
};

const showModalEdit = async (id_aktivitas_mengajar) => {
    isEditMode.value = true; // Mode Edit
    id_dosen_pengajar.value = id_aktivitas_mengajar;
    await getDosenPengajarById(id_aktivitas_mengajar); // Ambil data berdasarkan ID
    show.value = true;
};

onBeforeMount(() => {
    getDetailKelas();
    getDosenPengajar();
    getDosen();
});
</script>

<template>
    <div class="card" style="border-radius: none !important">
        <h5><i class="pi pi-user me-2"></i>SET DOSEN PENGAJAR</h5>
        <div class="card">
            <div class="row">
                <div class="col-lg-2">Program Studi</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Prodi?.nama_program_studi || '-' }}</div>
                <div class="col-lg-2">Periode</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.Semester?.nama_semester }}</div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Mata Kuliah</div>
                <div class="col-lg-4"><span class="me-2">:</span> {{ detailKelas?.KelasKuliah?.MataKuliah?.nama_mata_kuliah }}</div>
                <div class="col-lg-2">Nama Kelas</div>
                <div class="col-lg-4"><span class="me-2"> :</span> {{ detailKelas?.KelasKuliah?.nama_kelas_kuliah || '-' }}</div>
            </div>
            <hr />

            <div class="row mt-5">
                <div class="row mb-2">
                    <div class="col-lg-6">
                        <h5>Dosen Pengajar</h5>
                    </div>
                    <div class="col-lg-6 text-end">
                        <button @click="showModal" class="btn btn-success"><i class="pi pi-pencil me-2"></i> Tambah</button>
                    </div>
                </div>

                <div class="mb-3 row">
                    <div class="col-lg-12 d-flex justify-content-end">
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>No</th>
                                    <th>Nama Dosen Pengajar</th>
                                    <th>Rencana Pertemuan</th>
                                    <th>Sks</th>
                                    <th>Jabatan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dosenPengajar, index) in dosenPengajars" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ dosenPengajar?.Dosen?.nama_dosen || '-' }}</td>
                                    <td>{{ dosenPengajar?.rencana_minggu_pertemuan || '-' }}</td>
                                    <td>{{ dosenPengajar?.KelasKuliah?.sks || '-' }}</td>
                                    <td>
                                        <Badge :type="dosenPengajar?.Dosen?.id_dosen === dosenPengajar?.KelasKuliah?.id_dosen ? 'badge-success' : 'badge-secondary'" class="ml-2">
                                            {{ dosenPengajar?.Dosen?.id_dosen === dosenPengajar?.KelasKuliah?.id_dosen ? 'Ketua' : 'Anggota' }}
                                        </Badge>
                                    </td>
                                    <td>
                                        <button @click="confirm(dosenPengajar.id_aktivitas_mengajar)" class="btn btn-primary me-2">Set Ketua</button>
                                        <button @click="showModalEdit(dosenPengajar.id_aktivitas_mengajar)" class="btn me-2 btn-warning" title="edit"><i class="pi pi-pencil"></i></button>
                                        <button @click="confirmDelete(dosenPengajar.id_aktivitas_mengajar)" class="btn me-2 btn-danger" title="delete"><i class="pi pi-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal :show="show" @close="show = false" :title="isEditMode ? 'EDIT DOSEN PENGAJAR' : 'TAMBAH DOSEN PENGAJAR'">
                <div class="row mb-2">
                    <div class="col-lg-8">
                        <h5>Dosen Pengajar</h5>
                    </div>

                    <div class="col-lg-4 text-end">
                        <button @click="isEditMode ? update() : create()" class="btn btn-primary"><i class="pi pi-check me-2"></i> {{ isEditMode ? 'Update' : 'Simpan' }}</button>
                    </div>
                </div>

                <div class="mb-3 mt-4 row">
                    <label for="input" class="col-sm-3 col-form-label">SKS</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="sks" />
                    </div>
                    <label for="input" class="col-sm-3 col-form-label">Rencana Pertemuan</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" v-model="rencana_pertemuan" />
                    </div>
                </div>

                <div class="mb-3 row">
                    <label for="input" class="col-sm-3 col-form-label">Dosen</label>
                    <div class="col-sm-9">
                        <v-select v-model="selectedDosen" :options="dosens" label="nama_dosen" placeholder="Pilih dosen"></v-select>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
</template>

<style scoped>
.card-theme {
    background-color: rgba(154, 160, 172, 0.5);
}
</style>
