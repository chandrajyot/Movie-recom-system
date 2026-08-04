export const INDIAN_STATES = [
  { id: "pb", name: "Punjab" },
  { id: "mh", name: "Maharashtra" },
  { id: "dl", name: "Delhi NCR" },
  { id: "ka", name: "Karnataka" },
  { id: "tn", name: "Tamil Nadu" },
  { id: "tg", name: "Telangana" },
  { id: "gj", name: "Gujarat" },
  { id: "up", name: "Uttar Pradesh" },
  { id: "wb", name: "West Bengal" },
  { id: "rj", name: "Rajasthan" },
  { id: "kl", name: "Kerala" },
  { id: "intl", name: "International" }
];

export const CITIES_BY_STATE = {
  "Punjab": ["Phagwara", "Jalandhar", "Ludhiana", "Amritsar", "Chandigarh", "Patiala", "Mohali", "Bathinda"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Delhi NCR": ["New Delhi", "Noida", "Gurgaon", "Ghaziabad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi", "Agra"],
  "West Bengal": ["Kolkata", "Siliguri"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur"],
  "Kerala": ["Kochi", "Trivandrum", "Kozhikode"],
  "International": ["New York", "Los Angeles", "Chicago", "London", "Tokyo"]
};

export const CINEMA_HALLS_DATABASE = [
  // --- PHAGWARA, PUNJAB ---
  {
    id: "th_phg_1",
    name: "PVR Cally Plaza Phagwara",
    city: "Phagwara",
    state: "Punjab",
    address: "GT Road, Near Bus Stand, Phagwara, Punjab 144401",
    distance: "0.5 km from City Centre",
    rating: 4.8,
    facilities: ["4K RGB Laser", "Dolby Atmos 7.1", "Recliner Lounge", "Gourmet Food Court", "Covered Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=PVR%20Cally%20Plaza%20Phagwara%20Punjab&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1 (4K Laser)", screenType: "Dolby Atmos" },
      { screenNo: "Screen 2 (VIP)", screenType: "Recliner Lounge" }
    ]
  },
  {
    id: "th_phg_2",
    name: "Surya Cinema & Food Court Phagwara",
    city: "Phagwara",
    state: "Punjab",
    address: "Model Town Market, GT Road, Phagwara, Punjab 144401",
    distance: "1.2 km away",
    rating: 4.6,
    facilities: ["Dolby Digital 7.1", "Food Court", "Arcade Games", "Free Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Phagwara%20GT%20Road%20Punjab&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Auditorium 1", screenType: "Dolby 7.1" }
    ]
  },
  {
    id: "th_phg_3",
    name: "Grand Multiplex GT Road (Near LPU)",
    city: "Phagwara",
    state: "Punjab",
    address: "Law Gate Road, Near LPU Campus, Phagwara, Punjab 144411",
    distance: "2.8 km from LPU",
    rating: 4.9,
    facilities: ["IMAX 3D", "Dolby Atmos", "Recliner Seats", "Valet Parking", "Student Discounts"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Lovely%20Professional%20University%20Phagwara&t=&z=14&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "IMAX Arena", screenType: "IMAX 3D" },
      { screenNo: "Screen 2", screenType: "Dolby Atmos" }
    ]
  },

  // --- JALANDHAR, PUNJAB ---
  {
    id: "th_jal_1",
    name: "PVR Curo High Street Jalandhar",
    city: "Jalandhar",
    state: "Punjab",
    address: "66 Feet Road, Urban Estate Phase-2, Jalandhar, Punjab 144022",
    distance: "3.5 km away",
    rating: 4.9,
    facilities: ["IMAX 3D", "Dolby Atmos", "INSIGNIA VIP", "Recliner Seats", "Valet Parking", "Gourmet Cafe"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Curo%20High%20Street%20Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1 (IMAX)", screenType: "IMAX 3D" },
      { screenNo: "INSIGNIA VIP 1", screenType: "VIP Lounge" }
    ]
  },
  {
    id: "th_jal_2",
    name: "INox Reliance Mall Jalandhar",
    city: "Jalandhar",
    state: "Punjab",
    address: "BMC Chowk, GT Road, Jalandhar, Punjab 144001",
    distance: "1.8 km from Station",
    rating: 4.8,
    facilities: ["Dolby Atmos", "Kiddles Play Screen", "Food Court", "Wheelchair Access"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Reliance%20Mall%20BMC%20Chowk%20Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1", screenType: "Dolby Atmos" },
      { screenNo: "Screen 2", screenType: "3D" }
    ]
  },
  {
    id: "th_jal_3",
    name: "Cinepolis Viva Collage Mall",
    city: "Jalandhar",
    state: "Punjab",
    address: "Jalandhar-Phagwara Highway, GT Road, Jalandhar, Punjab 144005",
    distance: "4.2 km away",
    rating: 4.7,
    facilities: ["4DX Motion", "RealD 3D", "Coffee Lounge", "Multi-storey Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Viva%20Collage%20Mall%20Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "4DX Screen", screenType: "4DX" }
    ]
  },
  {
    id: "th_jal_4",
    name: "Sarmathal Cinema Model Town",
    city: "Jalandhar",
    state: "Punjab",
    address: "Model Town Market Road, Jalandhar, Punjab 144003",
    distance: "2.1 km away",
    rating: 4.5,
    facilities: ["Dolby 7.1", "Food Court", "Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Model%20Town%20Jalandhar&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen A", screenType: "Dolby Digital" }
    ]
  },

  // --- LUDHIANA, PUNJAB ---
  {
    id: "th_lud_1",
    name: "PVR Pavilion Mall Ludhiana",
    city: "Ludhiana",
    state: "Punjab",
    address: "Fountain Chowk, Civil Lines, Ludhiana, Punjab 141001",
    distance: "2.0 km away",
    rating: 4.8,
    facilities: ["Dolby Atmos", "Recliner Lounge", "Food Court", "Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Pavilion%20Mall%20Ludhiana&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1", screenType: "Dolby Atmos" }
    ]
  },

  // --- AMRITSAR, PUNJAB ---
  {
    id: "th_asr_1",
    name: "INox Trillium Mall Amritsar",
    city: "Amritsar",
    state: "Punjab",
    address: "Medical Enclave, Circular Road, Amritsar, Punjab 143001",
    distance: "1.5 km away",
    rating: 4.8,
    facilities: ["Dolby Atmos", "Recliner Seats", "Valet Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Trillium%20Mall%20Amritsar&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1", screenType: "Dolby Atmos" }
    ]
  },

  // --- CHANDIGARH, PUNJAB ---
  {
    id: "th_chd_1",
    name: "PVR Elante Mall Chandigarh",
    city: "Chandigarh",
    state: "Punjab",
    address: "Industrial Area Phase I, Chandigarh 160002",
    distance: "3.0 km away",
    rating: 4.9,
    facilities: ["IMAX 3D", "4DX Motion", "LUXE Lounge", "Valet Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Elante%20Mall%20Chandigarh&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "IMAX Screen", screenType: "IMAX 3D" }
    ]
  },

  // --- MUMBAI, MAHARASHTRA ---
  {
    id: "th_mum_1",
    name: "PVR INOX Icon Phoenix Palladium Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    address: "High Street Phoenix, Lower Parel, Mumbai, Maharashtra 400013",
    distance: "2.1 km away",
    rating: 4.9,
    facilities: ["IMAX 3D", "Dolby Atmos", "LUXE Recliner", "Valet Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Phoenix%20Palladium%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "IMAX Screen", screenType: "IMAX 3D" }
    ]
  },

  // --- DELHI NCR ---
  {
    id: "th_del_1",
    name: "PVR Director's Cut Vasant Kunj Delhi",
    city: "New Delhi",
    state: "Delhi NCR",
    address: "Ambience Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi 110070",
    distance: "4.5 km away",
    rating: 4.9,
    facilities: ["VIP Director's Cut", "Gourmet Dining", "Dolby Atmos"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Ambience%20Mall%20Vasant%20Kunj%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "DC Screen 1", screenType: "VIP Lounge" }
    ]
  },

  // --- BENGALURU, KARNATAKA ---
  {
    id: "th_blr_1",
    name: "PVR Superplex Forum Mall Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    address: "Hosur Road, Koramangala, Bengaluru, Karnataka 560095",
    distance: "2.0 km away",
    rating: 4.9,
    facilities: ["IMAX 3D", "4DX Motion", "Gold Class", "Food Court"],
    mapEmbedUrl: "https://maps.google.com/maps?q=Forum%20Mall%20Koramangala%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "IMAX Screen", screenType: "IMAX 3D" }
    ]
  },

  // --- INTERNATIONAL (NEW YORK) ---
  {
    id: "th_ny_1",
    name: "Cineplex IMAX Grand Manhattan",
    city: "New York",
    state: "International",
    address: "740 Broadway, Manhattan, NY 10003",
    distance: "1.2 miles away",
    rating: 4.8,
    facilities: ["IMAX 3D", "Dolby Atmos", "Food Court", "Parking"],
    mapEmbedUrl: "https://maps.google.com/maps?q=740%20Broadway%2C%20Manhattan%2C%20NY%2010003&t=&z=15&ie=UTF8&iwloc=&output=embed",
    screens: [
      { screenNo: "Screen 1 (IMAX)", screenType: "IMAX 3D" }
    ]
  }
];
