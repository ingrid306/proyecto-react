import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Modal from "../Modal/Modal";
import styles from "./ProductCard.module.css";

const FALLBACK_IMG = "https://placehold.co/400x300/1e1e38/6C63FF?text=TechNova";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const handleAdd = () => setModal(true);

  const confirmAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = "★".repeat(Math.round(product.rating)) + "☆".repeat(5 - Math.round(product.rating));

  return (
    <>
      <div className={styles.card}>
        <Link to={`/productos/${product.id}`} className={styles.imgWrap}>
          <img
            src={imgSrc}
            alt={product.name}
            className={styles.img}
            onError={() => setImgSrc(FALLBACK_IMG)}
          />
          {product.featured && (
            <span className={styles.featuredBadge}>Destacado</span>
          )}
          {product.discount > 5 && (
            <span className={styles.discountBadge}>-{Math.round(product.discount)}%</span>
          )}
        </Link>

        <div className={styles.body}>
          <div className={styles.topRow}>
            <span className={styles.category}>{product.category}</span>
            {product.brand && <span className={styles.brand}>{product.brand}</span>}
          </div>
          <Link to={`/productos/${product.id}`}>
            <h3 className={styles.name}>{product.name}</h3>
          </Link>
          <p className={styles.shortDesc}>{product.shortDescription}</p>

          <div className={styles.ratingRow}>
            <span className={styles.stars}>{stars}</span>
            <span className={styles.ratingNum}>{product.rating}</span>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>

          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              {product.discount > 5 && (
                <span className={styles.originalPrice}>
                  ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                </span>
              )}
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>
            <button
              className={`btn ${added ? "btn-accent" : "btn-primary"} ${styles.addBtn}`}
              onClick={handleAdd}
            >
              {added ? "✓ Agregado" : "+ Agregar"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        onConfirm={confirmAdd}
        title="Agregar al carrito"
        message={`¿Deseas agregar "${product.name}" al carrito?`}
        confirmText="Agregar"
        type="default"
      />
    </>
  );
};

export default ProductCard;
