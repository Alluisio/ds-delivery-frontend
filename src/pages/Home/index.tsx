import { Button } from "primereact/button";
import React from "react";
import entregador from "../../assets/img/entregador.svg";

const Home: React.FC = () => {
  return (
    <div className="grid grid-nogutter col-10 col-offset-1 container-main align-items-center  ">
      <div className="content-left">
        <div className="mb-5">
          <p className="text-faca-pedido">Faça seu pedido que entregamos para você!!!</p>
        </div>
        <p className="text-escolha mb-5">Escolha o seu pedido e em poucos minutos levaremos na sua porta</p>
        <Button label="FAZER PEDIDO" onClick={() => {}} />
      </div>
      <div className="content-right">
        <img src={entregador} alt="entregador em uma moto" />
      </div>
    </div>
  );
};

export default Home;
