export interface NavItem {
  name: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  image: string;
}

export interface Achievement {
  title: string;
  position: string;
  organization: string;
  link: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  creator: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  nav: NavItem[];
  projects: Project[];
  achievements: Achievement[];
  skills: string[];
}
