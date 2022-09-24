import React from "react";
import { addLocale } from "primereact/api";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./hooks";
import Routes from "./routes";

import "./css/reset.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";

const App: React.FC = () => {
  addLocale("pt-br", {
    firstDayOfWeek: 0,
    dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    today: "Hoje",
    clear: "Limpar",
    dateFormat: "dd/mm/yy",
  });

  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
};

export default App;
