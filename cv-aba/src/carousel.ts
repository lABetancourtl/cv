// src/carousel.ts

const track = document.querySelector<HTMLDivElement>('.carousel-track');
const leftBtn = document.querySelector<HTMLButtonElement>('.arrow.left');
const rightBtn = document.querySelector<HTMLButtonElement>('.arrow.right');

if (track && leftBtn && rightBtn) {
  const items = track.querySelectorAll<HTMLDivElement>('.tech-item');
  const itemWidth = items[0].offsetWidth + 40; // ancho + gap
  const totalItems = items.length;

  // 🔹 Clonar los primeros elementos para el efecto infinito
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollAmount = 0;

  const moveCarousel = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      scrollAmount -= itemWidth;
      if (Math.abs(scrollAmount) >= itemWidth * totalItems) {
        // 🔄 reset al inicio
        scrollAmount = 0;
        track.style.transition = "none";
        track.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.transition = "transform 0.5s ease";
            scrollAmount -= itemWidth;
            track.style.transform = `translateX(${scrollAmount}px)`;
          });
        });
        return;
      }
    } else {
      scrollAmount += itemWidth;
      if (scrollAmount > 0) {
        // 🔄 reset al final
        scrollAmount = -(itemWidth * (totalItems - 1));
        track.style.transition = "none";
        track.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.transition = "transform 0.5s ease";
            scrollAmount += itemWidth;
            track.style.transform = `translateX(${scrollAmount}px)`;
          });
        });
        return;
      }
    }

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(${scrollAmount}px)`;
  };

  rightBtn.addEventListener("click", () => moveCarousel("right"));
  leftBtn.addEventListener("click", () => moveCarousel("left"));
}
