import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, onSearch, loading }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={19} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a city..."
        aria-label="Search weather by city"
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}