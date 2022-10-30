/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column, ColumnProps } from "primereact/column";
import api from "../../service/api";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

interface MyOrdersResponse {
  dtPedido: string;
  dtPedidoFormatted: string;
  qtdItens: number;
}

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [myOrders, setMyOrders] = useState<MyOrdersResponse[]>([]);

  const columns = useMemo(
    (): ColumnProps[] => [
      {
        field: "dtPedidoFormatted",
        sortField: "dtPedido",
        header: "Data do pedido",
        headerStyle: { width: "30%" },
        sortable: true,
        style: { verticalAlign: "middle" },
      },
      {
        field: "qtdItens",
        header: "Quantidade de itens",
        style: { verticalAlign: "middle" },
      },
    ],
    []
  );

  useEffect(() => {
    api
      .get<MyOrdersResponse[]>(`orders/my-orders/${user.id}`)
      .then(({ data }) => {
        setMyOrders(data);
      })
      .catch(() => {
        showToast({
          type: "error",
          title: "Não foi possível carregar seus pedidos",
          description: "Tente novamente ou entre em contato com os administradores",
        });
      });
  }, [showToast, user.id]);

  return (
    <div className="grid grid-nogutter col-12 mt-3 options-content">
      <div className="col-offset-1 category-text mb-5">
        <p>MEUS PEDIDOS</p>
      </div>
      <div className="col-offset-1 col-10">
        <DataTable
          sortOrder={-1}
          sortField="dtPedido"
          emptyMessage={<p>Nenhum registro encontrado</p>}
          value={myOrders}
        >
          {columns.map((column, i) => (
            <Column key={`column${i}`} {...column} />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default MyOrders;
