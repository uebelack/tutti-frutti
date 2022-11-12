const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    join(__dirname, './**/!(*.stories|*.spec).{ts,tsx,html}'),
    join(__dirname, '../../libs/ui/src/**/!(*.stories|*.spec).{ts,tsx,html}'),
  ],
  theme: {
    extend: {
      colors: {
        blue: '#204DCC',
        primary: {
          10: '#21005D',
          20: '#381E72',
          30: '#4F378B',
          40: '#6750A4',
          50: '#7F67BE',
          60: '#9A82DB',
          70: '#B69DF8',
          80: '#D0BCFF',
          90: '#EADDFF',
          95: '#F6EDFF',
        },
        secondary: {
          10: '#1D192B',
          20: '#332D41',
          30: '#4A4458',
          40: '#625B71',
          50: '#7A7289',
          60: '#958DA5',
          70: '#B0A7C0',
          80: '#CCC2DC',
          90: '#E8DEF8',
        },
        black: '#000000',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        /**
         * 12px
         */
        'body-sm': [
          '0.75rem',
          {
            lineHeight: '1rem',
            fontWeight: 400,
            letterSpacing: '0.33em',
          },
        ],
        /**
         * 14px
         */
        'body-md': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: 400,
            letterSpacing: '0.017em',
          },
        ],
        /**
         * 16px
         */
        'body-lg': [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: 400,
            letterSpacing: '0.03125em',
          },
        ],
        /**
         * 11px
         */
        'label-sm': [
          '0.6875rem',
          {
            lineHeight: '1rem',
            fontWeight: 500,
            letterSpacing: '0.03125em',
          },
        ],
        /**
         * 12px
         */
        'label-md': [
          '0.75rem',
          {
            lineHeight: '1rem',
            fontWeight: 500,
            letterSpacing: '0.03125em',
          },
        ],
        /**
         * 14px
         */
        'label-lg': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0.00625em',
          },
        ],
        /**
         * 14px
         */
        'title-sm': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0.00625em',
          },
        ],
        /**
         * 16px
         */
        'title-md': [
          '1rem',
          {
            lineHeight: '1rem',
            fontWeight: 500,
            letterSpacing: '0.009em',
          },
        ],
        /**
         * 22px
         */
        'title-lg': [
          '1.375rem',
          {
            lineHeight: '1.75rem',
            fontWeight: 400,
            letterSpacing: '0em',
          },
        ],
        /**
         * 24px
         */
        'heading-sm': [
          '1.5rem',
          {
            lineHeight: '2rem',
            fontWeight: 400,
            letterSpacing: '0em',
          },
        ],
        /**
         * 28px
         */
        'heading-md': [
          '1.75rem',
          {
            lineHeight: '2rem',
            fontWeight: 400,
            letterSpacing: '0em',
          },
        ],
        /**
         * 32px
         */
        'heading-lg': [
          '2rem',
          {
            lineHeight: '2.5rem',
            fontWeight: 400,
            letterSpacing: '0em',
          },
        ],
      },
    },
  },
};
