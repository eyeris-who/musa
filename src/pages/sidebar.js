import React, { useEffect } from 'react';

export default function Sidebar() {
  // Load colour variables from localStorage or set defaults
  useEffect(() => {
    const cssVars = ['--color-primary', '--color-secondary', '--color-text', '--color-accent'];
    cssVars.forEach((variableName) => {
      const colourValue = localStorage.getItem(variableName);
      if (colourValue) {
        document.documentElement.style.setProperty(variableName, colourValue);
      }
    });
  }, []);

  // Function to handle colour changes
  const handleColorClick = (variableName, field, defaultColour) => {
    let colourValue = prompt("Enter a colour value for "+field+":", defaultColour);
    if (colourValue === null || colourValue === "") {
      colourValue = defaultColour;
    } else {
      // Check if the colour value is a valid CSS colour
      const isValidColour = /^#[0-9A-F]{6}$/i.test(colourValue) || /^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/.test(colourValue);
      if (!isValidColour) {
        alert("Invalid colour value. Please enter a valid hex or rgb colour.");
        return;
      }
    }
    document.documentElement.style.setProperty(variableName, colourValue);
    localStorage.setItem(variableName, colourValue);
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  }

  return (
    <nav className="sidebar">
      <div className="tophalf">
        <ul>
          <a href="/"><svg className="icon"
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="-1 0 19 19"
            >
              <path
                fill="var(--color-accent)"
                d="M14.875 16.212c0 .552-.476.788-1.062.788H12.75c-.587 0-1.062-.236-1.062-.788v-1c0-1.105-.951-2.212-2.126-2.212H7.438c-1.175 0-2.125 1.107-2.125 2.212v1c0 .552-.476.788-1.063.788H3.188c-.587 0-1.063-.236-1.063-.788V8.15c0-.133.056-.26.155-.354L7.738 2.66a1.11 1.11 0 0 1 1.503 0l5.479 5.156a.49.49 0 0 1 .155.353zM17 7.625a.97.97 0 0 0-.31-.706L9.999.59A2.22 2.22 0 0 0 6.991.583L.312 6.848A.97.97 0 0 0 0 7.556v9.656C0 18.317.95 19 2.125 19h3.188c1.174 0 2.125-.683 2.125-1.788v-1c0-.552.475-1 1.062-1s1.063.448 1.063 1v1c0 1.105.95 1.788 2.124 1.788h3.188C16.049 19 17 18.317 17 17.212z"
              />
            </svg>
          </a>
          <a href="/analytics"><svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="var(--color-accent)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m4 16.937 6-7.5 5 4 5.5-6.5"
            />
            <circle cx={10} cy={8.937} r={2} fill="var(--color-accent)" />
            <path fill="var(--color-accent)" d="M16.813 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
            <circle cx={4} cy={16.937} r={2} fill="var(--color-accent)" />
            <path fill="var(--color-accent)" d="M22.5 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
          </svg>
          </a>
          <a href="/recommendations"><svg height="40px" className="icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="2 2 20 20"
            >
              <path
                stroke="var(--color-accent)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 16.584V19a2 2 0 1 0 4 0v-2.416M12 3v1m6.364 1.636-.707.707M5.636 5.636l.707.707M4 12H3m18 0h-1m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
              />
            </svg>
          </a>
        </ul>
      </div>
      <div className="bottomhalf">
        <ul>
          <div className="palette">
            <div className="colour" style={{ backgroundColor: 'var(--color-primary)' }} onClick={() => handleColorClick('--color-primary', '', '#dc1c22')}></div>
            <div className="colour" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => handleColorClick('--color-secondary', '', '#f424af')}></div>
            <div className="colour" style={{ backgroundColor: 'var(--color-text)' }} onClick={() => handleColorClick('--color-text', 'text', '#000000')}></div>
            <div className="colour" style={{ backgroundColor: 'var(--color-accent)' }} onClick={() => handleColorClick('--color-accent', '', '#4dfff9')}></div>
          </div>
          <a href="/" onClick={handleLogOut}><svg
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            className="signout_svg__icon signout_svg__glyph"
            viewBox="0 0 24 24"
          >
            <path fill="var(--color-accent)" d="M11.41 13H22a10 10 0 1 1 0-2H11.41l2.3-2.29a1 1 0 1 0-1.42-1.42l-4 4a1 1 0 0 0-.21.32.4.4 0 0 0 0 .14.85.85 0 0 0 0 .5.4.4 0 0 0 0 .14 1 1 0 0 0 .21.32l4 4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42Z" />
          </svg>
          </a>
        </ul>
      </div>
    </nav>
  );
}