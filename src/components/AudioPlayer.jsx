import { useRef, useState, useEffect } from 'react';

// Track metadata (you must provide the actual MP3 file yourself in /public)
// IMPORTANT: Ensure you have the legal right (license/personal permission) to host and play this audio if the site is public.
// Build correct path even when site served from /mondiandmona/ on GitHub Pages
const TRACK = {
  title: 'Follow You',
  artist: 'Noizy',
  file: `${import.meta.env.BASE_URL}follow-you-noizy.mp3` // Place file in public/follow-you-noizy.mp3
};

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState(null);
  const [showVol, setShowVol] = useState(false);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  const togglePlay = () => {
    const el = audioRef.current; if (!el) return; playing ? el.pause() : el.play(); };
  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  const onError = () => setError('Add /public/follow-you-noizy.mp3');
  const handleVolume = (e) => setVolume(parseFloat(e.target.value));

  return (
    <div
      className="group fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur border border-pink-200 rounded-full shadow-md pl-2 pr-3 py-1.5 flex items-center gap-2 w-fit max-w-[240px]"
      onMouseEnter={() => setShowVol(true)}
      onMouseLeave={() => setShowVol(false)}
    >
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-500 text-white text-sm shadow active:scale-95 transition"
        aria-label={playing ? 'Pause track' : 'Play track'}
      >
        {playing ? '❚❚' : '►'}
      </button>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] font-semibold text-pink-600 leading-tight truncate" title={`${TRACK.title} – ${TRACK.artist}`}>{TRACK.title}</span>
        <span className="text-[9px] text-pink-400 truncate">{TRACK.artist}</span>
      </div>
      {!error && (
        <div className={`relative h-6 flex items-center transition-all duration-300 ${showVol ? 'w-24 ml-2 opacity-100' : 'w-0 opacity-0 group-hover:w-24 group-hover:opacity-100 overflow-hidden'}`}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            aria-label="Volume"
            className="accent-pink-500 cursor-pointer w-full"
          />
        </div>
      )}
      {error && <span className="text-[9px] text-rose-500">{error}</span>}
      <audio
        ref={audioRef}
        src={TRACK.file}
        loop
        onPlay={onPlay}
        onPause={onPause}
        onError={onError}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;
