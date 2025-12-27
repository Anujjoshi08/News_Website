import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard'
import { fetchNews } from '../services/newsService'

export default function NewsList({ searchQuery, category }){
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      setError(null)
      try{
        const data = await fetchNews(searchQuery || null, category || null)
        setArticles(data || [])
      }catch(err){
        setError('Failed to load news')
      }finally{
        setLoading(false)
      }
    }
    load()
  },[searchQuery, category])

  if(loading) return Array.from({length:6}).map((_,i)=>(
    <div key={i} className="card loading" />
  ))

  if(error) return <p className="error-message">{error}</p>

  if(!articles || articles.length===0) return <p className="no-news">No news articles found.</p>

  return (
    <>
      {articles.map((a, idx)=> (
        <NewsCard key={idx} article={a} />
      ))}
    </>
  )
}
