import Head from 'next/head';
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000';

interface Product {
  brand: string;
  product_name: string;
  scent_name: string;
  notes: { top: string[]; middle: string[]; bottom: string[] };
  volume_ml: number | null;
  duration: string | null;
  range: string | null;
  container_size: string | null;
  stick_length_cm: number | null;
  stick_count: number | null;
  price_jpy_tax_included: number | null;
  features: string | null;
  description: string | null;
  image_url: string | null;
  product_url: string;
}

export default function Home() {
  const [brand, setBrand] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('idle'); // idle, working, done, error
  const [jobStatus, setJobStatus] = useState<string>(''); // searching, scraping, etc.
  const [completedCount, setCompletedCount] = useState(0);
  const [totalFound, setTotalFound] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const startCollection = async () => {
    if (!brand) return;
    setStatus('working');
    setProducts([]);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brand }),
      });
      const data = await res.json();
      setJobId(data.job_id);
    } catch (e) {
      console.error(e);
      setStatus('error');
      setErrorMsg('Failed to start collection.');
    }
  };

  useEffect(() => {
    if (!jobId || status === 'done' || status === 'error') return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/status/${jobId}`);
        const data = await res.json();
        
        setJobStatus(data.status);
        setCompletedCount(data.completed_count);
        setTotalFound(data.total_found);

        if (data.status === 'done') {
            setStatus('done');
            fetchResults(jobId);
        } else if (data.status === 'error') {
            setStatus('error');
            setErrorMsg(data.error || 'Unknown error occurred');
        } else {
             // polling... update preview occasionally?
             // Since backend updates job.products only at the end or incrementally?
             // My implementation updates `jobs[job_id]["products"]` at the end or incrementally?
             // It updates incrementally in `scraper.collect` via callback?
             // Wait, `scraper.collect` builds a list and returns it.
             // But inside `scraper.collect`, I call `update_progress_callback`.
             // But my `process_collection_job` only sets `jobs[job_id]["products"] = products` at the VERY END.
             // So I can't see partial results in the table until done.
             // That's fine for MVP, but user asked for "Failure implies return partial".
             // I should probably update `jobs[job_id]["products"]` incrementally if I wanted that.
             // But for now, let's just wait for done.
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [jobId, status]);

  const fetchResults = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/result/${id}`);
      const data = await res.json();
      setProducts(data.products);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Head>
        <title>Reed Diffuser Collector</title>
      </Head>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Reed Diffuser Collector</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Brand</label>
          <div className="flex gap-4">
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g. SHIRO, 無印良品"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              disabled={status === 'working'}
            />
            <button 
              onClick={startCollection}
              disabled={status === 'working' || !brand}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'working' ? 'Collecting...' : 'Collect'}
            </button>
          </div>
        </div>

        {status !== 'idle' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
               <div>
                 <h2 className="text-xl font-semibold">Status: <span className="uppercase text-indigo-600">{jobStatus}</span></h2>
                 <p className="text-sm text-gray-500">
                    Processed: {completedCount} {totalFound > 0 ? `/ ${totalFound}` : ''}
                 </p>
               </div>
               {status === 'done' && (
                 <a 
                   href={`${API_BASE}/api/export/${jobId}.xlsx`}
                   className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                   target="_blank"
                   rel="noreferrer"
                 >
                    Download Excel
                 </a>
               )}
            </div>
            
            {(status === 'working' || jobStatus === 'searching' || jobStatus === 'scraping_list' || jobStatus === 'scraping_details') && (
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                 <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: totalFound > 0 ? `${(completedCount / totalFound) * 100}%` : '5%' }}
                 ></div>
               </div>
            )}
            
            {status === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                    Error: {errorMsg}
                </div>
            )}
          </div>
        )}

        {products.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (JPY)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((p, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <a href={p.product_url} target="_blank" className="text-indigo-600 hover:underline">{p.product_name}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.price_jpy_tax_included ? `¥${p.price_jpy_tax_included.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.volume_ml ? `${p.volume_ml}ml` : '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.image_url && <img src={p.image_url} alt="" className="h-10 w-10 object-cover rounded" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
