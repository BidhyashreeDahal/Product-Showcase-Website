export default function ProductDetail({ product }) {
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <p><strong>Author:</strong> {product.author}</p>

      {product.image && (
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: "300px", borderRadius: "10px", marginTop: "20px" }}
        />
      )}

      <p style={{ marginTop: "20px" }}>{product.description}</p>
    </div>
  );
}
