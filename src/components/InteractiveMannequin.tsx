/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { OutfitConfiguration, MotionMode, BackdropId } from '../types/vietnamAttire';
import { BACKDROPS_DATA, PATTERN_LIST, FABRIC_LIST } from '../data/attireData';
import { RedSealStamp, NonLaIcon } from './VietnamesePatternDecor';
import {
  Upload,
  Eye,
  Sparkles,
  Hand,
  Shield,
  RotateCw,
  Play,
  Pause,
  Fan,
  Music,
  Disc3,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  FOLK_TRACKS,
  useFolkMusicState,
  dispatchFolkMusicCmd,
} from './TraditionalFolkMusicPlayer';

interface InteractiveMannequinProps {
  config: OutfitConfiguration;
  onUpdateConfig: (partial: Partial<OutfitConfiguration>) => void;
  onOpenLookbook: () => void;
  motionMode?: MotionMode;
  onSelectMotion?: (mode: MotionMode) => void;
  rotationAngle?: number;
  onChangeRotation?: (angle: number) => void;
  isAutoRotating?: boolean;
  onToggleAutoRotate?: () => void;
}

export const InteractiveMannequin: React.FC<InteractiveMannequinProps> = ({
  config,
  onUpdateConfig,
  onOpenLookbook,
  motionMode: externalMotionMode,
  onSelectMotion: externalOnSelectMotion,
  rotationAngle: externalRotationAngle,
  onChangeRotation: externalOnChangeRotation,
  isAutoRotating: externalIsAutoRotating,
  onToggleAutoRotate: externalOnToggleAutoRotate,
}) => {
  const [viewMode, setViewMode] = useState<'landscape' | 'portrait'>('landscape');
  const [internalMotionMode, setInternalMotionMode] = useState<MotionMode>('dung_nghiem');
  const [internalRotationAngle, setInternalRotationAngle] = useState<number>(0);
  const [internalIsAutoRotating, setInternalIsAutoRotating] = useState<boolean>(false);

  const motionMode = externalMotionMode !== undefined ? externalMotionMode : internalMotionMode;
  const setMotionMode = externalOnSelectMotion || setInternalMotionMode;

  const rotationAngle = externalRotationAngle !== undefined ? externalRotationAngle : internalRotationAngle;
  const setRotationAngle = externalOnChangeRotation || setInternalRotationAngle;

  const isAutoRotating = externalIsAutoRotating !== undefined ? externalIsAutoRotating : internalIsAutoRotating;
  const toggleAutoRotate = externalOnToggleAutoRotate || (() => setInternalIsAutoRotating((prev) => !prev));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);

  const backdrop = config.selectedBackdrop || 'dai_noi_hue';
  const isFemale = config.gender === 'nu';

  const folkMusic = useFolkMusicState();
  const recommendedTrackId = React.useMemo(() => {
    if (config.costumeId === 'trang_phuc_hmong' || backdrop === 'tay_bac_ruong_bac_thang') return 'sao_hmong_goi_ban';
    if (config.costumeId === 'ao_tu_than') return 'cay_truc_xinh';
    if (config.costumeId === 'ao_ba_ba') return 'ly_ngua_o';
    if (config.costumeId === 'ao_nhat_binh' || config.costumeId === 'ao_tac_ngu_than' || backdrop === 'dai_noi_hue') return 'luu_thuy_kim_tien';
    if (backdrop === 'dinh_lang_mai_cong') return 'trong_com';
    if (backdrop === 'van_mieu_thang_long') return 'beo_dat_may_troi';
    return 'hon_dan_bau';
  }, [config.costumeId, backdrop]);

  const angleRef = useRef<number>(rotationAngle);
  useEffect(() => {
    angleRef.current = rotationAngle;
  }, [rotationAngle]);

  const updateAngle = useCallback(
    (delta: number) => {
      const next = ((angleRef.current + delta) % 360 + 360) % 360;
      angleRef.current = next;
      setRotationAngle(next);
    },
    [setRotationAngle]
  );

  // 360° Smooth rotation animation
  useEffect(() => {
    let animId: number;
    if (isAutoRotating || motionMode === 'xoay_tron') {
      const step = () => {
        updateAngle(0.6);
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isAutoRotating, motionMode, updateAngle]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    if (isAutoRotating) toggleAutoRotate();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;
      updateAngle(deltaX * 0.7);
    },
    [updateAngle]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.touches[0].clientX;
      if (isAutoRotating) toggleAutoRotate();
    }
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.touches[0].clientX;
      updateAngle(deltaX * 0.7);
    },
    [updateAngle]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdateConfig({
            avatarModel: 'custom_upload',
            customAvatarUrl: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const primaryFill = config.primaryColor || '#991B1B';
  const secondaryFill = config.secondaryColor || '#D97706';
  const pantsFill = config.pantsColor || '#FFFFFF';

  const currentPattern =
    PATTERN_LIST.find((p) => p.id === config.patternId) || PATTERN_LIST[0];
  const currentFabric = FABRIC_LIST.find((f) => f.id === config.fabricId) || FABRIC_LIST[0];

  // Perspective trigonometry
  const angleNorm = ((rotationAngle % 360) + 360) % 360;
  const rad = (angleNorm * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);

  // Back view is active when looking from behind (between 115° and 245°)
  const isBackView = angleNorm > 115 && angleNorm < 245;

  // Gentle parallax offset for backgrounds
  const parallaxX = -sinA * 28;

  // Resolve active SVG pattern URL with strict priority checking
  const getPatternUrl = () => {
    const pid = (config.patternId || '').toLowerCase();

    // 1. Hoa Sen Cung Đình (Đoàn Liên Hoa Hoàng Triều Lý - Nguyễn)
    if (pid === 'hoa_sen_cung_dinh' || pid.includes('sen')) return 'url(#pat-hoa-sen)';

    // 2. Họa tiết Cung đình, Kiến trúc & Thổ Cẩm
    if (pid === 'dinh_lang_mai_cong' || pid.includes('dinh_lang')) return 'url(#pat-dinh-lang-mai-cong)';
    if (pid === 'mai_nha_tranh' || pid === 'mai_nha_tranh_luy_tre' || pid.includes('nha_tranh') || pid.includes('mai_nha')) return 'url(#pat-mai-nha-tranh)';
    if (pid === 'trong_dong_dong_son' || pid.includes('dong_son') || pid.includes('trong_dong')) return 'url(#pat-dong-son)';
    if (pid === 'tho_cam_tay_bac' || pid.includes('tho_cam') || (pid.includes('hmong') && pid !== 'trang_phuc_hmong')) return 'url(#pat-tho-cam-hmong)';
    if (pid === 'van_hoi_van_ky_ha' || pid === 'hoi_van_cung_dinh' || pid.includes('hoi_van') || pid.includes('ky_ha')) return 'url(#pat-hoi-van)';

    // 3. Hoa lá thảo mộc & Thiên nhiên
    if (pid.includes('cuc')) return 'url(#pat-hoa-cuc)';
    if (pid.includes('mai_vang') || pid === 'hoa_mai_vang' || (pid.includes('mai') && !pid.includes('nha') && !pid.includes('cong'))) return 'url(#pat-hoa-mai)';
    if (pid.includes('dao')) return 'url(#pat-hoa-dao)';
    if (pid.includes('may')) return 'url(#pat-van-may)';
    if (pid.includes('thuy_ba') || pid.includes('song')) return 'url(#pat-thuy-ba)';
    if (pid.includes('truc')) return 'url(#pat-truc-quan-tu)';
    if (pid.includes('tre')) return 'url(#pat-luy-tre-lang)';

    // 4. Lụa trơn thanh lịch
    if (pid === 'tron_thanh_lich') return 'url(#pat-tron)';

    // 5. Mặc định cho đồ thổ cẩm H'Mông khi chưa chọn hoa văn riêng biệt
    if (config.costumeId === 'trang_phuc_hmong') return 'url(#pat-tho-cam-hmong)';

    return 'url(#pat-tron)';
  };
  const activePatUrl = getPatternUrl();

  return (
    <div
      ref={canvasContainerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="relative flex flex-col items-center justify-between w-full h-[580px] sm:h-[610px] rounded-2xl overflow-hidden border-2 border-red-800/60 bg-[#1a0508] shadow-2xl transition-all cursor-grab active:cursor-grabbing select-none"
    >
      {/* ========================================================================= */}
      {/* 1. SÁNG TƯƠI VÀ THOÁNG ĐÃNG: BỐI CẢNH 3D LỊCH SỬ KHÔNG BỊ NGƯỜI MẪU CHE   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-300">
        {/* ========================================================================= */}
        {/* BỐI CẢNH 1: ĐẠI NỘI HUẾ & CỐ ĐÔ HOÀNG GIA (Lầu Ngũ Phụng, Điện Thái Hòa, Kỳ Đài, Hồ Thái Dịch) */}
        {/* ========================================================================= */}
        {backdrop === 'dai_noi_hue' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#fef08a]/35 to-[#fed7aa]">
            <svg
              viewBox="0 0 600 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Bầu trời & Vầng thái dương rạng rỡ */}
              <circle cx="110" cy="65" r="46" fill="#fef08a" opacity="0.85" />
              <circle cx="110" cy="65" r="24" fill="#ffffff" opacity="0.95" />
              {/* Dải mây ngũ sắc hoàng cung */}
              <path d="M40 70 Q95 50 150 70 Q110 85 40 70 Z" fill="#ffffff" opacity="0.45" />
              <path d="M440 55 Q495 40 550 55 Q510 70 440 55 Z" fill="#ffffff" opacity="0.45" />
              <path d="M220 40 Q270 25 320 40 Q280 52 220 40 Z" fill="#ffffff" opacity="0.35" />

              {/* Dãy núi Ngự Bình xanh biếc điệp trùng mờ sương */}
              <path d="M-20 205 Q80 155 190 195 Q300 145 420 195 Q520 160 620 200 L620 270 L-20 270 Z" fill="#60a5fa" opacity="0.4" />
              <path d="M20 215 Q130 175 250 210 Q380 165 510 210 L510 270 L20 270 Z" fill="#93c5fd" opacity="0.45" />

              {/* Dòng sông Hương thơ mộng lững lờ trôi */}
              <rect x="0" y="235" width="600" height="45" fill="#38bdf8" opacity="0.6" />
              <path d="M0 252 Q150 244 300 252 Q450 260 600 252" stroke="#bae6fd" strokeWidth="1.5" fill="none" opacity="0.75" />
              <path d="M0 265 Q150 258 300 265 Q450 272 600 265" stroke="#e0f2fe" strokeWidth="1.2" fill="none" opacity="0.6" />

              {/* Sân Đại Triều Nghi lát gạch Bát Tràng men nâu son */}
              <rect x="0" y="278" width="600" height="242" fill="#881337" opacity="0.96" />
              <line x1="0" y1="278" x2="600" y2="278" stroke="#fde047" strokeWidth="3.5" />
              <line x1="0" y1="283" x2="600" y2="283" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Các đường chỉ gạch ngự đạo dẫn vào tâm đài sen */}
              {Array.from({ length: 17 }).map((_, i) => (
                <line
                  key={i}
                  x1={300 + (i - 8) * 22}
                  y1={283}
                  x2={300 + (i - 8) * 65}
                  y2={520}
                  stroke="#fbbf24"
                  strokeWidth="1.3"
                  opacity="0.38"
                />
              ))}
              {/* Thảm ngự đạo son viền vàng chính tâm */}
              <polygon points="265,283 335,283 370,520 230,520" fill="#991b1b" opacity="0.5" />
              <line x1="265" y1="283" x2="230" y2="520" stroke="#fde047" strokeWidth="1.8" opacity="0.6" />
              <line x1="335" y1="283" x2="370" y2="520" stroke="#fde047" strokeWidth="1.8" opacity="0.6" />

              {/* BÊN TRÁI: NGỌ MÔN ĐÀI ĐÁ THANH & HỒ SEN THÁI DỊCH */}
              {/* Thành đá Thanh sơn son */}
              <rect x="12" y="195" width="160" height="85" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.8" rx="2" />
              {/* 3 Cửa vòm Ngọ Môn */}
              <path d="M26 280 C26 242 54 242 54 280 Z" fill="#2d060a" stroke="#facc15" strokeWidth="1.8" />
              <path d="M72 280 C72 230 112 230 112 280 Z" fill="#2d060a" stroke="#facc15" strokeWidth="2.2" />
              <path d="M130 280 C130 242 158 242 158 280 Z" fill="#2d060a" stroke="#facc15" strokeWidth="1.8" />
              {/* Hồ sen Thái Dịch */}
              <ellipse cx="85" cy="275" rx="60" ry="12" fill="#0284c7" opacity="0.75" />
              <circle cx="55" cy="274" r="5" fill="#15803d" />
              <circle cx="95" cy="276" r="6" fill="#15803d" />
              <circle cx="75" cy="273" r="3.8" fill="#f43f5e" />
              <circle cx="112" cy="275" r="3.5" fill="#f43f5e" />
              <circle cx="130" cy="276" r="4.5" fill="#16a34a" />

              {/* BÊN PHẢI: KỲ ĐÀI HUẾ VỚI QUỐC KỲ NGŨ SẮC ĐẠI NAM */}
              {/* 3 Tầng bệ đá Kỳ Đài */}
              <polygon points="425,280 440,225 575,225 590,280" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" />
              <polygon points="450,225 460,185 555,185 565,225" fill="#991b1b" stroke="#fde047" strokeWidth="1.5" />
              <polygon points="475,185 482,160 532,160 540,185" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" />
              {/* Cột cờ Kỳ Đài vươn cao */}
              <line x1="507" y1="25" x2="507" y2="160" stroke="#fef08a" strokeWidth="4" />
              <circle cx="507" cy="23" r="4.5" fill="#eab308" stroke="#fde047" strokeWidth="1" />
              {/* Quốc kỳ Ngũ Sắc tung bay */}
              <polygon points="507,28 585,58 507,88" fill="#dc2626" stroke="#fde047" strokeWidth="2" />
              <polygon points="512,38 565,58 512,78" fill="#facc15" />
              <polygon points="517,46 548,58 517,70" fill="#15803d" />

              {/* CHÍNH TÂM ĐẰNG SAU NHÂN VẬT: ĐIỆN THÁI HÒA & LẦU NGŨ PHỤNG HOÀNG LƯU LY */}
              <g id="hue-imperial-palace-center">
                {/* Tầng mái ngói hoàng lưu ly vàng rực & thanh lưu ly xanh biếc */}
                <path d="M195 145 Q300 115 405 145 L392 162 Q300 135 208 162 Z" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
                <path d="M185 185 Q300 155 415 185 L402 202 Q300 175 198 202 Z" fill="#059669" stroke="#34d399" strokeWidth="2" />
                {/* Bờ nóc lưỡng long triều nguyệt chạm vàng */}
                <circle cx="300" cy="120" r="7" fill="#facc15" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="300" cy="120" r="3.5" fill="#dc2626" />
                <path d="M280 126 Q290 120 295 120" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M320 126 Q310 120 305 120" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Đầu đao hồi long 4 góc */}
                <path d="M195 145 C185 138 185 130 190 125" stroke="#facc15" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M405 145 C415 138 415 130 410 125" stroke="#facc15" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M185 185 C175 178 175 170 180 165" stroke="#facc15" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M415 185 C425 178 425 170 420 165" stroke="#facc15" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Thân điện son thiếp thếp vàng & bao lơn chữ Thọ */}
                <rect x="215" y="160" width="170" height="26" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" />
                <rect x="205" y="200" width="190" height="52" fill="#5c0d16" stroke="#fde047" strokeWidth="1.5" />
                {/* Cột gỗ lim son to lớn đỡ mái */}
                <rect x="220" y="200" width="10" height="52" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                <rect x="260" y="200" width="10" height="52" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                <rect x="330" y="200" width="10" height="52" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                <rect x="370" y="200" width="10" height="52" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                {/* Cửa sổ lá sách thếp vàng & hoa văn chữ Thọ */}
                <circle cx="300" cy="225" r="14" fill="none" stroke="#fde047" strokeWidth="1.8" />
                <path d="M293 225 H307 M300 218 V232" stroke="#fde047" strokeWidth="1.5" />

                {/* Đôi đèn lồng cung đình đỏ son rủ tua rua vàng hai bên */}
                <g transform="translate(200, 202)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#fde047" strokeWidth="1.5" />
                  <ellipse cx="0" cy="20" rx="8" ry="11" fill="#dc2626" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="0" y1="31" x2="0" y2="40" stroke="#facc15" strokeWidth="1.8" />
                </g>
                <g transform="translate(400, 202)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#fde047" strokeWidth="1.5" />
                  <ellipse cx="0" cy="20" rx="8" ry="11" fill="#dc2626" stroke="#fde047" strokeWidth="1.2" />
                  <line x1="0" y1="31" x2="0" y2="40" stroke="#facc15" strokeWidth="1.8" />
                </g>

                {/* Bậc thềm Cửu Long triều thiên rồng đá */}
                <path d="M225 252 L375 252 L395 280 L205 280 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M235 262 L365 262" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M245 272 L355 272" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Lan can chạm rồng đá thời Nguyễn */}
                <path d="M205 280 Q215 260 225 252" stroke="#fde047" strokeWidth="2.5" fill="none" />
                <path d="M395 280 Q385 260 375 252" stroke="#fde047" strokeWidth="2.5" fill="none" />
              </g>
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BỐI CẢNH 2: ĐÌNH LÀNG MÁI CONG & CÂY ĐA CỔ THỤ (Bắc Bộ, Ngói Mũi Hài, Lưỡng Long Triều Nguyệt) */}
        {/* ========================================================================= */}
        {backdrop === 'dinh_lang_mai_cong' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#fef3c7] to-[#fed7aa]">
            <svg
              viewBox="0 0 600 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Bầu trời trong xanh & đàn chim bồ câu chao liệng */}
              <circle cx="130" cy="65" r="44" fill="#fef08a" opacity="0.85" />
              <circle cx="130" cy="65" r="24" fill="#ffffff" opacity="0.95" />
              <path d="M210 65 Q218 57 226 65 Q234 57 242 65" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.65" />
              <path d="M235 80 Q241 73 247 80 Q253 73 259 80" stroke="#78350f" strokeWidth="1.3" fill="none" opacity="0.65" />

              {/* Sân đình lát gạch nghiêng Bát Tràng đỏ au */}
              <rect x="0" y="278" width="600" height="242" fill="#c2410c" opacity="0.96" />
              <line x1="0" y1="278" x2="600" y2="278" stroke="#fde047" strokeWidth="3.5" />
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1={300 + (i - 7.5) * 26}
                  y1={278}
                  x2={300 + (i - 7.5) * 76}
                  y2={520}
                  stroke="#fbbf24"
                  strokeWidth="1.3"
                  opacity="0.38"
                />
              ))}

              {/* BÊN TRÁI: CÂY ĐA CỔ THỤ TRĂM TUỔI & GIẾNG NGỌC ĐÁ ONG */}
              <g id="dinh-banyan-tree">
                {/* Thân cây đa sần sùi cổ thụ */}
                <path
                  d="M-20 280 C15 220 30 150 70 95 C115 60 155 85 135 140 C105 185 80 240 65 282"
                  stroke="#5c2d16"
                  strokeWidth="24"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Chùm rễ phụ buông rủ dài như rèm tơ */}
                <path d="M42 155 C35 200 30 245 25 280" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M65 175 C58 215 52 250 48 280" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M90 165 C85 205 82 245 80 280" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
                {/* Tán lá đa xanh ngát tầng tầng lớp lớp */}
                <circle cx="75" cy="70" r="48" fill="#15803d" opacity="0.95" />
                <circle cx="125" cy="80" r="44" fill="#166534" opacity="0.95" />
                <circle cx="50" cy="100" r="38" fill="#16a34a" opacity="0.9" />
                <circle cx="105" cy="55" r="36" fill="#22c55e" opacity="0.9" />

                {/* Giếng ngọc đá ong cổ truyền rêu phong */}
                <ellipse cx="65" cy="275" rx="42" ry="12" fill="#0284c7" opacity="0.8" />
                <ellipse cx="65" cy="275" rx="42" ry="12" fill="none" stroke="#78350f" strokeWidth="3.5" />
                <circle cx="48" cy="274" r="3.8" fill="#e11d48" />
                <circle cx="75" cy="273" r="3.2" fill="#e11d48" />
              </g>

              {/* BÊN PHẢI: CỘT ĐỒNG TRỤ TỨ PHƯỢNG & RẶNG TRE AO ĐÌNH */}
              <g id="dinh-pillars-right">
                {/* Cột đồng trụ đỉnh gắn tứ phượng uy nghiêm */}
                <rect x="440" y="185" width="16" height="95" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                <polygon points="440,185 448,168 456,185" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
                <rect x="540" y="185" width="16" height="95" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
                <polygon points="540,185 548,168 556,185" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
                {/* Rặng tre ao đình */}
                <path d="M570 280 C565 200 550 140 520 80" stroke="#15803d" strokeWidth="9" fill="none" strokeLinecap="round" />
                <ellipse cx="520" cy="80" rx="35" ry="12" fill="#4ade80" transform="rotate(-30 520 80)" />
              </g>

              {/* CHÍNH TÂM ĐẰNG SAU NHÂN VẬT: MÁI ĐẠI ĐÌNH BẮC BỘ ĐẦU ĐAO VÚT CONG */}
              <g id="dinh-lang-center-sanctuary">
                {/* Mái đình ngói mũi hài rêu phong uốn cong vút 2 bên */}
                <path
                  d="M140 185 C220 120 280 135 300 135 C320 135 380 120 460 185 L445 202 C380 155 330 160 300 160 C270 160 220 155 155 202 Z"
                  fill="#b91c1c"
                  stroke="#fef08a"
                  strokeWidth="3.5"
                />
                {/* Hàng ngói vảy cá / mũi hài lượn sóng */}
                <path d="M175 190 Q300 165 425 190" stroke="#fde047" strokeWidth="1.8" fill="none" />
                {/* 4 Đầu đao cong vút rồng phượng bay bổng */}
                <path d="M140 185 C125 170 130 155 142 160" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M460 185 C475 170 470 155 458 160" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Đôi rồng chầu mặt nguyệt / Lưỡng long triều nguyệt trên bờ nóc */}
                <circle cx="300" cy="126" r="14" fill="#fef08a" stroke="#d97706" strokeWidth="2.5" />
                <circle cx="300" cy="126" r="6" fill="#dc2626" />
                <path d="M272 136 Q286 128 292 128" stroke="#facc15" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M328 136 Q314 128 308 128" stroke="#facc15" strokeWidth="2.8" fill="none" strokeLinecap="round" />

                {/* Hoành phi câu đối chữ son thếp vàng "QUỐC THÁI DÂN AN" */}
                <rect x="225" y="198" width="150" height="22" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" rx="2" />
                <line x1="225" y1="209" x2="375" y2="209" stroke="#fde047" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="300" cy="209" r="4.5" fill="#facc15" />

                {/* Hàng cột gỗ lim son sẫm nâng đỡ mái đình */}
                <rect x="195" y="202" width="16" height="78" fill="#5c2d16" stroke="#fbbf24" strokeWidth="1.3" />
                <rect x="250" y="202" width="16" height="78" fill="#5c2d16" stroke="#fbbf24" strokeWidth="1.3" />
                <rect x="334" y="202" width="16" height="78" fill="#5c2d16" stroke="#fbbf24" strokeWidth="1.3" />
                <rect x="389" y="202" width="16" height="78" fill="#5c2d16" stroke="#fbbf24" strokeWidth="1.3" />
                {/* Cửa bức bàn mở rộng nhìn vào hậu cung linh thiêng */}
                <rect x="268" y="215" width="64" height="65" fill="#450a0a" stroke="#fde047" strokeWidth="1.5" />
                <circle cx="300" cy="245" r="10" fill="none" stroke="#fde047" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BỐI CẢNH 3: MÁI NHÀ TRANH & LŨY TRE LÀNG (Làng Quê Mộc Mạc, Cánh Đồng Lúa Vàng, Đàn Cò Trắng) */}
        {/* ========================================================================= */}
        {backdrop === 'mai_nha_tranh_luy_tre' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#fef08a]/45 to-[#fed7aa]">
            <svg
              viewBox="0 0 600 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Nắng mai vàng ươm & rặng mây hồng ấm áp */}
              <circle cx="160" cy="65" r="44" fill="#fef08a" opacity="0.85" />
              <circle cx="160" cy="65" r="24" fill="#ffffff" opacity="0.95" />
              <path d="M80 65 Q140 45 200 65 Q160 80 80 65 Z" fill="#ffffff" opacity="0.45" />

              {/* Cánh đồng lúa chín vàng trĩu hạt xa xa */}
              <path d="M-20 235 Q150 200 320 230 Q460 210 620 235 L620 278 L-20 278 Z" fill="#f59e0b" opacity="0.75" />
              {/* Đàn cò trắng sải cánh bay lả bay la */}
              <path d="M260 85 Q266 77 272 85 Q278 77 284 85" stroke="#ffffff" strokeWidth="1.8" fill="none" />
              <path d="M295 100 Q300 93 305 100 Q310 93 315 100" stroke="#ffffff" strokeWidth="1.5" fill="none" />
              <path d="M330 80 Q335 74 340 80 Q345 74 350 80" stroke="#ffffff" strokeWidth="1.4" fill="none" />

              {/* Sân gạch đỏ son làng quê */}
              <rect x="0" y="278" width="600" height="242" fill="#b45309" opacity="0.94" />
              <line x1="0" y1="278" x2="600" y2="278" stroke="#fde047" strokeWidth="3" />
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={i}
                  x1={300 + (i - 7) * 26}
                  y1={278}
                  x2={300 + (i - 7) * 75}
                  y2={520}
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  opacity="0.32"
                />
              ))}

              {/* BÊN TRÁI: LŨY TRE LÀNG XANH NGÚT NGÀN UỐN LƯỢN */}
              <g id="village-bamboo-grove">
                <path d="M15 380 C25 240 50 140 100 45" stroke="#15803d" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M-5 400 C10 260 35 160 68 65" stroke="#16a34a" strokeWidth="13" fill="none" strokeLinecap="round" />
                <path d="M35 370 C45 250 72 155 125 55" stroke="#15803d" strokeWidth="12" fill="none" strokeLinecap="round" />
                {/* Đốt tre ngọc vàng thanh mảnh */}
                <line x1="28" y1="180" x2="42" y2="178" stroke="#fef08a" strokeWidth="2.5" />
                <line x1="40" y1="130" x2="55" y2="128" stroke="#fef08a" strokeWidth="2.5" />
                <line x1="58" y1="90" x2="72" y2="88" stroke="#fef08a" strokeWidth="2.5" />
                {/* Tán lá tre xanh rủ bóng */}
                <ellipse cx="100" cy="45" rx="46" ry="16" fill="#86efac" transform="rotate(-30 100 45)" />
                <ellipse cx="68" cy="65" rx="42" ry="14" fill="#4ade80" transform="rotate(25 68 65)" />
                <ellipse cx="125" cy="55" rx="48" ry="16" fill="#22c55e" transform="rotate(-15 125 55)" />

                {/* Bờ ao sen / súng dưới rặng tre */}
                <ellipse cx="85" cy="275" rx="55" ry="13" fill="#0284c7" opacity="0.85" />
                <circle cx="60" cy="274" r="5" fill="#15803d" />
                <circle cx="100" cy="276" r="6" fill="#15803d" />
                <circle cx="80" cy="273" r="3.5" fill="#a855f7" />
              </g>

              {/* BÊN PHẢI: BỤI CHUỐI TIÊU, Ụ RƠM VÀ CẦU KHỈ */}
              <g id="village-right-garden">
                {/* Ụ rơm vàng góc sân */}
                <path d="M470 278 Q515 200 560 278 Z" fill="#d97706" stroke="#fde047" strokeWidth="2" />
                <line x1="515" y1="200" x2="515" y2="278" stroke="#fef08a" strokeWidth="1.5" />
                {/* Bụi chuối tiêu trổ buồng */}
                <path d="M570 280 C565 240 555 215 540 205 C548 220 552 245 555 280" stroke="#16a34a" strokeWidth="8" fill="none" />
                <ellipse cx="540" cy="205" rx="24" ry="8" fill="#4ade80" transform="rotate(-35 540 205)" />
                <circle cx="535" cy="215" r="4.5" fill="#dc2626" />
              </g>

              {/* CHÍNH TÂM ĐẰNG SAU NHÂN VẬT: NHÀ BA GIAN MÁI TRANH CỔ TRUYỀN */}
              <g id="thatch-house-center">
                {/* Mái rạ vàng óng hình chóp dày dặn */}
                <polygon points="300,140 180,225 420,225" fill="#d97706" stroke="#fef08a" strokeWidth="3" />
                <polygon points="300,140 200,225 400,225" fill="#b45309" opacity="0.4" />
                {/* Các thớ rạ đan chéo */}
                <line x1="300" y1="140" x2="220" y2="225" stroke="#fef08a" strokeWidth="1.5" />
                <line x1="300" y1="140" x2="300" y2="225" stroke="#fef08a" strokeWidth="1.8" />
                <line x1="300" y1="140" x2="380" y2="225" stroke="#fef08a" strokeWidth="1.5" />
                <line x1="220" y1="180" x2="380" y2="180" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="200" y1="205" x2="400" y2="205" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Vách đất nứa & hàng hiên nhà tranh */}
                <rect x="205" y="225" width="190" height="53" fill="#78350f" stroke="#facc15" strokeWidth="1.8" />
                {/* 3 Gian cửa liếp nứa */}
                <rect x="220" y="235" width="38" height="43" fill="#92400e" stroke="#fde047" strokeWidth="1.2" />
                <rect x="281" y="235" width="38" height="43" fill="#451a03" stroke="#fde047" strokeWidth="1.5" />
                <rect x="342" y="235" width="38" height="43" fill="#92400e" stroke="#fde047" strokeWidth="1.2" />

                {/* Chum sành hứng nước mưa & chõng tre bên hiên */}
                <ellipse cx="202" cy="272" rx="7" ry="8" fill="#451a03" stroke="#d97706" strokeWidth="1.5" />
                <rect x="375" y="265" width="22" height="12" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
              </g>
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BỐI CẢNH 4: VĂN MIẾU QUỐC TỬ GIÁM — THĂNG LONG (Khuê Văn Các Sao Khuê, Giếng Thiên Quang, Bia Rùa Đá) */}
        {/* ========================================================================= */}
        {backdrop === 'van_mieu_thang_long' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#fef08a]/45 to-[#fee2e2]">
            <svg
              viewBox="0 0 600 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Bầu trời ngàn năm văn hiến Thăng Long */}
              <circle cx="150" cy="65" r="42" fill="#fef08a" opacity="0.85" />
              <circle cx="150" cy="65" r="22" fill="#ffffff" opacity="0.95" />

              {/* Giếng Thiên Quang Tỉnh phẳng lặng như gương soi */}
              <rect x="0" y="278" width="600" height="242" fill="#0f766e" opacity="0.94" />
              <line x1="0" y1="278" x2="600" y2="278" stroke="#fde047" strokeWidth="3.5" />
              <rect x="0" y="282" width="600" height="45" fill="#14b8a6" opacity="0.3" />
              {Array.from({ length: 15 }).map((_, i) => (
                <line
                  key={i}
                  x1={300 + (i - 7) * 26}
                  y1={278}
                  x2={300 + (i - 7) * 75}
                  y2={520}
                  stroke="#5eead4"
                  strokeWidth="1.2"
                  opacity="0.32"
                />
              ))}

              {/* BÊN TRÁI & PHẢI: HAI DÃY NHÀ BIA TIẾN SĨ NGỰ TRÊN LƯNG RÙA ĐÁ */}
              <g id="stele-houses-left">
                <path d="M55 210 Q90 175 125 210 L125 278 L55 278 Z" fill="#b91c1c" stroke="#fef08a" strokeWidth="1.8" />
                <rect x="65" y="215" width="22" height="52" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" rx="3" />
                <rect x="93" y="215" width="22" height="52" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" rx="3" />
                <ellipse cx="76" cy="272" rx="14" ry="6" fill="#64748b" />
                <ellipse cx="104" cy="272" rx="14" ry="6" fill="#64748b" />
                {/* Cây muỗm cổ thụ che bóng */}
                <circle cx="45" cy="140" r="45" fill="#15803d" opacity="0.9" />
              </g>

              <g id="stele-houses-right">
                <path d="M475 210 Q510 175 545 210 L545 278 L475 278 Z" fill="#b91c1c" stroke="#fef08a" strokeWidth="1.8" />
                <rect x="485" y="215" width="22" height="52" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" rx="3" />
                <rect x="513" y="215" width="22" height="52" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" rx="3" />
                <ellipse cx="496" cy="272" rx="14" ry="6" fill="#64748b" />
                <ellipse cx="524" cy="272" rx="14" ry="6" fill="#64748b" />
                {/* Cây hoa đại trắng ngát hương */}
                <circle cx="555" cy="140" r="45" fill="#166534" opacity="0.9" />
                <circle cx="530" cy="150" r="3.5" fill="#ffffff" />
                <circle cx="545" cy="165" r="3.5" fill="#ffffff" />
              </g>

              {/* CHÍNH TÂM ĐẰNG SAU NHÂN VẬT: KHUÊ VĂN CÁC UY NGHIÊM — BIỂU TƯỢNG VĂN HIẾN */}
              <g id="khue-van-cac-center">
                {/* Tầng mái trên 4 mái ngói cong son sắc */}
                <path d="M205 105 L300 75 L395 105 L385 118 L300 92 L215 118 Z" fill="#b91c1c" stroke="#fef08a" strokeWidth="2.5" />
                {/* Tầng mái dưới lợp ngói vảy cá */}
                <path d="M185 150 L300 115 L415 150 L405 164 L300 138 L195 164 Z" fill="#991b1b" stroke="#fef08a" strokeWidth="2.5" />

                {/* Gác gỗ sơn son thếp vàng */}
                <rect x="215" y="118" width="170" height="32" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" />
                {/* Cửa tròn Sao Khuê tỏa sáng như vầng thái dương chiếu rọi ánh sáng tri thức */}
                <circle cx="300" cy="134" r="15" fill="#fef08a" stroke="#d97706" strokeWidth="2.5" />
                <circle cx="300" cy="134" r="8.5" fill="#dc2626" />
                <line x1="300" y1="119" x2="300" y2="149" stroke="#fef08a" strokeWidth="1.5" />
                <line x1="285" y1="134" x2="315" y2="134" stroke="#fef08a" strokeWidth="1.5" />

                {/* 4 Cột gạch vuông vững chãi nâng đỡ lầu gác */}
                <rect x="215" y="164" width="18" height="114" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
                <rect x="255" y="164" width="18" height="114" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
                <rect x="327" y="164" width="18" height="114" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
                <rect x="367" y="164" width="18" height="114" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
                {/* Câu đối chữ son đắp nổi trên cột */}
                <line x1="224" y1="180" x2="224" y2="255" stroke="#991b1b" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="376" y1="180" x2="376" y2="255" stroke="#991b1b" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BỐI CẢNH 5: GẤM ĐỎ TRỐNG ĐỒNG ĐÔNG SƠN HÀO HÙNG (Thái Dương 14 Tia, Chim Lạc, Chiến Thuyền) */}
        {/* ========================================================================= */}
        {backdrop === 'gam_do_dong_son' && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#991b1b] via-[#7f1d1d] to-[#450a0a] flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 600 520"
              className="w-full h-full text-amber-200 opacity-95"
              fill="none"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Dải mây ngũ sắc viền 4 góc */}
              <g stroke="#fde047" strokeWidth="1.5" opacity="0.6">
                <path d="M20 50 Q60 20 100 50 Q70 70 20 50 Z" />
                <path d="M580 50 Q540 20 500 50 Q530 70 580 50 Z" />
                <path d="M20 470 Q60 500 100 470 Q70 450 20 470 Z" />
                <path d="M580 470 Q540 500 500 470 Q530 450 580 470 Z" />
              </g>

              {/* Vầng hào quang Trống Đồng Đông Sơn đặt ngay tâm chính sau lưng nhân vật */}
              <g transform="translate(300, 240)">
                {/* Vòng ngoài cùng */}
                <circle cx="0" cy="0" r="235" stroke="#fde047" strokeWidth="3" opacity="0.8" />
                <circle cx="0" cy="0" r="220" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
                <circle cx="0" cy="0" r="200" stroke="#fde047" strokeWidth="2.5" opacity="0.9" />

                {/* Vòng chim Lạc bay ngược chiều kim đồng hồ uyển chuyển */}
                <circle cx="0" cy="0" r="160" stroke="#fef08a" strokeWidth="2" opacity="0.95" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i} transform={`rotate(${(i * 360) / 8})`}>
                    <path
                      d="M 0 -170 Q 20 -182 45 -170 Q 25 -164 0 -170 Z"
                      fill="#fde047"
                      stroke="#b45309"
                      strokeWidth="0.8"
                    />
                    <path d="M 35 -174 L 45 -184 L 38 -170" stroke="#fef08a" strokeWidth="1.2" fill="none" />
                  </g>
                ))}

                {/* Vòng người múa lễ hội lông chim dũng mãnh */}
                <circle cx="0" cy="0" r="120" stroke="#fde047" strokeWidth="2" strokeDasharray="3 3" opacity="0.9" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <g key={i} transform={`rotate(${(i * 360) / 12})`}>
                    <circle cx="0" cy="-126" r="2.8" fill="#fef08a" />
                    <path d="M 0 -123 L 0 -113" stroke="#fef08a" strokeWidth="1.5" />
                    <line x1="-3" y1="-118" x2="3" y2="-118" stroke="#fef08a" strokeWidth="1.2" />
                  </g>
                ))}

                {/* Vầng Thái Dương 14 tia hào quang chiếu rọi vũ trụ tại tâm sau đầu nhân vật */}
                <circle cx="0" cy="0" r="75" stroke="#fde047" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="24" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                {Array.from({ length: 14 }).map((_, i) => (
                  <path
                    key={i}
                    d="M 0 -70 L -7 -24 L 7 -24 Z"
                    fill="#fef08a"
                    stroke="#d97706"
                    strokeWidth="0.8"
                    transform={`rotate(${(i * 360) / 14})`}
                  />
                ))}
              </g>
            </svg>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BỐI CẢNH 6: BẢN MÈO & RUỘNG BẬC THANG TÂY BẮC (Mù Cang Chải, Sa Pa, Nhà Gỗ Pơ-mu, Khèn Mông) */}
        {/* ========================================================================= */}
        {backdrop === 'tay_bac_ruong_bac_thang' && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#fef08a]/40 to-[#ffedd5]">
            <svg
              viewBox="0 0 600 520"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              style={{ transform: `translateX(${parallaxX * 0.4}px)` }}
            >
              {/* Ánh bình minh & đỉnh núi Fansipan hùng vĩ mờ sương */}
              <circle cx="120" cy="65" r="44" fill="#fef08a" opacity="0.85" />
              <circle cx="120" cy="65" r="24" fill="#ffffff" opacity="0.95" />
              <path d="M50 70 Q110 50 170 70 Q130 85 50 70 Z" fill="#ffffff" opacity="0.45" />

              {/* Dãy Hoàng Liên Sơn điệp trùng mây trắng cuộn */}
              <path d="M-20 180 Q60 120 160 165 Q260 110 380 160 Q480 125 620 175 L620 280 L-20 280 Z" fill="#60a5fa" opacity="0.45" />
              <path d="M20 195 Q140 145 260 185 Q390 140 520 185 L520 280 L20 280 Z" fill="#93c5fd" opacity="0.5" />

              {/* Tầng tầng lớp lớp ruộng bậc thang vàng óng mùa lúa chín */}
              <path d="M0 240 Q150 220 300 240 Q450 220 600 240 L600 280 L0 280 Z" fill="#eab308" opacity="0.8" />
              <path d="M0 260 Q150 245 300 260 Q450 245 600 260" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <path d="M0 275 Q150 260 300 275 Q450 260 600 275" stroke="#fef08a" strokeWidth="2" fill="none" />

              {/* Bậc thềm đá núi tự nhiên vững chãi */}
              <rect x="0" y="278" width="600" height="242" fill="#78350f" opacity="0.94" />
              <line x1="0" y1="278" x2="600" y2="278" stroke="#fde047" strokeWidth="3" />
              {/* Hoa văn thổ cẩm hoa rừng viền thềm đá */}
              {Array.from({ length: 15 }).map((_, i) => (
                <g key={i} transform={`translate(${i * 42}, 282)`}>
                  <polygon points="21,2 38,18 21,34 4,18" fill="#be123c" stroke="#fde047" strokeWidth="1" />
                  <circle cx="21" cy="18" r="3" fill="#facc15" />
                </g>
              ))}

              {/* BÊN TRÁI: ĐỒI HOA TAM GIÁC MẠCH & HOA BAN TRẮNG */}
              <g id="tay-bac-flowers-left">
                <path d="M0 278 Q60 215 130 278 Z" fill="#be185d" opacity="0.75" />
                <circle cx="45" cy="245" r="4" fill="#fbcfe8" />
                <circle cx="65" cy="235" r="4.5" fill="#fbcfe8" />
                <circle cx="85" cy="250" r="4" fill="#fbcfe8" />
                <circle cx="105" cy="240" r="3.5" fill="#ffffff" />
                {/* Sào phơi vải lanh dệt thổ cẩm đung đưa */}
                <line x1="100" y1="210" x2="160" y2="210" stroke="#78350f" strokeWidth="2.5" />
                <rect x="110" y="210" width="40" height="55" fill="#047857" stroke="#fde047" strokeWidth="1.2" />
                <line x1="110" y1="230" x2="150" y2="230" stroke="#be123c" strokeWidth="2" />
              </g>

              {/* BÊN PHẢI: CỌN NƯỚC BỜ SUỐI & CÂY KHÈN MÔNG */}
              <g id="tay-bac-right-wheel">
                {/* Cọn nước quay tròn */}
                <circle cx="505" cy="255" r="36" stroke="#78350f" strokeWidth="3.5" fill="none" />
                <circle cx="505" cy="255" r="8" fill="#78350f" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={i}
                    x1="505"
                    y1="255"
                    x2={505 + Math.cos((i * Math.PI) / 4) * 36}
                    y2={255 + Math.sin((i * Math.PI) / 4) * 36}
                    stroke="#b45309"
                    strokeWidth="1.8"
                  />
                ))}
              </g>

              {/* CHÍNH TÂM ĐẰNG SAU NHÂN VẬT: NHÀ GỖ PƠ-MU TRUYỀN THỐNG CỦA ĐỒNG BÀO H'MÔNG */}
              <g id="hmong-house-center">
                {/* Mái ván Sa Mu lợp gỗ dốc đứng */}
                <polygon points="300,135 180,225 420,225" fill="#78350f" stroke="#fde047" strokeWidth="2.5" />
                <line x1="300" y1="135" x2="300" y2="225" stroke="#fef08a" strokeWidth="1.5" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={i}
                    x1={200 + i * 25}
                    y1="210"
                    x2={210 + i * 25}
                    y2="225"
                    stroke="#fef08a"
                    strokeWidth="1.2"
                  />
                ))}

                {/* Vách gỗ pơ-mu ấm cúng */}
                <rect x="205" y="225" width="190" height="53" fill="#5c2d16" stroke="#facc15" strokeWidth="1.8" />
                {/* Cửa gỗ chính bản Mông */}
                <rect x="280" y="235" width="40" height="43" fill="#2d060a" stroke="#fde047" strokeWidth="1.5" />

                {/* Hàng bắp ngô vàng óng phơi trước hiên */}
                {Array.from({ length: 11 }).map((_, i) => (
                  <ellipse key={i} cx={220 + i * 16} cy="230" rx="3" ry="6" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
                ))}

                {/* Cây Khèn H'Mông treo bên vách nứa */}
                <g transform="translate(350, 240)">
                  <line x1="0" y1="0" x2="25" y2="20" stroke="#ca8a04" strokeWidth="2" />
                  <line x1="5" y1="5" x2="25" y2="10" stroke="#ca8a04" strokeWidth="1.5" />
                  <line x1="8" y1="8" x2="25" y2="5" stroke="#ca8a04" strokeWidth="1.5" />
                  <ellipse cx="2" cy="2" rx="4" ry="6" fill="#78350f" stroke="#fde047" strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP TOOLBAR: GIỚI TÍNH "NAM" / "NỮ" VÀ NÚT ĐIỀU KHIỂN NHANH           */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full flex items-center justify-between px-3 sm:px-4 py-2 bg-[#180407]/90 backdrop-blur-md border-b border-red-900/40">
        <div className="flex items-center gap-2">
          <RedSealStamp text="TÂM HỒN" subText="VIỆT NAM" />
          <span className="text-xs text-amber-200/90 font-serif hidden md:inline">
            {isFemale ? 'Người mẫu: Nữ' : 'Người mẫu: Nam'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút Xoay 360° */}
          <button
            onClick={toggleAutoRotate}
            className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1.5 transition-all shadow ${
              isAutoRotating
                ? 'bg-amber-600 text-stone-950 border-amber-400 font-bold'
                : 'bg-stone-900/80 text-amber-200 border-red-900/40 hover:bg-stone-800'
            }`}
            title="Bật / Tạm dừng xoay tròn 360°"
          >
            {isAutoRotating ? <Pause size={12} /> : <Play size={12} />}
            <span className="hidden sm:inline">{isAutoRotating ? 'Dừng xoay' : 'Xoay 360°'}</span>
          </button>

          {/* Giới tính: Nam, Nữ */}
          <div className="flex items-center bg-stone-900/90 p-0.5 rounded-lg border border-red-900/40 font-sans text-xs">
            <button
              onClick={() => onUpdateConfig({ avatarModel: 'student_m', gender: 'nam' })}
              className={`px-3 py-1 rounded transition-colors font-medium ${
                config.gender === 'nam'
                  ? 'bg-red-800 text-amber-100 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>Nam</span>
            </button>
            <button
              onClick={() => onUpdateConfig({ avatarModel: 'student_f', gender: 'nu' })}
              className={`px-3 py-1 rounded transition-colors font-medium ${
                config.gender === 'nu'
                  ? 'bg-red-800 text-amber-100 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>Nữ</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                config.avatarModel === 'custom_upload'
                  ? 'bg-red-800 text-amber-100 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Tải ảnh khuôn mặt bạn"
            >
              <Upload size={12} />
              <span className="hidden md:inline">Ảnh bạn</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <button
            onClick={() => setViewMode(viewMode === 'landscape' ? 'portrait' : 'landscape')}
            className="p-1.5 rounded-lg bg-stone-900/80 border border-red-900/40 text-stone-300 hover:text-amber-200"
            title="Đổi góc nhìn toàn cảnh / cận cảnh"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      {/* QUICK MOTION STRIP: CHÀO HỎI, ĐỨNG NGHIÊM, XOAY 360°, CẦM QUẠT, NÂNG NÓN */}
      <div className="relative z-20 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#140306]/80 backdrop-blur-md border-b border-red-900/30 overflow-x-auto text-[11px] font-sans">
        <span className="text-stone-400 shrink-0 font-medium mr-1">Cử động:</span>
        <button
          onClick={() => setMotionMode('chao_hoi')}
          className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1 transition-all shrink-0 ${
            motionMode === 'chao_hoi'
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow'
              : 'bg-stone-900/70 text-stone-300 border-red-900/40 hover:text-amber-200'
          }`}
        >
          <Hand size={11} />
          <span>Chào hỏi</span>
        </button>
        <button
          onClick={() => setMotionMode('dung_nghiem')}
          className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1 transition-all shrink-0 ${
            motionMode === 'dung_nghiem'
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow'
              : 'bg-stone-900/70 text-stone-300 border-red-900/40 hover:text-amber-200'
          }`}
        >
          <Shield size={11} />
          <span>Đứng nghiêm</span>
        </button>
        <button
          onClick={() => {
            setMotionMode('xoay_tron');
            if (!isAutoRotating) toggleAutoRotate();
          }}
          className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1 transition-all shrink-0 ${
            motionMode === 'xoay_tron' || isAutoRotating
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow'
              : 'bg-stone-900/70 text-stone-300 border-red-900/40 hover:text-amber-200'
          }`}
        >
          <RotateCw size={11} className={isAutoRotating ? 'animate-spin' : ''} />
          <span>Xoay tròn</span>
        </button>
        <button
          onClick={() => setMotionMode('cam_quat')}
          className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1 transition-all shrink-0 ${
            motionMode === 'cam_quat'
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow'
              : 'bg-stone-900/70 text-stone-300 border-red-900/40 hover:text-amber-200'
          }`}
        >
          <Fan size={11} />
          <span>Cầm quạt</span>
        </button>

        {/* Nút Nhạc Dân Gian Việt Nam trong phòng phối đồ */}
        <div className="h-4 w-px bg-red-900/40 mx-1 shrink-0 hidden sm:block" />
        <button
          onClick={() => dispatchFolkMusicCmd('toggle')}
          className={`px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 transition-all shrink-0 ${
            folkMusic.isPlaying
              ? 'bg-gradient-to-r from-red-800 to-amber-700 text-amber-100 border-amber-400 font-semibold shadow ring-1 ring-amber-400/40'
              : 'bg-stone-900/80 text-amber-300/90 border-red-900/40 hover:bg-stone-800'
          }`}
          title={folkMusic.isPlaying ? 'Tạm dừng nhạc dân gian' : 'Bật nhạc văn hóa dân gian Việt Nam'}
        >
          <Disc3
            size={12}
            className={`text-amber-400 ${folkMusic.isPlaying ? 'animate-spin' : ''}`}
          />
          <span className="truncate max-w-[130px] sm:max-w-[180px]">
            {folkMusic.isPlaying ? folkMusic.currentTrack.title : 'Nhạc Dân Gian'}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. MANNEQUIN SVG CANVAS: ĐẦU, CỔ, TAY CHÂN LIỀN KHỐI, HOA VĂN NẰM GỌN TRONG ÁO */}
      {/* TỪNG TRANG PHỤC CÓ KIỂU DÁNG RIÊNG CHUẨN XÁC VĂN HÓA                       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden">
        <svg
          viewBox={viewMode === 'landscape' ? '0 0 500 520' : '80 10 340 500'}
          className="w-full h-full max-h-[500px] transition-all duration-300 ease-out"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Làn da mịn màng, chân thực */}
            <linearGradient id="skinToneGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3e6" />
              <stop offset="45%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fba677" />
            </linearGradient>

            <linearGradient id="neckShadowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="cheeksBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="40%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            <linearGradient id="hairSheenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="35%" stopColor="#18181b" />
              <stop offset="65%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            <linearGradient id="imperialJadeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="45%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>

            <linearGradient id="goldEmbroideryGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id="woodClogGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a16207" />
              <stop offset="45%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            <linearGradient id="silverJewelry" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="pedestalGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            {/* LỚP SHADER VẢI & ÁNH SÁNG MỀM */}
            <filter id="fabric-lighting" x="-10%" y="-10%" width="120%" height="120%">
              <feDiffuseLighting in="SourceGraphic" lightingColor="#fffbeb" surfaceScale="1.2" diffuseConstant="0.9" result="diffuse">
                <feDistantLight azimuth="225" elevation="55" />
              </feDiffuseLighting>
              <feSpecularLighting in="SourceGraphic" surfaceScale="1" specularConstant="0.35" specularExponent="20" lightingColor="#fef08a" result="specular">
                <feDistantLight azimuth="225" elevation="55" />
              </feSpecularLighting>
              <feComposite in="SourceGraphic" in2="diffuse" operator="arithmetic" k1="0.6" k2="0.6" k3="0" k4="0" result="lit" />
              <feComposite in="lit" in2="specular" operator="arithmetic" k1="0" k2="1" k3="0.3" k4="0" />
            </filter>

            {/* HOA VĂN PATTERNS */}
            {/* HOA VĂN HOA SEN CUNG ĐÌNH (Đoàn Liên Hoa Hoàng Triều Lý - Nguyễn dát kim tuyến thanh quý) */}
            <pattern
              id="pat-hoa-sen"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
              patternTransform={`translate(${parallaxX * 0.4}, 0)`}
            >
              <g stroke="#fde047" strokeWidth="1.2" fill="none">
                {/* Dây liên hoa & vân mây như ý liên hoàn uốn lượn kết nối 4 góc */}
                <path d="M0 0 Q14 14 28 5 Q42 14 56 0" stroke="#facc15" strokeWidth="1.1" opacity="0.85" />
                <path d="M0 56 Q14 42 28 51 Q42 42 56 56" stroke="#facc15" strokeWidth="1.1" opacity="0.85" />
                <path d="M0 0 Q14 14 5 28 Q14 42 0 56" stroke="#facc15" strokeWidth="1.1" opacity="0.85" />
                <path d="M56 0 Q42 14 51 28 Q42 42 56 56" stroke="#facc15" strokeWidth="1.1" opacity="0.85" />

                {/* Vòng hào quang kim tuyến bảo vệ đài sen */}
                <circle cx="28" cy="28" r="25" stroke="#fbbf24" strokeWidth="0.9" strokeDasharray="3 2" opacity="0.8" />
                <circle cx="28" cy="28" r="21" stroke="#fde047" strokeWidth="1.2" opacity="0.9" />

                {/* Bát diệp liên hoa: 8 cánh sen hoàng triều xòe đối xứng tinh tế */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i} transform={`rotate(${(i * 360) / 8} 28 28)`}>
                    {/* Cánh sen chính vuốt nhọn thanh thoát với sắc vàng hoàng gia rõ nét */}
                    <path
                      d="M28 5 C22 13 21 21 28 25 C35 21 34 13 28 5 Z"
                      fill="#fef08a"
                      fillOpacity="0.48"
                      stroke="#fde047"
                      strokeWidth="1.3"
                    />
                    {/* Gân cánh sen dát vàng kim */}
                    <line x1="28" y1="7" x2="28" y2="23" stroke="#f59e0b" strokeWidth="0.9" opacity="0.9" />
                    {/* Viền phụ uốn lượn phong cách cung đình */}
                    <path d="M28 5 C23 12 22 18 25 24" stroke="#fbbf24" strokeWidth="0.8" opacity="0.8" />
                  </g>
                ))}

                {/* Lớp 8 cánh sen phụ lớp trong đan kẽ hài hòa */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={`sub-${i}`} transform={`rotate(${(i * 360) / 8 + 22.5} 28 28)`}>
                    <path
                      d="M28 11 C24 17 24 22 28 25 C32 22 32 17 28 11 Z"
                      fill="#facc15"
                      fillOpacity="0.58"
                      stroke="#d97706"
                      strokeWidth="1.1"
                    />
                  </g>
                ))}

                {/* Tâm đài sen ngọc (Gương sen) & các hạt sen ngọc hoàng kim */}
                <circle cx="28" cy="28" r="6.2" fill="#fef08a" fillOpacity="0.95" stroke="#b45309" strokeWidth="1.3" />
                <circle cx="28" cy="28" r="2.6" fill="#f59e0b" />
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * Math.PI) / 4;
                  return (
                    <circle
                      key={i}
                      cx={28 + Math.cos(angle) * 4.4}
                      cy={28 + Math.sin(angle) * 4.4}
                      r="0.9"
                      fill="#78350f"
                    />
                  );
                })}

                {/* Búp sen e ấp tại 4 góc liên kết nhịp nhàng */}
                <path d="M0 0 L5 5 C7 3 7 0 5 -2 Z" fill="#facc15" fillOpacity="0.6" stroke="#fde047" strokeWidth="0.9" />
                <path d="M56 0 L51 5 C49 3 49 0 51 -2 Z" fill="#facc15" fillOpacity="0.6" stroke="#fde047" strokeWidth="0.9" />
                <path d="M0 56 L5 51 C7 53 7 56 5 58 Z" fill="#facc15" fillOpacity="0.6" stroke="#fde047" strokeWidth="0.9" />
                <path d="M56 56 L51 51 C49 53 49 56 51 58 Z" fill="#facc15" fillOpacity="0.6" stroke="#fde047" strokeWidth="0.9" />
              </g>
            </pattern>

            <pattern id="pat-hoa-cuc" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fde68a" strokeWidth="1.2" fill="none">
                <circle cx="22" cy="22" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="22"
                    cy="10"
                    rx="3.5"
                    ry="6"
                    fill="#fef08a"
                    fillOpacity="0.75"
                    stroke="#d97706"
                    strokeWidth="1"
                    transform={`rotate(${i * 45} 22 22)`}
                  />
                ))}
              </g>
            </pattern>

            <pattern id="pat-hoa-mai" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fde68a" fill="none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="22"
                    cy="13"
                    r="5"
                    fill="#facc15"
                    fillOpacity="0.8"
                    stroke="#b45309"
                    strokeWidth="1.2"
                    transform={`rotate(${i * 72} 22 22)`}
                  />
                ))}
                <circle cx="22" cy="22" r="3.5" fill="#dc2626" />
              </g>
            </pattern>

            <pattern id="pat-hoa-dao" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fbcfe8" fill="none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="22"
                    cy="12"
                    r="5.5"
                    fill="#f43f5e"
                    fillOpacity="0.75"
                    stroke="#be123c"
                    strokeWidth="1.2"
                    transform={`rotate(${i * 72} 22 22)`}
                  />
                ))}
                <circle cx="22" cy="22" r="3.5" fill="#fde047" stroke="#b45309" strokeWidth="1" />
              </g>
            </pattern>

            <pattern id="pat-van-may" width="48" height="34" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fef08a" strokeWidth="1.5" fill="none">
                <path d="M4 22 C8 15 17 15 22 20 C27 12 39 12 43 20 C46 22 46 27 41 27 C36 27 11 27 7 27 C3 27 2 24 4 22 Z" fill="#fde68a" fillOpacity="0.4" />
                <path d="M12 22 C14 18 19 18 22 22" stroke="#b45309" strokeWidth="1" />
              </g>
            </pattern>

            <pattern id="pat-thuy-ba" width="44" height="24" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <path d="M0 16 Q11 4 22 16 Q33 4 44 16 L44 24 L0 24 Z" fill="#38bdf8" fillOpacity="0.35" stroke="#fef08a" strokeWidth="1.2" />
            </pattern>

            <pattern id="pat-hoi-van" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <path d="M4 4 H24 V24 H10 V10 H18 V18 H14" stroke="#fde047" strokeWidth="1.5" fill="none" />
            </pattern>

            <pattern id="pat-truc-quan-tu" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#86efac" fill="none">
                <line x1="24" y1="4" x2="24" y2="44" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="28" cy="18" rx="7" ry="2.5" fill="#86efac" fillOpacity="0.75" transform="rotate(-30 28 18)" />
                <ellipse cx="20" cy="30" rx="7" ry="2.5" fill="#86efac" fillOpacity="0.75" transform="rotate(30 20 30)" />
              </g>
            </pattern>

            <pattern id="pat-luy-tre-lang" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#86efac" fill="none">
                <path d="M6 48 C10 33 26 18 48 12" stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="18" cy="34" r="2.2" fill="#15803d" stroke="#86efac" strokeWidth="0.8" />
                <path d="M48 12 Q35 2 25 5 Q37 9 48 12 Z" fill="#86efac" fillOpacity="0.7" stroke="#15803d" strokeWidth="1" />
              </g>
            </pattern>

            {/* 2. HOA VĂN MÁI NHÀ TRANH DÂN GIAN (Thớ rạ đan chéo quả trám vàng rơm, sóng rạ tầng tầng & khóm trúc bờ ao) */}
            <pattern id="pat-mai-nha-tranh" width="52" height="52" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fde047" strokeWidth="1.2" fill="none">
                {/* Lưới thớ rạ quả trám đan lồng ấm cúng */}
                <path d="M26 0 L52 26 L26 52 L0 26 Z" stroke="#f59e0b" strokeWidth="1.8" fill="#fef08a" fillOpacity="0.28" />
                <path d="M26 7 L45 26 L26 45 L7 26 Z" stroke="#d97706" strokeWidth="1.1" fill="#fde047" fillOpacity="0.18" />

                {/* Các thớ rạ vàng óng đan chéo lớp lớp mềm mại */}
                <line x1="13" y1="13" x2="39" y2="39" stroke="#fef08a" strokeWidth="1.4" opacity="0.9" />
                <line x1="39" y1="13" x2="13" y2="39" stroke="#fef08a" strokeWidth="1.4" opacity="0.9" />
                <line x1="0" y1="26" x2="52" y2="26" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
                <line x1="26" y1="0" x2="26" y2="52" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* Họa tiết bông lúa vàng uốn câu trĩu hạt tại tâm */}
                <circle cx="26" cy="26" r="3.2" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
                <path d="M26 16 Q31 21 26 26 Q21 21 26 16 Z" fill="#facc15" fillOpacity="0.65" stroke="#b45309" strokeWidth="0.9" />
                <path d="M26 36 Q31 31 26 26 Q21 31 26 36 Z" fill="#facc15" fillOpacity="0.65" stroke="#b45309" strokeWidth="0.9" />
                <path d="M16 26 Q21 31 26 26 Q21 21 16 26 Z" fill="#facc15" fillOpacity="0.65" stroke="#b45309" strokeWidth="0.9" />
                <path d="M36 26 Q31 31 26 26 Q31 21 36 26 Z" fill="#facc15" fillOpacity="0.65" stroke="#b45309" strokeWidth="0.9" />

                {/* Gút buộc lạt giang bốn góc nhịp nhàng */}
                <circle cx="0" cy="0" r="2.8" fill="#d97706" stroke="#fde047" strokeWidth="0.8" />
                <circle cx="52" cy="0" r="2.8" fill="#d97706" stroke="#fde047" strokeWidth="0.8" />
                <circle cx="0" cy="52" r="2.8" fill="#d97706" stroke="#fde047" strokeWidth="0.8" />
                <circle cx="52" cy="52" r="2.8" fill="#d97706" stroke="#fde047" strokeWidth="0.8" />
              </g>
            </pattern>

            {/* 3. HOA VĂN ĐÌNH LÀNG MÁI CONG CHẠM RỒNG (Đầu đao cong vút, ngói mũi hài vảy cá, chạm khắc gỗ đình Bắc Bộ) */}
            <pattern id="pat-dinh-lang-mai-cong" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fde047" strokeWidth="1.2" fill="none">
                {/* Đầu đao mái đình uốn cong bay bổng nhịp nhàng nối liền dải bờ nóc */}
                <path
                  d="M0 24 C14 14 22 17 28 17 C34 17 42 14 56 24 C48 29 38 23 28 23 C18 23 8 29 0 24 Z"
                  fill="#fef08a"
                  fillOpacity="0.32"
                  stroke="#fde047"
                  strokeWidth="1.8"
                />
                {/* Cuộn mây hóa rồng đầu đao hai bên */}
                <path d="M0 24 C-4 15 4 10 12 14" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M56 24 C60 15 52 10 44 14" stroke="#facc15" strokeWidth="1.8" strokeLinecap="round" />

                {/* Hàng ngói mũi hài / ngói vảy cá cổ kính lượn sóng liên hoàn */}
                <path d="M0 32 Q7 26 14 32 Q21 26 28 32 Q35 26 42 32 Q49 26 56 32" stroke="#fbbf24" strokeWidth="1.4" />
                <path d="M0 39 Q7 33 14 39 Q21 33 28 39 Q35 33 42 39 Q49 33 56 39" stroke="#f59e0b" strokeWidth="1.3" opacity="0.85" />
                <path d="M0 46 Q7 40 14 46 Q21 40 28 46 Q35 40 42 46 Q49 40 56 46" stroke="#d97706" strokeWidth="1.2" opacity="0.75" />

                {/* Lưỡng long triều nguyệt: Viên bảo châu nhật nguyệt giữa đỉnh mái */}
                <circle cx="28" cy="10" r="4.5" fill="#facc15" fillOpacity="0.95" stroke="#b45309" strokeWidth="1.3" />
                <circle cx="28" cy="10" r="2" fill="#dc2626" />
                <path d="M21 12 Q25 7 28 10" stroke="#fde047" strokeWidth="1.4" fill="none" />
                <path d="M35 12 Q31 7 28 10" stroke="#fde047" strokeWidth="1.4" fill="none" />

                {/* Họa tiết hoa cúc dây & hoa văn chạm gỗ vì kèo đình làng */}
                <circle cx="28" cy="51" r="3.5" fill="#fef08a" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1" />
                <path d="M20 51 C24 47 24 55 28 51 C32 55 32 47 36 51" stroke="#fbbf24" strokeWidth="1.2" />
              </g>
            </pattern>

            <pattern id="pat-dong-son" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              <g stroke="#fde68a" strokeWidth="1.5" fill="none">
                <circle cx="23" cy="23" r="17" stroke="#f59e0b" />
                <circle cx="23" cy="23" r="6" fill="#f59e0b" fillOpacity="0.6" />
                <path d="M9 23 L14 20 L19 23 L14 26 Z" fill="#fef08a" stroke="#b45309" strokeWidth="0.8" />
              </g>
            </pattern>

            {/* 4. HOA VĂN THỔ CẨM DỆT LANH TÂY BẮC (Mặt trời 8 cánh sáp ong, quả trám kỷ hà rực rỡ) */}
            <pattern id="pat-tho-cam-hmong" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform={`translate(${parallaxX * 0.4}, 0)`}>
              {/* Khối quả trám thổ cẩm đỏ son & viền vàng */}
              <path d="M22 2 L42 22 L22 42 L2 22 Z" stroke="#fde047" strokeWidth="2.2" fill="#be123c" fillOpacity="0.9" />
              <path d="M22 7 L37 22 L22 37 L7 22 Z" stroke="#fde047" strokeWidth="1.1" fill="#1e1b4b" fillOpacity="0.75" />
              {/* Mặt trời 8 cánh & họa tiết hoa văn sáp ong (batik) */}
              <circle cx="22" cy="22" r="5.5" fill="#facc15" stroke="#1d4ed8" strokeWidth="1.5" />
              <line x1="22" y1="10" x2="22" y2="34" stroke="#fef08a" strokeWidth="1.6" />
              <line x1="10" y1="22" x2="34" y2="22" stroke="#fef08a" strokeWidth="1.6" />
              <line x1="14" y1="14" x2="30" y2="30" stroke="#fef08a" strokeWidth="1.3" />
              <line x1="14" y1="30" x2="30" y2="14" stroke="#fef08a" strokeWidth="1.3" />
              {/* Họa tiết răng cưa & móc câu bốn góc truyền thống */}
              <path d="M0 0 L7 7 L0 14" stroke="#fde047" strokeWidth="1.3" fill="none" />
              <path d="M44 0 L37 7 L44 14" stroke="#fde047" strokeWidth="1.3" fill="none" />
              <path d="M0 44 L7 37 L0 30" stroke="#fde047" strokeWidth="1.3" fill="none" />
              <path d="M44 44 L37 37 L44 30" stroke="#fde047" strokeWidth="1.3" fill="none" />
              <circle cx="3" cy="22" r="1.5" fill="#facc15" />
              <circle cx="41" cy="22" r="1.5" fill="#facc15" />
            </pattern>

            <pattern id="pat-tron" width="10" height="10" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10" y2="10" stroke="#ffffff" strokeWidth="0.5" opacity="0.08" />
            </pattern>

            {/* CLIPPING PATHS (Hoa văn nằm trọn vẹn, sắc nét trong từng tà áo) */}
            <clipPath id="clip-torso-standard">
              <path
                d={
                  isFemale
                    ? "M216 130 C204 168 202 210 218 240 C206 295 186 385 174 448 Q250 464 326 448 C314 385 294 295 282 240 C298 210 296 168 284 130 Z"
                    : "M204 126 L190 195 L178 445 Q250 460 322 445 L310 195 L296 126 Z"
                }
              />
            </clipPath>

            <clipPath id="clip-hmong-vest">
              <path d="M208 128 C194 168 196 210 212 245 L204 292 Q250 302 296 292 L288 245 C304 210 306 168 292 128 Z" />
            </clipPath>

            <clipPath id="clip-hmong-skirt">
              <path d="M190 295 Q250 306 310 295 L352 468 Q250 488 148 468 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-hmong-l">
              <path d="M210 142 L166 240 L182 278 L198 265 L210 210 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-hmong-r">
              <path d="M290 142 L334 240 L318 278 L302 265 L290 210 Z" />
            </clipPath>

            {/* Vạt áo tứ thân bên trái có độ rộng đầy đặn, uốn lượn duyên dáng */}
            <clipPath id="clip-torso-tu-than-l">
              <path d="M208 135 C202 180 198 235 212 260 L206 448 Q182 445 166 440 L198 240 C202 195 204 165 208 135 Z" />
            </clipPath>

            {/* Vạt áo tứ thân bên phải */}
            <clipPath id="clip-torso-tu-than-r">
              <path d="M292 135 C298 180 302 235 288 260 L294 448 Q318 445 334 440 L302 240 C298 195 296 165 292 135 Z" />
            </clipPath>

            <clipPath id="clip-tu-than-back">
              <path d="M214 130 C206 168 204 210 216 250 L188 448 Q250 460 312 448 L284 250 C296 210 294 168 286 130 Z" />
            </clipPath>

            <clipPath id="clip-yem-dao">
              <path d="M228 126 L250 122 L272 126 L280 260 L220 260 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-tu-than-l">
              <path d="M208 140 L165 240 L180 278 L195 265 L208 210 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-tu-than-r">
              <path d="M292 140 L335 240 L320 278 L305 265 L292 210 Z" />
            </clipPath>

            <clipPath id="clip-torso-ba-ba">
              <path d="M214 130 C206 168 206 200 216 240 L204 330 Q250 340 296 330 L284 240 C294 200 294 168 286 130 Q250 144 214 130 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-ba-ba-l">
              <path d="M210 138 L168 240 L184 278 L198 265 L210 210 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-ba-ba-r">
              <path d="M290 138 L332 240 L316 278 L302 265 L290 210 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-left">
              <path d="M208 140 C170 156 135 198 115 310 C128 345 176 360 198 295 L208 220 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-right">
              <path d="M292 140 C330 156 365 198 385 310 C372 345 324 360 302 295 L292 220 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-greeting-l">
              <path d="M208 138 C185 150 162 185 174 218 C192 232 230 225 242 208 L235 190 Z" />
            </clipPath>

            <clipPath id="clip-sleeve-greeting-r">
              <path d="M292 138 C315 150 338 185 326 218 C308 232 270 225 258 208 L265 190 Z" />
            </clipPath>

            {/* Tay áo phải khi cầm quạt hoặc phụ kiện */}
            <clipPath id="clip-sleeve-fan-r">
              <path d="M290 140 C316 156 338 186 326 218 C308 230 286 220 280 205 L290 185 Z" />
            </clipPath>
          </defs>

          {/* ================================================================= */}
          {/* MANNEQUIN FIGURE GROUP (TÂM X=250, Y=300)                         */}
          {/* ================================================================= */}
          <g id="mannequin-center-group">
            {/* Đài sen trang trọng tại chân người mẫu */}
            <g id="lotus-pedestal" transform="translate(250, 495)">
              <ellipse cx="0" cy="10" rx={isFemale ? 85 : 95} ry="15" fill="#090203" opacity="0.75" />
              <ellipse cx="0" cy="0" rx="98" ry="17" fill="url(#pedestalGold)" stroke="#fde047" strokeWidth="1.5" />
              <ellipse cx="0" cy="-4" rx="90" ry="14" fill="#1e070c" stroke="#fde047" strokeWidth="1" />
              {Array.from({ length: 10 }).map((_, i) => {
                const petalRad = ((i * 36 + angleNorm) * Math.PI) / 180;
                const px = Math.cos(petalRad) * 82;
                const py = Math.sin(petalRad) * 12;
                return (
                  <circle
                    key={i}
                    cx={px}
                    cy={py - 2}
                    r="3.5"
                    fill="#facc15"
                    stroke="#78350f"
                    strokeWidth="0.8"
                    opacity={py >= 0 ? 0.95 : 0.4}
                  />
                );
              })}
            </g>

            {/* Thân người mẫu: Đẹp, cân đối, tôn trang phục */}
            <g id="mannequin-figure">
              {/* 0. LỚP TÓC MÂY BUÔNG XÕA DÀI SAU LƯNG (Khi tóc thả tự nhiên) */}
              {isFemale && (config.headwear === 'none' || !config.headwear) && (
                <g id="back-flowing-hair">
                  {/* Tóc buông dài sau lưng buông rủ qua vai */}
                  <path
                    d="M224 72 C210 100 200 160 204 260 C216 270 236 274 250 274 C264 274 284 270 296 260 C300 160 290 100 276 72 Z"
                    fill="url(#hairGrad)"
                  />
                  {/* Các sợi tóc lượn sóng mềm mại */}
                  <path d="M208 110 C202 180 206 250 216 268" stroke="#3f3f46" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M292 110 C298 180 294 250 284 268" stroke="#3f3f46" strokeWidth="1" fill="none" opacity="0.6" />
                  <path d="M250 90 L250 270" stroke="#27272a" strokeWidth="1.2" opacity="0.5" />
                </g>
              )}

              {/* 1. CHÂN, QUẦN & VÁY DƯỚI */}
              <g id="lower-body">
                {config.costumeId === 'trang_phuc_hmong' ? (
                  /* VÁY XÒE DẬP LY THỔ CẨM H'MÔNG */
                  <g id="hmong-skirt-group">
                    <path
                      d="M190 295 Q250 306 310 295 L352 468 Q250 488 148 468 Z"
                      fill={primaryFill}
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip-hmong-skirt)">
                      <rect x="140" y="290" width="220" height="190" fill={activePatUrl} opacity="0.95" />
                      {Array.from({ length: 13 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M${194 + i * 9.5} 296 L${156 + i * 16} 468`}
                          stroke="rgba(0,0,0,0.22)"
                          strokeWidth="1"
                          opacity="0.45"
                        />
                      ))}
                      <path d="M140 440 Q250 460 360 440 L348 468 Q250 488 152 468 Z" fill="#be123c" />
                      <path d="M140 450 Q250 470 360 450" stroke="#facc15" strokeWidth="2.5" fill="none" />
                    </g>

                    {/* Tạp dề thêu thổ cẩm phía trước (Xẻng dạo H'Mông) nổi bật hoa văn */}
                    <g id="hmong-front-apron">
                      <rect x="232" y="286" width="36" height="135" fill={primaryFill} stroke="#fde047" strokeWidth="1.5" />
                      <rect x="234" y="288" width="32" height="131" fill={activePatUrl} opacity="0.96" />
                      <line x1="232" y1="421" x2="268" y2="421" stroke="#be123c" strokeWidth="4" />
                      <line x1="232" y1="416" x2="268" y2="416" stroke="#facc15" strokeWidth="1.5" />
                    </g>

                    {/* Xà cạp quấn chân thổ cẩm */}
                    <path d="M194 445 L186 475 Q212 478 226 475 L220 445 Z" fill="#1e1b4b" stroke="#fde047" strokeWidth="1" />
                    <path d="M280 445 L274 475 Q298 478 314 475 L306 445 Z" fill="#1e1b4b" stroke="#fde047" strokeWidth="1" />
                  </g>
                ) : config.costumeId === 'ao_tu_than' ? (
                  /* VÁY SỒI ĐEN LIỀN CHỊ KINH BẮC */
                  <g id="tu-than-skirt">
                    <path
                      d="M212 280 L182 468 Q250 478 318 468 L288 280 Z"
                      fill="#18181b"
                      stroke="#3f3f46"
                      strokeWidth="1.2"
                    />
                  </g>
                ) : (
                  /* QUẦN LỤA TRUYỀN THỐNG (Trắng / Đen / Hồng đào) */
                  <g id="traditional-pants">
                    <path
                      d={
                        isFemale
                          ? "M224 290 L194 472 Q224 478 246 472 L248 335 L252 335 L254 472 Q276 478 306 472 L276 290 Z"
                          : "M218 285 L188 472 Q224 478 246 472 L248 330 L252 330 L254 472 Q276 478 312 472 L282 285 Z"
                      }
                      fill={pantsFill}
                      stroke="rgba(0,0,0,0.3)"
                      strokeWidth="1.2"
                    />
                  </g>
                )}

                {/* 1.1. PHỤ KIỆN HÀI THÊU CUNG ĐÌNH, GUỐC MỘC & GIÀY TÂY */}
                <g id="traditional-footwear">
                  {config.footwear === 'guoc_moc_khac_hoa' ? (
                    /* A. GUỐC MỘC GÓT CONG TRUYỀN THỐNG */
                    <g id="wooden-clogs">
                      {/* Chiếc guốc trái */}
                      <g id="left-clog">
                        {/* Tất lụa trắng / chân trần thanh thoát */}
                        <path d="M194 466 C190 469 198 473 226 470 L228 466 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                        {/* Thân guốc gỗ mộc uốn cong gót */}
                        <path
                          d="M190 470 C194 468 232 468 238 470 L237 477 C235 480 225 480 223 476 C219 475 205 475 201 476 C199 480 192 480 190 477 Z"
                          fill="url(#woodClogGrad)"
                          stroke="#451a03"
                          strokeWidth="1.2"
                        />
                        {/* Đường vân gỗ chạm chìm */}
                        <line x1="196" y1="472.5" x2="230" y2="472.5" stroke="#b45309" strokeWidth="0.8" opacity="0.7" />
                        {/* Họa tiết hoa mai / hoa cúc chạm khắc bên hông guốc */}
                        <circle cx="213" cy="473.5" r="1.6" fill="#fde047" opacity="0.9" />
                        <path d="M210 473.5 Q213 471.5 216 473.5" stroke="#451a03" strokeWidth="0.5" fill="none" />
                        {/* Quai nhung đỏ son êm ái đính đinh đồng mạ vàng */}
                        <path d="M198 472 Q208 463 218 472" stroke="#dc2626" strokeWidth="3.6" fill="none" strokeLinecap="round" />
                        <path d="M198 472 Q208 463 218 472" stroke="#fde047" strokeWidth="0.8" fill="none" />
                        <circle cx="198" cy="472" r="1.2" fill="#facc15" stroke="#78350f" strokeWidth="0.4" />
                        <circle cx="218" cy="472" r="1.2" fill="#facc15" stroke="#78350f" strokeWidth="0.4" />
                      </g>

                      {/* Chiếc guốc phải */}
                      <g id="right-clog">
                        <path d="M306 466 C310 469 302 473 274 470 L272 466 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                        <path
                          d="M310 470 C306 468 268 468 262 470 L263 477 C265 480 275 480 277 476 C281 475 295 475 299 476 C301 480 308 480 310 477 Z"
                          fill="url(#woodClogGrad)"
                          stroke="#451a03"
                          strokeWidth="1.2"
                        />
                        <line x1="304" y1="472.5" x2="270" y2="472.5" stroke="#b45309" strokeWidth="0.8" opacity="0.7" />
                        <circle cx="287" cy="473.5" r="1.6" fill="#fde047" opacity="0.9" />
                        <path d="M290 473.5 Q287 471.5 284 473.5" stroke="#451a03" strokeWidth="0.5" fill="none" />
                        <path d="M302 472 Q292 463 282 472" stroke="#dc2626" strokeWidth="3.6" fill="none" strokeLinecap="round" />
                        <path d="M302 472 Q292 463 282 472" stroke="#fde047" strokeWidth="0.8" fill="none" />
                        <circle cx="302" cy="472" r="1.2" fill="#facc15" stroke="#78350f" strokeWidth="0.4" />
                        <circle cx="282" cy="472" r="1.2" fill="#facc15" stroke="#78350f" strokeWidth="0.4" />
                      </g>
                    </g>
                  ) : config.footwear === 'giay_tay_thanh_lich' ? (
                    /* B. GIÀY DA TÂY ĐEN THANH LỊCH */
                    <g id="leather-shoes">
                      {/* Chiếc trái */}
                      <g id="left-leather-shoe">
                        <path d="M190 467 C186 470 190 479 238 477 L237 467 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.2" />
                        <path d="M194 468 Q214 466 230 469" stroke="#52525b" strokeWidth="1.2" fill="none" opacity="0.8" />
                        <rect x="228" y="475" width="10" height="3" fill="#09090b" rx="0.5" />
                      </g>
                      {/* Chiếc phải */}
                      <g id="right-leather-shoe">
                        <path d="M310 467 C314 470 310 479 262 477 L263 467 Z" fill="#18181b" stroke="#09090b" strokeWidth="1.2" />
                        <path d="M306 468 Q286 466 270 469" stroke="#52525b" strokeWidth="1.2" fill="none" opacity="0.8" />
                        <rect x="262" y="475" width="10" height="3" fill="#09090b" rx="0.5" />
                      </g>
                    </g>
                  ) : config.footwear === 'none' ? (
                    /* C. TẤT LỤA TRẮNG / CHÂN TRẦN */
                    <g id="barefoot-socks">
                      <path d="M194 467 C190 471 196 478 236 476 L235 467 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                      <path d="M306 467 C310 471 304 478 264 476 L265 467 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    </g>
                  ) : (
                    /* D. HÀI THÊU PHƯỢNG HOÀNG CUNG ĐÌNH (MẶC ĐỊNH / CHUẨN HOÀNG GIA) */
                    <g id="royal-embroidered-shoes">
                      {/* Chiếc hài trái: Mũi cong vút phượng hoàng */}
                      <g id="left-shoe">
                        {/* Đế nhiều lớp xếp vân da / gỗ cung đình */}
                        <path d="M187 477 Q214 482 238 478 L238 480 Q214 484 186 479 Z" fill="#451a03" />
                        {/* Thân hài nhung gấm đỏ thẫm */}
                        <path
                          d="M191 465 C185 467 184 476 197 478 C216 479 236 477 238 467 C236 463 218 463 191 465 Z"
                          fill="#881337"
                          stroke="#78350f"
                          strokeWidth="1.2"
                        />
                        {/* Mũi hài uốn cong vút kiêu sa đặc trưng cung đình triều Nguyễn */}
                        <path
                          d="M185 469 C181 463 186 461 192 464 L190 473 Z"
                          fill="#991b1b"
                          stroke="#fde047"
                          strokeWidth="1.2"
                        />
                        {/* Hoa văn kim tuyến thêu cánh phượng hoàng / hoa mai */}
                        <path d="M188 467 Q197 464 206 467" stroke="url(#goldEmbroideryGrad)" strokeWidth="1.8" fill="none" />
                        <path d="M191 471 Q200 468 210 471" stroke="url(#goldEmbroideryGrad)" strokeWidth="1.4" fill="none" />
                        <circle cx="194" cy="468" r="1.1" fill="#fef08a" />
                        <circle cx="201" cy="469" r="0.9" fill="#fde047" />
                        {/* Viền lụa trắng nẹp quanh miệng hài */}
                        <path d="M196 464 Q216 463 237 466" stroke="#f8fafc" strokeWidth="1.4" fill="none" />
                      </g>

                      {/* Chiếc hài phải: Đối xứng hoàn mỹ */}
                      <g id="right-shoe">
                        <path d="M313 477 Q286 482 262 478 L262 480 Q286 484 314 479 Z" fill="#451a03" />
                        <path
                          d="M309 465 C315 467 316 476 303 478 C284 479 264 477 262 467 C264 463 282 463 309 465 Z"
                          fill="#881337"
                          stroke="#78350f"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M315 469 C319 463 314 461 308 464 L310 473 Z"
                          fill="#991b1b"
                          stroke="#fde047"
                          strokeWidth="1.2"
                        />
                        <path d="M312 467 Q303 464 294 467" stroke="url(#goldEmbroideryGrad)" strokeWidth="1.8" fill="none" />
                        <path d="M309 471 Q300 468 290 471" stroke="url(#goldEmbroideryGrad)" strokeWidth="1.4" fill="none" />
                        <circle cx="306" cy="468" r="1.1" fill="#fef08a" />
                        <circle cx="299" cy="469" r="0.9" fill="#fde047" />
                        <path d="M304 464 Q284 463 263 466" stroke="#f8fafc" strokeWidth="1.4" fill="none" />
                      </g>
                    </g>
                  )}
                </g>
              </g>

              {/* 2. THÂN ÁO & TAY ÁO TỪNG DÒNG TRANG PHỤC */}
              <g id="costume-specific-rendering">
                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 1: TRANG PHỤC THỔ CẨM H'MÔNG TÂY BẮC (NỐI LIỀN MẠCH, KHÔNG HỞ) */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId === 'trang_phuc_hmong' && (
                  <g id="hmong-costume">
                    {/* Tay áo H'mông */}
                    {motionMode === 'chao_hoi' && !isBackView ? (
                      <>
                        <path d="M210 138 C185 150 162 185 174 218 C192 232 230 225 242 208 L235 190 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <path d="M290 138 C315 150 338 185 326 218 C308 232 270 225 258 208 L265 190 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-greeting-l)">
                          <rect x="160" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-greeting-r)">
                          <rect x="255" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    ) : (motionMode === 'cam_quat' || config.handAccessory === 'quat_tram_huong' || config.handAccessory === 'quat_lua_theu') && !isBackView ? (
                      <>
                        {/* Tay trái buông tự nhiên */}
                        <path d="M210 142 L166 240 L182 278 L198 265 L210 210 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-hmong-l)">
                          <rect x="160" y="135" width="60" height="150" fill={activePatUrl} opacity="0.9" />
                        </g>
                        {/* Tay phải nâng quạt duyên dáng */}
                        <path d="M290 140 C316 156 338 186 326 218 C308 230 286 220 280 205 L290 185 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-fan-r)">
                          <rect x="275" y="135" width="65" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <path d="M166 240 L182 278" stroke="#be123c" strokeWidth="4" />
                      </>
                    ) : (
                      <>
                        <path d="M210 142 L166 240 L182 278 L198 265 L210 210 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <path d="M290 142 L334 240 L318 278 L302 265 L290 210 Z" fill={primaryFill} stroke="#f59e0b" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-hmong-l)">
                          <rect x="160" y="135" width="60" height="150" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-hmong-r)">
                          <rect x="280" y="135" width="60" height="150" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <path d="M166 240 L182 278" stroke="#be123c" strokeWidth="4" />
                        <path d="M334 240 L318 278" stroke="#be123c" strokeWidth="4" />
                      </>
                    )}

                    {/* Thân áo vạt chữ V thổ cẩm nối liền từ cổ tới thắt lưng */}
                    <path
                      d="M208 128 C194 168 196 210 212 245 L204 292 Q250 302 296 292 L288 245 C304 210 306 168 292 128 Z"
                      fill={primaryFill}
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip-hmong-vest)">
                      <rect x="190" y="125" width="120" height="175" fill={activePatUrl} opacity="0.96" />
                    </g>

                    {!isBackView ? (
                      <>
                        {/* Nẹp cổ chữ V nhiều tầng rực rỡ */}
                        <path d="M222 130 L250 235 L278 130" stroke="#fde047" strokeWidth="7" strokeLinecap="round" fill="none" />
                        <path d="M222 130 L250 235 L278 130" stroke="#be123c" strokeWidth="4" strokeLinecap="round" fill="none" />
                        <path d="M222 130 L250 235 L278 130" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" fill="none" />

                        {/* Thắt lưng Lưng Bao đỏ */}
                        <rect x="204" y="278" width="92" height="18" fill="#be123c" stroke="#fde047" strokeWidth="2" rx="2" />
                        <rect x="212" y="282" width="76" height="10" fill="#f59e0b" />
                        <path d="M238 296 L236 410 L250 410 L248 296 Z" fill="#be123c" stroke="#fde047" strokeWidth="1.2" />
                        <path d="M252 296 L250 410 L264 410 L262 296 Z" fill="#be123c" stroke="#fde047" strokeWidth="1.2" />

                        {/* Kiềng bạc nhiều tầng quanh cổ */}
                        <path d="M232 125 C232 142 268 142 268 125" stroke="url(#silverJewelry)" strokeWidth="3" fill="none" />
                        <path d="M228 132 C228 152 272 152 272 132" stroke="url(#silverJewelry)" strokeWidth="3.5" fill="none" />
                        <path d="M224 140 C224 162 276 162 276 140" stroke="url(#silverJewelry)" strokeWidth="4" fill="none" />
                      </>
                    ) : (
                      <>
                        <line x1="250" y1="130" x2="250" y2="280" stroke="#fde047" strokeWidth="2.5" />
                        <rect x="204" y="278" width="92" height="18" fill="#be123c" stroke="#fde047" strokeWidth="2" rx="2" />
                        <circle cx="250" cy="287" r="6" fill="#fde047" stroke="#78350f" strokeWidth="1.2" />
                      </>
                    )}
                  </g>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 2: ÁO NHẬT BÌNH CUNG ĐÌNH (CỔ CHỮ NHẬT & DẢI TAY NGŨ SẮC)    */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId === 'ao_nhat_binh' && (
                  <g id="nhat-binh-costume">
                    {/* Tay áo thụng quý phái */}
                    {motionMode === 'chao_hoi' && !isBackView ? (
                      <>
                        <path d="M208 138 C185 150 162 185 174 218 C192 232 230 225 242 208 L235 190 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                        <path d="M292 138 C315 150 338 185 326 218 C308 232 270 225 258 208 L265 190 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                      </>
                    ) : (
                      <>
                        <path d="M208 140 C170 156 135 198 115 310 C128 345 176 360 198 295 L208 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                        <path d="M292 140 C330 156 365 198 385 310 C372 345 324 360 302 295 L292 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                        <g clipPath="url(#clip-sleeve-left)">
                          <rect x="110" y="130" width="100" height="230" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-right)">
                          <rect x="290" y="130" width="100" height="230" fill={activePatUrl} opacity="0.9" />
                        </g>
                        {/* Dải ngũ sắc ở cổ tay áo Nhật Bình */}
                        <g id="ngu-sac-sleeves">
                          <path d="M125 328 L142 348" stroke="#15803d" strokeWidth="4" />
                          <path d="M135 320 L152 340" stroke="#facc15" strokeWidth="4" />
                          <path d="M145 312 L162 332" stroke="#1d4ed8" strokeWidth="4" />
                          <path d="M155 304 L172 324" stroke="#ffffff" strokeWidth="4" />
                          <path d="M165 296 L182 316" stroke="#dc2626" strokeWidth="4" />

                          <path d="M375 328 L358 348" stroke="#15803d" strokeWidth="4" />
                          <path d="M365 320 L348 340" stroke="#facc15" strokeWidth="4" />
                          <path d="M355 312 L338 332" stroke="#1d4ed8" strokeWidth="4" />
                          <path d="M345 304 L328 324" stroke="#ffffff" strokeWidth="4" />
                          <path d="M335 296 L318 316" stroke="#dc2626" strokeWidth="4" />
                        </g>
                      </>
                    )}

                    {/* Thân áo Nhật Bình */}
                    <path
                      d="M216 130 C204 168 202 210 218 240 C206 295 186 385 174 448 Q250 464 326 448 C314 385 294 295 282 240 C298 210 296 168 284 130 Z"
                      fill={primaryFill}
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip-torso-standard)">
                      <rect x="170" y="125" width="160" height="330" fill={activePatUrl} opacity="0.96" />
                    </g>

                    {!isBackView ? (
                      <>
                        {/* Cổ áo hình chữ nhật đặc trưng Nhật Bình */}
                        <path d="M230 126 L230 210 L270 210 L270 126 Z" fill="none" stroke="#fde047" strokeWidth="6" />
                        <path d="M230 126 L230 210 L270 210 L270 126 Z" fill="none" stroke="#b45309" strokeWidth="2" />
                        {/* Vạt xẻ giữa ngực */}
                        <line x1="250" y1="210" x2="250" y2="445" stroke="#fde047" strokeWidth="4" />
                        {/* Thẻ bài / ngọc bội cung đình */}
                        <rect x="244" y="215" width="12" height="24" fill="#fde047" stroke="#b45309" strokeWidth="1.2" rx="2" />
                        <circle cx="250" cy="245" r="4" fill="#dc2626" />
                      </>
                    ) : (
                      <>
                        <line x1="250" y1="130" x2="250" y2="445" stroke="#fde047" strokeWidth="3" />
                        <circle cx="250" cy="190" r="18" fill="none" stroke="#fde047" strokeWidth="2" />
                      </>
                    )}
                  </g>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 3: ÁO TỨ THÂN & YẾM ĐÀO KINH BẮC (LỘ YẾM ĐÀO, DẢI LỤA THẮT NƠ) */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId === 'ao_tu_than' && (
                  <g id="tu-than-costume">
                    {/* Tay áo tứ thân: Chào hỏi, cầm quạt hoặc đứng thẳng */}
                    {motionMode === 'chao_hoi' && !isBackView ? (
                      <>
                        <path d="M208 138 C185 150 162 185 174 218 C192 232 230 225 242 208 L235 190 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <path d="M292 138 C315 150 338 185 326 218 C308 232 270 225 258 208 L265 190 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-greeting-l)">
                          <rect x="160" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-greeting-r)">
                          <rect x="255" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    ) : (motionMode === 'cam_quat' || config.handAccessory === 'quat_tram_huong' || config.handAccessory === 'quat_lua_theu') && !isBackView ? (
                      <>
                        <path d="M208 140 L165 240 L180 278 L195 265 L208 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-tu-than-l)">
                          <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <path d="M290 140 C316 156 338 186 326 218 C308 230 286 220 280 205 L290 185 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-fan-r)">
                          <rect x="275" y="135" width="65" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    ) : (
                      <>
                        <path d="M208 140 L165 240 L180 278 L195 265 L208 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <path d="M292 140 L335 240 L320 278 L305 265 L292 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-tu-than-l)">
                          <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-tu-than-r)">
                          <rect x="285" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    )}

                    {isBackView ? (
                      <g id="tu-than-back">
                        {/* 2 thân sau may liền sống lưng */}
                        <path
                          d="M214 130 C206 168 204 210 216 250 L188 448 Q250 460 312 448 L284 250 C296 210 294 168 286 130 Z"
                          fill={primaryFill}
                          stroke="#78350f"
                          strokeWidth="2"
                        />
                        <g clipPath="url(#clip-tu-than-back)">
                          <rect x="180" y="125" width="140" height="335" fill={activePatUrl} opacity="0.95" />
                        </g>
                        {/* Can sống lưng chuẩn cổ truyền */}
                        <line x1="250" y1="130" x2="250" y2="455" stroke="#fde047" strokeWidth="2.5" />
                      </g>
                    ) : (
                      <>
                        {/* Chiếc Yếm Đào đỏ thắm lấp ló bên trong có hoa văn */}
                        <path d="M228 126 L250 122 L272 126 L280 260 L220 260 Z" fill="#be123c" stroke="#fde047" strokeWidth="1.5" />
                        <g clipPath="url(#clip-yem-dao)">
                          <rect x="215" y="120" width="70" height="145" fill={activePatUrl} opacity="0.85" />
                        </g>
                        <circle cx="250" cy="175" r="8" fill="#fde047" opacity="0.8" />

                        {/* 2 vạt áo tứ thân mở sang 2 bên để lộ yếm đào */}
                        <path d="M214 130 L226 260 L205 440 L176 445 L204 220 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.8" />
                        <path d="M286 130 L274 260 L295 440 L324 445 L296 220 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.8" />
                        <g clipPath="url(#clip-torso-tu-than-l)">
                          <rect x="170" y="125" width="60" height="330" fill={activePatUrl} opacity="0.95" />
                        </g>
                        <g clipPath="url(#clip-torso-tu-than-r)">
                          <rect x="270" y="125" width="60" height="330" fill={activePatUrl} opacity="0.95" />
                        </g>

                        {/* Dải thắt lưng xanh & dải lụa đào thắt nơ buông rủ */}
                        <rect x="210" y="255" width="80" height="12" fill="#047857" stroke="#fde047" strokeWidth="1.5" rx="2" />
                        <path d="M242 267 Q250 275 258 267 L265 370 L255 370 L248 275 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
                        <path d="M236 267 Q244 275 252 267 L245 350 L235 350 L240 275 Z" fill="#fde047" stroke="#d97706" strokeWidth="1" />
                      </>
                    )}
                  </g>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 4: ÁO BÀ BA NAM BỘ (CỔ TRÒN/TIM, XẺ TÀ 2 BÊN, CÚC GIỮA, TÚI ÁO) */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId === 'ao_ba_ba' && (
                  <g id="ba-ba-costume">
                    {/* Tay áo dài raglan ôm mềm mại (chào hỏi, cầm quạt hoặc đứng thẳng) */}
                    {motionMode === 'chao_hoi' && !isBackView ? (
                      <>
                        <path d="M210 138 C185 150 162 185 174 218 C192 232 230 225 242 208 L235 190 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <path d="M290 138 C315 150 338 185 326 218 C308 232 270 225 258 208 L265 190 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-greeting-l)">
                          <rect x="160" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-greeting-r)">
                          <rect x="255" y="130" width="85" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    ) : (motionMode === 'cam_quat' || config.handAccessory === 'quat_tram_huong' || config.handAccessory === 'quat_lua_theu') && !isBackView ? (
                      <>
                        <path d="M210 138 L168 240 L184 278 L198 265 L210 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-ba-ba-l)">
                          <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <path d="M290 140 C316 156 338 186 326 218 C308 230 286 220 280 205 L290 185 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-fan-r)">
                          <rect x="275" y="135" width="65" height="100" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    ) : (
                      <>
                        <path d="M210 138 L168 240 L184 278 L198 265 L210 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <path d="M290 138 L332 240 L316 278 L302 265 L290 210 Z" fill={primaryFill} stroke="#78350f" strokeWidth="1.5" />
                        <g clipPath="url(#clip-sleeve-ba-ba-l)">
                          <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                        <g clipPath="url(#clip-sleeve-ba-ba-r)">
                          <rect x="285" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                        </g>
                      </>
                    )}

                    {/* Thân áo bà ba xẻ tà ngang hông */}
                    <path
                      d="M214 130 C206 168 206 200 216 240 L204 330 Q250 340 296 330 L284 240 C294 200 294 168 286 130 Z"
                      fill={primaryFill}
                      stroke="#78350f"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip-torso-ba-ba)">
                      <rect x="190" y="125" width="120" height="215" fill={activePatUrl} opacity="0.95" />
                    </g>

                    {!isBackView ? (
                      <>
                        {/* Cổ tròn/cổ tim nhẹ */}
                        <path d="M234 126 Q250 142 266 126" stroke="#fde047" strokeWidth="2.5" fill="none" />
                        {/* Hàng cúc khuy tròn chạy giữa ngực */}
                        <line x1="250" y1="142" x2="250" y2="330" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
                        {Array.from({ length: 6 }).map((_, i) => (
                          <circle key={i} cx="250" cy={155 + i * 28} r="2.8" fill="#fde047" stroke="#78350f" strokeWidth="0.8" />
                        ))}
                        {/* Hai túi nhỏ hai bên vạt dưới */}
                        <rect x="214" y="285" width="22" height="24" fill="none" stroke="#fde047" strokeWidth="1.5" rx="3" />
                        <rect x="264" y="285" width="22" height="24" fill="none" stroke="#fde047" strokeWidth="1.5" rx="3" />
                        {/* Khăn rằn vắt qua vai */}
                        <path d="M228 135 C222 170 218 220 220 260" stroke="#f8fafc" strokeWidth="8" strokeDasharray="3 3" fill="none" />
                        <path d="M228 135 C222 170 218 220 220 260" stroke="#0f172a" strokeWidth="8" strokeDasharray="3 3" strokeDashoffset="3" fill="none" />
                      </>
                    ) : (
                      <line x1="250" y1="130" x2="250" y2="330" stroke="#78350f" strokeWidth="1.5" />
                    )}
                  </g>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 5: ÁO GIAO LĨNH CỔ TRUYỀN (CỔ GIAO CHÉO TẢ ÁP HỮU, TAY THỤNG) */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId === 'ao_giao_linh' && (
                  <g id="giao-linh-costume">
                    {/* Tay áo thụng uy nghi */}
                    <path d="M208 138 C165 155 130 200 110 310 C125 345 175 360 198 295 L208 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                    <path d="M292 138 C335 155 370 200 390 310 C375 345 325 360 302 295 L292 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />

                    {/* Thân áo dài chạm gót */}
                    <path
                      d="M214 126 L188 195 L174 448 Q250 464 326 448 L312 195 L286 126 Z"
                      fill={primaryFill}
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                    <g clipPath="url(#clip-torso-standard)">
                      <rect x="170" y="125" width="160" height="330" fill={activePatUrl} opacity="0.95" />
                    </g>

                    {!isBackView ? (
                      <>
                        {/* Cổ giao chéo Tả áp Hữu (vạt trái đè lên vạt phải) */}
                        <path d="M226 126 L276 220" stroke="#ffffff" strokeWidth="5" />
                        <path d="M274 126 L230 205" stroke="#fde047" strokeWidth="5" />
                        {/* Dải lụa thắt vạt ngang eo */}
                        <rect x="206" y="235" width="88" height="14" fill="#047857" stroke="#fde047" strokeWidth="1.5" rx="2" />
                        <path d="M260 245 L255 360 L268 360 L273 245 Z" fill="#047857" stroke="#fde047" strokeWidth="1" />
                      </>
                    ) : (
                      <line x1="250" y1="126" x2="250" y2="445" stroke="#fde047" strokeWidth="2.5" />
                    )}
                  </g>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* LOẠI 6: ÁO TẤC / ÁO NGŨ THÂN TAY CHẼN / TRANG PHỤC CHĂM          */}
                {/* ----------------------------------------------------------------- */}
                {config.costumeId !== 'trang_phuc_hmong' &&
                  config.costumeId !== 'ao_nhat_binh' &&
                  config.costumeId !== 'ao_tu_than' &&
                  config.costumeId !== 'ao_ba_ba' &&
                  config.costumeId !== 'ao_giao_linh' && (
                    <g id="ngu-than-standard-costume">
                      {/* Tay áo: thụng (Áo Tấc), cầm quạt, hoặc chẽn (Ngũ thân) */}
                      {config.costumeId === 'ao_tac_ngu_than' ? (
                        <>
                          <path d="M208 140 C170 156 135 198 115 310 C128 345 176 360 198 295 L208 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <path d="M292 140 C330 156 365 198 385 310 C372 345 324 360 302 295 L292 220 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <g clipPath="url(#clip-sleeve-left)">
                            <rect x="110" y="130" width="100" height="230" fill={activePatUrl} opacity="0.9" />
                          </g>
                          <g clipPath="url(#clip-sleeve-right)">
                            <rect x="290" y="130" width="100" height="230" fill={activePatUrl} opacity="0.9" />
                          </g>
                        </>
                      ) : (motionMode === 'cam_quat' || config.handAccessory === 'quat_tram_huong' || config.handAccessory === 'quat_lua_theu') && !isBackView ? (
                        <>
                          <path d="M210 140 L170 240 L186 278 L200 265 L210 210 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <g clipPath="url(#clip-sleeve-ba-ba-l)">
                            <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                          </g>
                          <path d="M290 140 C316 156 338 186 326 218 C308 230 286 220 280 205 L290 185 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <g clipPath="url(#clip-sleeve-fan-r)">
                            <rect x="275" y="135" width="65" height="100" fill={activePatUrl} opacity="0.9" />
                          </g>
                        </>
                      ) : (
                        <>
                          <path d="M210 140 L170 240 L186 278 L200 265 L210 210 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <path d="M290 140 L330 240 L314 278 L300 265 L290 210 Z" fill={primaryFill} stroke="#d97706" strokeWidth="1.8" />
                          <g clipPath="url(#clip-sleeve-ba-ba-l)">
                            <rect x="160" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                          </g>
                          <g clipPath="url(#clip-sleeve-ba-ba-r)">
                            <rect x="285" y="135" width="55" height="148" fill={activePatUrl} opacity="0.9" />
                          </g>
                        </>
                      )}

                      {/* Thân áo chính */}
                      <path
                        d={
                          isFemale
                            ? "M216 130 C204 168 202 210 218 240 C206 295 186 385 174 448 Q250 464 326 448 C314 385 294 295 282 240 C298 210 296 168 284 130 Z"
                            : "M204 126 L190 195 L178 445 Q250 460 322 445 L310 195 L296 126 Z"
                        }
                        fill={primaryFill}
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                      <g clipPath="url(#clip-torso-standard)">
                        <rect x="170" y="125" width="160" height="330" fill={activePatUrl} opacity="0.95" />
                      </g>

                      {!isBackView ? (
                        <>
                          {/* Nẹp vạt chéo & 5 khuy cài hữu nhậm */}
                          <path d="M248 132 L275 155 L278 200 L276 435" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                          <circle cx="254" cy="140" r="3.2" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
                          <circle cx="268" cy="150" r="3.2" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
                          <circle cx="276" cy="165" r="3.2" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
                          <circle cx="277" cy="185" r="3.2" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
                          <circle cx="277" cy="210" r="3.2" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
                          {/* Dải khăn Chăm vắt vai nếu là đồ Chăm */}
                          {config.costumeId === 'trang_phuc_cham' && (
                            <path d="M228 130 L272 245 L255 420" stroke="#f59e0b" strokeWidth="9" fill="none" />
                          )}
                        </>
                      ) : (
                        <line x1="250" y1="130" x2="250" y2="445" stroke="#fde047" strokeWidth="2.5" />
                      )}
                    </g>
                  )}
              </g>

              {/* 3. CỔ ÁO LIỀN KHỐI (KHÔNG CÓ KHOẢNG HỞ GIỮA CẰM VÀ THÂN ÁO) */}
              <g id="neck-connected">
                <path d="M238 90 L236 130 L264 130 L262 90 Z" fill="url(#skinToneGrad)" />
                <ellipse cx="250" cy="98" rx="14" ry="5" fill="url(#neckShadowGrad)" />
                {/* Cổ đứng lập lĩnh viền trắng thanh nhã */}
                {config.costumeId !== 'trang_phuc_hmong' && config.costumeId !== 'ao_ba_ba' && (
                  <path d="M234 122 C234 116 266 116 266 122 L268 134 C258 138 242 138 232 134 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                )}
              </g>

              {/* 4. ĐẦU, KHUÔN MẶT THANH TÚ, MÁI TÓC THẢ TỰ NHIÊN & TRANG SỨC CỔ TRUYỀN */}
              <g id="face-and-hair">
                {!isBackView ? (
                  isFemale ? (
                    <g id="female-face">
                      {/* Vòm cằm thanh tú chuẩn nét vẽ hoạt họa dân gian Việt Nam */}
                      <path
                        d="M232 66 C230 82 236 96 250 102 C264 96 270 82 268 66 C265 54 235 54 232 66 Z"
                        fill="url(#skinToneGrad)"
                        stroke="#c2410c"
                        strokeWidth="0.8"
                      />

                      {/* Đôi má ửng hồng phấn đào tự nhiên */}
                      <circle cx="237" cy="86" r="8" fill="url(#cheeksBlush)" />
                      <circle cx="263" cy="86" r="8" fill="url(#cheeksBlush)" />

                      {/* ĐÔI MẮT PHƯỢNG HOẠT HỌA THANH TOÁT & CHÂN MÀY LÁ LIỄU */}
                      {/* Chân mày lá liễu thanh mảnh duyên dáng */}
                      <path d="M235 71 Q241.5 66.5 248 70" stroke="#27272a" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                      <path d="M252 70 Q258.5 66.5 265 71" stroke="#27272a" strokeWidth="1.4" strokeLinecap="round" fill="none" />

                      {/* Mí mắt đôi thanh tú */}
                      <path d="M238 74 Q242.5 72 247 73.5" stroke="#9a3412" strokeWidth="0.7" opacity="0.6" fill="none" />
                      <path d="M253 73.5 Q257.5 72 262 74" stroke="#9a3412" strokeWidth="0.7" opacity="0.6" fill="none" />

                      {/* Đường viền mí trên vẽ mắt đuôi phượng kiêu kỳ */}
                      <path d="M236 78 Q242 73.5 248.5 77" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                      <path d="M251.5 77 Q258 73.5 264 78" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                      <line x1="248" y1="77" x2="249.5" y2="76" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="263.5" y1="77.5" x2="265" y2="76.5" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" />

                      {/* Tròng mắt đen huyền có chiều sâu hoạt họa long lanh */}
                      <ellipse cx="243" cy="80.5" rx="3.3" ry="3.6" fill="#18181b" />
                      <ellipse cx="257" cy="80.5" rx="3.3" ry="3.6" fill="#18181b" />
                      <circle cx="243" cy="81.5" r="2" fill="#451a03" opacity="0.8" />
                      <circle cx="257" cy="81.5" r="2" fill="#451a03" opacity="0.8" />
                      {/* Đốm sáng phản chiếu ánh mắt */}
                      <circle cx="244.2" cy="79.3" r="1.1" fill="#ffffff" />
                      <circle cx="258.2" cy="79.3" r="1.1" fill="#ffffff" />
                      <circle cx="242" cy="81.8" r="0.6" fill="#ffffff" opacity="0.8" />
                      <circle cx="256" cy="81.8" r="0.6" fill="#ffffff" opacity="0.8" />

                      {/* Viền mi dưới mềm mại */}
                      <path d="M239 84 Q243 85 247 83.5" stroke="#78350f" strokeWidth="0.6" opacity="0.4" fill="none" />
                      <path d="M253 83.5 Q257 85 261 84" stroke="#78350f" strokeWidth="0.6" opacity="0.4" fill="none" />

                      {/* SỐNG MŨI THON GỌN & ĐẦU MŨI ĐẸP */}
                      <path d="M250 76 L249.2 84 Q249 87 251.2 87" stroke="#c2410c" strokeWidth="0.8" opacity="0.6" fill="none" />
                      <ellipse cx="250" cy="87.2" rx="2" ry="0.8" fill="#ea580c" opacity="0.25" />

                      {/* ĐÔI MÔI TRÁI TIM CHÚM CHÍM CÓ ĐỘ BÓNG */}
                      <path d="M244 91.5 Q247 89.5 250 90.8 Q253 89.5 256 91.5 Q250 92 244 91.5 Z" fill="#e11d48" />
                      <path d="M244.5 92 Q250 96 255.5 92 Q250 92.5 244.5 92 Z" fill="#f43f5e" />
                      <path d="M244.8 91.8 Q250 92.4 255.2 91.8" stroke="#881337" strokeWidth="0.7" fill="none" />
                      {/* Điểm bóng sáng môi duyên */}
                      <ellipse cx="250" cy="93.3" rx="1.8" ry="0.7" fill="#ffffff" opacity="0.65" />

                      {/* HOA TAI NGỌC GIỌT NƯỚC CUNG ĐÌNH TRUYỀN THỐNG */}
                      <g id="jade-earrings">
                        <line x1="230" y1="84" x2="230" y2="87" stroke="#facc15" strokeWidth="0.8" />
                        <circle cx="230" cy="87" r="1" fill="#fde047" />
                        <path d="M230 88 C228.5 91 228.5 94 230 95.5 C231.5 94 231.5 91 230 88 Z" fill="url(#imperialJadeGrad)" stroke="#047857" strokeWidth="0.4" />
                        <line x1="270" y1="84" x2="270" y2="87" stroke="#facc15" strokeWidth="0.8" />
                        <circle cx="270" cy="87" r="1" fill="#fde047" />
                        <path d="M270 88 C268.5 91 268.5 94 270 95.5 C271.5 94 271.5 91 270 88 Z" fill="url(#imperialJadeGrad)" stroke="#047857" strokeWidth="0.4" />
                      </g>

                      {/* MÁI TÓC THẢ TỰ NHIÊN / TÓC MÂY BUÔNG XÕA VAI THA THƯỚT */}
                      {config.headwear === 'none' || !config.headwear ? (
                        <g id="natural-loose-hair">
                          {/* Chỏm tóc đỉnh đầu rẽ ngôi mượt mà */}
                          <path
                            d="M228 68 C226 50 248 46 250 46 C252 46 274 50 272 68 C266 56 234 56 228 68 Z"
                            fill="url(#hairGrad)"
                          />
                          {/* Lọn tóc mai mềm mại ôm nhẹ bờ má */}
                          <path d="M230 68 C228 78 228 88 231 96 C229 88 228 78 230 68 Z" fill="#18181b" />
                          <path d="M270 68 C272 78 272 88 269 96 C271 88 272 78 270 68 Z" fill="#18181b" />

                          {/* HAI DẢI TÓC MÂY DÀI BUÔNG XÕA QUA VAI XUỐNG NGỰC */}
                          <g id="flowing-shoulder-tresses">
                            {/* Dải tóc bên vai trái */}
                            <path
                              d="M229 74 C224 95 218 125 215 165 C215 178 220 188 217 196 C214 188 217 175 218 165 C222 125 228 95 233 74 Z"
                              fill="url(#hairSheenGrad)"
                              stroke="#09090b"
                              strokeWidth="0.6"
                            />
                            <path d="M227 95 C222 130 217 165 216 190" stroke="#3f3f46" strokeWidth="0.8" fill="none" opacity="0.7" />

                            {/* Dải tóc bên vai phải */}
                            <path
                              d="M271 74 C276 95 282 125 285 165 C285 178 280 188 283 196 C286 188 283 175 282 165 C278 125 272 95 267 74 Z"
                              fill="url(#hairSheenGrad)"
                              stroke="#09090b"
                              strokeWidth="0.6"
                            />
                            <path d="M273 95 C278 130 283 165 284 190" stroke="#3f3f46" strokeWidth="0.8" fill="none" opacity="0.7" />
                          </g>

                          {/* Trâm cài hoa sen vàng đính ngọc quý phái (khi không dùng nón) */}
                          {(!config.nonLa || config.nonLa === 'none') && (
                            <g id="lotus-hairpin" transform="translate(233, 58)">
                              <line x1="-8" y1="4" x2="8" y2="-4" stroke="#facc15" strokeWidth="1.5" />
                              <circle cx="-6" cy="3" r="2.5" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />
                              <circle cx="-6" cy="3" r="1.2" fill="url(#imperialJadeGrad)" />
                              <circle cx="-9" cy="5" r="1.2" fill="#ef4444" />
                            </g>
                          )}
                        </g>
                      ) : (
                        /* Mái tóc vấn gọn ghẽ khi đội khăn xếp / khăn vành */
                        <g id="tucked-hair">
                          <path d="M228 72 Q250 56 272 72 C268 62 232 62 228 72 Z" fill="url(#hairGrad)" />
                        </g>
                      )}
                    </g>
                  ) : (
                    /* KHUÔN MẶT NAM NHI VIỆT HOẠT HỌA THANH LỊCH NHO NHÃ */
                    <g id="male-face">
                      <path
                        d="M230 68 C228 82 234 96 250 102 C266 96 272 82 270 68 C266 56 234 56 230 68 Z"
                        fill="url(#skinToneGrad)"
                        stroke="#b45309"
                        strokeWidth="1"
                      />
                      <path d="M228 68 Q250 52 272 68 Q250 62 228 68 Z" fill="url(#hairGrad)" />
                      {/* Chân mày kiếm nam tính */}
                      <line x1="236" y1="76" x2="247" y2="73" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                      <line x1="253" y1="73" x2="264" y2="76" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                      {/* Đôi mắt sáng cương trực */}
                      <ellipse cx="242" cy="79.5" rx="3" ry="2.2" fill="#0f172a" />
                      <ellipse cx="258" cy="79.5" rx="3" ry="2.2" fill="#0f172a" />
                      <circle cx="243" cy="78.8" r="0.8" fill="#ffffff" />
                      <circle cx="259" cy="78.8" r="0.8" fill="#ffffff" />
                      {/* Sống mũi cao */}
                      <line x1="250" y1="76" x2="250" y2="86" stroke="#b45309" strokeWidth="1.2" opacity="0.7" />
                      {/* Đôi môi kiên định */}
                      <path d="M245 92 Q250 94 255 92" stroke="#b45309" strokeWidth="1.8" fill="none" />
                    </g>
                  )
                ) : (
                  /* MẶT SAU GÁY TÓC MÂY (GÓC NHÌN TỪ PHÍA SAU 360°) */
                  <g id="rear-head">
                    <ellipse cx="250" cy="80" rx="20" ry="22" fill="url(#hairGrad)" />
                    {isFemale ? (
                      config.headwear === 'none' || !config.headwear ? (
                        /* Tóc mây buông dài tha thướt phía sau lưng */
                        <g id="rear-long-flowing-hair">
                          <path
                            d="M230 76 C220 110 212 170 216 260 C230 272 250 274 270 272 C288 270 280 170 270 76 Z"
                            fill="url(#hairSheenGrad)"
                          />
                          <path d="M232 100 C226 160 226 230 238 266" stroke="#3f3f46" strokeWidth="1.2" fill="none" opacity="0.6" />
                          <path d="M268 100 C274 160 274 230 262 266" stroke="#3f3f46" strokeWidth="1.2" fill="none" opacity="0.6" />
                          <path d="M250 90 L250 270" stroke="#18181b" strokeWidth="1.4" opacity="0.5" />
                          {/* Trâm ngọc cài đầu phía sau */}
                          <line x1="234" y1="70" x2="266" y2="76" stroke="#fde047" strokeWidth="2.5" />
                          <circle cx="266" cy="76" r="3.2" fill="url(#imperialJadeGrad)" stroke="#047857" strokeWidth="0.8" />
                        </g>
                      ) : (
                        /* Búi tóc / cài trâm sau gáy */
                        <>
                          <circle cx="250" cy="68" r="14" fill="#09090b" />
                          <line x1="232" y1="62" x2="270" y2="74" stroke="#fde047" strokeWidth="3" />
                          <circle cx="270" cy="74" r="3.5" fill="#dc2626" />
                        </>
                      )
                    ) : (
                      <line x1="250" y1="70" x2="250" y2="90" stroke="#fde047" strokeWidth="1.2" />
                    )}
                  </g>
                )}

                {/* KHĂN ĐÓNG / KHĂN VÀNH DÂY / NÓN LÁ / MŨ H'MÔNG */}
                {config.costumeId === 'trang_phuc_hmong' ? (
                  <g id="hmong-cap" transform="translate(250, 64)">
                    <ellipse cx="0" cy="0" rx="27" ry="14" fill="#047857" stroke="#fde047" strokeWidth="1.5" />
                    <rect x="-24" y="-8" width="48" height="12" fill="#be123c" rx="2" />
                    <line x1="-24" y1="-2" x2="24" y2="-2" stroke="#fde047" strokeWidth="1.8" />
                    {Array.from({ length: 7 }).map((_, i) => (
                      <circle key={i} cx={-18 + i * 6} cy="6" r="1.5" fill="#f8fafc" stroke="#475569" strokeWidth="0.5" />
                    ))}
                  </g>
                ) : config.headwear === 'khan_vanh_day' ? (
                  <g id="khan-vanh-day" transform="translate(250, 64)">
                    <ellipse cx="0" cy="0" rx="30" ry="15" fill="#ca8a04" stroke="#fde047" strokeWidth="2" />
                    <ellipse cx="0" cy="-2" rx="26" ry="12" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
                    <ellipse cx="0" cy="-4" rx="22" ry="10" fill="#facc15" stroke="#fef08a" strokeWidth="1" />
                  </g>
                ) : config.headwear === 'khan_dong_nam' ? (
                  <ellipse cx="250" cy="66" rx="28" ry="14" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
                ) : config.headwear === 'khan_dong_nu' ? (
                  <ellipse cx="250" cy="64" rx="29" ry="15" fill="#991b1b" stroke="#fde047" strokeWidth="1.5" />
                ) : null}

                {/* NÓN LÁ TRUYỀN THỐNG (Nón Bài Thơ, Nón Chuông, Nón Ba Tầm, Nón Chóp Nhọn) */}
                {config.nonLa === 'non_ba_tam' ? (
                  <g id="non-ba-tam" transform="translate(250, 48)">
                    <ellipse cx="0" cy="0" rx="55" ry="18" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
                    <ellipse cx="0" cy="-3" rx="48" ry="14" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                    {/* Quai thao rủ hai bên tha thướt */}
                    <path d="M-40 4 C-44 50 -20 80 0 85 C20 80 44 50 40 4" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                  </g>
                ) : config.nonLa && config.nonLa !== 'none' ? (
                  <g id="non-la" transform="translate(250, 46)">
                    {/* Nón lá chóp nhọn dáng thanh tao */}
                    <path d="M0 -36 L-62 14 C-35 26 35 26 62 14 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                    <path d="M-45 4 C-20 15 20 15 45 4" stroke="#ca8a04" strokeWidth="1" fill="none" />
                    {/* Vành nón lá đan nan tròn đều */}
                    <path d="M-30 -10 C-15 0 15 0 30 -10" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.6" />
                    <path d="M-15 -22 C-8 -15 8 -15 15 -22" stroke="#d97706" strokeWidth="0.8" fill="none" opacity="0.6" />
                    {/* Quai nón lụa mềm mại ôm dưới cằm */}
                    <path d="M-32 12 C-38 48 -14 74 0 78 C14 74 38 48 32 12" stroke="#dc2626" strokeWidth="2.5" fill="none" />
                  </g>
                ) : null}

                {/* 4.1. TRANG SỨC CỔ TRUYỀN (Kiềng Bạc Chạm Sen, Thẻ Bài Hoàng Gia, Vòng Cẩm Thạch) */}
                {!isBackView && (
                  <g id="traditional-jewelry">
                    {config.jewelry === 'kieng_bac_cham_sen' ? (
                      /* A. KIỀNG BẠC CHẠM SEN TRUYỀN THỐNG */
                      <g id="kieng-bac-cham-sen">
                        {/* Vòng kiềng bạc sáng ánh kim ôm sát cổ áo */}
                        <path
                          d="M232 124 C232 144 268 144 268 124"
                          stroke="url(#silverJewelry)"
                          strokeWidth="5"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M233 124 C233 142 267 142 267 124"
                          stroke="#ffffff"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.8"
                        />
                        {/* Móc cài hoa văn mây & đóa sen bạc chạm khắc tinh xảo ở giữa ngực */}
                        <g id="lotus-silver-clasp" transform="translate(250, 137)">
                          <circle cx="0" cy="0" r="4.5" fill="url(#silverJewelry)" stroke="#475569" strokeWidth="0.6" />
                          <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
                          {/* 4 cánh sen bạc bung nở */}
                          <path d="M0 -4 Q-2.5 -1.5 0 0 Q2.5 -1.5 0 -4 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.4" />
                          <path d="M0 4 Q-2.5 1.5 0 0 Q2.5 1.5 0 4 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.4" />
                          <path d="M-4 0 Q-1.5 -2.5 0 0 Q-1.5 2.5 -4 0 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.4" />
                          <path d="M4 0 Q1.5 -2.5 0 0 Q1.5 2.5 4 0 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.4" />
                          {/* Đốm sáng bạc lấp lánh */}
                          <circle cx="-0.8" cy="-0.8" r="0.7" fill="#ffffff" />
                        </g>
                      </g>
                    ) : config.jewelry === 'the_bai_hoang_gia' ? (
                      /* B. THẺ BÀI / BỘI NGỌC CUNG ĐÌNH TRIỀU NGUYỄN */
                      <g id="the-bai-hoang-gia">
                        {/* Dây lụa tơ vàng đeo qua cổ áo */}
                        <path d="M242 124 L249 148 M258 124 L251 148" stroke="#facc15" strokeWidth="1.8" />
                        {/* Hạt cẩm thạch bích ngọc nối dây */}
                        <circle cx="250" cy="148" r="3" fill="url(#imperialJadeGrad)" stroke="#047857" strokeWidth="0.8" />
                        <circle cx="249.2" cy="147.2" r="0.9" fill="#a7f3d0" />
                        {/* Gút kết cát tường đỏ son */}
                        <rect x="247.5" y="151.5" width="5" height="5" rx="1.2" fill="#dc2626" stroke="#fde047" strokeWidth="0.8" transform="rotate(45 250 154)" />

                        {/* Thẻ bài ngà / ngọc thếp vàng Triều Nguyễn */}
                        <g id="imperial-plaque" transform="translate(250, 158)">
                          {/* Khung thẻ bài chạm viền hoa văn lượn sóng */}
                          <rect x="-8.5" y="0" width="17" height="32" rx="3" fill="#fef9c3" stroke="#b45309" strokeWidth="1.4" />
                          <rect x="-6.5" y="2" width="13" height="28" rx="1.8" fill="none" stroke="#d97706" strokeWidth="0.8" strokeDasharray="2 1" />
                          {/* Chữ son Cung Đình 'PHÚC' (福) hoặc 'CÁT TƯỜNG' */}
                          <text x="0" y="14" fill="#dc2626" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="serif">福</text>
                          <text x="0" y="24" fill="#dc2626" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="serif">祿</text>
                          {/* Đai chụp vàng chân thẻ bài */}
                          <rect x="-6" y="31.5" width="12" height="3.5" rx="1" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />
                          <circle cx="0" cy="33" r="1.2" fill="#059669" />
                          {/* Chùm tua rua tơ tằm đỏ son rủ dài đến thắt lưng */}
                          <line x1="0" y1="35" x2="0" y2="66" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                          <line x1="-2" y1="35" x2="-2" y2="62" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
                          <line x1="2" y1="35" x2="2" y2="62" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
                        </g>
                      </g>
                    ) : config.jewelry === 'vong_ngoc_cam_thach' ? (
                      /* C. VÒNG CẨM THẠCH & CHUỖI BỘI NGỌC */
                      <g id="vong-ngoc-cam-thach">
                        {/* Dây chuyền ngọc bội cẩm thạch trước ngực */}
                        <path d="M240 124 Q250 144 260 124" stroke="#facc15" strokeWidth="1.2" fill="none" />
                        <circle cx="250" cy="138" r="5" fill="url(#imperialJadeGrad)" stroke="#fde047" strokeWidth="1" />
                        <circle cx="250" cy="138" r="2.2" fill="#047857" />
                        <circle cx="248.5" cy="136.5" r="1.2" fill="#a7f3d0" opacity="0.9" />
                        <line x1="250" y1="143" x2="250" y2="152" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />

                        {/* Vòng cẩm thạch trên cổ tay phải */}
                        <ellipse cx="312" cy="275" rx="8" ry="4.5" fill="none" stroke="url(#imperialJadeGrad)" strokeWidth="3.2" />
                        <ellipse cx="310" cy="274" rx="5" ry="2" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.75" />
                      </g>
                    ) : null}
                  </g>
                )}
              </g>

              {/* 5. CÁC TƯ THẾ CỬ ĐỘNG & BÀN TAY LIỀN KHỐI KÈM PHỤ KIỆN CẦM TAY CHUẨN XÁC */}
              <g id="gestures-and-hands">
                {motionMode === 'chao_hoi' && !isBackView ? (
                  /* 1. CHÀO HỎI: CHẮP HAI TAY THÀNH KÍNH TRƯỚC NGỰC */
                  <g id="hands-greeting">
                    <ellipse cx="244" cy="212" rx="8" ry="6" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                    <ellipse cx="256" cy="212" rx="8" ry="6" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                    <path d="M242 208 Q250 205 258 208" stroke="#78350f" strokeWidth="1.2" fill="none" />
                    <path d="M244 214 Q250 216 256 214" stroke="#78350f" strokeWidth="1.2" fill="none" />

                    {/* Nếu có Chuỗi Ngọc Cầm Tay: quấn quanh cổ tay thành kính */}
                    {config.handAccessory === 'chuoi_ngoc_tay' && (
                      <g id="greeting-jade-beads">
                        <ellipse cx="250" cy="220" rx="14" ry="7" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="3 2" />
                        <circle cx="250" cy="227" r="3.5" fill="#facc15" stroke="#b45309" strokeWidth="1" />
                        <line x1="250" y1="230" x2="250" y2="252" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    )}

                    {/* Nếu có Túi Gấm Cát Tường: quai túi gấm rủ nhẹ từ cổ tay */}
                    {config.handAccessory === 'tui_gam_cat_tuong' && (
                      <g id="greeting-brocade-pouch" transform="translate(258, 218)">
                        <line x1="0" y1="0" x2="6" y2="18" stroke="#fde047" strokeWidth="1.5" />
                        <circle cx="6" cy="18" r="2.5" fill="#10b981" />
                        {/* Gút cát tường */}
                        <rect x="2" y="21" width="8" height="8" rx="2" fill="#dc2626" stroke="#fde047" strokeWidth="1" transform="rotate(45 6 25)" />
                        {/* Thân túi gấm */}
                        <path d="M-2 30 C-6 38 -4 48 6 50 C16 48 18 38 14 30 Z" fill="#991b1b" stroke="#fde047" strokeWidth="1.2" />
                        {/* Tua rua đỏ */}
                        <line x1="6" y1="50" x2="6" y2="68" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="6" y1="50" x2="6" y2="55" stroke="#fde047" strokeWidth="3" />
                      </g>
                    )}
                  </g>
                ) : motionMode === 'cam_quat' || config.handAccessory === 'quat_tram_huong' || config.handAccessory === 'quat_lua_theu' ? (
                  /* 2. CẦM QUẠT: QUẠT TRẦM HƯƠNG DÁT VÀNG HOẶC QUẠT LỤA TRÒN THÊU SEN */
                  !isBackView && (
                    <g id="hands-fan-group">
                      {/* Bàn tay trái buông tự nhiên */}
                      <ellipse cx="186" cy="295" rx="6" ry="5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />

                      {/* Phụ kiện quạt trên tay phải nâng lên duyên dáng */}
                      <g transform="translate(285, 200) rotate(-22)">
                        {config.handAccessory === 'quat_tram_huong' ? (
                          /* A. QUẠT TRẦM HƯƠNG DÁT VÀNG: Quạt xếp nan gỗ trầm chạm lộng lưỡng long chầu nguyệt, dát vàng quỳ, đinh tán đồng khảm ngọc bích, kết tua rua lụa tơ tằm */
                          <g id="folding-sandalwood-fan">
                            {/* Chùm nan gỗ trầm hương xòe hình cánh quạt uyển chuyển chạm lộng */}
                            <g id="fan-wooden-ribs">
                              {/* 11 nan quạt gỗ trầm chạm lộng mạ vàng quỳ */}
                              {[-42, -34, -25, -17, -8, 0, 8, 17, 25, 34, 42].map((angle, idx) => (
                                <g key={idx} transform={`rotate(${angle} 0 24)`}>
                                  {/* Thân nan gỗ trầm hương vân gỗ tự nhiên */}
                                  <line x1="0" y1="24" x2="0" y2="-32" stroke="#451a03" strokeWidth="2.8" strokeLinecap="round" />
                                  <line x1="0" y1="24" x2="0" y2="-32" stroke="#78350f" strokeWidth="1.6" />
                                  {/* Hoa văn khảm xà cừ & dát vàng quỳ trên nan */}
                                  <line x1="0" y1="-10" x2="0" y2="-30" stroke="#fef08a" strokeWidth="1" opacity="0.9" />
                                  <circle cx="0" cy="-22" r="1.1" fill="#facc15" stroke="#b45309" strokeWidth="0.4" />
                                  <circle cx="0" cy="-14" r="0.9" fill="#fde047" />
                                </g>
                              ))}
                              {/* Nẹp viền cung tròn dải lụa tơ vàng kết các nan quạt */}
                              <path d="M-30 -19 Q0 -42 30 -19" stroke="#fde047" strokeWidth="2.8" fill="none" opacity="0.95" />
                              <path d="M-28 -17 Q0 -40 28 -17" stroke="#b45309" strokeWidth="1.2" fill="none" opacity="0.8" />
                              <path d="M-22 -8 Q0 -28 22 -8" stroke="#fde047" strokeWidth="1.2" strokeDasharray="2 2" fill="none" opacity="0.85" />
                            </g>

                            {/* Hai nan cái dày dặn bằng gỗ trầm cổ thụ chạm hoa cúc & vân rồng nổi bật */}
                            <line x1="0" y1="24" x2="-30" y2="-19" stroke="#290e05" strokeWidth="3.6" strokeLinecap="round" />
                            <line x1="0" y1="24" x2="30" y2="-19" stroke="#290e05" strokeWidth="3.6" strokeLinecap="round" />
                            <line x1="0" y1="24" x2="-30" y2="-19" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 2" />
                            <line x1="0" y1="24" x2="30" y2="-19" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 2" />

                            {/* Chuôi quạt: Đinh tán đồng thau đúc mắt phượng khảm hạt ngọc bích */}
                            <circle cx="0" cy="24" r="3.6" fill="#d97706" stroke="#fef08a" strokeWidth="1.2" />
                            <circle cx="0" cy="24" r="2" fill="#059669" stroke="#047857" strokeWidth="0.5" />

                            {/* Khuyên đồng & gút kết cát tường mini dưới chuôi quạt */}
                            <ellipse cx="0" cy="28" rx="2" ry="1.5" fill="none" stroke="#facc15" strokeWidth="1" />
                            <rect x="-2.5" y="29.5" width="5" height="5" rx="1.2" fill="#dc2626" stroke="#fde047" strokeWidth="0.8" transform="rotate(45 0 32)" />

                            {/* Dây lụa tơ tằm đỏ son & đôi hạt ngọc bích, ngọc hoàng long */}
                            <line x1="0" y1="34" x2="0" y2="40" stroke="#dc2626" strokeWidth="2.2" />
                            <circle cx="0" cy="40" r="3" fill="#059669" stroke="#047857" strokeWidth="0.8" />
                            <circle cx="0" cy="45" r="2.2" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />

                            {/* Chùm tua rua tơ tằm đỏ son rủ dài quý phái điểm chỉ vàng */}
                            <line x1="0" y1="47" x2="0" y2="70" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
                            <line x1="-2" y1="48" x2="-2" y2="67" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="2" y1="48" x2="2" y2="67" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round" />
                            <rect x="-3" y="47.5" width="6" height="3" fill="#facc15" stroke="#b45309" strokeWidth="0.6" rx="0.8" />
                          </g>
                        ) : (
                          /* B. QUẠT LỤA TRÒN THÊU SEN: Khung viền tre uốn mạ vàng, lụa tơ tằm thêu hoa sen, cán dài đính tua rua */
                          <g id="round-silk-lotus-fan">
                            {/* Cán quạt dài bằng tre vót bóng */}
                            <line x1="0" y1="0" x2="0" y2="34" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                            <line x1="0" y1="0" x2="0" y2="34" stroke="#facc15" strokeWidth="1" opacity="0.6" />
                            <circle cx="0" cy="34" r="3" fill="#dc2626" />

                            {/* Mặt quạt lụa tròn căng mọng khung vàng */}
                            <circle cx="0" cy="-30" r="26" fill="#fffbeb" fillOpacity="0.94" stroke="#d97706" strokeWidth="2.2" />
                            <circle cx="0" cy="-30" r="24.5" fill="none" stroke="#fde047" strokeWidth="1" strokeDasharray="3 2" />

                            {/* Họa tiết hoa sen thêu chỉ tơ tằm trên mặt quạt */}
                            {/* Lá sen xanh biếc */}
                            <path d="M-10 -22 Q0 -18 10 -22 Q0 -26 -10 -22 Z" fill="#059669" opacity="0.85" />
                            {/* Đóa sen hồng ngọc e ấp bung nở */}
                            <path d="M-8 -30 C-6 -42 0 -45 0 -45 C0 -45 6 -42 8 -30 Z" fill="#f43f5e" opacity="0.9" />
                            <path d="M-4 -30 C-3 -38 0 -41 0 -41 C0 -41 3 -38 4 -30 Z" fill="#fbcfe8" />
                            <circle cx="0" cy="-30" r="2.5" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />

                            {/* Dây cát tường & tua rua tơ tằm rủ dài */}
                            <line x1="0" y1="36" x2="0" y2="44" stroke="#dc2626" strokeWidth="2" />
                            <circle cx="0" cy="44" r="2.8" fill="#10b981" stroke="#059669" strokeWidth="0.8" />
                            <line x1="0" y1="47" x2="0" y2="65" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                            <line x1="0" y1="47" x2="0" y2="52" stroke="#facc15" strokeWidth="3.5" />
                          </g>
                        )}

                        {/* Ngón tay búp măng thanh tú cầm chắc cán/chuôi quạt */}
                        <ellipse cx="0" cy="14" rx="6.5" ry="5.5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                        <ellipse cx="-2" cy="10" rx="3.5" ry="3" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="0.8" />
                      </g>
                    </g>
                  )
                ) : config.handAccessory === 'chuoi_ngoc_tay' ? (
                  /* 3. CHUỖI NGỌC CẦM TAY: 18 HẠT BỒ ĐỀ / NGỌC BÍCH PHẨM HẠNH CAO QUÝ KẾT HOA SEN VÀNG & GÚT CÁT TƯỜNG */
                  !isBackView && (
                    <g id="hands-jade-rosary">
                      {/* Tay trái buông tự nhiên */}
                      <ellipse cx="186" cy="295" rx="6" ry="5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />

                      {/* Tay phải cầm chuỗi ngọc bích phong thủy */}
                      <g id="right-hand-with-jade-beads">
                        <ellipse cx="312" cy="282" rx="7" ry="5.5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                        <ellipse cx="310" cy="278" rx="3.5" ry="3" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="0.8" />

                        {/* Chuỗi 18 hạt ngọc bích phỉ thúy xếp vòng buông rủ mượt mà */}
                        <g id="jade-bead-loop">
                          {/* Sợi chỉ tơ vàng luồn qua các hạt ngọc */}
                          <ellipse cx="312" cy="304" rx="12" ry="19" fill="none" stroke="#fde047" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                          {Array.from({ length: 16 }).map((_, i) => {
                            const angle = (i * Math.PI) / 8;
                            const bx = 312 + Math.cos(angle) * 12.5;
                            const by = 304 + Math.sin(angle) * 19;
                            return (
                              <g key={i}>
                                {/* Hạt ngọc phỉ thúy có bóng sáng ngọc thạch */}
                                <circle cx={bx} cy={by} r="3.4" fill="#047857" stroke="#064e3b" strokeWidth="0.8" />
                                <circle cx={bx} cy={by} r="2.8" fill="#059669" />
                                <circle cx={bx - 1} cy={by - 1} r="1.1" fill="#a7f3d0" opacity="0.9" />
                              </g>
                            );
                          })}

                          {/* Hạt chủ (Phật đầu) chạm hoa sen bằng vàng ròng khảm bảo ngọc */}
                          <circle cx="312" cy="324" r="5" fill="#facc15" stroke="#b45309" strokeWidth="1.2" />
                          <circle cx="312" cy="324" r="2.8" fill="#eab308" />
                          <circle cx="312" cy="324" r="1.2" fill="#dc2626" />

                          {/* Nút thắt gút cát tường đan ô bàn cờ tứ giác với 4 vòng cung đối xứng */}
                          <g id="rosary-auspicious-knot" transform="translate(312, 332)">
                            {/* 4 vòng khuyên đan quanh gút */}
                            <path d="M-6 0 C-9 -4 -9 4 -6 0 M6 0 C9 -4 9 4 6 0 M0 -6 C-4 -9 4 -9 0 -6 M0 6 C-4 9 4 9 0 6" stroke="#fde047" strokeWidth="1" fill="none" />
                            <path d="M-5 -5 L5 5 M-5 5 L5 -5" stroke="#fde047" strokeWidth="1.2" />
                            {/* Thân gút đỏ viền vàng */}
                            <rect x="-4.5" y="-4.5" width="9" height="9" rx="1.8" fill="#dc2626" stroke="#fde047" strokeWidth="1" transform="rotate(45 0 0)" />
                            <circle cx="0" cy="0" r="1.5" fill="#facc15" />
                          </g>

                          {/* Đôi dải tua rua tơ tằm buông rủ tha thướt kết hạt hoàng ngọc */}
                          <line x1="310" y1="339" x2="310" y2="368" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
                          <line x1="314" y1="339" x2="314" y2="368" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
                          <line x1="312" y1="340" x2="312" y2="365" stroke="#fde047" strokeWidth="1.2" />
                          <circle cx="310" cy="368" r="1.2" fill="#facc15" />
                          <circle cx="314" cy="368" r="1.2" fill="#facc15" />
                          <rect x="308.5" y="339" width="7" height="3" fill="#facc15" stroke="#b45309" strokeWidth="0.6" rx="0.8" />
                        </g>
                      </g>
                    </g>
                  )
                ) : config.handAccessory === 'tui_gam_cat_tuong' ? (
                  /* 4. TÚI GẤM THẮT GÚT CÁT TƯỜNG: VẢI GẤM BÁCH HOA ĐỎ KIM TUYẾN, GÚT KẾT ĐỒNG TÂM CÁT TƯỜNG & TUA RUA LỤA VÀNG */
                  !isBackView && (
                    <g id="hands-brocade-pouch">
                      {/* Tay trái buông tự nhiên */}
                      <ellipse cx="186" cy="295" rx="6" ry="5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />

                      {/* Tay phải cầm quai túi gấm */}
                      <g id="right-hand-with-pouch">
                        <ellipse cx="312" cy="272" rx="7" ry="5.5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                        <ellipse cx="310" cy="268" rx="3.5" ry="3" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="0.8" />

                        {/* Dây đeo lụa bện đôi vàng son đính hạt ngọc bích */}
                        <line x1="311" y1="275" x2="311" y2="295" stroke="#fde047" strokeWidth="1.6" />
                        <line x1="313" y1="275" x2="313" y2="295" stroke="#dc2626" strokeWidth="1.2" />
                        <circle cx="312" cy="285" r="2.8" fill="#059669" stroke="#047857" strokeWidth="0.8" />
                        <circle cx="312" cy="285" r="1" fill="#a7f3d0" />

                        {/* NÚT THẮT GÚT CÁT TƯỜNG TRUYỀN THỐNG (Pan Chang Knot / Đồng Tâm Cát Tường Gút) */}
                        <g id="authentic-auspicious-knot" transform="translate(312, 298)">
                          {/* 4 vòng cung đối xứng chuẩn gút kết cát tường */}
                          <path d="M-8 0 C-13 -6 -13 6 -8 0" stroke="#fde047" strokeWidth="1.2" fill="none" />
                          <path d="M8 0 C13 -6 13 6 8 0" stroke="#fde047" strokeWidth="1.2" fill="none" />
                          <path d="M0 -8 C-6 -13 6 -13 0 -8" stroke="#fde047" strokeWidth="1.2" fill="none" />
                          <path d="M0 8 C-6 13 6 13 0 8" stroke="#fde047" strokeWidth="1.2" fill="none" />
                          {/* Thân gút chính đan chéo */}
                          <rect x="-6.5" y="-6.5" width="13" height="13" rx="2.5" fill="#dc2626" stroke="#fde047" strokeWidth="1.5" transform="rotate(45 0 0)" />
                          <rect x="-4.5" y="-4.5" width="9" height="9" fill="#991b1b" stroke="#facc15" strokeWidth="0.8" transform="rotate(45 0 0)" />
                          <circle cx="0" cy="0" r="2.2" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />
                          {/* Hạt ngọc hoàng long kết nối */}
                          <circle cx="0" cy="8" r="2" fill="#10b981" />
                        </g>

                        {/* MIỆNG TÚI GẤM RÚT NẾP & THÂN TÚI GẤM ĐỎ SON THÊU BÁCH HOA */}
                        <g id="brocade-pouch-body" transform="translate(312, 311)">
                          {/* Dây rút miệng túi nhún bèo tơ tằm */}
                          <path d="M-11 -2 Q0 -5 11 -2 L8 4 Q0 1 -8 4 Z" fill="#fde047" stroke="#b45309" strokeWidth="0.8" />
                          <circle cx="-6" cy="1" r="1.5" fill="#dc2626" />
                          <circle cx="6" cy="1" r="1.5" fill="#dc2626" />

                          {/* Thân túi hình trái đào / quả trám tròn bầu bĩnh may từ gấm cung đình */}
                          <path
                            d="M-15 3 C-22 16 -18 38 0 43 C18 38 22 16 15 3 C9 7 -9 7 -15 3 Z"
                            fill="#881337"
                            stroke="#fde047"
                            strokeWidth="1.8"
                          />
                          {/* Đáy túi bo cong mềm */}
                          <path
                            d="M-12 12 C-16 22 -14 34 0 38 C14 34 16 22 12 12 Z"
                            fill="#9f1239"
                            opacity="0.85"
                          />

                          {/* Họa tiết hoa văn kim tuyến thêu trên túi gấm (Đoàn hoa cát tường) */}
                          <circle cx="0" cy="23" r="8" fill="none" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 1.5" />
                          <circle cx="0" cy="23" r="4.5" fill="none" stroke="#facc15" strokeWidth="0.8" />
                          <circle cx="0" cy="23" r="2" fill="#facc15" stroke="#b45309" strokeWidth="0.6" />
                          {/* 4 cánh hoa sen thêu chỉ kim tuyến */}
                          <path d="M-6 23 H6 M0 17 V29" stroke="#fde047" strokeWidth="1" />
                          <path d="M-4 19 L4 27 M-4 27 L4 19" stroke="#fde047" strokeWidth="0.8" opacity="0.8" />

                          {/* Đai viền chân túi dát vàng */}
                          <path d="M-6 39 Q0 43 6 39" stroke="#fde047" strokeWidth="2" fill="none" />

                          {/* Đôi dải tua rua tơ đỏ son đính chuông vàng buông rủ tha thướt */}
                          <line x1="0" y1="43" x2="0" y2="74" stroke="#dc2626" strokeWidth="3.6" strokeLinecap="round" />
                          <line x1="-3.5" y1="43" x2="-3.5" y2="70" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                          <line x1="3.5" y1="43" x2="3.5" y2="70" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                          {/* Đai ôm đầu tua rua bằng đồng mạ vàng */}
                          <rect x="-5" y="44" width="10" height="4.5" fill="#facc15" stroke="#b45309" strokeWidth="0.8" rx="1.2" />
                          <circle cx="0" cy="46" r="1.2" fill="#10b981" />
                        </g>
                      </g>
                    </g>
                  )
                ) : (
                  /* 5. ĐỨNG NGHIÊM: HAI TAY BUÔNG TỰ NHIÊN ĐĨNH ĐẠC (KHÔNG PHỤ KIỆN) */
                  !isBackView && (
                    <g id="hands-standing">
                      <ellipse cx="186" cy="295" rx="6" ry="5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                      <ellipse cx="314" cy="295" rx="6" ry="5" fill="url(#skinToneGrad)" stroke="#d97706" strokeWidth="1" />
                    </g>
                  )
                )}
              </g>
            </g>
          </g>
        </svg>

        {/* HUY HIỆU GỢI Ý NHẠC DÂN GIAN PHÙ HỢP TRANG PHỤC */}
        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2">
          <button
            onClick={() => {
              if (folkMusic.isPlaying && folkMusic.currentTrack.id === recommendedTrackId) {
                dispatchFolkMusicCmd('toggle');
              } else {
                dispatchFolkMusicCmd('select_by_id', { trackId: recommendedTrackId });
                dispatchFolkMusicCmd('play');
              }
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#140407]/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center gap-2 text-xs font-sans hover:bg-red-950/80 transition-all text-left group"
            title="Nghe khúc nhạc dân gian tương ứng với trang phục và bối cảnh"
          >
            <div className={`p-1.5 rounded-lg ${folkMusic.isPlaying ? 'bg-amber-500 text-stone-950 animate-pulse' : 'bg-red-950 text-amber-300'}`}>
              <Music size={13} />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] text-amber-300/80 font-sans flex items-center gap-1">
                <span>{folkMusic.isPlaying ? 'Đang ngân vang' : 'Khúc nhạc hợp cảnh'}</span>
                {folkMusic.isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>}
              </div>
              <div className="font-serif font-bold text-amber-100 text-[11px] group-hover:text-amber-300 transition-colors line-clamp-1 max-w-[120px] sm:max-w-[160px]">
                {FOLK_TRACKS.find(t => t.id === (folkMusic.isPlaying ? folkMusic.currentTrack.id : recommendedTrackId))?.title}
              </div>
            </div>
          </button>
        </div>

        {/* HUY HIỆU HOA VĂN & CHẤT VẢI */}
        <div className="absolute bottom-3 right-3 z-30 p-2 sm:p-2.5 rounded-xl bg-[#140407]/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center gap-2.5 text-xs font-sans">
          <div className="w-9 h-9 rounded-lg border border-amber-400/60 overflow-hidden shrink-0 shadow-inner relative flex items-center justify-center bg-stone-900">
            <svg viewBox="0 0 46 46" className="w-full h-full">
              <rect
                width="46"
                height="46"
                fill={primaryFill}
                fillOpacity={config.fabricId === 'sa_han_cung_dinh' ? 0.8 : 1}
              />
              <rect width="46" height="46" fill={activePatUrl} />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-serif font-bold text-amber-200 text-[11px] sm:text-xs line-clamp-1">
              {config.costumeId === 'trang_phuc_hmong' ? 'Thổ Cẩm Sáp Ong' : currentPattern.name}
            </div>
            <div className="text-[10px] text-stone-300 font-sans mt-0.5">
              Chất vải: <span className="text-amber-300 font-semibold">{currentFabric.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION BAR                                                      */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full flex items-center justify-between px-3 sm:px-4 py-2 bg-[#180407]/90 backdrop-blur-md border-t border-red-900/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-stone-300 font-sans">
              Bối cảnh: <strong className="text-amber-200">{BACKDROPS_DATA.find((b) => b.id === backdrop)?.name}</strong>
            </span>
          </div>

          {/* Quick Folk Music player bar */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-900/80 border border-amber-500/30 text-[11px] text-stone-300">
            <Disc3 size={13} className={`text-amber-400 ${folkMusic.isPlaying ? 'animate-spin' : ''}`} />
            <span className="text-amber-200 font-serif font-bold truncate max-w-[140px]">
              {folkMusic.currentTrack.title}
            </span>
            <span className="text-[10px] text-stone-400">({folkMusic.currentTrack.region})</span>
            <button
              onClick={() => dispatchFolkMusicCmd('toggle')}
              className="p-1 rounded hover:bg-stone-800 text-amber-300"
              title={folkMusic.isPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {folkMusic.isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <button
              onClick={() => dispatchFolkMusicCmd('next')}
              className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-200"
              title="Khúc tiếp theo"
            >
              <SkipForward size={12} />
            </button>
          </div>
        </div>

        <button
          onClick={onOpenLookbook}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-700 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 font-bold text-xs font-sans transition-all shadow flex items-center gap-1.5"
        >
          <Sparkles size={13} />
          <span>Xuất Thẻ Lookbook</span>
        </button>
      </div>
    </div>
  );
};
