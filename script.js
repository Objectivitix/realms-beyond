const main = document.querySelector("main");

const chapterNames =
  Array.from(document.querySelectorAll("nav a"))
  .map(node => node.textContent);

const HEADING_IDS = "abcdefghijklmnopqrstuvwxyz";

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

function createChapter(chapter, name, headingID) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.id = headingID;
  heading.textContent = name;
  section.appendChild(heading);

  const scenes = chapter.split("\n\n");

  scenes.forEach((scene) => {
    section.appendChild(createScene(scene));
  });

  return section;
}

async function render() {
  const response = await fetch("story.txt");
  const text = await response.text();

  const chapters = text.split("\n\n\n");

  chapters.forEach((chapter, index) => {
    const name = chapterNames[index];
    const headingID = HEADING_IDS[index];
    main.appendChild(createChapter(chapter, name, headingID));
  });
}

render();
