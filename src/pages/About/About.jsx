import { Link } from "react-router-dom";
import styles from "./About.module.css";

const team = [
  { name: "Sofia Rodriguez", role: "CEO & Fundadora", emoji: "👩‍💼", color: "linear-gradient(135deg, #6C63FF, #3f3d91)" },
  { name: "Matias Gonzalez", role: "CTO", emoji: "👨‍💻", color: "linear-gradient(135deg, #43e97b, #38a169)" },
  { name: "Camila Torres", role: "Directora de Marketing", emoji: "👩‍🎨", color: "linear-gradient(135deg, #FF6584, #c94c6a)" },
  { name: "Lucas Fernandez", role: "Head of Sales", emoji: "👨‍💼", color: "linear-gradient(135deg, #4facfe, #1a73c4)" },
];

const values = [
  { icon: "🚀", title: "Innovación", desc: "Siempre buscamos los últimos avances tecnológicos para ofrecerte lo mejor." },
  { icon: "🤝", title: "Confianza", desc: "Construimos relaciones duraderas basadas en transparencia y honestidad." },
  { icon: "🌟", title: "Calidad", desc: "Cada producto pasa por rigurosos controles de calidad antes de llegar a vos." },
  { icon: "💚", title: "Sustentabilidad", desc: "Comprometidos con prácticas responsables con el medio ambiente." },
  { icon: "🎯", title: "Enfoque al cliente", desc: "Tu satisfacción es nuestra prioridad número uno en todo momento." },
  { icon: "📚", title: "Aprendizaje", desc: "Crecemos constantemente para brindarte la mejor experiencia posible." },
];

const About = () => {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>Sobre Nosotros</span>
          <h1 className={styles.title}>
            Apasionados por la<br />
            <span className={styles.gradient}>tecnología</span>
          </h1>
          <p className={styles.subtitle}>
            Desde 2018, llevamos la mejor tecnología a hogares y empresas de todo Argentina
            con el servicio más profesional y cercano del mercado.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImg}>
              <div className={styles.bigEmoji}>🏢</div>
              <div className={styles.storyStats}>
                <div className={styles.storyStat}>
                  <strong>2018</strong>
                  <span>Fundación</span>
                </div>
                <div className={styles.storyStat}>
                  <strong>+10K</strong>
                  <span>Clientes</span>
                </div>
                <div className={styles.storyStat}>
                  <strong>+500</strong>
                  <span>Productos</span>
                </div>
                <div className={styles.storyStat}>
                  <strong>5★</strong>
                  <span>Soporte</span>
                </div>
              </div>
            </div>
            <div className={styles.storyText}>
              <h2>Nuestra historia</h2>
              <p>
                TechNova nació en 2018 de la pasión de Sofia Rodriguez, una ingeniera
                en sistemas que soñaba con democratizar el acceso a la tecnología
                en Argentina. Con solo 3 empleados y una pequeña oficina en Buenos
                Aires, empezamos vendiendo componentes de computadoras.
              </p>
              <p>
                Hoy somos un equipo de más de 50 personas comprometidas con brindar
                la mejor experiencia de compra tecnológica. Ampliamos nuestra
                oferta a smartphones, audio, gaming, wearables y mucho más,
                siempre manteniendo la calidad y el servicio personalizado que
                nos caracteriza.
              </p>
              <p>
                En 2022, lanzamos nuestra plataforma online para llegar a clientes
                de todo el país. Hoy despachamos a los 24 provincias con envíos
                rápidos y seguros.
              </p>
              <Link to="/contacto" className="btn btn-primary">
                Contactanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <h2 className="section-title">Nuestros valores</h2>
          <p className="section-subtitle">Los principios que guían todo lo que hacemos</p>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`}>
        <div className="container">
          <h2 className="section-title">Nuestro equipo</h2>
          <p className="section-subtitle">Las personas detrás de TechNova</p>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <div key={member.name} className={styles.teamCard}>
                <div className={styles.teamAvatar} style={{ background: member.color }}>
                  <span>{member.emoji}</span>
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>¿Listo para explorar nuestros productos?</h2>
            <p>Descubrí la tecnología del futuro con la garantía y servicio de TechNova.</p>
            <div className={styles.ctaActions}>
              <Link to="/productos" className="btn btn-primary">Ver productos</Link>
              <Link to="/contacto" className="btn btn-outline">Contactanos</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
