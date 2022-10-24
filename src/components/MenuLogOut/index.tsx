import React from "react";
import { Avatar } from "primereact/avatar";
import { useAuth } from "../../hooks/auth";
import SimpleButton from "../SimpleButton";

interface Props {
  logoutCommand: () => void;
}

const MenuLogOut: React.FC<Props> = ({ logoutCommand }) => {
  const { user } = useAuth();

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
        <SimpleButton command={() => logoutCommand()} label="Sair" icon="pi pi-sign-out" />
      </>
    </div>
  );
};

export default MenuLogOut;
