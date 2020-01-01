import data from "./mockData.js";

const BOOKS_PER_PAGE = 6;
const numberOfPages = Math.ceil(data.length / BOOKS_PER_PAGE);
const lastPageIndex = numberOfPages - 1;
let currentPage = 0;
let buttons = []; // associative array to get button by number

const getTable = () => document.getElementsByTagName("table")[0];

const getBooksForPage = () => {
  const firstBookIndex = currentPage * BOOKS_PER_PAGE;
  return data.slice(firstBookIndex, firstBookIndex + BOOKS_PER_PAGE);
};

const activateButton = (buttonElement = new HTMLButtonElement()) => {
  buttonElement.classList.add("active");
  buttonElement.setAttribute("aria-pressed", "true");
};

const deactivateButton = (buttonElement = new HTMLButtonElement()) => {
  buttonElement.classList.remove("active");
  buttonElement.setAttribute("aria-pressed", "false");
};

const insertTableRow = (id, title, author) => {
  const table = getTable();

  const row = table.insertRow();

  const idCell = row.insertCell(0);
  const titleCell = row.insertCell(1);
  const authorCell = row.insertCell(2);

  idCell.innerHTML = id;
  titleCell.innerHTML = title;
  authorCell.innerHTML = author;
};

const insertAllRows = () => {
  const books = getBooksForPage();
  books.forEach(book => insertTableRow(book.id, book.title, book.author));
};

const clearRows = () => {
  const table = getTable();
  const HEADER_OFFSET = 1;
  const numberOfRows = () =>
    table.getElementsByTagName("tr").length - HEADER_OFFSET;

  while (numberOfRows() > 0) {
    table.deleteRow(-1);
  }
};

const goToPage = pageIndex => {
  deactivateButton(buttons[currentPage]);
  activateButton(buttons[pageIndex]);
  currentPage = pageIndex;
  clearRows();
  insertAllRows();
};

const changePage = (num = 0) => {
  const nextPage = currentPage + num;
  console.log(`NextPage: ${nextPage}`);
  console.log(`MaxPage: ${lastPageIndex}`);
  if (nextPage < 0) {
    console.log("Already at first page.");
  } else if (nextPage > lastPageIndex) {
    console.log("Already at last page.");
  } else {
    goToPage(nextPage);
  }
  console.log(`Page: ${currentPage}`);
};

const nextPage = () => changePage(1);

const previousPage = () => changePage(-1);

const onclick = (id = "", callback = () => undefined) =>
  document.getElementById(id).addEventListener("click", callback);

const addPageButtons = () => {
  const span = document.getElementById("pageButtons");
  for (let index = 0; index <= lastPageIndex; index++) {
    const button = document.createElement("button");
    button.innerHTML = index;
    button.className = "btn btn-primary";
    button.addEventListener("click", () => goToPage(index));
    span.appendChild(button);
    buttons[index] = button; // add to hashmap for reference
  }
  activateButton(buttons[0]);
};

document.addEventListener("DOMContentLoaded", () => {
  addPageButtons();
  onclick("btnNext", nextPage);
  onclick("btnPrevious", previousPage);
  insertAllRows();
});
