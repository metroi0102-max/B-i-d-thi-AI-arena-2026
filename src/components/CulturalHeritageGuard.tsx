/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OutfitConfiguration, CulturalCheckResult } from '../types/vietnamAttire';
import { validateCulturalAccuracy } from '../data/attireData';
import { ShieldCheck, AlertTriangle, Lightbulb, CheckCircle2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface CulturalHeritageGuardProps {
  config: OutfitConfiguration;
}

export const CulturalHeritageGuard: React.FC<CulturalHeritageGuardProps> = ({ config }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const result: CulturalCheckResult = validateCulturalAccuracy(config);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';
    if (score >= 70) return 'text-amber-400 border-amber-500/40 bg-amber-950/30';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/30';
  };

  return (
    <div className="w-full rounded-2xl border border-red-900/40 bg-[#1a060a]/90 backdrop-blur-md p-5 shadow-xl">
      {/* Title & Score Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-red-900/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-900/40 text-amber-300 border border-red-700/50">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-amber-100 flex items-center gap-2">
              Bộ Lọc Di Sản & Thẩm Mỹ Cổ Phong
            </h3>
            <p className="text-xs text-stone-400 font-sans">
              Bảo vệ tính chuẩn mực lịch sử & hướng dẫn phối đồ chuẩn văn hóa cho học sinh, sinh viên
            </p>
          </div>
        </div>

        {/* Accuracy Score & Toggle Button */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-stone-400 uppercase tracking-wider font-sans">Độ Chuẩn Quy Thức</div>
            <div className="text-xl font-bold font-serif tabular-nums text-amber-300">
              {result.score}%
            </div>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider font-sans ${getScoreColor(
              result.score
            )}`}
          >
            {result.score >= 90 ? 'Chuẩn Cổ Lễ' : result.score >= 70 ? 'Hòa Hợp' : 'Cần Chỉnh Phối'}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg bg-stone-900/60 border border-red-900/40 text-stone-300 hover:text-amber-200"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Elemental Harmony (Ngũ Hành Tương Sinh) */}
      <div className="mt-4 p-3.5 rounded-xl bg-red-950/30 border border-red-900/30 flex items-start gap-3">
        <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-300 mt-0.5 shrink-0">
          <Sparkles size={16} />
        </div>
        <div className="text-xs">
          <div className="font-semibold text-amber-200 mb-0.5 flex items-center gap-2">
            <span>Ngũ Hành Màu Sắc:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                result.elementalHarmony.status === 'Tương Sinh'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                  : result.elementalHarmony.status === 'Hòa Hợp'
                  ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                  : 'bg-rose-900/60 text-rose-300 border border-rose-700/50'
              }`}
            >
              {result.elementalHarmony.status}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed">{result.elementalHarmony.explanation}</p>
        </div>
      </div>

      {/* Warnings & Cultural Advices */}
      <div className="mt-4 space-y-2.5">
        {result.notices.map((notice, index) => {
          if (notice.type === 'warning') {
            return (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 flex items-start gap-3"
              >
                <div className="p-1.5 rounded-md bg-rose-800/40 text-rose-300 mt-0.5 shrink-0">
                  <AlertTriangle size={16} />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-rose-200 mb-0.5 font-serif">{notice.title}</h4>
                  <p className="text-rose-100/90 leading-relaxed font-sans">{notice.message}</p>
                </div>
              </div>
            );
          }
          if (notice.type === 'success') {
            return (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-3"
              >
                <div className="p-1.5 rounded-md bg-emerald-800/40 text-emerald-300 mt-0.5 shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div className="text-xs">
                  <h4 className="font-semibold text-emerald-200 mb-0.5 font-serif">{notice.title}</h4>
                  <p className="text-emerald-100/90 leading-relaxed font-sans">{notice.message}</p>
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3"
            >
              <div className="p-1.5 rounded-md bg-amber-800/40 text-amber-300 mt-0.5 shrink-0">
                <Lightbulb size={16} />
              </div>
              <div className="text-xs">
                <h4 className="font-semibold text-amber-200 mb-0.5 font-serif">{notice.title}</h4>
                <p className="text-amber-100/90 leading-relaxed font-sans">{notice.message}</p>
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
};
