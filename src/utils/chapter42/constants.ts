// Houston Chapter 42 Constants and Regulations
export const CHAPTER42_CONSTANTS = {
  // Minimum lot sizes (square feet)
  MIN_LOT_SIZE_URBAN: 3500,
  MIN_LOT_SIZE_SUBURBAN: 5000,
  MIN_LOT_SIZE_REDUCED: 1400,
  
  // Maximum density (units per acre)
  MAX_DENSITY_SINGLE_FAMILY: 27,
  MAX_DENSITY_MULTI_FAMILY: 30,
  
  // Setback requirements (feet)
  SETBACK_MAJOR_THOROUGHFARE: 25,
  SETBACK_COLLECTOR_STREET: 10,
  SETBACK_LOCAL_STREET_FRONT: 10,
  SETBACK_LOCAL_STREET_SIDE: 10,
  SETBACK_SHARED_DRIVEWAY: 3,
  
  // Parking requirements
  PARKING_SINGLE_FAMILY: 2,
  PARKING_MULTI_FAMILY: {
    efficiency: 1.25,
    one_bedroom: 1.333,
    two_bedroom: 1.666,
    three_plus_bedroom: 2.0
  },
  
  // Lot dimensions
  MIN_LOT_WIDTH: 15,
  MIN_AVG_LOT_WIDTH: 18,
  MAX_LOT_COVERAGE: 0.6,
  
  // Open space requirements
  MIN_PERMEABLE_AREA: 150,
  MIN_COMPENSATING_OPEN_SPACE: 240,
  OPEN_SPACE_DIMENSIONS: [20, 12],
  
  // Conversion factors
  SQ_FT_PER_ACRE: 43560,
  
  // Default values
  DEFAULT_LOT_SIZE_URBAN: 3500,
  DEFAULT_LOT_SIZE_SUBURBAN: 5000,
  DEFAULT_SITE_EFFICIENCY: 0.7, // 70% of land usable for lots
  
  // Street widths
  STREET_WIDTH_MAJOR: 60,
  STREET_WIDTH_COLLECTOR: 50,
  STREET_WIDTH_LOCAL: 40,
  STREET_WIDTH_SHARED: 20,
  
  // Building coverage
  MAX_BUILDING_COVERAGE: 0.65,
  MIN_REAR_SETBACK: 5,
  MIN_SIDE_SETBACK: 3
};

// Street type definitions
export enum StreetType {
  MAJOR_THOROUGHFARE = 'major_thoroughfare',
  COLLECTOR = 'collector',
  LOCAL = 'local',
  SHARED_DRIVEWAY = 'shared_driveway'
}

// Development type definitions
export enum DevelopmentType {
  SINGLE_FAMILY = 'single_family',
  MULTI_FAMILY = 'multi_family',
  TOWNHOME = 'townhome',
  MIXED_USE = 'mixed_use'
}

// Area type definitions
export enum AreaType {
  URBAN = 'urban',
  SUBURBAN = 'suburban'
}

// Get setback by street type
export function getSetbackByStreetType(streetType: StreetType): number {
  switch (streetType) {
    case StreetType.MAJOR_THOROUGHFARE:
      return CHAPTER42_CONSTANTS.SETBACK_MAJOR_THOROUGHFARE;
    case StreetType.COLLECTOR:
      return CHAPTER42_CONSTANTS.SETBACK_COLLECTOR_STREET;
    case StreetType.LOCAL:
      return CHAPTER42_CONSTANTS.SETBACK_LOCAL_STREET_FRONT;
    case StreetType.SHARED_DRIVEWAY:
      return CHAPTER42_CONSTANTS.SETBACK_SHARED_DRIVEWAY;
    default:
      return CHAPTER42_CONSTANTS.SETBACK_LOCAL_STREET_FRONT;
  }
}

// Get minimum lot size by area type
export function getMinLotSize(areaType: AreaType): number {
  return areaType === AreaType.URBAN 
    ? CHAPTER42_CONSTANTS.MIN_LOT_SIZE_URBAN 
    : CHAPTER42_CONSTANTS.MIN_LOT_SIZE_SUBURBAN;
}

// Get maximum density by development type
export function getMaxDensity(developmentType: DevelopmentType): number {
  return developmentType === DevelopmentType.MULTI_FAMILY 
    ? CHAPTER42_CONSTANTS.MAX_DENSITY_MULTI_FAMILY 
    : CHAPTER42_CONSTANTS.MAX_DENSITY_SINGLE_FAMILY;
}

// Calculate maximum units for given acreage
export function calculateMaxUnits(acres: number, developmentType: DevelopmentType): number {
  const maxDensity = getMaxDensity(developmentType);
  return Math.floor(acres * maxDensity);
}

// Validate lot size
export function validateLotSize(lotSize: number, areaType: AreaType): boolean {
  const minSize = getMinLotSize(areaType);
  return lotSize >= minSize;
}

// Calculate coverage percentage
export function calculateCoverage(buildingArea: number, lotArea: number): number {
  return (buildingArea / lotArea) * 100;
}