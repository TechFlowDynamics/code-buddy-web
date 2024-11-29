export const FEATURE_CONSTANT = [
  {
    title: "Real-Time Collaboration",
    description:
      "Collaborate on code in real-time with teammates, enabling fast and seamless development.",
  },
  {
    title: "Code Execution",
    description:
      "Instantly execute code in a sandboxed environment with real-time output.",
  },
  {
    title: "Performance Analytics",
    description:
      "Track and analyze your code with execution time, error rates, and efficiency metrics.",
  },
  {
    title: "Rooms & Leaderboards",
    description:
      "Compete with friends in coding rooms and track your progress on the leaderboard.",
  },
];

export const PRICING_PLANS_CONSTANT = [
  {
    title: "Freemium",
    price: "Free",
    credits: 5,
    description: "Start with 5 credits to explore Codie-Buddy.",
    features: [
      "5 Credits Included",
      "2 Credits Per Invite",
      "Access to Community Rooms",
    ],
  },
  {
    title: "Basic",
    price: "$5",
    credits: 20,
    description: "For light coding sessions and small projects.",
    features: ["20 Credits", "Standard Support", "Room Creation"],
  },
  {
    title: "Pro",
    price: "$15",
    credits: 50,
    description: "Perfect for regular sessions with extended support.",
    features: ["50 Credits", "Priority Support", "Team Collaboration"],
  },
  {
    title: "Ultimate",
    price: "$30",
    credits: 100,
    description: "Unlimited sessions and dedicated support for teams.",
    features: ["100 Credits", "24/7 Support", "Advanced Analytics"],
  },
];

const DASHBOARD_SIDEBAR_CONSTANT = [
  { name: "Overview", path: "/dashboard" },
  { name: "Lobby", path: "/dashboard/lobby" },
  { name: "Progress", path: "/dashboard/progress" },
  { name: "Settings", path: "/dashboard/settings" },
];

const PRIVATE_LOBBY = [
  {
    date: "22.12.2022",
    time: "20:20:02",
    title: "Code Campus",
    avatars: [
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/men/33.jpg",
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/women/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
      "https://randomuser.me/api/portraits/women/55.jpg",
    ],
    blinds: "10",
    minBuyIn: "20",
    token: "PKR",
    type: "Local",
    status: "Live",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Hackos coders",
    avatars: [
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
      "https://randomuser.me/api/portraits/women/38.jpg",
    ],
    blinds: "35",
    minBuyIn: "50",
    token: "USD",
    type: "Global",
    status: "Open",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Buddy coders",
    avatars: [
      "https://randomuser.me/api/portraits/men/14.jpg",
      "https://randomuser.me/api/portraits/women/18.jpg",
      "https://randomuser.me/api/portraits/women/34.jpg",
      "https://randomuser.me/api/portraits/women/32.jpg",
      "https://randomuser.me/api/portraits/women/37.jpg",
    ],
    blinds: "35",
    minBuyIn: "50",
    token: "USD",
    type: "Global",
    status: "Live",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Conquer Coder",
    avatars: [
      "https://randomuser.me/api/portraits/men/44.jpg",
      "https://randomuser.me/api/portraits/women/38.jpg",
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/women/43.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
      "https://randomuser.me/api/portraits/women/3.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
    ],
    blinds: "20",
    minBuyIn: "50",
    token: "USD",
    type: "Global",
    status: "Open",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Worlds Coder",
    avatars: [
      "https://randomuser.me/api/portraits/men/48.jpg",
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/women/33.jpg",
      "https://randomuser.me/api/portraits/women/58.jpg",
      "https://randomuser.me/api/portraits/women/53.jpg",
      "https://randomuser.me/api/portraits/women/52.jpg",
    ],
    blinds: "15",
    minBuyIn: "25",
    token: "USD",
    type: "Local",
    status: "Open",
  },
];

const defaultConstants = {
  FEATURE_CONSTANT,
  DASHBOARD_SIDEBAR_CONSTANT,
  PRICING_PLANS_CONSTANT,
  PRIVATE_LOBBY,
};

export default defaultConstants;
