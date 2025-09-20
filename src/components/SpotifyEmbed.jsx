import PropTypes from 'prop-types';

// Simple responsive Spotify embed wrapper
const SpotifyEmbed = ({ trackId = '7cMhicmOIwfJlWURl90AOc' }) => {
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  return (
    <div className="fixed bottom-24 right-4 z-40 w-[300px] md:w-[360px] bg-white/80 backdrop-blur border border-pink-200 rounded-2xl shadow-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-pink-600">Now Playing</span>
        <span className="text-[10px] text-pink-400">Spotify</span>
      </div>
      <div className="overflow-hidden rounded-xl shadow-inner">
        <iframe
          title="Spotify Follow You"
          src={embedUrl}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <p className="text-[10px] text-pink-400 text-center">Streaming via Spotify embed</p>
    </div>
  );
};

export default SpotifyEmbed;

SpotifyEmbed.propTypes = {
  trackId: PropTypes.string,
};