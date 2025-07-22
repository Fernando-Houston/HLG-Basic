// Chapter 42 Type Definitions

export interface SiteParameters {
  area: number; // acres
  width: number; // feet
  depth: number; // feet
  isUrban: boolean;
  streetType: string;
  developmentType: string;
  targetLotSize: number; // square feet
}

export interface Lot {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
  buildingX?: number;
  buildingY?: number;
  buildingWidth?: number;
  buildingHeight?: number;
}

export interface Street {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
  type?: string;
}

export interface OpenSpace {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
}

export interface SitePlanStatistics {
  totalLots: number;
  totalUnits: number;
  density: number; // units per acre
  avgLotSize: number;
  coverage: number; // percentage
  openSpaceArea: number;
  efficiency: number; // percentage of land used for lots
}

export interface ComplianceResult {
  densityCompliant: boolean;
  lotSizeCompliant: boolean;
  lotWidthCompliant: boolean;
  setbackCompliant: boolean;
  coverageCompliant: boolean;
  openSpaceCompliant: boolean;
  overallCompliant: boolean;
  details: {
    [key: string]: {
      compliant: boolean;
      current: number;
      required: number;
      message: string;
    };
  };
}

export interface OptimizationResult {
  recommendedUnits: number;
  recommendedDensity: number;
  recommendedLotSize: number;
  recommendedLayout: string;
  potentialRevenue?: number;
  improvementSuggestions: string[];
}

export interface SitePlan {
  id: string;
  createdAt: Date;
  parameters: SiteParameters;
  lots: Lot[];
  streets: Street[];
  openSpaces: OpenSpace[];
  statistics: SitePlanStatistics;
  compliance: ComplianceResult;
  optimization?: OptimizationResult;
}

export interface Chapter42Analysis {
  inputs: {
    landArea: number;
    proposedUnits: number;
    lotWidth: number;
    setbackMajor: number;
    setbackLocal: number;
    lotSize: number;
    developmentType: string;
    siteWidth?: number;
    siteDepth?: number;
    streetType?: string;
    isUrban?: boolean;
  };
  compliance: {
    density: {
      compliant: boolean;
      proposed: number;
      maximum: number;
      maxUnits: number;
    };
    lotWidth: {
      compliant: boolean;
      proposed: number;
      minimum: number;
    };
    setbacks: {
      major: {
        compliant: boolean;
        proposed: number;
        minimum: number;
      };
      local: {
        compliant: boolean;
        proposed: number;
        minimum: number;
      };
    };
    lotSize: {
      compliant: boolean;
      proposed: number;
      minimum: number;
    };
  };
  optimization: {
    recommendedUnits: number;
    recommendedDensity: number;
    recommendedLotSize: number;
    totalSqFt: number;
  };
  overallCompliant: boolean;
  sitePlan?: SitePlan;
}

export interface ExportData {
  projectName: string;
  date: string;
  analysis: Chapter42Analysis;
  sitePlan?: SitePlan;
  notes?: string;
}