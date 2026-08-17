import SectionPage from '../../components/content/SectionPage';
import ConceptBlock from '../../components/content/ConceptBlock';
import Definition from '../../components/content/Definition';
import CodeBlock from '../../components/ui/CodeBlock';
import Callout from '../../components/ui/Callout';
import ComparisonTable from '../../components/content/ComparisonTable';
import ProsConsList from '../../components/content/ProsConsList';
import FlowDiagram from '../../components/content/FlowDiagram';
import Example from '../../components/content/Example';
import Quiz from '../../components/content/Quiz';
import Checklist from '../../components/content/Checklist';
import { InterviewQuestion, RealWorld, CommonPitfall } from '../../components/content/Admonitions';
import { Summary, KeyTakeaways } from '../../components/content/Summary';
import { FurtherReading } from '../../components/content/FurtherReading';

export default function AuthenticationAuthorization() {
  return (
    <SectionPage
      readingTime="30 min read"
      lastUpdated="Aug 2026"
      relatedTopics={[
        { title: 'HTTP Protocol', path: '/foundation/http-protocol' },
        { title: 'Routing & Secure Routes', path: '/foundation/routing' },
      ]}
    >
      <p>
        Security in backend architecture begins with two essential questions: <em>&ldquo;Who are you?&rdquo;</em> and
        <em>&ldquo;What are you allowed to do?&rdquo;</em>. Every production system handling sensitive user data, financial
        transactions, or private records must implement robust authentication, granular authorization, and
        resilient defense against credential compromise and web attacks.
      </p>

      {/* ===== Authentication vs Authorization ===== */}
      <ConceptBlock id="authn-vs-authz" title="Authentication (AuthN) vs Authorization (AuthZ)">
        <Definition term="Authentication (AuthN)">
          The process of <strong>verifying the identity</strong> of a user, device, or system. It answers:
          <em> &ldquo;Who are you?&rdquo;</em> (e.g., via passwords, biometric scans, cryptographic keys, or identity providers).
        </Definition>

        <Definition term="Authorization (AuthZ)">
          The process of <strong>determining permissions and access rights</strong> for an authenticated identity.
          It answers: <em>&ldquo;Are you allowed to perform this specific action on this specific resource?&rdquo;</em>
        </Definition>

        <FlowDiagram
          chart={`graph LR
    A[Incoming Request] --> B{1. Authentication<br/>Who are you?}
    B -->|Invalid Credentials| C[401 Unauthorized]
    B -->|Identity Confirmed| D{2. Authorization<br/>Can you edit this?}
    D -->|Insufficient Permissions| E[403 Forbidden]
    D -->|Allowed| F[Execute Request Handler]`}
          caption="The two-step security guardrail: Identity verification (AuthN) always precedes permission enforcement (AuthZ)"
        />

        <ComparisonTable
          headers={['Dimension', 'Authentication (AuthN)', 'Authorization (AuthZ)']}
          rows={[
            ['Core Question', 'Who is making the request?', 'What is this identity permitted to do?'],
            ['Sequence', 'Runs first at the perimeter', 'Runs second after identity is established'],
            ['HTTP Error Code', '401 Unauthorized (unauthenticated)', '403 Forbidden (authenticated, but lack rights)'],
            ['Mechanisms', 'Passwords, OTP, JWT, Session Cookies, OAuth, OIDC, MFA, Biometrics', 'RBAC, ABAC, ReBAC, Permissions matrices, ACLs, Scopes'],
            ['Data Managed By', 'User identity database, Auth0, Keycloak, Cognito', 'Application domain rules, Policy engines (e.g., OPA), Roles table'],
          ]}
        />

        <Callout variant="tip">
          Remember the HTTP status code mnemonic: <strong>401 Unauthorized</strong> means <em>unauthenticated</em> (provide valid credentials).
          <strong>403 Forbidden</strong> means <em>unauthorized</em> (we know who you are, but you do not have permission).
        </Callout>
      </ConceptBlock>

      {/* ===== Stateful vs Stateless Authentication ===== */}
      <ConceptBlock id="stateful-vs-stateless" title="Stateful vs. Stateless Authentication">
        <p>
          Backend architectures manage client authentication state using one of two core paradigms:
        </p>

        <ComparisonTable
          headers={['Attribute', 'Stateful (Session-Based)', 'Stateless (Token-Based / JWT)']}
          rows={[
            ['Where State Lives', 'On the server (Redis, Database, Memory store)', 'On the client (Self-contained cryptographic token)'],
            ['Client Identifier', 'Opaque Session ID in an HTTP cookie', 'Digitally signed JSON Web Token (JWT) in Authorization header'],
            ['Revocation / Logout', 'Instant — delete the session record from the database', 'Complex — tokens remain valid until expiration unless using a centralized blocklist'],
            ['Server Memory / I/O', 'Requires a DB/Cache lookup on every single request', 'Zero DB lookup needed; CPU verifies cryptographic signature directly'],
            ['Horizontal Scalability', 'Requires centralized session store (Redis) or sticky sessions', 'Naturally scalable across any server with the shared secret/public key'],
          ]}
        />

        <FlowDiagram
          chart={`graph TB
    subgraph Stateful Session Flow
      S1[Client] -->|POST /login| S2[Server]
      S2 -->|Create & Save Session| S3[(Redis / DB)]
      S2 -->|Set-Cookie: session_id=xyz| S1
      S1 -->|Subsequent Requests with Cookie| S2
      S2 -->|Lookup session_id| S3
    end

    subgraph Stateless Token Flow
      T1[Client] -->|POST /login| T2[Server]
      T2 -->|Sign JWT with Private Key| T2
      T2 -->|Return access_token: eyJ...| T1
      T1 -->|Authorization: Bearer eyJ...| T3[Any App Server]
      T3 -->|Verify Signature via Secret/Public Key| T3
    end`}
          caption="Architecture comparison: Stateful database-backed sessions vs. Stateless cryptographically-signed tokens"
        />

        <ProsConsList
          pros={[
            'Stateful: Instant session invalidation (single-click &ldquo;Log out of all devices&rdquo;), complete visibility into all active sessions.',
            'Stateless: Infinite horizontal scaling without shared session databases, ideal for cross-domain microservice architectures and mobile native apps.',
          ]}
          cons={[
            'Stateful: Redis/Database becomes a single point of failure and bottleneck under massive throughput.',
            'Stateless: Token revocation is difficult before expiry; payload sizes are larger (hundreds of bytes transferred on every request).',
          ]}
        />
      </ConceptBlock>

      {/* ===== Sessions ===== */}
      <ConceptBlock id="sessions" title="Sessions in Depth">
        <Definition term="Server-Side Session">
          A server-managed record storing a user&apos;s authentication state, permissions, and temporary data.
          The client receives only an unguessable, high-entropy <strong>Session ID</strong> that references
          the server-side data store.
        </Definition>

        <p>
          When implementing sessions in production, session data should be stored in high-performance in-memory
          caches (like Redis or Memcached) with an explicit <strong>TTL (Time-To-Live)</strong> rather than in
          process memory (which breaks multi-instance deployments) or relational databases (which adds disk I/O overhead).
        </p>

        <CommonPitfall>
          <p>
            <strong>Session Fixation Attack:</strong> If your application maintains the same Session ID before
            and after a user logs in, an attacker can trick a victim into using a known Session ID and subsequently
            hijack their authenticated session.
          </p>
          <p>
            <strong>The Defense:</strong> Always <strong>regenerate the Session ID</strong> immediately upon
            successful authentication.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Cookies & Cookie Security ===== */}
      <ConceptBlock id="cookies-and-security" title="Cookies & Cookie Security">
        <Definition term="HTTP Cookie">
          A small piece of named data sent by the server via the <code>Set-Cookie</code> header that the
          web browser automatically stores and attaches to future HTTP requests made to the origin server.
        </Definition>

        <Example title="Production-grade secure Set-Cookie header">
          <CodeBlock language="http">
{`Set-Cookie: session_id=a8f93b827e109c4d; 
            Path=/; 
            Domain=api.example.com; 
            Secure; 
            HttpOnly; 
            SameSite=Strict; 
            Max-Age=86400`}
          </CodeBlock>
        </Example>

        <ComparisonTable
          headers={['Cookie Attribute', 'Purpose', 'Security Impact']}
          rows={[
            ['HttpOnly', 'Prevents client-side scripts (JavaScript document.cookie) from accessing the cookie', 'Neutralizes token theft via Cross-Site Scripting (XSS)'],
            ['Secure', 'Ensures the cookie is ONLY transmitted over encrypted HTTPS connections', 'Prevents plaintext transmission and interception over unencrypted networks (MITM)'],
            ['SameSite=Strict', 'Withholds the cookie on all cross-site requests (even following links)', 'Maximum protection against Cross-Site Request Forgery (CSRF)'],
            ['SameSite=Lax', 'Withholds on cross-site subrequests (images, POSTs) but allows top-level GET navigation', 'Balanced UX/Security standard for web apps'],
            ['SameSite=None', 'Sends cookie on all cross-site requests (requires Secure flag)', 'Required for third-party embedded iframes / widgets; vulnerable to CSRF without tokens'],
            ['Domain / Path', 'Restricts which hosts and URL subpaths receive the cookie', 'Prevents accidental cookie leakage to untrusted subdomains'],
          ]}
        />

        <Callout variant="warning">
          Never store authentication tokens in browser <code>localStorage</code> or <code>sessionStorage</code> for web
          applications! Any JavaScript running on the page (including third-party analytics, npm dependencies, or XSS injections)
          can read <code>localStorage</code>. Always use <code>HttpOnly</code>, <code>Secure</code> cookies for web session storage.
        </Callout>
      </ConceptBlock>

      {/* ===== Bearer Tokens ===== */}
      <ConceptBlock id="bearer-tokens" title="Bearer Tokens">
        <Definition term="Bearer Token (RFC 6750)">
          A security credential that grants access to protected resources to <em>whomever possesses (bears) the token</em>,
          without requiring them to prove possession of a private cryptographic key.
        </Definition>

        <Example title="Transmitting a bearer token in standard HTTP headers">
          <CodeBlock language="http">
{`GET /api/v1/orders HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json`}
          </CodeBlock>
        </Example>

        <Callout variant="tip">
          Because a bearer token grants full access to whoever holds it, it must be treated like a password:
          always transmit over TLS (HTTPS), never log in plaintext access logs, and assign short expiration windows
          (e.g., 15 minutes) coupled with refresh tokens.
        </Callout>
      </ConceptBlock>

      {/* ===== JSON Web Tokens (JWT) ===== */}
      <ConceptBlock id="jwt" title="JSON Web Tokens (JWT) Deep Dive">
        <Definition term="JWT (RFC 7519)">
          An open standard defining a compact, URL-safe, self-contained container for securely transmitting
          claims between parties. A JWT consists of three Base64URL-encoded parts separated by dots (<code>.</code>):
          <strong>Header . Payload . Signature</strong>.
        </Definition>

        <Example title="Anatomy of a decoded JWT">
          <CodeBlock language="json">
{`// 1. Header (Algorithm & Token Type)
{
  "alg": "HS256",
  "typ": "JWT"
}

// 2. Payload (Claims & Identity Data)
{
  "sub": "usr_94812301",
  "name": "Jordan Lee",
  "role": "admin",
  "iat": 1755432000, // Issued At (Unix timestamp)
  "exp": 1755432900  // Expiration Time (+15 minutes)
}

// 3. Signature
// HMACSHA256(
//   base64UrlEncode(header) + "." + base64UrlEncode(payload),
//   secret_key
// )`}
          </CodeBlock>
        </Example>

        <FlowDiagram
          chart={`graph LR
    A[Client sends JWT] --> B[Server extracts Header & Payload]
    B --> C[Computes hash using local SECRET_KEY]
    C --> D{Hash matches Signature?}
    D -->|No: Tampered!| E[401 Unauthorized]
    D -->|Yes: Valid| F{Check exp < Current Time?}
    F -->|Expired| G[401 Token Expired]
    F -->|Valid| H[Attach User to Request Context]`}
          caption="Cryptographic verification: The server verifies authenticity in microseconds without database queries"
        />

        <CommonPitfall>
          <p>
            <strong>The &ldquo;alg: none&rdquo; Vulnerability:</strong> In naive JWT verification libraries,
            an attacker could modify the header to <code>{`{"alg": "none"}`}</code>, remove the signature,
            and the server would accept the tampered claims as valid!
          </p>
          <p>
            <strong>The Defense:</strong> Explicitly enforce the allowed algorithm on the server
            (e.g., <code>algorithms: [&apos;HS256&apos;]</code> or <code>[&apos;RS256&apos;]</code>). Never allow
            the token header to dictate the verification algorithm.
          </p>
        </CommonPitfall>

        <Quiz
          question="A JSON Web Token (JWT) payload is encoded using Base64URL. Does this mean the payload data is encrypted and secret?"
          options={[
            'Yes, Base64 is a strong modern encryption standard.',
            'No, Base64 is only encoding (not encryption). Anyone who intercepts the token can decode and read the payload claims.',
            'Yes, but only if signed with RS256 asymmetric keys.',
            'No, but the signature prevents anyone from reading the fields.',
          ]}
          correct={1}
          explanation="Base64URL is merely an encoding mechanism, not encryption. Anyone can decode and inspect the claims inside a standard JWT. The signature only guarantees that the payload has not been tampered with or modified since issuance."
        />
      </ConceptBlock>

      {/* ===== API Keys ===== */}
      <ConceptBlock id="api-keys" title="API Keys">
        <Definition term="API Key">
          A high-entropy, opaque string assigned to a client project or machine application. It acts as an
          identifier and credential for server-to-server or third-party programmatic access.
        </Definition>

        <ComparisonTable
          headers={['Criterion', 'API Keys', 'User Session / JWT']}
          rows={[
            ['Identifies', 'A project, organization, or software application', 'An individual human user'],
            ['Lifespan', 'Long-lived (months/years or until manually rotated)', 'Short-lived (minutes to hours)'],
            ['Transmission', 'Header (e.g. X-API-Key, Authorization) or query param', 'HttpOnly cookie or Authorization Bearer header'],
            ['Typical Use Case', 'Stripe, AWS, SendGrid, Twilio machine APIs', 'Web dashboards, mobile user logins, interactive apps'],
          ]}
        />

        <RealWorld title="Production API Key Architecture">
          <p>
            Modern API providers (like Stripe or GitHub) use prefixed keys like <code>sk_live_51Nz...</code> or
            <code>ghp_38xK...</code>:
          </p>
          <ul>
            <li><strong>Prefixes:</strong> Allow secret scanning tools (GitHub Secret Scanner) to identify leaked keys instantly.</li>
            <li><strong>Storage:</strong> Backends store only a <strong>hash</strong> (SHA-256) of the API key in the database, showing the raw key to the user exactly once upon creation.</li>
          </ul>
        </RealWorld>
      </ConceptBlock>

      {/* ===== OAuth 2.0 ===== */}
      <ConceptBlock id="oauth" title="OAuth 2.0 Authorization Framework">
        <Definition term="OAuth 2.0 (RFC 6749)">
          An open standard authorization protocol that enables third-party applications to obtain limited
          access to user accounts on an HTTP service (e.g., &ldquo;Allow Spotify to access your Google profile&rdquo;)
          without exposing the user&apos;s password to the third party.
        </Definition>

        <FlowDiagram
          chart={`sequenceDiagram
    autonumber
    actor User as Resource Owner (User)
    participant Client as Client App (e.g. Acme Dashboard)
    participant AuthServer as Authorization Server (e.g. Google)
    participant ResourceServer as Resource Server (API)

    User->>Client: 1. Click "Login / Connect"
    Client->>AuthServer: 2. Redirect to Auth with client_id & scope
    AuthServer->>User: 3. Prompt for consent & permissions
    User->>AuthServer: 4. Grants permission
    AuthServer-->>Client: 5. Redirect back with Authorization Code
    Client->>AuthServer: 6. POST code + client_secret (Back-channel)
    AuthServer-->>Client: 7. Returns Access Token (& Refresh Token)
    Client->>ResourceServer: 8. GET /data with Bearer Access Token
    ResourceServer-->>Client: 9. Returns Protected Resource`}
          caption="The OAuth 2.0 Authorization Code Grant flow"
        />

        <ComparisonTable
          headers={['OAuth 2.0 Grant Type', 'Where It Is Used', 'Security Characteristics']}
          rows={[
            ['Authorization Code + PKCE', 'Single Page Apps (React, Vue), Mobile Apps, Web Apps', 'Gold standard. Uses Proof Key for Code Exchange (PKCE) to prevent code interception.'],
            ['Client Credentials', 'Server-to-server background services & cron jobs', 'No user involved; app authenticates with its own client_id & client_secret.'],
            ['Device Code', 'Smart TVs, IoT devices, CLI terminals', 'User authenticates on a secondary device (phone/browser) using a user code.'],
            ['Implicit Grant', 'Deprecated (formerly SPAs)', 'DO NOT USE — returns tokens directly in URL hash fragment; insecure.'],
          ]}
        />
      </ConceptBlock>

      {/* ===== OpenID Connect (OIDC) ===== */}
      <ConceptBlock id="openid-connect" title="OpenID Connect (OIDC)">
        <Definition term="OpenID Connect (OIDC)">
          An identity layer built directly on top of the OAuth 2.0 protocol. While OAuth 2.0 is designed purely
          for <em>authorization</em> (access delegation), OIDC extends it to provide standardized
          <em> authentication</em> (identity verification and single sign-on).
        </Definition>

        <ComparisonTable
          headers={['Dimension', 'OAuth 2.0', 'OpenID Connect (OIDC)']}
          rows={[
            ['Primary Purpose', 'Authorization (Delegated Access)', 'Authentication (Identity & SSO)'],
            ['Token Issued', '<code>access_token</code> (Opaque string or JWT for API)', '<code>id_token</code> (JWT with user claims: sub, email, name)'],
            ['Analogy', 'A hotel keycard that opens Room 304', 'A government passport that proves your name & nationality'],
            ['Standard Scope', 'Custom scopes (e.g. <code>read:photos</code>)', 'Standardized <code>openid profile email</code> scopes'],
          ]}
        />

        <Callout variant="note">
          When you click &ldquo;Sign in with Google&rdquo; on a website, the application uses <strong>OpenID Connect</strong>.
          The authorization server returns an <code>id_token</code> that the client or backend decodes to establish
          the user&apos;s local account.
        </Callout>
      </ConceptBlock>

      {/* ===== Multi-Factor Authentication (MFA) ===== */}
      <ConceptBlock id="mfa" title="Multi-Factor Authentication (MFA)">
        <Definition term="MFA">
          A security mechanism requiring users to present two or more independent pieces of evidence
          (factors) from different categories before gaining access:
          1) <strong>Knowledge</strong> (something you know),
          2) <strong>Possession</strong> (something you have),
          3) <strong>Inherence</strong> (something you are).
        </Definition>

        <ComparisonTable
          headers={['Factor Category', 'Examples', 'Resistance to Phishing']}
          rows={[
            ['Something You Know', 'Password, PIN, Security Question answer', 'Low (Vulnerable to credential stuffing & phishing)'],
            ['Something You Have (SMS / Email OTP)', '6-digit SMS verification code', 'Low to Medium (Vulnerable to SIM-swapping & phishing proxy kits)'],
            ['Something You Have (TOTP App)', 'Google Authenticator, Authy, RFC 6238 time-based OTP', 'Medium (Phishable via real-time reverse proxies)'],
            ['Something You Have (FIDO2 / WebAuthn)', 'Hardware security keys (YubiKey), Apple TouchID / Passkeys', 'Very High (Cryptographically bound to origin; 100% phishing proof)'],
            ['Something You Are', 'Fingerprint, Facial Recognition, Iris scan', 'High (Physical biometric presence)'],
          ]}
        />
      </ConceptBlock>

      {/* ===== Password Security: Hashing & Salting ===== */}
      <ConceptBlock id="hashing-and-salting" title="Password Security — Hashing & Salting">
        <Definition term="Cryptographic Password Hashing">
          A one-way mathematical function that transforms a plaintext password into an irreversible,
          fixed-length string digest. Unlike encryption, a hash cannot be decrypted back into plaintext.
        </Definition>

        <FlowDiagram
          chart={`graph TD
    subgraph User Registration
      P[Plaintext Password: 'correcthorse'] --> S[Generate Random Salt: 'x8!9qA']
      P --> H[Slow Hash Function: bcrypt/Argon2]
      S --> H
      H --> R[(Store in DB: salt + hash)]
    end

    subgraph User Login Attempt
      L[Input: 'correcthorse'] --> F[Fetch stored salt from DB]
      F --> H2[Run same Hash Function]
      L --> H2
      H2 --> C{Hash matches stored DB hash?}
      C -->|Yes| OK[200 OK: Login Success]
      C -->|No| ERR[401 Unauthorized]
    end`}
          caption="Registration and Login verification with Cryptographic Salt and Hash"
        />

        <ComparisonTable
          headers={['Algorithm', 'Type', 'Status', 'Recommendation']}
          rows={[
            ['MD5 / SHA-1', 'General cryptographic hash', 'BROKEN', 'NEVER use for passwords. Billions of hashes computed per second on GPUs.'],
            ['SHA-256 / SHA-512', 'Fast cryptographic hash', 'UNSAFE FOR PASSWORDS', 'Too fast; susceptible to brute-force dictionary attacks.'],
            ['bcrypt', 'Adaptive password hash', 'SECURE & PROVEN', 'Standard choice. Configurable work factor (cost).'],
            ['Argon2id', 'Memory-hard password hash', 'GOLD STANDARD', 'Winner of Password Hashing Competition. Resistant to GPU/ASIC attacks.'],
            ['scrypt / PBKDF2', 'Key derivation function', 'SECURE', 'Good alternative with memory/time cost tuning.'],
          ]}
        />

        <CommonPitfall>
          <p>
            <strong>Why is Salting Essential?</strong><br />
            If two users choose the common password <code>&quot;P@ssword123&quot;</code> without a salt, their
            stored hashes in the database will be identical. Attackers use precomputed lookup tables called
            <strong> Rainbow Tables</strong> to reverse millions of un-salted hashes in seconds.
          </p>
          <p>
            A unique cryptographic salt guarantees that identical passwords generate completely different hashes,
            rendering rainbow table attacks useless.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Authorization Models: RBAC, ABAC, ReBAC ===== */}
      <ConceptBlock id="authorization-models" title="Authorization Models (RBAC, ABAC, ReBAC)">
        <p>
          Once identity is verified, backend systems enforce access control using one of three architectural models:
        </p>

        <ComparisonTable
          headers={['Model', 'Full Name', 'Core Principle', 'Best Suited For']}
          rows={[
            ['RBAC', 'Role-Based Access Control', 'Permissions are assigned to Roles; Users are assigned to Roles (e.g. Admin, Editor, Viewer).', 'Standard enterprise apps, internal tools, structured hierarchical teams.'],
            ['ABAC', 'Attribute-Based Access Control', 'Decisions evaluated dynamically based on attributes of User, Resource, Action, and Environment (time, IP, location).', 'High-security domains, banking, healthcare (e.g. &ldquo;Doctors in ER can view records only during shift hours&rdquo;).'],
            ['ReBAC', 'Relationship-Based Access Control', 'Permissions derived from relational graph paths (e.g., Google Zanzibar: &ldquo;User X is an owner of Folder Y which contains Document Z&rdquo;).', 'Google Drive, Notion, Figma, social graphs with collaborative sharing.'],
          ]}
        />

        <FlowDiagram
          chart={`graph TD
    subgraph RBAC Flow
      U1[User: Alice] --> R1[Role: Editor]
      R1 --> P1[Permission: post:write]
      R1 --> P2[Permission: post:read]
    end

    subgraph ABAC Flow
      U2[User: Bob<br/>dept: 'HR'] --> D{Policy Engine}
      RES[Resource: EmployeeSalary<br/>level: 4] --> D
      ENV[Context: Time = 2 PM<br/>IP = Corporate VPN] --> D
      D -->|Evaluate rules| DEC[Allow / Deny]
    end`}
          caption="RBAC role mapping vs. ABAC dynamic policy evaluation"
        />
      </ConceptBlock>

      {/* ===== CSRF & XSS Attacks ===== */}
      <ConceptBlock id="csrf-and-xss" title="Web Vulnerabilities: CSRF & XSS">
        <Definition term="Cross-Site Request Forgery (CSRF)">
          An attack that tricks a victim&apos;s authenticated browser into executing unwanted actions on a trusted
          web application where the user is currently authenticated (exploiting automatic cookie inclusion).
        </Definition>

        <Definition term="Cross-Site Scripting (XSS)">
          A vulnerability where an attacker injects malicious client-side JavaScript into a web page viewed
          by other users, enabling session hijacking, keylogging, and DOM defacement.
        </Definition>

        <ComparisonTable
          headers={['Attack', 'What It Exploits', 'How It Works', 'Primary Defenses']}
          rows={[
            ['CSRF', 'Trust a website has in the user&apos;s browser', 'Victim visits malicious site; hidden form submits request to bank.com; browser automatically sends session cookie', '1. SameSite=Strict cookies<br/>2. Anti-CSRF Synchronizer Tokens<br/>3. Custom request headers (X-Requested-With)'],
            ['XSS', 'Trust a user has in a website', 'Attacker injects &lt;script&gt; in comments; script executes in victim&apos;s browser and steals tokens', '1. Output encoding & HTML escaping<br/>2. Content Security Policy (CSP)<br/>3. HttpOnly cookies'],
          ]}
        />
      </ConceptBlock>

      {/* ===== Man-in-the-Middle (MITM) Attacks ===== */}
      <ConceptBlock id="mitm" title="Man-in-the-Middle (MITM) Attacks">
        <Definition term="MITM Attack">
          An attack where a malicious actor secretly intercepts, relays, and potentially alters communication
          between two parties (client and backend server) who believe they are communicating directly.
        </Definition>

        <FlowDiagram
          chart={`graph LR
    Client -->|1. Plaintext HTTP credentials| Attacker[Eavesdropper / Proxy]
    Attacker -->|2. Forward request| Server
    Server -->|3. Sensitive data| Attacker
    Attacker -->|4. Tampered response| Client`}
          caption="Unencrypted traffic is completely visible and modifiable by any intermediary router or proxy"
        />

        <Callout variant="important">
          <strong>The Non-Negotiable Defense: Enforce TLS Everywhere.</strong><br />
          Always enforce HTTPS in production. Deploy <code>Strict-Transport-Security (HSTS)</code> response headers
          (e.g., <code>Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code>) to force browsers
          to connect exclusively over encrypted channels, completely neutralizing SSL-stripping MITM attacks.
        </Callout>
      </ConceptBlock>

      {/* ===== Privilege Escalation & Timing Attacks ===== */}
      <ConceptBlock id="privilege-escalation-and-timing" title="Privilege Escalation & Timing Attacks">
        <Definition term="Privilege Escalation">
          <strong>Vertical Escalation:</strong> A standard user gains elevated permissions (e.g. regular user accesses <code>/api/admin/delete-database</code>).<br />
          <strong>Horizontal Escalation (IDOR):</strong> A user accesses another user&apos;s private resources of equal privilege (e.g., User 101 changes URL to <code>/api/orders/102</code> and views User 102&apos;s credit card).
        </Definition>

        <Definition term="Timing Attack">
          A side-channel attack where an adversary measures minute differences in execution time (nanoseconds/milliseconds)
          to deduce sensitive secrets (such as API keys, tokens, or password hashes).
        </Definition>

        <Example title="Vulnerable vs. Constant-Time string comparison">
          <CodeBlock language="javascript">
{`// ❌ VULNERABLE: Standard string equality returns early on first mismatch!
// Comparing "admin_key_abc" against "x..." takes 1ms
// Comparing "admin_key_abc" against "a..." takes 2ms (reveals first letter!)
function unsafeVerify(userInput, secretKey) {
  return userInput === secretKey;
}

// ✅ SECURE: Constant-Time comparison takes identical time regardless of match
function constantTimeVerify(userInput, secretKey) {
  // Uses crypto.timingSafeEqual or bitwise XOR accumulator
  return crypto.timingSafeEqual(
    Buffer.from(userInput), 
    Buffer.from(secretKey)
  );
}`}
          </CodeBlock>
        </Example>
      </ConceptBlock>

      {/* ===== Security Monitoring & Account Lockout ===== */}
      <ConceptBlock id="security-monitoring" title="Audit Logging, Failed Login Monitoring & Account Lockout">
        <Definition term="Security Audit Logging">
          The practice of recording tamper-proof, immutable logs of all security-critical events
          (logins, logouts, failed auth attempts, permission changes, password resets) with timestamps,
          IP addresses, and actor identifiers.
        </Definition>

        <Checklist
          items={[
            'Log all authentication successes and failures with IP address, User-Agent, and Correlation ID.',
            'Never log raw passwords, full credit card numbers, or secret cryptographic tokens.',
            'Implement progressive rate limiting (e.g. 5 attempts / min -> 10 minute exponential backoff).',
            'Enforce smart account lockout with CAPTCHA challenges to prevent brute-force attacks while avoiding Denial-of-Service.',
            'Send instant notification emails to users upon login from an unrecognized device or geographic location.',
          ]}
        />

        <InterviewQuestion question="How do you design an Account Lockout mechanism that stops brute-force attacks without enabling Denial-of-Service (DoS)?">
          <p>
            If you permanently lock an account after 5 failed attempts, an attacker can simply write a script to submit
            5 bad passwords for <code>ceo@company.com</code>, locking out legitimate users (Denial-of-Service).
          </p>
          <p>
            <strong>Best Practice Solution:</strong> Combine <strong>Progressive Delays</strong> (exponential backoff
            like 1s &rarr; 2s &rarr; 4s &rarr; 8s), <strong>IP-based rate limiting</strong>, and triggering a <strong>CAPTCHA challenge</strong>
            (Cloudflare Turnstile / reCAPTCHA) after 3 failures. If temporary lockout is required, lock for a short window
            (e.g., 15 minutes) and provide an instant email unlock link to the verified owner.
          </p>
        </InterviewQuestion>
      </ConceptBlock>

      {/* ===== End of Page ===== */}
      <Summary>
        <p>
          Authentication and Authorization form the security backbone of backend engineering. A defense-in-depth
          strategy combines secure credential storage (Argon2/bcrypt), robust transport encryption (TLS/HSTS),
          modern delegation protocols (OAuth 2.0 / OIDC), strict session and cookie controls (HttpOnly, SameSite=Strict),
          and continuous security monitoring with rate limiting to protect user data from evolving threats.
        </p>
      </Summary>

      <KeyTakeaways
        items={[
          'AuthN answers "Who are you?" (401 Unauthorized); AuthZ answers "What can you do?" (403 Forbidden).',
          'Stateful sessions store state on the server (Redis); Stateless tokens (JWT) encode state in self-contained cryptographic signatures.',
          'Never store auth tokens in localStorage — always use HttpOnly, Secure, SameSite=Strict cookies to prevent XSS theft.',
          'JWT payloads are Base64-encoded (not encrypted); never store sensitive secrets (passwords, PII) in JWT claims.',
          'Never use MD5 or fast SHA-256 for passwords. Always use slow, salted, memory-hard algorithms: Argon2id or bcrypt.',
          'OAuth 2.0 is for authorization (delegated access); OpenID Connect (OIDC) is for authentication (identity/SSO).',
          'Prevent CSRF with SameSite cookies and Anti-CSRF tokens; prevent XSS with strict input sanitization and Content-Security-Policy (CSP).',
          'Always use constant-time comparisons when verifying secret tokens or hashes to prevent timing attacks.',
        ]}
      />

      <FurtherReading
        links={[
          { title: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' },
          { title: 'RFC 6749 — The OAuth 2.0 Authorization Framework', url: 'https://datatracker.ietf.org/doc/html/rfc6749' },
          { title: 'RFC 7519 — JSON Web Token (JWT)', url: 'https://datatracker.ietf.org/doc/html/rfc7519' },
          { title: 'OpenID Connect Core 1.0 Specification', url: 'https://openid.net/specs/openid-connect-core-1_0.html' },
          { title: 'OWASP Top 10 Security Vulnerabilities', url: 'https://owasp.org/www-project-top-ten/' },
        ]}
      />
    </SectionPage>
  );
}
