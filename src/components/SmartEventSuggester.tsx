/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OutfitConfiguration, EventId, RegionId, WeatherId } from '../types/vietnamAttire';
import { EVENTS_DATA, REGIONS_DATA } from '../data/attireData';
import { CloudSun, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { NonLaIcon } from './VietnamesePatternDecor';

interface SmartEventSuggesterProps {
  onApplyPreset: (config: Partial<OutfitConfiguration>) => void;
}

export const SmartEventSuggester: React.FC<SmartEventSuggesterProps> = ({ onApplyPreset }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventId>('ky_yeu_tot_nghiep');
  const [selectedRegion, setSelectedRegion] = useState<RegionId>('trung_bo');
  const [selectedWeather, setSelectedWeather] = useState<WeatherId>('mat_me_mua_thu');

  const weatherOptions = [
    { id: 'mat_me_mua_thu', name: 'Mùa Thu Mát Mẻ (Hà Nội / Huế)', desc: 'Tiết trời dịu nhẹ, lá vàng rơi' },
    { id: 'se_lanh_mua_dong', name: 'Mùa Đông / Đầu Xuân Se Lạnh', desc: 'Cần chất liệu gấm dày, nhiều lớp' },
    { id: 'am_ap_mua_xuan', name: 'Mùa Xuân Trẩy Hội Đầu Năm', desc: 'Sắc đỏ may mắn, lụa mềm tha thướt' },
    { id: 'nang_am_mua_he', name: 'Mùa Hè Nắng Ấm (Phương Nam)', desc: 'Vải đũi, sa hàn nhẹ nhàng thoáng khí' },
  ];

  // Dynamic Suggestion Logic
  const getSmartRecommendation = () => {
    if (selectedEvent === 'ky_yeu_tot_nghiep') {
      return {
        title: 'Áo Tấc Ngũ Thân & Nón Lá Bài Thơ',
        costumeId: 'ao_tac_ngu_than' as const,
        primaryColor: '#991B1B', // Red
        pantsColor: '#F8FAFC', // White silk
        fabricId: selectedWeather === 'se_lanh_mua_dong' ? 'gam_to_tam' : 'lua_to_tam_van_phuc',
        patternId: 'van_may_thuy_ba',
        nonLa: 'non_la_bai_tho' as const,
        advice:
          'Dành cho sinh viên tốt nghiệp: Tay áo thụng trang trọng khi chắp tay nhận bằng hoặc chụp ảnh lưu niệm tại sân trường. Màu đỏ son chu sa tôn lên vẻ rạng rỡ của thanh xuân.',
      };
    }
    if (selectedEvent === 'tet_nguyen_dan') {
      return {
        title: 'Áo Nhật Bình hoặc Ngũ Thân Đỏ Son Mùng Một',
        costumeId: 'ao_nhat_binh' as const,
        primaryColor: '#DC2626',
        pantsColor: '#F8FAFC',
        fabricId: 'gam_to_tam',
        patternId: 'hoa_sen_cung_dinh',
        nonLa: 'none' as const,
        advice:
          'Đón Tết cổ truyền: Sắc đỏ son cùng hoa văn sen cung đình mang phúc lộc, may mắn sum vầy cho cả năm. Rất thích hợp diện đi chúc Tết và viếng chùa đầu xuân.',
      };
    }
    if (selectedRegion === 'bac_bo' || selectedEvent === 'bieu_dien_nghe_thuat') {
      return {
        title: 'Áo Tứ Thân Yếm Đào & Nón Ba Tầm',
        costumeId: 'ao_tu_than' as const,
        primaryColor: '#831843',
        pantsColor: '#1E293B',
        fabricId: 'lua_to_tam_van_phuc',
        patternId: 'hoa_sen_cung_dinh',
        nonLa: 'non_ba_tam' as const,
        advice:
          'Hồn Quan họ Kinh Bắc: Nón quai thao ba tầm bản rộng cùng dải yếm đào thắm đượm tình người đất Bắc, cực kỳ nổi bật trên sân khấu biểu diễn văn nghệ học đường.',
      };
    }
    if (selectedRegion === 'nam_bo') {
      return {
        title: 'Áo Bà Ba Tơ Tằm & Nón Lá Chóp Nhọn',
        costumeId: 'ao_ba_ba' as const,
        primaryColor: '#78350F',
        pantsColor: '#1E293B',
        fabricId: 'dui_to_sen',
        patternId: 'tron_thanh_lich',
        nonLa: 'non_la_chuong' as const,
        advice:
          'Phương Nam phóng khoáng: Vải đũi tơ sen nhẹ mát, kết hợp khăn rằn quàng cổ tạo vẻ đẹp mộc mạc, gần gũi và đầy nghĩa tình.',
      };
    }
    return {
      title: 'Áo Ngũ Thân Tay Chẽn Nho Nhã',
      costumeId: 'ao_ngu_than_tay_chen' as const,
      primaryColor: '#1E3A8A',
      pantsColor: '#F8FAFC',
      fabricId: 'lua_to_tam_van_phuc',
      patternId: 'trong_dong_dong_son',
      nonLa: 'non_chop_nho' as const,
      advice:
        'Sắc chàm thâm trầm, trang nhã: Dành cho những buổi dạo phố di sản, chụp ảnh kiến trúc cổ tại Hoàng thành Thăng Long hoặc phố cổ Hội An.',
    };
  };

  const rec = getSmartRecommendation();

  return (
    <div className="w-full rounded-2xl border border-red-900/40 bg-[#190509]/90 backdrop-blur-md p-6 shadow-xl">
      <div className="flex items-center gap-3 pb-4 border-b border-red-900/30 mb-6">
        <Sparkles className="text-amber-400" size={22} />
        <div>
          <h2 className="font-serif text-lg font-bold text-amber-100">
            Gợi Ý Trang Phục Theo Thời Tiết & Sự Kiện
          </h2>
          <p className="text-xs text-stone-400 font-sans">
            Hệ thống tự động đề xuất phong cách cổ phục phù hợp với khí hậu và không gian bạn tham gia
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Select Weather */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-amber-200 font-sans flex items-center gap-1.5">
            <CloudSun size={15} className="text-amber-400" />
            <span>1. Khí Hậu & Mùa:</span>
          </label>
          <div className="space-y-2">
            {weatherOptions.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelectedWeather(w.id as WeatherId)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-sans transition-all ${
                  selectedWeather === w.id
                    ? 'border-amber-400 bg-red-900/50 text-amber-200 ring-1 ring-amber-400/40'
                    : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:bg-red-950/30'
                }`}
              >
                <div className="font-semibold">{w.name}</div>
                <div className="text-[11px] text-stone-400">{w.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Event */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-amber-200 font-sans flex items-center gap-1.5">
            <Calendar size={15} className="text-amber-400" />
            <span>2. Sự Kiện Tham Gia:</span>
          </label>
          <div className="space-y-2">
            {EVENTS_DATA.slice(0, 4).map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedEvent(e.id as EventId)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs font-sans transition-all ${
                  selectedEvent === e.id
                    ? 'border-amber-400 bg-red-900/50 text-amber-200 ring-1 ring-amber-400/40'
                    : 'border-red-900/30 bg-stone-900/40 text-stone-300 hover:bg-red-950/30'
                }`}
              >
                <div className="font-semibold">{e.name}</div>
                <div className="text-[11px] text-stone-400 line-clamp-1">{e.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Suggestion Result Box */}
        <div className="p-5 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-[#25080c] to-[#140306] flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <NonLaIcon className="text-amber-400" size={20} />
              <span className="text-xs uppercase tracking-wider text-amber-300 font-serif font-bold">
                Phương Án Tối Ưu Nhất
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-amber-100 mb-1">{rec.title}</h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed mt-2 bg-red-950/40 p-3 rounded-xl border border-red-900/40">
              {rec.advice}
            </p>
          </div>

          <button
            onClick={() =>
              onApplyPreset({
                costumeId: rec.costumeId,
                primaryColor: rec.primaryColor,
                pantsColor: rec.pantsColor,
                fabricId: rec.fabricId,
                patternId: rec.patternId,
                nonLa: rec.nonLa,
                selectedEvent,
              })
            }
            className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all font-sans"
          >
            <span>Áp Dụng Vào Phòng Thử Đồ</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
