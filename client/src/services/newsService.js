const API_URL = (typeof window !== 'undefined' &&
  (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3000/api/news'
  : '/api/news'

export async function fetchNews(query = null, category = null){
  try{
    let url = API_URL
    const params = new URLSearchParams()
    if(category) params.append('category', category)
    if(query) params.append('search', query)
    if(params.toString()) url += '?' + params.toString()

    const res = await fetch(url)
    const data = await res.json()
    if(data.status === 'ok') return data.articles
    return []
  }catch(err){
    throw err
  }
}
