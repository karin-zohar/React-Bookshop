
import { GoogleResultPreview } from "./google-result-preview.jsx"
export function GoogleResultList({searchResults, onAddBook}) {

    console.log('searchResults: ', searchResults)
    return (
        <ul className="google-result-list">
            {searchResults.map(searchRes => 
                <li key={searchRes.id}>
                    <GoogleResultPreview title={searchRes.title} />
                    <button onClick={onAddBook(searchRes)}>Add</button>
                </li>
                )}
        </ul>
    )
}