import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [memes, setMemes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://api.imgflip.com/get_memes')
        if (!response.ok) {
          throw new Error('Unable to load meme templates right now.')
        }

        const payload = await response.json()
        if (!payload?.success) {
          throw new Error('Imgflip returned an unexpected response.')
        }

        setMemes(Array.isArray(payload.data?.memes) ? payload.data.memes : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchMemes()
  }, [])

  const filteredMemes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return memes
    }

    return memes.filter((meme) => meme.name.toLowerCase().includes(term))
  }, [memes, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 flex flex-col gap-10 px-4 py-10 sm:px-6 lg:px-10">
      <header className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.3em]">
          Meme Template Viewer
        </h1>
        <p className="text-slate-300">
          Browse and search popular templates fetched from Imgflip.
        </p>

        <div className="space-y-2">
          <label
            htmlFor="meme-search"
            className="block text-sm font-semibold uppercase tracking-wide text-slate-200"
          >
            Search templates
          </label>
          <input
            id="meme-search"
            type="search"
            placeholder='memes'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full max-w-xl mx-auto rounded-full bg-slate-950/70 border border-white/10 py-3 px-6 text-base text-slate-100 placeholder:text-slate-400 shadow-lg shadow-slate-900/50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          />
        </div>
      </header>

      <section className="w-full max-w-6xl mx-auto flex-1">
        {loading ? (
          <p className="text-center text-lg text-slate-200">
            Loading meme templates…
          </p>
        ) : error ? (
          <p className="text-center text-lg text-rose-400">{error}</p>
        ) : filteredMemes.length === 0 ? (
          <p className="text-center text-lg text-slate-300">
            No meme templates match that search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMemes.map((meme) => (
              <article
                key={meme.id}
                className="bg-slate-950/60 backdrop-blur rounded-3xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden transition hover:-translate-y-1 hover:shadow-black/60"
              >
                <div className="relative w-full pt-[70%] bg-slate-900">
                  <img
                    src={meme.url}
                    alt={meme.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <h2 className="px-4 py-5 text-center text-base font-semibold text-slate-100">
                  {meme.name}
                </h2>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
