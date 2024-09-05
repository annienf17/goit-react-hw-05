import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/movies" activeClassName="active">
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
