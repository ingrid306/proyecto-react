import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Modal from "../Modal/Modal";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);

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
          <div className={styles.img} style={{ background: product.gradient }}>
            <span className={styles.emoji}>{product.emoji}</span>
          </div>
          {product.featured && (
            <span className={styles.featuredBadge}>Destacado</span>
          )}
        </Link>

        <div className={styles.body}>
          <span className={styles.category}>{product.category}</span>
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
            <span className={styles.price}>${product.price.toFixed(2)}</span>
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
