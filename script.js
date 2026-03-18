// Initialize AOS globally
function initAOS() {
	AOS.init({
		duration: 1000,
		once: true,
		easing: "ease-in-out",
	});
}

// Ensure AOS is ready as soon as possible
if (typeof AOS !== "undefined") {
	initAOS();
}

window.onload = function () {
	// Ensure loading screen fades out even if assets are slow
	const loading = document.getElementById("loading");
	if (loading) {
		loading.style.opacity = "0";
		setTimeout(() => {
			loading.style.display = "none";
		}, 500);
	}
};

/* Buka Undangan */
function bukaUndangan() {
	const cover = document.getElementById("cover");
	const content = document.getElementById("content");
	const musik = document.getElementById("musik");
	const musicControl = document.querySelector(".music-control");

	if (!cover || !content) return;

	// Scroll to top first just in case
	window.scrollTo(0, 0);

	// Fade out cover
	cover.style.transition = "opacity 0.8s ease-in-out, transform 1s ease-in-out";
	cover.style.opacity = "0";
	cover.style.transform = "translateY(-100px)";

	setTimeout(() => {
		cover.style.display = "none";

		// Remove the class that hides content
		content.classList.remove("main-content");
		content.style.display = "block";

		// Show the navbar
		const navbar = document.querySelector(".navbar");
		if (navbar) {
			navbar.style.display = "flex";
		}

		// Re-initialize and refresh AOS to catch new elements
		initAOS();
		AOS.refresh();

		// Play music with user interaction context
		if (musik) {
			musik.play().catch((e) => console.log("Audio play failed:", e));
			if (musicControl) musicControl.classList.add("rotating");
		}
	}, 800);
}

/* Nama Tamu dari URL Parameter (Kepada Yth) */
function setGuestName() {
	const params = new URLSearchParams(window.location.search);
	const tamu = params.get("to");
	const namaTamuElement = document.getElementById("namaTamu");

	if (namaTamuElement) {
		if (tamu) {
			// Replace + or %20 with spaces if needed (URLSearchParams does this mostly)
			namaTamuElement.innerText = tamu;
		} else {
			// Default name if no parameter is provided
			namaTamuElement.innerText = "Tamu Undangan";
		}
	}
}

// Call setGuestName immediately
setGuestName();

/* Countdown Timer */
const targetDate = new Date("Mar 26, 2026 10:00:00").getTime();

const countdownTimer = setInterval(() => {
	const now = new Date().getTime();
	const distance = targetDate - now;

	if (distance < 0) {
		clearInterval(countdownTimer);
		return;
	}

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	document.getElementById("hari").innerText = days.toString().padStart(2, "0");
	document.getElementById("jam").innerText = hours.toString().padStart(2, "0");
	document.getElementById("menit").innerText = minutes
		.toString()
		.padStart(2, "0");
	document.getElementById("detik").innerText = seconds
		.toString()
		.padStart(2, "0");
}, 1000);

/* Music Control 
function toggleMusic() {
	const musik = document.getElementById("musik");
	const musicControl = document.querySelector(".music-control");
	const icon = musicControl.querySelector("i");

	if (musik.paused) {
		musik.play();
		musicControl.classList.add("rotating");
		icon.className = "fa-solid fa-music";
	} else {
		musik.pause();
		musicControl.classList.remove("rotating");
		icon.className = "fa-solid fa-pause";
	}
}
*/


/* Copy Rekening 
function copyRek() {
	const rekening = document
		.getElementById("rekening")
		.innerText.replace(/\s/g, "");
	navigator.clipboard.writeText(rekening).then(() => {
		alert("Nomor rekening berhasil disalin!");
	});
}
*/


/* Buku Tamu */
document.getElementById("formUcapan").addEventListener("submit", (e) => {
	e.preventDefault();

	const nama = document.getElementById("nama").value;
	const ucapan = document.getElementById("ucapan").value;

	if (!nama || !ucapan) {
		alert("Mohon isi nama dan ucapan Anda");
		return;
	}

	const listUcapan = document.getElementById("listUcapan");
	const div = document.createElement("div");

	div.className = "ucapan-item";
	div.style.backgroundColor = "var(--white)";
	div.style.padding = "20px";
	div.style.borderRadius = "20px";
	div.style.marginBottom = "20px";
	div.style.boxShadow = "var(--shadow)";
	div.style.border = "1px solid var(--accent)";
	div.setAttribute("data-aos", "fade-up");

	div.innerHTML = `
		<h4 style="color: var(--primary); margin-bottom: 5px;">${nama}</h4>
		<p style="margin-bottom: 0; font-size: 0.95rem; color: var(--text-muted);">${ucapan}</p>
	`;

	listUcapan.prepend(div);

	// Ganti dengan nomor WA kamu (gunakan kode negara, tanpa tanda + atau spasi)
	const nomorWA = "6285366468282"; 

	// Membuat format pesan
	const pesan = `Halo, saya ${nama}. Berikut ucapan saya: ${ucapan}`;

	// Encode pesan agar aman dibaca oleh URL browser
	const pesanEncoded = encodeURIComponent(pesan);

// Membuka link WhatsApp di tab baru
window.open(`https://wa.me/${nomorWA}?text=${pesanEncoded}`, "_blank");

	// Reset form
	document.getElementById("nama").value = "";
	document.getElementById("ucapan").value = "";

	// Refresh AOS for new element
	AOS.refresh();
});

/* Parallax Effect */
window.addEventListener("scroll", () => {
	const cover = document.getElementById("cover");
	const scrollValue = window.scrollY;
	if (cover.style.display !== "none") {
		cover.style.backgroundPositionY = scrollValue * 0.5 + "px";
	}
});

/* Scroll Menu */
function scrollMenu(id) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
		});
	}
}
