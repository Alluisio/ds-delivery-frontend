import { Button } from "primereact/button";
import React from "react";
import entregador from "../../assets/img/entregador.svg";

const Home: React.FC = () => {
  return (
    <div className="container-main grid grid-nogutter col-10 col-offset-1">
      <div className="content-left">
        <p className="text-faca-pedido">Faça seu pedido que entregamos para você!!!</p>
        <p className="text-escolha">Escolha o seu pedido e em poucos minutos levaremos na sua porta</p>
        <Button label="FAZER PEDIDO" onClick={() => {}} />
      </div>
      <div className="content-right">
        <img src={entregador} alt="entregador em uma moto" />
      </div>
    </div>
  );
};

export default Home;
