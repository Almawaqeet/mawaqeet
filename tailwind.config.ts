import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			'logo-color': '#4B3938',
  			'hover-color': '#87592A',
  			'number-color': '#A88A69',
  			'hero-color': '#0000004D',
  			'body-color': '#333333',
  			'text-color': 'var(--brand-color-text)',
  			accordion: '#F8F8F8',
  			'brand-color': 'var(--brand-color)',
  			'brand-color-subtle': 'var(--brand-color-subtle)',
  			'brand-color-light': 'var(--brand-color-light)',
  			'brand-color-main': 'var(--brand-color-main)',
  			'brand-color-white': 'var(--brand-color-white)',
  			'brand-color-black': 'var(--brand-color-black)',
  			'brand-color-text': 'var(--brand-color-text)'
  		},
  		fontSize: {
  			'fz-xxs': '10px',
  			'fz-xsm': '12px',
  			'fz-xss': '14px',
  			'fz-xs': '16px',
  			'fz-sm': '18px',
  			'fz-md': '24px',
  			'fz-mz': '32px',
  			'heading-clamp': 'clamp(1.125rem, 1.004rem + 1.1067vw, 2rem)',
  			'brand-clamp': 'clamp(1.25rem, 0.4286rem + 1.1905vw, 1.75rem)',
  			'hero-clamp': 'clamp(1.5rem, 0.9718rem + 2.2535vw, 3rem);',
  			'navbar-clamp': 'clamp(0.725rem, 0.3393rem + 0.5952vw, 0.875rem)',
  			'Bold-1-clamp': 'clamp(0.875rem, 0.6549rem + 0.939vw, 1.5rem)',
  			'Bold-2-clamp': 'clamp(0.75rem, 0.618rem + 0.5634vw, 1.125rem)',
  			'head-3-clamp': 'clamp(0.875rem, -0.1373rem + 4.3192vw, 3.75rem',
  			'quote-clamp': 'clamp(1rem, 0.8239rem + 0.7512vw, 1.5rem)',
  			'scheme-clamp': 'clamp(0.875rem, -0.1373rem + 4.3192vw, 3.75rem)',
  			'body-clamp': 'clamp(0.75rem, 0.4859rem + 1.1268vw, 1.125rem)',
  			'team-clamp': 'clamp(0.875rem, 0.831rem + 0.1878vw, 1rem)',
  			'purpose-clamp': 'clamp(0.625rem, 0.831rem + 0.1878vw, 1rem)',
  			'account-clamp': 'clamp(1rem, 0.8617rem + 1.2648vw, 2rem)'
  		},
  		fontFamily: {
  			poppins: ["Poppins", "sans-serif"]
  		},
  		screens: {
  			xmd: '175px',
  			mobile: '375px',
  			tab_md: '818px'
  		},
  		dropShadow: {
  			'black-white': '0px 4px 8px 0px #12121240',
  			'white-ash': '0px 4px 8px 0px #C4C4C440',
  			transparent: '0px 8px 20px 0px #C4C4C440'
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
