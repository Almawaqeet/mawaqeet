import React, { useState } from "react";
import { motion } from "framer-motion";
import { brandColors } from '@/Constants/BrandConstants';
import { ring } from 'ldrs'

ring.register()

const LoadingIcon = () => {
    return (
        <l-ring
            size="20"
            stroke="4"
            bg-opacity="0"
            speed="2"
            color="white"
        ></l-ring>
    )
}

interface ButtonProps {
  width?: string;
  height?: string;
  color?: string;
  background?: string;
  loading?: boolean;
  loadingSize?: string;
  iconSpacing?: boolean;
  icon?: React.ReactNode;
  borderColor?: string;
  borderStyle?: string;
  marginBottom?: string;
  marginRight?: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const AppButton: React.FC<ButtonProps> = ({
  width = "auto",
  height = "45px",
  color = brandColors.white,
  background = brandColors.dark_brown,
  loading = false,
  loadingSize = "40px",
  iconSpacing = false,
  icon,
  borderColor = "black",
  borderStyle = "none",
  className,
  onClick,
  disabled = false,
  children,
}) => {
  const [active, setActive] = useState(false);

  const handleMouseDown = () => setActive(true);
  const handleMouseUp = () => setActive(false);

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <motion.button
      className={`
        ${className}
        flex justify-${iconSpacing ? 'around' : 'center'} items-center
        text-sm font-normal
        rounded-full outline-none transition-all duration-300 select-none
        ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${active ? 'shadow-md' : ''}
      `}
      style={{
        width: loading ? loadingSize : width,
        height: loading ? loadingSize : height,
        padding: loading ? '10px' : '20px',
        color: color,
        background: active ? darkenColor(background, 10) : background,
        borderColor: borderColor,
        borderStyle: borderStyle,
        borderRadius: loading ? '50%' : '9999px', // circular when loading
      }}
      onClick={handleClick}
      title={disabled ? "Disabled" : ""}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled || loading}
      initial={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? <LoadingIcon /> : children}
      {!loading && icon && <span className="mx-2">{icon}</span>}
    </motion.button>
  );
};

export default AppButton;

// Darken a color by a percentage
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace(/#/g, ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const B = ((num >> 8) & 0x00ff) - amt;
  const G = (num & 0x0000ff) - amt;

  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1)}`;
}
