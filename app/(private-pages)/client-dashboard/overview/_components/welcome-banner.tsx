import React, { ReactNode } from 'react'

type WelcomeBanner = {
    children: ReactNode,
    theme?: "light" | "dark",
}

const WelcomeBanner = ({ children, theme='light' }: WelcomeBanner) => {

    const themeStyles = {
        light: {
            background: 'bg-white',
            border: 'border-gray-200',
            text: {
                primary: 'text-gray-900',
                secondary: 'text-gray-700',
                tertiary: 'text-gray-500'
            },
        },
        dark: {
            background: 'bg-gray-900',
            border: 'border-gray-700',
            text: {
                primary: 'text-white',
                secondary: 'text-gray-300',
                tertiary: 'text-gray-400'
            },
        }
    };

    const styles = themeStyles[theme];

  return (
    <div className={`${styles.background} ${styles.border} ${styles.text.secondary} w-full rounded-sm`}>
        {/* This component should be dynamic base on hajj or umrah component tab */}
        {/* the children can be an image banner or color which embed the recent hajj and umrah package created (name, the date, propose date for take off, number days to go, a call to action to book a package ) */}
        {children}
    </div>
  )
}

export default WelcomeBanner