var swiper;

document.addEventListener('DOMContentLoaded', function () {
  swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '3',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      init: function () {
        applyBlurEffect();
        styleNavigationButtons();
      },
      slideChange: function () {
        applyBlurEffect();
      },
      slideChangeTransitionEnd: function () {
        applyBlurEffect();
      },
    },
  });

  function applyBlurEffect() {
    if (!swiper || swiper.activeIndex === undefined) return;

    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(function (slide, index) {
      if (index === swiper.activeIndex) {
        slide.classList.remove('blur');
      } else {
        slide.classList.add('blur');
      }
    });
  }

  function styleNavigationButtons() {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');

    if (nextButton && prevButton) {
      nextButton.style.color = 'white';
      nextButton.style.border = 'none';
      nextButton.style.fontSize = '24px';
      nextButton.style.width = '50px';
      nextButton.style.height = '50px';
      nextButton.style.display = 'flex';
      nextButton.style.justifyContent = 'center';
      nextButton.style.alignItems = 'center';
      nextButton.style.cursor = 'pointer';
      nextButton.style.borderRadius = '50%';

      prevButton.style.color = 'white';
      prevButton.style.border = 'none';
      prevButton.style.fontSize = '24px';
      prevButton.style.width = '50px';
      prevButton.style.height = '50px';
      prevButton.style.display = 'flex';
      prevButton.style.justifyContent = 'center';
      prevButton.style.alignItems = 'center';
      prevButton.style.cursor = 'pointer';
      prevButton.style.borderRadius = '50%';
      
      nextButton.addEventListener('mouseover', function() {
        nextButton.style.color = 'gray';
      });
      nextButton.addEventListener('mouseout', function() {
        nextButton.style.color = 'white';
      });

      prevButton.addEventListener('mouseover', function() {
        prevButton.style.color = 'gray';
      });
      prevButton.addEventListener('mouseout', function() {
        prevButton.style.color = 'white';
      });
    }
  }

  // Função para carregar fotos do servidor ou localStorage
  function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    const swiperWrapper = document.getElementById('swiper-wrapper');
    photos.forEach(photo => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide blur';
      const img = document.createElement('img');
      img.src = photo;
      slide.appendChild(img);
      swiperWrapper.insertBefore(slide, swiperWrapper.lastElementChild);
    });
    swiper.update();
    applyBlurEffect();
  }


  swiper.update();
  applyBlurEffect();
});
