import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useJsApiLoader, GoogleMap, MarkerF, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { Button } from "primereact/button";
import _ from "lodash";

import { useNavigate } from "react-router-dom";
import Product from "../../components/Product";
import OrderProducts from "../../components/OrderProducts";
import { useToast } from "../../hooks/toast";

export interface Products {
  id: string;
  name: string;
  value: number;
  description?: string;
  image?: string;
  category: Categories;
}

export type Categories =
  | "TODOS"
  | "PIZZA"
  | "SANDUICHES"
  | "ACOMPANHAMENTOS"
  | "BEBIDAS"
  | "MILK_SHAKES"
  | "COMBOS"
  | "SUSHI"
  | "PASTEL"
  | "KIKAO"
  | "MASSAS"
  | "RISOTO"
  | "CHURRASCO"
  | "GELADOS";

export interface CategoryElement {
  label: string;
  category: Categories;
}

export type CategoryMap = {
  // eslint-disable-next-line no-unused-vars
  [name in Categories]: CategoryElement;
};

export const categoriesMap: CategoryMap = {
  TODOS: { category: "TODOS", label: "Todos os produtos" },
  ACOMPANHAMENTOS: { category: "ACOMPANHAMENTOS", label: "Acompanhamentos" },
  CHURRASCO: { category: "CHURRASCO", label: "Churrascos" },
  COMBOS: { category: "COMBOS", label: "Combos" },
  GELADOS: { category: "GELADOS", label: "Gelados" },
  KIKAO: { category: "KIKAO", label: "Kikães" },
  MASSAS: { category: "MASSAS", label: "Massas" },
  MILK_SHAKES: { category: "MILK_SHAKES", label: "Milk Shakes" },
  PASTEL: { category: "PASTEL", label: "Pasteis" },
  PIZZA: { category: "PIZZA", label: "Pizzas" },
  BEBIDAS: { category: "BEBIDAS", label: "Bebidas" },
  SANDUICHES: { category: "SANDUICHES", label: "Sanduíches" },
  SUSHI: { category: "SUSHI", label: "Sushis" },
  RISOTO: { category: "RISOTO", label: "Risotos" },
};

interface DropdownResponse {
  data: { type: Categories }[];
}

const Options: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [value, setValue] = useState<CategoryElement | undefined>();
  const [optionsDropdown, setOptionsDropdown] = useState<CategoryElement[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const [products, setProdutcs] = useState<Products[]>([
    { id: "1", name: "Pizza", value: 20, category: "ACOMPANHAMENTOS" },
    {
      id: "2",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "BEBIDAS",
    },
    {
      id: "3",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "CHURRASCO",
    },
    {
      id: "4",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "COMBOS",
    },
    {
      id: "5",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "GELADOS",
    },
    {
      id: "6",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "SUSHI",
    },
    {
      id: "7",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "SANDUICHES",
    },
    {
      id: "8",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "RISOTO",
    },
    {
      id: "9",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "PIZZA",
    },
    {
      id: "10",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "PASTEL",
    },
    {
      id: "11",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "MILK_SHAKES",
    },
  ]);
  const [filtered, setFiltered] = useState<Products[]>([
    { id: "1", name: "Pizza", value: 20, category: "ACOMPANHAMENTOS" },
    {
      id: "2",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "BEBIDAS",
    },
    {
      id: "3",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "CHURRASCO",
    },
    {
      id: "4",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "COMBOS",
    },
    {
      id: "5",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "GELADOS",
    },
    {
      id: "6",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "SUSHI",
    },
    {
      id: "7",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "SANDUICHES",
    },
    {
      id: "8",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "RISOTO",
    },
    {
      id: "9",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "PIZZA",
    },
    {
      id: "10",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "PASTEL",
    },
    {
      id: "11",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
      category: "MILK_SHAKES",
    },
  ]);

  const [center, setCenter] = useState({} as { lat: number; lng: number });

  const [directionsResponse, setDirectionsResponse] = useState({} as google.maps.DirectionsResult);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

  const handleSubmit = useCallback(() => {
    showToast({ type: "success", title: "Seu pedido foi feito com sucesso!" });
    navigate("/order/xx");
  }, [navigate, showToast]);

  const libraries: ("drawing" | "geometry" | "localContext" | "places" | "visualization")[] = useMemo(
    () => ["places"],
    []
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
    libraries,
  });

  const calculateRoute = useCallback(async () => {
    if (destinationRef.current === null || (destinationRef.current != null && destinationRef.current.value === "")) {
      return;
    }
    setCenter({} as google.maps.LatLngLiteral);

    // const directionsService = new google.maps.DirectionsService();
    // const results = await directionsService.route({
    //   origin: "UniNorte - Unidade 11",
    //   destination: destinationRef.current.value,
    //   unitSystem: google.maps.UnitSystem.METRIC,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // });
    // setDirectionsResponse(results);
    // setDistance(`${results.routes[0].legs[0].distance?.text}`);
    // setDuration(`${results.routes[0].legs[0]?.duration?.text}`);
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const indexOfProductInArrayOfSelectedProducts = selectedProducts.findIndex((sP) => sP.id === id);
      const copyOfSelectedProducts = _.cloneDeep(selectedProducts);

      if (indexOfProductInArrayOfSelectedProducts === -1) {
        const productSelected = products.find((p) => p.id === id);
        if (productSelected) {
          copyOfSelectedProducts.push(productSelected);
          setSelectedProducts(copyOfSelectedProducts);
        }
      } else {
        copyOfSelectedProducts.splice(indexOfProductInArrayOfSelectedProducts, 1);
        setSelectedProducts(copyOfSelectedProducts);
      }
    },
    [products, selectedProducts]
  );

  const checkIsSelectedProduct = useCallback(
    (id: string) => {
      if (selectedProducts.find((sP) => sP.id === id)) {
        return true;
      }
      return false;
    },
    [selectedProducts]
  );

  const filterData = useCallback(
    (filter: string) => {
      if (products) {
        setFiltered(
          products.filter((p) => {
            if (value?.category !== "TODOS") {
              return (
                (p.description?.toString().toLowerCase().includes(filter.toLowerCase()) ||
                  p.name.toString().toLowerCase().includes(filter.toLowerCase())) &&
                (typeof value === "undefined" ? true : p.category === value?.category)
              );
            }
            return (
              p.description?.toString().toLowerCase().includes(filter.toLowerCase()) ||
              p.name.toString().toLowerCase().includes(filter.toLowerCase())
            );
          })
        );
      }
    },
    [products, value]
  );

  const filterDataWithDropdown = useCallback(
    (filter: string) => {
      if (products) {
        setFiltered(
          products.filter((p) => {
            if (filter !== "TODOS") {
              return (
                (p.description?.toString().toLowerCase().includes(filterText.toLowerCase()) ||
                  p.name.toString().toLowerCase().includes(filterText.toLowerCase())) &&
                p.category === filter
              );
            }
            return (
              p.description?.toString().toLowerCase().includes(filterText.toLowerCase()) ||
              p.name.toString().toLowerCase().includes(filterText.toLowerCase())
            );
          })
        );
      }
    },
    [products, filterText]
  );

  const totalValue = useCallback(() => {
    return selectedProducts.reduce((sum, item) => {
      return sum + item.value;
    }, 0);
  }, [selectedProducts]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      setCenter({ lat: e.coords.latitude, lng: e.coords.longitude });
    });

    setOptionsDropdown([
      { category: "TODOS", label: "Todos os produtos" },
      { category: "ACOMPANHAMENTOS", label: "Acompanhamentos" },
      { category: "CHURRASCO", label: "Churrascos" },
      { category: "COMBOS", label: "Combos" },
      { category: "GELADOS", label: "Gelados" },
      { category: "KIKAO", label: "Kikães" },
      { category: "MASSAS", label: "Massas" },
      { category: "MILK_SHAKES", label: "Milk Shakes" },
      { category: "PASTEL", label: "Pasteis" },
      { category: "PIZZA", label: "Pizzas" },
      { category: "BEBIDAS", label: "Bebidas" },
      { category: "SANDUICHES", label: "Sanduíches" },
      { category: "SUSHI", label: "Sushis" },
      { category: "RISOTO", label: "Risotos" },
    ]);
  }, []);

  if (!isLoaded) {
    return <></>;
  }

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
            value={value || ""}
            options={optionsDropdown}
            onChange={(e) => {
              const optionSelected = optionsDropdown.find((o) => o.label === e.target.value.label);
              if (optionSelected) {
                setValue(optionSelected);
                filterDataWithDropdown(optionSelected.category);
              }
            }}
            optionLabel="label"
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
              onChange={(e) => {
                setFilterText(e.target.value);
                filterData(e.target.value);
              }}
              placeholder="Buscar produto"
              style={{ width: "230px" }}
            />
          </span>
        </div>
      </div>
      <div className="options">
        <div className="flex col-offset-1 col-11 flex-wrap">
          {filtered.map((p) => (
            <Product key={p.id} product={p} onSelect={handleSelect} isSelected={checkIsSelectedProduct(p.id)} />
          ))}
        </div>
      </div>

      <div className="col-offset-1 col-10">
        <div className="search-location">
          <span>Selecione onde o pedido deve ser entregue:</span>
          {/* <div className="flex align-items-center" style={{ height: "38px" }}>
            <Autocomplete className="autocomplete-google-container">
              <input className="p-inputtext" type="text" placeholder="Origin" ref={destinationRef} />
            </Autocomplete>
            <Button icon="pi pi-search" onClick={() => calculateRoute()} />
          </div> */}
        </div>

        <div className="google-maps-container">
          <div className="estimative-container">
            <span>Distancia: {distance}</span>
            <span>Tempo estimado de espera: {duration}</span>
          </div>
          {/* <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <MarkerF position={center} options={{ opacity: 0 }} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap> */}
        </div>
      </div>

      <OrderProducts
        className="col-offset-1 col-10"
        amount={selectedProducts.length}
        totalPrice={totalValue()}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Options;
