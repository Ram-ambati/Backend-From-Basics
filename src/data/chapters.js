/**
 * Central content registry — all chapters, sections, and concepts.
 * Derived from List of Topics.md
 * 
 * Adding a new section:
 * 1. Create the .jsx file in the appropriate content/chapter* folder
 * 2. Add the entry here
 * 3. Navigation and routing update automatically
 */
export const chapters = [
  {
    id: 1,
    title: 'Foundation',
    slug: 'foundation',
    sections: [
      {
        title: 'High Level Understanding',
        slug: 'high-level-understanding',
        concepts: [
          'How requests are routed to remote servers',
          'How servers respond & send data',
          'Communication basics',
        ],
        status: 'complete',
      },
      {
        title: 'Networking Fundamentals',
        slug: 'networking-fundamentals',
        concepts: [
          'DNS', 'IP Address', 'Ports', 'TCP', 'UDP', 'TLS / SSL',
          'Sockets', 'Connection Lifecycle', 'Latency', 'Bandwidth',
          'Round Trip Time (RTT)',
        ],
        status: 'complete',
      },
      {
        title: 'HTTP Protocol',
        slug: 'http-protocol',
        concepts: [
          'Structure of HTTP', 'HTTP Raw Message', 'Headers',
          'Methods', 'Idempotent vs Non-Idempotent',
          'Status Codes', 'Content Negotiation',
          'CORS', 'Simple Requests & Preflight',
          'Caching', 'Persistent Connections', 'Compression Types',
          'HTTP 0.9', 'HTTP 1.0', 'HTTP 1.1', 'HTTP 2.0',
          'HTTP 3.0 & QUIC', 'HOPS',
          'Multipart Uploads & Streaming',
        ],
        status: 'complete',
      },
      {
        title: 'Routing',
        slug: 'routing',
        concepts: [
          'How routing maps URLs', 'Routing & HTTP Methods',
          'Path Parameters', 'Query Parameters',
          'Static Routes', 'Dynamic Routes',
          'Nested Routes', 'Hierarchical Routes',
          'Wildcard', 'RegEx', 'Catch-all',
          'Versioning', 'Versioning Techniques',
          'Route Grouping', 'Secure Routes', 'Route Matching',
        ],
        status: 'empty',
      },
      {
        title: 'Serialization & Deserialization',
        slug: 'serialization',
        concepts: [
          'Interoperability Standard', 'Formats',
          'JSON', 'XML', 'Text', 'Binary',
          'JSON Structure', 'Nested Objects',
          'JSON Errors', 'Custom Serialization',
          'Injection Attacks', 'Validation Before Serialization',
          'JSON Schema', 'Compression',
        ],
        status: 'empty',
      },
    ],
  },
  {
    id: 2,
    title: 'Request Processing',
    slug: 'request-processing',
    sections: [
      {
        title: 'Validation & Transformation',
        slug: 'validation-transformation',
        concepts: [
          'Syntactic Validation', 'Semantic Validation', 'Type Validation',
          'Best Practices', 'Client-side Validation', 'Server-side Validation',
          'Failing Fast', 'FE-BE Consistency', 'Transformations',
          'Normalizations', 'Sanitization', 'Conditional Validation',
          'Chain Validation', 'Error Handling', 'Aggregating Errors',
          'Graceful Handling', 'Performance Trade-offs',
        ],
        status: 'empty',
      },
      {
        title: 'Middlewares',
        slug: 'middlewares',
        concepts: [
          'Use Cases', 'Request Cycle Role', 'Pre-request & Post-request',
          'Post Response', 'Chaining', 'Order of Middlewares',
          'Next Function', 'Short Circuit Pipeline',
          'Security Middleware', 'CORS Middleware', 'CSRF Middleware',
          'Rate Limiting', 'Route Protection', 'Request Logging',
          'Compression Middleware', 'Performance',
        ],
        status: 'empty',
      },
      {
        title: 'Request Context',
        slug: 'request-context',
        concepts: [
          'Metadata', 'State', 'Request Lifecycle',
          'Sharing Data Without Coupling', 'Request Scoped State',
          'Request Metadata', 'Session', 'User-info Injection',
          'Logging', 'Tracing', 'Cancellation', 'Timeout', 'Memory Overhead',
        ],
        status: 'empty',
      },
      {
        title: 'Authentication & Authorization',
        slug: 'authentication-authorization',
        concepts: [
          'Authentication Types', 'Stateful', 'Stateless',
          'Bearer Tokens', 'Sessions', 'JWT', 'Cookies',
          'OAuth', 'OpenID Connect', 'API Keys', 'MFA',
          'Salting', 'Hashing', 'ABAC', 'RBAC', 'ReBAC',
          'Cookie Security', 'CSRF', 'XSS', 'MITM',
          'Audit Logging', 'Failed Login Monitoring',
          'Privilege Escalation', 'Timing Attacks', 'Account Lockout',
        ],
        status: 'empty',
      },
      {
        title: 'Dependency Injection & IoC',
        slug: 'dependency-injection',
        concepts: [
          'What is DI', 'IoC', 'IoC Container',
          'Constructor Injection', 'Field Injection', 'Setter Injection',
          'Bean Lifecycle', 'Bean Scope', 'Circular Dependency',
        ],
        status: 'empty',
      },
      {
        title: 'Handlers & Controllers',
        slug: 'handlers-controllers',
        concepts: [
          'MVC Pattern', 'Handler', 'Controller', 'Service',
          'Centralized Error Handlers', 'Response Formats',
        ],
        status: 'empty',
      },
      {
        title: 'Business Logic Layer',
        slug: 'business-logic-layer',
        concepts: [
          'Role of BLL', 'Presentation Layer', 'Data Access Layer',
          'Separation of Concerns', 'SOLID', 'Domain Models',
          'Business Rules', 'Service Layer', 'Error Propagation',
        ],
        status: 'empty',
      },
    ],
  },
  {
    id: 3,
    title: 'Data Layer',
    slug: 'data-layer',
    sections: [
      {
        title: 'Databases',
        slug: 'databases',
        concepts: [
          'Relational', 'Non-relational', 'Use Cases',
          'ACID', 'CAP Theorem', 'Queries', 'Joins',
          'Schema Design', 'Indexing', 'Query Optimization',
          'Connection Pooling', 'Constraints', 'ORM', 'Migrations',
        ],
        status: 'empty',
      },
      {
        title: 'Transactions',
        slug: 'transactions',
        concepts: [
          'Transactions', 'Isolation Levels', 'Rollback', 'Commit',
          'Deadlocks', 'Optimistic Locking', 'Pessimistic Locking', 'Concurrency',
        ],
        status: 'empty',
      },
      {
        title: 'CRUD Mapping',
        slug: 'crud-mapping',
        concepts: [
          'CRUD', 'HTTP Methods', 'Status Codes',
          'Pagination', 'Search', 'Sorting', 'Filtering',
          'Validation', 'Consistent Responses',
          'Payload Limiting', 'Redacting Sensitive Fields',
        ],
        status: 'empty',
      },
      {
        title: 'REST Best Practices',
        slug: 'rest-best-practices',
        concepts: [
          'Resource Design', 'HTTP Semantics', 'Filtering', 'Pagination',
          'Versioning', 'URI Versioning', 'Header Versioning',
          'Media Types', 'OpenAPI', 'ETags',
          'Content Negotiation', 'Client-side Caching',
        ],
        status: 'empty',
      },
      {
        title: 'API Design',
        slug: 'api-design',
        concepts: [
          'Naming Conventions', 'Resource Modeling', 'Idempotency',
          'PUT vs PATCH', 'Backward Compatibility',
          'Consistency', 'Pagination Strategies', 'Filtering', 'Sorting',
        ],
        status: 'empty',
      },
      {
        title: 'Caching',
        slug: 'caching',
        concepts: [
          'Need of Cache', 'Browser Cache', 'In-memory Cache',
          'Server Cache', 'Database Cache', 'Redis',
          'Cache Aside', 'Read Through', 'Write Through', 'Write Behind',
          'Cache Invalidation', 'TTL', 'Event-based Invalidation',
          'LRU', 'LFU', 'FIFO', 'Cache Hit', 'Cache Miss',
        ],
        status: 'empty',
      },
      {
        title: 'Elasticsearch',
        slug: 'elasticsearch',
        concepts: [
          'What is Elasticsearch', 'Inverted Index', 'TF-IDF',
          'Segments', 'Shards', 'Full Text Search',
          'Querying', 'Relevance Scoring', 'Fuzzy Search',
          'Aggregations', 'Boosting', 'Kibana',
          'Field Mapping', 'Batch Indexing', 'SQL Full Text Search',
          'LIKE vs Full Text', 'When NOT to Use Elasticsearch',
        ],
        status: 'empty',
      },
      {
        title: 'Object Storage & Large Files',
        slug: 'object-storage',
        concepts: [
          'AWS S3', 'Object Storage', 'Streaming', 'Chunking',
          'Multipart Upload', 'Signed URLs', 'Range Requests', 'CDN',
        ],
        status: 'empty',
      },
    ],
  },
  {
    id: 4,
    title: 'Communication',
    slug: 'communication',
    sections: [
      {
        title: 'Transactional Emails',
        slug: 'transactional-emails',
        concepts: [
          'Uses', 'Anatomy', 'Subject', 'Body',
          'CTA', 'Footer', 'Dynamic Parameters',
        ],
        status: 'empty',
      },
      {
        title: 'Task Queuing & Scheduling',
        slug: 'task-queuing',
        concepts: [
          'Producer', 'Queue', 'Consumer', 'Broker', 'Backend',
          'Retry', 'Scheduling', 'Priorities', 'Rate Limiting',
          'Parent Child Tasks', 'Task Groups', 'Batch Processing',
        ],
        status: 'empty',
      },
      {
        title: 'Message Brokers',
        slug: 'message-brokers',
        concepts: [
          'RabbitMQ', 'Kafka', 'Dead Letter Queue',
          'Consumer Groups', 'Pub/Sub',
          'At Least Once', 'At Most Once', 'Exactly Once', 'Ordering',
        ],
        status: 'empty',
      },
      {
        title: 'Webhooks',
        slug: 'webhooks',
        concepts: [
          'API vs Webhook', 'Polling vs Push', 'Event Trigger',
          'Payload', 'Signature Verification', 'HTTPS',
          'Retry Logic', 'Logging', 'Ngrok',
          'Stripe', 'GitHub', 'Slack', 'Discord', 'Twilio',
        ],
        status: 'empty',
      },
      {
        title: 'Realtime Backend Systems',
        slug: 'realtime-systems',
        concepts: [
          'WebSockets', 'Server Sent Events', 'Pub/Sub',
        ],
        status: 'empty',
      },
    ],
  },
  {
    id: 5,
    title: 'Production',
    slug: 'production',
    sections: [
      {
        title: 'Configuration Management',
        slug: 'configuration-management',
        concepts: [
          'Environment Variables', 'JSON', 'YAML',
          'Secrets', 'Feature Flags', 'Profiles', 'Runtime Config',
        ],
        status: 'empty',
      },
      {
        title: 'Logging',
        slug: 'logging',
        concepts: [
          'Structured Logging', 'Application Logs', 'Access Logs',
          'Security Logs', 'Log Rotation', 'Retention', 'Correlation IDs',
        ],
        status: 'empty',
      },
      {
        title: 'Monitoring & Observability',
        slug: 'monitoring-observability',
        concepts: [
          'Metrics', 'Logs', 'Traces', 'Prometheus',
          'Grafana', 'Dashboards', 'Alerts',
        ],
        status: 'empty',
      },
      {
        title: 'Error Handling',
        slug: 'error-handling',
        concepts: [
          'Syntax Errors', 'Runtime Errors', 'Logical Errors',
          'Fail Fast', 'Graceful Degradation', 'Custom Exceptions',
          'Global Error Handler', 'Sentry', 'ELK Stack',
        ],
        status: 'empty',
      },
      {
        title: 'Health Checks',
        slug: 'health-checks',
        concepts: [
          'Liveness Probe', 'Readiness Probe',
          'Startup Probe', 'Health Endpoints',
        ],
        status: 'empty',
      },
      {
        title: 'Graceful Shutdown',
        slug: 'graceful-shutdown',
        concepts: [
          'Signal Handling', 'Closing Connections', 'Flushing Logs',
          'Completing Requests', 'Terminating Application',
        ],
        status: 'empty',
      },
      {
        title: 'Security',
        slug: 'security',
        concepts: [
          'SQL Injection', 'NoSQL Injection', 'XSS', 'CSRF',
          'Broken Authentication', 'Insecure Deserialization',
          'Least Privilege', 'Defense in Depth', 'Secure Defaults',
          'CSP', 'SameSite Cookies',
        ],
        status: 'empty',
      },
      {
        title: 'Scaling & Performance',
        slug: 'scaling-performance',
        concepts: [
          'Response Time', 'Resource Utilization', 'Bottlenecks',
          'N+1 Problem', 'Lazy Loading', 'Batch Processing',
          'Compression', 'Memory Leaks', 'Performance Profiling',
          'Horizontal Scaling', 'Vertical Scaling',
        ],
        status: 'empty',
      },
      {
        title: 'Distributed Systems',
        slug: 'distributed-systems',
        concepts: [
          'Load Balancer', 'Reverse Proxy', 'API Gateway', 'CDN',
          'Replication', 'Sharding', 'Distributed Locks',
          'CAP Theorem', 'Consistency', 'Availability', 'Partition Tolerance',
        ],
        status: 'empty',
      },
    ],
  },
  {
    id: 6,
    title: 'Engineering Practices',
    slug: 'engineering-practices',
    sections: [
      {
        title: 'Testing & Code Quality',
        slug: 'testing-code-quality',
        concepts: [
          'Unit Testing', 'Integration Testing', 'End-to-End Testing',
          'Regression Testing', 'Performance Testing', 'Load Testing',
          'Stress Testing', 'Security Testing', 'TDD', 'CI/CD Testing',
          'Linting', 'Formatting', 'Cyclomatic Complexity', 'Maintainability Index',
        ],
        status: 'empty',
      },
      {
        title: 'OpenAPI Standard',
        slug: 'openapi-standard',
        concepts: [
          'Swagger', 'OpenAPI', 'API Documentation',
          'Components', 'Schemas', 'Security Definitions',
          'Paths', 'Responses', 'OpenAPI 3.0', 'OpenAPI 3.1',
        ],
        status: 'empty',
      },
      {
        title: '12-Factor App Principles',
        slug: 'twelve-factor-app',
        concepts: [
          'Codebase', 'Dependencies', 'Config', 'Backing Services',
          'Build / Release / Run', 'Processes', 'Port Binding',
          'Concurrency', 'Disposability', 'Dev / Prod Parity',
          'Logs', 'Admin Processes',
        ],
        status: 'empty',
      },
      {
        title: 'Software Architecture',
        slug: 'software-architecture',
        concepts: [
          'Layered Architecture', 'Clean Architecture',
          'Hexagonal Architecture', 'Onion Architecture',
          'Domain Driven Design (DDD)', 'Monolith',
          'Modular Monolith', 'Microservices',
          'Event Driven Architecture',
        ],
        status: 'empty',
      },
      {
        title: 'DevOps for Backend Engineers',
        slug: 'devops',
        concepts: [
          'Docker', 'Kubernetes', 'CI', 'CD',
          'Infrastructure as Code', 'Version Control',
          'Deployment Strategies', 'Blue-Green Deployment',
          'Rolling Deployment', 'Canary Deployment',
        ],
        status: 'empty',
      },
    ],
  },
];

/**
 * Get a flat list of all sections with chapter context.
 * Useful for search index and prev/next navigation.
 */
export function getAllSections() {
  const sections = [];
  chapters.forEach((chapter) => {
    chapter.sections.forEach((section, index) => {
      sections.push({
        ...section,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        chapterSlug: chapter.slug,
        path: `/${chapter.slug}/${section.slug}`,
        sectionIndex: index,
      });
    });
  });
  return sections;
}

/**
 * Find a section by its chapter and section slugs.
 */
export function findSection(chapterSlug, sectionSlug) {
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return null;
  const section = chapter.sections.find((s) => s.slug === sectionSlug);
  if (!section) return null;
  return {
    ...section,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterSlug: chapter.slug,
  };
}

/**
 * Get previous and next sections for navigation.
 */
export function getPrevNextSections(chapterSlug, sectionSlug) {
  const allSections = getAllSections();
  const currentIndex = allSections.findIndex(
    (s) => s.chapterSlug === chapterSlug && s.slug === sectionSlug
  );

  return {
    prev: currentIndex > 0 ? allSections[currentIndex - 1] : null,
    next: currentIndex < allSections.length - 1 ? allSections[currentIndex + 1] : null,
  };
}
