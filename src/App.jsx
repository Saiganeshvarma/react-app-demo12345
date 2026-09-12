
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  console.log("hello world")

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Open modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      <h1>Fake Store Products</h1>

      <div className="products-container">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image} alt={product.title} />

            <h2>{product.title}</h2>

            <p className="category">
              {product.category}
            </p>

            <p className="price">
              ${product.price}
            </p>

            <button>View Product</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={closeModal}
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
            />

            <div className="modal-content">
              <h2>{selectedProduct.title}</h2>

              <p className="category">
                {selectedProduct.category}
              </p>

              <p>
                {selectedProduct.description}
              </p>

              <h3>
                ${selectedProduct.price}
              </h3>

              <p>
                ⭐ {selectedProduct.rating.rate} (
                {selectedProduct.rating.count} reviews)
              </p>

              <button className="buy-button">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;

