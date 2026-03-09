document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const problemSection = document.getElementById("problem-solution-section");
  if (!problemSection) return;

  // Assign parallax speeds to images to make them go up separately
  const applySpeeds = (selector) => {
    const elements = gsap.utils.toArray(selector);
    elements.forEach((el, i) => {
      // Different speeds to create parallax
      el.dataset.speed = 1 + (i % 4) * 0.4;
    });
    return elements;
  };

  const problemImages = applySpeeds("#problem-images-group > div");
  const mobileProblemImages = applySpeeds("#mobile-problem-images > div");

  const solutionImages = applySpeeds("#solution-images-group > div");
  const mobileSolutionImages = applySpeeds("#mobile-solution-images > div");

  // Initial states setup
  gsap.set("#solution-images-group", { yPercent: 120 });
  gsap.set("#mobile-solution-images", { yPercent: 120 });

  gsap.set("#central-problem", { opacity: 1, y: 0 }); // Visible initially
  gsap.set("#central-solution", { opacity: 0, y: 40 });
  gsap.set("#central-result", { opacity: 0, y: 40 });

  // --- Continuous Upward Scrolling Timeline ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: problemSection,
      start: "top top",
      end: "+=1500", // Reduced scroll length for a faster, single-scroll feel
      pin: true,
      scrub: 1,
    },
  });

  // 1. Move ALL Image Wrappers Upwards Continuously
  tl.to(
    "#problem-images-group",
    { yPercent: -300, duration: 20, ease: "none" },
    0,
  )
    .to(
      "#mobile-problem-images",
      { yPercent: -300, duration: 20, ease: "none" },
      0,
    )

    .to(
      "#solution-images-group",
      { yPercent: -180, duration: 20, ease: "none" },
      0,
    )
    .to(
      "#mobile-solution-images",
      { yPercent: -180, duration: 20, ease: "none" },
      0,
    );

  // Add individual Parallax drift
  [
    problemImages,
    mobileProblemImages,
    solutionImages,
    mobileSolutionImages,
  ].forEach((group) => {
    tl.to(
      group,
      {
        y: (i, el) => -150 * parseFloat(el.dataset.speed) + "vh",
        duration: 20,
        ease: "none",
      },
      0,
    );
  });

  // 2. Text Fades during the continuous scroll
  // Problem -> Solution
  tl.to(
    "#central-problem",
    { opacity: 0, y: -40, duration: 2, ease: "power2.inOut" },
    4,
  );
  tl.to(
    "#central-solution",
    { opacity: 1, y: 0, duration: 2, ease: "power2.inOut" },
    5,
  );

  // Solution -> Result
  tl.to(
    "#central-solution",
    { opacity: 0, y: -40, duration: 2, ease: "power2.inOut" },
    12,
  );
  tl.to(
    "#central-result",
    { opacity: 1, y: 0, duration: 2, ease: "power2.inOut" },
    13,
  );
});
