import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Modal from "../../components/Modal/Modal";
import styles from "./ProductDetail.module.css";

const FALLBACK_IMG = "https://placehold.co/600x400/1e1e38/6C63FF?text=TechNova";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status } = useSelector((s) => s.products);

  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (status === "loading") {
    return (
      <div className="page-wrapper">
        <div className={styles.loadingWrap}>
          <div className={styles.spinner} />
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-wrapper">
        <div className={styles.notFound}>
          <span>😕</span>
          <h2>Producto no encontrado</h2>
          <Link to="/productos" className="btn btn-primary">Volver a productos</Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));

  const confirmAdd = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(product));
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const allImages = product.images?.length ? product.images : [product.image];
  const currentImg = allImages[activeImg] || product.image;

  return (
    <div className="page-wrapper">
      <div className={`container ${styles.breadcrumb}`}>
        <Link to="/">Inicio</Link>
        <span>›</span>
        <Link to="/productos">Productos</Link>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      <section className={`container ${styles.detail}`}>
        {/* Image side */}
        <div className={styles.imgSide}>
          <div className={styles.imgBox}>
            <img
              src={currentImg}
              alt={product.name}
              className={styles.mainImg}
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
          </div>

          {allImages.length > 1 && (
            <div className={styles.thumbs}>
              {allImages.map((src, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img
                    src={src}
                    alt={`${product.name} ${i + 1}`}
                    onError={(e) => { e.target.src = FALLBACK_IMG; }}
                  />
                </button>
              ))}
            </div>
          )}

          <div className={styles.badges}>
            {product.featured && (
              <span className={`${styles.badge} ${styles.badgeFeatured}`}>⭐ Destacado</span>
            )}
            <span className={`${styles.badge} ${styles.badgeCategory}`}>{product.category}</span>
            {product.brand && (
              <span className={`${styles.badge} ${styles.badgeBrand}`}>{product.brand}</span>
            )}
            <span className={`${styles.badge} ${product.stock > 10 ? styles.badgeStock : styles.badgeLow}`}>
              {product.stock > 10 ? "✓ En stock" : `⚠️ Solo ${product.stock} disponibles`}
            </span>
          </div>
        </div>

        {/* Info side */}
        <div className={styles.infoSide}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.shortDesc}>{product.shortDescription}</p>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{stars}</span>
            <span className={styles.ratingNum}>{product.rating}</span>
            <span className={styles.reviews}>({product.reviews} opiniones)</span>
          </div>

          <div className={styles.priceRow}>
            {product.discount > 5 && (
              <span className={styles.oldPrice}>
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            {product.discount > 5 && (
              <span className={styles.discountTag}>-{Math.round(product.discount)}% OFF</span>
            )}
          </div>

          <div className={styles.divider} />

          <p className={styles.desc}>{product.description}</p>

          <div className={styles.divider} />

          <div className={styles.qtyRow}>
            <label>Cantidad:</label>
            <div className={styles.qtyControl}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
              >−</button>
              <span>{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                disabled={qty >= product.stock}
              >+</button>
            </div>
            <span className={styles.qtyTotal}>
              Total: <strong>${(product.price * qty).toFixed(2)}</strong>
            </span>
          </div>

          <div className={styles.btnGroup}>
            <button
              className={`btn ${added ? "btn-accent" : "btn-primary"}`}
              onClick={() => setModal(true)}
              style={{ flex: 1 }}
            >
              {added ? "✓ Agregado al carrito" : "🛒 Agregar al carrito"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/productos")}
            >
              ← Volver
            </button>
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}><span>🚚</span> Envío gratis</div>
            <div className={styles.guarantee}><span>🔒</span> Compra segura</div>
            <div className={styles.guarantee}><span>↩️</span> 30 días devolución</div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={`section ${styles.related}`}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Productos relacionados</h2>
            <div className={styles.relatedGrid}>
              {related.map((p) => (
                <Link key={p.id} to={`/productos/${p.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedImg}>
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => { e.target.src = FALLBACK_IMG; }}
                    />
                  </div>
                  <div className={styles.relatedInfo}>
                    <p className={styles.relatedName}>{p.name}</p>
                    <p className={styles.relatedPrice}>${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        onConfirm={confirmAdd}
        title="Agregar al carrito"
        message={`¿Agregar ${qty} × "${product.name}" al carrito? Total: $${(product.price * qty).toFixed(2)}`}
        confirmText="Agregar"
        type="default"
      />
    </div>
  );
};

export default ProductDetail;
