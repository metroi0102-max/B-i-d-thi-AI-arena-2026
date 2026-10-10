/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OutfitConfiguration } from '../types/vietnamAttire';
import { PRESET_OUTFITS, TRADITIONAL_COSTUMES } from '../data/attireData';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { RedSealStamp, NonLaIcon } from './VietnamesePatternDecor';

interface LookbookGalleryProps {
  onApplyConfig: (config: OutfitConfiguration) => void;
  onOpenCreateLookbook: () => void;
  savedLookbooks: Array<{
    title: string;
    creator: string;
    costumeName: string;
    date: string;
    color: string;
  }>;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({
  onApplyConfig,
  onOpenCreateLookbook,
  savedLookbooks,
}) => {
  return (
    <div className="w-full space-y-8">
      {/* Hero Strip for Lookbook */}
      <div className="rounded-2xl border border-red-800/50 bg-gradient-to-r from-red-950 via-[#26070c] to-[#160306] p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <RedSealStamp text="BỘ SƯU TẬP" subText="VIỆT PHỤC" />
            <span className="text-xs text-amber-300 font-serif font-bold uppercase tracking-wider">
              Lookbook Cổ Phong Học Đường
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-amber-100 mb-1">
            Gìn Giữ Hồn Sắc - Tự Hào Tiếp Bước
          </h2>
          <p className="text-xs text-stone-300 font-sans max-w-xl leading-relaxed">
            Tuyển tập những cách phối trang phục truyền thống mẫu mực và sáng tạo của học sinh, sinh viên khắp ba miền Bắc - Trung - Nam.
          </p>
        </div>
        <button
          onClick={onOpenCreateLookbook}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 font-bold text-xs flex items-center gap-2 shadow-lg transition-all font-sans"
        >
          <Sparkles size={15} className="text-amber-300" />
          <span>Tạo Thẻ Lookbook Của Bạn</span>
        </button>
      </div>

      {/* User's Created Lookbooks (if any) */}
      {savedLookbooks.length > 0 && (
        <div>
          <h3 className="font-serif text-base font-bold text-amber-200 mb-3 flex items-center gap-2">
            <Heart size={16} className="text-red-400" />
            <span>Lookbook Bạn Đã Tạo ({savedLookbooks.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {savedLookbooks.map((lb, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-red-900/40 bg-[#1e070c] shadow-md flex items-center justify-between"
              >
                <div>
                  <h4 className="font-serif font-bold text-xs text-amber-100">{lb.title}</h4>
                  <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                    {lb.costumeName} · {lb.creator}
                  </p>
                  <span className="text-[10px] text-stone-500 font-sans">{lb.date}</span>
                </div>
                <div
                  className="w-6 h-6 rounded-full border border-white/20 shrink-0"
                  style={{ backgroundColor: lb.color }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Curated Editorial Collection Cards */}
      <div>
        <h3 className="font-serif text-lg font-bold text-amber-200 mb-4">
          Bộ Sưu Tập Tiêu Biểu Tuyển Chọn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRESET_OUTFITS.map((item, index) => {
            const costume = TRADITIONAL_COSTUMES.find((c) => c.id === item.config.costumeId);
            return (
              <div
                key={index}
                className="rounded-2xl border border-red-900/40 bg-gradient-to-b from-[#20060a] to-[#140306] p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded bg-red-950 text-amber-300 text-[11px] font-sans font-semibold border border-red-900/50">
                      Tuyển Chọn {index + 1}
                    </span>
                    <NonLaIcon className="text-amber-400/80" size={22} />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-sans mb-3">{item.tagline}</p>

                  <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/40 space-y-1.5 text-xs font-sans text-stone-300 mb-4">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Trang phục:</span>
                      <span className="font-semibold text-amber-200">{costume?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Niên đại:</span>
                      <span>{costume?.period}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-400">Sắc phục:</span>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: item.config.primaryColor }}
                        />
                        <span className="text-stone-200">
                          {item.config.primaryColor === '#991B1B'
                            ? 'Đỏ Son Cung Đình'
                            : item.config.primaryColor === '#1E3A8A'
                            ? 'Xanh Chàm Cổ Truyền'
                            : item.config.primaryColor === '#DC2626'
                            ? 'Đỏ Hoàng Tộc'
                            : 'Hồng Sen Thắm'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onApplyConfig(item.config)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-red-900/60 text-amber-200 border border-red-800/40 font-semibold text-xs flex items-center justify-center gap-2 transition-all font-sans"
                >
                  <span>Thử Phối Bộ Này Ngay</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
