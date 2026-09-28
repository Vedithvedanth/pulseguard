import Papa from 'papaparse';

export interface CSVParseResult<T = any> {
  success: boolean;
  category: 'sales' | 'inventory' | 'complaints' | 'deliveries' | 'suppliers' | 'unknown';
  rowCount: number;
  data: T[];
  missingColumns?: string[];
  detectedColumns: string[];
  warnings?: string[];
  error?: string;
}

const REQUIRED_SCHEMAS: Record<string, string[]> = {
  sales: ['date', 'product', 'quantity', 'revenue'],
  inventory: ['date', 'product', 'stock_level'],
  complaints: ['date', 'category', 'text', 'rating'],
  deliveries: ['date', 'supplier', 'expected_date', 'actual_date'],
  suppliers: ['supplier', 'delivery_time', 'reliability'],
};

export function detectCategory(headers: string[]): 'sales' | 'inventory' | 'complaints' | 'deliveries' | 'suppliers' | 'unknown' {
  const norm = headers.map(h => h.toLowerCase().trim().replace(/[\s_-]+/g, '_'));

  if (norm.includes('revenue') || norm.includes('quantity') && norm.includes('product')) return 'sales';
  if (norm.includes('stock_level') || norm.includes('stock') || norm.includes('reorder_point')) return 'inventory';
  if (norm.includes('rating') || norm.includes('complaint') || (norm.includes('text') && norm.includes('category'))) return 'complaints';
  if (norm.includes('expected_date') || norm.includes('actual_date')) return 'deliveries';
  if (norm.includes('reliability') || (norm.includes('supplier') && norm.includes('delivery_time'))) return 'suppliers';

  return 'unknown';
}

export function parseBusinessCSV(fileContent: string, explicitCategory?: string): Promise<CSVParseResult> {
  return new Promise((resolve) => {
    try {
      Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: 'greedy',
        complete: (results) => {
          if (!results.data || results.data.length === 0) {
            return resolve({
              success: false,
              category: 'unknown',
              rowCount: 0,
              data: [],
              detectedColumns: [],
              error: 'The uploaded CSV file is empty or formatted incorrectly.',
            });
          }

          const detectedColumns = results.meta.fields ? results.meta.fields.map(f => f.trim()) : [];
          const normalizedCols = detectedColumns.map(f => f.toLowerCase().replace(/[\s_-]+/g, '_'));

          const detectedCat = (explicitCategory as any) || detectCategory(detectedColumns);

          if (detectedCat === 'unknown') {
            return resolve({
              success: false,
              category: 'unknown',
              rowCount: results.data.length,
              data: results.data,
              detectedColumns,
              error: 'Could not auto-match columns to Sales, Inventory, Complaints, Deliveries, or Suppliers. Please check column headers.',
            });
          }

          const required = REQUIRED_SCHEMAS[detectedCat] || [];
          const missing: string[] = [];

          for (const reqCol of required) {
            const hasMatch = normalizedCols.some(col => col.includes(reqCol) || reqCol.includes(col));
            if (!hasMatch) {
              missing.push(reqCol);
            }
          }

          if (missing.length > 0) {
            return resolve({
              success: false,
              category: detectedCat,
              rowCount: results.data.length,
              data: results.data,
              missingColumns: missing,
              detectedColumns,
              error: `Some columns are missing for ${detectedCat.toUpperCase()} dataset: [${missing.join(', ')}]. Please provide these columns to ensure reliable analysis.`,
            });
          }

          // Check if data is sufficient
          const warnings: string[] = [];
          if (results.data.length < 5) {
            warnings.push('Insufficient historical records (< 5 rows) for reliable statistical trend analysis. Predictions may have higher variance.');
          }

          resolve({
            success: true,
            category: detectedCat,
            rowCount: results.data.length,
            data: results.data,
            detectedColumns,
            warnings: warnings.length > 0 ? warnings : undefined,
          });
        },
        error: (err: any) => {
          resolve({
            success: false,
            category: 'unknown',
            rowCount: 0,
            data: [],
            detectedColumns: [],
            error: `CSV Parsing error: ${err.message}`,
          });
        },
      });
    } catch (e: any) {
      resolve({
        success: false,
        category: 'unknown',
        rowCount: 0,
        data: [],
        detectedColumns: [],
        error: `Unexpected file read failure: ${e.message}`,
      });
    }
  });
}
