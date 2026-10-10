/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OutfitConfiguration, CostumeId } from './types/vietnamAttire';
import { TRADITIONAL_COSTUMES, PRESET_OUTFITS } from './data/attireData';
import { Header } from './components/Header';
import { InteractiveMannequin } from './components/InteractiveMannequin';
import { StylingStudio } from './components/StylingStudio';
import { CharacterMotionPanel } from './components/CharacterMotionPanel';
import { CulturalHeritageGuard } from './components/CulturalHeritageGuard';
import { CulturalEncyclopediaModal } from './components/CulturalEncyclopediaModal';
import { LookbookModal } from './components/LookbookModal';
import { OutfitComparisonModal } from './components/OutfitComparisonModal';
import { SmartEventSuggester } from './components/SmartEventSuggester';
import { LookbookGallery } from './components/LookbookGallery';
import { VietnameseHeaderCorners } from './components/VietnameseHeaderCorners';
import { NonLaIcon, DongSonSunPattern, RedSealStamp } from './components/VietnamesePatternDecor';
import { BookOpen, Sparkles, ShieldCheck, Heart, Award, ArrowRight } from 'lucide-react';
import { MotionMode } from './types/vietnamAttire';

export default function App() {
  const [activeTab, setActiveTab] = useState<'phong_thu' | 'kham_pha' | 'di_san' | 'goi_y' | 'lookbook'>('phong_thu');

  // Core Configuration State
  const [config, setConfig] = useState<OutfitConfiguration>({
    ...PRESET_OUTFITS[0].config,
    selectedBackdrop: 'dai_noi_hue',
  });

  // Motion & 3D Turntable State
  const [motionMode, setMotionMode] = useState<MotionMode>('dung_nghiem');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  const handleSelectMotion = (mode: MotionMode) => {
    setMotionMode(mode);
    if (mode === 'xoay_tron') {
      setIsAutoRotating(true);
    } else {
      setIsAutoRotating(false);
    }
  };

  const handleToggleAutoRotate = () => {
    setIsAutoRotating((prev) => {
      const next = !prev;
      if (next) setMotionMode('xoay_tron');
      else setMotionMode('dung_nghiem');
      return next;
    });
  };

  // Modals state
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState(false);
  const [encyclopediaCostumeId, setEncyclopediaCostumeId] = useState<CostumeId>('ao_tac_ngu_than');
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Saved Lookbooks
  const [savedLookbooks, setSavedLookbooks] = useState<
    Array<{
      title: string;
      creator: string;
      costumeName: string;
      date: string;
      color: string;
    }>
  >([
    {
      title: 'Kỷ Yếu Áo Tấc Đỏ Son Cố Đô',
      creator: 'Sinh viên ĐHQG Hà Nội',
      costumeName: 'Áo Tấc (Ngũ Thân)',
      date: '08/10/2026',
      color: '#991B1B',
    },
    {
      title: 'Hồn Quan Họ Ngày Xuân',
      creator: 'Liền chị Bắc Ninh',
      costumeName: 'Áo Tứ Thân & Nón Ba Tầm',
      date: '06/10/2026',
      color: '#831843',
    },
  ]);

  const handleUpdateConfig = (partial: Partial<OutfitConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleOpenEncyclopedia = (costumeId: CostumeId) => {
    setEncyclopediaCostumeId(costumeId);
    setIsEncyclopediaOpen(true);
  };

  const handleSaveLookbook = (item: any) => {
    setSavedLookbooks((prev) => [item, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#140407] text-[#f7eade] flex flex-col font-sans selection:bg-red-900 selection:text-amber-200 relative">
      {/* TRANG TRÍ 2 GÓC TRÊN CÙNG: NÓN LÁ & LŨY TRE */}
      <VietnameseHeaderCorners />

      {/* Top Bar Contract Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCompare={() => setIsComparisonOpen(true)}
      />

      {/* Hero Exhibition Banner (Vietnamese Cultural Heritage Theme) */}
      <section className="relative w-full bg-gradient-to-b from-[#24060b] via-[#1a0508] to-[#140407] border-b border-red-900/40 overflow-hidden py-10 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <DongSonSunPattern size={700} className="text-amber-300" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <RedSealStamp text="TÂM HỒN" subText="VIỆT NAM" />
              <span className="text-xs tracking-wider uppercase text-amber-300/90 font-serif font-bold">
                TÂM HỒN VIỆT — THE SOUL OF VIETNAM
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 tracking-tight leading-tight">
              Mặc lên mình một miền di sản.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-200 font-sans leading-relaxed">
              Mỗi tà áo là một câu chuyện. Mỗi đường kim là một ký ức. Cùng khám phá vẻ đẹp Việt Nam qua những sắc màu truyền thống và trải nghiệm tương tác 3D chân thực.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('di_san')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 font-serif font-bold text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <span>Khám phá di sản</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setActiveTab('phong_thu')}
                className="px-5 py-2.5 rounded-xl bg-stone-900/80 hover:bg-red-950/60 border border-amber-500/40 text-amber-200 font-serif font-semibold text-sm transition-all shadow flex items-center gap-2"
              >
                <Sparkles size={16} className="text-amber-400" />
                <span>Thử trang phục 3D</span>
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-sans text-stone-300">
              <div className="flex items-center gap-1.5">
                <NonLaIcon className="text-amber-400" size={18} />
                <span>Nón Lá & Phụ Kiện Di Sản</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="text-emerald-400" size={16} />
                <span>Bảo Vệ Tính Chuẩn Quy Thức</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="text-amber-400" size={16} />
                <span>Mô Hình 3D Xoay 360° & Chào Hỏi</span>
              </div>
            </div>
          </div>

          {/* Quick Stat / Identity Accent Card */}
          <div className="p-5 rounded-2xl border border-red-800/40 bg-[#25080c]/80 backdrop-blur-md shadow-2xl shrink-0 w-full md:w-80 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-red-900/40 mb-3">
              <span className="font-serif font-bold text-amber-200">Đang Chọn Phối:</span>
              <span className="px-2 py-0.5 rounded bg-red-900/60 text-amber-300 font-medium">
                {TRADITIONAL_COSTUMES.find((c) => c.id === config.costumeId)?.name}
              </span>
            </div>
            <p className="text-stone-300 leading-relaxed italic">
              "5 thân áo tượng trưng cho tứ thân phụ mẫu và chính mình; 5 hạt cúc là Nhân, Nghĩa, Lễ, Trí, Tín."
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setIsLookbookOpen(true)}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-red-700 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 font-bold text-xs transition-all shadow font-sans"
              >
                Xuất Thẻ Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: PHÒNG PHỐI ĐỒ (STUDIO TRUNG TÂM) */}
        {activeTab === 'phong_thu' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
              {/* Left Column (Sticky Interactive Mannequin + 3D Motion Panel + Cultural Heritage Guard) */}
              <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-3 self-start z-30 transition-all">
                <InteractiveMannequin
                  config={config}
                  onUpdateConfig={handleUpdateConfig}
                  onOpenLookbook={() => setIsLookbookOpen(true)}
                  motionMode={motionMode}
                  onSelectMotion={handleSelectMotion}
                  rotationAngle={rotationAngle}
                  onChangeRotation={setRotationAngle}
                  isAutoRotating={isAutoRotating}
                  onToggleAutoRotate={handleToggleAutoRotate}
                />
                <CharacterMotionPanel
                  motionMode={motionMode}
                  onSelectMotion={handleSelectMotion}
                  rotationAngle={rotationAngle}
                  onChangeRotation={setRotationAngle}
                  isAutoRotating={isAutoRotating}
                  onToggleAutoRotate={handleToggleAutoRotate}
                  rotationSpeed={rotationSpeed}
                  onChangeSpeed={setRotationSpeed}
                />
                <CulturalHeritageGuard config={config} />
              </div>

              {/* Right Column (Controls & Customizations) */}
              <div className="lg:col-span-6 space-y-6">
                <StylingStudio
                  config={config}
                  onUpdateConfig={handleUpdateConfig}
                  onOpenEncyclopedia={handleOpenEncyclopedia}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KHÁM PHÁ NHÓM TRANG PHỤC */}
        {activeTab === 'kham_pha' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <RedSealStamp text="KHO TÀNG" subText="VIỆT PHỤC" />
              <h2 className="font-serif text-3xl font-bold text-amber-100 mt-2">
                Các Dòng Trang Phục Truyền Thống Việt Nam
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans">
                Khám phá hệ thống cổ phục qua các thời kỳ lịch sử và đặc trưng văn hóa vùng miền
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRADITIONAL_COSTUMES.map((costume) => (
                <div
                  key={costume.id}
                  className="rounded-2xl border border-red-900/40 bg-gradient-to-b from-[#1e070c] to-[#120306] p-6 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded bg-red-950 text-amber-300 text-[11px] font-sans font-semibold border border-red-900/50">
                        {costume.region === 'trung_bo'
                          ? 'Trung Bộ'
                          : costume.region === 'bac_bo'
                          ? 'Bắc Bộ'
                          : costume.region === 'nam_bo'
                          ? 'Nam Bộ'
                          : 'Vùng Non Cao'}
                      </span>
                      <NonLaIcon className="text-amber-400" size={20} />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-1">
                      {costume.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-sans mb-3">{costume.subTitle}</p>

                    <p className="text-xs text-stone-300 leading-relaxed font-sans mb-4 line-clamp-3">
                      {costume.shortHistory}
                    </p>

                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/30 text-xs space-y-1.5 text-stone-300 font-sans mb-4">
                      <div>
                        <strong className="text-amber-200">Niên đại:</strong> {costume.period}
                      </div>
                      <div>
                        <strong className="text-amber-200">Ý nghĩa:</strong> {costume.significance.slice(0, 90)}...
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEncyclopedia(costume.id)}
                      className="flex-1 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-red-900/40 text-xs font-semibold font-sans transition-colors"
                    >
                      Đọc Di Sản
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateConfig({
                          costumeId: costume.id,
                          primaryColor: costume.defaultColors[0],
                        });
                        setActiveTab('phong_thu');
                      }}
                      className="flex-1 py-2 rounded-lg bg-red-800 hover:bg-red-700 text-amber-100 text-xs font-semibold font-sans transition-colors"
                    >
                      Thử Phối Đồ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TRI THỨC DI SẢN & BẢO ĐẢM VĂN HÓA */}
        {activeTab === 'di_san' && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-red-800/40 bg-gradient-to-r from-red-950 via-[#26070c] to-[#160306] p-8 shadow-xl">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <RedSealStamp text="TRI THỨC" subText="DÂN TỘC" />
                  <span className="text-xs text-amber-300 font-serif font-bold uppercase tracking-wider">
                    Bảo Đảm Thông Tin Văn Hóa Chuẩn Xác
                  </span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-amber-100 mb-3">
                  Quy Thức Y Phục Cổ Truyền Dành Cho Giới Trẻ
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  Khi người trẻ và học sinh, sinh viên tìm về cổ phục, việc hiểu đúng quy thức không chỉ giúp bạn mặc đẹp mà còn thể hiện lòng tự tôn, tự hào và tôn kính đối với truyền thống văn hóa dân tộc.
                </p>
              </div>
            </div>

            {/* Core Cultural Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-red-900/40 bg-[#1a0508] shadow-lg">
                <h3 className="font-serif text-lg font-bold text-amber-200 mb-2">
                  1. Triết Lý Ngũ Thân & Ngũ Thường
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Áo dài ngũ thân gồm 4 thân ngoài tượng trưng cho tứ thân phụ mẫu (cha mẹ ruột và cha mẹ chồng/vợ), và 1 thân con lót bên trong che chở người mặc. 5 hạt nút tương ứng với 5 đức tính đạo lý: Nhân, Nghĩa, Lễ, Trí, Tín.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-red-900/40 bg-[#1a0508] shadow-lg">
                <h3 className="font-serif text-lg font-bold text-amber-200 mb-2">
                  2. Quy Thức Hữu Nhậm (Gài Khuy Sang Phải)
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Tất cả các dòng áo cổ truyền người Việt (Áo ngũ thân, Áo tấc, Áo bà ba) đều gài khuy sang bên nách phải (Hữu nhậm). Giao Lĩnh thì vạt trái đè vạt phải. Đây là quy chuẩn bất di bất dịch trong văn hóa y phục truyền thống.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-red-900/40 bg-[#1a0508] shadow-lg">
                <h3 className="font-serif text-lg font-bold text-amber-200 mb-2">
                  3. Đồng Bộ Bối Cảnh Lịch Sử
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Tránh kết hợp phụ kiện sai lệch thời kỳ: Ví dụ không phối Nón Ba Tầm (Kinh Bắc thời Lê - Nguyễn) với Áo Nhật Bình cung đình triều Nguyễn, hay không dùng Khăn Vành Dây hoàng cung khi mặc Áo Bà Ba bình dị.
                </p>
              </div>
            </div>

            {/* Visual Guide to Non La (Nón Lá) */}
            <div className="p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#24060c] to-[#120306]">
              <div className="flex items-center gap-3 mb-4">
                <NonLaIcon className="text-amber-400" size={26} />
                <h3 className="font-serif text-xl font-bold text-amber-100">
                  Nón Lá - Chiếc Nón Che Nghiêng Nét Duyên Dáng Đất Việt
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed mb-4">
                Từ ngàn đời nay, nón lá không đơn thuần là vật che nắng che mưa, mà đã trở thành tâm hồn, biểu tượng dịu dàng e ấp của người phụ nữ Việt Nam và nét phong nhã của bậc sĩ tử khi dạo bước dưới sân đình.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-3 rounded-xl bg-stone-950/40 border border-red-900/30">
                  <strong className="text-amber-300 block mb-1">Nón Lá Bài Thơ Xứ Huế:</strong>
                  Lá kè mỏng nhẹ, khi soi lên ánh mặt trời sẽ thấy hiện lên bức tranh cầu Tràng Tiền và câu thơ trữ tình.
                </div>
                <div className="p-3 rounded-xl bg-stone-950/40 border border-red-900/30">
                  <strong className="text-amber-300 block mb-1">Nón Chuông Thanh Oai:</strong>
                  Làng nghề cổ truyền miền Bắc, đường chỉ cước tăm tắp, độ bền cao và chóp nón vuốt thanh thoát.
                </div>
                <div className="p-3 rounded-xl bg-stone-950/40 border border-red-900/30">
                  <strong className="text-amber-300 block mb-1">Nón Ba Tầm (Quai Thao):</strong>
                  Chiếc nón rộng phẳng như vầng trăng trôi giữa hội Lim, tôn vẻ đẹp duyên thắm của các liền anh liền chị.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GỢI Ý SỰ KIỆN */}
        {activeTab === 'goi_y' && (
          <SmartEventSuggester
            onApplyPreset={(newConfig) => {
              handleUpdateConfig(newConfig);
              setActiveTab('phong_thu');
            }}
          />
        )}

        {/* TAB 5: BỘ SƯU TẬP LOOKBOOK */}
        {activeTab === 'lookbook' && (
          <LookbookGallery
            onApplyConfig={(newConfig) => {
              handleUpdateConfig(newConfig);
              setActiveTab('phong_thu');
            }}
            onOpenCreateLookbook={() => setIsLookbookOpen(true)}
            savedLookbooks={savedLookbooks}
          />
        )}
      </main>

      {/* Cultural Footprint Footer */}
      <footer className="w-full bg-[#0d0204] border-t border-red-950 py-8 px-6 text-stone-400 text-xs font-sans mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-300">
            <NonLaIcon className="text-amber-400" size={20} />
            <span className="font-serif font-bold text-amber-200">TÂM HỒN VIỆT</span>
            <span>—</span>
            <span>The Soul of Vietnam · Quảng Bá & Phối Trang Phục Truyền Thống Việt Nam</span>
          </div>
          <div className="text-stone-400">
            Gìn giữ di sản nghìn năm · Tự hào trang phục truyền thống Việt Nam
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <CulturalEncyclopediaModal
        costumeId={encyclopediaCostumeId}
        isOpen={isEncyclopediaOpen}
        onClose={() => setIsEncyclopediaOpen(false)}
        onSelectCostume={(id) => {
          setEncyclopediaCostumeId(id);
          handleUpdateConfig({ costumeId: id });
        }}
      />

      <LookbookModal
        config={config}
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onSaveLookbook={handleSaveLookbook}
      />

      <OutfitComparisonModal
        currentConfig={config}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onApplyConfig={(selectedConfig) => {
          handleUpdateConfig(selectedConfig);
          setActiveTab('phong_thu');
        }}
      />
    </div>
  );
}
