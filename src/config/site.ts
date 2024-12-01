export const siteConfig = {
  name: "Code Cosmos",
  description: "A futuristic portfolio showcasing my journey through the tech universe",
  creator: "Adepu Vaatsava Sri Bhargav",
  url: "https://bhargav-portfolio.vercel.app",
  ogImage: "https://bhargav-portfolio.vercel.app/og.png",
  links: {
    github: "https://github.com/Bhargavvz",
    linkedin: "https://www.linkedin.com/in/bhargavvz/",
    email: "adepuvaatsavasribhargav@gmail.com",
    phone: "+91 9492909351"
  },
  nav: [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" }
  ],
  education: [
    {
      school: "CMR College of Engineering & Technology",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      duration: "Nov 2022 -- Sept 2026",
      location: "Hyderabad, Telangana",
      courses: [
        "Data Structures and Algorithms",
        "Object Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Development",
        "Machine Learning",
        "Artificial Intelligence",
        "Cloud Computing",
        "Computer Architecture",
        "Digital Logic Design",
        "Mathematics for Computing",
        "Probability and Statistics",
        "Professional Ethics"
      ]
    },
    {
      school: "Narayana Junior College",
      degree: "Intermediate, Non-Medical (MPC)",
      duration: "June 2020 -- Sept 2022",
      location: "Hyderabad, Telangana",
      gpa: "89.9%",
      courses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Second Language"
      ]
    },
    {
      school: "Spectra Global Concept School",
      degree: "Secondary School Certificate (SSC)",
      duration: "June 2018 -- March 2020",
      location: "Warangal, Telangana",
      gpa: "10/10",
      courses: [
        "Mathematics",
        "Science",
        "Social Studies",
        "English",
        "Second Language",
        "Computer Science"
      ]
    }
  ],
  skills: {
    categories: [
      {
        title: "Programming Languages",
        items: ["Python", "Java", "C", "C++", "JavaScript", "SQL"]
      },
      {
        title: "Web Development",
        items: ["Node.js", "React", "Spring Boot"]
      },
      {
        title: "Databases",
        items: ["MySQL", "PostgreSQL", "MongoDB"]
      },
      {
        title: "Tools and Frameworks",
        items: ["Docker", "Git", "GitHub"]
      },
      {
        title: "Operating Systems",
        items: ["Linux (Ubuntu)", "Windows", "MacOS"]
      },
      {
        title: "IDE/Tools",
        items: ["VS Code", "Eclipse", "IntelliJ IDEA"]
      }
    ]
  },
  projects: [
      {
        title: 'Communitifx',
        description: 'A community issue reporting website allowing users to raise and track local infrastructure issues.',
        technologies: ['Vite React', 'Spring Boot', 'PostgreSQL', 'Docker'],
        github: 'https://github.com/Bhargavvz/Communitfx',
        image: '/projects/communitifx.jpg'
      },
      {
        title: 'Medi Alert',
        description: 'Web application for medical shops to track medicines, monitor expiry dates, and manage stock effectively.',
        technologies: ['HTML/CSS', 'Flask', 'MySQL'],
        github: 'https://github.com/Bhargavvz/Hack-The-Verse',
        image: '/projects/medialert.jpg'
      },
      {
        title: 'Doctor-Patient Management',
        description: 'Comprehensive system for managing appointments, consultations, and medical records.',
        technologies: ['Angular', 'C#', 'Microsoft SQL Server'],
        github: 'https://github.com/Bhargavvz',
        image: '/projects/healthcare.jpg'
      },
      {
        title: 'Portfolio Website',
        description: 'A modern personal portfolio website showcasing my projects and skills. ',
        technologies: ['React', 'Styled Components', 'Framer Motion'],
        github: 'https://github.com/Bhargavvz',
        image: '/projects/portfolio.jpg'
      },
      {
        title: 'Weather App',
        description: 'An interactive weather application providing real-time weather information and forecasts.',
        technologies: ['React', 'OpenWeatherMap API', 'CSS3'],
        github: 'https://github.com/Bhargavvz',
        image: '/projects/weather.jpg'
      }
      
  ],
  achievements: [
    {
      title: "HackByte 2024",
      position: "2nd Runner-Up",
      organization: "Vellore Institute of Technology, Andhra Pradesh",
      link: "https://link-to-hackbyte-details.com"
    },
    {
      title: "Hack4SDG Hackathon",
      position: "Honorable Mention",
      organization: "IIT Hyderabad, Organized by FCCxAIESEC",
      link: "https://shorturl.at/LpVSy"
    },
    {
      title: "Specathon 2024",
      position: "Finalist",
      organization: "St. Peter's Engineering College, Hyderabad",
      link: "https://shorturl.at/2TF2X"
    },
    {
      title: "Hackwave 2024",
      position: "Top 70 Finalists",
      organization: "Sreenidhi Institute of Science and Technology, Hyderabad",
      link: "https://shorturl.at/2TFX"
    },
    {
      title: "Innovatia 2024",
      position: "Top 70 Finalists",
      organization: "Vasavi College of Engineering, Hyderabad",
      link: "https://shorturl.at/2F2X"
    },
    {
      title: "Intinta Innovation",
      position: "Top 10 Selected Innovators",
      organization: "Warangal District, Telangana",
      link: "https://shorturl.at/WZ30U"
    }
  ]
};
