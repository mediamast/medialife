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
        slidesPerView: 'auto',
      
        // Navigation arrows
        navigation: {
          nextEl: featuredCases.querySelector("[data-swiper='next-btn']"),
          prevEl: featuredCases.querySelector("[data-swiper='prev-btn']"),
        }
      });
    }

    // ===================================
    // Swiper – Subscribe Academies
    // ===================================
    
    const subscribeAcademies = document.querySelector(".subscribe-academies");

    if (subscribeAcademies){
      const subscribeAcademiesSwiper = new Swiper('.swiper.cc-subscribe-academies', {
        loop: true,
        direction: 'horizontal',
        speed: 500,
        slidesPerView: 'auto',

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