export interface SubredditInfo {
    code: string      // ISO country code
    name: string      // Country name
    subreddit: string // Primary subreddit
    region: string    // Continent/region
  }

  // src/services/redditCountries.ts
export function getRandomCountries(count: number): SubredditInfo[] {
    const countries = Object.values(COUNTRY_SUBREDDITS)
    
    // Fisher-Yates shuffle algorithm
    for (let i = countries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [countries[i], countries[j]] = [countries[j], countries[i]]
    }
    
    // Take the first 'count' countries after shuffling
    return countries.slice(0, count)
  }
  
  export const COUNTRY_SUBREDDITS: Record<string, SubredditInfo> = {

    

// AMERICAS
'AG': { code: 'AG', name: 'Antigua and Barbuda', subreddit: 'AntiguaBarbuda', region: 'Americas' },
'AR': { code: 'AR', name: 'Argentina', subreddit: 'argentina', region: 'Americas' },
'BS': { code: 'BS', name: 'Bahamas', subreddit: 'bahamas', region: 'Americas' },
'BB': { code: 'BB', name: 'Barbados', subreddit: 'Barbados', region: 'Americas' },
'BZ': { code: 'BZ', name: 'Belize', subreddit: 'Belize', region: 'Americas' },
'BO': { code: 'BO', name: 'Bolivia', subreddit: 'BOLIVIA', region: 'Americas' },
'BR': { code: 'BR', name: 'Brazil', subreddit: 'brasil', region: 'Americas' },
'CA': { code: 'CA', name: 'Canada', subreddit: 'canada', region: 'Americas' },
'CL': { code: 'CL', name: 'Chile', subreddit: 'chile', region: 'Americas' },
'CO': { code: 'CO', name: 'Colombia', subreddit: 'colombia', region: 'Americas' },
'CR': { code: 'CR', name: 'Costa Rica', subreddit: 'costarica', region: 'Americas' },
'CU': { code: 'CU', name: 'Cuba', subreddit: 'cuba', region: 'Americas' },
'DM': { code: 'DM', name: 'Dominica', subreddit: 'Dominica', region: 'Americas' },
'DO': { code: 'DO', name: 'Dominican Republic', subreddit: 'DominicanRepublic', region: 'Americas' },
'EC': { code: 'EC', name: 'Ecuador', subreddit: 'ecuador', region: 'Americas' },
'SV': { code: 'SV', name: 'El Salvador', subreddit: 'ElSalvador', region: 'Americas' },
'GD': { code: 'GD', name: 'Grenada', subreddit: 'Grenada', region: 'Americas' },
'GT': { code: 'GT', name: 'Guatemala', subreddit: 'Guatemala', region: 'Americas' },
'GY': { code: 'GY', name: 'Guyana', subreddit: 'guyana', region: 'Americas' },
'HT': { code: 'HT', name: 'Haiti', subreddit: 'haiti', region: 'Americas' },
'HN': { code: 'HN', name: 'Honduras', subreddit: 'Honduras', region: 'Americas' },
'JM': { code: 'JM', name: 'Jamaica', subreddit: 'Jamaica', region: 'Americas' },
'MX': { code: 'MX', name: 'Mexico', subreddit: 'mexico', region: 'Americas' },
'NI': { code: 'NI', name: 'Nicaragua', subreddit: 'Nicaragua', region: 'Americas' },
'PA': { code: 'PA', name: 'Panama', subreddit: 'Panama', region: 'Americas' },
'PY': { code: 'PY', name: 'Paraguay', subreddit: 'paraguay', region: 'Americas' },
'PE': { code: 'PE', name: 'Peru', subreddit: 'PERU', region: 'Americas' },
'KN': { code: 'KN', name: 'Saint Kitts and Nevis', subreddit: 'SaintKittsAndNevis', region: 'Americas' },
'LC': { code: 'LC', name: 'Saint Lucia', subreddit: 'SaintLucia', region: 'Americas' },
'VC': { code: 'VC', name: 'Saint Vincent and the Grenadines', subreddit: 'SVG', region: 'Americas' },
'SR': { code: 'SR', name: 'Suriname', subreddit: 'suriname', region: 'Americas' },
'TT': { code: 'TT', name: 'Trinidad and Tobago', subreddit: 'TrinidadAndTobago', region: 'Americas' },
'US': { code: 'US', name: 'United States', subreddit: 'news', region: 'Americas' },
'UY': { code: 'UY', name: 'Uruguay', subreddit: 'uruguay', region: 'Americas' },
'VE': { code: 'VE', name: 'Venezuela', subreddit: 'vzla', region: 'Americas' },

// ASIA
'AF': { code: 'AF', name: 'Afghanistan', subreddit: 'afghanistan', region: 'Asia' },
'BH': { code: 'BH', name: 'Bahrain', subreddit: 'bahrain', region: 'Asia' },
'BD': { code: 'BD', name: 'Bangladesh', subreddit: 'bangladesh', region: 'Asia' },
'BT': { code: 'BT', name: 'Bhutan', subreddit: 'bhutan', region: 'Asia' },
'BN': { code: 'BN', name: 'Brunei', subreddit: 'brunei', region: 'Asia' },
'KH': { code: 'KH', name: 'Cambodia', subreddit: 'cambodia', region: 'Asia' },
'CN': { code: 'CN', name: 'China', subreddit: 'China', region: 'Asia' },
'TL': { code: 'TL', name: 'East Timor', subreddit: 'EastTimor', region: 'Asia' },
'IN': { code: 'IN', name: 'India', subreddit: 'india', region: 'Asia' },
'ID': { code: 'ID', name: 'Indonesia', subreddit: 'indonesia', region: 'Asia' },
'IR': { code: 'IR', name: 'Iran', subreddit: 'iran', region: 'Asia' },
'IQ': { code: 'IQ', name: 'Iraq', subreddit: 'iraq', region: 'Asia' },
'IL': { code: 'IL', name: 'Israel', subreddit: 'Israel', region: 'Asia' },
'JP': { code: 'JP', name: 'Japan', subreddit: 'japan', region: 'Asia' },
'JO': { code: 'JO', name: 'Jordan', subreddit: 'jordan', region: 'Asia' },
'KZ': { code: 'KZ', name: 'Kazakhstan', subreddit: 'Kazakhstan', region: 'Asia' },
'KW': { code: 'KW', name: 'Kuwait', subreddit: 'Kuwait', region: 'Asia' },
'KG': { code: 'KG', name: 'Kyrgyzstan', subreddit: 'Kyrgyzstan', region: 'Asia' },
'LA': { code: 'LA', name: 'Laos', subreddit: 'laos', region: 'Asia' },
'LB': { code: 'LB', name: 'Lebanon', subreddit: 'lebanon', region: 'Asia' },
'MY': { code: 'MY', name: 'Malaysia', subreddit: 'malaysia', region: 'Asia' },
'MV': { code: 'MV', name: 'Maldives', subreddit: 'maldives', region: 'Asia' },
'MN': { code: 'MN', name: 'Mongolia', subreddit: 'mongolia', region: 'Asia' },
'MM': { code: 'MM', name: 'Myanmar', subreddit: 'myanmar', region: 'Asia' },
'NP': { code: 'NP', name: 'Nepal', subreddit: 'nepal', region: 'Asia' },
'KP': { code: 'KP', name: 'North Korea', subreddit: 'northkorea', region: 'Asia' },
'OM': { code: 'OM', name: 'Oman', subreddit: 'oman', region: 'Asia' },
'PK': { code: 'PK', name: 'Pakistan', subreddit: 'pakistan', region: 'Asia' },
'PH': { code: 'PH', name: 'Philippines', subreddit: 'philippines', region: 'Asia' },
'QA': { code: 'QA', name: 'Qatar', subreddit: 'qatar', region: 'Asia' },
'SA': { code: 'SA', name: 'Saudi Arabia', subreddit: 'saudiarabia', region: 'Asia' },
'SG': { code: 'SG', name: 'Singapore', subreddit: 'singapore', region: 'Asia' },
'KR': { code: 'KR', name: 'South Korea', subreddit: 'korea', region: 'Asia' },
'LK': { code: 'LK', name: 'Sri Lanka', subreddit: 'srilanka', region: 'Asia' },
'SY': { code: 'SY', name: 'Syria', subreddit: 'Syria', region: 'Asia' },
'TW': { code: 'TW', name: 'Taiwan', subreddit: 'taiwan', region: 'Asia' },
'TJ': { code: 'TJ', name: 'Tajikistan', subreddit: 'tajikistan', region: 'Asia' },
'TH': { code: 'TH', name: 'Thailand', subreddit: 'thailand', region: 'Asia' },
'TR': { code: 'TR', name: 'Turkey', subreddit: 'turkey', region: 'Asia' },
'TM': { code: 'TM', name: 'Turkmenistan', subreddit: 'turkmenistan', region: 'Asia' },
'AE': { code: 'AE', name: 'United Arab Emirates', subreddit: 'uae', region: 'Asia' },
'UZ': { code: 'UZ', name: 'Uzbekistan', subreddit: 'uzbekistan', region: 'Asia' },
'VN': { code: 'VN', name: 'Vietnam', subreddit: 'vietnam', region: 'Asia' },
'YE': { code: 'YE', name: 'Yemen', subreddit: 'Yemen', region: 'Asia' },
// EUROPE
'AL': { code: 'AL', name: 'Albania', subreddit: 'albania', region: 'Europe' },
'AD': { code: 'AD', name: 'Andorra', subreddit: 'andorra', region: 'Europe' },
'AT': { code: 'AT', name: 'Austria', subreddit: 'austria', region: 'Europe' },
'BY': { code: 'BY', name: 'Belarus', subreddit: 'belarus', region: 'Europe' },
'BE': { code: 'BE', name: 'Belgium', subreddit: 'belgium', region: 'Europe' },
'BA': { code: 'BA', name: 'Bosnia and Herzegovina', subreddit: 'bih', region: 'Europe' },
'BG': { code: 'BG', name: 'Bulgaria', subreddit: 'bulgaria', region: 'Europe' },
'HR': { code: 'HR', name: 'Croatia', subreddit: 'croatia', region: 'Europe' },
'CY': { code: 'CY', name: 'Cyprus', subreddit: 'cyprus', region: 'Europe' },
'CZ': { code: 'CZ', name: 'Czech Republic', subreddit: 'czech', region: 'Europe' },
'DK': { code: 'DK', name: 'Denmark', subreddit: 'Denmark', region: 'Europe' },
'EE': { code: 'EE', name: 'Estonia', subreddit: 'Eesti', region: 'Europe' },
'FI': { code: 'FI', name: 'Finland', subreddit: 'Finland', region: 'Europe' },
'FR': { code: 'FR', name: 'France', subreddit: 'france', region: 'Europe' },
'DE': { code: 'DE', name: 'Germany', subreddit: 'germany', region: 'Europe' },
'GR': { code: 'GR', name: 'Greece', subreddit: 'greece', region: 'Europe' },
'HU': { code: 'HU', name: 'Hungary', subreddit: 'hungary', region: 'Europe' },
'IS': { code: 'IS', name: 'Iceland', subreddit: 'iceland', region: 'Europe' },
'IE': { code: 'IE', name: 'Ireland', subreddit: 'ireland', region: 'Europe' },
'IT': { code: 'IT', name: 'Italy', subreddit: 'italy', region: 'Europe' },
'XK': { code: 'XK', name: 'Kosovo', subreddit: 'kosovo', region: 'Europe' },
'LV': { code: 'LV', name: 'Latvia', subreddit: 'latvia', region: 'Europe' },
'LI': { code: 'LI', name: 'Liechtenstein', subreddit: 'liechtenstein', region: 'Europe' },
'LT': { code: 'LT', name: 'Lithuania', subreddit: 'lithuania', region: 'Europe' },
'LU': { code: 'LU', name: 'Luxembourg', subreddit: 'luxembourg', region: 'Europe' },
'MT': { code: 'MT', name: 'Malta', subreddit: 'malta', region: 'Europe' },
'MD': { code: 'MD', name: 'Moldova', subreddit: 'moldova', region: 'Europe' },
'MC': { code: 'MC', name: 'Monaco', subreddit: 'monaco', region: 'Europe' },
'ME': { code: 'ME', name: 'Montenegro', subreddit: 'montenegro', region: 'Europe' },
'NL': { code: 'NL', name: 'Netherlands', subreddit: 'thenetherlands', region: 'Europe' },
'MK': { code: 'MK', name: 'North Macedonia', subreddit: 'macedonia', region: 'Europe' },
'NO': { code: 'NO', name: 'Norway', subreddit: 'norway', region: 'Europe' },
'PL': { code: 'PL', name: 'Poland', subreddit: 'poland', region: 'Europe' },
'PT': { code: 'PT', name: 'Portugal', subreddit: 'portugal', region: 'Europe' },
'RO': { code: 'RO', name: 'Romania', subreddit: 'romania', region: 'Europe' },
'RU': { code: 'RU', name: 'Russia', subreddit: 'russia', region: 'Europe' },
'SM': { code: 'SM', name: 'San Marino', subreddit: 'sanmarino', region: 'Europe' },
'RS': { code: 'RS', name: 'Serbia', subreddit: 'serbia', region: 'Europe' },
'SK': { code: 'SK', name: 'Slovakia', subreddit: 'slovakia', region: 'Europe' },
'SI': { code: 'SI', name: 'Slovenia', subreddit: 'slovenia', region: 'Europe' },
'ES': { code: 'ES', name: 'Spain', subreddit: 'spain', region: 'Europe' },
'SE': { code: 'SE', name: 'Sweden', subreddit: 'sweden', region: 'Europe' },
'CH': { code: 'CH', name: 'Switzerland', subreddit: 'switzerland', region: 'Europe' },
'UA': { code: 'UA', name: 'Ukraine', subreddit: 'ukraine', region: 'Europe' },
'GB': { code: 'GB', name: 'United Kingdom', subreddit: 'unitedkingdom', region: 'Europe' },
'VA': { code: 'VA', name: 'Vatican City', subreddit: 'vatican', region: 'Europe' },

// OCEANIA
'AU': { code: 'AU', name: 'Australia', subreddit: 'australia', region: 'Oceania' },
'FJ': { code: 'FJ', name: 'Fiji', subreddit: 'Fijian', region: 'Oceania' },
'KI': { code: 'KI', name: 'Kiribati', subreddit: 'Kiribati', region: 'Oceania' },
'MH': { code: 'MH', name: 'Marshall Islands', subreddit: 'MarshallIslands', region: 'Oceania' },
'FM': { code: 'FM', name: 'Micronesia', subreddit: 'Micronesia', region: 'Oceania' },
'NR': { code: 'NR', name: 'Nauru', subreddit: 'Nauru', region: 'Oceania' },
'NZ': { code: 'NZ', name: 'New Zealand', subreddit: 'newzealand', region: 'Oceania' },
'PW': { code: 'PW', name: 'Palau', subreddit: 'Palau', region: 'Oceania' },
'PG': { code: 'PG', name: 'Papua New Guinea', subreddit: 'PNG', region: 'Oceania' },
'WS': { code: 'WS', name: 'Samoa', subreddit: 'Samoa', region: 'Oceania' },
'SB': { code: 'SB', name: 'Solomon Islands', subreddit: 'Solomon_Islands', region: 'Oceania' },
'TO': { code: 'TO', name: 'Tonga', subreddit: 'Tonga', region: 'Oceania' },
'TV': { code: 'TV', name: 'Tuvalu', subreddit: 'Tuvalu', region: 'Oceania' },
'VU': { code: 'VU', name: 'Vanuatu', subreddit: 'Vanuatu', region: 'Oceania' }

}