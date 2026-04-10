import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faInstagram,
  faFacebookF,
  faYoutube,
  faTiktok,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./Footer.module.css";

const SOCIALS = [
  { icon: faXTwitter, label: "X (Twitter)", href: "#" },
  { icon: faInstagram, label: "Instagram", href: "#" },
  { icon: faFacebookF, label: "Facebook", href: "#" },
  { icon: faYoutube, label: "YouTube", href: "#" },
  { icon: faTiktok, label: "TikTok", href: "#" },
  { icon: faLinkedinIn, label: "LinkedIn", href: "#" },
];

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
            {SOCIALS.map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={icon} />
              </a>
            ))}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
