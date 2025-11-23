import './Menu.css';
import navMenu from './navigation-menu.png';

function Menu() {
  return (
    <div className="navigation-menu">
      <img src={navMenu} alt="Navigation Menu" />
    </div>
  );
}

export default Menu;