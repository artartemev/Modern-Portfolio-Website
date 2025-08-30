// Project interface - updated to match frontend interface
export interface Project {
  id: string;
  name: string;
  year: string | number;
  category: string; // Single category for backend compatibility
  tags: string[];
  description: string;
  status?: 'good' | 'norm' | 'miss';
  theme: string;
  isTop: boolean;
  image?: string;
  link?: string; // External link to case study or project
  live_url?: string;
  github_url?: string;
  client?: string;
  duration?: string;
  role?: string;
  detailContent?: string; // Maps to overview
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  gallery_images?: string[];
  content_blocks?: ContentBlock[]; // New field for structured content blocks
  createdAt: string;
  updatedAt: string;
}

// Content block interface for structured case studies
export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
  name?: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  content: string;
  media: MediaItem[];
  order: number;
}

// Enhanced sample projects with full case study structure
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Bhajan Sangam',
    year: 2024,
    category: 'apps',
    tags: ['React', 'Mobile', 'Music', 'Education', 'PWA'],
    description: 'Мобильное приложение как цифровое пространство для вайшнавской духовной музыки. Объединяет тексты, переводы и музыкальные аккорды в единый инструмент.',
    status: 'good',
    theme: 'Light & Clean',
    isTop: true,
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU1NTExMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://bhajan-sangam.vercel.app',
    live_url: 'https://bhajan-sangam.vercel.app',
    github_url: 'https://github.com/username/bhajan-sangam',
    client: 'Персональный проект',
    duration: '3 месяца',
    role: 'Full-Stack Developer, UI/UX Designer, Product Manager',
    overview: 'Bhajan Sangam — это мобильное приложение, созданное как цифровое пространство для вайшнавской духовной музыки. Цель проекта — объединить разрозненные тексты, переводы и музыкальные аккорды в единый, интуитивно понятный инструмент для обучения и практики. В этом проекте я выступил в роли единственного создателя, объединив три ключевые функции: как Менеджер сформулировал видение продукта и дорожную карту, как UI/UX Дизайнер разработал весь пользовательский опыт, как Разработчик написал приложение с нуля.',
    challenge: 'Основная проблема заключалась в том, что музыканты и практикующие должны были использовать множество разрозненных источников: печатные сборники для текстов, отдельные приложения для аккордов, и различные сайты для переводов. Это создавало фрагментированный опыт обучения и практики. Дополнительно, большинство существующих решений не поддерживали интерактивные аккорды и не были оптимизированы для мобильных устройств.',
    solution: 'Создал unified digital platform с тремя ключевыми инновациями: интерактивные аккорды (динамические схемы для гитары, укулеле и фортепиано), продвинутую фильтрацию (мгновенный поиск по автору, типу и раге), и кроссплатформенность (PWA с возможностью упаковки в APK). Приложение спроектировано с фокусом на минималистичный интерфейс для концентрации на практике.',
    results: 'Создано быстрое, современное и полезное приложение, которое полностью выполняет свою задачу. Успешно развернуто как PWA и упаковано в Android APK. Проект демонстрирует способность самостоятельно провести продукт через все стадии разработки: от идеи до работающего мобильного приложения. Получил положительную обратную связь от целевой аудитории.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Capacitor', 'PWA'],
    gallery_images: [
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=500&fit=crop'
    ],
    content_blocks: [
      {
        id: 'block-1',
        title: 'Описание проекта',
        content: 'Bhajan Sangam — это инновационное мобильное приложение, разработанное специально для изучения и практики вайшнавской духовной музыки. Приложение представляет собой цифровое пространство, где объединены тексты священных бхаджанов, их переводы на различные языки и музыкальные аккорды для разных инструментов.',
        media: [
          {
            id: 'media-1',
            url: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop',
            type: 'image',
            name: 'Main Interface'
          }
        ],
        order: 0
      },
      {
        id: 'block-2',
        title: 'Задача',
        content: 'Музыканты и практикующие сталкивались с необходимостью использования множества разрозненных источников: печатные сборники для текстов, отдельные приложения для аккордов, различные сайты для переводов. Это создавало фрагментированный опыт обучения.',
        media: [
          {
            id: 'media-2',
            url: 'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&h=1200&fit=crop',
            type: 'image',
            name: 'Problem Illustration'
          }
        ],
        order: 1
      },
      {
        id: 'block-3',
        title: 'Процесс',
        content: 'Разработка включала исследование пользователей, создание интерактивных прототипов, разработку системы аккордов для разных инструментов и оптимизацию для мобильных устройств. Особое внимание уделялось минималистичному дизайну для концентрации на практике.',
        media: [],
        order: 2
      },
      {
        id: 'block-4',
        title: 'Результат',
        content: 'Создано быстрое, современное и полезное приложение, которое полностью выполняет свою задачу. Успешно развернуто как PWA и упаковано в Android APK. Получена положительная обратная связь от целевой аудитории.',
        media: [
          {
            id: 'media-3',
            url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=500&fit=crop',
            type: 'image',
            name: 'Final Result'
          }
        ],
        order: 3
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'FinTech Analytics Dashboard',
    year: 2024,
    category: 'web',
    tags: ['Dashboard', 'Analytics', 'FinTech', 'Real-time', 'Data Visualization'],
    description: 'Комплексная аналитическая платформа для финансовых данных с real-time мониторингом и продвинутой визуализацией метрик.',
    status: 'good',
    theme: 'Dark & Modern',
    isTop: true,
    image: 'https://images.unsplash.com/photo-1651129526361-d31cd025e662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU1NzQ4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    live_url: 'https://fintech-dashboard-demo.vercel.app',
    github_url: 'https://github.com/username/fintech-dashboard',
    client: 'Startup FinanceFlow',
    duration: '4 месяца',
    role: 'Lead Developer, UI/UX Designer',
    overview: 'FinTech Analytics Dashboard — это комплексная аналитическая платформа, разработанная для финтех-стартапа FinanceFlow. Проект решает проблему фрагментированной аналитики финансовых данных, объединяя multiple data sources в единый, интуитивно понятный интерфейс. Платформа обеспечивает real-time мониторинг ключевых метрик, продвинутую визуализацию данных и customizable dashboards для различных ролей пользователей.',
    challenge: 'Команда FinanceFlow сталкивалась с проблемой разрозненных источников финансовых данных: транзакции хранились в одной системе, аналитика клиентов — в другой, а отчеты генерировались вручную в Excel. Процесс принятия решений занимал слишком много времени из-за необходимости manually aggregate data из различных источников. Дополнительно, существующие решения были либо слишком дорогими, либо не соответствовали специфическим потребностям стартапа.',
    solution: 'Разработал unified analytics platform с тремя core компонентами: Real-time Data Processing Engine (обработка данных в реальном времени с использованием WebSockets), Interactive Visualization Library (custom-built charts и графики с возможностью drill-down), и Role-based Dashboard System (персонализированные дашборды для executives, analysts и операторов). Использовал microservices архитектуру для масштабируемости и React с TypeScript для типобезопасного frontend.',
    results: 'Платформа сократила время генерации отчетов с 4 часов до 30 секунд и увеличила скорость принятия бизнес-решений на 60%. Внедрение привело к выявлению previously hidden patterns в customer behavior, что помогло увеличить retention на 25%. Проект получил положительную оценку от investors и стал ключевым фактором в привлечении Series A раунда.',
    technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'GraphQL', 'WebSocket', 'PostgreSQL', 'Docker'],
    gallery_images: [
      'https://images.unsplash.com/photo-1651129526361-d31cd025e662?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1730794545099-14902983739d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558092535-648ec3c50158?w=800&h=900&fit=crop'
    ],
    content_blocks: [
      {
        id: 'block-1',
        title: 'Обзор проекта',
        content: 'FinTech Analytics Dashboard представляет собой комплексное решение для анализа финансовых данных в реальном времени. Платформа объединяет различные источники данных и предоставляет интуитивно понятный интерфейс для принятия бизнес-решений.',
        media: [
          {
            id: 'media-1',
            url: 'https://images.unsplash.com/photo-1651129526361-d31cd025e662?w=800&h=600&fit=crop',
            type: 'image',
            name: 'Dashboard Overview'
          }
        ],
        order: 0
      },
      {
        id: 'block-2',
        title: 'Архитектура системы',
        content: 'Система построена на микросервисной архитектуре с использованием современных технологий. Real-time обработка данных обеспечивается через WebSocket соединения, а интерактивная визуализация реализована с помощью D3.js.',
        media: [
          {
            id: 'media-2',
            url: 'https://images.unsplash.com/photo-1730794545099-14902983739d?w=800&h=500&fit=crop',
            type: 'image',
            name: 'System Architecture'
          }
        ],
        order: 1
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'E-Commerce Mobile Experience',
    year: 2023,
    category: 'apps',
    tags: ['E-commerce', 'Mobile', 'AI', 'UX', 'React Native'],
    description: 'Революционное мобильное приложение для e-commerce с AI-powered рекомендациями и seamless checkout процессом.',
    status: 'good',
    theme: 'Light & Clean',
    isTop: true,
    image: 'https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlY29tbWVyY2UlMjBtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU1NzIxOTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    live_url: 'https://apps.apple.com/app/shopmate-app',
    client: 'ShopMate Technologies',
    duration: '6 месяцев',
    role: 'Mobile App Developer, UX Researcher',
    overview: 'E-Commerce Mobile Experience — это революционное мобильное приложение, созданное для ShopMate Technologies с целью redefine mobile shopping experience. Проект фокусируется на создании personalized, intelligent и seamless shopping journey through AI-powered recommendations, intuitive navigation и frictionless checkout process. Приложение разработано с deep focus на user psychology и mobile-first approach.',
    challenge: 'ShopMate сталкивалась с high cart abandonment rates (73%) и low mobile conversion rates по сравнению с desktop версией. Пользователи жаловались на сложный checkout процесс, irrelevant product recommendations и общий fragmented experience. Конкуренты предлагали generic solutions, но не учитывали unique behavior patterns мобильных пользователей. Дополнительно, необходимо было интегрировать существующую inventory management system.',
    solution: 'Разработал intelligent mobile platform с четырьмя key innovations: AI-Powered Personalization Engine (machine learning алгоритмы для анализа user behavior и персонализированных рекомендаций), One-Touch Checkout System (streamlined процесс оплаты с biometric authentication), Smart Search & Discovery (visual search и voice commands), и Social Shopping Features (peer reviews и social proof elements). Использовал React Native для cross-platform development и TensorFlow.js для on-device AI.',
    results: 'Приложение достигло 40% увеличения mobile conversion rate и снизило cart abandonment до 45%. Average session duration увеличилась на 65%, а user retention через 30 дней составила 78%. AI рекомендательная система показала 35% click-through rate на suggested products. Приложение получило 4.8★ rating в App Store и было featured в категории "Best New Apps". Проект привлек дополнительные $2M инвестиций для компании.',
    technologies: ['React Native', 'TypeScript', 'TensorFlow.js', 'Firebase', 'Stripe', 'GraphQL', 'Redux', 'Expo'],
    gallery_images: [
      'https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=800&h=500&fit=crop'
    ],
    content_blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Sustainable Tech Brand Identity',
    year: 2023,
    category: 'identity',
    tags: ['Branding', 'Sustainability', 'Visual Identity', 'Clean Tech'],
    description: 'Комплексная brand identity для стартапа в области clean technology с фокусом на экологичность и инновации.',
    status: 'norm',
    theme: 'Mixed Styles',
    isTop: false,
    image: 'https://images.unsplash.com/photo-1749104953185-d171e149ccb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nbyUyMGRlc2lnbnxlbnwxfHx8fDE3NTU3NDg3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    link: 'https://behance.net/gallery/cleantech-branding',
    client: 'GreenTech Innovations',
    duration: '2 месяца',
    role: 'Brand Designer, Visual Identity Specialist',
    overview: 'Sustainable Tech Brand Identity — это comprehensive branding project для стартапа GreenTech Innovations, специализирующегося на renewable energy solutions. Проект включал создание complete visual identity system: от logo design до comprehensive brand guidelines, отражающих core values компании: sustainability, innovation и technological excellence. Цель — создать memorable и authentic brand presence в competitive cleantech market.',
    challenge: 'GreenTech Innovations входила в saturated market с множеством competitors, использующих generic "green" imagery и cliché sustainability symbols. Компании нужна была distinctive visual identity, которая бы conveyed technological sophistication без потери connection к environmental values. Дополнительная сложность — необходимость работать across multiple touchpoints от digital platforms до industrial equipment, maintaining consistency и recognition.',
    solution: 'Разработал sophisticated brand system, основанный на концепции "Intelligent Nature" — fusion of organic forms с technological precision. Created modular logo system с adaptive variations, developed unique color palette, основанную на natural energy spectrums, и established typography hierarchy, балансирующую modern tech aesthetic с organic warmth. Включил comprehensive guideline system для consistent implementation across all media.',
    results: 'Brand identity помогла GreenTech Innovations выделиться на market и привлечь attention key investors и partners. Компания сообщила о 45% увеличении brand recognition и 60% improvement в lead quality после rebrand launch. Visual identity была применена в successful Series A pitch presentation, которая привлекла $5M инвестиций. Проект получил Design Award recognition в категории "Sustainable Branding".',
    technologies: ['Adobe Creative Suite', 'Figma', 'After Effects', 'Principle'],
    gallery_images: [
      'https://images.unsplash.com/photo-1749104953185-d171e149ccb5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616205255812-c07c8102cc02?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&h=900&fit=crop'
    ],
    content_blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Agile Project Management Platform',
    year: 2022,
    category: 'management',
    tags: ['Project Management', 'Enterprise', 'Collaboration', 'Agile'],
    description: 'Enterprise-level project management платформа с advanced collaboration tools и AI-powered project insights.',
    status: 'norm',
    theme: 'Light & Clean',
    isTop: false,
    image: 'https://images.unsplash.com/photo-1558092535-648ec3c50158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTU2NDg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    live_url: 'https://projecthub-enterprise.com',
    github_url: 'https://github.com/username/project-hub',
    client: 'Enterprise Solutions Corp',
    duration: '8 месяцев',
    role: 'Technical Lead, System Architect',
    overview: 'Agile Project Management Platform — это comprehensive enterprise solution, разработанная для large-scale organizations, нуждающихся в sophisticated project coordination и team collaboration. Платформа объединяет traditional project management с modern agile methodologies, providing real-time insights, automated workflow management и advanced analytics для improved decision making и team productivity.',
    challenge: 'Enterprise Solutions Corp управляла 50+ simultaneous projects с 200+ team members, используя fragmented tools: Jira для task tracking, Slack для communication, Excel для reporting, и email для approvals. Это создавало information silos, delayed decision making и reduced team productivity. Management не имела real-time visibility в project progress и resource allocation, что приводило к budget overruns и missed deadlines.',
    solution: 'Создал unified project ecosystem с integrated modules: Advanced Task Management (customizable workflows с automated assignments), Real-time Collaboration Hub (integrated chat, video calls, и document sharing), AI-Powered Analytics (predictive insights для project risks и resource optimization), и Enterprise Integration Layer (seamless connection с existing tools through APIs). Использовал microservices architecture для scalability и implemented robust security measures для enterprise compliance.',
    results: 'Платформа привела к 35% увеличению team productivity и 50% сокращению project delivery time. Project success rate увеличился с 67% до 89%, а budget accuracy улучшился на 40%. AI insights помогли prevent 23 potential project delays through early risk detection. Система была adopted across 5 departments и became standard tool для всех major projects. ROI составил 300% within первого года использования.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'GraphQL', 'WebSocket'],
    gallery_images: [
      'https://images.unsplash.com/photo-1558092535-648ec3c50158?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1651129526361-d31cd025e662?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1730794545099-14902983739d?w=800&h=900&fit=crop'
    ],
    content_blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Developer Portfolio Platform',
    year: 2024,
    category: 'web',
    tags: ['Portfolio', 'Open Source', 'Developer Tools', 'Customization'],
    description: 'Open-source платформа для создания interactive developer portfolios с advanced customization возможностями.',
    status: 'good',
    theme: 'Dark & Modern',
    isTop: false,
    image: 'https://images.unsplash.com/photo-1742072594003-abf6ca86e154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NTU3NDg3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    live_url: 'https://devportfolio-platform.com',
    github_url: 'https://github.com/username/devportfolio-platform',
    client: 'Open Source Community',
    duration: '5 месяцев',
    role: 'Full-Stack Developer, Open Source Maintainer',
    overview: 'Developer Portfolio Platform — это open-source solution, созданная для developer community с целью democratize access к professional portfolio creation. Платформа предоставляет no-code/low-code approach для building sophisticated developer portfolios с advanced features: interactive project showcases, integrated blog система, analytics tracking и seamless deployment options.',
    challenge: 'Многие developers, особенно junior level, struggle с созданием professional portfolios из-за необходимости design skills или expensive tools. Existing solutions были либо слишком generic (template-based), либо required significant development time. Community нуждалась в flexible, customizable platform, которая бы позволяла showcase technical projects effectively без sacrificing personalization и professional appearance.',
    solution: 'Разработал modular platform architecture с drag-and-drop interface, comprehensive component library, и powerful customization engine. Включил GitHub integration для automatic project imports, built-in analytics system, SEO optimization tools, и one-click deployment на multiple platforms. Created extensive documentation и tutorial system для easy onboarding. Использовал modern tech stack для performance и maintainability.',
    results: 'Platform была adopted более чем 1,200 developers в первые 6 месяцев после launch. Получила 800+ GitHub stars и 15+ community contributors. Users reported 60% faster portfolio creation time и 40% increase в job interview callbacks after using platform-generated portfolios. Project была featured в several developer newsletters и conferences, establishing strong community presence.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel', 'GitHub API'],
    gallery_images: [
      'https://images.unsplash.com/photo-1742072594003-abf6ca86e154?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=800&h=500&fit=crop'
    ],
    content_blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];