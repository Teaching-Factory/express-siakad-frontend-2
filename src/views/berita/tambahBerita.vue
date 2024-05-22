<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-10 xl:col-6">
                    <h5>TAMBAH BERITA</h5>
                </div>
                <div class="col-12 xl:col-6 d-flex justify-content-end">
                    <button class="btn btn-secondary me-2"> <i class="pi pi-bars mr-2"></i> Daftar</button>
                    <button class="btn btn-primary me-2"> <i class="pi pi-save mr-2"></i> Simpan</button>
                    <button class="btn btn-danger"> <i class="pi pi-times mr-2"></i> Batal</button>
                </div>

            </div>
            <hr>

            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Judul Berita</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" placeholder="masukkan judul berita disini">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Deskripsi Pendek</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" placeholder="masukkan deskripsi berita disini">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Kategori Berita</label>
                </div>
                <div class="col-lg-6">
                    <input type="text" class="form-control" placeholder="info">
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Share ke public</label>
                </div>
                <div class="col-lg-6">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheckbox">
                        <label class="form-check-label" for="exampleCheckbox">Tampilkan berita di dashboad mahasiswa</label>
                     </div>
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Thumbnail</label>
                </div>
                <div class="col-lg-6">
                <input type="file" class="form-control">
                    
                </div>
            </div>
            <div class="row d-flex justify-content-center mb-3">
                <div class="col-lg-4">
                    <label for="exampleFormControlInput1" class="form-label">Konten Berita</label>
                </div>
                <div class="col-lg-6">
                    <textarea name="" id="" class="form-control" rows="10"></textarea>
                    
                </div>
            </div>
        </div>
    </div>
</template>