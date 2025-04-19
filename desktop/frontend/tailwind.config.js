const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'visibility': 'visibility',
        'opacity': 'opacity',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s linear infinite',
        blink2: 'blink 2s linear infinite',
        blink3: 'blink 3s linear infinite',
        blink4: 'blink 4s linear infinite',
        blink5: 'blink 5s linear infinite',
      },
      colors: {
        primary: "#02265B",
        "primary-hover": "hsl(var(--color-primary-hover))",
        secondary: "#fab710",
        "secondary-hover": "#FEC500",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      xs: "360px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    require("daisyui"),
    // require("@tailwindcss/forms")({
    //   strategy: "base",
    // }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".primary-ring-shadow": {
          boxShadow:
            "0 0 0 2px #ffffff, 0 0 0 4px hsl(var(--color-primary) / 0.5), 0 1px 2px 0 black",
        },
        ".secondary-ring-shadow": {
          boxShadow:
            "0 0 0 2px #ffffff, 0 0 0 4px hsl(var(--color-secondary) / 0.5), 0 1px 2px 0 black",
        },
      });
    }),
  ],
};
