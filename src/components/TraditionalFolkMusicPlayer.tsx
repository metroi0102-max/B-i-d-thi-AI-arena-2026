/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, SkipForward, Disc3, Sparkles } from 'lucide-react';

export interface FolkTrack {
  id: string;
  title: string;
  region: string;
  instrument: string;
  description: string;
  bpm: number;
  melody: Array<{ note: string; dur: number }>; // Note name + duration in beats
}

// Pentatonic frequencies (Hò, Xự, Xang, Xê, Cống)
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66,
  'REST': 0,
};

export const FOLK_TRACKS: FolkTrack[] = [
  {
    id: 'luu_thuy_kim_tien',
    title: 'Lưu Thủy Kim Tiền',
    region: 'Nhã Nhạc Cung Đình Huế',
    instrument: 'Đàn Tranh & Đàn Nguyệt',
    description: 'Khúc nhạc cung đình thanh nhã, tượng trưng dòng nước êm trôi và phúc lộc vàng son miên viễn.',
    bpm: 108,
    melody: [
      { note: 'G4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 2 },
      { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 2 },
      { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'E5', dur: 1.5 }, { note: 'G5', dur: 0.5 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'C5', dur: 2 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'G4', dur: 4 },
    ],
  },
  {
    id: 'cay_truc_xinh',
    title: 'Cây Trúc Xinh',
    region: 'Dân Ca Quan Họ Bắc Ninh',
    instrument: 'Sáo Trúc & Đàn Nhị',
    description: 'Giai điệu thanh thoát, ví von nét duyên dáng đoan trang của liền chị bên bờ ao làng Kinh Bắc.',
    bpm: 96,
    melody: [
      { note: 'D4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'A4', dur: 2 },
      { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 2 },
      { note: 'D5', dur: 1.5 }, { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 2 },
      { note: 'G4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'D4', dur: 2 },
      { note: 'F4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'D5', dur: 2 }, { note: 'A4', dur: 2 },
      { note: 'G4', dur: 4 },
    ],
  },
  {
    id: 'trong_com',
    title: 'Trống Cơm',
    region: 'Dân Ca Đồng Bằng Bắc Bộ',
    instrument: 'Trống Cơm & Đàn Đáy',
    description: 'Nhịp điệu rộn ràng, hân hoan của ngày hội làng xuân sang, tiếng trống bập bùng gọi bạn vui say.',
    bpm: 116,
    melody: [
      { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 1 },
      { note: 'D5', dur: 1 }, { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 0.5 },
      { note: 'G4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 2 },
      { note: 'D5', dur: 0.75 }, { note: 'E5', dur: 0.25 }, { note: 'D5', dur: 1 },
      { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 2 },
      { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 },
      { note: 'G5', dur: 2 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'C5', dur: 4 },
    ],
  },
  {
    id: 'beo_dat_may_troi',
    title: 'Bèo Dạt Mây Trôi',
    region: 'Dân Ca Quan Họ Kinh Bắc',
    instrument: 'Độc Tấu Đàn Bầu & Sáo Trúc',
    description: 'Làn điệu mượt mà, sâu lắng của người quan họ, gửi gắm nỗi nhớ nhung tha thiết và nghĩa tình thủy chung.',
    bpm: 72,
    melody: [
      { note: 'D4', dur: 1.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 2 },
      { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'E5', dur: 1.5 }, { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
      { note: 'G4', dur: 2 }, { note: 'A4', dur: 2 },
      { note: 'C5', dur: 1.5 }, { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
      { note: 'G4', dur: 1.5 }, { note: 'E4', dur: 0.5 }, { note: 'D4', dur: 2 },
      { note: 'G4', dur: 4 },
    ],
  },
  {
    id: 'ly_ngua_o',
    title: 'Lý Ngựa Ô',
    region: 'Dân Ca Nam Bộ',
    instrument: 'Đàn Kìm & Đàn Tranh',
    description: 'Nhịp điệu rộn ràng, phóng khoáng, tái hiện vẻ tươi vui khí thế của người dân phương Nam hào sảng.',
    bpm: 124,
    melody: [
      { note: 'G4', dur: 0.75 }, { note: 'G4', dur: 0.25 }, { note: 'A4', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
      { note: 'G4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 2 },
      { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
      { note: 'G4', dur: 2 }, { note: 'G4', dur: 2 },
    ],
  },
  {
    id: 'da_co_hoai_lang',
    title: 'Dạ Cổ Hoài Lang',
    region: 'Đờn Ca Tài Tử Nam Bộ',
    instrument: 'Đàn Kìm & Đàn Bầu',
    description: 'Bản Dạ Cổ bất hủ của cụ Cao Văn Lầu, da diết tiếng tơ lòng phương Nam nghe trăng rằm dạ khúc.',
    bpm: 68,
    melody: [
      { note: 'D4', dur: 2 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 },
      { note: 'A4', dur: 3 }, { note: 'B4', dur: 1 },
      { note: 'D5', dur: 2 }, { note: 'B4', dur: 1 }, { note: 'A4', dur: 1 },
      { note: 'G4', dur: 2 }, { note: 'E4', dur: 2 },
      { note: 'D4', dur: 1.5 }, { note: 'E4', dur: 0.5 }, { note: 'G4', dur: 2 },
      { note: 'A4', dur: 2 }, { note: 'D5', dur: 2 },
      { note: 'G4', dur: 4 },
    ],
  },
  {
    id: 'hon_dan_bau',
    title: 'Hồn Thiêng Đất Mẹ',
    region: 'Độc Tấu Cổ Truyền',
    instrument: 'Độc Tấu Đàn Bầu',
    description: 'Thanh âm một dây ngân nga da diết, chạm sâu vào cội nguồn tâm thức và tình yêu non sông gấm vóc.',
    bpm: 76,
    melody: [
      { note: 'C4', dur: 2 }, { note: 'D4', dur: 1 }, { note: 'F4', dur: 1 },
      { note: 'G4', dur: 3 }, { note: 'A4', dur: 1 },
      { note: 'C5', dur: 2 }, { note: 'D5', dur: 1.5 }, { note: 'C5', dur: 0.5 },
      { note: 'A4', dur: 2 }, { note: 'G4', dur: 2 },
      { note: 'F4', dur: 1.5 }, { note: 'D4', dur: 0.5 }, { note: 'C4', dur: 2 },
      { note: 'D4', dur: 2 }, { note: 'G4', dur: 2 },
      { note: 'C4', dur: 4 },
    ],
  },
  {
    id: 'sao_hmong_goi_ban',
    title: 'Tiếng Sáo H\'Mông Gọi Bạn',
    region: 'Âm Vang Núi Rừng Tây Bắc',
    instrument: 'Sáo Mèo & Khèn H\'Mông',
    description: 'Tiếng sáo vi vu ngân vang trên đỉnh đèo Mã Pí Lèng mờ sương, gửi gắm lời hẹn ước tình duyên chân thành.',
    bpm: 84,
    melody: [
      { note: 'E4', dur: 1.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 2 },
      { note: 'B4', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'B4', dur: 2 },
      { note: 'A4', dur: 1.5 }, { note: 'G4', dur: 0.5 }, { note: 'E4', dur: 2 },
      { note: 'D4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 2 },
      { note: 'A4', dur: 2 }, { note: 'B4', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'E5', dur: 3 }, { note: 'D5', dur: 1 },
      { note: 'B4', dur: 2 }, { note: 'A4', dur: 2 },
      { note: 'E4', dur: 4 },
    ],
  },
];

export const TraditionalFolkMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const currentStepRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentTrack = FOLK_TRACKS[currentTrackIndex];

  // Initialize or resume AudioContext
  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      gainNodeRef.current = masterGain;
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play a single note simulating traditional Vietnamese acoustic timbre
  const playTraditionalNote = (noteName: string, durationSec: number) => {
    if (noteName === 'REST') return;
    const freq = NOTE_FREQS[noteName];
    if (!freq) return;

    try {
      const ctx = getAudioContext();
      const masterGain = gainNodeRef.current;
      if (!ctx || !masterGain) return;

      const now = ctx.currentTime;

      // 1. Fundamental Oscillator
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      // Timbre adaptation by instrument
      const isDanBau = currentTrack.id === 'hon_dan_bau';
      const isSao = currentTrack.id.includes('sao') || currentTrack.id.includes('truc');

      if (isDanBau) {
        osc1.type = 'sine';
        // Đàn bầu pitch bend glide (rung luyến)
        osc1.frequency.setValueAtTime(freq * 0.96, now);
        osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.12);
        // Vibrato LFO
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5.5, now);
        vibratoGain.gain.setValueAtTime(freq * 0.03, now);
        vibrato.connect(osc1.frequency);
        vibrato.start(now);
        vibrato.stop(now + durationSec);
      } else if (isSao) {
        // Sáo trúc breathy sine + triangle
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);
        // Soft breath vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(4.8, now);
        vibratoGain.gain.setValueAtTime(freq * 0.018, now);
        vibrato.connect(osc1.frequency);
        vibrato.start(now);
        vibrato.stop(now + durationSec);
      } else {
        // Đàn Tranh / Đàn Nguyệt: Plucked string harmonic rich
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(freq, now);
      }

      // 2. Harmonic overtone oscillator (tạo tiếng vang bồi âm đàn dân tộc)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Envelope ADSR
      const attack = isSao ? 0.08 : (isDanBau ? 0.1 : 0.015);
      const decay = durationSec * 0.85;

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + attack);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(attack + 0.1, durationSec));

      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(0.12, now + attack);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(attack + 0.1, durationSec * 0.7));

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(masterGain);
      gain2.connect(masterGain);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + durationSec + 0.1);
      osc2.stop(now + durationSec + 0.1);
    } catch {
      // AudioContext policy fallback
    }
  };

  // Schedule melody sequencer
  const startSequencer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    isPlayingRef.current = true;

    const secondsPerBeat = 60 / currentTrack.bpm;
    const melody = currentTrack.melody;

    const step = () => {
      if (!isPlayingRef.current) return;

      const currentNote = melody[currentStepRef.current];
      const noteDurationSec = currentNote.dur * secondsPerBeat;

      playTraditionalNote(currentNote.note, noteDurationSec);

      currentStepRef.current = (currentStepRef.current + 1) % melody.length;
      timerRef.current = window.setTimeout(step, noteDurationSec * 1000);
    };

    step();
  };

  const stopSequencer = () => {
    isPlayingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSequencer();
      setIsPlaying(false);
    } else {
      getAudioContext();
      currentStepRef.current = 0;
      setIsPlaying(true);
      startSequencer();
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % FOLK_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    currentStepRef.current = 0;
    if (isPlaying) {
      stopSequencer();
      // Short delay for clean transition
      setTimeout(() => {
        if (isPlayingRef.current) startSequencer();
      }, 100);
    }
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    currentStepRef.current = 0;
    if (isPlaying) {
      stopSequencer();
      setTimeout(() => {
        if (isPlayingRef.current) startSequencer();
      }, 100);
    }
  };

  // Handle Volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (isMuted && newVol > 0) setIsMuted(false);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        nextMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
  };

  // Broadcast state & Listen to external commands
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('vietnam-folk-music-state', {
        detail: {
          isPlaying,
          currentTrackIndex,
          currentTrack: FOLK_TRACKS[currentTrackIndex],
          volume,
          isMuted,
        },
      })
    );
  }, [isPlaying, currentTrackIndex, volume, isMuted]);

  useEffect(() => {
    const handleCmd = (e: any) => {
      const { action, trackId, trackIndex } = e.detail || {};
      if (action === 'toggle') {
        handleTogglePlay();
      } else if (action === 'play') {
        if (!isPlayingRef.current) {
          getAudioContext();
          currentStepRef.current = 0;
          setIsPlaying(true);
          startSequencer();
        }
      } else if (action === 'pause') {
        if (isPlayingRef.current) {
          stopSequencer();
          setIsPlaying(false);
        }
      } else if (action === 'next') {
        handleNextTrack();
      } else if (action === 'select' && typeof trackIndex === 'number') {
        handleSelectTrack(trackIndex);
      } else if (action === 'select_by_id' && trackId) {
        const found = FOLK_TRACKS.findIndex((t) => t.id === trackId);
        if (found !== -1) handleSelectTrack(found);
      }
    };
    window.addEventListener('vietnam-folk-music-cmd', handleCmd);
    return () => window.removeEventListener('vietnam-folk-music-cmd', handleCmd);
  }, [currentTrackIndex, isPlaying]);

  // Clean up
  useEffect(() => {
    return () => {
      stopSequencer();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative font-sans select-none">
      {/* Floating Cultural Music Pill in Top Right / Header */}
      <div className="flex items-center gap-2 bg-[#200508]/95 backdrop-blur-md border border-amber-600/40 p-1.5 sm:p-2 rounded-2xl shadow-2xl ring-1 ring-amber-500/20">
        {/* Animated Disc Vinyl Icon */}
        <button
          onClick={handleTogglePlay}
          className={`relative p-2 rounded-xl transition-all shadow-md flex items-center justify-center ${
            isPlaying
              ? 'bg-gradient-to-br from-red-700 to-amber-600 text-amber-100 ring-2 ring-amber-400/60'
              : 'bg-stone-900/80 text-amber-300 hover:bg-red-950/60 border border-red-900/40'
          }`}
          title={isPlaying ? 'Tạm dừng nhạc dân gian' : 'Bật nhạc dân tộc Việt Nam'}
        >
          <Disc3
            size={18}
            className={`transition-transform duration-700 ${isPlaying ? 'animate-spin' : ''}`}
          />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          )}
        </button>

        {/* Current Track Info & Play/Pause */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex flex-col text-left pr-1"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-serif font-bold text-amber-200 line-clamp-1 max-w-[130px] sm:max-w-[180px]">
              {currentTrack.title}
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950 text-amber-400/90 border border-red-900/40 hidden sm:inline">
              {currentTrack.instrument}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
            {isPlaying ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Đang ngân vang</span>
              </span>
            ) : (
              <span>Chạm để thưởng thức</span>
            )}
            <span>·</span>
            <span className="text-stone-400 hidden sm:inline">{currentTrack.region}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 border-l border-red-900/40 pl-2">
          {/* Play / Pause Toggle Button */}
          <button
            onClick={handleTogglePlay}
            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-amber-200 transition-colors"
            title={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          {/* Next Track Button */}
          <button
            onClick={handleNextTrack}
            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-amber-200 transition-colors"
            title="Đổi khúc nhạc tiếp theo"
          >
            <SkipForward size={14} />
          </button>

          {/* Mute / Unmute */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-amber-200 transition-colors hidden sm:flex"
            title={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Expand Menu Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-1.5 rounded-lg transition-colors ${
              isExpanded ? 'bg-amber-600 text-stone-950' : 'bg-red-950/60 text-amber-300'
            }`}
            title="Danh sách làn điệu cổ truyền"
          >
            <Music size={14} />
          </button>
        </div>
      </div>

      {/* Expanded Playlist & Volume Modal Popover */}
      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#1b0508]/98 backdrop-blur-xl border border-amber-600/40 p-4 shadow-2xl z-50 text-xs text-stone-200 space-y-4 font-sans animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2.5 border-b border-red-900/40">
            <div className="flex items-center gap-2 text-amber-200 font-serif font-bold text-sm">
              <Sparkles size={16} className="text-amber-400" />
              <span>Giai Điệu Cổ Truyền Việt Nam</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-amber-400 border border-red-800/50">
              5 Khúc Nhạc Di Sản
            </span>
          </div>

          {/* Volume Slider Bar */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-950/60 border border-red-900/30">
            <button onClick={handleToggleMute} className="text-amber-300 hover:text-amber-100">
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-stone-400 font-mono w-7 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>

          {/* Playlist */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {FOLK_TRACKS.map((track, idx) => {
              const isSelected = idx === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'border-amber-400 bg-red-900/70 text-amber-100 shadow-md ring-1 ring-amber-400/40'
                      : 'border-red-900/30 bg-stone-900/40 hover:bg-red-950/40 text-stone-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-serif font-bold text-xs text-amber-200 flex items-center gap-1.5">
                      <span>{track.title}</span>
                      {isSelected && isPlaying && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-stone-950 font-sans font-bold">
                          Đang phát
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-amber-300/80 mt-0.5">
                      {track.instrument} · {track.region}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1 line-clamp-1 italic font-serif">
                      "{track.description}"
                    </div>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    {isSelected && isPlaying ? (
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-amber-400 animate-pulse h-2"></span>
                        <span className="w-1 bg-amber-400 animate-pulse h-3"></span>
                        <span className="w-1 bg-amber-400 animate-pulse h-1.5"></span>
                      </div>
                    ) : (
                      <Play size={12} className="text-stone-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-red-900/30 flex items-center justify-between text-[10px] text-stone-400">
            <span>Âm sắc Ngũ Cung truyền thống Việt</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-amber-300 hover:underline"
            >
              Đóng bảng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const dispatchFolkMusicCmd = (
  action: 'toggle' | 'play' | 'pause' | 'next' | 'select' | 'select_by_id',
  data?: { trackId?: string; trackIndex?: number }
) => {
  window.dispatchEvent(new CustomEvent('vietnam-folk-music-cmd', { detail: { action, ...data } }));
};

export const useFolkMusicState = () => {
  const [state, setState] = useState<{
    isPlaying: boolean;
    currentTrackIndex: number;
    currentTrack: FolkTrack;
    volume: number;
    isMuted: boolean;
  }>({
    isPlaying: false,
    currentTrackIndex: 0,
    currentTrack: FOLK_TRACKS[0],
    volume: 0.65,
    isMuted: false,
  });

  useEffect(() => {
    const handleState = (e: any) => {
      if (e.detail) setState(e.detail);
    };
    window.addEventListener('vietnam-folk-music-state', handleState);
    return () => window.removeEventListener('vietnam-folk-music-state', handleState);
  }, []);

  return state;
};

