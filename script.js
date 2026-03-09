document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Lenis ----------------
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    autoRaf: true,
  });

  window.addEventListener("load", () => {
    lenis.resize();
  });

  document.querySelectorAll("img[loading='lazy']").forEach((img) => {
    img.addEventListener("load", () => lenis.resize());
  });

  gsap.registerPlugin(ScrollTrigger);

  // ---------------- ScrollTrigger <-> Lenis proxy ----------------
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      // return current scroll
      return document.documentElement.scrollTop || window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? "transform" : "fixed",
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // When the page resizes or loads, refresh ScrollTrigger so markers/positions are correct
  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());

  // 1. Floating Island (Navbar) IntersectionObserver
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");

  if (navbar && hero) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            navbar.classList.add("nav-scrolled");
            navbar.classList.remove(
              "text-white",
              "border-white/20",
              "bg-white/10",
              "backdrop-blur-md",
            );

            // Button styling updates needed for active state
            const btn = navbar.querySelector("button");
            if (btn) btn.classList.add("border-gray-300");

            const mobileBtnSpans = navbar.querySelectorAll(
              "#mobile-menu-btn span",
            );
            mobileBtnSpans.forEach((span) => {
              span.classList.remove("bg-white");
              span.classList.add("bg-black");
            });
          } else {
            navbar.classList.remove("nav-scrolled");
            navbar.classList.add(
              "text-white",
              "border-white/20",
              "bg-white/10",
              "backdrop-blur-md",
            );

            const btn = navbar.querySelector("button");
            if (btn) btn.classList.remove("border-gray-300");

            const mobileBtnSpans = navbar.querySelectorAll(
              "#mobile-menu-btn span",
            );
            mobileBtnSpans.forEach((span) => {
              span.classList.remove("bg-black");
              span.classList.add("bg-white");
            });
          }
        });
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );

    observer.observe(hero);
  }

  // 2. The Opening Shot (Hero)
  gsap.from(".hero-text", {
    y: 40,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.3,
  });

  gsap.to("#hero-img", {
    scale: 1,
    duration: 2.5,
    ease: "power2.out",
  });

  // 3. Magnetic Interactions for Buttons
  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.03, duration: 0.3, ease: "power3.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: "power3.out" });
    });
  });

  // 4. Custom Cursor
  const customCursor = document.getElementById("custom-cursor");
  if (customCursor) {
    // Center it exactly on the mouse based on its width/height
    gsap.set(customCursor, { xPercent: -50, yPercent: -50 });

    // Quickly map cursor to mouse coordinates
    let xTo = gsap.quickTo(customCursor, "x", {
      duration: 0.15,
      ease: "power3",
    });
    let yTo = gsap.quickTo(customCursor, "y", {
      duration: 0.15,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    // Expand cursor on interactive elements
    const hoverElements = document.querySelectorAll(
      "a, button, input, .cursor-pointer, label",
    );
    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(customCursor, {
          scale: 2.5,
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(customCursor, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerElement.addEventListener("mouseenter", () => {
        customCursor.classList.add("cursor-light");
      });
      footerElement.addEventListener("mouseleave", () => {
        customCursor.classList.remove("cursor-light");
      });
    }
  }

  // 7. Services Stacking Protocol
  // The blank card issue was caused by GSAP scrubbing the opacity to 0 too early
  // We remove the GSAP interpolation here so that CSS sticky completely controls it.
  // The cards will no longer go blank.

  // 8. Problem & Solution animation is now handled by problem-solution.js

  gsap.from(".artifact-card", {
    scrollTrigger: {
      trigger: ".artifact-card",
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".manifesto-text", {
    scrollTrigger: {
      trigger: "#manifesto",
      start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement, {
          offset: -80, // slightly offset so nav doesn't overlap completely
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    });
  });

  // Mobile Menu Toggle Logic
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileMenu) {
    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;

      // Animate Hamburger Icon
      const spans = mobileMenuBtn.querySelectorAll("span");
      if (isMenuOpen) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";

        // Show Menu
        mobileMenu.classList.remove("translate-x-full", "pointer-events-none");
        mobileMenu.classList.add("translate-x-0", "pointer-events-auto");
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        // Hide Menu
        mobileMenu.classList.remove("translate-x-0", "pointer-events-auto");
        mobileMenu.classList.add("translate-x-full", "pointer-events-none");
      }
    };

    mobileMenuBtn.addEventListener("click", toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }
});
