/* =====================================================
   BOOK ENGINE
===================================================== */

const sheetA = document.getElementById("sheet-a");
const sheetB = document.getElementById("sheet-b");

const textA = document.getElementById("text-a");
const textB = document.getElementById("text-b");

/* =====================================================
   PAGES
===================================================== */

const pages = [
    "TEST ENGINE",
    "PAGE 1",
    "PAGE 2",
    "PAGE 3",
    "THE END"
];

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
   INITIAL
===================================================== */

topText.textContent = pages[0];
bottomText.textContent = pages[1];

/* =====================================================
   CLICK
===================================================== */

book.addEventListener("click", nextPage);

function nextPage() {

    if (turning)
        return;

    if (currentPage >= pages.length - 1)
        return;

    turning = true;

    topSheet.classList.add("turn");

}

/* =====================================================
   TURN FINISHED
===================================================== */

topSheet.addEventListener("animationend", finishTurn);

function finishTurn() {

    currentPage++;

    // Reset animation
    topSheet.classList.remove("turn");

    // Put turned sheet underneath
    topSheet.style.zIndex = 1;
    bottomSheet.style.zIndex = 2;

    // Update the sheet that just went underneath
    if (currentPage + 1 < pages.length) {

        topText.textContent = pages[currentPage + 1];

    } else {

        topText.textContent = "";

    }

    // Swap references
    [topSheet, bottomSheet] = [bottomSheet, topSheet];
    [topText, bottomText] = [bottomText, topText];

    // Remove old listener
    sheetA.removeEventListener("animationend", finishTurn);
    sheetB.removeEventListener("animationend", finishTurn);

    // Listen to the new top sheet
    topSheet.addEventListener("animationend", finishTurn);

    turning = false;

}