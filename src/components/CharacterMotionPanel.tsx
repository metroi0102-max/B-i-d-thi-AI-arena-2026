/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MotionMode, CameraAngle } from '../types/vietnamAttire';
import { Play, Pause, RotateCw, Hand, Shield, Compass, Sparkles, Fan, Eye } from 'lucide-react';
import { NonLaIcon } from './VietnamesePatternDecor';

interface CharacterMotionPanelProps {
  motionMode: MotionMode;
  onSelectMotion: (mode: MotionMode) => void;
  rotationAngle: number;
  onChangeRotation: (angle: number) => void;
  isAutoRotating: boolean;
  onToggleAutoRotate: () => void;
  rotationSpeed: 'slow' | 'normal' | 'fast';
  onChangeSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
}

export const CharacterMotionPanel: React.FC<CharacterMotionPanelProps> = ({
  motionMode,
  onSelectMotion,
  rotationAngle,
  onChangeRotation,
  isAutoRotating,
  onToggleAutoRotate,
  rotationSpeed,
  onChangeSpeed,
}) => {
  const getAngleLabel = (angle: number): string => {
    const norm = ((angle % 360) + 360) % 360;
    if (norm >= 337.5 || norm < 22.5) return 'Mặt trước (0°)';
    if (norm >= 22.5 && norm < 67.5) return 'Chếch phải 45° (Góc 3/4)';
    if (norm >= 67.5 && norm < 112.5) return 'Nghiêng phải 90° (Góc cạnh)';
    if (norm >= 112.5 && norm < 157.5) return 'Sau lưng phải 135°';
    if (norm >= 157.5 && norm < 202.5) return 'Sau lưng 180° (Chiêm ngưỡng lưng áo)';
    if (norm >= 202.5 && norm < 247.5) return 'Sau lưng trái 225°';
    if (norm >= 247.5 && norm < 292.5) return 'Nghiêng trái 270° (Góc cạnh)';
    return 'Chếch trái 315° (Góc 3/4)';
  };

  const QUICK_ANGLES: { angle: CameraAngle; label: string; desc: string }[] = [
    { angle: 0, label: 'Mặt Trước 0°', desc: 'Ngắm vạt trước, khuy ngũ thường, cổ áo' },
    { angle: 45, label: 'Chếch 45°', desc: 'Ngắm góc 3/4, độ thụng tay áo' },
    { angle: 90, label: 'Nghiêng 90°', desc: 'Ngắm độ rủ mềm mại của tà áo' },
    { angle: 180, label: 'Sau Lưng 180°', desc: 'Ngắm can sống lưng & hoa văn sau' },
    { angle: 270, label: 'Nghiêng 270°', desc: 'Ngắm góc nhìn đối xứng trái' },
  ];

  return (
    <div className="w-full rounded-2xl border border-red-900/50 bg-[#180509]/95 backdrop-blur-md p-5 shadow-2xl space-y-5 font-sans">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-red-900/40 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-900/70 to-amber-900/40 border border-amber-500/40 text-amber-300 shadow-md">
            <Compass size={20} className="animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
              <span>Bảng Điều Khiển Cử Động Của Nhân Vật</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider font-sans font-semibold">
                3D Không Gian
              </span>
            </h3>
            <p className="text-xs text-stone-300 mt-0.5">
              Chọn cử chỉ chào hỏi, đứng nghiêm hoặc xoay tròn 360° để ngắm trang phục từ mọi góc độ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-stone-400">Góc hiện tại:</span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-amber-500/40 text-amber-300 font-serif font-bold text-xs shadow-inner">
            {Math.round(rotationAngle % 360)}°
          </span>
        </div>
      </div>

      {/* 2. Trạng thái cử động chính: Chào hỏi, Đứng nghiêm, Xoay tròn */}
      <div>
        <div className="text-xs font-semibold text-amber-200 mb-2.5 flex items-center justify-between">
          <span>Trạng Thái Cử Động Của Nhân Vật:</span>
          <span className="text-[11px] text-stone-400 italic">Nhấp để xem nhân vật chuyển động</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Nút 1: CHÀO HỎI */}
          <button
            onClick={() => onSelectMotion('chao_hoi')}
            className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
              motionMode === 'chao_hoi'
                ? 'border-amber-400 bg-gradient-to-br from-red-900/70 to-amber-950/80 text-amber-100 shadow-lg ring-1 ring-amber-400/50'
                : 'border-red-900/30 bg-stone-900/50 hover:bg-red-950/40 text-stone-300 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${motionMode === 'chao_hoi' ? 'bg-amber-500 text-stone-950' : 'bg-red-950 text-amber-300'}`}>
                  <Hand size={16} />
                </div>
                <span className="font-serif font-bold text-sm text-amber-200">Chào Hỏi</span>
              </div>
              {motionMode === 'chao_hoi' && <span className="text-xs text-amber-400 font-bold">Đang bật</span>}
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              Chắp hai tay cung kính trước ngực, cúi đầu nhẹ theo chuẩn mực cổ lễ truyền thống Việt Nam.
            </p>
          </button>

          {/* Nút 2: ĐỨNG NGHIÊM */}
          <button
            onClick={() => onSelectMotion('dung_nghiem')}
            className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
              motionMode === 'dung_nghiem'
                ? 'border-amber-400 bg-gradient-to-br from-red-900/70 to-amber-950/80 text-amber-100 shadow-lg ring-1 ring-amber-400/50'
                : 'border-red-900/30 bg-stone-900/50 hover:bg-red-950/40 text-stone-300 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${motionMode === 'dung_nghiem' ? 'bg-amber-500 text-stone-950' : 'bg-red-950 text-amber-300'}`}>
                  <Shield size={16} />
                </div>
                <span className="font-serif font-bold text-sm text-amber-200">Đứng Nghiêm</span>
              </div>
              {motionMode === 'dung_nghiem' && <span className="text-xs text-amber-400 font-bold">Đang bật</span>}
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              Dáng đứng tôn nghiêm, hai vai mở rộng hiên ngang, vạt áo buông rủ thẳng nếp sắc sảo đĩnh đạc.
            </p>
          </button>

          {/* Nút 3: XOAY TRÒN 360° */}
          <button
            onClick={() => onSelectMotion('xoay_tron')}
            className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
              motionMode === 'xoay_tron'
                ? 'border-amber-400 bg-gradient-to-br from-red-900/70 to-amber-950/80 text-amber-100 shadow-lg ring-1 ring-amber-400/50'
                : 'border-red-900/30 bg-stone-900/50 hover:bg-red-950/40 text-stone-300 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${motionMode === 'xoay_tron' ? 'bg-amber-500 text-stone-950' : 'bg-red-950 text-amber-300'}`}>
                  <RotateCw size={16} className={isAutoRotating ? 'animate-spin' : ''} />
                </div>
                <span className="font-serif font-bold text-sm text-amber-200">Xoay Tròn 360°</span>
              </div>
              {motionMode === 'xoay_tron' && <span className="text-xs text-amber-400 font-bold">Đang xoay</span>}
            </div>
            <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
              Tự động xoay tròn 360° liên tục trên đài sen để ngắm trọn vẹn cả vạt trước, góc nghiêng và sau lưng áo.
            </p>
          </button>
        </div>

        {/* Các cử chỉ phụ duyên dáng */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-red-900/30 text-xs">
          <span className="text-stone-400 font-sans">Cử chỉ phụ:</span>
          <button
            onClick={() => onSelectMotion('cam_quat')}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
              motionMode === 'cam_quat'
                ? 'border-amber-400 bg-red-900/60 text-amber-200 font-semibold shadow'
                : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:text-amber-200'
            }`}
          >
            <Fan size={13} className="text-amber-400" />
            <span>Cầm quạt e ấp</span>
          </button>
        </div>
      </div>

      {/* 3. Chọn nhanh góc nhìn 3D (Xem chi tiết từng mặt) */}
      <div className="pt-2">
        <div className="text-xs font-semibold text-amber-200 mb-2.5 flex items-center justify-between">
          <span>Xem Chi Tiết Trang Phục Từ Nhiều Góc Độ:</span>
          <span className="text-[11px] text-amber-300/80 font-medium">{getAngleLabel(rotationAngle)}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {QUICK_ANGLES.map((qa) => {
            const isCurrent = Math.abs((((rotationAngle % 360) + 360) % 360) - qa.angle) < 22.5;
            return (
              <button
                key={qa.angle}
                onClick={() => {
                  onChangeRotation(qa.angle);
                  if (motionMode === 'xoay_tron') onSelectMotion('dung_nghiem');
                }}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'border-amber-400 bg-gradient-to-b from-red-900/70 to-red-950/80 text-amber-200 shadow-md ring-1 ring-amber-400/40'
                    : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:bg-red-950/30 hover:border-amber-500/40'
                }`}
              >
                <div className="font-serif font-bold text-xs text-amber-200 mb-0.5">{qa.label}</div>
                <div className="text-[10px] text-stone-400 line-clamp-1 font-sans">{qa.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Thanh trượt góc xoay 3D (Turntable Slider & Controls) */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/50 via-stone-900/60 to-red-950/50 border border-red-900/40 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleAutoRotate}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-sans font-semibold transition-all shadow ${
                isAutoRotating
                  ? 'bg-amber-600 text-stone-950 border-amber-400'
                  : 'bg-stone-900/80 text-amber-200 border-red-900/50 hover:bg-stone-800'
              }`}
            >
              {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
              <span>{isAutoRotating ? 'Tạm Dừng Xoay' : 'Tự Động Xoay 360°'}</span>
            </button>

            {/* Tốc độ quay */}
            {isAutoRotating && (
              <div className="flex items-center bg-stone-900/90 p-0.5 rounded-lg border border-red-900/40 text-[11px]">
                {(['slow', 'normal', 'fast'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onChangeSpeed(spd)}
                    className={`px-2 py-0.5 rounded capitalize ${
                      rotationSpeed === spd
                        ? 'bg-red-800 text-amber-100 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {spd === 'slow' ? 'Chậm' : spd === 'normal' ? 'Vừa' : 'Nhanh'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="text-stone-300 text-xs flex items-center gap-1.5">
            <Eye size={13} className="text-amber-400" />
            <span className="font-serif font-bold text-amber-200">{getAngleLabel(rotationAngle)}</span>
          </div>
        </div>

        {/* Thanh trượt xoay 3D từ 0° đến 360° */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-stone-400">0°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round(((rotationAngle % 360) + 360) % 360)}
            onChange={(e) => {
              onChangeRotation(Number(e.target.value));
              if (motionMode === 'xoay_tron') onSelectMotion('dung_nghiem');
            }}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
          />
          <span className="text-[11px] text-stone-400">360°</span>
        </div>

        <p className="text-[11px] text-stone-400 text-center italic">
          💡 Bạn có thể dùng chuột kéo trực tiếp trên nhân vật để xoay 360° tự do hoặc dùng thanh trượt trên.
        </p>
      </div>
    </div>
  );
};
