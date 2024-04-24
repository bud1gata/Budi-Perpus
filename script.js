window.onload = function() {
    renderBooks();
  };
  
  function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const status = document.getElementById("status").value;
  
    if (title === '' || author === '') {
      alert('Isi Judul buku dan Pengarang.');
      return;
    }
  
    const book = {
      id: Date.now(),
      title,
      author,
      status
    };
  
    let books = getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  
    renderBooks();
  }
  
  function renderBooks() {
    const unreadShelf = document.getElementById("unreadShelf");
    const readShelf = document.getElementById("readShelf");
  
    unreadShelf.innerHTML = '<h2>Daftar Belum Dibaca</h2>';
    readShelf.innerHTML = '<h2>Daftar Sudah Dibaca</h2>';
  
    const books = getBooksFromLocalStorage();
    books.forEach(book => {
      const bookCard = createBookCard(book);
      if (book.status === 'Belum dibaca') {
        unreadShelf.appendChild(bookCard);
      } else {
        readShelf.appendChild(bookCard);
      }
    });
  }
  
  function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Pengarang: ${book.author}</p>
      <p>Status: ${book.status}</p>
      <button onclick="moveBook(${book.id})">Pindah Rak Buku</button>
      <button onclick="deleteBook(${book.id})">Hapus</button>
    `;
    return bookCard;
  }
  
  function moveBook(id) {
    let books = getBooksFromLocalStorage();
    const index = books.findIndex(book => book.id === id);
    books[index].status = books[index].status === 'Belum dibaca' ? 'Sudah dibaca' : 'Belum dibaca';
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
  
  function deleteBook(id) {
    let books = getBooksFromLocalStorage();
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
  }
  
  function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }
  