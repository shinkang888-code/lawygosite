/** 플랫폼 탭 CORE FEATURES — Case Management / Deadline Tracking 탭 이미지 */
export const FEATURE_TAB_IMAGE = {
  width: 1200,
  height: 750,
  ratio: "16:10",
  maxMb: 10,
} as const;

export const FEATURE_TAB_IMAGE_HINT =
  `권장 ${FEATURE_TAB_IMAGE.width} × ${FEATURE_TAB_IMAGE.height}px (${FEATURE_TAB_IMAGE.ratio} 비율). ` +
  `두 탭 이미지 모두 같은 가로·세로 비율로 맞춰 주세요. JPG/PNG/WebP, ${FEATURE_TAB_IMAGE.maxMb}MB 이하.`;
