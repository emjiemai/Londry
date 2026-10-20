// Londry map style: a quiet, light, neutral map so the red pin is the only loud thing on it.
// Data: OpenFreeMap vector tiles (OpenMapTiles schema, OpenStreetMap data). Street names are drawn by hand in render.mjs
// (in the site's own font and spelling), so this style has no text layers.
export const TOKENS = {
  land: '#F3F3F4',
  landuse: '#EEEEF0',
  landuseSoft: '#F0F0F2',
  park: '#E3EBE0',
  grass: '#E9EFE6',
  water: '#D7E3EC',
  building: '#E3E3E8',
  buildingEdge: '#D4D4DA',
  casingMajor: '#D2D2D9',
  casingMinor: '#E0E0E5',
  road: '#FFFFFF',
  path: '#D9D9DE',
  red: '#E32A30',
}

const zoomWidth = (z14, z16, z18) => ['interpolate', ['exponential', 1.6], ['zoom'], 14, z14, 16, z16, 18, z18]
const inClass = (list) => ['in', ['get', 'class'], ['literal', list]]
const notTunnel = ['!=', ['get', 'brunnel'], 'tunnel']

function roadLayers() {
  const groups = [
    { key: 'minor', classes: ['minor', 'service', 'track'], casing: TOKENS.casingMinor, w: [1.6, 5.2, 13], cw: [2.8, 7, 16] },
    { key: 'tertiary', classes: ['tertiary'], casing: TOKENS.casingMinor, w: [2.4, 7, 17], cw: [3.6, 8.8, 20] },
    { key: 'secondary', classes: ['secondary'], casing: TOKENS.casingMajor, w: [3, 8.5, 20], cw: [4.4, 10.5, 23] },
    { key: 'primary', classes: ['primary', 'trunk', 'motorway'], casing: TOKENS.casingMajor, w: [3.6, 10, 23], cw: [5, 12.2, 27] },
  ]
  const layers = []
  for (const g of groups) {
    layers.push({
      id: `road-casing-${g.key}`,
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      filter: ['all', inClass(g.classes), notTunnel],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': g.casing, 'line-width': zoomWidth(...g.cw) },
    })
  }
  for (const g of groups) {
    layers.push({
      id: `road-fill-${g.key}`,
      type: 'line',
      source: 'omt',
      'source-layer': 'transportation',
      filter: ['all', inClass(g.classes), notTunnel],
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': TOKENS.road, 'line-width': zoomWidth(...g.w) },
    })
  }
  return layers
}

export function buildStyle() {
  return {
    version: 8,
    sources: { omt: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' } },
    layers: [
      { id: 'background', type: 'background', paint: { 'background-color': TOKENS.land } },
      {
        id: 'landcover-grass',
        type: 'fill',
        source: 'omt',
        'source-layer': 'landcover',
        filter: inClass(['grass', 'wood', 'farmland']),
        paint: { 'fill-color': TOKENS.grass },
      },
      {
        id: 'landuse-soft',
        type: 'fill',
        source: 'omt',
        'source-layer': 'landuse',
        filter: inClass(['residential', 'suburb', 'neighbourhood']),
        paint: { 'fill-color': TOKENS.landuseSoft },
      },
      {
        id: 'landuse-institution',
        type: 'fill',
        source: 'omt',
        'source-layer': 'landuse',
        filter: inClass(['school', 'university', 'college', 'hospital', 'kindergarten', 'stadium', 'pitch', 'playground', 'commercial', 'retail', 'industrial']),
        paint: { 'fill-color': TOKENS.landuse },
      },
      { id: 'park', type: 'fill', source: 'omt', 'source-layer': 'park', paint: { 'fill-color': TOKENS.park } },
      { id: 'water', type: 'fill', source: 'omt', 'source-layer': 'water', paint: { 'fill-color': TOKENS.water } },
      {
        id: 'waterway',
        type: 'line',
        source: 'omt',
        'source-layer': 'waterway',
        paint: { 'line-color': TOKENS.water, 'line-width': zoomWidth(1, 3, 8) },
      },
      {
        id: 'path',
        type: 'line',
        source: 'omt',
        'source-layer': 'transportation',
        filter: inClass(['path', 'pedestrian']),
        paint: { 'line-color': TOKENS.path, 'line-width': zoomWidth(0.5, 1, 2), 'line-dasharray': [2, 2] },
      },
      ...roadLayers(),
      {
        id: 'building',
        type: 'fill',
        source: 'omt',
        'source-layer': 'building',
        paint: { 'fill-color': TOKENS.building, 'fill-outline-color': TOKENS.buildingEdge },
      },
    ],
  }
}
