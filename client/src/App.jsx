import React, { useState } from 'react'
import NewsList from './components/NewsList'

const navItems = ['ipl','finance','politics']

export default function App(){
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [active, setActive] = useState(null)

  function handleSearch(e){
    e.preventDefault()
    if(!query) return
    setCategory(null)
    setActive(null)
  }

  function onNavClick(cat){
    setCategory(cat)
    setActive(cat)
    setQuery('')
  }

  return (
    <div>
      <nav>
        <div className="main-nav container flex">
          <a href="#" onClick={() => window.location.reload()} className="company-logo">
            <img src="/Logo-News_app.png" alt="company logo" />
          </a>
          <div className="nav-links">
            <ul className="flex">
              {navItems.map(item => (
                <li key={item}
                    className={`hover-link nav-item ${active===item? 'active':''}`}
                    onClick={() => onNavClick(item)}
                >{item.toUpperCase()}</li>
              ))}
            </ul>
          </div>
          <div className="search-bar flex">
            <form onSubmit={handleSearch} style={{display:'flex',gap:12,alignItems:'center'}}>
              <input id="search-text" value={query} onChange={e=>setQuery(e.target.value)} type="text" className="news-input" placeholder="e.g. Science" />
              <button className="search-button">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <main>
        <div className="cards-container container flex" id="cards-container">
          <NewsList searchQuery={query} category={category} />
        </div>
      </main>
    </div>
  )
}
