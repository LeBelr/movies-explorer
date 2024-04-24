import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import Popup from '../Popup/Popup';


export default function Navigation() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  function openPopup() {
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
  }

  return (
        <nav className="navigation">
            <Link to="/" className="navigation__title">Movies</Link>
          <div className="navigation__link-box">
            <NavLink to="/" className={({ isActive }) => isActive ? "navigation__link navigation__link_active hover-link" : "navigation__link hover-link"}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "navigation__link navigation__link_active hover-link" : "navigation__link hover-link"}>Сохранённые фильмы</NavLink>
          </div>
          <button className="navigation__popup-button hover-button" type="button" onClick={openPopup}></button>
          <Popup isOpenPopup={isOpenPopup} onClose={closePopup} />
        </nav>
  )
}