import styles from "../styles/ProductList.module.css";
import Link from "next/link";

export default function ProductList({ products }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.author}>By: {product.author}</p>

          <Link href={`/products/${product.id}`} className={styles.link}>
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
}
