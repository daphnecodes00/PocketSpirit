/* =====================================================
   BOOK ENGINE
===================================================== */

const book = document.getElementById("book");

const sheetA = document.getElementById("sheet-a");
const sheetB = document.getElementById("sheet-b");

const textA = document.getElementById("text-a");
const textB = document.getElementById("text-b");

/* =====================================================
   BOOK DATA
===================================================== */

let currentCharacter = null;

let pages = [];

/* =====================================================
   STATE
===================================================== */

let currentPage = 0;
let turning = false;

let topSheet = sheetA;
let bottomSheet = sheetB;

let topText = textA;
let bottomText = textB;

/* =====================================================
   INITIALIZE
===================================================== */

start();

/* =====================================================
   LOAD BOOK
===================================================== */

async function start() {

    const params = new URLSearchParams(window.location.search);

    const characterId = params.get("id") || "pepper";

    await initializeApp(characterId);

}

async function initializeApp(characterId) {

    const character = await loadCharacter(characterId);

    currentCharacter = character;

    pages = buildExperience(character);

    resetBook();

    renderCurrentPages();

}

/* =====================================================
   RESET BOOK
===================================================== */

function resetBook() {

    currentPage = 0;
    turning = false;

    topSheet = sheetA;
    bottomSheet = sheetB;

    topText = textA;
    bottomText = textB;

    sheetA.classList.remove("turn");
    sheetB.classList.remove("turn");

    sheetA.style.zIndex = 2;
    sheetB.style.zIndex = 1;

}

/* =====================================================
   LOAD CHARACTER
===================================================== */

async function loadCharacter(id) {

    const response = await fetch(`data/${id}.json`);

    return await response.json();

}

/* =====================================================
   BUILD EXPERIENCE
===================================================== */

function buildExperience(character) {

    const today = new Date().toDateString();

let savedDate = localStorage.getItem("pocketSpiritDate");
let savedExperience = localStorage.getItem("pocketSpiritExperience");

    if (savedDate !== today) {

     savedDate = today;

     savedExperience = Math.floor(
        Math.random() * character.experiences.length
      );

      localStorage.setItem("pocketSpiritDate", savedDate);
     localStorage.setItem("pocketSpiritExperience", savedExperience);

    }

    const experience = character.experiences[Number(savedExperience)];

    return [
        {
            type: "cover",
            title: character.name,
            subtitle: character.subtitle,
            image: character.images.base
        },
        {
            type: "quote",
            text: experience.whisper,
            author: `— ${character.name}`,
            image: character.images.base
        },
        {
            type: "reflection",
            question: experience.reflection
        },
        {
            type: "ending",
            title: experience.farewell
        }
    ];

}

/* =====================================================
   RENDER CURRENT PAGES
===================================================== */

function renderCurrentPages() {

    topText.innerHTML =
        pages[currentPage]
            ? renderPage(pages[currentPage])
            : "";

    bottomText.innerHTML =
        pages[currentPage + 1]
            ? renderPage(pages[currentPage + 1])
            : "";

}

/* =====================================================
   PAGE RENDERER
===================================================== */

function renderPage(page) {

    switch (page.type) {

        case "cover":
            return renderCover(page);

        case "quote":
            return renderQuote(page);

        case "reflection":
            return renderReflection(page);

        case "ending":
            return renderEnding(page);

        default:
            return "<p>Unknown Page</p>";

    }

}

/* =====================================================
   COVER
===================================================== */

function renderCover(page) {

    return `
        <div class="cover-page">

            ${
                page.image
                    ? `<img
                        class="cover-image"
                        src="${page.image}"
                        alt="${page.title}">`
                    : ""
            }

            <h1>${page.title}</h1>

            <p>${page.subtitle}</p>

        </div>
    `;

}

/* =====================================================
   QUOTE
===================================================== */

function renderQuote(page) {

    return `
        <div class="quote-page">

            ${
                page.image
                    ? `<img
                        class="quote-image"
                        src="${page.image}"
                        alt="">`
                    : ""
            }

            <blockquote>

                ${page.text}

            </blockquote>

            <small>

                ${page.author}

            </small>

        </div>
    `;

}

/* =====================================================
   REFLECTION
===================================================== */

function renderReflection(page) {

    return `
        <div class="reflection-page">

            <h2>Reflect</h2>

            <p>

                ${page.question}

            </p>

        </div>
    `;

}

/* =====================================================
   ENDING
===================================================== */

function renderEnding(page) {

    return `
        <div class="ending-page">

            <h1>

                ${page.title}

            </h1>

        </div>
    `;

}

/* =====================================================
   NEXT PAGE
===================================================== */

book.addEventListener("click", nextPage);

// Future entry point for AR
window.openBook = function () {

    resetBook();

    renderCurrentPages();

};

function nextPage() {

    if (turning) return;

    if (currentPage >= pages.length - 1) return;

    turning = true;

    topSheet.classList.add("turn");

}

/* =====================================================
   TURN COMPLETE
===================================================== */

sheetA.addEventListener("animationend", finishTurn);

function finishTurn() {

    currentPage++;

    topSheet.classList.remove("turn");

    topSheet.style.zIndex = 1;
    bottomSheet.style.zIndex = 2;

    [topSheet, bottomSheet] = [bottomSheet, topSheet];
    [topText, bottomText] = [bottomText, topText];

    renderCurrentPages();

    sheetA.removeEventListener(
        "animationend",
        finishTurn
    );

    sheetB.removeEventListener(
        "animationend",
        finishTurn
    );

    topSheet.addEventListener(
        "animationend",
        finishTurn
    );

    turning = false;

}