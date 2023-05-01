import axios from "axios";
// Third party API
const baseURL = 'https://api.itbook.store/1.0/';
const defaultQuery = "0 0";

function getAxios(endPoint: string) {
    return axios.get(baseURL + endPoint)
        .then((response: any) => response.data);
}

// search books by title, author, ISBN or keywords
function searchBooks(query: string, page: number) {
    const url = 'search/' + query + (page ? '/' + page : '');
    return getAxios(url);
}

// get new releases books
function getNewBooks() {
    return getAxios('new');
}

// get book details by ISBN
function getBookByISBN(isbn: string) {
    const url = 'books/' + isbn;
    return getAxios(url);
}

export {searchBooks, getNewBooks, getBookByISBN, defaultQuery};