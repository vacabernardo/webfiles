
$(document).ready(function() {
    const imageCenterClass = '.image-center'; // The class of elements to animate
        const fadeInClass = ".fadein"; // Nueva clase para la animación fadein
    
        // Función para ejecutar la animación de entrada para un elemento específico
        function playItemAnimation(element) {
            gsap.fromTo(element,
                { autoAlpha: 0, y: 50 },
                {
                    duration: 1.5,
                    autoAlpha: 1,
                    y: 0,
                    delay: 1, // <-- Añade el retraso de 1 segundo
                    ease: "power3.out",
                    overwrite: "auto"
                }
            );
        }
    
        // Función para resetear la animación de un elemento específico
        function resetItemAnimation(element) {
            // console.log("Reseteando para:", element);
            gsap.set(element, { autoAlpha: 0, y: 50 });
        }
    
        // 1. Establece el estado inicial para TODOS los elementos con la clase 'image-center'
        $(imageCenterClass).each(function() {
            gsap.set(this, { autoAlpha: 0, y: 50 }); // Asegura opacidad 0 desde el inicio
        });
    
        // 2. Inicializa pagePiling.js
        $('#pagepiling').pagepiling({
            // ----- TUS OTRAS CONFIGURACIONES DE PAGEPILING -----
            menu: null,
            direction: 'vertical',
            verticalCentered: true,
            anchors: [],
            scrollingSpeed: 700,
            easing: 'swing',
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                'textColor': '#000',
                'bulletsColor': '#000',
                'position': 'right',
                'tooltips': ['Slide 1', 'Slide 2'] // Ajusta según tus slides
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: false,
            // ----- FIN DE TUS OTRAS CONFIGURACIONES -----
    
            // Callback que se dispara después de que el plugin ha renderizado la estructura inicial.
            afterRender: function(){
                // console.log("pagePiling: afterRender triggered.");
                // Este es el lugar ideal para asegurar la animación del primer slide en la carga inicial.
                // pagePiling.js añade la clase 'active' a la sección visible actual.
                // El primer slide debería ser '.pp-section.active' en este punto.
                const firstActiveSection = $('.pp-section.active').first();
    
                if (firstActiveSection.length > 0) {
                    const itemsInFirstSection = firstActiveSection.find(imageCenterClass);
                    if (itemsInFirstSection.length > 0) {
                        // console.log("Animando items en el primer slide vía afterRender:", itemsInFirstSection);
                        itemsInFirstSection.each(function() {
                            playItemAnimation(this);
                        });
                    }
                } else {
                    // Fallback por si '.active' no está inmediatamente, aunque debería.
                    // Considera que el primer slide es el de índice 0.
                    const firstSectionFallback = $('.pp-section').eq(0);
                    const itemsInFirstSectionFallback = firstSectionFallback.find(imageCenterClass);
                     if (itemsInFirstSectionFallback.length > 0) {
                        // console.log("Animando items en el primer slide vía afterRender (fallback):", itemsInFirstSectionFallback);
                        itemsInFirstSectionFallback.each(function() {
                            playItemAnimation(this);
                        });
                    }
                }
            },
    
            // Callback que se dispara después de que una sección (slide) ha cargado.
            afterLoad: function(anchorLink, index){
                // console.log("pagePiling: afterLoad triggered for slide " + index);
                const currentSection = $('.pp-section').eq(index - 1);
                const itemsToAnimate = currentSection.find(imageCenterClass);
    
                // La animación del primer slide (index = 1) ya fue iniciada por afterRender
                // en la carga inicial. GSAP con overwrite: "auto" manejará bien si
                // playItemAnimation se llama de nuevo aquí para el slide 1,
                // simplemente asegurando que la animación llegue a su estado final.
                // Para slides > 1, esta es la llamada principal para su animación.
                if (itemsToAnimate.length > 0) {
                    itemsToAnimate.each(function() {
                        playItemAnimation(this);
                    });
                }
            },
    
            // Callback que se dispara cuando estás a punto de dejar una sección.
            onLeave: function(index, nextIndex, direction){
                // console.log("pagePiling: onLeave triggered from slide " + index + " to " + nextIndex);
                const departingSection = $('.pp-section').eq(index - 1);
                const itemsToReset = departingSection.find(imageCenterClass);
    
                if (itemsToReset.length > 0) {
                    itemsToReset.each(function() {
                        resetItemAnimation(this);
                    });
                }
            }
        });
        
        // Event listener para el botón que navega al segundo slide
        $('#button-form').on('click', function(e) {
            e.preventDefault(); // Previene el comportamiento por defecto del botón
            $.fn.pagepiling.moveTo(2); // Navega al segundo slide (índice 2)
        });
    });
    
    // Función para animar todos los .fadein de una sección
    function animateFadeinsInSection(section) {
        const fadeins = section.find('.fadein');
        fadeins.each(function() {
            gsap.fromTo(this,
                { autoAlpha: 0 },
                {
                    duration: 1,
                    autoAlpha: 1,
                    delay: .5, // 1 segundo de retraso
                    ease: "power1.out"
                }
            );
        });
    }