import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { SitePlan, Lot } from '../../utils/chapter42/types';

interface SitePlanVisualizationProps {
  plan: SitePlan | null;
  width?: number;
  height?: number;
}

export function SitePlanVisualization({ plan, width = 800, height = 600 }: SitePlanVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!plan || !svgRef.current) return;
    renderSitePlan();
  }, [plan, zoomLevel, panX, panY]);

  const renderSitePlan = () => {
    if (!svgRef.current || !plan) return;

    // Clear previous content
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    // Create SVG elements
    const svg = svgRef.current;
    
    // Add definitions for patterns and filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Grid pattern
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'grid');
    pattern.setAttribute('width', '20');
    pattern.setAttribute('height', '20');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 20 0 L 0 0 0 20');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#e5e7eb');
    path.setAttribute('stroke-width', '1');
    pattern.appendChild(path);
    
    // Shadow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'shadow');
    const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
    shadow.setAttribute('dx', '2');
    shadow.setAttribute('dy', '2');
    shadow.setAttribute('stdDeviation', '3');
    shadow.setAttribute('flood-opacity', '0.3');
    filter.appendChild(shadow);
    
    defs.appendChild(pattern);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Create main group for transformations
    const mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    mainGroup.setAttribute('transform', `translate(${panX}, ${panY}) scale(${zoomLevel})`);

    // Background grid
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', width.toString());
    bg.setAttribute('height', height.toString());
    bg.setAttribute('fill', 'url(#grid)');
    mainGroup.appendChild(bg);

    // Draw site boundary
    const boundary = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    boundary.setAttribute('x', '40');
    boundary.setAttribute('y', '40');
    boundary.setAttribute('width', (width - 80).toString());
    boundary.setAttribute('height', (height - 80).toString());
    boundary.setAttribute('fill', 'none');
    boundary.setAttribute('stroke', '#374151');
    boundary.setAttribute('stroke-width', '2');
    boundary.setAttribute('stroke-dasharray', '5,5');
    mainGroup.appendChild(boundary);

    // Draw streets
    plan.streets.forEach((street) => {
      const streetRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      streetRect.setAttribute('x', street.x.toString());
      streetRect.setAttribute('y', street.y.toString());
      streetRect.setAttribute('width', street.width.toString());
      streetRect.setAttribute('height', street.height.toString());
      streetRect.setAttribute('fill', '#9ca3af');
      streetRect.setAttribute('rx', '2');
      mainGroup.appendChild(streetRect);

      // Street label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', (street.x + street.width / 2).toString());
      label.setAttribute('y', (street.y + street.height / 2).toString());
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('fill', 'white');
      label.setAttribute('font-size', '12');
      label.setAttribute('font-weight', 'bold');
      label.textContent = street.name || 'Street';
      mainGroup.appendChild(label);
    });

    // Draw open spaces
    plan.openSpaces.forEach((space, index) => {
      const openSpace = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      openSpace.setAttribute('x', space.x.toString());
      openSpace.setAttribute('y', space.y.toString());
      openSpace.setAttribute('width', space.width.toString());
      openSpace.setAttribute('height', space.height.toString());
      openSpace.setAttribute('fill', '#86efac');
      openSpace.setAttribute('opacity', '0.6');
      openSpace.setAttribute('rx', '4');
      mainGroup.appendChild(openSpace);

      // Open space label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', (space.x + space.width / 2).toString());
      label.setAttribute('y', (space.y + space.height / 2).toString());
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('fill', '#166534');
      label.setAttribute('font-size', '10');
      label.textContent = `Open Space ${index + 1}`;
      mainGroup.appendChild(label);
    });

    // Draw lots
    plan.lots.forEach((lot) => {
      const lotGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // Lot boundary
      const lotRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      lotRect.setAttribute('x', lot.x.toString());
      lotRect.setAttribute('y', lot.y.toString());
      lotRect.setAttribute('width', lot.width.toString());
      lotRect.setAttribute('height', lot.height.toString());
      lotRect.setAttribute('fill', '#e0e7ff');
      lotRect.setAttribute('stroke', '#6366f1');
      lotRect.setAttribute('stroke-width', '1.5');
      lotRect.setAttribute('rx', '2');
      lotRect.setAttribute('filter', 'url(#shadow)');
      lotGroup.appendChild(lotRect);

      // Building footprint
      const buildingPadding = 10;
      const building = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      building.setAttribute('x', (lot.x + buildingPadding).toString());
      building.setAttribute('y', (lot.y + buildingPadding).toString());
      building.setAttribute('width', (lot.width - 2 * buildingPadding).toString());
      building.setAttribute('height', (lot.height - 2 * buildingPadding).toString());
      building.setAttribute('fill', '#4f46e5');
      building.setAttribute('opacity', '0.8');
      building.setAttribute('rx', '2');
      lotGroup.appendChild(building);

      // Lot number
      const lotNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lotNumber.setAttribute('x', (lot.x + lot.width / 2).toString());
      lotNumber.setAttribute('y', (lot.y + lot.height / 2).toString());
      lotNumber.setAttribute('text-anchor', 'middle');
      lotNumber.setAttribute('dominant-baseline', 'middle');
      lotNumber.setAttribute('fill', 'white');
      lotNumber.setAttribute('font-size', '12');
      lotNumber.setAttribute('font-weight', 'bold');
      lotNumber.textContent = `Lot ${lot.id + 1}`;
      lotGroup.appendChild(lotNumber);

      // Lot size
      const lotSize = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lotSize.setAttribute('x', (lot.x + lot.width / 2).toString());
      lotSize.setAttribute('y', (lot.y + lot.height / 2 + 14).toString());
      lotSize.setAttribute('text-anchor', 'middle');
      lotSize.setAttribute('dominant-baseline', 'middle');
      lotSize.setAttribute('fill', 'white');
      lotSize.setAttribute('font-size', '9');
      lotSize.textContent = `${Math.round(lot.area)} sq ft`;
      lotGroup.appendChild(lotSize);

      mainGroup.appendChild(lotGroup);
    });

    // Add scale indicator
    const scaleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    scaleGroup.setAttribute('transform', `translate(${width - 150}, ${height - 40})`);
    
    const scaleLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    scaleLine.setAttribute('x1', '0');
    scaleLine.setAttribute('y1', '0');
    scaleLine.setAttribute('x2', '100');
    scaleLine.setAttribute('y2', '0');
    scaleLine.setAttribute('stroke', '#374151');
    scaleLine.setAttribute('stroke-width', '2');
    scaleGroup.appendChild(scaleLine);
    
    const scaleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    scaleText.setAttribute('x', '50');
    scaleText.setAttribute('y', '-5');
    scaleText.setAttribute('text-anchor', 'middle');
    scaleText.setAttribute('fill', '#374151');
    scaleText.setAttribute('font-size', '12');
    scaleText.textContent = '40 ft';
    scaleGroup.appendChild(scaleText);
    
    mainGroup.appendChild(scaleGroup);
    svg.appendChild(mainGroup);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanX(0);
    setPanY(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanX(e.clientX - startPan.x);
    setPanY(e.clientY - startPan.y);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-inner">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Zoom In"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Zoom Out"
        >
          <ZoomOut className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          title="Reset View"
        >
          <Maximize2 className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* SVG Container */}
      <div className="overflow-hidden rounded-lg" style={{ cursor: isPanning ? 'grabbing' : 'grab' }}>
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ background: '#f9fafb' }}
        >
          {!plan && (
            <>
              <text
                x={width / 2}
                y={height / 2 - 20}
                textAnchor="middle"
                className="fill-gray-400 text-lg"
              >
                Click "Analyze Compliance" to generate site plan
              </text>
              <text
                x={width / 2}
                y={height / 2 + 10}
                textAnchor="middle"
                className="fill-gray-400 text-sm"
              >
                Enter your site parameters and see a visual layout
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      {plan && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-xs font-semibold text-gray-700 mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#e0e7ff] border border-[#6366f1] rounded-sm"></div>
              <span className="text-xs text-gray-600">Property Lots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#4f46e5] rounded-sm"></div>
              <span className="text-xs text-gray-600">Buildings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#9ca3af] rounded-sm"></div>
              <span className="text-xs text-gray-600">Streets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#86efac] rounded-sm"></div>
              <span className="text-xs text-gray-600">Open Space</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}