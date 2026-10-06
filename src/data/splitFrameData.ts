export interface SplitFrameSpecimen {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  whyITookThis: string;
  whatCaughtMyEye: string;
  story: string;
  location: string;
  date: string;
  cameraInfo: string;
  lensInfo: string;
  palette: string[];
}

// 10 Clean, Refined Split Frame Specimen Templates
// Ready for user to provide individual photo links and personal "Why I took this photo" stories
export const SPLIT_FRAME_SPECIMENS: SplitFrameSpecimen[] = Array.from({ length: 10 }, (_, index) => {
  const num = index + 1;
  const numPad = String(num).padStart(2, '0');
  return {
    id: `specimen-${numPad}`,
    order: num,
    title: `Specimen ${numPad}`,
    subtitle: `Curated Study · Plate ${numPad}`,
    imageUrl: '', // Awaiting user's photo link/path
    whyITookThis: '', // Awaiting user's "Why I took this photo" rationale
    whatCaughtMyEye: '', // Awaiting user's visual details
    story: '', // Awaiting user's atmosphere notes
    location: 'Location to be specified',
    date: '2024—2026 Archive',
    cameraInfo: 'Camera Body',
    lensInfo: 'Optics & Exposure Details',
    palette: ['#0f1015', '#242732', '#454a5f', '#d99859'],
  };
});
