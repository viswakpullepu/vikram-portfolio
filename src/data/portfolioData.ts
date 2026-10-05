export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  format: string;
}

export interface FieldNote {
  timeAndWeather: string;
  songInHeadphones: string;
  whatWentWrong: string;
  personalMemory: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Street Life' | 'Portraits' | 'Spaces' | 'Quiet Light';
  imageUrl: string;
  rawUrl: string;
  filmStock: string;
  location: string;
  year: string;
  story: string;
  curatorInsight: string;
  fieldNote: FieldNote;
  exif: ExifData;
  colorPalette: string[];
}

export const PORTFOLIO_PHOTOS: PhotoItem[] = [
  {
    id: 'tokyo-crossing',
    title: 'Typhoon Night in Shinjuku',
    subtitle: 'Kabukicho · Rain reflections',
    category: 'Street Life',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&sat=-60&con=-20&q=70',
    filmStock: 'Cinestill 800T (Pushed 1 stop)',
    location: 'Shinjuku, Tokyo',
    year: 'October 2025',
    story: 'My sneakers were soaked through and my cheap umbrella had snapped in the wind twenty minutes earlier. I was shivering under the awning of a closed ramen stall, just waiting. Everyone was sprinting home, but she was walking slowly, totally calm, watching neon signs melt into the asphalt puddles. I held my breath and pressed the shutter.',
    curatorInsight: 'A lesson in patience. Most photographers pack away their gear when the rain starts; that is usually when the real magic begins.',
    fieldNote: {
      timeAndWeather: '11:42 PM · Heavy Typhoon Rain · 14°C',
      songInHeadphones: 'Burial — Archangel',
      whatWentWrong: 'Front lens element kept fogging up; had to wipe it gently with my dry shirt sleeve hem between every frame.',
      personalMemory: 'After taking this, the ramen shop owner opened the door, saw me drenched, and handed me a warm mug of roasted green tea without charging a single yen.'
    },
    exif: {
      camera: 'Leica M11-P',
      lens: 'Summilux-M 35mm f/1.4 ASPH',
      focalLength: '35mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/125s',
      iso: 'ISO 800',
      format: '35mm Full Frame'
    },
    colorPalette: ['#110915', '#ff2e55', '#33b3a6', '#081726', '#e8eef2']
  },
  {
    id: 'varanasi-elder',
    title: 'Morning Light with Punditji',
    subtitle: 'Manikarnika Ghat · Varanasi',
    category: 'Portraits',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&sat=-50&con=-30&q=70',
    filmStock: 'Kodak Tri-X 400 (Developed in Rodinal 1:50)',
    location: 'Varanasi, Uttar Pradesh',
    year: 'March 2025',
    story: 'Before I took this photo, we sat together on the stone steps of the ghat and drank cutting chai for nearly twenty minutes. He told me he hadn’t looked into a mirror in thirty years. When I asked if I could make his portrait, he smiled and said: "Beta, don’t look for wrinkles. Look for the river in my eyes." My hands were actually shaking on the focus ring.',
    curatorInsight: 'The importance of relationship before shutter release. A camera shouldn’t be a weapon you take from people; it’s an invitation to listen.',
    fieldNote: {
      timeAndWeather: '06:15 AM · River Mist & Chilly Morning · 18°C',
      songInHeadphones: 'Distant river bells and chanting (No headphones)',
      whatWentWrong: 'The heavy fog dropped my contrast so low I had to overdevelop the negative by 15% in Rodinal to rescue the highlights.',
      personalMemory: 'I printed a 5x7 copy in my darkroom and mailed it back to his temple address a month later. His grandson sent me a voice note thanking me.'
    },
    exif: {
      camera: 'Hasselblad 503CW',
      lens: 'Carl Zeiss Planar 80mm f/2.8 CFE',
      focalLength: '80mm (equiv. 44mm)',
      aperture: 'f/2.8',
      shutterSpeed: '1/250s',
      iso: 'ISO 400',
      format: '6x6 Medium Format Film'
    },
    colorPalette: ['#121110', '#3a342c', '#8c7d6b', '#c4b5a2', '#f0ede6']
  },
  {
    id: 'ballerina-breath',
    title: 'Five Seconds Before Overture',
    subtitle: 'Backstage silence · Paris',
    category: 'Portraits',
    imageUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1600&sat=-60&con=-20&q=70',
    filmStock: 'Kodak Portra 800',
    location: 'Palais Garnier, Paris',
    year: 'January 2025',
    story: 'Backstage is pure organized panic until the conductor raises his baton. In this single heartbeat, Mathilde stood behind the velvet curtain, bowed her head, and took one deep, audible breath. You could see chalk rosin dust floating through the single tungsten work lamp.',
    curatorInsight: 'Capturing tension rather than movement. Often the most powerful dance photograph is the second right before anyone takes a step.',
    fieldNote: {
      timeAndWeather: '07:58 PM · Warm Backstage Velvet Dust',
      songInHeadphones: 'Orchestra tuning in the pit (Violin A-440 note)',
      whatWentWrong: 'Stage manager warned me I had exactly 10 seconds before house lights went down or he’d kick me off the wings.',
      personalMemory: 'The sound of her silk pointe shoes tapping against the wooden stage boards right as the curtain rose.'
    },
    exif: {
      camera: 'Contax G2',
      lens: 'Carl Zeiss Biogon 28mm f/2.8',
      focalLength: '28mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 'ISO 800',
      format: '35mm Rangefinder'
    },
    colorPalette: ['#050507', '#251b1a', '#744a43', '#c98a7b', '#fcece9']
  },
  {
    id: 'subway-nocturne',
    title: 'Reading on the 2:00 AM Train',
    subtitle: 'U-Bahn U8 Line · Berlin',
    category: 'Street Life',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&sat=-50&con=-25&q=70',
    filmStock: 'Kodak T-Max 3200',
    location: 'Berlin, Germany',
    year: 'November 2024',
    story: 'The subway car was rattling like an old freight train through the tunnel between Kottbusser Tor and Hermannplatz. Drunk clubbers were laughing a few rows down, but she was completely submerged in a dog-eared paperback book. I rested my elbows on my knees to build a human tripod and held my breath to shoot at 1/15th of a second.',
    curatorInsight: 'Stillness inside velocity. The motion blur outside the carriage windows makes her quiet concentration feel like an island of calm.',
    fieldNote: {
      timeAndWeather: '02:18 AM · Underground Hum · Cold Wind on Platform',
      songInHeadphones: 'Nils Frahm — Says',
      whatWentWrong: 'First frame had camera shake from a sudden track bump; nailed it on the second exposure.',
      personalMemory: 'She looked up right after the shutter clicked, caught my eye, and gave me a quiet nod before turning the page.'
    },
    exif: {
      camera: 'Leica M6 Classic',
      lens: 'Voigtländer Nokton 35mm f/1.4',
      focalLength: '35mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/15s (Braced on knees)',
      iso: 'ISO 1600',
      format: '35mm Black & White Film'
    },
    colorPalette: ['#0d0c11', '#2f2738', '#5b4a68', '#a894b8', '#ede8f2']
  },
  {
    id: 'brutalist-spiral',
    title: 'The Staircase My Grandfather Built',
    subtitle: 'Barbican Estate · London',
    category: 'Spaces',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&sat=-70&con=-25&q=70',
    filmStock: 'Ilford Delta 100 Pro',
    location: 'Barbican, London',
    year: 'July 2024',
    story: 'My grandfather was a civil engineer who worked on concrete housing in the 1970s. He taught me to look at concrete not as dead gray rock, but as liquid stone poured by human hands. I came to this stairwell three mornings in a row until the low summer sun cut the shadow across the concrete at a clean 45-degree angle.',
    curatorInsight: 'Finding humanity in geometric brutalism. Light turns raw industrial texture into pure sculpture.',
    fieldNote: {
      timeAndWeather: '07:22 AM · Crisp London Morning Light',
      songInHeadphones: 'Brian Eno — An Ending (Ascent)',
      whatWentWrong: 'A security guard came over to ask what I was doing on morning two; we ended up talking about architecture for twenty minutes.',
      personalMemory: 'I called my grandfather on WhatsApp while standing at the base of this spiral to show him the light.'
    },
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Super-Vario 16-35mm',
      focalLength: '21mm',
      aperture: 'f/8.0',
      shutterSpeed: '1/60s',
      iso: 'ISO 100',
      format: 'High-Res Full Frame'
    },
    colorPalette: ['#0f0f12', '#2d2e33', '#686a73', '#abaeb8', '#ffffff']
  },
  {
    id: 'misty-solitude',
    title: 'Waiting for the Ferry',
    subtitle: 'Bosphorus Strait · Istanbul',
    category: 'Quiet Light',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&sat=-40&con=-30&q=70',
    filmStock: 'Fujifilm Pro 400H',
    location: 'Istanbul, Turkey',
    year: 'October 2024',
    story: 'Thick autumn sea fog had grounded most of the passenger boats. A local fisherman was standing alone on the pier, smoking a cigarette and staring into the gray void where Asia was supposed to be. In that fog, the world shrunk down to just the sound of lapping water and crying gulls.',
    curatorInsight: 'Minimalism through weather. Letting the atmosphere do 90% of the work while your composition provides the anchor.',
    fieldNote: {
      timeAndWeather: '08:10 AM · Dense Maritime Sea Fog · 12°C',
      songInHeadphones: 'Ferry foghorns echoing in the distance',
      whatWentWrong: 'Lens barrel was damp with salty humidity; had to keep the body tucked inside my wool coat.',
      personalMemory: 'He offered me half of his sesame simit bread while we both waited for the ferry horn.'
    },
    exif: {
      camera: 'Mamiya 7 II',
      lens: 'Mamiya 80mm f/4 L',
      focalLength: '80mm (equiv. 39mm)',
      aperture: 'f/5.6',
      shutterSpeed: '1/180s',
      iso: 'ISO 400',
      format: 'Medium Format 6x7'
    },
    colorPalette: ['#1a2a30', '#3b555e', '#7c989c', '#b7cbcd', '#f3f6f7']
  },
  {
    id: 'prism-caustics',
    title: 'Sunlight Through Broken Glass',
    subtitle: 'Kitchen windowsill experiment',
    category: 'Quiet Light',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&sat=-40&con=-30&q=70',
    filmStock: 'Kodak Ektachrome E100',
    location: 'My apartment, Mumbai',
    year: 'April 2025',
    story: 'On days when I don’t have budget to travel or hire models, I make photographs in my 200 sq ft rented room. I bought an old chandelier prism from a flea market for 50 rupees, taped a dried flower to a piece of cardboard, and waited for 2:30 PM when the sunlight bounced off my neighbor’s tin roof.',
    curatorInsight: 'Resourcefulness over expensive productions. Great light exists right on your kitchen table if you pay attention.',
    fieldNote: {
      timeAndWeather: '02:35 PM · Blazing Mumbai Summer Sun · 36°C',
      songInHeadphones: 'Chai bubbling on the stove',
      whatWentWrong: 'The light beam shifted so fast I had only a 4-minute window before the shadow from the balcony rail cut across the frame.',
      personalMemory: 'Reminds me why I fell in love with photography: curiosity, zero budget, just playing with physics.'
    },
    exif: {
      camera: 'Nikon Z8',
      lens: '105mm f/2.8 Micro',
      focalLength: '105mm Macro',
      aperture: 'f/4.0',
      shutterSpeed: '1/400s',
      iso: 'ISO 64',
      format: 'Full Frame Macro'
    },
    colorPalette: ['#121019', '#3a204d', '#724c94', '#d28eff', '#ffe3b3']
  },
  {
    id: 'desert-ridge',
    title: 'The Ridge Before Sunset',
    subtitle: 'Thar Desert silence',
    category: 'Spaces',
    imageUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&q=85',
    rawUrl: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&sat=-50&con=-20&q=70',
    filmStock: 'Kodak Portra 160',
    location: 'Thar Desert, Rajasthan',
    year: 'February 2024',
    story: 'I walked about four kilometers past the tourist camel camp until there were zero footprints in the sand. When the wind blows across these dunes, the crest becomes sharp as a surgical blade. For about eight minutes before dusk, the dune is divided into blazing copper on one side and deep twilight cobalt on the other.',
    curatorInsight: 'Earth as living geometry. The discipline of walking that extra mile when everyone else stops where the bus parked.',
    fieldNote: {
      timeAndWeather: '05:48 PM · Desert Wind Cooling Down · 22°C',
      songInHeadphones: 'Just the hiss of sand blowing across dunes',
      whatWentWrong: 'Fine desert sand got into the focus barrel; had to carefully blow it out with a hand rocket blower for two hours that night.',
      personalMemory: 'Sat on the cool sand after making this frame and watched the first three stars come out.'
    },
    exif: {
      camera: 'Leica Q3',
      lens: '28mm f/1.7 ASPH',
      focalLength: '28mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/1000s',
      iso: 'ISO 100',
      format: 'Full Frame Fixed Prime'
    },
    colorPalette: ['#1e140a', '#54361b', '#9b6b3b', '#d99d55', '#fed39b']
  }
];

export const VIKRAM_BIO = {
  name: 'Vikram Sengupta',
  age: 22,
  role: 'Photographer & Visual Assistant',
  location: 'Mumbai & Tokyo · Willing to relocate anywhere',
  bio: "Hi, I'm Vikram. I’m 22 years old. I fell in love with photography when my grandfather handed me his beat-up mechanical camera and told me: 'A camera isn't for showing what you see; it's for showing what you noticed that everyone else walked past.'",
  letterToRecruiter: `I’m looking for a creative or photography internship because I want to learn the reality of commercial sets, high-pressure editorial deadlines, and working alongside seasoned directors. I know I’m young, but I’m hungry to work. I’ll carry the heavy C-stands, organize gaffer tape, log rolls of film, sweep the studio floor, and arrive an hour before call time. I want to learn from the best, make mistakes, and grow into a disciplined visual craftsperson. If you have a desk, an open assistant spot, or need an extra set of hands on your next project, let’s talk.`,
  personalDetails: {
    coffeeOrder: 'Double espresso or roadside masala cutting chai',
    currentlyReading: 'On Photography by Susan Sontag & Magnum Contact Sheets',
    favoriteLight: 'That 12-minute window right after rain stops before sunset',
    whatIWantToLearn: 'Lighting large commercial sets, client communication, and darkroom printing on fiber paper'
  },
  gearList: [
    'Leica M11-P (My daily documentary companion)',
    'Hasselblad 503CW 6x6 (Gifted by grandfather, for portraits)',
    'Leica Summilux-M 35mm f/1.4',
    'Zeiss Planar 80mm f/2.8',
    'Jobo hand-developing tank & D-76 chemistry'
  ]
};
