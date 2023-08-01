import { iconsImgs } from "../../utils/images";
import { personsImgs } from "../../utils/images";

export const navigationLinksForMedical = [
    { id: 1, title: 'Home', image: iconsImgs.home , to : "home"},
    { id: 2, title: 'Shop', image: iconsImgs.Shop, to : "CreatMedicalShop" },
    { id: 3, title: 'Add Doctor', image: iconsImgs.doctor1, to : "home" },
    { id: 4, title: 'Edit Doctor', image: iconsImgs.editProduct, to : "home" },
    { id: 5, title: 'Discount', image: iconsImgs.discount, to : "home" },
    { id: 6, title: 'Work List', image: iconsImgs.workList, to : "/dashboard/todo" },
    { id: 7, title: 'Test facility', image: iconsImgs.testFacility , to : "home"},
    { id: 8, title: 'Profile', image: iconsImgs.profile, to : "CreatProfile" },
    { id: 9, title: 'Account', image: iconsImgs.account , to : "home"},
    { id: 0, title: 'Settings', image: iconsImgs.settings, subCategory : [
        {
            title : "Mode",
            id : 1
        },
        {
            title : "Logout",
            id : 2
        }
    ] }
];


export const navigationLinksForInstitute = [
    { id: 1, title: 'Home', image: iconsImgs.home , to : "home"},
    { id: 2, title: 'Institute', image: iconsImgs.institute, to : "CreatInstituteDetail" },
    { id: 3, title: 'Add Teacher', image: iconsImgs.teacher, to : "home" },
    { id: 4, title: 'Edit Teacher', image: iconsImgs.editProduct, to : "home" },
    { id: 5, title: 'New Batch', image: iconsImgs.batches, to : "home" },
    { id: 6, title: 'Subjects', image: iconsImgs.subjects, to : "/dashboard/todo" },
    { id: 7, title: 'Events', image: iconsImgs.event , to : "home"},
    { id: 8, title: 'Memories', image: iconsImgs.memories, to : "home" },
    { id: 9, title: 'Discount', image: iconsImgs.discount , to : "home"},
    { id: 10, title: 'Profile', image: iconsImgs.account ,  to : "CreatProfile"},
    { id: 0, title: 'Settings', image: iconsImgs.settings,  subCategory : [
        {
            title : "Mode",
            id : 1
        },
        {
            title : "Logout",
            id : 2
        }
    ] }
];


export const navigationLinksForShops = [
    { id: 1, title: 'Home', image: iconsImgs.home , to : "home"},
    { id: 2, title: 'Shop', image: iconsImgs.Shop, to : "home" },
    { id: 3, title: 'Add Product', image: iconsImgs.addProducts, to : "home" },
    { id: 4, title: 'Edit Product', image: iconsImgs.editProduct, to : "home" },
    { id: 5, title: 'Discount', image: iconsImgs.discount, to : "home" },
    { id: 6, title: 'Work List', image: iconsImgs.workList, to : "/dashboard/todo" },
    { id: 7, title: 'Test facility', image: iconsImgs.testFacility , to : "home"},
    { id: 8, title: 'Profile', image: iconsImgs.profile, to : "CreatProfile" },
    { id: 9, title: 'Account', image: iconsImgs.account ,  to : "home"},
    { id: 0, title: 'Settings', image: iconsImgs.settings, subCategory : [
        {
            title : "Mode",
            id : 1
        },
        {
            title : "Logout",
            id : 2
        }
    ] }
];




export const navigationLinksForPublic = [
    { id: 1, title: 'Home', image: iconsImgs.home , to : "home"},
    { id: 2, title: 'Doctors', image: iconsImgs.doctor1, to : "home" },
    { id: 3, title: 'Medicals', image: iconsImgs.medical, to : "home" },
    { id: 4, title: 'Coaching', image: iconsImgs.institute, to : "home" },
    { id: 5, title: 'schools', image: iconsImgs.institute, to : "home" },
    { id: 6, title: 'Teachers', image: iconsImgs.teacher, to : "/dashboard/todo" },
    { id: 7, title: 'Shops', image: iconsImgs.Shop , to : "home"},
    { id: 8, title: 'Profile', image: iconsImgs.profile, to : "CreatProfile" },
    { id: 9, title: 'Account', image: iconsImgs.account , to :"CreatProfile", to : "home"},
    { id: 0, title: 'Settings', image: iconsImgs.settings,  subCategory : [
        {
            title : "Mode",
            id : 1
        },
        {
            title : "Logout",
            id : 2
        }
    ] }
];




export const dataObj = {1 : navigationLinksForMedical, 2 : navigationLinksForInstitute, 3 : navigationLinksForShops, 4 : navigationLinksForPublic }





export const transactions = [
    {
        id: 11, 
        name: "Sarah Parker",
        image: personsImgs.person_four,
        date: "23/12/04",
        amount: 22000
    },
    {
        id: 12, 
        name: "Krisitine Carter",
        image: personsImgs.person_three,
        date: "23/07/21",
        amount: 20000
    },
    {
        id: 13, 
        name: "Irene Doe",
        image: personsImgs.person_two,
        date: "23/08/25",
        amount: 30000
    }
];

export const reportData = [
    {
        id: 14,
        month: "Jan",
        value1: 45,
        value2: null
    },
    {
        id: 15,
        month: "Feb",
        value1: 45,
        value2: 60
    },
    {
        id: 16,
        month: "Mar",
        value1: 45,
        value2: null
    },
    {
        id: 17,
        month: "Apr",
        value1: 45,
        value2: null
    },
    {
        id: 18,
        month: "May",
        value1: 45,
        value2: null
    }
];

export const budget = [
    {
        id: 19, 
        title: "Subscriptions",
        type: "Automated",
        amount: 22000
    },
    {
        id: 20, 
        title: "Loan Payment",
        type: "Automated",
        amount: 16000
    },
    {
        id: 21, 
        title: "Foodstuff",
        type: "Automated",
        amount: 20000
    },
    {
        id: 22, 
        title: "Subscriptions",
        type: null,
        amount: 10000
    },
    {
        id: 23, 
        title: "Subscriptions",
        type: null,
        amount: 40000
    }
];

export const subscriptions = [
    {
        id: 24,
        title: "LinkedIn",
        due_date: "23/12/04",
        amount: 20000
    },
    {
        id: 25,
        title: "Netflix",
        due_date: "23/12/10",
        amount: 5000
    },
    {
        id: 26,
        title: "DSTV",
        due_date: "23/12/22",
        amount: 2000
    }
];

export const savings = [
    {
        id: 27,
        image: personsImgs.person_one,
        saving_amount: 250000,
        title: "Pay kid bro’s fees",
        date_taken: "23/12/22",
        amount_left: 40000
    }
]