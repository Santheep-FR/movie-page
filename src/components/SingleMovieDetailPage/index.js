import {Component} from 'react'
// import {Link} from 'react-router-dom'

import './index.css'

class SingleMovieDetailPage extends Component {
  state = {
    moviesList: {},
    castList: {},
  }

  componentDidMount() {
    this.getEachDetails()
    this.getCastDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    rating: data.vote_average,
    title: data.original_title,
    runTime: data.run_time,
    genres: data.genres,
    releaseDate: data.release_date,
    bannerUrl: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
  })

  getCastFormat = data => ({
    castUrl: `https://image.tmdb.org/t/p/w500${data.profile_path}`,
    name: data.original_name,
    characterName: data.character,
  })

  getEachDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const option = {
      method: 'GET',
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=480d3070618f03998c677d1be5f57dc6&language=en-US`,
      option,
    )
    const fetchedData = await response.json()
    const updatedData = this.getFormattedData(fetchedData)
    this.setState({
      moviesList: updatedData,
    })
  }

  getCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const option = {
      method: 'GET',
    }
    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=480d3070618f03998c677d1be5f57dc6&language=en-US`,
      option,
    )
    const castFetchData = await castResponse.json()
    const castData = this.getCastFormat(castFetchData.cast)
    this.setState({
      castList: castData,
    })
    console.log(castData.castUrl)
  }

  render() {
    const {moviesList, castList} = this.state
    const {
      imageUrl,
      rating,
      title,
      runTime,
      genres,
      releaseDate,
      bannerUrl,
    } = moviesList
    const {castUrl, name, characterName} = castList
    return (
      <>
        <div>
          <div>
            <div className="banner">
              <div className="left-container">
                <div className="banner-poster-image">
                  <img src={imageUrl} alt="poster" />
                  <div className="details">
                    <h1>{title}</h1>
                    <h1>Rating:{rating}</h1>
                    <div>
                      <p>{runTime}</p>
                      <p>{genres.name}</p>
                    </div>
                    <p>Release Date: {releaseDate}</p>
                  </div>
                </div>
              </div>
              <div>
                <img src={bannerUrl} alt="banner" />
              </div>
            </div>
          </div>
          <div>
            <h1>Cast</h1>
            <div>
              <img src={castUrl} alt="cast" />
              <p>{name}</p>
              <p>{characterName}</p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default SingleMovieDetailPage
