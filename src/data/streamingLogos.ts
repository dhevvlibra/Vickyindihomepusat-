export interface StreamingAppLogo {
  name: string;
  logoUrl: string;
  alt: string;
  badgeBg?: string;
  badgeBorder?: string;
}

export const STREAMING_LOGOS: Record<string, StreamingAppLogo> = {
  'MaxStream': {
    name: 'MAXstream',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-eaf40b5a-8d5e-4adb-b292-3802bc693900.jpg',
    alt: 'MAXstream Logo',
    badgeBg: 'bg-black',
    badgeBorder: 'border-slate-700',
  },
  'maxstream': {
    name: 'MAXstream',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-eaf40b5a-8d5e-4adb-b292-3802bc693900.jpg',
    alt: 'MAXstream Logo',
    badgeBg: 'bg-black',
    badgeBorder: 'border-slate-700',
  },
  'Prime Video': {
    name: 'Prime Video',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-15ec1238-3687-4f8b-bb0d-8872e677c0ca.png',
    alt: 'Prime Video Logo',
    badgeBg: 'bg-[#00050d]',
    badgeBorder: 'border-[#00a8e1]/40',
  },
  'prime video': {
    name: 'Prime Video',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-15ec1238-3687-4f8b-bb0d-8872e677c0ca.png',
    alt: 'Prime Video Logo',
    badgeBg: 'bg-[#00050d]',
    badgeBorder: 'border-[#00a8e1]/40',
  },
  'Vision+': {
    name: 'Vision+',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-93e0565f-dfbd-488f-a960-63a83675103b.png',
    alt: 'Vision+ Logo',
    badgeBg: 'bg-[#0c0d1e]',
    badgeBorder: 'border-blue-500/40',
  },
  'vision+': {
    name: 'Vision+',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-93e0565f-dfbd-488f-a960-63a83675103b.png',
    alt: 'Vision+ Logo',
    badgeBg: 'bg-[#0c0d1e]',
    badgeBorder: 'border-blue-500/40',
  },
  'Viu': {
    name: 'Viu',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-1a477939-b420-4c12-a1f3-9f23fa668840.png',
    alt: 'Viu Logo',
    badgeBg: 'bg-[#121212]',
    badgeBorder: 'border-amber-400/40',
  },
  'viu': {
    name: 'Viu',
    logoUrl: 'https://cdn.phototourl.com/free/2026-09-09-1a477939-b420-4c12-a1f3-9f23fa668840.png',
    alt: 'Viu Logo',
    badgeBg: 'bg-[#121212]',
    badgeBorder: 'border-amber-400/40',
  },
  'Vidio': {
    name: 'Vidio',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-f5a2c0a3-11b0-45bb-a1b7-6f056844837b.png',
    alt: 'Vidio Logo',
    badgeBg: 'bg-[#1a1a1a]',
    badgeBorder: 'border-red-500/40',
  },
  'vidio': {
    name: 'Vidio',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-f5a2c0a3-11b0-45bb-a1b7-6f056844837b.png',
    alt: 'Vidio Logo',
    badgeBg: 'bg-[#1a1a1a]',
    badgeBorder: 'border-red-500/40',
  },
  'Netflix': {
    name: 'Netflix',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-7d6946e0-9fe6-4c7d-928e-c2ee3679d826.png',
    alt: 'Netflix Logo',
    badgeBg: 'bg-black',
    badgeBorder: 'border-red-600/40',
  },
  'netflix': {
    name: 'Netflix',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-7d6946e0-9fe6-4c7d-928e-c2ee3679d826.png',
    alt: 'Netflix Logo',
    badgeBg: 'bg-black',
    badgeBorder: 'border-red-600/40',
  },
  'Disney+': {
    name: 'Disney+',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-0a16e63f-8595-4773-8882-d24bcecf6952.png',
    alt: 'Disney+ Logo',
    badgeBg: 'bg-[#040714]',
    badgeBorder: 'border-blue-400/40',
  },
  'disney+': {
    name: 'Disney+',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-0a16e63f-8595-4773-8882-d24bcecf6952.png',
    alt: 'Disney+ Logo',
    badgeBg: 'bg-[#040714]',
    badgeBorder: 'border-blue-400/40',
  },
  'Disney+ Hotstar': {
    name: 'Disney+',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-0a16e63f-8595-4773-8882-d24bcecf6952.png',
    alt: 'Disney+ Logo',
    badgeBg: 'bg-[#040714]',
    badgeBorder: 'border-blue-400/40',
  },
  'disney+ hotstar': {
    name: 'Disney+',
    logoUrl: 'https://cdn.phototourl.com/member/2026-09-24-0a16e63f-8595-4773-8882-d24bcecf6952.png',
    alt: 'Disney+ Logo',
    badgeBg: 'bg-[#040714]',
    badgeBorder: 'border-blue-400/40',
  },
};

// Normalized lookup helper for any app name
export const getStreamingAppInfo = (appName: string): StreamingAppLogo | null => {
  const clean = appName.trim();
  if (STREAMING_LOGOS[clean]) return STREAMING_LOGOS[clean];
  
  const lower = clean.toLowerCase();
  for (const [key, val] of Object.entries(STREAMING_LOGOS)) {
    if (key.toLowerCase() === lower || lower.includes(key.toLowerCase())) {
      return val;
    }
  }
  return null;
};
