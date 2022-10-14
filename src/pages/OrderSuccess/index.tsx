import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import successEntregador from "../../assets/img/success-order.svg";

const OrderSucess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-nogutter col-10 col-offset-1 container-main-order-success align-items-center  ">
      <div className="content-left">
        <div className="mb-5">
          <p className="text-faca-pedido">Seu pedido foi realizado com sucesso.</p>
        </div>
        <p className="text-escolha mb-5">
          Aguarde no endereço escolhido na tela anterior, seu pedido chegará em alguns instantes.
        </p>
        <Button
          label="VOLTAR PARA A HOME"
          onClick={() => {
            navigate("/");
          }}
          className="mr-4 back-home"
        />
        <Button
          label="FAZER UM NOVO PEDIDO"
          onClick={() => {
            navigate("/options");
          }}
        />
      </div>
      <div className="content-right">
        <img src={successEntregador} alt="entregador em uma moto" />
      </div>
    </div>
  );
};

export default OrderSucess;
