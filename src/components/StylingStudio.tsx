/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  OutfitConfiguration,
  CostumeId,
  EventId,
  NonLaType,
  HeadwearType,
  AccessoryHandType,
  JewelryType,
  FootwearType,
  BackdropId,
} from '../types/vietnamAttire';
import {
  TRADITIONAL_COSTUMES,
  COLOR_PALETTES,
  FABRIC_LIST,
  PATTERN_LIST,
  EVENTS_DATA,
  ACCESSORIES_DATA,
  PRESET_OUTFITS,
  BACKDROPS_DATA,
} from '../data/attireData';
import { Palette, Info, Wand2, Sparkles, Landmark, HelpCircle } from 'lucide-react';
import { NonLaIcon } from './VietnamesePatternDecor';

interface StylingStudioProps {
  config: OutfitConfiguration;
  onUpdateConfig: (partial: Partial<OutfitConfiguration>) => void;
  onOpenEncyclopedia: (costumeId: CostumeId) => void;
}

export const StylingStudio: React.FC<StylingStudioProps> = ({
  config,
  onUpdateConfig,
  onOpenEncyclopedia,
}) => {
  const currentCostume = TRADITIONAL_COSTUMES.find((c) => c.id === config.costumeId)!;

  // Active hover states for live tooltip & meaning display
  const [hoveredColor, setHoveredColor] = useState<typeof COLOR_PALETTES[0] | null>(null);
  const [hoveredPattern, setHoveredPattern] = useState<typeof PATTERN_LIST[0] | null>(null);
  const [hoveredFabric, setHoveredFabric] = useState<typeof FABRIC_LIST[0] | null>(null);

  // Fallback to currently selected items if not hovering
  const activeColor =
    hoveredColor ||
    COLOR_PALETTES.find((c) => c.hex.toLowerCase() === config.primaryColor.toLowerCase()) ||
    COLOR_PALETTES[0];

  const activePattern =
    hoveredPattern ||
    PATTERN_LIST.find((p) => p.id === config.patternId || (p.id === 'hoa_dao_xu_bac' && config.patternId.includes('hoa_dao'))) ||
    PATTERN_LIST[0];

  const activeFabric =
    hoveredFabric ||
    FABRIC_LIST.find((f) => f.id === config.fabricId) ||
    FABRIC_LIST[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* QUICK PRESETS */}
      <div className="rounded-2xl border border-red-900/40 bg-[#1e070c]/90 backdrop-blur-md p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wand2 size={16} className="text-amber-400" />
            <h3 className="font-serif font-bold text-sm text-amber-100">Gợi Ý Mẫu Phối Tiêu Biểu</h3>
          </div>
          <span className="text-[11px] text-stone-400 font-sans">Chọn nhanh phong cách</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {PRESET_OUTFITS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onUpdateConfig(preset.config)}
              className="text-left p-2.5 rounded-xl border border-red-900/30 bg-red-950/30 hover:bg-red-900/40 hover:border-amber-500/50 transition-all group"
            >
              <div className="font-serif font-semibold text-xs text-amber-200 group-hover:text-amber-300 line-clamp-1">
                {preset.title}
              </div>
              <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 font-sans">
                {preset.tagline}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 1. CHỌN BỐI CẢNH VĂN HÓA (ĐỔI BACKGROUND TRỰC TIẾP) */}
      <div className="rounded-2xl border border-red-900/40 bg-[#180509]/90 backdrop-blur-md p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/30 mb-4">
          <div className="flex items-center gap-2.5">
            <Landmark size={18} className="text-amber-400" />
            <h3 className="font-serif text-base font-bold text-amber-100">
              1. Bối Cảnh Lịch Sử & Không Gian
            </h3>
          </div>
          <span className="text-xs text-amber-300/80 font-sans">Thay đổi bối cảnh đằng sau người mẫu</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {BACKDROPS_DATA.map((bd) => {
            const isSelected = config.selectedBackdrop === bd.id;
            return (
              <button
                key={bd.id}
                onClick={() => onUpdateConfig({ selectedBackdrop: bd.id as BackdropId })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-red-900/60 shadow-md ring-1 ring-amber-400/40 text-amber-100'
                    : 'border-red-900/30 bg-stone-900/40 hover:bg-red-950/30 text-stone-300'
                }`}
              >
                <div className="font-serif font-bold text-xs text-amber-200 mb-1 line-clamp-1">
                  {bd.name}
                </div>
                <div className="text-[10px] text-stone-400 font-sans line-clamp-2">
                  {bd.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CHỌN NHÓM TRANG PHỤC */}
      <div className="rounded-2xl border border-red-900/40 bg-[#180509]/90 backdrop-blur-md p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/30 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <h3 className="font-serif text-base font-bold text-amber-100">
              2. Nhóm Trang Phục Truyền Thống
            </h3>
          </div>
          <button
            onClick={() => onOpenEncyclopedia(config.costumeId)}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-sans"
          >
            <Info size={13} />
            <span>Nguồn gốc & Ý nghĩa</span>
          </button>
        </div>

        {/* Lựa chọn giới tính nhân vật: Nam / Nữ */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-red-900/20">
          <span className="text-xs text-amber-200/90 font-sans font-semibold">Giới tính người mẫu:</span>
          <div className="flex items-center bg-stone-900/90 p-1 rounded-xl border border-red-900/40 text-xs font-sans">
            <button
              onClick={() => onUpdateConfig({ gender: 'nam', avatarModel: 'student_m' })}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold ${
                config.gender === 'nam'
                  ? 'bg-red-800 text-amber-100 shadow ring-1 ring-amber-400/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Nam
            </button>
            <button
              onClick={() => onUpdateConfig({ gender: 'nu', avatarModel: 'student_f' })}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold ${
                config.gender === 'nu'
                  ? 'bg-red-800 text-amber-100 shadow ring-1 ring-amber-400/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Nữ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRADITIONAL_COSTUMES.map((costume) => {
            const isSelected = costume.id === config.costumeId;
            return (
              <button
                key={costume.id}
                onClick={() => {
                  onUpdateConfig({
                    costumeId: costume.id,
                    primaryColor: costume.defaultColors[0],
                    patternId: costume.id === 'trang_phuc_hmong' ? 'tho_cam_tay_bac' : config.patternId,
                  });
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-br from-red-900/60 to-red-950/80 shadow-md ring-1 ring-amber-400/40'
                    : 'border-red-900/30 bg-red-950/20 hover:bg-red-950/40 text-stone-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                )}
                <div className="font-serif font-bold text-sm text-amber-100 mb-1 leading-snug">
                  {costume.name}
                </div>
                <div className="text-[11px] text-amber-200/80 line-clamp-1 font-sans">
                  {costume.subTitle}
                </div>
                <div className="mt-2 text-[10px] text-stone-400 font-sans line-clamp-1">
                  {costume.period}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Costume Info Summary */}
        <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-900/40 flex items-start justify-between gap-4 text-xs font-sans">
          <div>
            <div className="font-semibold text-amber-200 font-serif text-sm">
              {currentCostume.name} — {currentCostume.period}
            </div>
            <p className="text-stone-300 mt-1 leading-relaxed">{currentCostume.shortHistory}</p>
            <div className="mt-2 text-amber-300/90 italic">
              ✨ Ý nghĩa: {currentCostume.significance}
            </div>
          </div>
          <button
            onClick={() => onOpenEncyclopedia(currentCostume.id)}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-red-800/60 hover:bg-red-700/70 text-amber-100 border border-amber-500/30 text-xs transition-colors"
          >
            Đọc Chi Tiết
          </button>
        </div>
      </div>

      {/* 3. MÀU SẮC & Ý NGHĨA KHI RÊ CHUỘT (HOVER CARD) */}
      <div className="rounded-2xl border border-red-900/40 bg-[#180509]/90 backdrop-blur-md p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/30 mb-4">
          <div className="flex items-center gap-2.5">
            <Palette size={18} className="text-amber-400" />
            <h3 className="font-serif text-base font-bold text-amber-100">
              3. Sắc Phục Cổ Truyền (Ngũ Hành)
            </h3>
          </div>
          <span className="text-[11px] text-amber-300/90 italic flex items-center gap-1 font-sans">
            <HelpCircle size={13} />
            <span>Rê chuột để xem ý nghĩa màu sắc</span>
          </span>
        </div>

        {/* Color Swatches Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
          {COLOR_PALETTES.map((color) => {
            const isSelected = config.primaryColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.id}
                onClick={() => onUpdateConfig({ primaryColor: color.hex })}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
                className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-amber-300 bg-red-900/40 ring-2 ring-amber-400/50 shadow-md'
                    : 'border-red-900/20 bg-stone-900/40 hover:border-amber-400 hover:scale-105'
                }`}
                title={`${color.vietnameseName} - ${color.element}`}
              >
                <div
                  className="w-7 h-7 rounded-full border border-white/20 shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[9px] font-sans text-stone-300 line-clamp-1">
                  {color.name.split(' ')[0]}
                </span>
                <span className="text-[8px] px-1 rounded bg-stone-800 text-amber-300 font-sans">
                  {color.element}
                </span>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC HOVER CARD FOR COLOR MEANING */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/60 to-stone-900/60 border border-red-900/40 text-xs font-sans">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/30"
                style={{ backgroundColor: activeColor.hex }}
              />
              <span className="font-serif font-bold text-amber-200 text-sm">
                {activeColor.vietnameseName}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-900 text-amber-300 font-bold">
                Hành {activeColor.element}
              </span>
            </div>
            <span className="text-stone-400 text-[11px]">{activeColor.pantoneName}</span>
          </div>
          <p className="text-stone-200 leading-relaxed mt-1">
            {activeColor.meaning}
          </p>
        </div>

        {/* Pants Color Selection */}
        <div className="mt-4 pt-4 border-t border-red-900/30">
          <div className="text-xs font-semibold text-amber-200 mb-2 font-sans">
            Màu Quần / Váy Phối Kèm:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Trắng Bạch Ngọc', hex: '#F8FAFC' },
              { name: 'Đen Lãnh Mỹ A', hex: '#1E293B' },
              { name: 'Vàng Hoàng Kim', hex: '#D97706' },
              { name: 'Đỏ Son Cung Đình', hex: '#991B1B' },
              { name: 'Xanh Chàm Cổ', hex: '#1E3A8A' },
            ].map((pCol) => {
              const isSelected = config.pantsColor.toLowerCase() === pCol.hex.toLowerCase();
              return (
                <button
                  key={pCol.hex}
                  onClick={() => onUpdateConfig({ pantsColor: pCol.hex })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-sans transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-red-900/50 text-amber-200'
                      : 'border-red-900/30 bg-stone-900/50 text-stone-300 hover:border-red-700'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: pCol.hex }}
                  />
                  <span>{pCol.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. HOA VĂN CHI TIẾT & Ý NGHĨA KHI RÊ CHUỘT (HOVER CARD) */}
      <div className="rounded-2xl border border-red-900/40 bg-[#180509]/90 backdrop-blur-md p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-red-900/30 mb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-amber-400" />
            <h3 className="font-serif text-base font-bold text-amber-100">
              4. Hoa Văn & Họa Tiết Di Sản (Thổ Cẩm Tây Bắc, Đình Làng Mái Cong, Mái Nhà Tranh, Trống Đồng, Hoa Sen, Mai, Đào...)
            </h3>
          </div>
          <span className="text-[11px] text-amber-300/90 italic flex items-center gap-1 font-sans">
            <HelpCircle size={13} />
            <span>Rê chuột để xem nguồn gốc & ý nghĩa</span>
          </span>
        </div>

        {/* Pattern Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mb-4">
          {PATTERN_LIST.map((pattern) => {
            const isSelected =
              config.patternId === pattern.id ||
              (pattern.id === 'hoa_dao_xu_bac' && config.patternId.includes('hoa_dao'));
            return (
              <button
                key={pattern.id}
                onClick={() => onUpdateConfig({ patternId: pattern.id })}
                onMouseEnter={() => setHoveredPattern(pattern)}
                onMouseLeave={() => setHoveredPattern(null)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-red-900/50 text-amber-100 ring-1 ring-amber-400/40 shadow-md'
                    : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:border-amber-400 hover:bg-red-950/30'
                }`}
              >
                <div className="font-serif font-bold text-xs text-amber-200 mb-1 line-clamp-1">
                  {pattern.name}
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1 font-sans">
                  {pattern.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC HOVER CARD FOR PATTERN MEANING */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/70 to-stone-900/70 border border-amber-600/30 text-xs font-sans">
          <div className="flex items-center justify-between mb-1.5">
            <div className="font-serif font-bold text-amber-200 text-sm flex items-center gap-2">
              <Sparkles size={15} className="text-amber-400" />
              <span>{activePattern.name}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
              Hoa Văn Di Sản
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed mb-2">
            <strong>Mô tả:</strong> {activePattern.description}
          </p>
          <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-900/30 text-amber-100 italic leading-relaxed">
            "{activePattern.symbolism}"
          </div>
        </div>

        {/* FABRIC SELECTION (HIỆU ỨNG CHẤT VẢI) */}
        <div className="mt-5 pt-4 border-t border-red-900/30">
          <div className="text-xs font-semibold text-amber-200 mb-2 font-sans flex items-center justify-between">
            <span>Chất Liệu Vải Dệt Truyền Thống:</span>
            <span className="text-[11px] text-stone-400 italic">Rê chuột xem cảm giác sờ & độ bóng</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
            {FABRIC_LIST.map((fabric) => {
              const isSelected = config.fabricId === fabric.id;
              return (
                <button
                  key={fabric.id}
                  onClick={() => onUpdateConfig({ fabricId: fabric.id })}
                  onMouseEnter={() => setHoveredFabric(fabric)}
                  onMouseLeave={() => setHoveredFabric(null)}
                  className={`p-3 rounded-xl border text-left text-xs font-sans transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-red-900/50 text-amber-100 ring-1 ring-amber-400/40'
                      : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:border-amber-400'
                  }`}
                >
                  <div className="font-semibold text-amber-200 mb-0.5">{fabric.name}</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">{fabric.origin}</div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-stone-950/50 border border-red-900/30 text-xs font-sans text-stone-300">
            <strong className="text-amber-300">{activeFabric.name}:</strong> {activeFabric.description} —{' '}
            <span className="text-amber-200 italic">{activeFabric.suitability}</span>
          </div>
        </div>
      </div>

      {/* 5. PHỤ KIỆN TRUYỀN THỐNG & NÓN LÁ */}
      <div className="rounded-2xl border border-red-900/40 bg-[#180509]/90 backdrop-blur-md p-5 shadow-xl">
        <div className="flex items-center gap-2.5 pb-3 border-b border-red-900/30 mb-4">
          <NonLaIcon className="text-amber-400" size={20} />
          <h3 className="font-serif text-base font-bold text-amber-100">
            5. Nón Lá & Phụ Kiện Cổ Truyền
          </h3>
        </div>

        {/* NÓN LÁ */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-amber-300 mb-2 font-sans">
            Các Loại Nón Lá Di Sản:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ACCESSORIES_DATA.nonLa.map((nl) => {
              const isSelected = config.nonLa === nl.id;
              return (
                <button
                  key={nl.id}
                  onClick={() => onUpdateConfig({ nonLa: nl.id as NonLaType })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-red-900/50 text-amber-100 ring-1 ring-amber-400/40'
                      : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:bg-red-950/30'
                  }`}
                >
                  <div className="font-serif font-bold text-xs text-amber-200 mb-1 flex items-center justify-between">
                    <span>{nl.name}</span>
                    {isSelected && <span className="text-amber-400 text-xs">✓</span>}
                  </div>
                  <div className="text-[11px] text-stone-400 line-clamp-2 font-sans">
                    {nl.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACCESSORY CODES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-red-900/30 font-sans">
          <div>
            <div className="text-xs font-semibold text-amber-200 mb-2">Khăn Đội Đầu:</div>
            <div className="space-y-1.5">
              {ACCESSORIES_DATA.headwear.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateConfig({ headwear: item.id as HeadwearType })}
                  className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                    config.headwear === item.id
                      ? 'border-amber-400 bg-red-900/50 text-amber-200 font-medium'
                      : 'border-red-900/20 bg-stone-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="line-clamp-1">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-amber-200 mb-2">Phụ Kiện Cầm Tay:</div>
            <div className="space-y-1.5">
              {ACCESSORIES_DATA.handAccessory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateConfig({ handAccessory: item.id as AccessoryHandType })}
                  className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                    config.handAccessory === item.id
                      ? 'border-amber-400 bg-red-900/50 text-amber-200 font-medium'
                      : 'border-red-900/20 bg-stone-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="line-clamp-1">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-amber-200 mb-2">Trang Sức Cổ Truyền:</div>
            <div className="space-y-1.5 mb-3">
              {ACCESSORIES_DATA.jewelry.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateConfig({ jewelry: item.id as JewelryType })}
                  className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                    config.jewelry === item.id
                      ? 'border-amber-400 bg-red-900/50 text-amber-200 font-medium'
                      : 'border-red-900/20 bg-stone-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="line-clamp-1">{item.name}</div>
                </button>
              ))}
            </div>

            <div className="text-xs font-semibold text-amber-200 mb-2">Hài Thêu & Guốc Mộc:</div>
            <div className="space-y-1.5">
              {ACCESSORIES_DATA.footwear.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onUpdateConfig({ footwear: item.id as FootwearType })}
                  className={`w-full p-2 rounded-lg border text-left text-xs transition-all ${
                    config.footwear === item.id
                      ? 'border-amber-400 bg-red-900/50 text-amber-200 font-medium'
                      : 'border-red-900/20 bg-stone-900/30 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="line-clamp-1">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
