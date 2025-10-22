import React from 'react';

export default function Card({ title, children, footer }) {
  return (
    <div className="rounded-lg border bg-white">
      {title && (
        <div className="px-4 py-3 border-b bg-slate-50">
          <h3 className="text-sm font-medium text-slate-700">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer && <div className="px-4 py-2 border-t bg-slate-50">{footer}</div>}
    </div>
  );
}

