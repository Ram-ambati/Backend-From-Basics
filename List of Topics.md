# Backend From First Principles — Topics

## 1. Foundation

### High Level Understanding
- How requests are routed to remote servers
- How servers respond & send data
- Communication basics

### Networking Fundamentals
- DNS
- IP Address
- Ports
- TCP
- UDP
- TLS / SSL
- Sockets
- Connection Lifecycle
- Latency
- Bandwidth
- Round Trip Time (RTT)

### HTTP Protocol
- HOPS
- HTTP Raw Message
- Headers
- Methods
- CORS
- Preflight
- Structure
- Status Codes
- Caching
- HTTP 1.1
- HTTP 2.0
- HTTP 3.0
- Content Negotiation
- Persistent Connections
- Compression Types

### Routing
- How routing maps URLs
- Routing & HTTP Methods
- Path Parameters
- Query Parameters
- Static Routes
- Dynamic Routes
- Nested Routes
- Hierarchical Routes
- Wildcard
- RegEx
- Catch-all
- Versioning
- Versioning Techniques
- Route Grouping
- Secure Routes
- Route Matching

### Serialization & Deserialization
- Interoperability Standard
- Formats
- JSON
- XML
- Text
- Binary
- JSON Structure
- Nested Objects
- JSON Errors
- Custom Serialization
- Injection Attacks
- Validation Before Serialization
- JSON Schema
- Compression

## 2. Request Processing

### Validation & Transformation
- Syntactic Validation
- Semantic Validation
- Type Validation
- Best Practices
- Client-side Validation
- Server-side Validation
- Failing Fast
- FE-BE Consistency
- Transformations
- Normalizations
- Sanitization
- Conditional Validation
- Chain Validation
- Error Handling
- Aggregating Errors
- Graceful Handling
- Performance Trade-offs

### Middlewares
- Use Cases
- Request Cycle Role
- Pre-request & Post-request
- Post Response
- Chaining
- Order of Middlewares
- Next Function
- Short Circuit Pipeline
- Security Middleware
- CORS Middleware
- CSRF Middleware
- Rate Limiting
- Route Protection
- Request Logging
- Compression Middleware
- Performance

### Request Context
- Metadata
- State
- Request Lifecycle
- Sharing Data Without Coupling
- Request Scoped State
- Request Metadata
- Session
- User-info Injection
- Logging
- Tracing
- Cancellation
- Timeout
- Memory Overhead

### Authentication & Authorization
- Authentication Types
- Stateful
- Stateless
- Bearer Tokens
- Sessions
- JWT
- Cookies
- OAuth
- OpenID Connect
- API Keys
- MFA
- Salting
- Hashing
- ABAC
- RBAC
- ReBAC
- Cookie Security
- CSRF
- XSS
- MITM
- Audit Logging
- Failed Login Monitoring
- Privilege Escalation
- Timing Attacks
- Account Lockout

### Dependency Injection & IoC
- What is DI
- IoC
- IoC Container
- Constructor Injection
- Field Injection
- Setter Injection
- Bean Lifecycle
- Bean Scope
- Circular Dependency

### Handlers & Controllers
- MVC Pattern
- Handler
- Controller
- Service
- Centralized Error Handlers
- Response Formats

### Business Logic Layer
- Role of BLL
- Presentation Layer
- Data Access Layer
- Separation of Concerns
- SOLID
- Domain Models
- Business Rules
- Service Layer
- Error Propagation

## 3. Data Layer

### Databases
- Relational
- Non-relational
- Use Cases
- ACID
- CAP Theorem
- Queries
- Joins
- Schema Design
- Indexing
- Query Optimization
- Connection Pooling
- Constraints
- ORM
- Migrations

### Transactions
- Transactions
- Isolation Levels
- Rollback
- Commit
- Deadlocks
- Optimistic Locking
- Pessimistic Locking
- Concurrency

### CRUD Mapping
- CRUD
- HTTP Methods
- Status Codes
- Pagination
- Search
- Sorting
- Filtering
- Validation
- Consistent Responses
- Payload Limiting
- Redacting Sensitive Fields

### REST Best Practices
- Resource Design
- HTTP Semantics
- Filtering
- Pagination
- Versioning
- URI Versioning
- Header Versioning
- Media Types
- OpenAPI
- ETags
- Content Negotiation
- Client-side Caching

### API Design
- Naming Conventions
- Resource Modeling
- Idempotency
- PUT vs PATCH
- Backward Compatibility
- Consistency
- Pagination Strategies
- Filtering
- Sorting

### Caching
- Need of Cache
- Browser Cache
- In-memory Cache
- Server Cache
- Database Cache
- Redis
- Cache Aside
- Read Through
- Write Through
- Write Behind
- Cache Invalidation
- TTL
- Event-based Invalidation
- LRU
- LFU
- FIFO
- Cache Hit
- Cache Miss

### Elasticsearch
- What is Elasticsearch
- Inverted Index
- TF-IDF
- Segments
- Shards
- Full Text Search
- Querying
- Relevance Scoring
- Fuzzy Search
- Aggregations
- Boosting
- Kibana
- Field Mapping
- Batch Indexing
- SQL Full Text Search
- LIKE vs Full Text
- When NOT to Use Elasticsearch

### Object Storage & Large Files
- AWS S3
- Object Storage
- Streaming
- Chunking
- Multipart Upload
- Signed URLs
- Range Requests
- CDN

## 4. Communication

### Transactional Emails
- Uses
- Anatomy
- Subject
- Body
- CTA
- Footer
- Dynamic Parameters

### Task Queuing & Scheduling
- Producer
- Queue
- Consumer
- Broker
- Backend
- Retry
- Scheduling
- Priorities
- Rate Limiting
- Parent Child Tasks
- Task Groups
- Batch Processing

### Message Brokers
- RabbitMQ
- Kafka
- Dead Letter Queue
- Consumer Groups
- Pub/Sub
- At Least Once
- At Most Once
- Exactly Once
- Ordering

### Webhooks
- API vs Webhook
- Polling vs Push
- Event Trigger
- Payload
- Signature Verification
- HTTPS
- Retry Logic
- Logging
- Ngrok
- Stripe
- GitHub
- Slack
- Discord
- Twilio

### Realtime Backend Systems
- WebSockets
- Server Sent Events
- Pub/Sub

## 5. Production

### Configuration Management
- Environment Variables
- JSON
- YAML
- Secrets
- Feature Flags
- Profiles
- Runtime Config

### Logging
- Structured Logging
- Application Logs
- Access Logs
- Security Logs
- Log Rotation
- Retention
- Correlation IDs

### Monitoring & Observability
- Metrics
- Logs
- Traces
- Prometheus
- Grafana
- Dashboards
- Alerts

### Error Handling
- Syntax Errors
- Runtime Errors
- Logical Errors
- Fail Fast
- Graceful Degradation
- Custom Exceptions
- Global Error Handler
- Sentry
- ELK Stack

### Health Checks
- Liveness Probe
- Readiness Probe
- Startup Probe
- Health Endpoints

### Graceful Shutdown
- Signal Handling
- Closing Connections
- Flushing Logs
- Completing Requests
- Terminating Application

### Security
- SQL Injection
- NoSQL Injection
- XSS
- CSRF
- Broken Authentication
- Insecure Deserialization
- Least Privilege
- Defense in Depth
- Secure Defaults
- CSP
- SameSite Cookies

### Scaling & Performance
- Response Time
- Resource Utilization
- Bottlenecks
- N+1 Problem
- Lazy Loading
- Batch Processing
- Compression
- Memory Leaks
- Performance Profiling
- Horizontal Scaling
- Vertical Scaling

### Distributed Systems
- Load Balancer
- Reverse Proxy
- API Gateway
- CDN
- Replication
- Sharding
- Distributed Locks
- CAP Theorem
- Consistency
- Availability
- Partition Tolerance

## 6. Engineering Practices

### Testing & Code Quality
- Unit Testing
- Integration Testing
- End-to-End Testing
- Regression Testing
- Performance Testing
- Load Testing
- Stress Testing
- Security Testing
- TDD
- CI/CD Testing
- Linting
- Formatting
- Cyclomatic Complexity
- Maintainability Index

### OpenAPI Standard
- Swagger
- OpenAPI
- API Documentation
- Components
- Schemas
- Security Definitions
- Paths
- Responses
- OpenAPI 3.0
- OpenAPI 3.1

### 12-Factor App Principles
- Codebase
- Dependencies
- Config
- Backing Services
- Build / Release / Run
- Processes
- Port Binding
- Concurrency
- Disposability
- Dev / Prod Parity
- Logs
- Admin Processes

### Software Architecture
- Layered Architecture
- Clean Architecture
- Hexagonal Architecture
- Onion Architecture
- Domain Driven Design (DDD)
- Monolith
- Modular Monolith
- Microservices
- Event Driven Architecture

### DevOps for Backend Engineers
- Docker
- Kubernetes
- CI
- CD
- Infrastructure as Code
- Version Control
- Deployment Strategies
- Blue-Green Deployment
- Rolling Deployment
- Canary Deployment

