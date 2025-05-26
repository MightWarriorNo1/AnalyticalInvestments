export default function PortfolioChart() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Portfolio Performance</h3>
          <p className="text-sm text-gray-600">Advanced charts available with full platform setup</p>
          <div className="mt-3 text-xs text-gray-500">
            Current Value: <span className="font-medium text-green-600">$47,832</span> (+12.8%)
          </div>
        </div>
      </div>
    </div>
  );
}
