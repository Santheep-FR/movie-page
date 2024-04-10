import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MoviesCard from '../MoviesCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {
    moviesData: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://api.themoviedb.org/3/search/movie?api_key=480d3070618f03998c677d1be5f57dc6&language=en-US&query=${searchInput}&page=1`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.results.map(movie => ({
        id: movie.id,
        title: movie.original_title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      }))
      this.setState({
        moviesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getSearchResults = () => {
    this.getVideos()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderLoadingView = () => (
    <div className="load_container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideosView = () => {
    const {moviesData} = this.state
    return <MoviesCard moviesData={moviesData} onRetry={this.onRetry} />
  }

  renderHomeVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={this.onChangeInput}
          />
          <button
            className="search-icon"
            data-testid="searchButton"
            onClick={this.getSearchResults}
          >
            Search
          </button>
          {this.renderHomeVideos()}
        </div>
      </>
    )
  }
}

export default Search
