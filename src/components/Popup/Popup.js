import { Link, NavLink } from 'react-router-dom';
import './Popup.css';

export default function Popup({ isOpenPopup, onClose }) {

  return (
    <div className={`popup ${isOpenPopup ? "popup_opened" : ""}`}>
      <nav className="popup__links">
        <div className="popup__link-box">
          <button className="popup__close-button hover-button" onClick={onClose}></button>
          <NavLink to="/" className={({ isActive }) => isActive ? "popup__link popup__link_active hover-link" : "popup__link hover-link"}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "popup__link popup__link_active hover-link" : "popup__link hover-link"}>Сохранённые фильмы</NavLink>
        </div>
      </nav>
    </div>
  )
}