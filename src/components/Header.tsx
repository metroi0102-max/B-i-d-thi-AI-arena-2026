/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NonLaIcon } from './VietnamesePatternDecor';
import { TraditionalFolkMusicPlayer } from './TraditionalFolkMusicPlayer';

interface HeaderProps {
  activeTab: 'phong_thu' | 'kham_pha' | 'di_san' | 'goi_y' | 'lookbook';
  onSelectTab: (tab: 'phong_thu' | 'kham_pha' | 'di_san' | 'goi_y' | 'lookbook') => void;
  onOpenCompare: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenCompare }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#160608]/90 backdrop-blur-md border-b border-red-900/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('phong_thu');
          }}
          className="flex items-center gap-2.5 text-xl font-serif font-bold text-amber-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
        >
          <NonLaIcon className="text-amber-400" size={24} />
          <div className="flex flex-col leading-tight">
            <span>TÂM HỒN VIỆT</span>
            <span className="text-[10px] tracking-widest font-sans font-normal text-amber-300/70 uppercase">
              The Soul of Vietnam
            </span>
          </div>
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onSelectTab('phong_thu')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'phong_thu'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Phòng Phối Đồ
          </button>
          <button
            onClick={() => onSelectTab('kham_pha')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'kham_pha'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Nhóm Trang Phục
          </button>
          <button
            onClick={() => onSelectTab('di_san')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'di_san'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Tri Thức Di Sản
          </button>
          <button
            onClick={() => onSelectTab('goi_y')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'goi_y'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Gợi Ý Sự Kiện
          </button>
          <button
            onClick={() => onSelectTab('lookbook')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'lookbook'
                ? 'text-amber-300 border-b-2 border-amber-400 font-semibold'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            Bộ Sưu Tập Lookbook
          </button>
        </nav>

        {/* Zone 3: Traditional Folk Music Player & Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <TraditionalFolkMusicPlayer />
          <button
            onClick={onOpenCompare}
            className="px-3.5 py-2 text-xs font-medium text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md whitespace-nowrap shrink-0 font-sans font-semibold"
          >
            So Sánh Phối Đồ
          </button>
        </div>
      </div>
    </header>
  );
};
