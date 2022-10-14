import { Button } from "primereact/button";
import React from "react";
import { formatPrice } from "../../utils/numbers";

interface Props {
  amount: number;
  totalPrice: number;
  onSubmit: () => void;
  className: string;
  disableButton: boolean;
}

const OrderProducts: React.FC<Props> = ({ amount, totalPrice, onSubmit, className, disableButton }) => {
  return (
    <div className={`order-summary-container ${className}`}>
      <div className="order-summary-content">
        <div>
          <span className="amount-selected-container">
            <strong className="amount-selected">{amount}</strong>
            PEDIDOS SELECIONADOS
          </span>
          <span className="order-summary-total">
            <strong className="amount-selected">{formatPrice(totalPrice)}</strong>
            VALOR TOTAL
          </span>
        </div>
        <Button onClick={onSubmit} label="FAZER PEDIDO" disabled={disableButton} />
      </div>
    </div>
  );
};

export default OrderProducts;
