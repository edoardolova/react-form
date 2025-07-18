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
  return (
    <>
      <div className="container">
        <div className="header py-3">
          <h1>Benvenuti sul nosto blog</h1>
        </div>
        <ul className='list-group mb-5'>
          {articles.map((article, index)=>{
            return(
              <li className='list-group-item' key={index}>{article.title}</li>
            )
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className='d-flex'>
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
