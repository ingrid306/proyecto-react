import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";

const Home = () => {
  const { items: products, status } = useSelector((s) => s.products);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured).slice(0, 6),
    [products]
  );

  return (
    <div className={styles.home}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>✨ Tecnología de vanguardia</span>
            <h1 className={styles.heroTitle}>
              Descubre el futuro<br />
              <span className={styles.heroGradient}>de la tecnología</span>
            </h1>
            <p className={styles.heroSubtitle}>
              En TechNova encontrás los mejores productos tecnológicos al mejor precio.
              Laptops, smartphones, audio y más con garantía oficial.
            </p>
            <div className={styles.heroCta}>
              <Link to="/productos" className="btn btn-primary">
                Ver productos
              </Link>
              <Link to="/sobre-nosotros" className="btn btn-outline">
                Sobre nosotros
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <strong>+10K</strong>
                <span>Clientes</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <strong>+500</strong>
                <span>Productos</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <strong>4.9★</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardGlow} />
              <span className={styles.heroEmoji}>💻</span>
              <div className={styles.heroCardInfo}>
                <p>Laptops Premium</p>
                <span>Desde $499.99</span>
              </div>
            </div>
            <div className={`${styles.heroCard} ${styles.heroCard2}`}>
              <span className={styles.heroEmoji}>📱</span>
              <div className={styles.heroCardInfo}>
                <p>Smartphones</p>
                <span>Desde $299.99</span>
              </div>
            </div>
            <div className={`${styles.heroCard} ${styles.heroCard3}`}>
              <span className={styles.heroEmoji}>🎧</span>
              <div className={styles.heroCardInfo}>
                <p>Accesorios</p>
                <span>Desde $19.99</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={`${styles.about} section`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutVisual}>
              <div className={styles.aboutImgGrid}>
                <div className={styles.aboutImgItem} style={{ background: "linear-gradient(135deg, #6C63FF, #3f3d91)" }}>
                  <span>🚀</span>
                  <p>Innovación</p>
                </div>
                <div className={styles.aboutImgItem} style={{ background: "linear-gradient(135deg, #FF6584, #c94c6a)" }}>
                  <span>❤️</span>
                  <p>Pasión</p>
                </div>
                <div className={styles.aboutImgItem} style={{ background: "linear-gradient(135deg, #43e97b, #38a169)" }}>
                  <span>🌟</span>
                  <p>Calidad</p>
                </div>
                <div className={styles.aboutImgItem} style={{ background: "linear-gradient(135deg, #4facfe, #1a73c4)" }}>
                  <span>🤝</span>
                  <p>Confianza</p>
                </div>
              </div>
            </div>
            <div className={styles.aboutText}>
              <span className={styles.aboutBadge}>Sobre Nosotros</span>
              <h2>Más que una tienda,<br />una comunidad tech</h2>
              <p>
                Desde 2018, TechNova se dedica a acercar la mejor tecnología a
                personas y empresas en toda Argentina. Somos apasionados por la
                innovación y nos comprometemos a ofrecer productos de calidad
                con el mejor servicio de atención al cliente.
              </p>
              <p>
                Nuestro equipo de expertos selecciona cuidadosamente cada producto
                para garantizar que cumple con los estándares más altos de
                rendimiento y durabilidad.
              </p>
              <Link to="/sobre-nosotros" className="btn btn-primary">
                Conocernos más →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`${styles.featured} section`}>
        <div className="container">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle">
            Los productos más elegidos por nuestros clientes
          </p>

          {status === "loading" && (
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImg} />
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonLine} style={{ width: "50%" }} />
                    <div className={styles.skeletonLine} style={{ width: "80%" }} />
                    <div className={styles.skeletonLine} style={{ width: "40%" }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === "succeeded" && featuredProducts.length > 0 && (
            <div className={styles.grid}>
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div className={styles.featuredCta}>
            <Link to="/productos" className="btn btn-outline">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`${styles.benefits} section`}>
        <div className="container">
          <h2 className="section-title">¿Por qué elegirnos?</h2>
          <p className="section-subtitle">Comprá con total confianza</p>
          <div className={styles.benefitsGrid}>
            {[
              { icon: "🚚", title: "Envío gratis", desc: "En compras superiores a $50.000" },
              { icon: "🔒", title: "Pago seguro", desc: "Encriptación SSL de última generación" },
              { icon: "↩️", title: "Devoluciones", desc: "30 días sin preguntas" },
              { icon: "🎧", title: "Soporte 24/7", desc: "Equipo disponible siempre" },
            ].map((b) => (
              <div key={b.title} className={styles.benefit}>
                <span className={styles.benefitIcon}>{b.icon}</span>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
