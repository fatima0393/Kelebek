

  const stories = JSON.parse(localStorage.getItem("storiesPapillon")) || [];
  const grid = document.getElementById("storyGrid");

  if (stories.length === 0) {
    grid.innerHTML = "<p style='text-align:center;'>📭 لا توجد روايات بعد.</p>";
  } else {
    stories.forEach((story, index) => {
      const card = document.createElement("div");
      card.className = "story-card";

      const debut = story.contenu.split(" ").slice(0, 25).join(" ") + "...";

      card.innerHTML = `
        ${story.image ? `<img src="${story.image}" />` : `<div style="height:160px; background:#eee; display:flex; align-items:center; justify-content:center;">📖</div>`}
        <h3>${story.titre}</h3>
        <p>${debut}</p>
        <button onclick="openStory(${index})">📖 اقرأ المزيد</button>
      `;

      grid.appendChild(card);
    });
  }

  function openStory(index) {
    localStorage.setItem("selectedStoryIndex", index);
    window.location.href = "i9ra2.html";
  }



