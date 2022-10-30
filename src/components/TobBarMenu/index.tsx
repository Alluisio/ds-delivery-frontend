/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Avatar } from "primereact/avatar";
import { useAuth } from "../../hooks/auth";
import MenuLogOut from "../MenuLogOut";

const TopBarMenu: React.FC = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const [blMenu, setBlMenu] = useState(false);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const confirmLogOut = useCallback(() => {
    confirmDialog({
      message: "Será necessário fazer login novamente para acessar o sistema.",
      header: "Deseja sair?",
      icon: "pi pi-question-circle",
      acceptLabel: "Sair",
      rejectLabel: "Cancelar",
      accept: handleSignOut,
      reject: () => {},
    });
  }, [handleSignOut]);

  const showMenu = useCallback(() => {
    setBlMenu(!blMenu);
  }, [blMenu]);

  useEffect(() => {
    setBlMenu(false);
  }, []);

  return (
    <div
      className="flex align-items-center top-bar-container"
      style={{
        height: 60,
        backgroundColor: "#FF5371",
        paddingLeft: 40,
      }}
    >
      <ConfirmDialog />
      <p
        style={{ fontWeight: "bold", cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        SIX Delivery
      </p>

      <div className="ml-auto mr-3 flex">
        <button
          type="button"
          onClick={() => {
            showMenu();
          }}
          className="button-perfil irmao-container"
        >
          <Avatar label={user.firstName[0]} className="avatar-container" size="normal" shape="circle" />
        </button>
        {blMenu && <MenuLogOut logoutCommand={confirmLogOut} hiddenMenu={() => setBlMenu(false)} />}
      </div>
    </div>
  );
};

export default TopBarMenu;
