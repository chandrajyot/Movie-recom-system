export const OFFICIAL_UPI_DETAILS = {
  merchantName: "Chandra jyot Kumar",
  upiId: "chandrajyotkumar-1@oksbi",
  bankName: "State Bank of India 4513",
  qrImage: "/chandra_upi_qr.png"
};

export const INITIAL_PAYMENT_GATEWAYS = [
  {
    id: "gpay",
    name: "Google Pay (UPI)",
    category: "UPI",
    icon: "📱",
    description: "Direct Pay to Chandra jyot Kumar (chandrajyotkumar-1@oksbi)",
    enabled: true,
    feePercent: 0.0,
    supportedMethods: ["UPI"],
    webhookSecret: "whsec_gpay_upi_771920"
  },
  {
    id: "upiqr",
    name: "SBI UPI QR Scanner",
    category: "UPI",
    icon: "📷",
    description: "Scan QR Code to pay Chandra jyot Kumar",
    enabled: true,
    feePercent: 0.0,
    supportedMethods: ["UPI QR"],
    webhookSecret: "whsec_upi_qr_99812"
  },
  {
    id: "phonepe",
    name: "PhonePe UPI",
    category: "UPI",
    icon: "🟪",
    description: "Instant PhonePe to chandrajyotkumar-1@oksbi",
    enabled: true,
    feePercent: 0.0,
    supportedMethods: ["UPI", "Wallets"],
    webhookSecret: "whsec_phonepe_991204"
  },
  {
    id: "paytm",
    name: "Paytm UPI",
    category: "UPI / Wallet",
    icon: "🟦",
    description: "Paytm to chandrajyotkumar-1@oksbi",
    enabled: true,
    feePercent: 0.0,
    supportedMethods: ["UPI", "Wallets"],
    webhookSecret: "whsec_paytm_881902"
  },
  {
    id: "razorpay",
    name: "Razorpay",
    category: "Gateway",
    icon: "💳",
    description: "Instant Cards, NetBanking & UPI",
    enabled: true,
    feePercent: 2.0,
    supportedMethods: ["UPI", "Cards", "NetBanking", "Wallets"],
    webhookSecret: "whsec_rzp_live_998124012"
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Gateway",
    icon: "🌐",
    description: "Global Credit & Debit Card Payments",
    enabled: true,
    feePercent: 2.9,
    supportedMethods: ["Cards", "Apple Pay", "Google Pay"],
    webhookSecret: "whsec_str_live_88719203"
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "International",
    icon: "🅿️",
    description: "International USD Checkout",
    enabled: true,
    feePercent: 3.5,
    supportedMethods: ["PayPal Balance", "Cards"],
    webhookSecret: "whsec_paypal_110293"
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    category: "Wallet",
    icon: "📦",
    description: "One-Click Amazon Balance & UPI",
    enabled: true,
    feePercent: 1.0,
    supportedMethods: ["Wallets", "UPI"],
    webhookSecret: "whsec_amzpay_667102"
  },
  {
    id: "card",
    name: "Debit & Credit Cards",
    category: "Card",
    icon: "💳",
    description: "Visa, Mastercard, RuPay & Amex",
    enabled: true,
    feePercent: 1.8,
    supportedMethods: ["Cards"],
    webhookSecret: "whsec_pci_dss_cards_5541"
  },
  {
    id: "netbanking",
    name: "Net Banking",
    category: "Bank",
    icon: "🏦",
    description: "SBI, HDFC, ICICI, PNB Direct Banking",
    enabled: true,
    feePercent: 1.5,
    supportedMethods: ["NetBanking"],
    webhookSecret: "whsec_netbank_in_33412"
  }
];

export const CONVENIENCE_FEE_PERCENT = 2.0;
export const GST_PERCENT = 18.0;
