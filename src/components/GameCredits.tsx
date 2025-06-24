const GameCredits = () => {
  return (
    <div className="game-credits">
      <h1>Credits</h1>
      <hr />

      <ul className="nes-list is-disc">
        <li>
          <a href="https://kenney.nl/assets/pixel-shmup" target="_blank" rel="noopener noreferrer">
            Assets by Kenney.nl
          </a>
        </li>

        <li>
          <a href="https://kenney.nl/assets/sci-fi-sounds" target="_blank" rel="noopener noreferrer">
            Sounds by Kenney.nl
          </a>
        </li>

        <li>
          <a href="https://nostalgic-css.github.io/NES.css/" target="_blank" rel="noopener noreferrer">
            NES.css by nostalgic-css
          </a>
        </li>

        <li>
          <a
            href="https://pixabay.com/music/video-games-the-return-of-the-8-bit-era-301292/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Music 'The Return Of The 8-bit Era'
          </a>
          ,
          <a
            href="https://pixabay.com/music/video-games-my-8-bit-hero-301280/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Music 'My 8-bit Hero'
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GameCredits;
