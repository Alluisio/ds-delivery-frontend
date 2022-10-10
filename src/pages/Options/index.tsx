import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useJsApiLoader, GoogleMap, MarkerF, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";
import { Button } from "primereact/button";
import _ from "lodash";

import Product from "../../components/Product";
import OrderProducts from "../../components/OrderProducts";

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
      id: "2",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "3",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "4",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "5",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "6",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "7",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "8",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "9",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "10",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
    {
      id: "11",
      name: "Pizza",
      value: 19.9,
      description: "descrição",
      image:
        "https://s.yimg.com/ny/api/res/1.2/SEMowe8X4DsmdX7uum7gYg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM4Mw--/https://s.yimg.com/os/creatr-uploaded-images/2021-10/c5fd29a0-2b9f-11ec-b3ff-30a01d58d24a",
    },
  ]);

  const [center, setCenter] = useState({} as { lat: number; lng: number });

  const [directionsResponse, setDirectionsResponse] = useState({} as google.maps.DirectionsResult);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

  const onChangeCategories = useCallback(() => {}, []);

  const handleSubmit = useCallback(() => {}, []);

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

  const totalValue = useCallback(() => {
    return selectedProducts.reduce((sum, item) => {
      return sum + item.value;
    }, 0);
  }, [selectedProducts]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((e) => {
      setCenter({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
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
