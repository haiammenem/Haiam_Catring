import imagesIndex from "../imagesIndex.json";

/* ================= RAW PROJECT DATA ================= */

const experienceProjectsRaw = [
  {
    title: "Real Performance Garage ERP System – Web Developer",
    duration: "2026/4 – Present",
    desc: "Web-based ERP system for Race Motor repair and Store shop built with Laravel and Next.Js.",
    tech: ["Laravel", "MySQL", "REST APIs", "RBAC", "Next.Js"],
    imagesFolder: "/RPG",
    url: "",
    points: [],
  },
  {
    title: "Localhub System – Web Developer",
    duration: "2024/11 – 2025/3",
    desc: "Web-based sales, inventory, and financial management system built with Laravel.",
    tech: ["Laravel", "MySQL", "REST APIs", "RBAC"],
    imagesFolder: "/LocalHub",
    url: "https://github.com/NoureldinFarag1/capstone_pos",
    points: [
      "Designed modular sales & inventory workflows.",
      "Implemented secure role-based access control (Admin, Moderator, Cashier).",
      "Built RESTful APIs for transactions and reporting.",
      "Automated stock updates and financial calculations.",
      "Generated dynamic monthly Excel financial reports.",
      "Optimized MySQL queries for better performance.",
    ],
  },
  {
    title: "Shaffaf Project – Flutter Developer",
    duration: "2024/6 – 2024/9",
    desc: "Cross-platform e-commerce mobile app for car parts with secure payments.",
    tech: [
      "Flutter",
      "Firebase",
      "BLoC",
      "Maps & GPS",
      "REST APIs",
      "Payment Gateway",
    ],
    projectCover: "/Shaffaf Edit Version/Shaffaf Mockup.png",
    imagesFolder: "/Shaffaf Edit Version",
    url: "https://github.com/mohamedadel80080/Shfaff-App-Flutter",
    points: [
      "Developed scalable Flutter architecture using BLoC state management.",
      "Integrated Firebase Authentication with OTP verification.",
      "Connected secure payment gateway for checkout flow.",
      "Consumed REST APIs for dynamic products & categories.",
      "Improved UI responsiveness across multiple screen sizes.",
      "Enhanced performance with optimized state updates.",
    ],
  },
];

const personalProjectsRaw = [
  {
    title: "SubTrain Project – Graduation Project",
    duration: "2024/3 – 2024/6",
    desc: "Train & subway ticket booking mobile app with real-time services.",
    tech: [
      "Flutter",
      "Realtime APIs",
      "Firebase",
      "Maps & GPS",
      "Payment Integration",
      "AI Chatbot",
    ],
    projectCover: "/SubTrain/Mockup.png",
    imagesFolder: "/SubTrain",
    url: "https://github.com/OmarMonem02/SubTrain",
    points: [
      "Led full mobile development lifecycle from design to deployment.",
      "Implemented real-time ticket booking and confirmation APIs.",
      "Integrated maps & GPS for station tracking and route guidance.",
      "Built secure online payment flow.",
      "Developed AI chatbot using Gemini API for user assistance.",
      "Designed scalable architecture for future expansion.",
    ],
  },
];

/* ================= IMAGE ATTACH HELPER ================= */

function attachImages(projects) {
  return projects.map((project) => {
    const images = project.imagesFolder
      ? imagesIndex[project.imagesFolder] || []
      : [];

    return {
      ...project,
      images,
      projectCover:
        project.projectCover || (images.length > 0 ? images[0] : null),
    };
  });
}

/* ================= FINAL EXPORT ================= */

export const projectsData = {
  experience: attachImages(experienceProjectsRaw),
  personal: attachImages(personalProjectsRaw),
};
