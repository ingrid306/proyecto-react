import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import Modal from "../../components/Modal/Modal";
import styles from "./Products.module.css";

const sortOptions = [
  { value: "default", label: "Relevancia" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "rating", label: "Mejor valorados" },
  { value: "name", label: "Nombre A-Z" },
];

const SkeletonCard = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonImg} />
    <div className={styles.skeletonBody}>
      <div className={styles.skeletonLine} style={{ width: "40%" }} />
      <div className={styles.skeletonLine} style={{ width: "80%" }} />
      <div className={styles.skeletonLine} style={{ width: "60%" }} />
    </div>
  </div>
);

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((s) => s.products);

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [clearModal, setClearModal] = useState(false);

  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const priceMax = useMemo(
    () => (products.length ? Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100 : 2000),
    [products]
  );

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchCat = selectedCategory === "Todos" || p.category === selectedCategory;
        const matchSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand?.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase());
        const matchPrice = p.price <= maxPrice;
        return matchCat && matchSearch && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, selectedCategory, sortBy, search, maxPrice]);

  return (
    <div className="page-wrapper">
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.title}>Nuestros Productos</h1>
          <p className={styles.subtitle}>
            Explorá nuestra colección completa de tecnología de vanguardia
          </p>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, marca o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch("")}>✕</button>
            )}
          </div>
        </div>
      </section>

      <section className={`container ${styles.main}`}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>Categorías</h4>
            <div className={styles.categoryList}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.catBtn} ${selectedCategory === cat ? styles.catActive : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                  <span className={styles.catCount}>
                    {cat === "Todos"
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <h4 className={styles.filterTitle}>
              Precio máximo: <span>${maxPrice.toLocaleString()}</span>
            </h4>
            <input
              type="range"
              min="0"
              max={priceMax}
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className={styles.range}
            />
            <div className={styles.rangeLabels}>
              <span>$0</span>
              <span>${priceMax.toLocaleString()}</span>
            </div>
          </div>

          <button
            className="btn btn-outline"
            style={{ width: "100%" }}
            onClick={() => {
              setSelectedCategory("Todos");
              setSortBy("default");
              setSearch("");
              setMaxPrice(priceMax);
            }}
          >
            Limpiar filtros
          </button>
        </aside>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              {status === "loading" ? (
                <span>Cargando productos...</span>
              ) : (
                <>
                  <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? "s" : ""}
                  {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
                </>
              )}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {status === "loading" && (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {status === "failed" && (
            <div className={styles.empty}>
              <span>⚠️</span>
              <h3>Error al cargar los productos</h3>
              <p>{error}</p>
            </div>
          )}

          {status === "succeeded" && filtered.length === 0 && (
            <div className={styles.empty}>
              <span>🔍</span>
              <h3>No encontramos productos</h3>
              <p>Intentá con otros filtros o términos de búsqueda</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSearch("");
                  setMaxPrice(priceMax);
                }}
              >
                Ver todos
              </button>
            </div>
          )}

          {status === "succeeded" && filtered.length > 0 && (
            <div className={styles.grid}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal
        isOpen={clearModal}
        onClose={() => setClearModal(false)}
        onConfirm={() => { dispatch(clearCart()); setClearModal(false); }}
        title="Vaciar carrito"
        message="¿Estás seguro de que querés vaciar el carrito?"
        confirmText="Vaciar"
        type="danger"
      />
    </div>
  );
};

export default Products;
