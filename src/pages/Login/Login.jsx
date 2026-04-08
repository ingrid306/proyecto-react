import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, clearError, selectIsAuthenticated, selectAuthError } from "../../store/authSlice";
import styles from "./Login.module.css";

const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("El email es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
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
            <h1 className={styles.title}>Bienvenido de vuelta</h1>
            <p className={styles.subtitle}>Iniciá sesión en tu cuenta</p>
          </div>

          {error && (
            <div className={styles.errorAlert}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate>
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
                placeholder="••••••••"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-msg">{formik.errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.85rem", marginTop: "0.5rem" }}
            >
              Iniciar sesión →
            </button>
          </form>

          <p className={styles.switchLink}>
            ¿No tenés cuenta?{" "}
            <Link to="/registro">Registrate gratis</Link>
          </p>

          <div className={styles.demoNote}>
            <p>💡 Demo: Registrate primero para crear una cuenta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
