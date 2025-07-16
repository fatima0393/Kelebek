document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const images = JSON.parse(localStorage.getItem('inspirationImages')) || [];

  images.forEach(img => {
    const card = document.createElement('div');
    card.className = 'inspiration-card';
    card.innerHTML = `
      <img src="${img.src}">
      <p>${img.caption}</p>
    `;
    gallery.appendChild(card);
  });
});

document.getElementById('upload-inspiration').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageSrc = e.target.result;
    const caption = prompt("📌 أدخل عبارة تحفيزية:");

    if (!caption) return;

    // حفظ في localStorage
    const current = JSON.parse(localStorage.getItem('inspirationImages')) || [];
    current.push({ src: imageSrc, caption });
    localStorage.setItem('inspirationImages', JSON.stringify(current));

    // تحديث الصفحة مباشرة
    const gallery = document.getElementById('gallery');
    const card = document.createElement('div');
    card.className = 'inspiration-card';
    card.innerHTML = `
      <img src="${imageSrc}">
      <p>${caption}</p>
    `;
    gallery.appendChild(card);
  };
  reader.readAsDataURL(file);
});
