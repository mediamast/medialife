// =========================
// Register GSAP Plugins
// =========================
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Draggable);

// =========================
// Init Functions
// =========================
function getDeviceType() {
  const screenWidth = window.innerWidth;

  const breakpoints = {
    desktop: screenWidth > 991,
    tablet: screenWidth <= 991 && screenWidth > 767,
    mobileLandscape: screenWidth <= 767 && screenWidth > 479,
    mobilePortrait: screenWidth <= 479
  };

  const current = breakpoints.desktop
    ? 'desktop'
    : breakpoints.tablet
    ? 'tablet'
    : breakpoints.mobileLandscape
    ? 'mobile-landscape'
    : 'mobile-portrait';

  return {
    width: screenWidth,
    type: current,
    isDesktop: breakpoints.desktop,
    isTablet: breakpoints.tablet,
    isMobileLandscape: breakpoints.mobileLandscape,
    isMobilePortrait: breakpoints.mobilePortrait
  };
}

function initScrollSmoother() {
  return ScrollSmoother.create({
    wrapper: '.page-wrapper',
    content: '.page-main',
    smooth: 0.75
  });
}

function initVideoPlayer() {
  document.querySelectorAll('[data-video="wrapper"]').forEach(wrapper => {
    const video = wrapper.querySelector('[data-video="player"]');
    const placeholder = wrapper.querySelector('[data-video="placeholder"]');
    const playBtn = wrapper.querySelector('[data-video="play-btn"]');
    const controls = wrapper.querySelector('[data-video="controls"]');
    const pauseBtn = wrapper.querySelector('[data-video="pause-btn"]');
    const restartBtn = wrapper.querySelector('[data-video="restart-btn"]');
    const muteAudioBtn = wrapper.querySelector('[data-video="mute-audio-btn"]');
    const playAudioBtn = wrapper.querySelector('[data-video="play-audio-btn"]');
    const fullscreenBtn = wrapper.querySelector('[data-video="fullscreen-btn"]');
    
    playAudioBtn.style.display = 'none';
    
    // Play Fullscreen
    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullscreen) { // iOS Safari
        video.webkitEnterFullscreen();
      } else if (video.webkitRequestFullscreen) { // Safari desktop
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else {
        console.warn('Fullscreen API is not supported in this browser.');
      }
    });

    // Play video
    playBtn.addEventListener('click', () => {
      video.play();
      playBtn.style.display = 'none';
      controls.style.display = 'flex';
    });

    // Pause video
    pauseBtn.addEventListener('click', () => {
      video.pause();
    });

    // Restart video
    restartBtn.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
    });
    
    // Mute audio
     muteAudioBtn.addEventListener('click', () => {
      video.muted = true;
      muteAudioBtn.style.display = 'none';
      playAudioBtn.style.display = 'flex';
    });
    
    // Play audio
     playAudioBtn.addEventListener('click', () => {
      video.muted = false;
      playAudioBtn.style.display = 'none';
      muteAudioBtn.style.display = 'flex';
    });

    // Show play button & hide controls when paused
    video.addEventListener('pause', () => {
      playBtn.style.display = 'flex';
      controls.style.display = 'none';
    });

    video.addEventListener('play', () => {
      controls.style.display = 'flex';
      playBtn.style.display = 'none';
      // placeholder stays visible for now
    });

    video.addEventListener('playing', () => {
      placeholder.style.display = 'none';
    });

    // Optional: also hide controls when video ends
    video.addEventListener('ended', () => {
      playBtn.style.display = 'flex';
      controls.style.display = 'none';
    });
  });
}

function initSideImageAlignment() {
  const sideImages = document.querySelectorAll('.image-edge.left, .image-edge.right');
  if (!sideImages.length) return; // ⛔ skip entire init if not needed

  function alignSideImages() {
    sideImages.forEach(image => {
      const container = image.closest('.container');
      if (!container) return;

      const { left, right } = container.getBoundingClientRect();
      const spaceLeft = left;
      const spaceRight = window.innerWidth - right;

      if (image.classList.contains('left')) {
        image.style.marginLeft = `-${spaceLeft}px`;
      } else {
        image.style.marginRight = `-${spaceRight}px`;
      }
    });
  }

  alignSideImages();
  window.addEventListener('resize', alignSideImages);
}

function initMarquee() {
  const wrappers = document.querySelectorAll('[data-marquee="wrapper"]');
  if (!wrappers.length) return; // ⛔ skip entire init if not needed

  wrappers.forEach(wrapper => {
    const content = wrapper.querySelector('[data-marquee="content"]');
    const inner = content?.firstElementChild;
    if (!content || !inner) return;

    const count = parseInt(content.getAttribute('data-marquee-count'), 10) || 2;

    // Clone the inner content 'count' times
    for (let i = 0; i < count; i++) {
      content.appendChild(inner.cloneNode(true));
    }

    // Use requestAnimationFrame to wait until clones are rendered
    requestAnimationFrame(() => {
      const totalWidth = inner.offsetWidth;
      // console.log(totalWidth);

      gsap.to(content, {
        x: `-${totalWidth}px`,
        duration: parseInt(content.getAttribute('data-marquee-duration'), 10) || 20,
        ease: "linear",
        repeat: -1
      });
    });
  });
}

function lazyInitNoodleAnimation() {
  const section = document.querySelector('.section:has(.noodlePath)');
  if (!section) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    once: true,
    onEnter: () => initNoodleAnimation()
  });
}

function initNoodleAnimation() {
  const noodles = document.querySelectorAll('.noodlePath');
  if (!noodles.length) return; // ⛔ skip entire init if not needed

  noodles.forEach(path => {
    const length = path.getTotalLength();
    const noodle = path.closest('.noodleObject');
    const isSnake = noodle.classList.contains('is-snake');
    const isScrub = noodle.classList.contains('is-scrub');

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0 // 👈 hide initially
    });

    let base = {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power3.out",
      onStart: () => gsap.set(path, { opacity: 1 }), // 👈 instant show
      scrollTrigger: {
        trigger: path,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    };

    let animProps = base;

    if (isScrub) {
      animProps = {
        ...base,
        ease: "none",
        scrollTrigger: {
          ...base.scrollTrigger,
          start: "top 60%",
          end: "bottom center",
          scrub: 0.75
        }
      };
    } else if (isSnake) {
      animProps = {
        ...base,
        strokeDasharray: length,
        strokeDashoffset: -length,
        duration: 2.75,
        ease: "power1.inOut"
      };
    }

    gsap.to(path, animProps);
  });
}

function initParallax() {
  const parallaxWrappers = document.querySelectorAll('[parallax-wrapper]');
  if (!parallaxWrappers.length) return; // ⛔ skip entire init if not needed

  parallaxWrappers.forEach(section => {
    section.querySelectorAll('[data-effects-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.effectsParallax) || 0;
      gsap.fromTo(el, { y: -speed }, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  });
}

function initThemeSwitch() {
  const themeSwitchWrappers = document.querySelectorAll('[data-theme-switch]');
  if (!themeSwitchWrappers.length) return; // ⛔ skip entire init if not needed

  themeSwitchWrappers.forEach(section => {
    const mode = section.getAttribute('data-theme-switch');
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => document.body.setAttribute('data-theme', mode === 'single' ? 'light' : 'dark'),
      onLeave: () => document.body.setAttribute('data-theme', mode === 'single' ? 'dark' : 'light'),
      onEnterBack: () => document.body.setAttribute('data-theme', mode === 'single' ? 'light' : 'dark'),
      onLeaveBack: () => document.body.setAttribute('data-theme', mode === 'single' ? 'dark' : 'light'),
    });
  });
}

function initMasonry() {
  const casesList = document.querySelector('.cases-list');
  const blogList = document.querySelector('.blog-list');

  if (!casesList && !blogList) return; // ⛔ skip entire init if not needed

  // Remove previous Macy instances if they exist
  if (window.casesMacy) {
    window.casesMacy.remove();
    window.casesMacy = null;
  }
  if (window.blogMacy) {
    window.blogMacy.remove();
    window.blogMacy = null;
  }

  // Only init Macy if there are visible items
  const visibleCases = casesList?.querySelectorAll('.w-dyn-item:not([aria-hidden="true"])');
  if (casesList && visibleCases && visibleCases.length > 0) {
    window.casesMacy = Macy({
      container: '.cases-list',
      trueOrder: true,
      waitForImages: false,
      columns: 2,
      margin: 64,
      breakAt: {
        991: { columns: 1, margin: 48 },
        767: { columns: 1, margin: 32 }
      }
    });
  }

  const visibleBlogs = blogList?.querySelectorAll('.w-dyn-item:not([aria-hidden="true"])');
  if (blogList && visibleBlogs && visibleBlogs.length > 0) {
    window.blogMacy = Macy({
      container: '.blog-list',
      trueOrder: true,
      waitForImages: false,
      columns: 3,
      margin: 80,
      breakAt: {
        991: { columns: 2, margin: 48 },
        767: { columns: 1, margin: 32 }
      }
    });
  }
}

function initAcademySubscribeForm() {
  const academySubscribeForm = document.querySelector('.academy-subscribe-form');
  if (!academySubscribeForm) return; // ⛔ skip entire init if not needed

  function toggleInputGroup(checkboxSelector, groupClass) {
    const checkbox = document.querySelector(`[data-form="${checkboxSelector}"]`);
    const inputGroup = document.querySelector(`.input-group.cc-${groupClass}`);

    if (checkbox && inputGroup) {
      inputGroup.style.display = checkbox.checked ? "flex" : "none";
      checkbox.addEventListener("change", () => {
        inputGroup.style.display = checkbox.checked ? "flex" : "none";
      });
    }
  }

  toggleInputGroup("academy-vat", "academy-vat");
  toggleInputGroup("academy-alt-address", "academy-alt-address");

  const priceElement = document.querySelector('[data-form="academy-total-price"]');
  const countInput = document.querySelector('[data-form="academy-subscribers-count"]');

  if (priceElement && countInput) {
    const basePrice = parseFloat(priceElement.textContent.trim()) || 0;

    function updateTotalPrice() {
      const count = parseInt(countInput.value) || 0;
      const total = basePrice * count;
      priceElement.textContent = total.toFixed(2);
    }

    updateTotalPrice();
    countInput.addEventListener("input", updateTotalPrice);
  }
}

function initTimeToRead () {
  const label = document.querySelector('[data-ttr="label"]');
  const content = document.querySelector('[data-ttr="content"]');

  if (label && content) {
    const text = content.innerText || content.textContent || '';
    const words = text.trim().match(/\w+/g);
    const wordCount = words ? words.length : 0;

    const minutes = Math.ceil(wordCount / 200); // 200 woorden per minuut
    const labelText = `${minutes} ${minutes === 1 ? 'minuut' : 'minuten'} leestijd`;
    label.textContent = labelText;
  }
}

function initTeamCardHoverVideo() {
  
  const wrappers = document.querySelectorAll('.team-card');

  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    if (!video) return;

    wrapper.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play();
    });

    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

function initFeaturedCoreItemHoverVideo() {
  const wrappers = document.querySelectorAll('.featured-core-item');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const videoWrapper = wrapper.querySelector('.featured-core-item-video-wrapper');
    const video = videoWrapper?.querySelector('video');

    if (!videoWrapper || !video) return;

    // Ensure pointer events are disabled permanently
    videoWrapper.style.pointerEvents = 'none';

    // Hide initially (only once)
    gsap.set(videoWrapper, {
      opacity: 0,
      x: 0,
      rotate: 0
    });

    let hoverTween;

    function showVideo() {
      // Random direction (left or right)
      const direction = Math.random() < 0.5 ? -1 : 1;
      const moveX = direction * 48;
      const rotate = direction * gsap.utils.random(1, 4);

      hoverTween = gsap.to(videoWrapper, {
        opacity: 1,
        x: moveX,
        rotate: rotate,
        duration: 0.4,
        ease: 'power3.out'
      });

      video.currentTime = 0;
      video.play();
    }

    function hideVideo() {
      // Stop any ongoing animation
      if (hoverTween) hoverTween.kill();

      gsap.to(videoWrapper, {
        opacity: 0,
        x: 0,
        rotate: 0,
        duration: 0.175,
        ease: 'power2.inOut',
      });
    }

    // Main hover logic
    wrapper.addEventListener('mouseenter', showVideo);
    wrapper.addEventListener('mouseleave', hideVideo);

    // Extra failsafe: hide on scroll or page interaction
    document.addEventListener('scroll', hideVideo, { passive: true });
  });
}

function initRandomHoverAnimation() {
  const randomHoverElements = document.querySelectorAll('[data-animate="randomHover"]');
  if (!randomHoverElements.length) return; // ⛔ skip entire init if not needed

  // ✅ Reusable GSAP hover animation
    function applyRandomHoverAnimation(element) {
      element.addEventListener('mouseenter', () => {
        const randomRotation = gsap.utils.random(-4, 4);
        gsap.to(element, {
          scale: 1.05,
          rotate: randomRotation,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      });
    }

    // ✅ Apply to all elements with [data-animate="randomHover"]
    randomHoverElements.forEach(el => {
      applyRandomHoverAnimation(el);
    });
}

function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorLabel = cursor.querySelector('.cursor-label');

  const cursorHoverElements = document.querySelectorAll('[data-cursor]')
  if (!cursorHoverElements.length) return; // ⛔ skip entire init if not needed

  // Handle hover on [data-cursor] elements
  cursorHoverElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const value = el.getAttribute('data-cursor');
      cursorLabel.textContent = value;

      gsap.to(cursorDot, { opacity: 1, duration: .2, ease: 'power2.out' });
      gsap.to(cursorLabel, { scale: 1.1, rotate: gsap.utils.random(-25, 25), duration: .8, ease: 'power3.out' });
      document.body.style.cursor = 'none';
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(cursorDot, { opacity: 0, duration: 0.2, ease: 'power2.out' });
      gsap.to(cursorLabel, { scale: 1, rotate: 0, duration: .8, ease: 'power3.out' });
      document.body.style.cursor = '';
    });
  });
}

function initAnimations() {
  (function animateSections() {
    document.querySelectorAll("section:not(:first-of-type)").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,         // 👈 this targets the element itself
          start: "top 68%",    // adjust as needed
        },
        opacity: 0,
        y: 32,
        duration: .8,
        ease: 'power2.out'
      }); // ← this closing parenthesis was missing
    });
  })();
}

// =========================
// Webflow & Finsweet Hook
// =========================
window.Webflow ||= [];
window.Webflow.push(() => {

  const device = getDeviceType();

  // console.log(`Current device: ${device.type} (${device.width}px)`);

  if (device.isDesktop) {
    initFeaturedCoreItemHoverVideo();

    const smoother = initScrollSmoother();
    window.addEventListener('load', () => {
    imagesLoaded(document.body, () => {
      smoother?.refresh?.();
      ScrollTrigger.refresh();
    });
  
  });
  }
  
  initAnimations();
  initVideoPlayer();
  initMasonry();
  initSideImageAlignment();
  lazyInitNoodleAnimation();
  initParallax();
  initThemeSwitch();
  initAcademySubscribeForm();
  initMarquee();
  initTimeToRead();
  initRandomHoverAnimation();
  initCustomCursor();
  initTeamCardHoverVideo();

});

window.FinsweetAttributes ||= [];
window.FinsweetAttributes.push([
  'list',
  (listInstances) => {
    listInstances.forEach((listInstance) => {
      listInstance.addHook('afterRender', () => {
        initMasonry(); // Run your updated function after filtering/rendering
        initCustomCursor(); // Run your updated function after filtering/rendering
      });
    });
  },
]);