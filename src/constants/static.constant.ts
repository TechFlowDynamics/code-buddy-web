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

const defaultConstants = {
  FEATURE_CONSTANT,
  PRICING_PLANS_CONSTANT,
};

export default defaultConstants;
