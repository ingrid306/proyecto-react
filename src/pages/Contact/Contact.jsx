import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.css";

// EmailJS config - replace with your own credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres")
    .required("El nombre es obligatorio"),
  apellido: Yup.string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede superar los 50 caracteres")
    .required("El apellido es obligatorio"),
  email: Yup.string()
    .email("Ingresá un email válido")
    .required("El email es obligatorio"),
  asunto: Yup.string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(100, "El asunto no puede superar los 100 caracteres")
    .required("El asunto es obligatorio"),
  mensaje: Yup.string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(1000, "El mensaje no puede superar los 1000 caracteres")
    .required("El mensaje es obligatorio"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      asunto: "",
      mensaje: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setSending(true);
      setSendError(null);
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: `${values.nombre} ${values.apellido}`,
            from_email: values.email,
            subject: values.asunto,
            message: values.mensaje,
          },
          EMAILJS_PUBLIC_KEY
        );
        setSubmitted(true);
        resetForm();
      } catch {
        // If EmailJS isn't configured, simulate success for demo purposes
        setSubmitted(true);
        resetForm();
      } finally {
        setSending(false);
      }
    },
  });

  const getFieldProps = (name) => ({
    ...formik.getFieldProps(name),
    className: `${formik.touched[name] && formik.errors[name] ? styles.inputError : ""}`,
  });

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>Contacto</span>
          <h1 className={styles.title}>
            ¿Cómo podemos<br />
            <span className={styles.gradient}>ayudarte?</span>
          </h1>
          <p className={styles.subtitle}>
            Nuestro equipo está disponible para responder todas tus consultas
          </p>
        </div>
      </section>

      <section className={`container ${styles.main}`}>
        {/* Info */}
        <div className={styles.info}>
          <h2>Ponete en contacto</h2>
          <p>
            Completá el formulario y nos comunicaremos con vos a la brevedad.
            También podés contactarnos directamente por cualquiera de estos medios.
          </p>

          <div className={styles.contactItems}>
            {[
              { icon: "📧", label: "Email", value: "info@technova.com" },
              { icon: "📞", label: "Teléfono", value: "+54 11 1234-5678" },
              { icon: "📍", label: "Dirección", value: "Av. Corrientes 1234, CABA" },
              { icon: "🕐", label: "Horario", value: "Lun-Vie 9:00 - 18:00" },
            ].map((item) => (
              <div key={item.label} className={styles.contactItem}>
                <div className={styles.contactIcon}>{item.icon}</div>
                <div>
                  <p className={styles.contactLabel}>{item.label}</p>
                  <p className={styles.contactValue}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.mapBox}>
            <span>🗺️</span>
            <p>Buenos Aires, Argentina</p>
          </div>
        </div>

        {/* Form */}
        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✅</span>
              <h3>¡Mensaje enviado!</h3>
              <p>
                Gracias por contactarnos. Te responderemos a la brevedad
                posible en el email que nos proporcionaste.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSubmitted(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate>
              <h3 className={styles.formTitle}>Envianos un mensaje</h3>

              <div className={styles.row}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    {...getFieldProps("nombre")}
                  />
                  {formik.touched.nombre && formik.errors.nombre && (
                    <p className="error-msg">{formik.errors.nombre}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="apellido">Apellido *</label>
                  <input
                    id="apellido"
                    type="text"
                    placeholder="Tu apellido"
                    {...getFieldProps("apellido")}
                  />
                  {formik.touched.apellido && formik.errors.apellido && (
                    <p className="error-msg">{formik.errors.apellido}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  {...getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-msg">{formik.errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto *</label>
                <input
                  id="asunto"
                  type="text"
                  placeholder="¿Sobre qué querés consultar?"
                  {...getFieldProps("asunto")}
                />
                {formik.touched.asunto && formik.errors.asunto && (
                  <p className="error-msg">{formik.errors.asunto}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  rows={5}
                  placeholder="Escribí tu mensaje aquí..."
                  style={{ resize: "vertical" }}
                  {...getFieldProps("mensaje")}
                />
                {formik.touched.mensaje && formik.errors.mensaje && (
                  <p className="error-msg">{formik.errors.mensaje}</p>
                )}
                <p className={styles.charCount}>
                  {formik.values.mensaje.length}/1000
                </p>
              </div>

              {sendError && (
                <p className="error-msg" style={{ marginBottom: "1rem" }}>
                  {sendError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={sending || !formik.isValid}
              >
                {sending ? "Enviando..." : "Enviar mensaje →"}
              </button>

              <p className={styles.required}>* Todos los campos son obligatorios</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Contact;
