document.addEventListener("DOMContentLoaded", () => {
  const index = localStorage.getItem("selectedStoryIndex");
  const stories = JSON.parse(localStorage.getItem("storiesPapillon")) || [];
  const story = stories[index];
  const container = document.getElementById("storyContent");

  if (!story) {
    container.innerHTML = "<p>❌ لم يتم العثور على القصة المطلوبة.</p>";
    return; // ✅ داخل event listener، مسموح
  }

  if (story.password) {
    const input = prompt("🔐 هذه القصة محمية بكلمة سر. من فضلك أدخل كلمة المرور:");
    if (input !== story.password) {
      container.innerHTML = "<p>⛔ كلمة المرور غير صحيحة. لا يمكن عرض الرواية.</p>";
      return;
    }
  }

  container.innerHTML = `
    ${story.image ? `<img src="${story.image}">` : ""}
    <h1>${story.titre}</h1>
    <p>${story.contenu.replace(/\n/g, "<br>")}</p>
  `;

  const scrollKey = "scrollPos_" + index;

  // ✅ حفظ التقدم في القراءة
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(scrollKey, window.scrollY);
  });

  // ✅ استعادة التقدم
  const savedScroll = +localStorage.getItem(scrollKey);
  if (savedScroll) window.scrollTo(0, savedScroll);
});


