import { useState } from 'react';
import './App.css';
import articlesData from '../data/articlesData';

function App() {
  const [newArticle, setNewArticle] = useState('');
  const [articles, setArticles] = useState(articlesData);
  const [isForumActive, setIsForumActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToEditIndex, setArticleToEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!newArticle.trim()){
      return;
    } 

    const newArticleObj = { title: newArticle };
    setArticles([...articles, newArticleObj]);
    setNewArticle('');
  }

  function toggleShowForm() {
    setIsForumActive(!isForumActive);
  }

  function handleDelete(index){
    const updatedArticles = articles.filter((article, indexArticle) => indexArticle != index)
    setArticles(updatedArticles);
  }

  function openModal(index) {
    setArticleToEditIndex(index);
    setEditedTitle(articles[index].title);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setArticleToEditIndex(null);
    setEditedTitle('');
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    if (!editedTitle.trim()){
      return;
    } 

    const updatedArticles = [...articles];
    updatedArticles[articleToEditIndex] = { ...updatedArticles[articleToEditIndex], title: editedTitle };
    setArticles(updatedArticles);
    closeModal();
  }

  return (
    <>
      <div className="container bg-dark">
        <div className="header py-3">
          <h1 className="text-white">Benvenuti sul nostro blog</h1>
        </div>

        <div className="d-flex">
          <button className="btn rounded-circle btn-outline-light ms-auto mb-4" onClick={toggleShowForm}>
            <i className={`bi bi-${!isForumActive ? 'plus' : 'dash'}-lg`}></i>
          </button>
        </div>

        <ul className="list-group mb-5">
          {articles.map((article, index) => (
            <li className="list-group-item d-flex bg-dark text-white align-items-center" key={index}>
              <h4>{article.title}</h4>
              <button className="btn btn-outline-light ms-auto me-2" onClick={() => handleDelete(index)}>
                <i className="bi bi-trash3"></i>
              </button>
              <button className="btn btn-outline-light" onClick={() => openModal(index)}>
                <i className="bi bi-pencil"></i>
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <div className={`d-flex py-3 ${isForumActive ? '' : 'd-none'}`}>
            <input
              className="form-control"
              type="text"
              value={newArticle}
              onChange={(e) => setNewArticle(e.target.value)}
            />
            <button type="submit" className="btn btn-success ms-3"> AGGIUNGI </button>
          </div>
        </form>
      </div>

      {/* Modale custom if the condition is true show modal*/}
      {isModalOpen && (
        <div className="modal-overlay d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75">
          <form onSubmit={handleEditSubmit} className="bg-dark text-white p-4 rounded w-50 border">
            <h4 className="mb-3">MODIFICA ARTICOLO</h4>
            <p>Titolo attuale: <span className='fw-bold'>{articles[articleToEditIndex].title}</span></p>
            <input className="form-control mb-3" placeholder='Scrivi il nuovo titolo' type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)}/>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={closeModal}> Annulla </button>
              <button type="submit" className="btn btn-success"> Salva </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default App;
