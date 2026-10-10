/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { OutfitConfiguration } from '../types/vietnamAttire';
import { TRADITIONAL_COSTUMES, COLOR_PALETTES, EVENTS_DATA, ACCESSORIES_DATA } from '../data/attireData';
import { X, Download, Share2, Sparkles, Check, Heart } from 'lucide-react';
import { NonLaIcon, RedSealStamp, DongSonSunPattern } from './VietnamesePatternDecor';
import confetti from 'canvas-confetti';

interface LookbookModalProps {
  config: OutfitConfiguration;
  isOpen: boolean;
  onClose: () => void;
  onSaveLookbook?: (item: any) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  config,
  isOpen,
  onClose,
  onSaveLookbook,
}) => {
  const [lookbookTitle, setLookbookTitle] = useState('Hồn Sắc Việt - Kỷ Niệm Thanh Xuân');
  const [creatorName, setCreatorName] = useState('Học sinh / Sinh viên Việt Nam');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const costume = TRADITIONAL_COSTUMES.find((c) => c.id === config.costumeId) || TRADITIONAL_COSTUMES[0];
  const event = EVENTS_DATA.find((e) => e.id === config.selectedEvent) || EVENTS_DATA[0];
  const color = COLOR_PALETTES.find((c) => c.hex.toLowerCase() === config.primaryColor.toLowerCase()) || COLOR_PALETTES[0];
  const nonLa = ACCESSORIES_DATA.nonLa.find((n) => n.id === config.nonLa);
  const jewelry = ACCESSORIES_DATA.jewelry.find((j) => j.id === config.jewelry);
  const footwear = ACCESSORIES_DATA.footwear.find((f) => f.id === config.footwear);

  useEffect(() => {
    if (isOpen) {
      // Trigger subtle celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#dc2626', '#f59e0b', '#fbbf24', '#b91c1c'],
        });
      } catch (err) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw high-res Lookbook Postcard (800 x 1200)
    canvas.width = 800;
    canvas.height = 1100;

    // Background Crimson lacquer gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1100);
    grad.addColorStop(0, '#2a080d');
    grad.addColorStop(0.5, '#1b0407');
    grad.addColorStop(1, '#120204');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 1100);

    // Decorative Borders
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 740, 1040);

    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 720, 1020);

    // Header Wordmark
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 36px "Lora", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('HỒN SẮC VIỆT', 400, 100);

    ctx.fillStyle = '#fca5a5';
    ctx.font = 'italic 16px "Be Vietnam Pro", sans-serif';
    ctx.fillText('VIETNAMESE TRADITIONAL ATTIRE LOOKBOOK', 400, 130);

    // Title & Creator
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px "Lora", Georgia, serif';
    ctx.fillText(lookbookTitle, 400, 190);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Người phối: ${creatorName}`, 400, 225);

    // Central decorative box
    ctx.fillStyle = '#220609';
    ctx.fillRect(80, 260, 640, 500);
    ctx.strokeStyle = '#78350f';
    ctx.strokeRect(80, 260, 640, 500);

    // Costume Name & Details
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 32px "Lora", Georgia, serif';
    ctx.fillText(costume.name, 400, 320);

    ctx.fillStyle = '#f87171';
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Niên đại: ${costume.period}`, 400, 355);

    // Primary Color circle
    ctx.beginPath();
    ctx.arc(360, 420, 30, 0, Math.PI * 2);
    ctx.fillStyle = config.primaryColor;
    ctx.fill();
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pants Color circle
    ctx.beginPath();
    ctx.arc(440, 420, 30, 0, Math.PI * 2);
    ctx.fillStyle = config.pantsColor;
    ctx.fill();
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Sắc Phục: ${color.vietnameseName} (${color.element})`, 400, 480);

    // Accessories list
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = '#fef3c7';
    ctx.fillText(`Nón Lá: ${nonLa?.name || 'Không dùng nón'}`, 400, 530);
    ctx.fillText(`Trang Sức: ${jewelry?.name || 'Không đeo trang sức'}`, 400, 560);
    ctx.fillText(`Hài / Guốc: ${footwear?.name || 'Mộc mạc'}`, 400, 590);
    ctx.fillText(`Bối Cảnh & Sự Kiện: ${event.name}`, 400, 620);

    // Significance Quote
    ctx.fillStyle = '#fca5a5';
    ctx.font = 'italic 14px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`"${costume.significance.slice(0, 75)}..."`, 400, 680);

    // Red Seal Stamp at bottom
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 3;
    ctx.strokeRect(340, 830, 120, 60);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 18px "Lora", Georgia, serif';
    ctx.fillText('TÂM HỒN', 400, 856);
    ctx.font = '13px "Be Vietnam Pro", sans-serif';
    ctx.fillText('VIỆT NAM', 400, 878);

    // Footer
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Gìn giữ văn hóa dân tộc - Tự hào tiếp bước tương lai', 400, 1020);

    // Trigger download
    const link = document.createElement('a');
    link.download = `lookbook-viet-phuc-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (onSaveLookbook) {
      onSaveLookbook({
        title: lookbookTitle,
        creator: creatorName,
        costumeName: costume.name,
        date: new Date().toLocaleDateString('vi-VN'),
        color: config.primaryColor,
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `Xem bộ phối Việt Phục "${lookbookTitle}" (${costume.name}) của tôi trên Hồn Sắc Việt!`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl border border-red-800/60 bg-[#1a0508] text-stone-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-red-950 via-red-900 to-[#1a0508] border-b border-red-800/40">
          <div className="flex items-center gap-3">
            <Sparkles className="text-amber-400" size={20} />
            <h2 className="font-serif text-lg font-bold text-amber-200">
              Xuất Thẻ Lookbook Việt Phục
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-900/60 text-stone-300 hover:text-white border border-red-900/40"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 font-sans">
          {/* Inputs for customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-amber-200 mb-1">
                Tên Bộ Phối Lookbook:
              </label>
              <input
                type="text"
                value={lookbookTitle}
                onChange={(e) => setLookbookTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950/70 border border-red-900/40 text-stone-200 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-amber-200 mb-1">
                Người Phối (Học Sinh / Tác Giả):
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950/70 border border-red-900/40 text-stone-200 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Visual Lookbook Postcard Preview */}
          <div className="p-5 rounded-2xl border-2 border-red-800/50 bg-gradient-to-b from-[#24060b] via-[#160306] to-[#0f0204] shadow-inner text-center relative overflow-hidden">
            <div className="absolute top-3 left-4">
              <RedSealStamp text="KỶ VẬT" subText="CỔ PHỤC" />
            </div>
            <div className="absolute top-3 right-4">
              <NonLaIcon className="text-amber-400/80" size={28} />
            </div>

            <div className="text-xs uppercase tracking-widest text-red-400 font-serif mb-1">
              HỒN SẮC VIỆT LOOKBOOK
            </div>
            <h3 className="font-serif text-xl font-bold text-amber-200 mb-1">{lookbookTitle}</h3>
            <p className="text-xs text-amber-400/90 italic mb-4 font-serif">
              Tác giả: {creatorName}
            </p>

            <div className="inline-block p-4 rounded-xl bg-red-950/40 border border-red-900/40 max-w-md w-full mb-3 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-400">Trang phục:</span>
                <span className="font-semibold text-amber-200 font-serif">{costume.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Niên đại:</span>
                <span className="text-stone-300">{costume.period}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Sắc phục:</span>
                <span className="flex items-center gap-1.5 text-stone-200">
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <span>
                    {color.vietnameseName} ({color.element})
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Nón Lá:</span>
                <span className="text-amber-300">{nonLa?.name || 'Không đội nón'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Trang Sức:</span>
                <span className="text-amber-200">{jewelry?.name || 'Không đeo'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Hài / Guốc:</span>
                <span className="text-amber-200">{footwear?.name || 'Mộc mạc'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Bối cảnh:</span>
                <span className="text-stone-300">{event.name}</span>
              </div>
            </div>

            <p className="text-[11px] text-amber-200/70 italic px-6">
              "{costume.significance}"
            </p>
          </div>

          {/* Hidden Canvas for rendering high-res image */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#140306] border-t border-red-900/40 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-900 text-stone-300 hover:text-white border border-red-900/40 text-xs font-sans transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            <span>{copied ? 'Đã sao chép link!' : 'Chia sẻ tác phẩm'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-stone-900/70 text-stone-300 hover:text-white text-xs font-sans"
            >
              Đóng
            </button>
            <button
              onClick={handleDownloadImage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-700 via-red-600 to-amber-700 hover:brightness-110 active:scale-95 text-amber-100 text-xs font-semibold font-sans shadow-md transition-all"
            >
              <Download size={14} className="text-amber-300" />
              <span>Tải Ảnh Lookbook (.PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
