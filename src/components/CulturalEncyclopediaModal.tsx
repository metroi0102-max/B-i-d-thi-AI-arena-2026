/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CostumeId, TraditionalCostume } from '../types/vietnamAttire';
import { TRADITIONAL_COSTUMES } from '../data/attireData';
import { X, BookOpen, Clock, MapPin, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { NonLaIcon, RedSealStamp } from './VietnamesePatternDecor';

interface CulturalEncyclopediaModalProps {
  costumeId: CostumeId;
  isOpen: boolean;
  onClose: () => void;
  onSelectCostume?: (id: CostumeId) => void;
}

export const CulturalEncyclopediaModal: React.FC<CulturalEncyclopediaModalProps> = ({
  costumeId,
  isOpen,
  onClose,
  onSelectCostume,
}) => {
  if (!isOpen) return null;

  const costume = TRADITIONAL_COSTUMES.find((c) => c.id === costumeId) || TRADITIONAL_COSTUMES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-red-800/60 bg-[#190508] text-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-950 via-red-900 to-[#190508] border-b border-red-800/40">
          <div className="flex items-center gap-3">
            <RedSealStamp text="DI SẢN" subText="CỔ PHỤC" />
            <div>
              <h2 className="font-serif text-xl font-bold text-amber-200">{costume.name}</h2>
              <p className="text-xs text-stone-400 font-sans">{costume.subTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900/60 text-stone-300 hover:text-white border border-red-900/40 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 font-sans">
          {/* Metadata Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-900/40 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <Clock size={16} className="text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-200">Niên Đại:</strong> {costume.period}
              </span>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <MapPin size={16} className="text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-200">Không Gian Văn Hóa:</strong> {costume.origin}
              </span>
            </div>
          </div>

          {/* Short History & Background */}
          <div>
            <h3 className="font-serif text-base font-bold text-amber-200 mb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              <span>Nguồn Gốc & Bối Cảnh Lịch Sử</span>
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed bg-stone-950/40 p-4 rounded-xl border border-red-950">
              {costume.shortHistory}
            </p>
          </div>

          {/* Structural Details Grid */}
          <div>
            <h3 className="font-serif text-base font-bold text-amber-200 mb-2.5 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              <span>Đặc Điểm Cấu Trúc Y Phục</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30">
                <span className="font-semibold text-amber-300 block mb-1">Cổ Áo:</span>
                <span className="text-stone-300 leading-normal">
                  {costume.structuralDetails.collar}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30">
                <span className="font-semibold text-amber-300 block mb-1">Tay Áo:</span>
                <span className="text-stone-300 leading-normal">
                  {costume.structuralDetails.sleeves}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30">
                <span className="font-semibold text-amber-300 block mb-1">Thân & Tà Áo:</span>
                <span className="text-stone-300 leading-normal">
                  {costume.structuralDetails.panels}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/30">
                <span className="font-semibold text-amber-300 block mb-1">Quy Cách Khuy Cúc:</span>
                <span className="text-stone-300 leading-normal">
                  {costume.structuralDetails.buttons}
                </span>
              </div>
            </div>
          </div>

          {/* Cultural Symbolism */}
          <div>
            <h3 className="font-serif text-base font-bold text-amber-200 mb-2">
              Ý Nghĩa Biểu Trưng & Triết Lý Dân Tộc
            </h3>
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/30 text-amber-100 text-xs leading-relaxed italic">
              "{costume.significance}"
            </div>
          </div>

          {/* Rules & Incompatibilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-serif text-sm font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>Quy Chuẩn Khi Mặc</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {costume.culturalRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-sm font-bold text-rose-300 mb-2 flex items-center gap-1.5">
                <ShieldAlert size={15} />
                <span>Những Sai Lệch Cần Tránh</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {costume.incompatibleAccessories.map((incomp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400">✕</span>
                    <span>{incomp.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Switch to Other Costumes */}
          <div className="pt-4 border-t border-red-900/30">
            <div className="text-xs text-stone-400 mb-2">Khám phá các trang phục khác:</div>
            <div className="flex flex-wrap gap-2">
              {TRADITIONAL_COSTUMES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectCostume && onSelectCostume(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${
                    item.id === costume.id
                      ? 'bg-amber-400 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-300 hover:bg-red-950 border border-red-900/30'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#140306] border-t border-red-900/40 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-sans italic">
            Nguồn: Khâm định Đại Nam hội điển sự lệ & Viện Nghiên cứu Cổ phục Việt Nam
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-red-800 text-amber-100 hover:bg-red-700 text-xs font-semibold font-sans transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
