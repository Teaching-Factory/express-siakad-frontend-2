

<template>
    <div class="bg-light">
      <div id="home" class="container-fluid landing-wrapper vh-100">
        <div
          id="hero"
          class="d-flex flex-column justify-content-center align-items-center px-4 px-lg-5 text-center"
          style="height: 100%; background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%)"
        >
          <div class="row w-100">
            <div class="col-lg-7 mx-auto">
              <p class="display-6 fw-bold text-dark">
                Langkah Terakhir: Instalasi SIACLOUD
              </p>
              <p class="fs-5 fw-normal text-muted mt-3">
                Selamat! Anda telah mencapai tahap terakhir dalam transformasi
                kampus Anda menjadi kampus digital modern.
              </p>
              <div class="mt-5 mb-4">
                <h5 class="fw-bold text-dark">💡 Apa yang Perlu Dilakukan?</h5>
                <ul class="fs-5 text-muted mt-3 text-start">
                  <li>
                    Unduh dan instal sistem SIACLOUD di server atau perangkat yang telah disiapkan.
                  </li>
                  <li>
                    Ikuti proses instalasi dengan baik untuk memastikan sistem terpasang dengan benar.
                  </li>
                  <li>
                    Pastikan semua konfigurasi selesai untuk memulai sistem.
                  </li>
                </ul>
                <p class="fs-5 mt-3">
                    <b>
                        ⚠️ Jangan Membatalkan Proses Instalasi!
                    </b>
                    <p>
                        Proses ini memerlukan waktu karena melibatkan pengambilan data dalam jumlah besar.
                    </p>
                </p>
              </div>
              <button type="button" class="btn btn-outline-primary btn-lg mt-3">
                🚀 INSTALL SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  



<style>
/* Container styling */
.cta-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
}

/* Primary Button Styling */
.cta-primary {
    background-color: #007bff; /* Warna hijau yang menenangkan */
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.cta-primary:hover {
    background-color: #007bff; /* Warna hover */
    transform: translateY(-2px); /* Efek floating */
}

.cta-primary:active {
    transform: translateY(0); /* Kembali normal saat diklik */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-primary:focus {
    outline: 3px solid #81c784; /* Fokus aksesibilitas */
}

/* Secondary Button Styling */
.cta-secondary {
    color: #4caf50; /* Warna hijau */
    background: transparent;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border: 2px solid #4caf50;
    border-radius: 0.5rem;
    text-decoration: none;
    display: inline-block;
    transition: color 0.3s ease, background-color 0.3s ease, transform 0.2s ease;
}

.cta-secondary:hover {
    background-color: #4caf50; /* Background hijau saat hover */
    color: white;
    transform: translateY(-2px);
}

.cta-secondary:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-secondary:focus {
    outline: 3px solid #81c784;
}
</style>