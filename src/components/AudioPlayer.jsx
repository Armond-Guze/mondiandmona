import { useRef, useState, useEffect } from 'react';

// Track metadata (you must provide the actual MP3 file yourself in /public)
// IMPORTANT: Ensure you have the legal right (license/personal permission) to host and play this audio if the site is public.
const TRACK = {
  title: 'Follow You',
  artist: 'Noizy',
  file: '/follow-you-noizy.mp3' // Place your MP3 in public/follow-you-noizy.mp3
};

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) el.pause(); else el.play();
  };

  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  const onError = () => setError('Audio not found. Add the MP3 to /public.');

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/85 backdrop-blur border border-pink-200/80 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow active:scale-95 transition"
        aria-label={playing ? 'Pause track' : 'Play track'}
      >
        {playing ? '❚❚' : '►'}
      </button>
      <div className="flex flex-col min-w-[160px]">
        <span className="text-[11px] tracking-wide uppercase text-pink-500 font-semibold truncate" title={`${TRACK.title} – ${TRACK.artist}`}>{TRACK.title}</span>
        <span className="text-[10px] text-pink-400 truncate">{TRACK.artist}</span>
        {error ? (
          <span className="text-[10px] text-rose-500 mt-1">{error}</span>
        ) : (
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="mt-1 accent-pink-500 cursor-pointer"
          />
        )}
      </div>
      <audio
        ref={audioRef}
        src={TRACK.file}
        loop
        onPlay={onPlay}
        onPause={onPause}
        onError={onError}
        className="love-audio hidden"
      />
    </div>
  );
};

export default AudioPlayer;
