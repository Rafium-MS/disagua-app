// app/frontend/src/components/ui/ResponsiveTable.jsx
export default function ResponsiveTable({ columns, data }) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          {/* ... */}
        </table>
      </div>
      
      {/* Mobile - Cards */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between py-2 border-b last:border-0">
                <span className="font-medium text-slate-600">{col.label}:</span>
                <span className="text-slate-900">{item[col.key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}