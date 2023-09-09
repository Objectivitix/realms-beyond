const main = document.querySelector("main");

function sanitizeParagraph(dirtyText) {
  return dirtyText
    .replace(/<em>/g, "<span class=\"italic\">")
    .replace(/<strong>/g, "<span class=\"display\">")
    .replace(/(<\/em>)|(<\/strong>)/g, "</span>")
    .replace(/ ?(&hellip;|\.\.\.) ?/g, "<span class=\"ellipsis\">...</span>")
    .replace(/ ?&mdash; ?/g, "\u2060—");
}

function createParagraph(para) {
  const p = document.createElement("p");
  p.classList.add("para");
  p.innerHTML = sanitizeParagraph(para);

  return p;
}

function createScene(scene) {
  const div = document.createElement("div");
  div.classList.add("scene");

  const paragraphs = scene.split("\n");

  paragraphs.forEach((para) => {
    div.appendChild(createParagraph(para));
  });

  return div;
}

function createChapter(chapter, name) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.id = name.toLowerCase();
  heading.textContent = name;
  section.appendChild(heading);

  const scenes = chapter.split("\n\n");

  scenes.forEach((scene) => {
    section.appendChild(createScene(scene));
  });

  return section;
}

async function render(chapterNames) {
  const response = await fetch("story.txt");
  const text = await response.text();

  const chapters = text.split("\n\n\n");

  chapters.forEach((chapter, index) => {
    const name = chapterNames[index];
    main.appendChild(createChapter(chapter, name));
  });
}

render(["One", "Two", "Three", "Four", "Five", "Epilogue"]);
