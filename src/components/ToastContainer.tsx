import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, ShoppingBag, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-[#586955]';
        if (toast.type === 'cart') {
          Icon = ShoppingBag;
          iconColor = 'text-[#C48B54]';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-[#24140E]';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#24140E] text-white p-4 rounded-2xl shadow-xl border border-[#423126] flex items-start gap-3 animate-fade-in"
          >
            <div className="p-1 rounded-full bg-white/10 shrink-0">
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6F0]">
                {toast.title}
              </h4>
              <p className="text-xs text-[#BDB2A7] mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8C7F73] hover:text-white p-1 rounded-md"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
