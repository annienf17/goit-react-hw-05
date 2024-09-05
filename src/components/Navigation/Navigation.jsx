import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to="/"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
