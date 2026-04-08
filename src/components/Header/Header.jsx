import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser, logout } from "../../store/authSlice";
import { selectCartCount } from "../../store/cartSlice";
import { useNavbar } from "../../context/NavbarContext";
import styles from "./Header.module.css";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/sobre-nosotros", label: "Sobre Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMenuOpen, toggleMenu, closeMenu, toggleCart } = useNavbar();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const cartCount = useSelector(selectCartCount);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>⚡</span>
          <span>Tech<strong>Nova</strong></span>
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}

          <div className={styles.mobileAuth}>
            {isAuthenticated ? (
              <>
                <span className={styles.mobileUser}>Hola, {user?.name}</span>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>
                  Iniciar sesión
                </Link>
                <Link to="/registro" className="btn btn-primary" onClick={closeMenu}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className={styles.actions}>
          <button className={styles.cartBtn} onClick={toggleCart} aria-label="Carrito">
            <span>🛒</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>

          {isAuthenticated ? (
            <div className={styles.userMenu}>
              <span className={styles.userAvatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
              <div className={styles.dropdown}>
                <p className={styles.dropdownName}>{user?.name}</p>
                <p className={styles.dropdownEmail}>{user?.email}</p>
                <button onClick={handleLogout} className={styles.dropdownLogout}>
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className="btn btn-outline">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="btn btn-primary">
                Registrarse
              </Link>
            </div>
          )}

          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
            onClick={toggleMenu}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {isMenuOpen && <div className={styles.menuOverlay} onClick={closeMenu} />}
    </header>
  );
};

export default Header;
