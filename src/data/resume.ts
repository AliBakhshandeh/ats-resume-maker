import type { PrintSettings, ResumeData, ResumeSettings } from "@/types/resume";

export const resumeSettings: ResumeSettings = {
  showSummary: true,
  showSkills: true,
  showProjects: true,
  showEducation: false,
  showLanguages: false,
};

export const printSettings: PrintSettings = {
  pageSize: "A4",
  bodyFontSize: 8.6,
  contentPaddingMm: 7,
};

export const resumeData: ResumeData = {
  personal: {
    fullName: "Ali Bakhshandeh Ardestani",
    headline: "Senior Frontend Engineer | Frontend Team Lead",
    email: "alibakhshandehardestani@gmail.com",
    phone: "+98 936 487 0704",
    location: "Tehran, Iran",
    links: [
      {
        label: "Portfolio",
        href: "https://alibakhshandeh.vercel.app/",
        displayValue: "alibakhshandeh.vercel.app",
      },
      {
        label: "GitHub",
        href: "https://github.com/AliBakhshandeh",
        displayValue: "github.com/AliBakhshandeh",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ali-bakhshandeh-ardestani/",
        displayValue: "linkedin.com/in/ali-bakhshandeh-ardestani",
      },
    ],
  },
  summary:
    "Senior Frontend Engineer and Frontend Team Lead with hands-on experience building React, Next.js, and TypeScript products in fintech and healthcare. I focus on clear frontend architecture, reliable user experiences, performance, authentication flows, and practical technical leadership that helps teams ship with confidence.",
  skills: [
    {
      title: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Storybook",
        "MUI",
        "Zustand",
        "SignalR",
        "WebSocket",
        "NextAuth.js",
        "PWA",
        "TWA",
        "Bubblewrap",
      ],
    },
    {
      title: "Others",
      items: ["Node.js", "NestJS", "Express", "MongoDB", "Docker", "CI/CD", "Git"],
    },
  ],
  experience: [
    {
      company: "Bitex (Pooleno)",
      companyUrl: "https://pooleno.ir",
      title: "Frontend Team Lead",
      startDate: "2024",
      endDate: "Present",
      current: true,
      technologies: [],
      highlights: [
        {
          text: "Migrated a legacy **React and JavaScript** application to **Next.js and TypeScript**, making the codebase easier to maintain, scale, and extend.",
          enabled: true,
        },
        {
          text: "Introduced **SSR, SSG, and ISR** and redesigned a **modular frontend architecture** around product, performance, and SEO requirements.",
          enabled: false,
        },
        {
          text: "Designed a **flat, modular, and reusable frontend architecture**, improving **code discoverability and team productivity**.",
          enabled: false,
        },
        {
          text: "Built a shared **design system package with Storybook**, standardizing **reusable UI components** and product-wide visual language.",
          enabled: false,
        },
        {
          text: "Worked closely with backend engineers to build secure **authentication and authorization** flows with **Keycloak, NextAuth.js, OAuth 2.0**, and **BFF architecture**.",
          enabled: true,
        },
        {
          text: "Delivered core fintech features such as **Stop Orders, wallet flows, notifications, and custom financial charts** with a focus on clarity and reliability.",
          enabled: true,
        },
        {
          text: "Prepared and extended an **open-source World Cup game** for production, helping it reach **more than 72,455 participants** and **9,664 peak daily users**.",
          enabled: true,
        },
        {
          text: "Implemented **PWA** and **Trusted Web Activity** capabilities with **Bubblewrap** and delivered real-time product features using **WebSocket**.",
          enabled: false,
        },
        {
          text: "Led **frontend technical decisions, code reviews, implementation planning, and reusable engineering practices** across the team.",
          enabled: true,
        },
        {
          text: "Mentored a frontend intern in **JavaScript, TypeScript, Next.js, and algorithm fundamentals**, supporting their progression into a **full-time Junior Frontend Developer** role.",
          enabled: false,
        },
      ],
    },
    {
      company: "Tapsi Doctor",
      companyUrl: "https://tapsi.doctor",
      title: "Senior Frontend Engineer",
      startDate: "2023",
      endDate: "2024",
      compact: false,
      shortDescription:
        "Built **real-time chat**, improved **Core Web Vitals**, and helped shape frontend foundations for healthcare dashboards.",
      technologies: [
        "React",
        "TypeScript",
        "SignalR",
        "WebSocket",
        "Docker",
        "Web Vitals",
      ],
      highlights: [
        {
          text: "Built a **real-time one-to-one chat** experience with **SignalR and WebSocket**, giving patients and providers a smoother, low-latency communication flow.",
          enabled: true,
        },
        {
          text: "Improved **Lighthouse and Core Web Vitals** by more than **70%**, reaching **near-zero CLS** and **sub-second LCP**.",
          enabled: true,
        },
        {
          text: "Containerized frontend applications with **Docker** so staging and production environments stayed predictable and easier to manage.",
          enabled: true,
        },
        {
          text: "Implemented **Service Workers** and **caching strategies** to improve reliability and repeat-visit performance.",
          enabled: false,
        },
        {
          text: "Designed and implemented the **frontend architecture** for an internal operations dashboard.",
          enabled: false,
        },
      ],
    },
    {
      company: "PodroCo",
      companyUrl: "https://podro.com",
      title: "Senior Frontend Engineer",
      startDate: "2022",
      endDate: "2023",
      compact: false,
      shortDescription:
        "Improved a **social-commerce platform** by focusing on load speed, caching, code splitting, and cleaner API usage.",
      technologies: [
        "React",
        "Next.js",
        "JavaScript",
        "Caching",
        "Code Splitting",
        "REST APIs",
      ],
      highlights: [
        {
          text: "Added practical **caching** and **code-splitting** improvements that raised the platform's **Google PageSpeed Insights** performance score.",
          enabled: true,
        },
        {
          text: "Reduced **page-load time by 40%** and helped increase **user engagement by 25%** through targeted frontend optimizations.",
          enabled: true,
        },
        {
          text: "Worked with backend engineers to improve **API usage and data-fetching flows**, making key platform interactions faster and more efficient.",
          enabled: true,
        },
      ],
    },
    {
      company: "Yarhis",
      companyUrl: "https://yarhis.ir",
      title: "Frontend Team Lead",
      startDate: "2021",
      endDate: "2022",
      compact: false,
      shortDescription:
        "Led frontend work for a healthcare **PWA**, configuration-driven interfaces, and the migration of older jQuery flows to React and TypeScript.",
      technologies: [
        "React",
        "TypeScript",
        "Material-UI",
        "PWA",
        "jQuery",
        "NestJS",
      ],
      highlights: [
        {
          text: "Built a **configuration-driven data-display system** that reduced repetitive JSX and made new frontend features faster to deliver.",
          enabled: true,
        },
        {
          text: "Designed the **frontend architecture** for a healthcare **PWA** using **Material UI and Service Workers**.",
          enabled: true,
        },
        {
          text: "Rebuilt a legacy **jQuery-based healthcare workflow** in **React and TypeScript**, improving **type safety, maintainability, and team consistency**.",
          enabled: true,
        },
        {
          text: "Built a **NestJS-based internal application** for managing vendor requests and streamlining operational communication.",
          enabled: false,
        },
      ],
    },
    {
      company: "Ariana Labs",
      title: "Frontend Developer",
      startDate: "2020",
      endDate: "2021",
      compact: true,
      shortDescription:
        "Built **React and Redux** applications, configuration-driven forms, and Leaflet-based map interfaces for healthcare workflows.",
      technologies: [
        "JavaScript",
        "React",
        "Redux",
        "Webpack",
        "MUI",
        "Leaflet",
      ],
      highlights: [
        {
          text: "Developed and maintained **scalable web applications** with **React, Redux, Webpack, Material UI, and Styled Components**.",
          enabled: true,
        },
        {
          text: "Implemented a **configuration-driven form builder** that simplified **multi-tab forms and data-entry workflows**.",
          enabled: true,
        },
        {
          text: "Built **Leaflet-based map interfaces** for locating and displaying nearby healthcare centers.",
          enabled: true,
        },
      ],
    },
    {
      company: "Idea System Processor (ISP)",
      title: "Frontend Developer",
      startDate: "2017",
      endDate: "2020",
      compact: true,
      shortDescription:
        "Built responsive web interfaces with **Yii2, Twig, JavaScript, Bootstrap, jQuery, and CSS animations**.",
      technologies: [
        "Yii2",
        "Twig",
        "JavaScript",
        "Bootstrap",
        "jQuery",
        "CSS",
      ],
      highlights: [
        {
          text: "Developed responsive web application interfaces using **Yii2 and Twig**.",
          enabled: true,
        },
        {
          text: "Implemented interactive frontend features with **JavaScript, Bootstrap, and jQuery**.",
          enabled: true,
        },
        {
          text: "Created **responsive pages** and **CSS animations** to improve usability and visual feedback.",
          enabled: true,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Zarline",
      description:
        "Developed a gold-trading platform with real-time pricing, order-management flows, PWA support, and a B2B dashboard for store sales and daily business operations.",
      url: "https://zarline.shop",
      technologies: ["React", "PWA", "B2B Dashboard", "Real-time UI"],
      enabled: true,
      highlights: [],
    },
    {
      name: "Fundit",
      description:
        "Built frontend features for an investment platform where users could invest in small retail stores, including data-driven workflows, dynamic tables, and configurable investment forms.",
      technologies: ["React", "Dynamic Tables", "JSON Forms", "Data UI"],
      enabled: true,
      highlights: [],
    },
  ],
};

export const resumeDataFa: ResumeData = {
  personal: {
    fullName: "علی بخشنده اردستانی",
    headline: "مهندس ارشد فرانت‌اند | لید تیم فرانت‌اند",
    email: "alibakhshandehardestani@gmail.com",
    phone: "+98 936 487 0704",
    location: "تهران، ایران",
    links: [
      {
        label: "alibakhshandeh.vercel.app",
        href: "https://alibakhshandeh.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/AliBakhshandeh",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ali-bakhshandeh-ardestani/",
      },
    ],
  },
  summary:
    "مهندس ارشد فرانت‌اند و لید تیم با تجربه عملی در ساخت محصولات React، Next.js و TypeScript در حوزه‌های فین‌تک و سلامت. تمرکزم روی معماری شفاف، تجربه کاربری قابل اعتماد، عملکرد بهتر، پیاده‌سازی جریان‌های احراز هویت و کمک به تیم برای تحویل مطمئن‌تر محصول است.",
  skills: [
    {
      title: "فرانت‌اند",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "Storybook",
        "MUI",
        "Zustand",
        "SignalR",
        "WebSocket",
        "NextAuth.js",
        "PWA",
        "TWA",
        "Bubblewrap",
      ],
    },
    {
      title: "بک‌اند",
      items: [ "Node.js", "NestJS", "Express", "MongoDB","Docker", "CI/CD", "Git"],
    }
  ],
  experience: [
    {
      company: "Bitex (Pooleno)",
      companyUrl: "https://pooleno.ir",
      title: "مهندس ارشد فرانت‌اند | لید تیم فرانت‌اند",
      startDate: "2024",
      endDate: "اکنون",
      current: true,
      technologies: [],
      highlights: [
        {
          text: "مهاجرت یک اپلیکیشن Legacy مبتنی بر **React و JavaScript** به **Next.js و TypeScript** و ساده‌تر کردن نگهداری، توسعه و گسترش کدبیس.",
          enabled: true,
        },
        {
          text: "همکاری نزدیک با تیم بک‌اند برای ساخت جریان‌های امن **Authentication و Authorization** با **Keycloak، NextAuth.js، OAuth 2.0** و معماری **BFF**.",
          enabled: true,
        },
        {
          text: "پیاده‌سازی قابلیت‌های اصلی فین‌تک مثل **Stop Orders، فرایندهای کیف پول، اعلان‌ها و چارت‌های مالی اختصاصی** با تمرکز روی وضوح و پایداری تجربه کاربر.",
          enabled: true,
        },
        {
          text: "آماده‌سازی و توسعه یک **بازی متن‌باز جام جهانی** برای production که به **بیش از 72,455 شرکت‌کننده** و **9,664 کاربر روزانه در اوج** رسید.",
          enabled: true,
        },
        {
          text: "هدایت **تصمیم‌های فنی فرانت‌اند، code review، برنامه‌ریزی پیاده‌سازی و الگوهای قابل استفاده مجدد** در تیم.",
          enabled: true,
        },
      ],
    },
    {
      company: "Tapsi Doctor",
      companyUrl: "https://tapsi.doctor",
      title: "مهندس ارشد فرانت‌اند",
      startDate: "2023",
      endDate: "2024",
      compact: false,
      shortDescription:
        "توسعه **چت Real-time**، بهبود **Core Web Vitals** و مشارکت در شکل‌دهی پایه‌های فرانت‌اند داشبوردهای حوزه سلامت.",
      technologies: [],
      highlights: [
        {
          text: "توسعه تجربه **چت یک‌به‌یک Real-time** با **SignalR و WebSocket** برای ارتباط روان‌تر و کم‌تاخیر بین کاربر و پزشک.",
          enabled: true,
        },
        {
          text: "بهبود بیش از **70%** در **Lighthouse و Core Web Vitals** و رسیدن به **CLS نزدیک به صفر** و **LCP زیر یک ثانیه**.",
          enabled: true,
        },
        {
          text: "Containerize کردن اپلیکیشن‌های فرانت‌اند با **Docker** برای پایدارتر و قابل پیش‌بینی‌تر شدن محیط‌های **staging و production**.",
          enabled: true,
        },
      ],
    },
    {
      company: "PodroCo",
      companyUrl: "https://podro.com",
      title: "مهندس ارشد فرانت‌اند",
      startDate: "2022",
      endDate: "2023",
      compact: false,
      shortDescription:
        "بهبود یک پلتفرم social-commerce با تمرکز روی سرعت بارگذاری، caching، code splitting و مصرف بهینه‌تر API.",
      technologies: [],
      highlights: [
        {
          text: "پیاده‌سازی بهبودهای کاربردی در **caching** و **code splitting** برای افزایش امتیاز عملکرد در **Google PageSpeed Insights**.",
          enabled: true,
        },
        {
          text: "کاهش **40% زمان بارگذاری صفحه** و کمک به افزایش **25% engagement کاربران** با بهینه‌سازی‌های هدفمند فرانت‌اند.",
          enabled: true,
        },
        {
          text: "همکاری با تیم بک‌اند برای بهبود **مصرف API و جریان‌های data fetching** و سریع‌تر شدن تعاملات اصلی پلتفرم.",
          enabled: true,
        },
      ],
    },
    {
      company: "Yarhis",
      companyUrl: "https://yarhis.ir",
      title: "لید تیم فرانت‌اند",
      startDate: "2021",
      endDate: "2022",
      compact: false,
      shortDescription:
        "هدایت توسعه فرانت‌اند برای یک PWA حوزه سلامت، ساخت UIهای مبتنی بر configuration و مهاجرت جریان‌های قدیمی jQuery به React و TypeScript.",
      technologies: [],
      highlights: [
        {
          text: "ساخت سیستم **نمایش داده مبتنی بر configuration** که کدهای JSX تکراری را کمتر کرد و تحویل قابلیت‌های جدید را سریع‌تر کرد.",
          enabled: true,
        },
        {
          text: "طراحی **معماری فرانت‌اند** برای یک **PWA حوزه سلامت** با استفاده از **Material UI و Service Workers**.",
          enabled: true,
        },
        {
          text: "بازنویسی یک workflow قدیمی مبتنی بر **jQuery** در **React و TypeScript** برای بهتر شدن **type safety، نگهداشت‌پذیری و هماهنگی تیم توسعه**.",
          enabled: true,
        },
      ],
    },
    {
      company: "Ariana Labs",
      title: "توسعه‌دهنده فرانت‌اند",
      startDate: "2020",
      endDate: "2021",
      compact: true,
      shortDescription:
        "ساخت اپلیکیشن‌های **React و Redux**، فرم‌های مبتنی بر configuration و رابط‌های نقشه با Leaflet برای جریان‌های حوزه سلامت.",
      technologies: [],
      highlights: [],
    },
    {
      company: "Idea System Processor (ISP)",
      title: "توسعه‌دهنده فرانت‌اند",
      startDate: "2017",
      endDate: "2020",
      compact: true,
      shortDescription:
        "توسعه رابط‌های responsive با **Yii2، Twig، JavaScript، Bootstrap، jQuery و CSS animations**.",
      technologies: [],
      highlights: [],
    },
  ],
  projects: [
    {
      name: "Zarline",
      description:
        "توسعه پلتفرم معاملات طلا با قیمت‌گذاری Real-time، مدیریت سفارش، پشتیبانی PWA و داشبورد B2B برای مدیریت فروش فروشگاه‌ها و عملیات روزمره کسب‌وکار.",
      url: "https://zarline.shop",
      enabled: true,
      highlights: [],
    },
    {
      name: "Fundit",
      description:
        "توسعه قابلیت‌های فرانت‌اند برای پلتفرمی که امکان سرمایه‌گذاری روی فروشگاه‌های خرده‌فروشی را فراهم می‌کرد؛ شامل workflowهای داده‌محور، جدول‌های پویا و فرم‌های configurable سرمایه‌گذاری.",
      enabled: true,
      highlights: [],
    },
  ],
};
