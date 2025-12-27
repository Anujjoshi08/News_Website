import React from 'react'

export default function NewsCard({ article }){
  if(!article || !article.urlToImage) return null

  const date = new Date(article.publishedAt).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })

  return (
    <div className="card" onClick={()=> window.open(article.url, '_blank')}>
      <div className="card-header">
        <img src={article.urlToImage} alt={article.title} />
      </div>
      <div className="card-content">
        <h3 id="news-title">{article.title}</h3>
        <h6 className="news-source">{article.source?.name} · {date}</h6>
        <p className="news-desc">{article.description}</p>
      </div>
    </div>
  )
}
