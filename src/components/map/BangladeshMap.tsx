import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject } from "geojson";

import type { SurveillanceCase } from "../../types/SurveillanceCase";

// Color scale based on number of cases
function getColor(cases: number) {
  if (cases > 150) return "#b10026";
  if (cases > 100) return "#fc4e2a";
  if (cases > 50) return "#fd8d3c";
  if (cases > 20) return "#feb24c";
  if (cases > 0) return "#31a354";

  return "#d9d9d9";
}

type BangladeshMapProps = {
  data: SurveillanceCase[];
};

// Normalize Upazila names between GeoJSON and CSV
const upazilaNameMap: Record<string, string> = {
  Kotwali: "Jashore Sadar",
  "Jessore Kotwali": "Jashore Sadar",
  "Jashore Kotwali": "Jashore Sadar",
};

export default function BangladeshMap({ data }: BangladeshMapProps) {
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);

  // Count cases by Upazila
  const caseCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    data.forEach((record) => {
      const upazila = record.Upazila?.trim();

      if (!upazila) return;

      counts[upazila] = (counts[upazila] || 0) + 1;
    });

    console.log("CSV Upazilas:", Object.keys(counts).sort());
    console.log("Case Counts:", counts);

    return counts;
  }, [data]);

  // Load GeoJSON
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/bangladesh_districts.geojson`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load GeoJSON");
        }
        return response.json();
      })
      .then((geojson) => {
        console.log("GeoJSON Loaded:", geojson);
        console.log("Features:", geojson.features?.length);

        setGeoData(geojson);
      })
      .catch((error) => {
        console.error("Error loading GeoJSON:", error);
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <h2 className="mb-2 text-xl font-semibold">
        Bangladesh Disease Surveillance Map
      </h2>

      <p className="mb-4 text-sm text-gray-600">
        Surveillance Records Loaded:{" "}
        <span className="font-bold text-blue-600">{data.length}</span>
      </p>

      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && (
          <GeoJSON
            data={geoData}
            style={(feature) => {
              const props = feature?.properties as any;

              const geoName = props?.name?.trim() ?? "";

              // Convert GeoJSON name to CSV name
              const upazila = upazilaNameMap[geoName] || geoName;

              const cases = caseCounts[upazila] || 0;

              return {
                color: "#333",
                weight: 1,
                fillColor: getColor(cases),
                fillOpacity: 0.7,
              };
            }}
            onEachFeature={(feature, layer) => {
              const props = feature.properties as any;
              
              console.log(props);
              
              const geoName = props?.name?.trim() ?? "";

              // Convert GeoJSON name to CSV name
              const upazila = upazilaNameMap[geoName] || geoName;

              const cases = caseCounts[upazila] || 0;

              layer.bindPopup(`
                <h3><strong>${upazila}</strong></h3>
                <hr/>
                <b>District:</b> ${props?.district_name ?? "N/A"}<br/>
                <b>Division:</b> ${props?.division_name ?? "N/A"}<br/>
                <b>Total Cases:</b> ${cases}
              `);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}