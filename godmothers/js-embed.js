<script>
  window.addEventListener("load", function () {
  const modal = document.querySelector(".loading-modal");

  // No necesitas verificar si estás en el Designer. CSS lo hará.
  gsap.set(".hero-logo_element", { opacity: 0, y: 50, scale: 1.05 });
  gsap.set(".nav_component", { opacity: 0, y: -20 });

  gsap.to(modal, {
    opacity: 0,
    delay: 1,
    duration: 0.5,
    onComplete: () => {
      modal.style.display = "none";

      const tl = gsap.timeline({ 
        defaults: { ease: "power2.out", duration: 1 }, 
        delay: 0.3
      });

      tl.to(".hero-logo_element", {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
      });

      tl.to(".nav_component", {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, "-=0.8");
    }
  });
});

// body

gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-logo", {
        scale: 0.5, 
        y: -100, 
        opacity: 0, 
        scrollTrigger: {
            trigger: ".section_header100",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.fromTo(".nav_logo", 
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.3 },
        scrollTrigger: {
            trigger: ".section_header100",
            start: "top 10%",
            toggleActions: "play none none reverse"
        }
    );
</script>