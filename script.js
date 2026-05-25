/*  1. THUMBNAIL SLIDER (Fix Gambar Bisa Ganti + Efek Gelap Kontras)*/
const thumbs = document.querySelectorAll(".thumb");
const heroBg = document.getElementById("heroBg");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");

if (thumbs.length > 0) {
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      /* Hapus kelas active dari semua thumbnail */
      thumbs.forEach((item) => {
        item.classList.remove("active");
      });

      /* Tambahkan kelas active ke thumbnail yang sedang diklik */
      thumb.classList.add("active");

      /* Ambil data atribut menggunakan dataset */
      const bg = thumb.dataset.bg;
      const title = thumb.dataset.title;
      const desc = thumb.dataset.desc;

      /* Ganti background hero dengan melapisinya pakai linear-gradient hitam */
      if (heroBg) {
        heroBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bg}')`;
        heroBg.style.backgroundSize = "cover";
        heroBg.style.backgroundPosition = "center";
      }

      /* Ganti tulisan judul dan deskripsi di atas gambar hero */
      if (heroTitle) heroTitle.textContent = title;
      if (heroDesc) heroDesc.textContent = desc;
    });
  });
}

/* 2. ACCORDION (Fix Panah Bawah & Detail Tampil Layanan)*/
const serviceTop = document.querySelectorAll(".service-top");

if (serviceTop.length > 0) {
  serviceTop.forEach((item) => {
    item.addEventListener("click", () => {
      /* Cari elemen detail yang berada tepat di bawah container tombol header */
      const detail = item.nextElementSibling;

      /* Cek status display, jika block sembunyikan, jika none tampilkan */
      if (detail) {
        if (detail.style.display === "block") {
          detail.style.display = "none";
          item.querySelector("i").className = "fa-solid fa-chevron-down";
        } else {
          detail.style.display = "block";
          item.querySelector("i").className = "fa-solid fa-chevron-up";
        }
      }
    });
  });
}

/* 3. BURGER MENU RESPONSIF */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* 4. VALIDASI SUBMIT FORM RESERVASI (Interaktif Tambah Menu Oli) */
const bookingForm = document.getElementById("bookingForm");
const jenisLayanan = document.getElementById("jenisLayanan");
const menuOliContainer = document.getElementById("menuOliContainer");
const pilihanOli = document.getElementById("pilihanOli");

// Deteksi perubahan pada dropdown Jenis Layanan
if (jenisLayanan && menuOliContainer) {
  jenisLayanan.addEventListener("change", function () {
    if (this.value === "Ganti Oli") {
      // Jika pilih Ganti Oli, munculkan menu pilihan oli dan buat jadi required
      menuOliContainer.style.display = "flex";
      pilihanOli.setAttribute("required", "required");
    } else {
      // Jika pilih yang lain, sembunyikan kembali dan hapus required-nya
      menuOliContainer.style.display = "none";
      pilihanOli.removeAttribute("required");
      pilihanOli.value = ""; // Reset pilihan oli ke kosong
    }
  });
}

// Logika saat form diklik Konfirmasi Booking
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const plat = document.getElementById("platNomor").value;
    const layanan = jenisLayanan.value;
    const jam = document.getElementById("jamBooking").value;
    const oliTerpilih = pilihanOli.value;

    // Set teks detail layanan tambahan untuk alert cetak nota/tiket
    let detailLayananText = layanan;
    if (layanan === "Ganti Oli" && oliTerpilih) {
      detailLayananText = `${layanan} (${oliTerpilih})`;
    }

    alert(
      `BOOKING BERHASIL!\n\n` +
        `Nomor Urut: RZG-${Math.floor(100 + Math.random() * 900)}\n` +
        `Pelat Nomor: ${plat}\n` +
        `Layanan: ${detailLayananText}\n` +
        `Jam Sesi: ${jam} WIB\n\n` +
        `Silakan datang 10 menit sebelum jam sesi. Terima kasih!`,
    );

    bookingForm.reset();
    if (menuOliContainer) menuOliContainer.style.display = "none"; // Sembunyikan kembali setelah reset
  });
}

/*  5. KONTROL UPDATE STATUS (Untuk admin.html) */
function ubahStatus(button) {
  const row = button.closest("tr");
  const statusSpan = row.querySelector(".status");

  if (statusSpan) {
    if (statusSpan.classList.contains("pending")) {
      statusSpan.classList.remove("pending");
      statusSpan.classList.add("process");
      statusSpan.innerText = "Dikerjakan";
      button.innerText = "Selesaikan";
    } else if (statusSpan.classList.contains("process")) {
      statusSpan.classList.remove("process");
      statusSpan.classList.add("done");
      statusSpan.innerText = "Selesai";
      button.style.display = "none";
    }
  }
}
