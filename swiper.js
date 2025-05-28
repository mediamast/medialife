document.addEventListener("DOMContentLoaded", () => {

    // ===================================
    // Swiper – Featured Cases
    // ===================================
    
    const featuredCases = document.querySelector(".featured-cases");

    if(featuredCases){
      const featuredCasesSwiper = new Swiper('.swiper.cc-featured-cases', {
        loop: true,
        direction: 'horizontal',
        speed: 500,
        slidesPerView: 1.5, // Mobile Portrait
        spaceBetween: 16,

        breakpoints: {
            // Mobile Landscape: when window width is >= 479px
            479: {
                slidesPerView: 'auto',
                spaceBetween: 16
              },
            // Tablet: when window width is >= 768px
            768: {
              slidesPerView: 'auto',
              spaceBetween: 32
            },
            // Desktop: when window width is >= 992px
            992: {
              slidesPerView: 'auto',
              spaceBetween: 64
            }
        },
      
        // Navigation arrows
        navigation: {
          nextEl: featuredCases.querySelector("[data-swiper='next-btn']"),
          prevEl: featuredCases.querySelector("[data-swiper='prev-btn']"),
        }
      });
    }

    // ===================================
    // Swiper – Featured Services
    // ===================================
    
    // const featuredServices = document.querySelector(".featured-services");

    // if (featuredServices){
    //   const featuredServicesSwiper = new Swiper('.swiper.cc-featured-services', {
    //     slidesPerView: 'auto',    
    //     direction: 'horizontal',
    //     speed: 5000,
    //     loop: true,
    //     autoplay: {
    //       delay: 0,
    //       disableOnInteraction: false,
    //     },
    //     touchStartPreventDefault: false,
    //     allowTouchMove: true,
    //   });
    // }

    // ===================================
    // Swiper – Overflow Images
    // ===================================
    
    // const overflowImages = document.querySelector(".overflow-images");

    // if (overflowImages) {
    //   const overflowImagesSwiper = new Swiper('.swiper.cc-overflow-images', {
    //     slidesPerView: 'auto',    
    //     direction: 'horizontal',
    //     speed: 500,
    //     loop: true,
    //     autoplay: {
    //       delay: 0,
    //       disableOnInteraction: false,
    //     },
    //     // touchStartPreventDefault: false,
    //     allowTouchMove: true,
        
    //       navigation: {
    //         nextEl: overflowImages.querySelector("[data-swiper='next-btn']"),
    //         prevEl: overflowImages.querySelector("[data-swiper='prev-btn']"),
    //       }
    //   });
    // }

    // ===================================
    // Swiper – Subscribe Academies
    // ===================================
    
    const subscribeAcademies = document.querySelector(".subscribe-academies");

    if (subscribeAcademies){
      const subscribeAcademiesSwiper = new Swiper('.swiper.cc-subscribe-academies', {
        loop: true,
        direction: 'horizontal',
        speed: 500,
        slidesPerView: 1.5,
        spaceBetween: 24,

        breakpoints: {
            // Mobile Landscape: when window width is >= 479px
            479: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
            // Tablet: when window width is >= 768px
            768: {
              slidesPerView: 2.5,
              spaceBetween: 32,
            },
            // Desktop: when window width is >= 992px
            992: {
              slidesPerView: 3.5,
              spaceBetween: 32,
            }
        },

        navigation: {
          nextEl: subscribeAcademies.querySelector("[data-swiper='next-btn']"),
          //prevEl: subscribeAcademies.querySelector("[data-swiper='prev-btn']"),
        }
      });
    }

    // ===================================
    // Swiper – Testimonials Cards
    // ===================================
    
    const testimonialCards = document.querySelector(".testimonial-cards");

    if (testimonialCards) {
      const testimonialCardsSwiper = new Swiper('.swiper.cc-testimonial-cards', {
          effect: "cards",
          grabCursor: true,
        
          navigation: {
            nextEl: testimonialCards.querySelector("[data-swiper='next-btn']"),
            prevEl: testimonialCards.querySelector("[data-swiper='prev-btn']"),
          }
      });
    }

});