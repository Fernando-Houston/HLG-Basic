// Add this import at the top of ROICalculatorPage.tsx:
import { exportROIAnalysis, downloadFile } from '../../utils/api';

// Replace the Export PDF button (around line 464-467) with:
                <button
                  onClick={handleExportROI}
                  disabled={isExporting}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? 'Exporting...' : 'Export PDF'}
                </button>

// Add these fields to the setResults object in calculateROI function (around line 218):
      netProfit: grossProfit,
      totalCost: totalCosts,
      constructionCost: totalConstructionCosts,
      softCosts: totalSoftCosts,
      salesCosts: totalRealtorFees + totalClosingCosts + totalBuyerConcessions,
      profitPerUnit: grossProfit / unitsPlanned