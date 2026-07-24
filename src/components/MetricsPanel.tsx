"use client";

import { TokenMetrics } from "@/types/chat";

interface MetricsPanelProps {
  metrics: TokenMetrics | null;
  isOpen: boolean;
  onToggle: () => void;
}

export default function MetricsPanel({ metrics, isOpen, onToggle }: MetricsPanelProps) {
  return (
    <>
      {/* Botón para abrir/cerrar el panel en mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-20 right-4 z-10 bg-gray-800 text-white 
                   p-3 rounded-full shadow-lg border border-gray-700"
        title="Métricas"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Panel de métricas */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:static right-0 top-0 h-full 
        w-72 bg-gray-900 border-l border-gray-700 p-6 
        transition-transform duration-300 ease-in-out z-20 overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Métricas</h2>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {metrics && metrics.messageCount > 0 ? (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Tokens de entrada</p>
              <p className="text-2xl font-bold text-blue-400">{metrics.promptTokens}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Tokens de salida</p>
              <p className="text-2xl font-bold text-green-400">{metrics.completionTokens}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Total de tokens</p>
              <p className="text-2xl font-bold text-purple-400">{metrics.totalTokens}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Último tiempo de respuesta</p>
              <p className="text-2xl font-bold text-yellow-400">
                {(metrics.responseTime / 1000).toFixed(2)}s
              </p>
            </div>

            {/* Métricas adicionales */}
            <div className="border-t border-gray-700 pt-4 space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Tiempo promedio de respuesta</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {(metrics.avgResponseTime / 1000).toFixed(2)}s
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-1">Interacciones totales</p>
                <p className="text-2xl font-bold text-pink-400">{metrics.messageCount}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p>No hay métricas disponibles</p>
            <p className="text-sm mt-2">Envía un mensaje para ver las estadísticas</p>
          </div>
        )}
      </div>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={onToggle}
        />
      )}
    </>
  );
}