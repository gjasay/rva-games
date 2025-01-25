module.exports = {
  theme: {
    extend: {
      colors: {
        customBlue: '#1DA1F2',
      },
      animation: {
        hang: 'hang 1s ease-in-out',
      },
      keyframes: {
        hang: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

