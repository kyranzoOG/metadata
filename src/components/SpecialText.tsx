import React from 'react';

export type FontVariant = 'bold' | 'italic' | 'skinny' | 'chalkboard' | 'multicraft';

interface SpecialTextProps {
  children: React.ReactNode;
  font?: FontVariant;
  className?: string;
  glow?: boolean;
}

export const SpecialText: React.FC<SpecialTextProps> = ({
  children,
  font = 'multicraft',
  className = '',
  glow = true,
}) => {
  const fontClasses: Record<FontVariant, string> = {
    bold: 'font-heavy-bold text-[#bef264]',
    italic: 'font-italic-serif text-[#bef264]',
    skinny: 'font-skinny text-[#bef264]',
    chalkboard: 'font-chalkboard text-[#bef264]',
    multicraft: 'font-multicraft text-[#bef264]',
  };

  const selectedClass = fontClasses[font] || fontClasses.multicraft;

  return (
    <span
      className={`inline-block transition-transform duration-200 ${selectedClass} ${
        glow ? 'drop-shadow-[0_0_10px_rgba(190,242,100,0.4)]' : ''
      } ${className}`}
    >
      {children}
    </span>
  );
};
