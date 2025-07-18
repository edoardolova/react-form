import { useState } from 'react'
import './App.css'
import articlesData from '../data/articlesData'

function App() {
  const articlesArr = articlesData;
  const [newArticle, setNewArticle] = useState('');
  const [articles, setArticles] = useState(articlesArr)

  function handleSubmit(e){
    e.preventDefault();
    if (!newArticle.trim()) {
      return;
    }
    const newArticleObj = {title: newArticle};
    const updatedArticles = [...articles, newArticleObj];
    setArticles(updatedArticles);
    setNewArticle('');
  }

  function handleDelete(index){
    const updatedArticles = articles.filter((article, indexArticle) => indexArticle != index)
    setArticles(updatedArticles);
  }
  return (
    <>
      <div className="container bg-dark">
        <div className="header py-3">
          <h1 className='text-white'>Benvenuti sul nosto blog</h1>
        </div>
                
        <div className='d-flex'>
          <button className='btn rounded-circle btn-outline-light ms-auto mb-4'><i className="bi bi-plus-lg"></i></button>
        </div>
        <ul className='list-group mb-5 '>
          {articles.map((article, index)=>{
            return(
              <li className='list-group-item d-flex bg-dark text-white align-items-center' key={index}>
                <h4>{article.title}</h4>
                <button className='btn  btn-outline-light ms-auto me-2' onClick={()=>handleDelete(index)}><i className="bi bi-trash3"></i></button>
                <button className='btn  btn-outline-light'><i className="bi bi-pencil"></i></button>
              </li>
            )
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className='d-flex py-3'>
            <input className='form-control' type="text" value={newArticle} 
            onChange={e => {setNewArticle(e.target.value)}}/>
            <button type='submit' className='btn btn-success ms-3'>AGGIUNGI</button>
          </div>
        </form>
      </div>

    </>
  )
}

export default App
