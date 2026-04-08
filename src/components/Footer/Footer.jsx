import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span>⚡</span> Tech<strong>Nova</strong>
          </Link>
          <p className={styles.tagline}>
            Tu destino para la tecnología del futuro. Productos premium al mejor precio.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Navegación</h4>
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className={styles.col}>
            <h4>Cuenta</h4>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/registro">Registrarse</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div className={styles.col}>
            <h4>Contacto</h4>
            <span>📧 info@technova.com</span>
            <span>📞 +54 11 1234-5678</span>
            <span>📍 Buenos Aires, Argentina</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {year} TechNova. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ en Argentina</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
