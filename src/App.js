import {Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/Header'
import PopularMoviePages from './components/PopularMoviePages'
import TopRatedPage from './components/TopRatedPage'
import NotFound from './components/NotFound'
import SingleMovieDetailPage from './components/SingleMovieDetailPage'
import UpcomingMoviePage from './components/UpcomingMoviePage'

import './App.css'

const App = () => (
  <>
    <Header />
    <div className="app-body">
      <Switch>
        <Route exact path="/" component={PopularMoviePages} />
        <Route exact path="/upcoming" component={UpcomingMoviePage} />
        <Route exact path="/top_rated" component={TopRatedPage} />
        <Route exact path="/:id" component={SingleMovieDetailPage} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </div>
  </>
)

export default App
