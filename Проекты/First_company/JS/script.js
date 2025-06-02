// Переключение меню (для мобильных устройств)
function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

// Плавная функция ускорения/замедления
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Плавная прокрутка до элемента
function scrollToTarget(target, duration = 800, offset = 100) {
  const targetY = target.getBoundingClientRect().top - offset;
  const startY = window.pageYOffset;
  let startTime = null;

  function animateScroll(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + targetY * eased);

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// Обработка всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);

    if (!target) {
      console.warn(`Целевой элемент не найден: ${href}`);
      return;
    }

    scrollToTarget(target, 1000);

    // Закрыть мобильное меню, если оно открыто
    const menu = document.getElementById('nav-menu');
    if (menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
  });
});
