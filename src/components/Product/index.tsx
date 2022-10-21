/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Products } from "../../pages/Options";
import noImage from "../../assets/img/no-image.png";

interface Props {
  product: Products;
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const Product: React.FC<Props> = ({ product, onSelect, isSelected }) => {
  return (
    <div
      key={product.id}
      className={`product-card ${isSelected && "product-selected"}`}
      onClick={() => onSelect(product.id)}
    >
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
        {parseFloat(product.value).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
      </span>
      <div className="card-description-container">
        <span>Descrição</span>
        <span>{product.description}</span>
      </div>
    </div>
  );
};

export default Product;
