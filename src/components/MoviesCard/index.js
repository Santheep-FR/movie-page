import {Link} from 'react-router-dom'
import './index.css'

const MoviesCard = props => {
  const {movieData} = props
  const {id, title, imageUrl, rating} = movieData
  console.log(rating)

  return (
    <li className="app-item">
      <Link to={`/${id}`}>
        <img src={imageUrl} alt="poster" className="thumbnail" />
      </Link>
      <h1 className="title">{title}</h1>
      <p className="rating">Rating: {rating}</p>
    </li>
  )
}
export default MoviesCard
