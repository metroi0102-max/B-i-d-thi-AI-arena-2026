/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TraditionalCostume,
  ColorScheme,
  FabricMaterial,
  PatternMotif,
  OutfitConfiguration,
  CulturalCheckResult,
} from '../types/vietnamAttire';

export const TRADITIONAL_COSTUMES: TraditionalCostume[] = [
  {
    id: 'ao_ngu_than_tay_chen',
    name: 'Áo Ngũ Thân Tay Chẽn',
    subTitle: 'Trang phục chuẩn mực của người Việt thời Nguyễn',
    period: 'Định chế năm 1744 (Chúa Nguyễn Phúc Khoát) & Toàn quốc năm 1837 (Vua Minh Mạng)',
    origin: 'Đàng Trong lan tỏa khắp cả nước',
    region: 'trung_bo',
    recommendedGender: 'unisex',
    shortHistory:
      'Áo ngũ thân tay chẽn được định chế nhằm tạo nên diện mạo thống nhất, trang trọng cho người Việt từ quan viên đến thứ dân. Ống tay thu nhỏ ôm vừa vặn cổ tay, thuận tiện cho sinh hoạt và học tập.',
    significance:
      '5 thân tượng trưng cho "tứ thân phụ mẫu" (cha mẹ mình và cha mẹ người phối ngẫu) cùng bản thân người mặc ở thân con bên trong. 5 hạt nút tượng trưng cho Ngũ thường: Nhân - Nghĩa - Lễ - Trí - Tín.',
    structuralDetails: {
      collar: 'Cổ đứng vuông góc, cao khoảng 2.5 - 3.5cm, ôm khít cổ thể hiện sự đoan chính',
      sleeves: 'Tay chẽn (thuôn hẹp dần từ nách về cổ tay)',
      panels: '5 thân áo (2 thân trước, 2 thân sau và 1 thân con lót bên trong)',
      buttons: '5 hạt khuy (nút) cài sang bên nách phải theo quy thức hữu nhậm',
    },
    suitableEvents: ['ky_yeu_tot_nghiep', 'tet_nguyen_dan', 'chup_anh_di_san', 'bieu_dien_nghe_thuat'],
    defaultColors: ['#991B1B', '#1E3A8A', '#065F46', '#D97706', '#1E293B'],
    culturalRules: [
      'Phải gài khuy sang bên phải (quy thức Hữu Nhậm), không gài sang trái.',
      'Nam giới thường đi kèm Khăn Đóng gọn gàng; nữ giới có thể búi tóc hoặc đội nón lá.',
      'Nẹp áo phẳng phiu, bên trong luôn mặc áo lót trắng (áo cánh lót) sạch sẽ.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'khan_vanh_day',
        reason: 'Khăn vành dây vàng kim là quy chế dành riêng cho Áo Nhật Bình cung đình, không dùng với Ngũ Thân tay chẽn thường nhật.',
      },
    ],
  },
  {
    id: 'ao_tac_ngu_than',
    name: 'Áo Tấc (Ngũ Thân Tay Thụng)',
    subTitle: 'Đại lễ phục trang nghiêm thời Nguyễn',
    period: 'Triều Nguyễn (1802 - 1945)',
    origin: 'Cung đình và giới nho sĩ khắp Việt Nam',
    region: 'trung_bo',
    recommendedGender: 'unisex',
    shortHistory:
      'Áo Tấc là biến thể trang trọng của áo ngũ thân với phần tay áo thụng rộng, dài qua khỏi đầu ngón tay. Được dùng trong các dịp đại lễ như tế tự đình miếu, hôn lễ, lễ tết triều hội và thi cử khoa bảng.',
    significance:
      'Ống tay thụng rộng khi chắp tay hành lễ tạo nên phong thái tôn nghiêm, cung kính, biểu thị sự tôn ti trật tự và tinh thần lễ nhạc Á Đông.',
    structuralDetails: {
      collar: 'Cổ đứng lập lĩnh, viền trắng tinh khiết',
      sleeves: 'Tay thụng (rộng từ 30 - 45cm, dài quá đầu ngón tay khoảng 1 tấc - 10cm)',
      panels: '5 thân ghép lại, tà áo xòe lượn hình chữ bát thanh thoát, uyển chuyển',
      buttons: '5 cúc kim loại hoặc ngọc thạch cài sườn phải',
    },
    suitableEvents: ['cuoi_hoi_truyen_thong', 'gio_to_dinh_lang', 'tet_nguyen_dan', 'ky_yeu_tot_nghiep'],
    defaultColors: ['#B91C1C', '#92400E', '#065F46', '#1E3A8A', '#7C2D12'],
    culturalRules: [
      'Khi mặc Áo Tấc, bắt buộc phải có Khăn Đóng (nam) hoặc vấn khăn / búi trâm (nữ).',
      'Bước đi khoan thai, hai tay chắp trước ngực hoặc buông tự nhiên theo thế tay thụng.',
      'Quần mặc kèm phải là quần trắng hoặc lụa mộc ống rộng truyền thống.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'non_ba_tam',
        reason: 'Nón Ba Tầm (quai thao) thuộc không gian văn hóa Bắc Bộ thời Lê - Nguyễn, không đồng bộ với nghi lễ Áo Tấc Trung Bộ.',
      },
      {
        itemType: 'khan_ran',
        reason: 'Khăn rằn là phụ kiện văn hóa bình dân Nam Bộ, không phù hợp với nghi thức trang trọng của Áo Tấc.',
      },
    ],
  },
  {
    id: 'ao_nhat_binh',
    name: 'Áo Nhật Bình',
    subTitle: 'Lễ phục quý tộc cung đình triều Nguyễn',
    period: 'Quy định trong Khâm định Đại Nam hội điển sự lệ triều Nguyễn',
    origin: 'Cung đình Huế',
    region: 'trung_bo',
    recommendedGender: 'nu',
    shortHistory:
      'Áo Nhật Bình là trang phục của bậc Hoàng hậu, Công chúa, Phi tần và Mệnh phụ triều đình nhà Nguyễn. Sau này vào thời hiện đại, Nhật Bình trở thành áo cưới trang trọng được các cô dâu vô cùng yêu thích.',
    significance:
      'Tên gọi "Nhật Bình" bắt nguồn từ cổ áo hình chữ nhật vuông vức trước ngực, tượng trưng cho sự ngay thẳng, đoan trang. Dải ngũ sắc ở cổ tay tượng trưng cho Ngũ hành âm dương vạn vật giao hòa.',
    structuralDetails: {
      collar: 'Cổ áo khoét vuông hình chữ nhật, viền dải hoa văn thêu tinh xảo',
      sleeves: 'Tay áo có dải viền ngũ sắc (Lục, Vàng, Xanh, Trắng, Đỏ)',
      panels: 'Thân áo mở vạt trước ngực, cố định bằng dải thắt lưng và kim khánh/ngọc bội',
      buttons: 'Cố định vạt bằng nút cài hoặc dải lụa kim tuyến kết hoa',
    },
    suitableEvents: ['cuoi_hoi_truyen_thong', 'chup_anh_di_san', 'bieu_dien_nghe_thuat'],
    defaultColors: ['#DC2626', '#EAB308', '#059669', '#7C3AED', '#E11D48'],
    culturalRules: [
      'Theo cổ lễ triều Nguyễn: Màu Vàng chính sắc dành cho Hoàng Thái hậu/Hoàng hậu; màu Đỏ son cho Công chúa; màu Tím / Xanh cho bậc Phi tần.',
      'Đi kèm với Khăn Vành Dây vấn nhiều lớp hoặc trâm cài tóc hoa sen, quạt lụa thêu cung đình.',
      'Không dùng nón ba tầm hay khăn rằn khi diện Nhật Bình để tránh nhầm lẫn bản sắc vùng miền.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'non_ba_tam',
        reason: 'Nón Ba Tầm (quai thao) là biểu tượng Kinh Bắc của Áo Tứ Thân, kiêng kỵ khi phối cùng Nhật Bình cung đình.',
      },
      {
        itemType: 'khan_ran',
        reason: 'Khăn rằn mộc mạc Nam Bộ xung đột hoàn toàn với quy chế cung đình sang quý của Áo Nhật Bình.',
      },
      {
        itemType: 'khan_dong_nam',
        reason: 'Nhật Bình nguyên bản là y phục dành cho nữ giới hoàng tộc.',
      },
    ],
  },
  {
    id: 'ao_giao_linh',
    name: 'Áo Giao Lĩnh (Tràng Vạt)',
    subTitle: 'Cổ phục uy nghi nghìn năm văn hiến',
    period: 'Thời Lý - Trần - Lê (thịnh hành thế kỷ 11 đến 18)',
    origin: 'Đại Việt cổ truyền',
    region: 'bac_bo',
    recommendedGender: 'unisex',
    shortHistory:
      'Giao Lĩnh là kiểu áo có lịch sử lâu đời bậc nhất của người Việt, với đặc trưng hai vạt cổ đan chéo vào nhau ở phía trước. Đây là trang phục phổ biến của sĩ phu, quý tộc và thứ dân suốt các triều đại Lý, Trần, Lê.',
    significance:
      'Cổ áo giao nhau tượng trưng cho sự hài hòa giữa Đất và Trời, âm dương tương phối. Tà áo dài chạm đất thể hiện vẻ đẹp thanh cao, thoát tục của giới trí thức phong kiến.',
    structuralDetails: {
      collar: 'Cổ giao chéo (vạt trái đè lên vạt phải - Tả áp Hữu)',
      sleeves: 'Ống tay thụng lớn uyển chuyển',
      panels: 'Thân áo dài phủ gót chân, có thắt dải lụa tao nhã ngang eo',
      buttons: 'Dùng dây thắt vạt lụa (không dùng nút đính như thời Nguyễn)',
    },
    suitableEvents: ['chup_anh_di_san', 'gio_to_dinh_lang', 'bieu_dien_nghe_thuat'],
    defaultColors: ['#1E3A8A', '#065F46', '#991B1B', '#334155', '#475569'],
    culturalRules: [
      'Bắt buộc vạt trái đè lên vạt phải (Tả áp Hữu). Ngược lại (Hữu áp Tả) là trang phục dành cho người đã khuất.',
      'Thắt dải lụa ngang thắt lưng cân đối, rủ mềm mại bên hông.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'khan_vanh_day',
        reason: 'Khăn vành dây xuất hiện ở triều Nguyễn, không cùng giai đoạn lịch sử với Giao Lĩnh thời Lê.',
      },
    ],
  },
  {
    id: 'ao_tu_than',
    name: 'Áo Tứ Thân & Nón Ba Tầm',
    subTitle: 'Hồn cốt dân gian miền Quan họ Kinh Bắc',
    period: 'Thịnh hành thế kỷ 18 đến đầu thế kỷ 20',
    origin: 'Đồng bằng Bắc Bộ',
    region: 'bac_bo',
    recommendedGender: 'nu',
    shortHistory:
      'Áo Tứ Thân gắn liền với hình ảnh người phụ nữ đồng bằng Bắc Bộ cần cù, duyên dáng và các liền chị Quan họ. Áo gồm 4 vạt, bên trong mặc yếm thắm, thắt lưng lụa đào xanh biếc.',
    significance:
      '4 vạt áo tượng trưng cho tứ thân phụ mẫu. Hai vạt trước buộc lại với nhau tượng trưng cho tình cảm vợ chồng keo sơn gắn bó. Yếm đào che chở tấm lòng son sắt.',
    structuralDetails: {
      collar: 'Áo không gài nút, để mở để lộ yếm lụa đào và hoa sen bên trong',
      sleeves: 'Tay áo thon gọn, xắn nhẹ khi làm việc hoặc buông mềm khi trẩy hội',
      panels: '4 thân áo (2 thân sau may liền sống lưng, 2 thân trước thả buông hoặc thắt vạt)',
      buttons: 'Thắt bằng dải lụa đào và thắt lưng xanh',
    },
    suitableEvents: ['tet_nguyen_dan', 'bieu_dien_nghe_thuat', 'chup_anh_di_san'],
    defaultColors: ['#831843', '#065F46', '#78350F', '#B45309', '#991B1B'],
    culturalRules: [
      'Tuyệt phối truyền thống: Áo Tứ Thân + Yếm Đào + Váy lụa sồi đen + Nón Ba Tầm (quai thao) + Khăn mỏ quạ.',
      'Không dùng cúc khuy cài kim loại hiện đại.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'khan_dong_nam',
        reason: 'Khăn đóng nam không dùng cho nữ giới mặc áo Tứ Thân.',
      },
      {
        itemType: 'khan_vanh_day',
        reason: 'Khăn vành dây thuộc cung đình triều Nguyễn, lệch bối cảnh dân gian Kinh Bắc.',
      },
    ],
  },
  {
    id: 'ao_ba_ba',
    name: 'Áo Bà Ba & Khăn Rằn',
    subTitle: 'Vẻ đẹp thuần hậu, phóng khoáng đất phương Nam',
    period: 'Thế kỷ 19 đến nay',
    origin: 'Nam Bộ',
    region: 'nam_bo',
    recommendedGender: 'unisex',
    shortHistory:
      'Áo Bà Ba là trang phục đặc trưng của người dân Nam Bộ qua bao thế hệ. Thiết kế giản dị, xẻ tà hai bên hông tạo sự thoáng mát, thuận tiện chèo ghe xuồng và làm việc giữa vùng đồng bằng sông Cửu Long.',
    significance:
      'Biểu trưng cho tính cách hào sảng, chân chất, trọng tình nghĩa và vẻ đẹp dịu dàng nhưng kiên cường của con người Nam Bộ.',
    structuralDetails: {
      collar: 'Cổ tròn hoặc cổ tim thanh thoát',
      sleeves: 'Tay dài nối thân raglan, cổ tay hơi lượn',
      panels: 'Thân áo ngắn qua mông, xẻ tà 2 bên hông tạo sự bay bổng',
      buttons: 'Hàng cúc giữa ngực (nút bấm hoặc cúc áo tròn xinh xắn)',
    },
    suitableEvents: ['chup_anh_di_san', 'bieu_dien_nghe_thuat', 'ky_yeu_tot_nghiep'],
    defaultColors: ['#78350F', '#047857', '#0284C7', '#BE185D', '#1F2937'],
    culturalRules: [
      'Đi kèm nón lá chóp nhọn truyền thống, khăn rằn quấn cổ hoặc đội đầu, guốc mộc.',
      'Phối cùng quần đen lụa lãnh Mỹ A hoặc lụa bóng mềm mại.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'khan_vanh_day',
        reason: 'Khăn vành cung đình không hòa hợp với sự bình dị dân dã của Áo Bà Ba.',
      },
      {
        itemType: 'non_ba_tam',
        reason: 'Nón ba tầm là đặc trưng vùng Kinh Bắc, khác với nón lá miền Tây.',
      },
    ],
  },
  {
    id: 'trang_phuc_hmong',
    name: 'Trang Phục Thổ Cẩm H\'Mông',
    subTitle: 'Sắc hoa rừng rực rỡ vùng non cao Tây Bắc',
    period: 'Văn hóa cổ truyền Tây Bắc',
    origin: 'Hà Giang, Sapa, Sơn La, Lai Châu',
    region: 'tay_bac',
    recommendedGender: 'nu',
    shortHistory:
      'Được dệt từ sợi lanh tự nhiên, nhuộm chàm và vẽ sáp ong (batik) tinh xảo. Từng đường kim mũi chỉ là công sức nhiều tháng ròng của người phụ nữ trên nương rẫy.',
    significance:
      'Váy xòe xếp nếp như cánh hoa rừng, vòng bạc lấp lánh xua đuổi điều dữ và tôn vinh lòng kiên nhẫn, bàn tay tài hoa của đồng bào miền núi.',
    structuralDetails: {
      collar: 'Cổ áo vạt chéo xẻ chữ V viền thổ cẩm nổi bật',
      sleeves: 'Tay áo thêu hoa văn hình học, mặt trời',
      panels: 'Váy xòe xếp nếp rộng, đung đưa theo từng bước chân',
      buttons: 'Cố định bằng dải thắt lưng thêu hoa văn',
    },
    suitableEvents: ['bieu_dien_nghe_thuat', 'chup_anh_di_san', 'tet_nguyen_dan'],
    defaultColors: ['#047857', '#BE123C', '#1D4ED8', '#E11D48', '#0F172A'],
    culturalRules: [
      'Bộ trang sức bạc (kiềng cổ, khuyên tai, xà tích) là điểm nhấn linh hồn.',
      'Khăn đội đầu đính hạt cườm hoặc quấn nhiều lớp cẩn thận.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'non_ba_tam',
        reason: 'Nón ba tầm của người Kinh không phù hợp với trang phục dân tộc H\'Mông.',
      },
      {
        itemType: 'khan_vanh_day',
        reason: 'Khăn vành cung đình Huế không tương thích với bối cảnh văn hóa Tây Bắc.',
      },
    ],
  },
  {
    id: 'trang_phuc_cham',
    name: 'Trang Phục Dệt Truyền Thống Chăm',
    subTitle: 'Huyền thoại dệt thổ cẩm Mỹ Nghiệp & Lễ hội Kate',
    period: 'Văn hóa cổ truyền duyên hải Nam Trung Bộ',
    origin: 'Ninh Thuận, Bình Thuận, An Giang',
    region: 'nam_trung_bo',
    recommendedGender: 'nu',
    shortHistory:
      'Trang phục truyền thống phụ nữ Chăm mang vẻ đẹp kín đáo nhưng thướt tha, với chiếc áo dài chui đầu (Aw tàh), dải khăn thắt lưng thêu hoa văn hoa văn thần Shiva, tháp Chàm.',
    significance:
      'Biểu thị cho sự thuần khiết, tâm hồn hướng thiện và gìn giữ văn hóa mẫu hệ nghìn năm của cộng đồng người Chăm.',
    structuralDetails: {
      collar: 'Cổ tròn ôm sát cổ hoặc chui đầu',
      sleeves: 'Tay áo bó thon dài trang nhã',
      panels: 'Áo chui đầu dài không xẻ tà, ôm dáng nhẹ nhàng',
      buttons: 'Áo may liền, không có khuy cúc',
    },
    suitableEvents: ['bieu_dien_nghe_thuat', 'chup_anh_di_san'],
    defaultColors: ['#FFFFFF', '#DC2626', '#0284C7', '#CA8A04', '#475569'],
    culturalRules: [
      'Điểm nhấn quan trọng nhất là dải thắt lưng dệt (Taleik khan) vắt chéo qua ngực và thắt lưng.',
      'Khăn choàng đầu mỏng (Khanh ma-om) buông rủ ngang vai duyên dáng.',
    ],
    incompatibleAccessories: [
      {
        itemType: 'non_ba_tam',
        reason: 'Nón quai thao không thuộc trang phục truyền thống của người Chăm.',
      },
    ],
  },
];

export const COLOR_PALETTES: ColorScheme[] = [
  {
    id: 'do_son_hoang_toc',
    name: 'Đỏ Son Cung Đình',
    vietnameseName: 'Đỏ Son (Chu Sa)',
    hex: '#991B1B',
    pantoneName: 'Imperial Vermilion',
    element: 'Hỏa',
    meaning: 'Sắc đỏ son chu sa là biểu tượng tối thượng của hoàng gia và hỷ sự, mang lại may mắn, tài lộc, năng lượng mặt trời và xua đuổi điều xấu.',
  },
  {
    id: 'vang_hoang_kim',
    name: 'Vàng Kim Quý Tộc',
    vietnameseName: 'Vàng Hoàng Kim',
    hex: '#D97706',
    pantoneName: 'Royal Ochre',
    element: 'Thổ',
    meaning: 'Màu của ánh thái dương và quyền uy đế vương thời Nguyễn, đại diện cho trí tuệ minh triết, đất mẹ màu mỡ và sự thịnh vượng vững bền.',
  },
  {
    id: 'xanh_ngoc_bich',
    name: 'Xanh Ngọc Bích',
    vietnameseName: 'Ngọc Bích Thanh Khiết',
    hex: '#065F46',
    pantoneName: 'Imperial Jade',
    element: 'Mộc',
    meaning: 'Tượng trưng cho sự sinh sôi nảy nở của cây cỏ mùa xuân, phẩm hạnh thanh tao, lòng nhân ái bao dung và tâm hồn tĩnh lặng.',
  },
  {
    id: 'xanh_cham_thuy',
    name: 'Xanh Chàm Thâm Trầm',
    vietnameseName: 'Xanh Chàm Cổ Truyền',
    hex: '#1E3A8A',
    pantoneName: 'Deep Indigo',
    element: 'Thủy',
    meaning: 'Sắc chàm chiết xuất từ lá cây rừng tự nhiên, biểu trưng cho đại dương bao la, chiều sâu học vấn uyên bác và đức tính kiên trung son sắt.',
  },
  {
    id: 'hong_canh_sen',
    name: 'Hồng Cánh Sen Hà Thành',
    vietnameseName: 'Sen Hồng Tinh Khôi',
    hex: '#BE185D',
    pantoneName: 'Lotus Rose',
    element: 'Hỏa',
    meaning: 'Màu của đóa sen Tây Hồ ngát hương, đại diện cho nét đẹp duyên dáng e ấp của người con gái Việt, tấm lòng từ bi và sự thanh khiết.',
  },
  {
    id: 'tim_hue_mong_mo',
    name: 'Tím Huế Mộng Mơ',
    vietnameseName: 'Tím Cố Đô',
    hex: '#6B21A8',
    pantoneName: 'Imperial Violet',
    element: 'Hỏa',
    meaning: 'Màu sắc đặc trưng của tà áo nữ sinh Đồng Khánh và xứ Huế trầm mặc, thể hiện lòng thủy chung son sắt và chiều sâu nội tâm kín đáo.',
  },
  {
    id: 'trang_bach_ngoc',
    name: 'Trắng Bạch Ngọc',
    vietnameseName: 'Bạch Tuyết Tơ Tằm',
    hex: '#F8FAFC',
    pantoneName: 'Pure Silk White',
    element: 'Kim',
    meaning: 'Màu của tơ tằm mộc chưa nhuộm, tượng trưng cho tâm hồn trong sáng của tuổi học trò, sự liêm chính, giản dị và đoan trang.',
  },
  {
    id: 'den_huyen_lanh',
    name: 'Đen Huyền Lãnh Mỹ A',
    vietnameseName: 'Đen Lãnh Truyền Kỳ',
    hex: '#1E293B',
    pantoneName: 'Onyx Silk',
    element: 'Thủy',
    meaning: 'Lụa đen nhuộm trái mặc nưa trứ danh Tân Châu, tượng trưng cho mực tàu nho sinh, phong thái đĩnh đạc uy nghiêm và sự chững chạc.',
  },
  {
    id: 'cam_dat_sa_thach',
    name: 'Cam Đất Sa Thạch',
    vietnameseName: 'Thổ Hoàng Sa Thạch',
    hex: '#C2410C',
    pantoneName: 'Terracotta Earth',
    element: 'Thổ',
    meaning: 'Màu ngói đất nung đình làng và gốm Bát Tràng, gắn liền với cội nguồn đất mẹ phù sa nuôi dưỡng ngàn đời dân tộc Việt.',
  },
  {
    id: 'luc_tre_non',
    name: 'Xanh Lục Lũy Tre',
    vietnameseName: 'Lục Trúc Thanh Phong',
    hex: '#15803D',
    pantoneName: 'Bamboo Green',
    element: 'Mộc',
    meaning: 'Sắc xanh mướt của ngọn tre đầu làng, tượng trưng cho sức sống dẻo dai kiên cường, tình nghĩa xóm làng bền chặt qua bao biến cố.',
  },
];

export const FABRIC_LIST: FabricMaterial[] = [
  {
    id: 'gam_to_tam',
    name: 'Gấm Tơ Tằm Dệt Hoa',
    origin: 'Làng lụa Vạn Phúc (Hà Đông)',
    description: 'Chất vải gấm dày dặn, dệt chìm hoa văn cổ điển, có độ bóng tự nhiên sang trọng.',
    suitability: 'Hoàn hảo cho Áo Tấc, Nhật Bình và trang phục nghi lễ mùa thu - đông.',
  },
  {
    id: 'lua_to_tam_van_phuc',
    name: 'Lụa Tơ Tằm Tự Nhiên',
    origin: 'Hà Đông & Bảo Lộc',
    description: 'Mềm mại như làn sương, thoáng khí, tôn nét thướt tha uyển chuyển khi chuyển động.',
    suitability: 'Tuyệt vời cho Áo Ngũ Thân tay chẽn, Áo Tứ Thân và chụp ảnh kỷ yếu.',
  },
  {
    id: 'dui_to_sen',
    name: 'Đũi Tơ Sen Dân Dã',
    origin: 'Nam Cao (Thái Bình)',
    description: 'Dệt thủ công từ sợi tơ mộc, mặt vải có gân tự nhiên, thấm hút mồ hôi cực tốt.',
    suitability: 'Rất thích hợp cho Áo Ngũ Thân thường nhật, Áo Bà Ba vào mùa hè nắng ấm.',
  },
  {
    id: 'sa_han_cung_dinh',
    name: 'Sa Hàn Xuyên Thấu',
    origin: 'Cố đô Huế phục dựng',
    description: 'Vải sa mỏng nhẹ, thường may 2 lớp hoặc làm lớp áo ngoài tạo hiệu ứng tầng lớp huyền ảo.',
    suitability: 'Đặc trưng của áo Ngũ Thân tay thụng phong cách quý phái triều Nguyễn.',
  },
];

export const PATTERN_LIST: PatternMotif[] = [
  {
    id: 'hoa_sen_cung_dinh',
    name: 'Hoa Sen Cung Đình',
    description: 'Họa tiết đài sen, búp sen và cánh sen uốn lượn mềm mại theo phong cách thời Lý - Nguyễn.',
    symbolism: 'Quốc hoa Việt Nam: Thanh cao "gần bùn mà chẳng hôi tanh mùi bùn", biểu trưng của lòng từ bi, đạo hiếu và sự thuần khiết.',
  },
  {
    id: 'hoa_cuc_van_tho',
    name: 'Hoa Cúc Vạn Thọ',
    description: 'Bông cúc dệt tròn đan xen cành lá cách điệu tinh xảo trên nền gấm tơ tằm cổ điển.',
    symbolism: 'Tượng trưng cho sự trường thọ, sức khỏe dồi dào, phúc lộc vững bền và lòng hiếu thảo của con cháu dâng lên tổ tiên.',
  },
  {
    id: 'hoa_mai_vang',
    name: 'Hoa Mai Vàng Hoàng Triều',
    description: 'Hoa mai năm cánh bung nở điểm xuyết lộc non mùa xuân cung đình Cố đô Huế.',
    symbolism: 'Biểu trưng của ngũ phúc (Vui vẻ, Hạnh phúc, Trường thọ, Thuận lợi, Hòa bình), khởi đầu năm mới may mắn ngập tràn.',
  },
  {
    id: 'hoa_dao_xu_bac',
    name: 'Hoa Đào Bích Xứ Bắc',
    description: 'Cành đào phai đơm nụ hồng thắm đặc trưng của tiết trời mùa xuân đất Kinh kỳ Thăng Long.',
    symbolism: 'Xua đuổi điềm dữ, gieo mầm sinh khí mới, gắn kết tình duyên keo sơn và niềm hy vọng về một tương lai tươi sáng.',
  },
  {
    id: 'van_may_cung_dinh',
    name: 'Vân Mây Ngũ Sắc',
    description: 'Cụm mây ngũ sắc cuộn tròn phiêu dật kết hợp dải mây uốn lượn phong cách cung đình triều Nguyễn.',
    symbolism: 'Đại diện cho mây lành thiên giới che chở, sự hanh thông trong học tập, thi cử và công danh rạng rỡ.',
  },
  {
    id: 'van_song_thuy_ba',
    name: 'Vân Sóng Thủy Ba',
    description: 'Những con sóng nước dâng trào tầng tầng lớp lớp kết hợp mỏm đá san hô uy nghi nơi chân tà áo.',
    symbolism: 'Biểu trưng của sự trường tồn vĩnh cửu, phúc như đông hải, non sông vững bền và mưa thuận gió hòa.',
  },
  {
    id: 'van_hoi_van_ky_ha',
    name: 'Vân Hồi Văn Kỷ Hà',
    description: 'Hoa văn chữ Vạn liên hoàn và đường kỷ hà hồi văn gãy góc dệt viền cổ và lai áo trang trọng.',
    symbolism: 'Vạn điều may mắn, phúc đức truyền đời miên viễn không bao giờ đứt đoạn.',
  },
  {
    id: 'cay_truc_quan_tu',
    name: 'Trúc Thủy Mặc Quân Tử',
    description: 'Cành trúc thanh mảnh đốt ngọc với từng chùm lá nhọn mềm mại uốn lượn theo phong cách tranh thủy mặc cổ phong.',
    symbolism: 'Biểu tượng khí tiết thanh bạch, ngay thẳng, tao nhã và kiên cường không chịu khuất phục của bậc sĩ phu quân tử.',
  },
  {
    id: 'luy_tre_lang_viet',
    name: 'Lũy Tre Xanh Làng Việt',
    description: 'Tán tre cong mềm rủ bóng êm đềm, lá tre xếp tầng uốn lượn như dải lụa xanh che mát xóm làng.',
    symbolism: 'Biểu trưng của tình làng nghĩa xóm bền chặt, sức sống quật khởi, đoàn kết và nét thanh bình của thôn quê Việt.',
  },
  {
    id: 'mai_nha_tranh',
    name: 'Mái Nhà Tranh Dân Gian',
    description: 'Họa tiết mái rạ đan cài mộc mạc, khóm chuối bờ ao đầm sen gợi nhớ không gian làng quê Việt Nam thanh bình.',
    symbolism: 'Hồn cốt cội nguồn dân tộc, sự mộc mạc, gần gũi với thiên nhiên, gìn giữ nếp nhà thảo thơm của cha ông.',
  },
  {
    id: 'dinh_lang_mai_cong',
    name: 'Đình Làng Mái Cong Chạm Rồng',
    description: 'Họa tiết đầu đao mái đình uốn cong vút, chạm khắc rồng chầu mặt nguyệt và ngói vảy cá cổ kính thiêng liêng.',
    symbolism: 'Không gian văn hóa tín ngưỡng cộng đồng thiêng liêng, lòng tự hào bờ cõi và sự chở che của thành hoàng làng.',
  },
  {
    id: 'trong_dong_dong_son',
    name: 'Trống Đồng Đông Sơn',
    description: 'Họa tiết chim Lạc sải cánh bay, vầng thái dương 14 tia hào quang và cảnh người giã gạo thời Hùng Vương.',
    symbolism: 'Cội nguồn 4000 năm văn hiến dựng nước và giữ nước, niềm tự hào dân tộc quật khởi của người Việt.',
  },
  {
    id: 'tho_cam_tay_bac',
    name: 'Thổ Cẩm Dệt Lanh Tây Bắc',
    description: 'Hoa văn quả trám, mặt trời và kỷ hà dệt lanh nhuộm chàm vẽ sáp ong đặc trưng của đồng bào H\'Mông.',
    symbolism: 'Sự kiên nhẫn, bàn tay tài hoa của người phụ nữ vùng cao, xua đuổi tà khí và gắn kết với núi rừng Tây Bắc linh thiêng.',
  },
  {
    id: 'tron_thanh_lich',
    name: 'Lụa Mộc Thanh Lịch',
    description: 'Không hoa văn, phô diễn trọn vẹn vẻ óng ả tự nhiên của thớ lụa dệt và kỹ thuật may thủ công.',
    symbolism: 'Vẻ đẹp tối giản, khiêm cung, giản dị và đoan trang của người học trò Việt Nam.',
  },
];

export const BACKDROPS_DATA = [
  {
    id: 'dai_noi_hue',
    name: 'Đại Nội Huế & Cố Đô',
    desc: 'Lầu Ngũ Phụng, tường thành đỏ son, mái ngói lưu ly vàng lộng lẫy',
    period: 'Triều Nguyễn (1802 - 1945)',
  },
  {
    id: 'dinh_lang_mai_cong',
    name: 'Đình Làng Mái Cong Đầu Đao',
    desc: 'Mái ngói vẩy cá uốn cong vút, cột gỗ lim cổ kính, sân gạch Bát Tràng',
    period: 'Thời Lê - Nguyễn',
  },
  {
    id: 'mai_nha_tranh_luy_tre',
    name: 'Mái Nhà Tranh & Lũy Tre',
    desc: 'Hồn quê Việt Nam mộc mạc, khóm tre râm mát, đầm sen thoang thoảng',
    period: 'Dân gian truyền thống',
  },
  {
    id: 'van_mieu_thang_long',
    name: 'Văn Miếu Thăng Long',
    desc: 'Khuê Văn Các cổ kính, giếng Thiên Quang, nôi khoa bảng ngàn năm',
    period: 'Thời Lý - Lê',
  },
  {
    id: 'gam_do_dong_son',
    name: 'Sơn Mài Gấm Đỏ Đông Sơn',
    desc: 'Họa tiết Trống đồng Đông Sơn khổng lồ vàng rực trên nền gấm chu sa',
    period: 'Văn hóa Đông Sơn',
  },
  {
    id: 'tay_bac_ruong_bac_thang',
    name: 'Bản Mèo & Ruộng Bậc Thang Tây Bắc',
    desc: 'Ruộng bậc thang vàng óng mùa lúa chín, mây vờn đỉnh núi, nhà gỗ pơ-mu thổ cẩm',
    period: 'Vùng cao Tây Bắc',
  },
];

export const EVENTS_DATA = [
  {
    id: 'ky_yeu_tot_nghiep',
    name: 'Kỷ Yếu Tốt Nghiệp & Thanh Xuân',
    description: 'Khoảnh khắc dấu ấn tốt nghiệp của học sinh, sinh viên cùng tà áo truyền thống đầy tự hào.',
    recommendedCostumes: ['ao_ngu_than_tay_chen', 'ao_tac_ngu_than'],
    icon: 'GraduationCap',
  },
  {
    id: 'tet_nguyen_dan',
    name: 'Đón Tết Cổ Truyền & Du Xuân',
    description: 'Trẩy hội mùa xuân, đi lễ chùa đầu năm, chúc tết ông bà cha mẹ với sắc đỏ son may mắn.',
    recommendedCostumes: ['ao_tac_ngu_than', 'ao_nhat_binh', 'ao_ngu_than_tay_chen', 'ao_tu_than'],
    icon: 'Sparkles',
  },
  {
    id: 'cuoi_hoi_truyen_thong',
    name: 'Hôn Lễ & Dạm Ngõ Trang Trọng',
    description: 'Nghi thức vu quy, thành hôn truyền thống trang nghiêm theo đạo hiếu nghìn đời.',
    recommendedCostumes: ['ao_nhat_binh', 'ao_tac_ngu_than'],
    icon: 'HeartHandshake',
  },
  {
    id: 'chup_anh_di_san',
    name: 'Dạo Phố & Khám Phá Di Sản',
    description: 'Chụp ảnh tại Hoàng thành Thăng Long, Cố đô Huế, Phố cổ Hội An, Chợ Bến Thành.',
    recommendedCostumes: ['ao_ngu_than_tay_chen', 'ao_nhat_binh', 'ao_giao_linh', 'ao_ba_ba'],
    icon: 'Landmark',
  },
  {
    id: 'bieu_dien_nghe_thuat',
    name: 'Văn Nghệ & Sân Khấu Học Đường',
    description: 'Các tiết mục ca múa nhạc dân tộc, hội diễn thanh niên, tái hiện tích truyện lịch sử.',
    recommendedCostumes: ['ao_tu_than', 'ao_ba_ba', 'trang_phuc_hmong', 'trang_phuc_cham'],
    icon: 'Music',
  },
  {
    id: 'gio_to_dinh_lang',
    name: 'Giỗ Tổ Hùng Vương & Nghi Lễ Đình Miếu',
    description: 'Tưởng nhớ công đức tổ tiên, cội nguồn dòng máu Lạc Hồng thiêng liêng.',
    recommendedCostumes: ['ao_tac_ngu_than', 'ao_giao_linh', 'ao_ngu_than_tay_chen'],
    icon: 'Flame',
  },
];

export const REGIONS_DATA = [
  {
    id: 'bac_bo',
    name: 'Bắc Bộ (Kinh Bắc & Thăng Long)',
    tag: 'Đất kinh kỳ nghìn năm',
    description: 'Nôi văn hóa xứ Đoài, Kinh Bắc với áo Tứ Thân nón ba tầm và Giao Lĩnh cổ kính.',
  },
  {
    id: 'trung_bo',
    name: 'Trung Bộ (Cố Đô Huế & Quảng Nam)',
    tag: 'Cung đình & Di sản',
    description: 'Nơi định chế áo ngũ thân, áo tấc và sự lộng lẫy uy nghiêm của áo Nhật Bình hoàng gia.',
  },
  {
    id: 'nam_bo',
    name: 'Nam Bộ (Gia Định & Miền Tây)',
    tag: 'Khoáng đạt & Nghĩa tình',
    description: 'Gắn liền với Áo Bà Ba, khăn rằn, nón lá chóp nhọn trên những dòng kinh sông nước.',
  },
  {
    id: 'tay_bac',
    name: 'Tây Bắc & Đông Bắc (Vùng Non Cao)',
    tag: 'Hùng vĩ & Thổ cẩm rực rỡ',
    description: 'Thế giới hoa văn vẽ sáp ong của người H\'Mông, vải chàm dệt tay ấm áp núi rừng.',
  },
  {
    id: 'nam_trung_bo',
    name: 'Duyên Hải & Tây Nguyên',
    tag: 'Văn hóa Chăm & Sử thi',
    description: 'Huyền thoại dệt thổ cẩm Mỹ Nghiệp, tháp Chàm rêu phong và vũ điệu Apsara.',
  },
];

export const ACCESSORIES_DATA = {
  nonLa: [
    {
      id: 'non_la_bai_tho',
      name: 'Nón Lá Bài Thơ (Xứ Huế)',
      description: 'Làm từ lá nón kè mỏng tang, soi lên ánh mặt trời sẽ thấy ẩn hiện câu thơ và hình cầu Tràng Tiền.',
      meaning: 'Biểu tượng của nét duyên dịu dàng, e ấp của thiếu nữ Việt Nam.',
    },
    {
      id: 'non_la_chuong',
      name: 'Nón Chuông Thanh Oai',
      description: 'Làng nghề Chuông trứ danh, vành nón chuốt đều từ tre già, từng đường kim mũi cước tăm tắp.',
      meaning: 'Độ bền vượt thời gian, bạn đồng hành che nắng che mưa của người dân Việt.',
    },
    {
      id: 'non_ba_tam',
      name: 'Nón Ba Tầm (Nón Quai Thao)',
      description: 'Đường kính lớn, phẳng như chiếc khiên lộng gió, có quai thao buông hai bên má liền chị.',
      meaning: 'Biểu trưng của miền Quan họ Kinh Bắc, thanh thoát và tình tứ trong ngày hội Lim.',
    },
    {
      id: 'non_chop_nho',
      name: 'Nón Chóp Nhọn Cổ Phong',
      description: 'Nón lá truyền thống dáng chóp cao, có dải lụa đỏ son buộc cằm duyên dáng.',
      meaning: 'Thanh lịch cho cả nam lẫn nữ khi dạo phố di sản.',
    },
    {
      id: 'none',
      name: 'Không dùng nón',
      description: 'Để đầu trần hoặc chỉ dùng khăn đóng / vấn tóc cài trâm.',
      meaning: 'Tập trung vào trang phục và kiểu tóc truyền thống.',
    },
  ],
  headwear: [
    {
      id: 'khan_dong_nam',
      name: 'Khăn Đóng / Khăn Xếp (Nam)',
      description: 'Khăn vấn sẵn hình chữ Nhất ngang trán, phẳng phiu lịch lãm.',
      meaning: 'Thể hiện phong thái đĩnh đạc, nho nhã của nam tử Hán.',
    },
    {
      id: 'khan_dong_nu',
      name: 'Khăn Xếp Gấm Nữ',
      description: 'Khăn vấn vải gấm thêu hoặc nhung the đen ôm trọn mái tóc.',
      meaning: 'Gọn gàng, quý phái, làm nổi bật khuôn mặt trái xoan phúc hậu.',
    },
    {
      id: 'khan_vanh_day',
      name: 'Khăn Vành Dây Hoàng Tộc',
      description: 'Khăn dài cả chục mét vấn nhiều vòng quanh đầu bằng vải nhiễu vàng óng ả.',
      meaning: 'Quy thức hoàng cung dành riêng cho Áo Nhật Bình đại lễ.',
    },
    {
      id: 'khan_ran',
      name: 'Khăn Rằn Nam Bộ',
      description: 'Khăn ca-rô trắng đen dệt mộc quấn cổ hoặc đội đầu.',
      meaning: 'Đậm đà phong vị phương Nam bình dị nghĩa tình.',
    },
    {
      id: 'none',
      name: 'Tóc buông tự nhiên / Búi trâm',
      description: 'Không đội khăn trên đầu.',
      meaning: 'Nhẹ nhàng và hiện đại.',
    },
  ],
  handAccessory: [
    {
      id: 'quat_tram_huong',
      name: 'Quạt Trầm Hương Dát Vàng',
      description: 'Quạt xếp gỗ trầm tỏa hương thanh nhã, nan quạt chạm trổ tinh vi.',
      meaning: 'Phong thái tài tử, tao nhã của bậc trí thức.',
    },
    {
      id: 'quat_lua_theu',
      name: 'Quạt Lụa Tròn Thêu Sen',
      description: 'Quạt lụa tròn căng mọng thêu đôi chim hạc hoặc hoa sen thuần khiết.',
      meaning: 'Duyên dáng, e ấp trước ống kính kỷ yếu.',
    },
    {
      id: 'tui_gam_cat_tuong',
      name: 'Túi Gấm Thắt Gút Cát Tường',
      description: 'Túi thêu hoa mai cúc đính dải tua rua đỏ rực rỡ.',
      meaning: 'Cầu mong tài lộc, bình an và học hành hanh thông.',
    },
    {
      id: 'chuoi_ngoc_tay',
      name: 'Chuỗi Ngọc Cầm Tay',
      description: 'Chuỗi hạt bồ đề hoặc ngọc bích cầm trên tay khi hành lễ.',
      meaning: 'Tâm tịnh, hướng thiện và cầu an.',
    },
    {
      id: 'none',
      name: 'Không cầm phụ kiện',
      description: 'Hai tay tự nhiên hoặc giữ nón lá.',
      meaning: 'Gọn gàng tối giản.',
    },
  ],
  jewelry: [
    {
      id: 'kieng_bac_cham_sen',
      name: 'Kiềng Bạc Chạm Sen Truyền Thống',
      description: 'Vòng kiềng bạc nguyên chất tròn trịa ôm sát cổ, chạm hoa sen tinh mỹ.',
      meaning: 'Bảo vật hồi môn thiêng liêng của thiếu nữ Việt, xua gió giữ sức khỏe.',
    },
    {
      id: 'the_bai_hoang_gia',
      name: 'Thẻ Bài / Bội Ngọc Cung Đình',
      description: 'Thẻ ngọc hoặc ngà đeo trước ngực có khắc chữ cát tường Phúc - Lộc - Thọ.',
      meaning: 'Phẩm hàm cao quý và phúc trạch dồi dào.',
    },
    {
      id: 'vong_ngoc_cam_thach',
      name: 'Vòng Tay Cẩm Thạch',
      description: 'Chiếc vòng ngọc xanh trong mát dịu trên cổ tay.',
      meaning: 'Quý phái, ôn nhu như ngọc.',
    },
    {
      id: 'none',
      name: 'Không đeo trang sức',
      description: 'Giữ vẻ đẹp mộc mạc.',
      meaning: 'Tự nhiên thanh thoát.',
    },
  ],
  footwear: [
    {
      id: 'hai_theu_cung_dinh',
      name: 'Hài Thêu Phượng Hoàng / Hoa Mai',
      description: 'Hài vải mũi cong thêu chỉ vàng óng ả theo mẫu cổ vật cung đình.',
      meaning: 'Bước đi êm ả như mây lướt sóng.',
    },
    {
      id: 'guoc_moc_khac_hoa',
      name: 'Guốc Mộc Gót Cong Truyền Thống',
      description: 'Đẽo từ gỗ xoan hoặc mít, quai vải nhung đỏ son có tiếng gõ giòn tan vui tai.',
      meaning: 'Ký ức thanh bình của những con ngõ Hà Nội và bờ đê làng quê.',
    },
    {
      id: 'giay_tay_thanh_lich',
      name: 'Giày Tây / Giày Da Đen Tối Giản',
      description: 'Giày da đen trơn hiện đại lịch thiệp khi phối cùng Áo Ngũ Thân nam kỷ yếu.',
      meaning: 'Giao thoa giữa cổ điển và văn minh học đường hiện đại.',
    },
    {
      id: 'none',
      name: 'Tự do',
      description: 'Phối theo sở thích cá nhân.',
      meaning: 'Năng động.',
    },
  ],
};

/**
 * Kiểm tra tính chuẩn mực văn hóa (Cultural Heritage Guard)
 * và sự hài hòa màu sắc (Ngũ Hành)
 */
export function validateCulturalAccuracy(config: OutfitConfiguration): CulturalCheckResult {
  const costume = TRADITIONAL_COSTUMES.find((c) => c.id === config.costumeId);
  const notices: CulturalCheckResult['notices'] = [];
  let score = 100;

  if (!costume) {
    return {
      isAuthentic: true,
      score: 100,
      notices: [],
      elementalHarmony: { status: 'Hòa Hợp', explanation: 'Phối màu cơ bản.' },
    };
  }

  // 1. Kiểm tra phụ kiện xung đột văn hóa / thời kỳ
  costume.incompatibleAccessories.forEach((incomp) => {
    if (
      (incomp.itemType === config.nonLa) ||
      (incomp.itemType === config.headwear) ||
      (incomp.itemType === config.handAccessory) ||
      (incomp.itemType === config.jewelry)
    ) {
      score -= 25;
      notices.push({
        type: 'warning',
        title: 'Cảnh Báo Lệch Quy Thức Văn Hóa',
        message: incomp.reason,
      });
    }
  });

  // 2. Kiểm tra Nhật Bình mà không dùng khăn vành dây hoặc tóc vấn
  if (config.costumeId === 'ao_nhat_binh') {
    if (config.gender === 'nam') {
      score -= 20;
      notices.push({
        type: 'warning',
        title: 'Giới Tính & Y Phục Cung Đình',
        message: 'Áo Nhật Bình trong lịch sử là thường lễ phục của bậc hậu phi, công chúa và mệnh phụ triều đình. Nếu nam giới mặc lễ phục triều Nguyễn, Áo Tấc (tay thụng) hoặc Áo Giao Lĩnh là lựa chọn chuẩn xác nhất!',
      });
    } else {
      if (config.headwear === 'khan_vanh_day') {
        notices.push({
          type: 'success',
          title: 'Quy Cách Cung Đình Chuẩn Mực',
          message: 'Khăn Vành Dây kết hợp cùng Áo Nhật Bình tạo nên diện mạo đại lễ hoàng triều tuyệt đối chuẩn mực!',
        });
      }
    }
  }

  // 3. Kiểm tra Nón Ba Tầm với Áo Tứ Thân
  if (config.costumeId === 'ao_tu_than') {
    if (config.nonLa === 'non_ba_tam') {
      notices.push({
        type: 'success',
        title: 'Biểu Tượng Liền Chị Kinh Bắc',
        message: 'Áo Tứ Thân đi cùng Nón Ba Tầm (quai thao) là bộ đôi di sản Kinh Bắc kinh điển, gợi nhớ làn điệu Dân ca Quan họ trao duyên mặn mà.',
      });
    } else if (config.nonLa === 'none') {
      notices.push({
        type: 'tip',
        title: 'Gợi Ý Phụ Kiện',
        message: 'Hãy thử thêm chiếc Nón Ba Tầm hoặc quấn khăn mỏ quạ để làm nổi bật nét đẹp truyền thống đồng bằng Bắc Bộ.',
      });
    }
  }

  // 4. Kiểm tra Áo Tấc
  if (config.costumeId === 'ao_tac_ngu_than') {
    if (config.gender === 'nam' && config.headwear !== 'khan_dong_nam') {
      score -= 10;
      notices.push({
        type: 'tip',
        title: 'Quy Thức Áo Tấc Nam Giới',
        message: 'Theo nghi lễ xưa, nam giới khi mặc Áo Tấc luôn đi kèm Khăn Đóng gọn gàng để tỏ lòng tôn kính với tiền nhân.',
      });
    } else if (config.gender === 'nam' && config.headwear === 'khan_dong_nam') {
      notices.push({
        type: 'success',
        title: 'Tôn Nghiêm Đại Lễ',
        message: 'Áo Tấc tay thụng phối Khăn Đóng nam chuẩn xác phong thái nho sinh, tri thức thời Nguyễn.',
      });
    }
  }

  // 5. Kiểm tra Nón Lá Việt Nam
  if (config.nonLa === 'non_la_bai_tho' || config.nonLa === 'non_la_chuong' || config.nonLa === 'non_chop_nho') {
    notices.push({
      type: 'success',
      title: 'Nón Lá Hồn Quê',
      message: 'Chiếc nón lá nghiêng che che chở nét duyên dáng, thanh thoát và là biểu tượng văn hóa bất hủ của người Việt trong mắt bạn bè quốc tế.',
    });
  }

  // 6. Tính toán tương sinh Ngũ Hành màu sắc
  const primaryScheme = COLOR_PALETTES.find((c) => c.hex.toLowerCase() === config.primaryColor.toLowerCase());
  const pantsScheme = COLOR_PALETTES.find((c) => c.hex.toLowerCase() === config.pantsColor.toLowerCase());

  let elementalStatus: 'Tương Sinh' | 'Hòa Hợp' | 'Tương Khắc' = 'Hòa Hợp';
  let elementalExplanation = 'Màu sắc hài hòa, tôn nét trang nhã.';

  if (primaryScheme && pantsScheme) {
    const e1 = primaryScheme.element;
    const e2 = pantsScheme.element;

    // Ngũ hành tương sinh: Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc
    const isTuongSinh =
      (e1 === 'Mộc' && e2 === 'Hỏa') ||
      (e1 === 'Hỏa' && e2 === 'Thổ') ||
      (e1 === 'Thổ' && e2 === 'Kim') ||
      (e1 === 'Kim' && e2 === 'Thủy') ||
      (e1 === 'Thủy' && e2 === 'Mộc') ||
      (e2 === 'Mộc' && e1 === 'Hỏa') ||
      (e2 === 'Hỏa' && e1 === 'Thổ') ||
      (e2 === 'Thổ' && e1 === 'Kim') ||
      (e2 === 'Kim' && e1 === 'Thủy') ||
      (e2 === 'Thủy' && e1 === 'Mộc');

    if (e1 === e2) {
      elementalStatus = 'Hòa Hợp';
      elementalExplanation = `Cùng hành ${e1}: Thuần khiết đồng điệu, tạo nên tổng thể trang nhã, nhất quán theo lối cổ phong.`;
    } else if (isTuongSinh) {
      elementalStatus = 'Tương Sinh';
      elementalExplanation = `Hành ${e1} phối hợp cùng hành ${e2} đạt quan hệ Tương Sinh cát lành, mang lại sinh khí, may mắn và vẻ đẹp tươi sáng cho người mặc.`;
    } else if (
      (e1 === 'Thủy' && e2 === 'Hỏa') ||
      (e1 === 'Hỏa' && e2 === 'Thủy') ||
      (e1 === 'Kim' && e2 === 'Mộc') ||
      (e1 === 'Mộc' && e2 === 'Kim')
    ) {
      elementalStatus = 'Tương Khắc';
      elementalExplanation = `Hai tông màu ${primaryScheme.vietnameseName} (${e1}) và ${pantsScheme.vietnameseName} (${e2}) tạo độ tương phản mạnh mẽ. Nếu muốn giảm độ gắt, có thể thêm dải viền trung tính hoặc đai lưng lụa mộc.`;
    }
  }

  return {
    isAuthentic: score >= 75,
    score: Math.max(20, Math.min(100, score)),
    notices,
    elementalHarmony: {
      status: elementalStatus,
      explanation: elementalExplanation,
    },
  };
}

export const PRESET_OUTFITS: {
  title: string;
  tagline: string;
  config: OutfitConfiguration;
}[] = [
  {
    title: 'Kỷ Yếu Áo Tấc Đỏ Son Cố Đô',
    tagline: 'Bộ trang phục kinh điển cho sinh viên trong ngày tốt nghiệp đại học',
    config: {
      costumeId: 'ao_tac_ngu_than',
      gender: 'nu',
      primaryColor: '#991B1B',
      secondaryColor: '#F8FAFC',
      pantsColor: '#F8FAFC',
      fabricId: 'gam_to_tam',
      patternId: 'van_song_thuy_ba',
      nonLa: 'non_la_bai_tho',
      headwear: 'none',
      handAccessory: 'quat_lua_theu',
      jewelry: 'kieng_bac_cham_sen',
      footwear: 'hai_theu_cung_dinh',
      selectedEvent: 'ky_yeu_tot_nghiep',
      selectedRegion: 'trung_bo',
      selectedStyle: 'thanh_nha_hoc_duong',
      selectedBackdrop: 'dai_noi_hue',
      avatarModel: 'student_f',
    },
  },
  {
    title: 'Áo Ngũ Thân Nam Chẽn Sĩ Tử',
    tagline: 'Thanh lịch nho nhã, chuẩn mực của nam sinh Việt truyền thống',
    config: {
      costumeId: 'ao_ngu_than_tay_chen',
      gender: 'nam',
      primaryColor: '#1E3A8A',
      secondaryColor: '#F8FAFC',
      pantsColor: '#F8FAFC',
      fabricId: 'lua_to_tam_van_phuc',
      patternId: 'cay_truc_quan_tu',
      nonLa: 'non_chop_nho',
      headwear: 'khan_dong_nam',
      handAccessory: 'quat_tram_huong',
      jewelry: 'none',
      footwear: 'giay_tay_thanh_lich',
      selectedEvent: 'ky_yeu_tot_nghiep',
      selectedRegion: 'trung_bo',
      selectedStyle: 'thanh_nha_hoc_duong',
      selectedBackdrop: 'van_mieu_thang_long',
      avatarModel: 'student_m',
    },
  },
  {
    title: 'Hoàng Kim Nhật Bình Đại Lễ',
    tagline: 'Quyền quý, lộng lẫy ngày cưới hỏi và lễ hội văn hóa di sản',
    config: {
      costumeId: 'ao_nhat_binh',
      gender: 'nu',
      primaryColor: '#DC2626',
      secondaryColor: '#D97706',
      pantsColor: '#F8FAFC',
      fabricId: 'gam_to_tam',
      patternId: 'hoa_sen_cung_dinh',
      nonLa: 'none',
      headwear: 'khan_vanh_day',
      handAccessory: 'quat_lua_theu',
      jewelry: 'the_bai_hoang_gia',
      footwear: 'hai_theu_cung_dinh',
      selectedEvent: 'cuoi_hoi_truyen_thong',
      selectedRegion: 'trung_bo',
      selectedStyle: 'hoang_gia_quy_phai',
      selectedBackdrop: 'dai_noi_hue',
      avatarModel: 'student_f',
    },
  },
  {
    title: 'Duyên Dáng Tứ Thân Trẩy Hội Lim',
    tagline: 'Hồn dân gian Bắc Bộ với yếm đào, nón quai thao tha thướt',
    config: {
      costumeId: 'ao_tu_than',
      gender: 'nu',
      primaryColor: '#831843',
      secondaryColor: '#BE185D',
      pantsColor: '#1E293B',
      fabricId: 'lua_to_tam_van_phuc',
      patternId: 'luy_tre_lang_viet',
      nonLa: 'non_ba_tam',
      headwear: 'none',
      handAccessory: 'quat_lua_theu',
      jewelry: 'kieng_bac_cham_sen',
      footwear: 'guoc_moc_khac_hoa',
      selectedEvent: 'tet_nguyen_dan',
      selectedRegion: 'bac_bo',
      selectedStyle: 'dan_gian_truyen_thong',
      selectedBackdrop: 'dinh_lang_mai_cong',
      avatarModel: 'student_f',
    },
  },
];
