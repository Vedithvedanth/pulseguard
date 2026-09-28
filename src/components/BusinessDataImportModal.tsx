import React, { useState } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  Database,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { usePulseGuard } from '../context/PulseGuardContext';
import { parseBusinessCSV, CSVParseResult } from '../engine/csvParser';
import { SAMPLE_CSV_DATA } from '../data/heritageBitesDemo';

export const BusinessDataImportModal: React.FC = () => {
  const { activeModal, closeModal, importCustomData } = usePulseGuard();
  const [selectedCategory, setSelectedCategory] = useState<'sales' | 'inventory' | 'complaints' | 'deliveries' | 'suppliers'>('sales');
  const [fileContent, setFileContent] = useState<string>('');
  const [parseResult, setParseResult] = useState<CSVParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (activeModal !== 'import-csv') return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 5MB max
    if (file.size > 5 * 1024 * 1024) {
      setParseResult({
        success: false,
        category: 'unknown',
        rowCount: 0,
        data: [],
        detectedColumns: [],
        error: 'File size exceeds 5MB limit. Please upload a smaller CSV file.',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      setFileContent(text);
      setIsProcessing(true);
      const res = await parseBusinessCSV(text, selectedCategory);
      setParseResult(res);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const loadSampleTemplate = async (cat: keyof typeof SAMPLE_CSV_DATA) => {
    const sample = SAMPLE_CSV_DATA[cat];
    setFileContent(sample);
    setSelectedCategory(cat as any);
    setIsProcessing(true);
    const res = await parseBusinessCSV(sample, cat);
    setParseResult(res);
    setIsProcessing(false);
  };

  const handleApplyData = () => {
    if (parseResult && parseResult.success) {
      importCustomData(parseResult.category, parseResult.rowCount);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl p-6 sm:p-7 relative my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-slate-400">Business Telemetry Ingestion</div>
              <h3 className="text-xl font-bold text-white tracking-tight">Import SME Data (CSV)</h3>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-300 block mb-2">Select Dataset Stream:</label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            {[
              { id: 'sales', label: 'Sales CSV' },
              { id: 'inventory', label: 'Inventory CSV' },
              { id: 'complaints', label: 'Complaints CSV' },
              { id: 'deliveries', label: 'Deliveries CSV' },
              { id: 'suppliers', label: 'Suppliers CSV' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id as any);
                  loadSampleTemplate(tab.id as any);
                }}
                className={`py-2 px-2.5 rounded-lg border text-center transition cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/60 rounded-xl p-6 text-center mb-5 transition relative">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <div className="text-sm font-semibold text-white mb-1">
            Click to upload or drag & drop {selectedCategory.toUpperCase()} CSV
          </div>
          <div className="text-xs text-slate-400">
            Supports automatic column header matching • Max file size: 5MB
          </div>
        </div>

        {/* Quick Load Sample Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 p-3 rounded-lg bg-slate-950 border border-slate-850 text-xs">
          <span className="text-slate-400 font-medium">Or test with verified sample template:</span>
          <button
            onClick={() => loadSampleTemplate(selectedCategory)}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Load Sample {selectedCategory.toUpperCase()} Data</span>
          </button>
        </div>

        {/* Validation / Result Box (Requirements 16 & 34) */}
        {parseResult && (
          <div
            className={`p-4 rounded-xl border mb-5 text-xs ${
              parseResult.success
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/30 border-red-500/40 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1.5">
              {parseResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400" />
              )}
              <span>
                {parseResult.success
                  ? `Valid ${parseResult.category.toUpperCase()} Dataset Ingested (${parseResult.rowCount} rows)`
                  : 'CSV Ingestion Incomplete'}
              </span>
            </div>

            {parseResult.error && (
              <p className="text-red-300 mb-2">{parseResult.error}</p>
            )}

            {parseResult.missingColumns && parseResult.missingColumns.length > 0 && (
              <div className="text-red-300 bg-red-950/50 p-2.5 rounded-lg border border-red-500/30 mb-2">
                <strong>Required columns missing:</strong> [{parseResult.missingColumns.join(', ')}].
                <br />
                Please ensure column headers include these fields.
              </div>
            )}

            {parseResult.warnings && (
              <div className="text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-500/30 mb-2">
                {parseResult.warnings.join(' • ')}
              </div>
            )}

            {parseResult.success && (
              <div className="text-slate-300">
                Detected columns: <span className="font-mono text-white">[{parseResult.detectedColumns.join(', ')}]</span>.
                Ready for statistical anomaly detection and risk engine analysis.
              </div>
            )}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={closeModal}
            className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={!parseResult?.success}
            onClick={handleApplyData}
            className={`flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-lg transition cursor-pointer ${
              parseResult?.success
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Analyze Dataset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
