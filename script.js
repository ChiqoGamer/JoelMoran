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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remueve la clase active de todos
        navLinks.forEach((link) => link.classList.remove("active"));

        // Activa el link correspondiente
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.menu a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0. } // el 60% de la sección debe estar visible para marcarla
); 

sections.forEach((section) => observer.observe(section));


// Cierra el menú al hacer clic en cualquier enlace del menú
document.querySelectorAll('.menu a').forEach(link => {
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
