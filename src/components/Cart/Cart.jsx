import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/cartSlice";
import { useNavbar } from "../../context/NavbarContext";
import Modal from "../Modal/Modal";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCartOpen, closeCart } = useNavbar();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [modal, setModal] = useState({ open: false, type: null, itemId: null });

  const handleRemove = (id) => setModal({ open: true, type: "remove", itemId: id });
  const handleClear = () => setModal({ open: true, type: "clear", itemId: null });

  const confirmAction = () => {
    if (modal.type === "remove") dispatch(removeFromCart(modal.itemId));
    if (modal.type === "clear") dispatch(clearCart());
  };

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <aside className={styles.cart}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span>🛒</span> Mi Carrito
          </h2>
          <button className={styles.closeBtn} onClick={closeCart}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛍️</span>
            <p>Tu carrito está vacío</p>
            <button className="btn btn-primary" onClick={closeCart}>Ver productos</button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div
                    className={styles.itemImg}
                    style={{ background: item.gradient }}
                  >
                    <span>{item.emoji}</span>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
                    <div className={styles.qtyControl}>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      >+</button>
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span className={styles.totalAmount}>${total.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleCheckout}>
                Proceder al pago
              </button>
              <button
                className="btn btn-outline"
                style={{ width: "100%", marginTop: "0.5rem" }}
                onClick={handleClear}
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>

      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        onConfirm={confirmAction}
        title={modal.type === "clear" ? "Vaciar carrito" : "Eliminar producto"}
        message={
          modal.type === "clear"
            ? "¿Estás seguro de que deseas vaciar todo el carrito?"
            : "¿Deseas eliminar este producto del carrito?"
        }
        confirmText={modal.type === "clear" ? "Vaciar" : "Eliminar"}
        type="danger"
      />
    </>
  );
};

export default Cart;
