/* =====================================================
   BOOK ENGINE
===================================================== */

const book = document.getElementById("book");

const sheetA = document.getElementById("sheet-a");
const sheetB = document.getElementById("sheet-b");

const textA = document.getElementById("text-a");
const textB = document.getElementById("text-b");

/* =====================================================
   PAGES
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

    // Reset animation
    topSheet.classList.remove("turn");

    // Swap z-index
    topSheet.style.zIndex = 1;
    bottomSheet.style.zIndex = 2;

    // Swap references
    [topSheet, bottomSheet] = [bottomSheet, topSheet];
    [topText, bottomText] = [bottomText, topText];

    // Load next page into the hidden sheet
    if (currentPage + 1 < pages.length) {

        bottomText.textContent = pages[currentPage + 1];

    } else {

        bottomText.textContent = "";

    }

    // Move listener to the new top sheet
    sheetA.removeEventListener("animationend", finishTurn);
    sheetB.removeEventListener("animationend", finishTurn);

    topSheet.addEventListener("animationend", finishTurn);

    turning = false;

}

async function loadBook() {

    const response = await fetch("books/demo.json");

    const book = await response.json();

    pages = book.pages.map(page => page.text);

    topText.textContent = pages[0];
    bottomText.textContent = pages[1];

    sheetA.style.zIndex = 2;
    sheetB.style.zIndex = 1;

}