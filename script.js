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
  { threshold: 0.4 } // el 60% de la sección debe estar visible para marcarla
);

sections.forEach((section) => observer.observe(section));

