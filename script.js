// Circular hover effect on technology boxes
const cajas = document.querySelectorAll('.caja-tecno');

cajas.forEach((caja) => {
  caja.addEventListener('mousemove', (e) => {
    const rect = caja.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    caja.style.setProperty('--x', `${x}px`);
    caja.style.setProperty('--y', `${y}px`);
  });

  caja.addEventListener('mouseleave', () => {
    caja.style.setProperty('--x', `100%`);
    caja.style.setProperty('--y', `0%`);
  });
});

// Smooth scrolling for anchor links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

const observer = new IntersectionObserver(
  (entries) => {
    let topSection = null;
    let minDistance = window.innerHeight;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rect = entry.target.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          topSection = entry.target;
        }
      }
    });

    if (topSection) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const id = topSection.getAttribute("id");
      const activeLink = document.querySelector(`.menu a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  },
  { threshold: [0.4] }
);

sections.forEach((section) => observer.observe(section));


// Cierra el menú al hacer clic en cualquier enlace del menú
document.querySelectorAll('.navbar-glass a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});


// EmailJS integration
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   //btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_ryjs36n';

   mostrarAlerta("Enviando mensaje...", false, true);
   
   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      //btn.value = 'Send Email';
      mostrarAlerta("¡Mensaje enviado correctamente!");
    }, (err) => {
      //btn.value = 'Send Email';
      mostrarAlerta("Error al enviar el mensaje. Inténtalo de nuevo más tarde.", true);
      alert(JSON.stringify(err));
    });
    document.getElementById('form').reset();
});


// Alerta de mensaje enviado
function mostrarAlerta(mensaje, esError = false, esCargando = false) {
    const alerta = document.getElementById("alerta");
    alerta.textContent = mensaje;
    alerta.style.display = "block";
    alerta.className = "alerta-oculta"; // resetear clases

    if (esError) alerta.classList.add("alerta-error");
    if (esCargando) alerta.classList.add("alerta-cargando");

    alerta.classList.add("alerta-mostrar");

    // 👇 Si es "cargando", no se oculta hasta que termine
    if (!esCargando) {
      setTimeout(() => {
        alerta.classList.remove("alerta-mostrar");
        setTimeout(() => (alerta.style.display = "none"), 300);
      }, 3000);
    }
  }


  // Modal para CV
const modal = document.getElementById("cvModal");
const openBtn = document.getElementById("openCvBtn");
const closeBtn = document.getElementById("closeBtn");
const canvas = document.getElementById("pdfCanvas");
const toolbar = document.querySelector(".toolbar");
const ctx = canvas.getContext("2d");

let pdfDoc = null;
let pageNum = 1;
let scale = window.innerWidth < 768 ? 0.6 : 1.4; // Ajuste según tamaño de pantalla 

// Abrir modal
openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
  // Ajusta el zoom cada vez que se abre el modal
  scale = window.innerWidth < 768 ? 0.6 : 1.4;   
  if (!pdfDoc) {
    loadPdf("cvJoel.pdf"); // Ruta de tu PDF
  }
});

// Cargar PDF
function loadPdf(url) {
  pdfjsLib.getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf;
    renderPage(pageNum);
  });
}

function renderPage(num) {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });

    // Crear canvas temporal
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.height = viewport.height;
    tempCanvas.width = viewport.width;

    const renderContext = {
      canvasContext: tempCtx,
      viewport: viewport
    };

    page.render(renderContext).promise.then(() => {
      // Copiar imagen renderizada al canvas visible
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      ctx.drawImage(tempCanvas, 0, 0);
    });
  });
}
 

// Controles
document.getElementById("zoomIn").addEventListener("click", () => {
  scale += 0.2;
  renderPage(pageNum);
});
document.getElementById("zoomOut").addEventListener("click", () => {
  scale = Math.max(0.5, scale - 0.2);
  renderPage(pageNum);
});


// Cerrar con botón X
closeBtn.addEventListener("click", () => modal.style.display = "none");

// Cerrar al hacer click afuera del canvas
modal.addEventListener("click", (e) => {
  if (e.target !== canvas && !toolbar.contains(e.target)) {
    modal.style.display = "none";
  }
});




