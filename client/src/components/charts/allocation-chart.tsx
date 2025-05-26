export default function AllocationChart() {
  const allocations = [
    { name: "Stocks", value: 45, color: "hsl(207, 90%, 54%)" },
    { name: "Bonds", value: 25, color: "hsl(159, 84%, 39%)" },
    { name: "ETFs", value: 15, color: "hsl(43, 96%, 56%)" },
    { name: "Crypto", value: 10, color: "hsl(262, 83%, 58%)" },
    { name: "Cash", value: 5, color: "hsl(215, 16%, 47%)" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4">
      <div className="text-center space-y-4 w-full">
        <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Asset Allocation</h3>
          <p className="text-sm text-gray-600">Portfolio distribution breakdown</p>
        </div>
        <div className="space-y-2">
          {allocations.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
