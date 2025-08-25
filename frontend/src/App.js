import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  //Nomiin jagsaalt avah heseg
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/books");
      setBooks(response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
      }
  };
  //Component anh achaallah uyd nomiin jagsaaltiig avch bgaa heseg
  useEffect(() => {
    fetchBooks();
  }, []);
  //Nomiig nemekh heseg
  const handleSubmit = async (e) => {
    e.preventDefault();
  const newBook = { title, author, year };

  axios
  .post("http://localhost:5005/api/books", newBook)
  .then((response) => {
    console.log("Nom amjilttai nemeglee:", response.data);
    fetchBooks();
    setTitle("");
    setAuthor("");
    setYear("");
  })
  .catch((error) => {
    console.error("Nom nemehed aldaa garlaa:", error);
  });
};

//Nomiin jagsaaltiig ustgah heseg
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5005/api/books/${id}`);
    fetchBooks();
  } catch (error) {
    console.error("Nom ustgahad aldaa garlaa:", error);
  }
};
// Nomiig editleh heseg
const startEditing = (book) => {
  setTitle(book.title);
  setAuthor(book.author);
  setYear(book.year);
};
//UI buyu hereglegchid yg haragdah heseg endees ehelne
    return (
    <div className="app-container">
      <header className="header">
        <h1><span className="icon icon-book"></span> Номын дэлгүүрийн бүртгэл</h1>
        <p>Шинээр ном нэмэх, засах, устгах боломжтой.</p>
      </header>
      <section className="form-section">
        <h2>Шинээр ном нэмэх</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="input-group">
              <label htmlFor="title">Номын нэр</label>
              <input
                id="title"
                className="form-input"
                type="text"
                placeholder="Номын нэр"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="author">Зохиолч</label>
              <input
                id="author"
                className="form-input"
                type="text"
                placeholder="Зохиолч"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="year">Хэвлэгдсэн он</label>
              <input
                id="year"
                className="form-input"
                type="number"
                placeholder="Хэвлэгдсэн он"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="input-group" style={{alignSelf: 'end'}}>
              <button className="submit-btn" type="submit">Ном нэмэх</button>
            </div>
          </div>
        </form>
      </section>
      <section className="books-section">
        <h2>Номын жагсаалт</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div className="book-card" key={book._id}>
              <div className="book-info">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="book-year">{book.year}</div>
              </div>
              <div className="book-actions">
                <button className="action-btn edit-btn" onClick={() => startEditing(book)}>
                  <span className="icon icon-edit"></span> Засах
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(book._id)}>
                  <span className="icon icon-delete"></span> Устгах
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
