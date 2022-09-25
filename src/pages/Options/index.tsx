import React, { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

interface Category {
  category: string;
}

const Options: React.FC = () => {
  const [categorySelected, setCategorySelected] = useState({} as Category);
  const [categories, setCategories] = useState<Category[]>([{ category: "a" }]);
  const [filterText, setFilterText] = useState<string>("");

  const onChangeCategories = useCallback(() => {}, []);

  return (
    <div className="grid grid-nogutter col-12 mt-3 options-content">
      <div className="follow-steps-container">
        <div className="col-offset-1 col-2 category-text">
          <p>SIGA AS ETAPAS</p>
        </div>
        <div className="col-8 steps">
          <div className="step-container">
            <p>1</p>
            <p>Selecione os produtos e a localização.</p>
          </div>
          <div className="step-container">
            <p>2</p>
            <p>
              Depois clique em <span>&ldquo;REALIZAR PEDIDO&rdquo;</span>
            </p>
          </div>
        </div>
      </div>
      <div className="filters">
        <div className="col-offset-1 col-2 category-text">
          <p>FILTROS</p>
        </div>
        <div className="dropdown-container">
          <Dropdown
            value={categorySelected}
            options={categories}
            onChange={onChangeCategories}
            optionLabel="category"
            placeholder="Categoria"
            emptyMessage="Nenhuma categoria encontrada"
            style={{ width: "230px" }}
          />
        </div>
        <div className="input-text-container">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Buscar item"
              style={{ width: "230px" }}
            />
          </span>
        </div>
      </div>
      <div className="options">
        <></>
      </div>
    </div>
  );
};

export default Options;
