import React from "react";
import { Products } from "../../pages/Options";
import noImage from "../../assets/img/no-image.png";

interface Props {
  product: Products;
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <div key={product.id} className="product-card">
      <div className="card-header">
        <span>{product.name}</span>
      </div>
      <div className="image-container">
        {product.image ? (
          <img className="image-product" src={product.image} alt="imagem do produto" />
        ) : (
          <img className="image-product" src={noImage} alt="imagem quando o produto não tem imagem cadastrada" />
        )}
      </div>
      <span className="card-value-text">
        {product.value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </span>
      <div className="card-description-container">
        <span>Descrição</span>
        <span>{product.description}</span>
      </div>
    </div>
  );
};

export default Product;
