import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar", type = "default" }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.iconWrap} ${styles[type]}`}>
          {type === "danger" ? "⚠️" : type === "success" ? "✅" : "❓"}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={`btn btn-outline ${styles.cancel}`} onClick={onClose}>
            {cancelText}
          </button>
          <button
            className={`btn ${type === "danger" ? "btn-danger" : "btn-primary"}`}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
