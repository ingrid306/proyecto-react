import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../store/cartSlice";
import { selectIsAuthenticated } from "../../store/authSlice";
import Modal from "../../components/Modal/Modal";
import styles from "./Checkout.module.css";

const validationSchema = Yup.object({
  nombre: Yup.string().min(2).required("Requerido"),
  apellido: Yup.string().min(2).required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  telefono: Yup.string().min(7, "Teléfono inválido").required("Requerido"),
  direccion: Yup.string().min(5).required("Requerido"),
  ciudad: Yup.string().min(2).required("Requerido"),
  provincia: Yup.string().required("Requerido"),
  codigoPostal: Yup.string().min(4).required("Requerido"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [confirmModal, setConfirmModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [orderNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
      ciudad: "",
      provincia: "",
      codigoPostal: "",
    },
    validationSchema,
    onSubmit: () => {
      setConfirmModal(true);
    },
  });

  const handleConfirmPurchase = () => {
    dispatch(clearCart());
    setSuccessModal(true);
  };

  if (items.length === 0 && !successModal) {
    return (
      <div className="page-wrapper">
        <div className={styles.empty}>
          <span>🛒</span>
          <h2>Tu carrito está vacío</h2>
          <p>Agregá productos antes de proceder al checkout</p>
          <Link to="/productos" className="btn btn-primary">Ver productos</Link>
        </div>
      </div>
    );
  }

  const shipping = total > 500 ? 0 : 29.99;
  const finalTotal = total + shipping;

  const provinces = [
    "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut",
    "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy",
    "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén",
    "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz",
    "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
  ];

  return (
    <div className="page-wrapper">
      <div className={`container ${styles.breadcrumb}`}>
        <Link to="/">Inicio</Link>
        <span>›</span>
        <Link to="/productos">Productos</Link>
        <span>›</span>
        <span>Checkout</span>
      </div>

      <div className={`container ${styles.layout}`}>
        {/* Form */}
        <div className={styles.formSide}>
          <h2 className={styles.sectionTitle}>Datos de envío</h2>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className={styles.row}>
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" placeholder="Tu nombre" {...formik.getFieldProps("nombre")} />
                {formik.touched.nombre && formik.errors.nombre && (
                  <p className="error-msg">{formik.errors.nombre}</p>
                )}
              </div>
              <div className="form-group">
                <label>Apellido *</label>
                <input type="text" placeholder="Tu apellido" {...formik.getFieldProps("apellido")} />
                {formik.touched.apellido && formik.errors.apellido && (
                  <p className="error-msg">{formik.errors.apellido}</p>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" placeholder="tu@email.com" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-msg">{formik.errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input type="tel" placeholder="+54 9 11 1234-5678" {...formik.getFieldProps("telefono")} />
                {formik.touched.telefono && formik.errors.telefono && (
                  <p className="error-msg">{formik.errors.telefono}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Dirección *</label>
              <input type="text" placeholder="Calle y número" {...formik.getFieldProps("direccion")} />
              {formik.touched.direccion && formik.errors.direccion && (
                <p className="error-msg">{formik.errors.direccion}</p>
              )}
            </div>

            <div className={styles.row3}>
              <div className="form-group">
                <label>Ciudad *</label>
                <input type="text" placeholder="Ciudad" {...formik.getFieldProps("ciudad")} />
                {formik.touched.ciudad && formik.errors.ciudad && (
                  <p className="error-msg">{formik.errors.ciudad}</p>
                )}
              </div>
              <div className="form-group">
                <label>Provincia *</label>
                <select {...formik.getFieldProps("provincia")}>
                  <option value="">Seleccionar</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {formik.touched.provincia && formik.errors.provincia && (
                  <p className="error-msg">{formik.errors.provincia}</p>
                )}
              </div>
              <div className="form-group">
                <label>Cód. Postal *</label>
                <input type="text" placeholder="1234" {...formik.getFieldProps("codigoPostal")} />
                {formik.touched.codigoPostal && formik.errors.codigoPostal && (
                  <p className="error-msg">{formik.errors.codigoPostal}</p>
                )}
              </div>
            </div>

            <div className={styles.paymentSection}>
              <h2 className={styles.sectionTitle}>Método de pago</h2>
              <div className={styles.paymentOptions}>
                {[
                  { id: "tarjeta", label: "Tarjeta de crédito/débito", icon: "💳" },
                  { id: "transferencia", label: "Transferencia bancaria", icon: "🏦" },
                  { id: "mercadopago", label: "MercadoPago", icon: "🔵" },
                ].map((method) => (
                  <label key={method.id} className={styles.paymentOption}>
                    <input type="radio" name="payment" defaultChecked={method.id === "tarjeta"} />
                    <span>{method.icon}</span>
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "1rem" }}
            >
              Confirmar pedido →
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Resumen del pedido</h2>
          <div className={styles.summaryItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.summaryImg} style={{ background: item.gradient }}>
                  <span>{item.emoji}</span>
                </div>
                <div className={styles.summaryInfo}>
                  <p className={styles.summaryName}>{item.name}</p>
                  <p className={styles.summaryQty}>x{item.quantity}</p>
                </div>
                <p className={styles.summaryPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span className={shipping === 0 ? styles.free : ""}>
                {shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping === 0 && (
              <p className={styles.freeNote}>✓ Envío gratis por compras +$500</p>
            )}
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span className={styles.totalAmount}>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
        title="Confirmar compra"
        message={`¿Confirmás tu compra por $${finalTotal.toFixed(2)}? Recibirás un email con los detalles del pedido.`}
        confirmText="Confirmar compra"
        type="default"
      />

      <Modal
        isOpen={successModal}
        onClose={() => { setSuccessModal(false); navigate("/"); }}
        onConfirm={() => { setSuccessModal(false); navigate("/"); }}
        title="¡Compra exitosa!"
        message={`Tu pedido #${orderNumber} fue confirmado. Te enviaremos un email con los detalles y el seguimiento de tu pedido.`}
        confirmText="Ir al inicio"
        cancelText=""
        type="success"
      />
    </div>
  );
};

export default Checkout;
