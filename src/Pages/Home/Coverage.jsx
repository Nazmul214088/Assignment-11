import { useEffect, useRef } from "react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CiSearch } from "react-icons/ci";
const Coverage = () => {
  const [warehouse, setWarehouse] = useState([]);
  const position = [23.814138547907536, 90.4114492409236];
  const mapRef = useRef();
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouse(data));
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.location.value.toLowerCase();
    const district = warehouse.find((house) =>
      house.district.toLowerCase().includes(searchTerm),
    );
    if (district) {
      const coordinate = [district.latitude, district.longitude];
      mapRef.current.flyTo(coordinate, 12);
    }
  };

  return (
    <div className="">
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        Our Coverage Area
      </h1>
      <div>
        <h1 className="text-5xl text-[#03373D] font-extrabold py-10">
          We are available in 64 districts
        </h1>
        <form onSubmit={(e) => handleSearch(e)} className="mb-10">
          <label className="input bg-[#8bc3cf39]">
            <CiSearch />
            <input
              type="search"
              name="location"
              required
              placeholder="Search"
              className=" focus:outline-none bg-transparent focus:focus:ring-0 border-none outline-none"
            />
          </label>
          <button className="bg-[#CAEB66] px-6 py-2  rounded-xl">Search</button>
        </form>
      </div>
      <div className="w-full h-screen border">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warehouse.map((warehouse, index) => (
            <Marker
              position={[warehouse.latitude, warehouse.longitude]}
              key={index}
            >
              <Popup>
                <div>
                  <h2 className=" font-semibold">{warehouse.district}</h2>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
