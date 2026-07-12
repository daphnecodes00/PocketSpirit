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

loadBook();

/* =====================================================
   LOAD BOOK
===================================================== */

async function loadBook() {

    const response = await fetch("books/demo.json");

    const bookData = await response.json();

    pages = bookData.pages;

    topText.innerHTML = renderPage(pages[0]);
    bottomText.innerHTML = renderPage(pages[1]);

    sheetA.style.zIndex = 2;
    sheetB.style.zIndex = 1;

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

function renderCover(page) {

    return `
        <div class="cover-page">

            <h1>${page.title}</h1>

            <p>${page.subtitle}</p>

        </div>
    `;

}

function renderQuote(page) {

    return `
        <div class="quote-page">

            <blockquote>

                ${page.text}

            </blockquote>

            <small>

                ${page.author}

            </small>

        </div>
    `;

}

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

    if (currentPage + 1 < pages.length) {

        bottomText.innerHTML = renderPage(
            pages[currentPage + 1]
        );

    } else {

        bottomText.innerHTML = "";

    }

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