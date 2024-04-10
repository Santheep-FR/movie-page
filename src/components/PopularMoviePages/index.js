import {Component} from 'react'
import MoviesCard from '../MoviesCard'
import './index.css'

class PopularMoviePages extends Component {
  state = {
    moviesList: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const apiUrl =
      'https://api.themoviedb.org/3/movie/popular?api_key=480d3070618f03998c677d1be5f57dc6&language=en-US&page=1'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.results.map(movie => ({
      id: movie.id,
      title: movie.original_title,
      imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
    }))
    this.setState({
      moviesList: updatedData,
    })
  }

  render() {
    const {moviesList} = this.state
    return (
      <div>
        <ul className="movie-list">
          {moviesList.map(movie => (
            <MoviesCard movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }
}
export default PopularMoviePages
