// ✅ sauvegarder قصة بسيطة (اختياري)
function sauvegarder() {
  const titre = document.getElementById("titre")?.value;
  const contenu = document.getElementById("contenu")?.value;

  if (!titre?.trim() || !contenu?.trim()) {
    alert("⛔ المرجو ملء العنوان والمحتوى!");
    return;
  }

  const livres = JSON.parse(localStorage.getItem("livres")) || [];
  livres.push({ titre, contenu });
  localStorage.setItem("livres", JSON.stringify(livres));

  alert("✅ تم حفظ القصة بنجاح!");
  document.getElementById("titre").value = "";
  document.getElementById("contenu").value = "";
}

// ✅ عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // الروايات
  const data = JSON.parse(localStorage.getItem('storiesPapillon')) || [];
  const riwayatTrack = document.getElementById('riwayat-track');

  if (riwayatTrack) {
    data.forEach((story, index) => {
      const box = document.createElement('div');
      box.className = "carousel-item";
      box.innerHTML = `
        ${story.image ? `<img src="${story.image}">` : `<div style="height:150px;background:#eee;">📖</div>`}
        <h3 style="padding: 5px;">${story.titre}</h3>
        <button onclick="readStory(${index})">📖 اقرأ</button>
      `;
      riwayatTrack.appendChild(box);
    });
  }

  // باقي الكود...



  // ===== قسم "صور ملهمة" =====
  const track = document.getElementById('inspiration-track');
  const savedImages = JSON.parse(localStorage.getItem('inspirationImages')) || [];
  if (track) {
   savedImages.forEach((img, index) => {
  const box = document.createElement('div');
  box.className = 'carousel-item';
  box.innerHTML = `
    <img src="${img.src}">
    <p class="caption">${img.caption}</p>
    
  `;
  track.appendChild(box);
});

  }
});

// ✅ قراءة قصة معينة والانتقال
function readStory(index) {
  localStorage.setItem("selectedStoryIndex", index);
  window.location.href = "livres.html";
}

// ✅ البحث عن القصص
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const keyword = this.value.trim();
    const stories = JSON.parse(localStorage.getItem('storiesPapillon')) || [];
    const results = document.getElementById('searchResults');
    if (!results) return;
    results.innerHTML = "";

    if (keyword === "") return;

    const filtered = stories.filter(story =>
      story.titre.toLowerCase().includes(keyword.toLowerCase())
    );

    if (filtered.length === 0) {
      results.innerHTML = "<p>📭 لا توجد نتائج مطابقة.</p>";
      return;
    }

    filtered.forEach((story, index) => {
      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        <div class="story-row">
          ${story.image ? `<img src="${story.image}">` : `<div style="height:150px;background:#eee;">📖</div>`}

          <div class="story-content">
            <h3>${story.titre}</h3>
            <button onclick="openStoryFromSearch(${index})">📖 اقرأ القصة</button>
          </div>
        </div>
      `;
      results.appendChild(card);
    });
  });
}

function openStoryFromSearch(index) {
  localStorage.setItem("selectedStoryIndex", index);
  window.location.href = "livres.html";
}

// ✅ تحميل صور ملهمة جديدة
const inspireInput = document.getElementById('inspire-upload');
if (inspireInput) {
  inspireInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageSrc = e.target.result;
      const caption = prompt("📌 أدخل عبارة تحفيزية لهذه الصورة:");
      if (!caption) return;

      const box = document.createElement('div');
      box.className = 'carousel-item';
      box.innerHTML = `
        <img src="${imageSrc}">
        <p class="caption">${caption}</p>
      `;

      const track = document.getElementById('inspiration-track');
      if (track) track.appendChild(box);

      const current = JSON.parse(localStorage.getItem('inspirationImages')) || [];
      current.push({ src: imageSrc, caption });
      localStorage.setItem('inspirationImages', JSON.stringify(current));
    };
    reader.readAsDataURL(file);
  });
}

