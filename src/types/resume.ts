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
    title: 'Chief Architect',
    company: 'Rocha Moy Trading & Capital',
    dates: '2017 - Present',
    descriptions: [
      'Developed the API for probabilistic and algorithmic options trading with Interactive Brokers and TD Ameritrade',
      'Specialties include data integration, task automation, portfolio simulations, risk mitigation, and strategy validation',
      'Integrated many different data sources from APIs to web scraping',
      'Automated trade execution, trade scheduling, and fund releases for trading',
    ],
    technologies: [
      'Python',
      'AWS',
      'REST APIs',
      'Machine Learning',
      'Quantitative Finance',
      'Options Trading',
      'Portfolio Optimization',
      'Risk Management',
    ],
  },
  {
    title: 'AI Consultant',
    company: 'Toptal Client',
    dates: '2025',
    descriptions: [
      'Developed a prototype platform that automated LLC formation workflows, including a detailed regulatory study for Florida, reducing manual research time for new founders by well over 50%',
      'Built a back-end LLM system that validated user inputs and flagged compliance gaps during the LLC creation process',
      'Designed a domain-specific knowledge base and implemented an RAG pipeline to deliver precise, context-aware guidance',
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
      'Built a full-stack Django and React application that parsed contract requirement PDFs into structured suggestions and clarification questions',
      'Engineered an autoscaling cloud infrastructure using ECS and IaC best practices for high-throughput document processing',
      'Designed the end-to-end LLM architecture with OpenAI models, serving as primary expert for all LLM-related issues',
    ],
    technologies: [
      'Python',
      'JavaScript',
      'Django',
      'React',
      'OpenAI API',
      'LLMs',
      'AWS ECS',
      'Docker',
    ],
  },
  {
    title: 'Lead Data Scientist',
    company: 'Deloitte Contractor',
    dates: '2021 - 2022',
    descriptions: [
      'Designed, implemented, and deployed different natural language processing models',
      'Worked with stakeholders to understand use cases, the pathway to product development, and implementation',
      'Mentored and supported junior data scientists on the team',
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
      'Handled the architecture, development, and automation of distributed computing pipelines and data storage in the cloud',
      'Automated scalable infrastructure in the cloud to respond to development and consumer demand',
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
      'Designed, implemented, and deployed fully-fledged distributed ETL jobs in Spark/Scala API',
      'Worked with various sources and sinks of data including Hive tables, Mongo collections, and Kafka brokers',
      'Served as senior engineer and tech lead strengthening engineering and development processes',
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
      'Built a cluster from scratch adhering to the client\u2019s needs to work with the home cluster',
      'Designed and implemented generic and specific data architectures meeting query complexity and performance needs',
      'Built PySpark and Python software layers of abstraction for the client to build on top of the infrastructure',
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
      'Developed existing analytical and data workflows for users of R, Python, and Impala establishing best practices',
      'Provided ad hoc and systematically developed ETL and big data pipelines with validation and integration',
      'Liaised for the research department to IT and BI departments providing guidance and expertise',
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
      'Worked with fellows on data engineering projects covering problem definition, systems architecture, and execution',
      'Advised on technologies such as Spark, Kafka, Redis, HBase, Cassandra, and PostgreSQL',
      'Conducted mock interviews on scalability concepts, algorithms, and CS fundamentals',
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
      'Developed and deployed software for data collection and server sync at client sites',
      'Performed database and web-based data integrations of electronic medical records',
      'Developed a smart SMS response system for user interaction with NexHealth products',
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
      'Served as lead data scientist in a consulting project overseeing data management and modeling strategy',
      'Used NLP to transform unstructured data into features and extract business intelligence',
      'Built a recommendation engine potentially yielding savings on up to 50% of the business',
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
      'Built themidgame-tube, a platform to discover YouTube influencers on brand names worldwide',
      "Deployed Amazon's EMR Spark with HBase processing and ingesting billions of data tuples",
      'Attained linear scalability performance tested with up to 20 nodes',
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
      'Aided managed analytics efforts promoting best practices within batch workflows and data management',
      'Conducted independent research into big data workflows considering data mining and BI integration',
      'Built short data pipelines consuming APIs, transforming, loading, and exposing data to BI tools',
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
      'Lead developer of mainstream data processing and data analysis applications in Python for Windows/Mac',
      'Developed a calibration model for the Daktari CD4 testing device improving accuracy by 20-30%',
      'Deployed machine learning models embedded in standalone applications for data classification',
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
      'Built an "Artificial Conscience" AI system that generates scripture-grounded spiritual reflections using RAG retrieval from Psalms and DSPy-based conscience checkers. Architecture: Go back end with hexagonal architecture, Gemini File Search API for RAG retrieval, Python and DSPy services for conscience checkers, Next.js front end with real-time SSE progress updates, and PostgreSQL for data persistence.',
  },
] as const;

export const EDUCATION_ENTRIES: readonly EducationEntry[] = [
  {
    degree: 'Executive MBA in Business Administration',
    institution: 'University of Miami',
    dates: '2021 - 2022',
  },
  {
    degree: 'Master\u2019s Degree in Computer Science (Machine Learning)',
    institution: 'Georgia Institute of Technology',
    dates: '2015 - 2017',
  },
  {
    degree:
      'Master\u2019s Degree in Earth Science and Engineering (Geophysics)',
    institution: 'King Abdullah University of Science and Technology',
    dates: '2010 - 2012',
  },
  {
    degree: 'Bachelor\u2019s Degree in Mechanical Engineering (Math Minor)',
    institution: 'University of Massachusetts Lowell',
    dates: '2008 - 2010',
  },
] as const;

export const PROFILE = {
  name: 'Pedro Henrique Rocha Moy',
  title: 'AI, Machine Learning, Data Science & Engineering',
  location: 'Miami, FL',
  github: 'https://github.com/phrmoy',
  linkedin: 'https://www.linkedin.com/in/phrmoy/',
} as const;

export const INTERESTS_INLINE_TEXT =
  'Machine Learning & AI, Data Science, Natural Language Processing, Quantitative Finance, Agentic Development, Data Engineering, Data Analysis, Business Intelligence, Full-Stack Development' as const;
