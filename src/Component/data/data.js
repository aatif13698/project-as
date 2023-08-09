import { iconsImgs } from "../../utils/images";
import { personsImgs } from "../../utils/images";

export const navigationLinksForMedical = [
  { id: 1, title: "Home", image: iconsImgs.home, to: "home" },
  {id : 6, title:"Demo card", image: iconsImgs.event, to: "democard"},

  { id: 8, title: "Profile", image: iconsImgs.account, to: "CreatProfile" },
  { id: 2, title: "Shop", image: iconsImgs.Shop, to: "CreatMedicalShop" },
  { id: 3, title: "Add Doctor", image: iconsImgs.doctor1, to: "addDoctor" },
  { id: 5, title: "Discount", image: iconsImgs.discount, to: "discountOnMedicine" },
 
  { id: 7, title: "Test facility", image: iconsImgs.testFacility, to: "home" },
  
  
  {
    id: 0,
    title: "Settings",
    image: iconsImgs.settings,
    subCategory: [
      {
        title: "Mode",
        id: 1,
      },
      {
        title: "Logout",
        id: 2,
      },
    ],
  },

   // {
  //   id: 6,
  //   title: "Work List",
  //   image: iconsImgs.workList,
  //   to: "/dashboard/todo",
  // },
];

export const navigationLinksForInstitute = [
  { id: 1, title: "Home", image: iconsImgs.home, to: "home" },
  {
    id: 2,
    title: "Institute",
    image: iconsImgs.institute,
    to: "CreatInstituteDetail",
  },
  { id: 3, title: "Add Teacher", image: iconsImgs.teacher, to: "addTeacher" },
  // { id: 4, title: "Edit Teacher", image: iconsImgs.editProduct, to: "home" },
  { id: 5, title: "Batches", image: iconsImgs.batches, to: "addBatches" },
  {
    id: 6,
    title: "Launcg Batch",
    image: iconsImgs.subjects,
    to: "addUpcommingBatch",
  },
  { id: 7, title: "Future Events", image: iconsImgs.event, to: "addUpcommingEvents" },
  { id: 10, title: "Memories", image: iconsImgs.memories, to: "home" },
  { id: 8, title: "Profile", image: iconsImgs.account, to: "CreatProfile" },
  {
    id: 0,
    title: "Settings",
    image: iconsImgs.settings,
    subCategory: [
      {
        title: "Mode",
        id: 1,
      },
      {
        title: "Logout",
        id: 2,
      },
    ],
  },
];

export const navigationLinksForShops = [
  { id: 1, title: "Home", image: iconsImgs.home, to: "home" },
  { id: 2, title: "Shop", image: iconsImgs.Shop, to: "home" },
  { id: 3, title: "Add Product", image: iconsImgs.addProducts, to: "home" },
  { id: 4, title: "Edit Product", image: iconsImgs.editProduct, to: "home" },
  { id: 5, title: "Discount", image: iconsImgs.discount, to: "home" },
  {
    id: 6,
    title: "Work List",
    image: iconsImgs.workList,
    to: "/dashboard/todo",
  },
  { id: 7, title: "Test facility", image: iconsImgs.testFacility, to: "home" },
  { id: 8, title: "Profile", image: iconsImgs.profile, to: "CreatProfile" },
  { id: 9, title: "Account", image: iconsImgs.account, to: "home" },
  {
    id: 0,
    title: "Settings",
    image: iconsImgs.settings,
    subCategory: [
      {
        title: "Mode",
        id: 1,
      },
      {
        title: "Logout",
        id: 2,
      },
    ],
  },
];

export const navigationLinksForPublic = [
  { id: 1, title: "Home", image: iconsImgs.home, to: "home" },
  { id: 2, title: "Doctors", image: iconsImgs.doctor1, to: "home" },
  { id: 3, title: "Medicals", image: iconsImgs.medical, to: "home" },
  { id: 4, title: "Coaching", image: iconsImgs.institute, to: "home" },
  { id: 5, title: "schools", image: iconsImgs.institute, to: "home" },
  { id: 6, title: "Teachers", image: iconsImgs.teacher, to: "/dashboard/todo" },
  { id: 7, title: "Shops", image: iconsImgs.Shop, to: "home" },
  { id: 8, title: "Profile", image: iconsImgs.profile, to: "CreatProfile" },
  {
    id: 9,
    title: "Account",
    image: iconsImgs.account,
    to: "CreatProfile",
    to: "home",
  },
  {
    id: 0,
    title: "Settings",
    image: iconsImgs.settings,
    subCategory: [
      {
        title: "Mode",
        id: 1,
      },
      {
        title: "Logout",
        id: 2,
      },
    ],
  },
];

export const dataObj = {
  1: navigationLinksForMedical,
  2: navigationLinksForInstitute,
  3: navigationLinksForShops,
  4: navigationLinksForPublic,
};

export const transactions = [
  {
    id: 11,
    name: "Sarah Parker",
    image: personsImgs.person_four,
    date: "23/12/04",
    amount: 22000,
  },
  {
    id: 12,
    name: "Krisitine Carter",
    image: personsImgs.person_three,
    date: "23/07/21",
    amount: 20000,
  },
  {
    id: 13,
    name: "Irene Doe",
    image: personsImgs.person_two,
    date: "23/08/25",
    amount: 30000,
  },
];

export const reportData = [
  {
    id: 14,
    month: "Jan",
    value1: 45,
    value2: null,
  },
  {
    id: 15,
    month: "Feb",
    value1: 45,
    value2: 60,
  },
  {
    id: 16,
    month: "Mar",
    value1: 45,
    value2: null,
  },
  {
    id: 17,
    month: "Apr",
    value1: 45,
    value2: null,
  },
  {
    id: 18,
    month: "May",
    value1: 45,
    value2: null,
  },
];

export const budget = [
  {
    id: 19,
    title: "Subscriptions",
    type: "Automated",
    amount: 22000,
  },
  {
    id: 20,
    title: "Loan Payment",
    type: "Automated",
    amount: 16000,
  },
  {
    id: 21,
    title: "Foodstuff",
    type: "Automated",
    amount: 20000,
  },
  {
    id: 22,
    title: "Subscriptions",
    type: null,
    amount: 10000,
  },
  {
    id: 23,
    title: "Subscriptions",
    type: null,
    amount: 40000,
  },
];

export const subscriptions = [
  {
    id: 24,
    title: "LinkedIn",
    due_date: "23/12/04",
    amount: 20000,
  },
  {
    id: 25,
    title: "Netflix",
    due_date: "23/12/10",
    amount: 5000,
  },
  {
    id: 26,
    title: "DSTV",
    due_date: "23/12/22",
    amount: 2000,
  },
];

export const savings = [
  {
    id: 27,
    image: personsImgs.person_one,
    saving_amount: 250000,
    title: "Pay kid bro’s fees",
    date_taken: "23/12/22",
    amount_left: 40000,
  },
];

// doctor list

export const options = [
  {
    value: 1,
    label: "General practitioner",
  },
  {
    value: 2,
    label: "Pediatrician",
  },
  {
    value: 3,
    label: "Otorhinolaryngology",
  },
  {
    value: 4,
    label: "Neurologist",
  },
  {
    value: 5,
    label: "Radiologist",
  },
  {
    value: 6,
    label: "Internal medicine",
  },
  {
    value: 7,
    label: "Psychiatrist",
  },
  {
    value: 8,
    label: "Surgeon",
  },
  {
    value: 9,
    label: "Dermatologist",
  },
  {
    value: 10,
    label: "Cardiologist",
  },
  {
    value: 11,
    label: "Oncologist",
  },
  {
    value: 12,
    label: "Orthopedic surgeon",
  },
  {
    value: 13,
    label: "Anesthesiologist",
  },
  {
    value: 14,
    label: "Ophthalmology",
  },
  {
    value: 15,
    label: "Pathologist",
  },
  {
    value: 16,
    label: "Dentist",
  },
  {
    value: 17,
    label: "Pulmonologist",
  },
  {
    value: 18,
    label: "Gastroenterologist",
  },
  {
    value: 19,
    label: "Urologist",
  },
  {
    value: 20,
    label: "Geriatrics",
  },
  {
    value: 21,
    label: "Neurology",
  },
  {
    value: 22,
    label: "Rheumatologist",
  },
];

export const teacherOptions = [
  {
    value: 1,
    label: "Physics (PHYS)",
  },
  {
    value: 2,
    label: "Nutrition (NUTN)",
  },
  {
    value: 3,
    label: "Chemistry (CHEM)",
  },
  {
    value: 4,
    label: "Economics (ECON)",
  },
  {
    value: 5,
    label: "Mathematics (MATH) ",
  },
  {
    value: 6,
    label: "Phychology (PSYC)",
  },
  {
    value: 7,
    label: "Anthropology (ANTH) ",
  },
  {
    value: 8,
    label: "Agronomy (AGNM)",
  },
  {
    value: 9,
    label: "Biological Science (BIOS)",
  },
  {
    value: 10,
    label: "Statistics (STAT)",
  },
  {
    value: 11,
    label: "Geography (GEGR)",
  },
  {
    value: 12,
    label: "Computer Science (COMS) ",
  },
  {
    value: 13,
    label: "Modern Computer Application (COMA)",
  },
  {
    value: 14,
    label: "Environment Studies (ENVS)",
  },
  {
    value: 15,
    label: "Accountancy (ACCT)",
  },
  {
    value: 16,
    label: "Business Studies (BSTD)",
  },
  {
    value: 17,
    label: "Commercial Law and Preliminaries of Auditing (CLPA)",
  },
  {
    value: 18,
    label: "Costing and Taxation (CSTX)",
  },
  {
    value: 19,
    label: "Economics (ECON)",
  },
  {
    value: 20,
    label: "Modern Computer Application (COMA)",
  },
  {
    value: 21,
    label: "Environment Studies (ENVS)",
  },
  {
    value: 22,
    label: " Health & Physical Education (PHED)",
  },
  {
    value: 23,
    label: "Mathematics (MATH)",
  },
  {
    value: 24,
    label: "Political Science (POLS)",
  },
  {
    value: 25,
    label: "Education (EDCN)",
  },
  {
    value: 26,
    label: "Journalism & Mass Communication (JMCN)",
  },
  {
    value: 27,
    label: " Sanskrit (SNSK)",
  },
  {
    value: 28,
    label: "Persian (PRSN)",
  },
  {
    value: 29,
    label: "Arabic (ARBC)",
  },
  {
    value: 30,
    label: "French (FRNC)",
  },
  {
    value: 31,
    label: "Philosophy (PHIL) ",
  },
  {
    value: 32,
    label: "Sociology (SOCG)",
  },
  {
    value: 33,
    label: "History (HIST)",
  },
  {
    value: 34,
    label: "Anthropology (ANTH)",
  },
  {
    value: 35,
    label: "Phychology (PSYC)",
  },
  {
    value: 36,
    label: "Geography (GEGR)",
  },
  {
    value: 37,
    label: "Music (MUSC)",
  },
  {
    value: 38,
    label: "Visual Arts (VISA)",
  },
  {
    value: 39,
    label: "Modern Computer Application (COMA)",
  },
  {
    value: 40,
    label: "Environment Studies (ENVS)",
  },
  {
    value: 41,
    label: "English (ENGA)",
  },
  {
    value: 42,
    label: "Bengali (BNGB)",
  },
  {
    value: 43,
    label: "Hindi (HINB)",
  },
  {
    value: 44,
    label: "Urdu (URDU) ",
  },
  {
    value: 45,
    label: "Telegu (TELG)",
  },
  {
    value: 46,
    label: "Punjabi (PNJB)",
  },
  {
    value: 47,
    label: "Gujarati (GJRT)",
  },
  {
    value: 48,
    label: "Odia (ODIA) ",
  },
];


 export const dayOption = [
  {
    value: 1,
    label: "MONDAY",
  },
  {
    value: 2,
    label: "TUESDAY",
  },
  {
    value: 3,
    label: "WEDNESDAY",
  },
  {
    value: 4,
    label: "THURSDAY",
  },
  {
    value: 5,
    label: "FRIDAY",
  },
  {
    value: 6,
    label: "SATURDAY",
  },
  {
    value: 7,
    label: "SUNDAY",
  },

]
