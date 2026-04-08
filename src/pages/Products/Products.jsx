import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { products, categories } from "../../data/products";
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

const Products = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [clearModal, setClearModal] = useState(false);

  const filtered = products
    .filter((p) => {
      const matchCat = selectedCategory === "Todos" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchCat && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

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
              placeholder="Buscar productos..."
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
              Precio máximo: <span>${priceRange[1].toLocaleString()}</span>
            </h4>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className={styles.range}
            />
            <div className={styles.rangeLabels}>
              <span>$0</span>
              <span>$2,000</span>
            </div>
          </div>

          <button
            className="btn btn-outline"
            style={{ width: "100%" }}
            onClick={() => {
              setSelectedCategory("Todos");
              setSortBy("default");
              setSearch("");
              setPriceRange([0, 2000]);
            }}
          >
            Limpiar filtros
          </button>
        </aside>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? "s" : ""}
              {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
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

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span>🔍</span>
              <h3>No encontramos productos</h3>
              <p>Intentá con otros filtros o términos de búsqueda</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSearch("");
                  setPriceRange([0, 2000]);
                }}
              >
                Ver todos
              </button>
            </div>
          ) : (
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
        onConfirm={() => {}}
        title="Carrito vaciado"
        message="Todos los productos han sido eliminados del carrito."
        confirmText="Aceptar"
        cancelText=""
        type="success"
      />
    </div>
  );
};

export default Products;
