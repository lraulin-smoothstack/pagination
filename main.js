import data from "./mockData.js";

const BOOKS_PER_PAGE = 6;
const numberOfPages = Math.ceil(data.length / BOOKS_PER_PAGE);
const lastPageIndex = numberOfPages - 1;
let currentPage = 0;

const getTable = () => document.getElementsByTagName("table")[0];

const getTableBody = () => document.getElementsByTagName("tbody")[0];

const getBooksForPage = () => {
  const firstBookIndex = currentPage * BOOKS_PER_PAGE;
  return data.slice(firstBookIndex, firstBookIndex + BOOKS_PER_PAGE);
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
    button.addEventListener("click", () => goToPage(index));
    span.appendChild(button);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  addPageButtons();
  onclick("btnNext", nextPage);
  onclick("btnPrevious", previousPage);
  insertAllRows();
});
