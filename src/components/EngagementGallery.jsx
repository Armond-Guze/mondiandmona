import { useCallback, useEffect, useRef, useState } from 'react';

// Local storage key specific to engagement pics
const LS_KEY = 'engagement_gallery_v1';

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

// OPTIONAL: quick client resize to reduce huge original sizes (returns same data if below max)
async function maybeResize(dataUrl, maxDim = 1800) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      if (Math.max(width, height) <= maxDim) return resolve(dataUrl);
      const scale = maxDim / Math.max(width, height);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

const EngagementGallery = () => {
  const [photos, setPhotos] = useState([]); // { id, dataUrl, name, addedAt }
  const [processing, setProcessing] = useState(false);
  const [resize, setResize] = useState(true);
  const [filterText, setFilterText] = useState('');
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setPhotos(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load engagement gallery', e);
    }
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(photos)); } catch { /* ignore persist errors */ }
  }, [photos]);

  const addFiles = useCallback(async (fileList) => {
    const imageFiles = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!imageFiles.length) return;
    setProcessing(true);
    try {
      const mapped = [];
      for (const file of imageFiles) {
        const rawUrl = await fileToDataUrl(file);
        const finalUrl = resize ? await maybeResize(rawUrl) : rawUrl;
        mapped.push({
          id: `${Date.now()}_${Math.random().toString(36).slice(2,9)}`,
          dataUrl: finalUrl,
          name: file.name,
          sizeKB: Math.round(file.size / 1024),
          addedAt: new Date().toISOString()
        });
      }
      setPhotos(p => [...mapped, ...p]);
    } finally {
      setProcessing(false);
    }
  }, [resize]);

  const handleStandardSelect = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleFolderSelect = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  // Drag & drop including folder traversal (Chrome / Edge) using webkit entries
  const traverseEntry = async (entry) => {
    if (entry.isFile) {
      return new Promise(resolve => {
        entry.file(f => resolve([f]));
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      return new Promise(resolve => {
        reader.readEntries(async (entries) => {
          const all = await Promise.all(entries.map(traverseEntry));
          resolve(all.flat());
        });
      });
    }
    return [];
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const items = e.dataTransfer.items;
    if (items && items.length) {
      const files = [];
      for (const item of items) {
        const entry = item.webkitGetAsEntry && item.webkitGetAsEntry();
    if (entry) {
      files.push(...await traverseEntry(entry));
        } else {
          const file = item.getAsFile && item.getAsFile();
          if (file) files.push(file);
        }
      }
      addFiles(files);
    } else if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };

  const removePhoto = (id) => setPhotos(p => p.filter(ph => ph.id !== id));
  const clearAll = () => { if (window.confirm('Remove all engagement pictures?')) setPhotos([]); };

  const filtered = photos.filter(p => !filterText || p.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <section id="engagement" className="relative py-16 md:py-24 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-script text-pink-600 drop-shadow-sm">Engagement Pics</h2>
            <p className="mt-2 text-pink-500 font-medium text-sm md:text-base">Bulk upload or drop an entire folder. Stored locally only.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-pink-500">
              <input id="resizeChk" type="checkbox" checked={resize} onChange={()=>setResize(r=>!r)} />
              <label htmlFor="resizeChk">Resize large images</label>
            </div>
            <button onClick={clearAll} className="text-xs rounded-full bg-pink-200 hover:bg-pink-300 text-pink-700 px-4 py-2 font-semibold shadow-sm">Clear All</button>
          </div>
        </div>

        <div
          onDragEnter={prevent}
          onDragOver={prevent}
          onDrop={handleDrop}
          className="relative border-2 border-dashed rounded-3xl p-8 md:p-10 text-center border-pink-300 bg-white/70 backdrop-blur-sm"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleStandardSelect}
            className="hidden"
          />
          <input
            ref={folderInputRef}
            type="file"
            // @ts-ignore - non standard attributes
            webkitdirectory=""
            multiple
            accept="image/*"
            onChange={handleFolderSelect}
            className="hidden"
          />
          <div className="space-y-5">
            <p className="text-pink-600 font-medium text-sm md:text-base">
              Drag & drop engagement photo folder here OR
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={()=>fileInputRef.current?.click()} className="rounded-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 font-semibold shadow active:scale-95">Select Images</button>
              <button onClick={()=>folderInputRef.current?.click()} className="rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white px-6 py-2 font-semibold shadow active:scale-95">Select Folder</button>
              {processing && <span className="text-xs text-pink-500 animate-pulse">Processing...</span>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="text"
                placeholder="Filter by filename..."
                value={filterText}
                onChange={(e)=>setFilterText(e.target.value)}
                className="w-full max-w-xs rounded-full border border-pink-300 bg-white/80 px-5 py-2 text-pink-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <div className="text-[10px] uppercase tracking-wide text-pink-400 font-semibold">
                {photos.length} stored
              </div>
            </div>
            <p className="text-[11px] text-pink-400">Tip: Folder select works best in Chrome / Edge desktop.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map(ph => (
            <figure key={ph.id} className="group relative rounded-xl overflow-hidden bg-pink-50/70 border border-pink-200 shadow-sm hover:shadow-lg transition">
              <img src={ph.dataUrl} alt={ph.name} className="w-full h-40 md:h-48 object-cover object-center transition group-hover:scale-[1.04]" loading="lazy" />
              <figcaption className="p-2">
                <div className="text-[11px] font-medium text-pink-700 truncate" title={ph.name}>{ph.name}</div>
                <div className="flex justify-between items-center mt-0.5 text-[9px] text-pink-400">
                  <span>{new Date(ph.addedAt).toLocaleDateString()}</span>
                  <span>{ph.sizeKB}kb</span>
                </div>
              </figcaption>
              <button
                onClick={()=>removePhoto(ph.id)}
                className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center text-xs rounded-full bg-white/80 hover:bg-white text-pink-600 shadow opacity-0 group-hover:opacity-100 transition"
                aria-label="Remove"
              >✕</button>
            </figure>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-pink-400 font-medium">No engagement pictures yet — add the folder!</p>
        )}
      </div>
    </section>
  );
};

export default EngagementGallery;