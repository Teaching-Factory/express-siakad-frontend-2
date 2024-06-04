<script>
export default {
    data() {
        return {
            dosens: [
                { nama: 'SUDARMONO', nilai: '16', ipk: '2.00', isEditing: false }
            ]
        };
    },
    methods: {
        addDosen() {
            this.dosens.push({ nama: '', pertemuan: '', sks: '', isEditing: true });
        },
        editDosen(index) {
            this.$set(this.dosens, index, { ...this.dosens[index], isEditing: true });
        },
        saveDosen(index) {
            this.$set(this.dosens, index, { ...this.dosens[index], isEditing: false });
        },
        deleteDosen(index) {
            this.dosens.splice(index, 1);
        }
    }
};
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                    <h5><i class="pi pi-user me-2"></i>DOSEN PENGAJAR KELAS KULIAH</h5>
                </div>
            <div class="col-lg-8 d-flex justify-content-end">
                <router-link to="/kelas-jadwal-perkuliahan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
            </div>
        </div>
        <hr>
            <!-- <h5><i class="pi pi-user me-2"></i>DOSEN PENGAJAR KELAS KULIAH</h5>
            <hr> -->

            <div class="card" style="border-radius: none !important">
                <div class="row">
                    <div class="col-lg-2">Program Studi</div>
                    <div class="col-lg-4"><span class="me-2">:</span> S1 Teknik Informatika</div>
                    <div class="col-lg-2">Periode</div>
                    <div class="col-lg-4"><span class="me-2">:</span> 2020/2021 Ganjil</div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-lg-2">Mata Kuliah</div>
                    <div class="col-lg-4"><span class="me-2">:</span> Pemrograman Terstruktur</div>
                    <div class="col-lg-2">Kelas</div>
                    <div class="col-lg-4"><span class="me-2">:</span> A</div>
                </div>
                <hr style="margin: 0;">

                <div class="row mt-4">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th class="text-center">Nama Dosen Pengajar</th>
                                <th class="text-center">Rencana Pertemuan</th>
                                <th class="text-center">SKS</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dosen, index) in dosens" :key="index">
                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.nama }}</td>
                                <td v-else><input type="text" class="form-control" v-model="dosen.nama"></td>

                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.nilai }}</td>
                                <td v-else><input type="text" class="form-control" v-model="dosen.pertemuan"></td>

                                <td v-if="!dosen.isEditing" class="text-center">{{ dosen.ipk }}</td>
                                <td v-else><input type="text" class="form-control" v-model="dosen.sks"></td>
                                
                                <td class="text-center">
                                    <button class="btn btn-outline-secondary me-2" @click="saveDosen(index)" v-if="dosen.isEditing">
                                        Save
                                    </button>
                                    <button class="btn btn-outline-warning me-2" @click="editDosen(index)" v-else>
                                        <i class="pi pi-pencil"></i>
                                    </button>
                                    <button class="btn btn-outline-danger me-2" @click="deleteDosen(index)">
                                        <i class="pi pi-trash"></i>
                                    </button>
                                    <button class="btn btn-primary me-2" v-if="!dosen.isEditing">
                                        Set Ketua
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <button class="btn btn-secondary" @click="addDosen"><i class="pi pi-plus me-2"></i> Tambah Dosen
                            Pengajar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>