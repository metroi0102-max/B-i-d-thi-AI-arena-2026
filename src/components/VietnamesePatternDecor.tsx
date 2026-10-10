/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const DongSonSunPattern: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 120,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Center 14-ray sun motif */}
    <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    {Array.from({ length: 14 }).map((_, i) => {
      const angle = (i * 360) / 14;
      return (
        <path
          key={i}
          d="M 50 36 L 48.5 45 L 51.5 45 Z"
          fill="currentColor"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
    {/* Concentric rings with saw-tooth & bird motifs */}
    <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const NonLaIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Conical hat shape */}
    <path
      d="M24 6L6 34C16 38 32 38 42 34L24 6Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Conical ribs */}
    <path d="M24 6V36" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M12 25C18 28 30 28 36 25" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
    <path d="M17 17C21 19 27 19 31 17" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
    {/* Silk chin strap ribbon */}
    <path
      d="M14 33C14 41 24 44 24 44C24 44 34 41 34 33"
      stroke="#DC2626"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const RoyalCloudMotif: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 35C15 20 35 15 48 24C58 10 82 8 96 20C110 14 128 18 135 30C148 30 155 42 142 46C120 46 30 46 10 35Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.05"
    />
    <path
      d="M32 32C40 22 56 22 64 30"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M80 28C88 18 104 20 112 30"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export const LotusBloomIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 3C10 7 7 11 7 15C7 18 9 20 12 20C15 20 17 18 17 15C17 11 14 7 12 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M7 15C5 12 3 13 2 16C1 19 4 20 7 20C8 20 8 19 7 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M17 15C19 12 21 13 22 16C23 19 20 20 17 20C16 20 16 19 17 15Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const RedSealStamp: React.FC<{ text?: string; subText?: string }> = ({
  text = 'HỒN SẮC',
  subText = 'VIỆT PHỤC',
}) => (
  <div className="inline-flex flex-col items-center justify-center border-2 border-red-700 bg-red-950/80 px-2 py-1 text-red-400 font-serif shadow-inner select-none tracking-widest text-[10px] uppercase">
    <span className="font-bold leading-tight text-red-300">{text}</span>
    <span className="text-[8px] text-red-400/90 leading-none">{subText}</span>
  </div>
);
