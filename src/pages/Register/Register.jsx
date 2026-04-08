import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register, clearError, selectIsAuthenticated, selectAuthError } from "../../store/authSlice";
import styles from "./Register.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Mínimo 2 caracteres")
    .max(50)
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirmá tu contraseña"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register({ name: values.name, email: values.email, password: values.password }));
    },
  });

  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <Link to="/" className={styles.logo}>
              <span>⚡</span> Tech<strong>Nova</strong>
            </Link>
            <h1 className={styles.title}>Crear cuenta</h1>
            <p className={styles.subtitle}>Registrate gratis y empezá a comprar</p>
          </div>

          {error && (
            <div className={styles.errorAlert}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                id="name"
                type="text"
                placeholder="Tu nombre"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="error-msg">{formik.errors.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-msg">{formik.errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-msg">{formik.errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repetí tu contraseña"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="error-msg">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}
            >
              Crear cuenta →
            </button>
          </form>

          <p className={styles.switchLink}>
            ¿Ya tenés cuenta?{" "}
            <Link to="/login">Iniciá sesión</Link>
          </p>

          <p className={styles.terms}>
            Al registrarte aceptás nuestros{" "}
            <a href="#">Términos y condiciones</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
