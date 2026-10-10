/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const VietnameseHeaderCorners: React.FC = () => {
  return (
    <>
      {/* GÓC TRÊN BÊN TRÁI: LŨY TRE & NÓN LÁ NGHIÊNG CHE */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 select-none overflow-hidden w-40 sm:w-56 md:w-64 h-32 sm:h-44 md:h-48"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bamboo Stalks (Thân tre & ngọn tre) */}
          <g id="bamboo-grove-left" opacity="0.95">
            {/* Main bamboo stalk 1 */}
            <path
              d="M-10 -10 C20 30 50 45 95 40"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Stalk joints (Đốt tre) */}
            <circle cx="25" cy="22" r="3.5" fill="#14532D" stroke="#22C55E" strokeWidth="1" />
            <circle cx="60" cy="38" r="3.5" fill="#14532D" stroke="#22C55E" strokeWidth="1" />

            {/* Secondary stalk 2 */}
            <path
              d="M-5 15 C35 50 70 80 120 70"
              stroke="#16A34A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="45" cy="55" r="2.8" fill="#14532D" stroke="#4ADE80" strokeWidth="0.8" />
            <circle cx="85" cy="74" r="2.8" fill="#14532D" stroke="#4ADE80" strokeWidth="0.8" />

            {/* Bamboo Leaves Clusters (Lá tre xếp lớp mềm mại) */}
            {/* Cluster 1 */}
            <path d="M60 38 Q85 30 110 32 Q85 45 60 38 Z" fill="#22C55E" opacity="0.9" />
            <path d="M60 38 Q90 48 115 54 Q85 58 60 38 Z" fill="#16A34A" opacity="0.85" />
            <path d="M55 35 Q80 18 102 20 Q75 30 55 35 Z" fill="#4ADE80" opacity="0.9" />

            {/* Cluster 2 */}
            <path d="M95 40 Q130 35 155 42 Q125 52 95 40 Z" fill="#22C55E" />
            <path d="M95 40 Q125 22 148 24 Q120 34 95 40 Z" fill="#4ADE80" />
            <path d="M85 74 Q120 78 145 90 Q115 95 85 74 Z" fill="#15803D" />
            <path d="M120 70 Q155 65 178 72 Q145 80 120 70 Z" fill="#22C55E" />

            {/* Fine hanging leaves */}
            <path d="M30 45 Q50 65 65 85 Q45 70 30 45 Z" fill="#16A34A" opacity="0.75" />
            <path d="M45 55 Q70 85 88 105 Q65 90 45 55 Z" fill="#15803D" opacity="0.8" />
          </g>

          {/* Chiếc Nón Lá Xứ Việt (Conical Hat) */}
          <g id="conical-hat-left" transform="translate(62, 58) rotate(-12)">
            {/* Conical hat body */}
            <path
              d="M0 -22 L-38 16 C-18 24 18 24 38 16 Z"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="1.8"
            />
            {/* Palm ribs (vành nón nan tre) */}
            <path d="M-28 6 C-12 14 12 14 28 6" stroke="#CA8A04" strokeWidth="0.9" fill="none" />
            <path d="M-18 -4 C-8 4 8 4 18 -4" stroke="#CA8A04" strokeWidth="0.8" fill="none" />
            <path d="M-9 -13 C-4 -8 4 -8 9 -13" stroke="#CA8A04" strokeWidth="0.8" fill="none" />

            {/* Translucent poem / lotus motif inside hat */}
            <path d="M-6 4 Q0 -2 6 4 Q0 8 -6 4 Z" fill="#DC2626" opacity="0.35" />

            {/* Silk chin-strap red ribbon (Quai nón đỏ son rủ xuống) */}
            <path
              d="M-22 14 C-26 42 -10 58 -2 62 C6 60 24 45 22 14"
              stroke="#DC2626"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flowing ribbon tails */}
            <path
              d="M-2 62 C-6 78 -12 92 -8 105"
              stroke="#B91C1C"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 62 C4 76 8 88 5 102"
              stroke="#DC2626"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* GÓC TRÊN BÊN PHẢI: CÀNH TRÚC ĐÓN GIÓ & NÓN LÁ BÀI THƠ */}
      <div
        className="pointer-events-none fixed top-0 right-0 z-50 select-none overflow-hidden w-40 sm:w-56 md:w-64 h-32 sm:h-44 md:h-48"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 240 180"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bamboo Stalks Right */}
          <g id="bamboo-grove-right" opacity="0.95" transform="translate(240, 0) scale(-1, 1)">
            {/* Main bamboo stalk */}
            <path
              d="M-10 -10 C20 30 50 45 95 40"
              stroke="#15803D"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="25" cy="22" r="3.5" fill="#14532D" stroke="#22C55E" strokeWidth="1" />
            <circle cx="60" cy="38" r="3.5" fill="#14532D" stroke="#22C55E" strokeWidth="1" />

            {/* Secondary stalk */}
            <path
              d="M-5 15 C35 50 70 80 120 70"
              stroke="#16A34A"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="45" cy="55" r="2.8" fill="#14532D" stroke="#4ADE80" strokeWidth="0.8" />
            <circle cx="85" cy="74" r="2.8" fill="#14532D" stroke="#4ADE80" strokeWidth="0.8" />

            {/* Leaves */}
            <path d="M60 38 Q85 30 110 32 Q85 45 60 38 Z" fill="#22C55E" opacity="0.9" />
            <path d="M60 38 Q90 48 115 54 Q85 58 60 38 Z" fill="#16A34A" opacity="0.85" />
            <path d="M55 35 Q80 18 102 20 Q75 30 55 35 Z" fill="#4ADE80" opacity="0.9" />

            <path d="M95 40 Q130 35 155 42 Q125 52 95 40 Z" fill="#22C55E" />
            <path d="M95 40 Q125 22 148 24 Q120 34 95 40 Z" fill="#4ADE80" />
            <path d="M85 74 Q120 78 145 90 Q115 95 85 74 Z" fill="#15803D" />
            <path d="M120 70 Q155 65 178 72 Q145 80 120 70 Z" fill="#22C55E" />

            <path d="M30 45 Q50 65 65 85 Q45 70 30 45 Z" fill="#16A34A" opacity="0.75" />
          </g>

          {/* Chiếc Nón Lá Xứ Huế Right */}
          <g id="conical-hat-right" transform="translate(178, 58) rotate(14)">
            <path
              d="M0 -22 L-38 16 C-18 24 18 24 38 16 Z"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="1.8"
            />
            <path d="M-28 6 C-12 14 12 14 28 6" stroke="#CA8A04" strokeWidth="0.9" fill="none" />
            <path d="M-18 -4 C-8 4 8 4 18 -4" stroke="#CA8A04" strokeWidth="0.8" fill="none" />
            <path d="M-9 -13 C-4 -8 4 -8 9 -13" stroke="#CA8A04" strokeWidth="0.8" fill="none" />

            {/* Delicate poem text glyph */}
            <text x="0" y="8" textAnchor="middle" fontSize="6.5" fill="#991B1B" opacity="0.4" fontFamily="serif">
              Hồn Sắc
            </text>

            {/* Red silk ribbon */}
            <path
              d="M-22 14 C-24 42 -8 58 0 62 C8 60 24 45 22 14"
              stroke="#DC2626"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 62 C-3 78 -6 94 -2 108"
              stroke="#B91C1C"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M2 62 C6 76 10 90 8 104"
              stroke="#DC2626"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </>
  );
};
