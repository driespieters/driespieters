const Header = () => {
  return (
    <div
      id="shopify-section-header"
      className="shopify-section relative top-0 z-50"
    >
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between z-10">
        <div className="text-[0.65rem] uppercase">
          <span className="font-semibold">EN</span> /{" "}
          <a className="link link--noline" href="/nl">
            NL
          </a>
        </div>

        <a href="/" title="Home">
          <svg className="h-7" viewBox="0 0 290.64 300.38">
            <path d="M74.52 300.15v-74.72H0V.51a24.73 24.73 0 0 1 3.2-.4c47.49 0 95-.42 142.47.29 66.07 1 125.45 49.63 140.8 114.3A150.37 150.37 0 0 1 167 298a141.39 141.39 0 0 1-23.32 2.21c-21.83.3-43.66.13-65.49.13-.99-.01-1.97-.1-3.67-.19zm37.21-37.07c14.31 0 28.27 1.33 41.9-.23 63.54-7.25 107.71-65.08 99.15-128.83-7.31-54.5-55.94-97.24-111-97.4-33.33-.1-66.66 0-100 0-1.63 0-3.25.14-5 .22v151.6h38V75.24c23 0 45.48-.59 67.93.12 49.21 1.55 83 48 69.91 95.32-8.93 32.26-38.35 54.37-72.81 54.64-9.28.07-18.57 0-28.12 0zm0-74.55c10.88 0 21.54.64 32.09-.14a38 38 0 0 0 34.86-35.14c1.29-19.31-10.92-36.78-29.83-40.33-9.85-1.85-20.21-1-30.35-1.3-2.24-.07-4.48 0-6.77 0z"></path>
          </svg>
        </a>
      </header>
    </div>
  );
};

export default Header;
