// ✅ عداد الكلمات
document.addEventListener("DOMContentLoaded", () => {
  const contenuElement = document.getElementById('contenu');
  if (contenuElement) {
    contenuElement.addEventListener('input', function () {
      const text = this.value.trim();
      const count = text === "" ? 0 : text.split(/\s+/).length;
      const wordCount = document.getElementById('word-count');
      if (wordCount) wordCount.textContent = `${count} كلمات`;
    });
  }
});

// ✅ تحميل الصورة
document.getElementById('imageUpload')?.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById('preview-image');
    img.src = e.target.result;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// ✅ دالة الحفظ المؤقت
function sauvegarder() {
  const titre = document.getElementById('titre').value;
  const contenu = document.getElementById('contenu').value;
  const img = document.getElementById('preview-image').src || "";

  if (titre && contenu) {
    const story = {
      id: Date.now(),
      titre,
      contenu,
      image: img
    };

    const oldStories = JSON.parse(localStorage.getItem('storiesPapillon')) || [];
    oldStories.unshift(story);
    localStorage.setItem('storiesPapillon', JSON.stringify(oldStories));

    alert("✅ تم حفظ القصة بنجاح!");
  } else {
    alert("⚠️ المرجو ملء جميع الحقول!");
  }
}

// ✅ دالة النشر مع الخصوصية
function publier() {
  const titre = document.getElementById('titre').value;
  const contenu = document.getElementById('contenu').value;
  const imageSrc = document.getElementById('preview-image').src || "";
  const isPrivate = document.getElementById('privateCheck').checked;
  const password = isPrivate ? prompt("🛡️ أدخل كلمة السر للقصة الخاصة:") : null;

  if (titre && contenu) {
    // المعاينة
    document.getElementById('preview-area').innerHTML =
      `<h3>${titre}</h3>
       ${imageSrc ? `<img src="${imageSrc}" style="max-width:100%; border-radius:10px; margin: 15px 0;">` : ''}
       <p>${contenu}</p>`;

    const histoires = JSON.parse(localStorage.getItem("storiesPapillon")) || [];

    histoires.unshift({
      titre,
      contenu,
      image: imageSrc,
      isPrivate: titre === "ثمن الفضول", // 🔐
      password: titre === "ثمن الفضول" ? "papillon123" : null
    });

    localStorage.setItem("storiesPapillon", JSON.stringify(histoires));
    alert("✅ تم نشر القصة!");
  } else {
    alert("⚠️ المرجو ملء جميع الحقول!");
  }
}
