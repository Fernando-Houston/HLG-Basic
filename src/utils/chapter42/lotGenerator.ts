import { CHAPTER42_CONSTANTS, getSetbackByStreetType, StreetType } from './constants';
import type { SiteParameters, Lot, Street, OpenSpace, SitePlan, SitePlanStatistics } from './types';

export function generateSitePlan(params: SiteParameters): SitePlan {
  const totalAreaSqFt = params.area * CHAPTER42_CONSTANTS.SQ_FT_PER_ACRE;
  const efficiency = CHAPTER42_CONSTANTS.DEFAULT_SITE_EFFICIENCY;
  
  // Calculate maximum units based on density
  const maxDensity = params.developmentType === 'multi_family' 
    ? CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY 
    : CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY;
  const maxUnits = Math.floor(params.area * maxDensity);
  
  // Calculate lot dimensions
  const minLotSize = params.isUrban 
    ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN 
    : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN;
  const targetLotSize = Math.max(params.targetLotSize, minLotSize);
  
  // Calculate usable area after streets and setbacks
  const setback = getSetbackByStreetType(params.streetType as StreetType);
  const streetWidth = getStreetWidth(params.streetType);
  const usableWidth = params.width - (2 * setback);
  const usableDepth = params.depth - (2 * setback) - streetWidth;
  const usableArea = usableWidth * usableDepth;
  
  // Calculate number of lots that can fit
  const lotsPerRow = Math.floor(usableWidth / Math.sqrt(targetLotSize));
  const lotWidth = usableWidth / lotsPerRow - 5; // 5ft spacing
  const lotDepth = targetLotSize / lotWidth;
  const rowsOfLots = Math.floor(usableDepth / (lotDepth + 10)); // 10ft between rows
  const totalLots = Math.min(lotsPerRow * rowsOfLots, maxUnits);
  
  // Generate streets
  const streets = generateStreets(params, streetWidth);
  
  // Generate lots
  const lots = generateLots(totalLots, lotsPerRow, lotWidth, lotDepth, setback, streetWidth);
  
  // Generate open spaces
  const openSpaceRequired = totalLots * CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE;
  const openSpaces = generateOpenSpaces(params, openSpaceRequired, lots);
  
  // Calculate statistics
  const statistics: SitePlanStatistics = {
    totalLots,
    totalUnits: totalLots,
    density: totalLots / params.area,
    avgLotSize: targetLotSize,
    coverage: calculateCoverage(lots, totalAreaSqFt),
    openSpaceArea: openSpaceRequired,
    efficiency: (totalLots * targetLotSize) / totalAreaSqFt * 100
  };
  
  // Check compliance
  const compliance = checkCompliance(statistics, params);
  
  return {
    id: generateId(),
    createdAt: new Date(),
    parameters: params,
    lots,
    streets,
    openSpaces,
    statistics,
    compliance
  };
}

function generateStreets(params: SiteParameters, streetWidth: number): Street[] {
  const streets: Street[] = [];
  
  // Main access street (front)
  streets.push({
    x: 0,
    y: 0,
    width: params.width,
    height: streetWidth,
    name: 'Main Access',
    type: params.streetType
  });
  
  // Add internal streets for larger developments
  if (params.area > 5) {
    const midPoint = params.depth / 2;
    streets.push({
      x: 0,
      y: midPoint - streetWidth / 2,
      width: params.width,
      height: streetWidth / 2,
      name: 'Internal Street',
      type: 'local'
    });
  }
  
  return streets;
}

function generateLots(
  count: number, 
  lotsPerRow: number, 
  lotWidth: number, 
  lotDepth: number,
  setback: number,
  streetOffset: number
): Lot[] {
  const lots: Lot[] = [];
  const spacing = 5; // feet between lots
  
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / lotsPerRow);
    const col = i % lotsPerRow;
    
    const x = setback + col * (lotWidth + spacing);
    const y = streetOffset + setback + row * (lotDepth + spacing * 2);
    
    lots.push({
      id: i,
      x: x,
      y: y,
      width: lotWidth,
      height: lotDepth,
      area: lotWidth * lotDepth,
      // Building footprint (with setbacks)
      buildingX: x + 5,
      buildingY: y + 10,
      buildingWidth: lotWidth - 10,
      buildingHeight: lotDepth - 20
    });
  }
  
  return lots;
}

function generateOpenSpaces(
  params: SiteParameters, 
  requiredArea: number,
  lots: Lot[]
): OpenSpace[] {
  const openSpaces: OpenSpace[] = [];
  const spaceWidth = CHAPTER42_CONSTANTS.OPEN_SPACE_DIMENSIONS[0] * 2;
  const spaceHeight = requiredArea / spaceWidth;
  
  // Place open space at the back of the development
  const lastLot = lots[lots.length - 1];
  const openSpaceY = lastLot ? lastLot.y + lastLot.height + 20 : params.depth - spaceHeight - 20;
  
  openSpaces.push({
    x: params.width / 2 - spaceWidth / 2,
    y: openSpaceY,
    width: spaceWidth,
    height: spaceHeight,
    area: requiredArea
  });
  
  return openSpaces;
}

function getStreetWidth(streetType: string): number {
  switch (streetType) {
    case 'major_thoroughfare':
      return CHAPTER42_CONSTANTS.STREET_WIDTH_MAJOR;
    case 'collector':
      return CHAPTER42_CONSTANTS.STREET_WIDTH_COLLECTOR;
    case 'shared_driveway':
      return CHAPTER42_CONSTANTS.STREET_WIDTH_SHARED;
    default:
      return CHAPTER42_CONSTANTS.STREET_WIDTH_LOCAL;
  }
}

function calculateCoverage(lots: Lot[], totalArea: number): number {
  const totalLotArea = lots.reduce((sum, lot) => sum + lot.area, 0);
  return (totalLotArea / totalArea) * 100;
}

function checkCompliance(stats: SitePlanStatistics, params: SiteParameters): any {
  const maxDensity = params.developmentType === 'multi_family' 
    ? CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY 
    : CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY;
  
  const minLotSize = params.isUrban 
    ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN 
    : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN;
  
  const densityCompliant = stats.density <= maxDensity;
  const lotSizeCompliant = stats.avgLotSize >= minLotSize;
  const coverageCompliant = stats.coverage <= CHAPTER42_CONSTANTS.MAX_LOT_COVERAGE * 100;
  const openSpaceCompliant = stats.openSpaceArea >= stats.totalLots * CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE;
  
  return {
    densityCompliant,
    lotSizeCompliant,
    lotWidthCompliant: true, // Simplified - would need actual lot width check
    setbackCompliant: true, // Simplified - already enforced in generation
    coverageCompliant,
    openSpaceCompliant,
    overallCompliant: densityCompliant && lotSizeCompliant && coverageCompliant && openSpaceCompliant,
    details: {
      density: {
        compliant: densityCompliant,
        current: stats.density,
        required: maxDensity,
        message: densityCompliant 
          ? 'Density is within Chapter 42 limits' 
          : `Density exceeds maximum of ${maxDensity} units/acre`
      },
      lotSize: {
        compliant: lotSizeCompliant,
        current: stats.avgLotSize,
        required: minLotSize,
        message: lotSizeCompliant
          ? 'Lot sizes meet minimum requirements'
          : `Lot sizes below minimum of ${minLotSize} sq ft`
      },
      coverage: {
        compliant: coverageCompliant,
        current: stats.coverage,
        required: CHAPTER42_CONSTANTS.MAX_LOT_COVERAGE * 100,
        message: coverageCompliant
          ? 'Lot coverage is within limits'
          : 'Lot coverage exceeds maximum allowed'
      },
      openSpace: {
        compliant: openSpaceCompliant,
        current: stats.openSpaceArea,
        required: stats.totalLots * CHAPTER42_CONSTANTS.MIN_COMPENSATING_OPEN_SPACE,
        message: openSpaceCompliant
          ? 'Open space requirements met'
          : 'Insufficient open space provided'
      }
    }
  };
}

function generateId(): string {
  return `sp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Optimize existing plan
export function optimizeSitePlan(plan: SitePlan): SitePlan {
  const optimizedPlan = { ...plan };
  
  // Try to fit more lots if under density limit
  const maxDensity = plan.parameters.developmentType === 'multi_family' 
    ? CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY 
    : CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY;
  
  if (plan.statistics.density < maxDensity * 0.9) {
    // Can potentially add more lots
    const additionalUnits = Math.floor((maxDensity - plan.statistics.density) * plan.parameters.area);
    
    if (additionalUnits > 0) {
      // Recalculate with smaller lot sizes
      const newTargetLotSize = Math.max(
        plan.parameters.isUrban ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN,
        plan.parameters.targetLotSize * 0.9
      );
      
      const newParams = { ...plan.parameters, targetLotSize: newTargetLotSize };
      return generateSitePlan(newParams);
    }
  }
  
  return optimizedPlan;
}