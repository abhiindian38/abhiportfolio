export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    image: string; // Preview Image (JPG)
    link: string;  // Full Certificate (PDF/Link)
    orientation?: "landscape" | "portrait";
}

export const certificates: Certificate[] = [
    {
        id: "smart-coder",
        title: "Smart Coder (Bronze)",
        issuer: "Smart Interviews",
        date: "2024",
        image: "/smartcoder.jpg",
        link: "/smartcoder.jpg", // Image opens image
        orientation: "landscape",
    },
    {
        id: "meta-frontend",
        title: "Intro to Front-End Development",
        issuer: "Meta / Coursera",
        date: "Jan 11, 2024",
        image: "/Abhishek certificate.jpg",
        link: "/Abhishek certificate .pdf",
        orientation: "landscape",
    },
    {
        id: "iit-bombay",
        title: "CS101.1x Programming Basics",
        issuer: "IIT BombayX",
        date: "Honour Code",
        image: "/Abhishek programming basics.jpg",
        link: "/Abhishek programming basics.pdf",
        orientation: "landscape",
    },
    {
        id: "cisco-c",
        title: "CLA Programming Essentials in C",
        issuer: "Cisco Networking Academy",
        date: "July 29, 2022",
        image: "/ABHISHEK C programming.jpg",
        link: "/ABHISHEK C programming.pdf",
        orientation: "landscape",
    },
    {
        id: "cisco-python",
        title: "PCAP Essentials in Python",
        issuer: "Cisco Networking Academy",
        date: "Jan 30, 2023",
        image: "/Partner-_PCAP_-_Programming_Essentials_in_Python_certificate_217y1a3302-mlritm-ac-in.jpg",
        link: "/Partner-_PCAP_-_Programming_Essentials_in_Python_certificate_217y1a3302-mlritm-ac-in.pdf",
        orientation: "landscape",
    },
];
