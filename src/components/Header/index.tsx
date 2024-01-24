import React from 'react';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import './Header.scss';

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
}

const LIGHT_COLOR = '#fff';
const DARK_COLOR = '#212121';

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  const color = isLight ? DARK_COLOR : LIGHT_COLOR;

  return (
    <header className="header container flex-justify-between flex-center">
      <a aria-label="Home link" href="/public">
        <svg
          className="header-logo"
          viewBox="0 0 74 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Trade Republic</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.52 19.19H3.06c-.1 0-.16-.07-.16-.17v-8.4c0-.06-.03-.1-.09-.1H.17c-.09 0-.15-.06-.15-.16V8.12c0-.1.06-.17.15-.17h8.24c.1 0 .16.07.16.17v2.25c0 .1-.07.16-.16.16H5.78c-.07 0-.1.03-.1.1v8.4c0 .1-.06.16-.16.16Zm12.77 0h-2.73c-.14 0-.19-.05-.24-.17L13.7 15.2h-1.02c-.07 0-.1.03-.1.1v3.73c0 .1-.06.17-.16.17H9.96c-.1 0-.16-.07-.16-.17V8.12c0-.1.07-.17.16-.17h4.37c2.46 0 3.86 1.5 3.86 3.62 0 1.4-.63 2.54-1.76 3.14l1.97 4.28c.05.1 0 .2-.11.2Zm-4.13-6.4c.79 0 1.26-.46 1.26-1.19 0-.72-.47-1.19-1.26-1.19h-1.49c-.06 0-.09.04-.09.1v2.18c0 .07.03.1.1.1h1.48Zm5.04 6.23 3.7-10.9c.03-.1.1-.17.2-.17h2.58c.1 0 .17.07.2.17l3.63 10.9c.03.1-.01.17-.1.17H26.8c-.11 0-.18-.07-.2-.17l-.51-1.73H22.6l-.5 1.73c-.03.1-.1.17-.2.17h-2.6c-.09 0-.14-.07-.1-.17Zm4.11-4.14h2.08l-.99-3.5h-.05l-1.04 3.5Zm7.4 4.14V8.12c0-.1.07-.17.16-.17h4.15c1.9 0 3.28.83 3.82 2.56.22.73.32 1.36.32 3.06 0 1.69-.1 2.33-.32 3.06-.54 1.73-1.92 2.56-3.82 2.56h-4.15c-.09 0-.15-.07-.15-.17Zm2.78-2.5c0 .06.03.1.1.1h.83c.98 0 1.52-.3 1.77-1.08.1-.33.16-.71.16-1.97s-.06-1.64-.16-1.97c-.25-.79-.79-1.07-1.77-1.07h-.83c-.07 0-.1.03-.1.1v5.88Zm7.36 2.5V8.12c0-.1.06-.17.16-.17h7.02c.1 0 .15.07.15.17v2.13c0 .1-.06.16-.15.16h-4.31c-.06 0-.1.04-.1.1v1.7c0 .07.04.1.1.1h3.53c.1 0 .16.07.16.17v2.08c0 .1-.06.17-.16.17h-3.53c-.06 0-.1.03-.1.1v1.8c0 .06.04.1.1.1h4.3c.1 0 .16.06.16.16v2.13c0 .1-.06.17-.15.17H41c-.1 0-.16-.07-.16-.17ZM8.49 32.68H5.76c-.15 0-.2-.05-.24-.17L3.9 28.68H2.87c-.06 0-.1.03-.1.1v3.73c0 .1-.06.17-.15.17H.16c-.1 0-.16-.07-.16-.17v-10.9c0-.1.06-.17.16-.17h4.37c2.46 0 3.86 1.5 3.86 3.62 0 1.4-.63 2.54-1.77 3.14l1.98 4.28c.04.1 0 .2-.11.2Zm-4.14-6.4c.8 0 1.27-.46 1.27-1.19s-.48-1.19-1.27-1.19H2.87c-.06 0-.1.03-.1.1v2.18c0 .07.04.1.1.1h1.48Zm5.75 6.23v-10.9c0-.1.07-.17.16-.17h7.02c.1 0 .16.06.16.16v2.14c0 .1-.07.16-.16.16h-4.3c-.07 0-.1.03-.1.1v1.7c0 .07.03.1.1.1h3.53c.09 0 .15.07.15.17v2.08c0 .1-.06.17-.15.17h-3.54c-.06 0-.1.03-.1.1v1.8c0 .06.04.1.1.1h4.3c.1 0 .17.06.17.16v2.13c0 .1-.07.17-.16.17h-7.02c-.1 0-.16-.07-.16-.17Zm11.59.17h-2.47c-.09 0-.15-.07-.15-.17v-10.9c0-.1.06-.17.15-.17h4.3c2.61 0 3.97 1.55 3.97 3.73 0 2.15-1.37 3.75-3.97 3.75h-1.58c-.06 0-.1.04-.1.1v3.5c0 .1-.06.16-.15.16Zm1.67-6.22c.87 0 1.35-.51 1.35-1.29 0-.77-.48-1.27-1.35-1.27h-1.42c-.06 0-.1.03-.1.1v2.36c0 .07.04.1.1.1h1.42Zm9.78 6.41c-2.6 0-4.27-1.55-4.27-4.54V21.6c0-.1.06-.16.16-.16h2.46c.1 0 .16.06.16.16v6.91c0 1.13.6 1.77 1.5 1.77.92 0 1.48-.64 1.48-1.77v-6.9c0-.1.06-.17.15-.17h2.46c.1 0 .16.06.16.16v6.73c0 3-1.7 4.54-4.26 4.54Zm6.15-.36v-10.9c0-.1.06-.17.15-.17h4.37c2.4 0 3.5 1.2 3.5 2.99 0 1.16-.5 1.97-1.3 2.41v.04c.78.31 1.5 1.25 1.5 2.56 0 2.2-1.49 3.24-3.75 3.24h-4.32c-.1 0-.15-.07-.15-.17Zm2.87-6.56h1.12c.83 0 1.27-.38 1.27-1.16 0-.8-.42-1.15-1.27-1.15h-1.12c-.07 0-.1.03-.1.1v2.11c0 .07.03.1.1.1Zm-.1 4.43c0 .07.03.1.1.1h1.26c.87 0 1.3-.45 1.3-1.27 0-.78-.43-1.26-1.3-1.26h-1.26c-.07 0-.1.03-.1.1v2.33Zm7.1 2.13v-10.9c0-.1.05-.17.15-.17h2.46c.1 0 .16.06.16.16V30c0 .07.03.1.1.1h4.53c.1 0 .16.06.16.16v2.25c0 .1-.06.17-.16.17h-7.25c-.1 0-.16-.07-.16-.17Zm8.9 0v-10.9c0-.1.07-.17.17-.17h2.46c.1 0 .16.06.16.16v10.91c0 .1-.07.17-.16.17h-2.46c-.1 0-.16-.07-.16-.17Zm4.76-2.41a9.08 9.08 0 0 1-.31-3.04c0-1.67.08-2.28.31-3.04.57-1.84 1.96-2.78 3.9-2.78 1.9 0 3.25.94 3.85 2.56.05.12.03.18-.08.23l-2.1.96c-.1.05-.17.02-.22-.1-.3-.66-.68-1.06-1.4-1.06-.68 0-1.1.35-1.3.98-.1.35-.15.7-.15 2.25s.04 1.9.15 2.24c.2.63.62.98 1.3.98.72 0 1.1-.4 1.4-1.06.05-.11.11-.15.22-.1l2.1.96c.11.05.13.12.08.23-.6 1.62-1.96 2.56-3.85 2.56-1.94 0-3.33-.94-3.9-2.77ZM74 14.75a.54.54 0 0 1-.4.53l-7.71 1.94a1.22 1.22 0 0 1-.7-.03l-3.37-1.16a1.22 1.22 0 0 0-.7-.03l-7.41 1.87a.52.52 0 0 1-.63-.4.58.58 0 0 1-.02-.13v-5.5c0-.25.17-.47.4-.53l7.66-1.94a1.22 1.22 0 0 1 .7.03l3.37 1.16c.22.08.46.1.7.03l7.47-1.87c.28-.07.56.1.63.4l.01.13v5.5Zm0-8.2a.54.54 0 0 1-.4.53L65.89 9a1.22 1.22 0 0 1-.7-.03l-3.37-1.16a1.22 1.22 0 0 0-.7-.03l-7.41 1.88a.52.52 0 0 1-.63-.4.58.58 0 0 1-.01-.13v-5.5c0-.25.16-.47.4-.53l7.65-1.94a1.22 1.22 0 0 1 .7.03l3.37 1.16c.22.08.46.09.7.03L73.35.51c.28-.06.56.12.63.4l.01.14v5.5Z"
            fill={color}
          />
        </svg>
      </a>
      <button
        type="button"
        className="button-theme flex flex-center"
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={() => toggleTheme()}
      >
        {isLight ? (
          <MdOutlineLightMode
            data-testid="light-icon"
            size={30}
            color={color}
          />
        ) : (
          <MdOutlineNightlight
            data-testid="dark-icon"
            size={30}
            color={color}
          />
        )}
      </button>
    </header>
  );
};

export default Header;
