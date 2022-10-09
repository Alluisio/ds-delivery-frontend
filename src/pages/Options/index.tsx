import React, { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import Product from "../../components/Product";

interface Category {
  category: string;
}

export interface Products {
  id: string;
  name: string;
  value: number;
  description?: string;
  image?: string;
}

const Options: React.FC = () => {
  const [categorySelected, setCategorySelected] = useState({} as Category);
  const [categories, setCategories] = useState<Category[]>([{ category: "a" }]);
  const [filterText, setFilterText] = useState<string>("");
  const [products, setProdutcs] = useState<Products[]>([
    { id: "1", name: "Pizza", value: 20 },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "1",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
  ]);

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
              placeholder="Buscar produto"
              style={{ width: "230px" }}
            />
          </span>
        </div>
      </div>
      <div className="options">
        <div className="flex col-offset-1 col-11 flex-wrap">
          {products.map((p) => (
            <Product product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Options;
