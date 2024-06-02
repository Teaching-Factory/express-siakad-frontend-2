<script setup>

</script>

<template>
    <div class="card">
        <div class="row">
            <div class="col-lg-4">
                <h5><i class="pi pi-user me-2"></i>TAMBAH UNIT JABATAN</h5>
            </div>
            <div class="col-lg-8 d-flex justify-content-end">
                <router-link to="/unit-jabatan" class="btn btn-dark me-2"><i class="pi pi-list me-2"></i> Kembali</router-link>
                <router-link to="/unit-jabatan" class="btn btn-primary me-2"><i class="pi pi-check me-2"></i> Simpan</router-link>
                <router-link to="/unit-jabatan" class="btn btn-danger"><i class="pi pi-refresh me-2"></i> Batal</router-link>
            </div>
        </div>
        <hr>
        <div class="mb-3 row d-flex justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label">Nama Jabatan</label>
            <div class="col-md-7">
                <input type="text" class="form-control" id="inputPassword">
            </div>
        </div>
        <div class="mb-3 row d-flex justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label">Nama Penandatangan</label>
            <div class="col-md-7">
                <input type="text" class="form-control" id="inputPassword">
            </div>
        </div>
        <div class="mb-3 row d-flex justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label">NIP</label>
            <div class="col-md-7">
                <input type="text" class="form-control" id="inputPassword">
            </div>
        </div>
    </div>
</template>