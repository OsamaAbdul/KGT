import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MarkerData {
  id: string;
  coordinates: [number, number];
  fullName: string;
  currentCity: string;
  currentCountry: string;
}

const WorldMap = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [hoveredMarker, setHoveredMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("public_profiles")
        .select("id, full_name, current_city, current_country, origin_state, origin_country, last_known_coords");

      if (error) {
        console.error("Error fetching profiles:", error);
        return;
      }

      const parsed: MarkerData[] = data
        .filter((p) => p.last_known_coords)
        .map((p) => {
          const coords = p.last_known_coords as any;
          let lng = 0, lat = 0;

          if (coords?.coordinates) {
            [lng, lat] = coords.coordinates;
          } else if (typeof coords === "string") {
            const match = coords.match(/POINT\s*\(\s*([^ ]+)\s+([^ ]+)\s*\)/i);
            if (match) {
              lng = parseFloat(match[1]);
              lat = parseFloat(match[2]);
            }
          }

          // Use current location if available, otherwise fallback to origin
          const city = p.current_city || p.origin_state || "Unknown City";
          const country = p.current_country || p.origin_country || "Unknown Country";

          return {
            id: p.id ?? "",
            coordinates: [lng, lat] as [number, number],
            fullName: p.full_name ?? "",
            currentCity: city,
            currentCountry: country,
          };
        })
        .filter((m) => m.coordinates[0] !== 0 || m.coordinates[1] !== 0);

      setMarkers(parsed);
    };

    fetchProfiles();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:profiles_map')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        () => {
          fetchProfiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative h-full w-full overflow-hidden"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [20, 10] }}
        className="h-full w-full"
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(150 15% 12%)"
                  stroke="hsl(150 15% 18%)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "hsl(150 20% 16%)", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinates={marker.coordinates}
              onMouseEnter={() => setHoveredMarker(marker)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              <g style={{ cursor: "pointer", pointerEvents: "auto" }}>
                {/* Glow effect */}
                <circle r={10} fill="url(#markerGlow)" opacity={0.4} className="animate-pulse" />

                {/* Pulse ring */}
                <circle
                  r={6}
                  fill="none"
                  stroke="hsl(150 100% 50%)"
                  strokeWidth={1}
                  opacity={0.8}
                  className="animate-ping"
                  style={{ animationDuration: '3s' }}
                />

                {/* Core dot */}
                <circle
                  r={4}
                  fill="hsl(150 100% 50%)"
                  stroke="#fff"
                  strokeWidth={1.5}
                  className="drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                />

                {/* SVG Tooltip */}
                {hoveredMarker?.id === marker.id && (
                  <g transform="translate(0, -15)">
                    {/* Tooltip Background */}
                    <rect
                      x="-60"
                      y="-45"
                      width="120"
                      height="40"
                      rx="8"
                      fill="rgba(3, 7, 18, 0.95)"
                      stroke="rgba(34, 197, 94, 0.3)"
                      strokeWidth="1"
                      className="backdrop-blur-xl"
                    />
                    {/* Pointer/Arrow */}
                    <path
                      d="M -5 -5 L 0 0 L 5 -5"
                      fill="rgba(3, 7, 18, 0.95)"
                      stroke="rgba(34, 197, 94, 0.3)"
                      strokeWidth="1"
                    />
                    {/* Content */}

                    <text
                      y="-18"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {marker.currentCity}, {marker.currentCountry}
                    </text>
                  </g>
                )}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
        <defs>
          <radialGradient id="markerGlow">
            <stop offset="0%" stopColor="hsl(150 100% 50%)" />
            <stop offset="100%" stopColor="hsl(150 100% 50%)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </ComposableMap>

      {/* Marker count overlay */}
      <div className="absolute bottom-4 right-4 glass rounded-lg px-3 py-1.5 font-display text-xs text-muted-foreground">
        <span className="text-primary font-semibold">{markers.length}</span>{" "}
        Kogites tracked globally
      </div>
    </motion.div>
  );
};

export default WorldMap;
