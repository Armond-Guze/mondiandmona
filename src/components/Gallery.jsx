import { useCallback, useEffect, useRef, useState } from 'react';

// Local storage key
const LS_KEY = 'mondi_mona_gallery_v1';

// Utility to read file -> data URL
const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const DecorativeHearts = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,black,transparent)]">
  {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute text-pink-300/30 animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 24 + 12}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${10 + Math.random() * 10}s`
        }}
      >
        ❤
      </div>
    ))}
  </div>
);

const Gallery = () => {
  const [photos, setPhotos] = useState([]); // { id, dataUrl, note, addedAt }
  const [note, setNote] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setPhotos(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load gallery', e);
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(photos));
    } catch (e) {
      console.warn('Failed to save gallery', e);
    }
  }, [photos]);

  const addFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (!files.length) return;
    const mapped = await Promise.all(files.map(async (file) => ({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      dataUrl: await fileToDataUrl(file),
      name: file.name,
      note: note.trim(),
      addedAt: new Date().toISOString()
    })));
    setPhotos(p => [...mapped, ...p]);
    setNote('');
  }, [note]);

  const onInputChange = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  };

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const removePhoto = (id) => setPhotos(p => p.filter(ph => ph.id !== id));

  return (
    <section id="gallery" className="relative py-12 md:py-20 bg-gradient-to-b from-pink-100 via-pink-50 to-white">
      <DecorativeHearts />
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-pink-500 drop-shadow-sm">
            Our Memories
          </h2>
          <p className="mt-3 text-pink-600/80 font-medium">
            Add cute photos and tiny notes. Everything stays in this browser.
          </p>
        </div>

        <div
          onDragEnter={onDrag}
          onDragOver={onDrag}
          onDragLeave={onDrag}
          onDrop={onDrop}
          className={[
            'relative border-2 border-dashed rounded-2xl p-8 transition-all text-center',
            dragActive ? 'border-pink-400 bg-pink-100/70 shadow-lg' : 'border-pink-300 bg-white/70'
          ].join(' ')}
        >
          <input
            ref={inputRef}
            onChange={onInputChange}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
          />
          <div className="space-y-4">
            <p className="text-pink-600 font-medium">
              Drag & drop photos here or
              <button
                onClick={() => inputRef.current?.click()}
                className="ml-2 inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Browse
              </button>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <input
                type="text"
                placeholder="Optional little note (e.g. Beach day ❤)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="flex-1 rounded-full border border-pink-300/70 bg-white/80 px-5 py-2 text-pink-700 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                onClick={() => inputRef.current?.click()}
                className="rounded-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-6 py-2 font-semibold shadow-md active:scale-95 transition"
              >
                Add Photos
              </button>
            </div>
            <p className="text-xs text-pink-400">They never leave your browser (stored locally).</p>
          </div>
        </div>

        {/* Gallery grid */}
        <div className="mt-12 grid gap-6 sm:gap-7 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map(photo => (
            <figure
              key={photo.id}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition bg-pink-50/60 border border-pink-200/70 backdrop-blur-sm"
            >
              <img
                src={photo.dataUrl}
                alt={photo.note || photo.name}
                className="w-full h-40 sm:h-44 md:h-48 object-cover object-center transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="p-3">
                <div className="text-pink-700 text-sm font-semibold truncate">
                  {photo.note || 'Untitled memory'}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-pink-400 mt-0.5">
                  {new Date(photo.addedAt).toLocaleDateString()}
                </div>
              </figcaption>
              <button
                onClick={() => removePhoto(photo.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white/80 hover:bg-white text-pink-600 rounded-full p-1 shadow"
                aria-label="Remove photo"
              >
                ✕
              </button>
            </figure>
          ))}
        </div>
        {photos.length === 0 && (
          <p className="mt-12 text-center text-pink-400 font-medium animate-pulse">
            No memories yet — add your first! 💖
          </p>
        )}
      </div>
    </section>
  );
};

export default Gallery;

// Small floating animation
// Tailwind doesn't have this custom keyframe by default; we can inject via inline style tag in index.html if needed.