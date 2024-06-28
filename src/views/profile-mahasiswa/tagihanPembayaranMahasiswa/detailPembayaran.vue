<template>
    <div class="card">
        <h5><i class="pi pi-user me-2"></i>DETAIL PEMBAYARAN</h5>
        <div class="card">
            
            <form @submit.prevent="create">
                <div class="row">
                    <div class="col-3 col-md-6 col-lg-6">
                        <span>Panduan Pembayaran</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-6">
                        <div class="text-info">
                            <router-link to="">
                                <span>Panduan_Pembayaran.pdf</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 col-md-6 col-lg-6">
                        <span>Upload Bukti Pembayaran</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-6">
                        <div class="input-group mb-3">
                            <input type="file" class="form-control" id="inputGroupFile02" @change="handleFileUpload" />
                        </div>
                    </div>
                    <div class="col-3 col-md-6 col-lg-12">
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </div>
                
            </form>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-12">
                    <h6 class="text-dark">Keterangan :</h6>
                    <p class="lh-1 text-small">
                        <ol>
                            <li>Baca buku panduan pembayaran terlebih dahulu</li>
                            <li>Apabila sudah melakukan pembayaran, upload buktinya pada fitur ini</li>
                            <li>Tekan upload untuk memastikan bukti pembayaran Anda sudah berhasil di unggah</li>
                            <li>Bukti pembayaran akan divalidasi oleh admin</li>
                            <li>Status pembayaran akan berubah apabila bukti pembayaran di terima</li>
                            
                        </ol>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>