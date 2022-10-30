import React from "react";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import SimpleButton from "../SimpleButton";

interface Props {
  logoutCommand: () => void;
  hiddenMenu: () => void;
}

const MenuLogOut: React.FC<Props> = ({ logoutCommand, hiddenMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="menu-logout-container">
      <>
        <div className="mb-2 flex align-items-center irmao-container">
          <Avatar
            label={user.firstName[0]}
            className="mr-3 irmao-avatar avatar-container"
            size="normal"
            shape="circle"
          />
          <div className="flex flex-column">
            <span style={{ fontSize: 16 }}>
              {user.firstName} {user.lastName[0]}.
            </span>
          </div>
        </div>
        <hr className="p-my-3 linha-horizontal" />
        <div className="flex align-items-center irmao-container">
          <SimpleButton
            command={() => {
              navigate("/my-orders");
              hiddenMenu();
            }}
          >
            <div className="flex flex-row align-items-center">
              <span className="material-icons-round">shopping_bag</span>
              <span style={{ fontSize: 16 }}>Meus Pedidos</span>
            </div>
          </SimpleButton>
        </div>
        <hr className="p-my-3 linha-horizontal" />
        <SimpleButton
          command={() => {
            logoutCommand();
            hiddenMenu();
          }}
          label="Sair"
          icon="pi pi-sign-out"
        />
      </>
    </div>
  );
};

export default MenuLogOut;
