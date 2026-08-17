export interface ExperienceEntry {
  readonly title: string;
  readonly company: string;
  readonly dates: string;
  readonly descriptions: readonly string[];
  readonly technologies: readonly string[];
}

export interface PortfolioEntry {
  readonly title: string;
  readonly url: string;
  readonly description: string;
}

export interface EducationEntry {
  readonly degree: string;
  readonly institution: string;
  readonly dates: string;
}

export const EXPERIENCE_ENTRIES: readonly ExperienceEntry[] = [
  {
    title: 'AI Advisor',
    company: 'Toptal Client',
    dates: '2026',
    descriptions: [
      "Partnered with managers and engineers to assess the company's AI pipeline, surfacing its pitfalls and inefficiencies",
      'Researched and delivered battle-tested strategies improving the consistency and accuracy of the AI pipeline',
      "Delivered the final AI pipeline design with robust safeguards, cutting the size of the AI's instructions by over 90%",
    ],
    technologies: [
      'LLMs',
      'AI Architecture',
      'Prompt Engineering',
      'Systems Optimization',
    ],
  },
  {
    title: 'Head of AI',
    company: 'Toptal Client',
    dates: '2026',
    descriptions: [
      'Devised the POC and MVP strategy and documentation for a new AI-driven technology',
      'Designed and oversaw a series of case studies and experiments that culminated in a successful POC',
      'Drove the POC and MVP work in direct partnership with the CEO',
      'Operated as both leader and hands-on engineer, directing a PhD-level engineer on technical execution',
    ],
    technologies: [
      'LLMs',
      'AI',
      'RLHF',
      'Prompt Engineering',
      'POC/MVP Development',
      'Technical Leadership',
    ],
  },
  {
    title: 'AI Consultant',
    company: 'Toptal Client',
    dates: '2025',
    descriptions: [
      'Delivered a prototype platform that automated LLC formation workflows, cutting manual research time by over 50%',
      'Built an AI-driven validation step that vetted user inputs and flagged compliance gaps during the LLC creation process',
      'Designed a domain-specific knowledge base and an intelligent AI search system that delivered precise, context-aware guidance',
    ],
    technologies: [
      'Python',
      'LLMs',
      'RAG',
      'NLP',
      'Prompt Engineering',
      'Vector Databases',
      'Knowledge Base Design',
    ],
  },
  {
    title: 'AI Software Developer',
    company: 'Toptal Client',
    dates: '2023 - 2024',
    descriptions: [
      'Built from scratch a platform that converted contract requirement documents into structured suggestions and clarification questions',
      'Engineered self-scaling cloud infrastructure for high-throughput document processing with near-zero downtime',
      'Owned the end-to-end AI architecture and served as the primary expert on all AI matters',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'Django',
      'React',
      'OpenAI API',
      'LLMs',
      'Amazon ECS',
      'Docker',
    ],
  },
  {
    title: 'Lead Data Scientist',
    company: 'Deloitte Contractor',
    dates: '2021 - 2022',
    descriptions: [
      'Designed and delivered multiple natural language processing models through to production deployment',
      'Partnered with stakeholders to define use cases and chart the pathway to product development',
      'Mentored and developed the junior data scientists on the team',
    ],
    technologies: [
      'Python',
      'NLP',
      'Machine Learning',
      'Model Deployment',
      'Data Analysis',
    ],
  },
  {
    title: 'Enterprise Lead Data Architect',
    company: 'Toptal Client',
    dates: '2020 - 2022',
    descriptions: [
      "Owned the architecture, development, and automation of the enterprise's cloud data platform",
      'Delivered automated, scalable cloud infrastructure that responded elastically to development and consumer demand',
      'Co-managed and supervised a team of engineers from designing and delegating tasks to mentoring',
    ],
    technologies: [
      'Python',
      'AWS',
      'Amazon EMR',
      'Spark',
      'Distributed Computing',
      'Data Lake Architecture',
      'Cloud Infrastructure',
    ],
  },
  {
    title: 'Enterprise Senior ETL and Data Engineer',
    company: 'Toptal Client',
    dates: '2019 - 2020',
    descriptions: [
      "Owned the design and production delivery of the company's large-scale distributed data processing pipelines",
      'Integrated data across disparate sources and destinations, from raw files to real-time streams',
      "Served as the team's senior engineer and tech lead, strengthening engineering processes",
    ],
    technologies: [
      'Scala',
      'Python',
      'Spark',
      'MongoDB',
      'Hive',
      'Kafka',
      'Distributed Computing',
      'ETL',
    ],
  },
  {
    title: 'Hadoop Proof of Concept for Atmospheric Sciences',
    company: 'Toptal Client',
    dates: '2019 - 2020',
    descriptions: [
      "Set up the framework for massive distributed computing on the client's existing in-house cluster",
      'Designed and implemented general-purpose and specialized data architectures meeting query complexity and performance needs',
      "Delivered accessible software layers that let the client's own teams build on top of the new infrastructure",
    ],
    technologies: [
      'PySpark',
      'Python',
      'Hadoop',
      'HDFS',
      'Big Data',
      'Data Architecture',
      'Cluster Management',
    ],
  },
  {
    title: 'Research Data Engineer',
    company: "Nicklaus Children's Hospital",
    dates: '2018 - 2019',
    descriptions: [
      "Advanced the research department's analytical and data workflows, establishing engineering best practices",
      'Delivered ad hoc and systematic big data pipelines with validation and integration of varied sources',
      'Represented the research department to the IT and business intelligence departments',
    ],
    technologies: [
      'Spark',
      'Scala',
      'Python',
      'R',
      'Impala',
      'ETL',
      'Big Data',
      'Healthcare Data',
    ],
  },
  {
    title: 'Technical Advisor',
    company: 'Insight Data Science',
    dates: '2018',
    descriptions: [
      'Advised program fellows on their data engineering projects across problem definition, systems architecture, and execution',
      'Guided technology selection and architecture for distributed data platforms',
      'Coached fellows through mock interviews covering scalability concepts, algorithms, and CS fundamentals',
    ],
    technologies: [
      'Spark',
      'Kafka',
      'Redis',
      'HBase',
      'Cassandra',
      'PostgreSQL',
      'Distributed Systems',
    ],
  },
  {
    title: 'Senior Software Engineer',
    company: 'NexHealth',
    dates: '2016 - 2017',
    descriptions: [
      'Developed and deployed software at client sites to automate data collection and server synchronization',
      'Integrated electronic medical records from client systems across database and web channels',
      "Created a smart text-message response system for interacting with the company's products via SMS",
    ],
    technologies: [
      'Python',
      'Scala',
      'JavaScript',
      'Redis',
      'PostgreSQL',
      'Apache Spark',
      'REST APIs',
    ],
  },
  {
    title: 'Data Scientist',
    company: 'QuaEra Insights',
    dates: '2016',
    descriptions: [
      'Led data science for a consulting engagement, overseeing data management and modeling strategy',
      'Applied natural language processing to turn unstructured data into actionable business intelligence',
      'Built a recommendation engine that unlocked substantial cost savings in 50% of cases',
    ],
    technologies: [
      'Python',
      'NLP',
      'Machine Learning',
      'Recommendation Systems',
      'Feature Engineering',
      'Business Intelligence',
    ],
  },
  {
    title: 'Data Engineering Fellow',
    company: 'Insight Data Science',
    dates: '2015',
    descriptions: [
      'Built themidgame-tube, a platform to discover YouTube influencers for brands worldwide',
      'Deployed a cloud-based big data platform that collected and processed billions of data records',
      'Proved linear scalability in performance testing across a cluster of up to 20 machines',
    ],
    technologies: [
      'Python',
      'AWS',
      'Apache Spark',
      'EMR',
      'HBase',
      'Big Data',
      'Distributed Computing',
    ],
  },
  {
    title: 'Data Analyst',
    company: 'Cartesian',
    dates: '2015',
    descriptions: [
      'Supported managed analytics engagements, promoting best practices in batch workflows and data management',
      'Conducted independent research into big data workflows, spanning data mining and business intelligence integration',
      'Built lightweight data pipelines that gathered, transformed, and delivered external data into business intelligence tools',
    ],
    technologies: [
      'Python',
      'PostgreSQL',
      'REST APIs',
      'ETL',
      'Data Pipelines',
      'Data Analytics',
    ],
  },
  {
    title: 'Data Analytics Engineer',
    company: 'Daktari Diagnostics',
    dates: '2013 - 2015',
    descriptions: [
      "Lead developer of the company's primary data processing and analysis applications for desktop platforms",
      "Developed a calibration model for the company's CD4 diagnostic device, improving system accuracy by 20-30%",
      'Shipped machine learning models embedded in standalone end-user applications for automated data classification',
    ],
    technologies: [
      'Python',
      'Machine Learning',
      'Statistical Modeling',
      'Calibration',
      'Medical Devices',
      'Data Processing',
    ],
  },
] as const;

export const PORTFOLIO_ENTRIES: readonly PortfolioEntry[] = [
  {
    title: 'Pastoral Conscience AI',
    url: 'https://rocha-moy-engineering-technology.github.io/pastoral_conscience_site/',
    description:
      'Built an "Artificial Conscience" AI system that generates scripture-grounded spiritual reflections using RAG over the Psalms and DSPy-based conscience checkers. Governed reasoning pipeline with three verification layers — Helpfulness, Psalm Grounding, and Citation Integrity — where every response is scored, verified, and corrected before delivery. Architecture: Go backend with hexagonal architecture, Gemini File Search API as the retrieval layer, Python and DSPy services for conscience checkers with model fallback, Next.js frontend with real-time SSE progress updates, and PostgreSQL for data persistence.',
  },
] as const;

export const EDUCATION_ENTRIES: readonly EducationEntry[] = [
  {
    degree: 'Executive MBA in Business Administration',
    institution: 'University of Miami',
    dates: '2021 - 2022',
  },
  {
    degree: "Master's Degree in Computer Science (Machine Learning)",
    institution: 'Georgia Institute of Technology',
    dates: '2015 - 2017',
  },
  {
    degree: "Master's Degree in Earth Science and Engineering (Geophysics)",
    institution: 'King Abdullah University of Science and Technology',
    dates: '2010 - 2012',
  },
  {
    degree: "Bachelor's Degree in Mechanical Engineering (Math Minor)",
    institution: 'University of Massachusetts Lowell',
    dates: '2008 - 2010',
  },
] as const;

export const PROFILE = {
  name: 'Pedro Henrique Rocha Moy',
  title:
    'Artificial Intelligence, Machine Learning, Data Science, Data & Software Engineering',
  location: 'Miami, FL',
  github: 'https://github.com/phrmoy',
  linkedin: 'https://www.linkedin.com/in/phrmoy/',
} as const;
