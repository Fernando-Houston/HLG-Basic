import { useState } from 'react';
import { Calculator } from 'lucide-react';

export function QuickCalculator() {
  const [area, setArea] = useState('');
  const [result, setResult] = useState<{ units: number; acres: number } | null>(null);

  const calculate = () => {
    const areaValue = parseFloat(area);
    if (!areaValue || areaValue <= 0) {
      setResult(null);
      return;
    }

    const acres = areaValue / 43560;
    const maxUnits = Math.floor(acres * 27); // Chapter 42 max density

    setResult({ units: maxUnits, acres });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculate();
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Calculator className="h-5 w-5 mr-2 text-green-600" />
        Quick Density Calculator
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate maximum units for your site using Chapter 42 formula
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site Area (Square Feet)
          </label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-600"
            placeholder="e.g., 108,900"
            min="1"
          />
        </div>
        
        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Calculate
        </button>
        
        {result && (
          <div className="bg-white rounded-lg p-4 border border-green-300">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {result.units} Maximum Units
              </div>
              <div className="text-sm text-gray-600">
                {result.acres.toFixed(3)} acres × 27 units/acre
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-3 text-center">
              Formula: (Square Feet ÷ 43,560) × 27 units/acre
            </div>
          </div>
        )}
      </div>
    </div>
  );
}