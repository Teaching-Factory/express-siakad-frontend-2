<script setup>
import { onMounted } from 'vue';
import { getData } from '../../../utiils/request';
import { ref } from 'vue';

</script>

<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="data-user" data-bs-toggle="tab"
                                data-bs-target="#laporanpmb" type="button" role="tab" aria-controls="home"
                                aria-selected="true">Laporan PMB</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab"
                                data-bs-target="#contactperson" type="button" role="tab" aria-controls="profile"
                                aria-selected="false">Contact Person</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="data-wali" data-bs-toggle="tab"
                                data-bs-target="#pembayaranpmb" type="button" role="tab" aria-controls="profile"
                                aria-selected="false">Pembayaran PMB</button>
                        </li>
                        
                    </ul>


                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="laporanpmb" role="tabpanel"
                            aria-labelledby="data-user">

                            <!-- laporan PMB -->
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div   div class="flex justify-content-end gap-2">
                                        <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Reset</button>
                                    </div>
                                </div>
                                <p><b>Laporan Rekap Pendaftaran PMB</b></p>
                                <label for="status" class="col-sm-4 col-form-label">Jabatan</label>
                                <div class="col-md-8">
                                    <select class="form-select" id="status" v-model="status">
                                        <option value="true">Rektor</option>
                                        <option value="false">Wakil Rektor</option>
                                    </select>
                                </div>
                                    
                            </div>
                            
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Penandatangan</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIDN / NIP</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword">
                                </div>
                            </div>

                            <div class="mb-3 mt-4 row">
                                <p><b>Laporan Rekap Pembayaran PMB</b></p>
                                <label for="status" class="col-sm-4 col-form-label">Jabatan</label>
                                <div class="col-md-8">
                                    <select class="form-select" id="status" v-model="status">
                                        <option value="true">Rektor</option>
                                        <option value="false">Wakil Rektor</option>
                                    </select>
                                </div>
                                    
                            </div>
                            
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Penandatangan</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">NIDN / NIP</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-6 col-lg-12">
                                <b></b>  <h6 class="text-dark">Keterangan :</h6>
                                    <ol class="lh-2 text-small">
                                        <li>Fitur ini digunakan untuk penandatangan pada Laporan Rekap PMB</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        

                        <!-- contact person-->
                        <div class="tab-pane fade" id="contactperson" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div   div class="flex justify-content-end gap-2">
                                        <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Reset</button>
                                    </div>
                                </div>
                                <p><b>Contact Person PMB</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Contact Person PMB</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nik_ayah" id="inputPassword" placeholder="contoh : Andi (Telp : 08123456789)">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Whatsapp Contact Person PMB</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" placeholder="contoh : 628123456789">
                                </div>
                            </div>
                            
                        </div>

                        <!-- pembayaran PMB-->
                        <div class="tab-pane fade" id="pembayaranpmb" role="tabpanel" aria-labelledby="data-wali">
                            <div class="mb-3 mt-4 row">
                                <div class="col-lg-12 d-flex justify-content-end">
                                    <div   div class="flex justify-content-end gap-2">
                                        <button class="btn btn-primary"> <i class="pi pi-check me-2"></i> Simpan</button>
                                        <button class="btn btn-danger"> <i class="pi pi-refresh me-2"></i> Reset</button>
                                    </div>
                                </div>
                                <p><b>Pembayaran PMB</b></p>
                                <label for="inputPassword" class="col-sm-4 col-form-label">Aktifkan Upload Bukti Transfer PMB</label>
                                <div class="col-sm-8">
                                    <input type="checkbox">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama BANK</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" placeholder="masukkan nama bank">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nomor Rekening</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" placeholder="contoh : 123456789">
                                </div>
                            </div>
                            <div class="mb-3 mt-2 row">
                                <label for="inputPassword" class="col-sm-4 col-form-label">Nama Pemilik Rekening</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" v-model="nama_ayah" id="inputPassword" placeholder="contoh : Andi">
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
