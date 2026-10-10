/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CostumeId =
  | 'ao_ngu_than_tay_chen'
  | 'ao_tac_ngu_than'
  | 'ao_nhat_binh'
  | 'ao_giao_linh'
  | 'ao_tu_than'
  | 'ao_ba_ba'
  | 'trang_phuc_hmong'
  | 'trang_phuc_cham';

export type GenderTarget = 'nu' | 'nam' | 'unisex';

export type EventId =
  | 'ky_yeu_tot_nghiep'
  | 'tet_nguyen_dan'
  | 'cuoi_hoi_truyen_thong'
  | 'chup_anh_di_san'
  | 'bieu_dien_nghe_thuat'
  | 'gio_to_dinh_lang';

export type RegionId =
  | 'bac_bo'
  | 'trung_bo'
  | 'nam_bo'
  | 'tay_bac'
  | 'nam_trung_bo';

export type StyleId =
  | 'hoang_gia_quy_phai'
  | 'thanh_nha_hoc_duong'
  | 'dan_gian_truyen_thong'
  | 'tan_co_giao_duyen';

export type WeatherId = 'mat_me_mua_thu' | 'se_lanh_mua_dong' | 'am_ap_mua_xuan' | 'nang_am_mua_he';

export type MotionMode = 'chao_hoi' | 'dung_nghiem' | 'xoay_tron' | 'cam_quat';
export type CameraAngle = 0 | 45 | 90 | 180 | 270;

export type BackdropId =
  | 'dai_noi_hue'
  | 'dinh_lang_mai_cong'
  | 'mai_nha_tranh_luy_tre'
  | 'van_mieu_thang_long'
  | 'gam_do_dong_son'
  | 'tay_bac_ruong_bac_thang';

export type NonLaType =
  | 'non_la_bai_tho'
  | 'non_la_chuong'
  | 'non_ba_tam'
  | 'non_chop_nho'
  | 'none';

export type HeadwearType =
  | 'khan_dong_nam'
  | 'khan_dong_nu'
  | 'khan_vanh_day'
  | 'khan_ran'
  | 'none';

export type AccessoryHandType =
  | 'quat_tram_huong'
  | 'quat_lua_theu'
  | 'tui_gam_cat_tuong'
  | 'chuoi_ngoc_tay'
  | 'none';

export type JewelryType =
  | 'kieng_bac_cham_sen'
  | 'the_bai_hoang_gia'
  | 'vong_ngoc_cam_thach'
  | 'none';

export type FootwearType =
  | 'hai_theu_cung_dinh'
  | 'guoc_moc_khac_hoa'
  | 'giay_tay_thanh_lich'
  | 'none';

export interface ColorScheme {
  id: string;
  name: string;
  vietnameseName: string;
  hex: string;
  pantoneName: string;
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  meaning: string;
}

export interface FabricMaterial {
  id: string;
  name: string;
  origin: string;
  description: string;
  suitability: string;
}

export interface PatternMotif {
  id: string;
  name: string;
  description: string;
  symbolism: string;
}

export interface TraditionalCostume {
  id: CostumeId;
  name: string;
  subTitle: string;
  period: string; // e.g. Triều Nguyễn (1802 - 1945), Thời Lê (1428 - 1789)
  origin: string;
  region: RegionId;
  recommendedGender: GenderTarget;
  shortHistory: string;
  significance: string;
  structuralDetails: {
    collar: string;
    sleeves: string;
    panels: string;
    buttons: string;
  };
  suitableEvents: EventId[];
  defaultColors: string[]; // hex codes
  culturalRules: string[];
  incompatibleAccessories: {
    itemType: string;
    reason: string;
  }[];
}

export interface OutfitConfiguration {
  id?: string;
  costumeId: CostumeId;
  gender: 'nam' | 'nu';
  primaryColor: string;
  secondaryColor: string; // Quần / Viền cổ / Yếm
  pantsColor: string;
  fabricId: string;
  patternId: string;
  nonLa: NonLaType;
  headwear: HeadwearType;
  handAccessory: AccessoryHandType;
  jewelry: JewelryType;
  footwear: FootwearType;
  selectedEvent: EventId;
  selectedRegion: RegionId;
  selectedStyle: StyleId;
  selectedBackdrop: BackdropId;
  avatarModel: 'student_f' | 'student_m' | 'custom_upload';
  customAvatarUrl?: string;
  notes?: string;
  createdAt?: string;
}

export interface CulturalCheckResult {
  isAuthentic: boolean;
  score: number; // 0 - 100
  notices: {
    type: 'success' | 'warning' | 'tip';
    title: string;
    message: string;
  }[];
  elementalHarmony: {
    status: 'Tương Sinh' | 'Hòa Hợp' | 'Tương Khắc';
    explanation: string;
  };
}
