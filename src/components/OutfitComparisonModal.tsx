/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OutfitConfiguration, CostumeId } from '../types/vietnamAttire';
import { TRADITIONAL_COSTUMES, COLOR_PALETTES, ACCESSORIES_DATA, validateCulturalAccuracy } from '../data/attireData';
import { X, ArrowRightLeft, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { RedSealStamp } from './VietnamesePatternDecor';

interface OutfitComparisonModalProps {
  currentConfig: OutfitConfiguration;
  isOpen: boolean;
  onClose: () => void;
  onApplyConfig: (config: OutfitConfiguration) => void;
}

export const OutfitComparisonModal: React.FC<OutfitComparisonModalProps> = ({
  currentConfig,
  isOpen,
  onClose,
  onApplyConfig,
}) => {
  // Option B defaults to another costume (e.g. Ao Nhat Binh or Ao Tac)
  const defaultOptionB: OutfitConfiguration = {
    costumeId: currentConfig.costumeId === 'ao_tac_ngu_than' ? 'ao_nhat_binh' : 'ao_tac_ngu_than',
    gender: currentConfig.gender,
    primaryColor: '#DC2626',
    secondaryColor: '#D97706',
    pantsColor: '#F8FAFC',
    fabricId: 'gam_to_tam',
    patternId: 'van_may_thuy_ba',
    nonLa: 'none',
    headwear: currentConfig.gender === 'nu' ? 'khan_vanh_day' : 'khan_dong_nam',
    handAccessory: 'quat_lua_theu',
    jewelry: 'the_bai_hoang_gia',
    footwear: 'hai_theu_cung_dinh',
    selectedEvent: 'cuoi_hoi_truyen_thong',
    selectedRegion: 'trung_bo',
    selectedStyle: 'hoang_gia_quy_phai',
    selectedBackdrop: currentConfig.selectedBackdrop || 'dai_noi_hue',
    avatarModel: currentConfig.avatarModel,
  };

  const [optionA, setOptionA] = useState<OutfitConfiguration>(currentConfig);
  const [optionB, setOptionB] = useState<OutfitConfiguration>(defaultOptionB);

  if (!isOpen) return null;

  const costumeA = TRADITIONAL_COSTUMES.find((c) => c.id === optionA.costumeId)!;
  const costumeB = TRADITIONAL_COSTUMES.find((c) => c.id === optionB.costumeId)!;

  const checkA = validateCulturalAccuracy(optionA);
  const checkB = validateCulturalAccuracy(optionB);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl border border-red-800/60 bg-[#1a0508] text-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-950 via-red-900 to-[#1a0508] border-b border-red-800/40">
          <div className="flex items-center gap-3">
            <ArrowRightLeft className="text-amber-400" size={20} />
            <h2 className="font-serif text-lg font-bold text-amber-200">
              So Sánh Các Phương Án Phối Đồ
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900/60 text-stone-300 hover:text-white border border-red-900/40"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* COLUMN A */}
            <div className="p-5 rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#24060a] to-[#160306] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-red-900/60 text-amber-300 text-xs font-semibold font-sans">
                    Phương Án A (Hiện Tại)
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-serif">
                    <ShieldCheck size={14} />
                    <span>{checkA.score}% Chuẩn Lễ</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-amber-100 mb-1">{costumeA.name}</h3>
                <p className="text-xs text-stone-400 font-sans mb-4">{costumeA.period}</p>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Sắc Phục:</span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: optionA.primaryColor }}
                      />
                      <span className="font-medium text-stone-200">
                        {COLOR_PALETTES.find((c) => c.hex.toLowerCase() === optionA.primaryColor.toLowerCase())?.vietnameseName}
                      </span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Nón Lá / Khăn:</span>
                    <span className="text-amber-300 font-medium">
                      {ACCESSORIES_DATA.nonLa.find((n) => n.id === optionA.nonLa)?.name || 'Không dùng'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Ngũ Hành:</span>
                    <span className="text-emerald-300 font-medium">
                      {checkA.elementalHarmony.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30 text-stone-300 text-xs leading-relaxed">
                    <strong className="text-amber-200 block mb-1">Đánh giá bối cảnh:</strong>
                    {costumeA.significance}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onApplyConfig(optionA);
                  onClose();
                }}
                className="mt-5 w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-all shadow-md"
              >
                Giữ Nguyên Phương Án A
              </button>
            </div>

            {/* COLUMN B */}
            <div className="p-5 rounded-xl border border-red-900/40 bg-gradient-to-b from-[#1f0508] to-[#120204] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 text-xs font-semibold font-sans">
                    Phương Án B (Phương Án Khác)
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-serif">
                    <ShieldCheck size={14} />
                    <span>{checkB.score}% Chuẩn Lễ</span>
                  </div>
                </div>

                {/* Change Costume for Option B */}
                <div className="mb-3">
                  <select
                    value={optionB.costumeId}
                    onChange={(e) =>
                      setOptionB({
                        ...optionB,
                        costumeId: e.target.value as CostumeId,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-red-900/40 text-amber-200 font-serif font-bold text-sm focus:outline-none"
                  >
                    {TRADITIONAL_COSTUMES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-stone-400 font-sans mb-4">{costumeB.period}</p>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs font-sans">
                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Sắc Phục:</span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: optionB.primaryColor }}
                      />
                      <span className="font-medium text-stone-200">
                        {COLOR_PALETTES.find((c) => c.hex.toLowerCase() === optionB.primaryColor.toLowerCase())?.vietnameseName}
                      </span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Nón Lá / Khăn:</span>
                    <span className="text-amber-300 font-medium">
                      {ACCESSORIES_DATA.nonLa.find((n) => n.id === optionB.nonLa)?.name || 'Không dùng'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950/40 border border-red-950 flex items-center justify-between">
                    <span className="text-stone-400">Ngũ Hành:</span>
                    <span className="text-emerald-300 font-medium">
                      {checkB.elementalHarmony.status}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30 text-stone-300 text-xs leading-relaxed">
                    <strong className="text-amber-200 block mb-1">Đánh giá bối cảnh:</strong>
                    {costumeB.significance}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onApplyConfig(optionB);
                  onClose();
                }}
                className="mt-5 w-full py-2.5 rounded-lg bg-gradient-to-r from-red-700 to-amber-700 hover:brightness-110 text-amber-100 font-bold text-xs transition-all shadow-md"
              >
                Áp Dụng Phương Án B Vào Phòng Thử
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
