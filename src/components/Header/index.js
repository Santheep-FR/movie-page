import {Link} from 'react-router-dom'

import Search from '../Search'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <h1 className="title">MovieDb</h1>
    </div>
    <ul className="nav-items-list">
      <li className="link-item">
        <Link className="route-link" to="/">
          Popular
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/top_rated">
          Top Rated
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/upcoming">
          Upcoming
        </Link>
      </li>
    </ul>
    <Search />
  </nav>
)

export default Header
