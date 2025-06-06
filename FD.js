// Animate elements as they scroll into view and add click interactivity with popups
const revealOnScroll = () => {
  const items = document.querySelectorAll('.item-box');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  items.forEach(item => {
    observer.observe(item);

    // Add click interaction
    item.addEventListener('click', () => {
      item.classList.add('active');
      setTimeout(() => item.classList.remove('active'), 600);

      const popup = document.createElement('div');
      popup.className = 'popup-description';
      popup.innerText = item.getAttribute('data-description') || 'Delicious dessert item!';
      document.body.appendChild(popup);

      const rect = item.getBoundingClientRect();
      popup.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
      popup.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;

      setTimeout(() => {
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
          setTimeout(() => popup.remove(), 300);
        }, 2000);
      }, 50);
    });
  });
};

document.addEventListener('DOMContentLoaded', revealOnScroll);


