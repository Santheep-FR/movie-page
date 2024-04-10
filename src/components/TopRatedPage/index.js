import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MoviesCard from '../MoviesCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TopRatedPage extends Component {
  state = {
    moviesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl =
      'https://api.themoviedb.org/3/movie/top_rated?api_key=480d3070618f03998c677d1be5f57dc6&language=en-US&page=1'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(movie => ({
        id: movie.id,
        title: movie.original_title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      }))
      this.setState({
        moviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderMoviesList = () => {
    const {moviesList} = this.state
    return (
      <div className="background">
        <ul className="movie-list">
          {moviesList.map(movie => (
            <MoviesCard movieData={movie} key={movie.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMoviesList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default TopRatedPage
