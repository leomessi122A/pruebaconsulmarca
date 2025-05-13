// Navegación fija
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Animación suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación para las tarjetas de servicios
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Función para animar números
function animateNumbers() {
  const achievementItems = document.querySelectorAll('.achievement-item h3');
  
  achievementItems.forEach(item => {
    const target = item.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isComma = target.includes(',');
    
    // Extraer el número base
    let baseNumber = parseFloat(target.replace(/[^0-9.]/g, ''));
    let currentNumber = 0;
    const duration = 2000; // 2 segundos
    const steps = 60; // 60 frames por segundo
    const increment = baseNumber / steps;
    
    const updateNumber = () => {
      currentNumber += increment;
      if (currentNumber >= baseNumber) {
        currentNumber = baseNumber;
      }
      
      // Formatear el número según el tipo
      let displayNumber = Math.floor(currentNumber);
      if (isComma) {
        displayNumber = displayNumber.toLocaleString();
      }
      if (isPercentage) {
        displayNumber += '%';
      }
      if (isPlus) {
        displayNumber += '+';
      }
      
      item.textContent = displayNumber;
      
      if (currentNumber < baseNumber) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    // Iniciar la animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateNumber();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
}

// Inicializar la animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  animateNumbers();
});

// Menú hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Cerrar menú al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
});

// Datos de los servicios
const serviciosData = {
    marcas: {
        titulo: 'Registro de Marcas: Protege la identidad de tu negocio',
        descripcion: 'Una marca es mucho más que un nombre o un logotipo: es la representación de tu identidad comercial y un activo estratégico clave. En CONSULMARCAS, te guiamos en cada paso del proceso para garantizar que tu marca esté debidamente registrada y protegida contra usos indebidos.',
        beneficios: [
            '✅ Derecho exclusivo: El registro te otorga el uso exclusivo de la marca en tu sector y la posibilidad de impedir que terceros la utilicen sin autorización.',
            '✅ Valor comercial: Una marca registrada aumenta el valor de tu empresa y puede ser comercializada, licenciada o vendida.',
            '✅ Protección legal: En caso de disputa, contar con un registro otorga respaldo legal para defender tus derechos.',
            '✅ Diferenciación en el mercado: Evita confusiones con otras marcas y fortalece la confianza de tus clientes.'
        ],
        proceso: [
            'Búsqueda y análisis de viabilidad: Antes de registrar una marca, realizamos un estudio de antecedentes para verificar la disponibilidad y evitar posibles conflictos con marcas preexistentes.',
            'Clasificación y estrategia: Determinamos las clases del sistema de Clasificación de Niza en las que debe registrarse la marca, asegurando una protección adecuada según el sector de tu negocio.',
            'Solicitud ante la Dirección Nacional de Propiedad Industrial: Preparamos y presentamos la solicitud ante la Dirección Nacional de Propiedad Industrial, cumpliendo con todos los requisitos legales.',
            'Seguimiento y defensa: Monitoreamos el proceso hasta la concesión del registro y defendemos tu solicitud ante oposiciones o requerimientos adicionales.',
            'Renovaciones y vigilancia: Las marcas deben renovarse periódicamente para mantener su protección. También ofrecemos un servicio de vigilancia para detectar posibles infracciones y actuar a tiempo.'
        ]
    },
    patentes: {
        titulo: 'Registro de Patentes: Protege tu Innovación',
        descripcion: 'Una patente es el mejor mecanismo para resguardar tus invenciones y garantizar que solo tú puedas explotarlas comercialmente. En CONSULMARCAS, te ayudamos a proteger tus creaciones tecnológicas, asegurando que tu esfuerzo y creatividad sean reconocidos y rentabilizados.',
        beneficios: [
            '✅ Exclusividad comercial: Evita que terceros copien, utilicen o vendan tu invención sin tu consentimiento.',
            '✅ Ventaja competitiva: Diferencia tu empresa y refuerza su posición en el mercado.',
            '✅ Rentabilidad: Puedes licenciar o vender la patente, generando ingresos adicionales.',
            '✅ Internacionalización: Protege tu innovación en múltiples países mediante tratados como el PCT (Tratado de Cooperación en materia de Patentes).'
        ],
        proceso: [
            'Búsqueda de antecedentes: Realizamos un estudio de patentabilidad para verificar si tu invención es nueva y cumple con los requisitos legales.',
            'Redacción de la solicitud: Elaboramos una memoria descriptiva detallada, reivindicaciones y dibujos técnicos conforme a las normativas nacionales e internacionales.',
            'Presentación y gestión ante la Dirección Técnica de patentes: Nos encargamos de presentar tu solicitud ante la Dirección Técnica de patentes y gestionamos los trámites necesarios.',
            'Examen de patentabilidad: Damos seguimiento a los exámenes técnicos y legales, respondiendo a observaciones para asegurar la concesión de la patente.',
            'Mantenimiento y defensa: Las patentes requieren renovaciones periódicas. Además, vigilamos posibles infracciones para proteger tus derechos.'
        ],
    
            titulo: '¿Qué es una patente y qué protege?',
            descripcion: 'Una patente es un derecho exclusivo otorgado sobre una invención, permitiendo a su titular impedir que terceros la fabriquen, utilicen o vendan sin autorización.',
            protege: [
                '🔹 Productos y dispositivos: Máquinas, herramientas, dispositivos electrónicos, etc.',
                '🔹 Procesos y métodos: Procedimientos industriales, técnicas de fabricación, algoritmos aplicados a procesos técnicos.',
                '🔹 Sustancias y composiciones químicas: Fármacos, materiales, fórmulas innovadoras.'
            ]
        
    },
    derechos: {
        titulo: 'Derechos de Autor',
        descripcion: 'Protección integral de obras intelectuales, artísticas y literarias. Aseguramos que tus creaciones estén debidamente registradas y protegidas.',
        beneficios: [
            'Registro de obras literarias y artísticas',
            'Protección de software y bases de datos',
            'Asesoría en contratos de licencia',
            'Defensa contra plagio',
            'Gestión de derechos digitales'
        ],
        proceso: [
            'Evaluación de la obra',
            'Preparación de documentación',
            'Registro ante autoridades competentes',
            'Emisión de certificados',
            'Asesoría en protección'
        ]
    },
    defensa: {
        titulo: 'Defensa Legal',
        descripcion: 'Representación legal especializada en disputas de propiedad intelectual. Protegemos tus derechos con estrategias legales efectivas.',
        beneficios: [
            'Representación en litigios',
            'Mediación y arbitraje',
            'Defensa contra infracciones',
            'Asesoría en acuerdos de licencia',
            'Gestión de disputas internacionales'
        ],
        proceso: [
            'Evaluación del caso',
            'Desarrollo de estrategia legal',
            'Preparación de documentación',
            'Representación en audiencias',
            'Seguimiento del proceso'
        ]
    }
};

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const modalOverlay = document.querySelector('.service-more-modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close-more');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    // Función para mostrar el modal con el contenido del servicio
    function showModal(serviceId) {
        const service = serviciosData[serviceId];
        if (!service) {
            console.error('Servicio no encontrado:', serviceId);
            return;
        }

        // Crear el contenido del modal
        modalContent.innerHTML = `
            <h2 class="modal-main-title">${service.titulo}</h2>
            <p class="modal-desc">${service.descripcion}</p>
            
            <div class="modal-benefits-card">
                <h3 class="modal-subtitle">Beneficios</h3>
                <ul class="modal-benefits">
                    ${service.beneficios.map(beneficio => `
                        <li>
                            <i class="fas fa-check benefit-icon"></i>
                            ${beneficio}
                        </li>
                    `).join('')}
                </ul>
            </div>

            <div class="modal-process-card">
                <h3 class="modal-process-title">Nuestro Proceso</h3>
                <ol class="modal-process-list">
                    ${service.proceso.map(paso => `
                        <li>${paso}</li>
                    `).join('')}
                </ol>
            </div>
        `;

        // Mostrar el modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Agregar event listeners a los botones "Conoce más"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            console.log('Botón clickeado, servicio:', serviceId); // Para debugging
            showModal(serviceId);
        });
    });

    // Cerrar modal al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
