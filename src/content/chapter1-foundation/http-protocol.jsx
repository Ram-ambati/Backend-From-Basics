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
import { InterviewQuestion, RealWorld, CommonPitfall } from '../../components/content/Admonitions';
import { Summary, KeyTakeaways } from '../../components/content/Summary';
import { FurtherReading } from '../../components/content/FurtherReading';

export default function HttpProtocol() {
  return (
    <SectionPage
      readingTime="25 min read"
      lastUpdated="Jul 2026"
      relatedTopics={[
        { title: 'Networking Fundamentals', path: '/foundation/networking-fundamentals' },
        { title: 'Routing', path: '/foundation/routing' },
      ]}
    >
      <p>
        HTTP (HyperText Transfer Protocol) is the application-layer protocol that powers
        the web. Every time a browser loads a page, an app fetches data from an API, or a
        microservice calls another — HTTP is the language they speak. Understanding its
        structure, rules, and evolution is non-negotiable for any backend engineer.
      </p>

      {/* ===== Structure of HTTP ===== */}
      <ConceptBlock id="structure-of-http" title="Structure of HTTP">
        <Definition term="HTTP (HyperText Transfer Protocol)">
          A stateless, text-based, application-layer protocol built on top of TCP (or QUIC
          in HTTP/3). It follows a strict Request-Response model: the client sends a request,
          the server processes it, and returns a response. Neither side retains memory of
          previous interactions by default.
        </Definition>

        <p>
          Every HTTP interaction consists of two parts: a <strong>Request</strong> (from client to
          server) and a <strong>Response</strong> (from server to client). Both follow a predictable
          structure:
        </p>

        <ComparisonTable
          headers={['Component', 'Request', 'Response']}
          rows={[
            ['Start Line', 'Method + Path + HTTP Version', 'HTTP Version + Status Code + Reason Phrase'],
            ['Headers', 'Metadata about the request', 'Metadata about the response'],
            ['Blank Line', 'Separates headers from body', 'Separates headers from body'],
            ['Body (optional)', 'Data being sent (POST, PUT)', 'Data being returned (HTML, JSON)'],
          ]}
        />

        <Callout variant="note">
          HTTP is <strong>stateless</strong> by design. Each request is independent — the server
          does not remember who you are between requests. State is layered on top using cookies,
          sessions, tokens (JWT), or other mechanisms.
        </Callout>
      </ConceptBlock>

      {/* ===== HTTP Raw Message ===== */}
      <ConceptBlock id="http-raw-message" title="HTTP Raw Message">
        <p>
          At the wire level, HTTP messages are plain text (in HTTP/1.x). Understanding what a raw
          message looks like helps you debug issues and reason about what frameworks abstract away.
        </p>

        <Example title="Raw HTTP Request">
          <CodeBlock language="bash">
{`GET /api/users?page=2 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOi...
User-Agent: Mozilla/5.0
Connection: keep-alive`}
          </CodeBlock>
        </Example>

        <Example title="Raw HTTP Response">
          <CodeBlock language="bash">
{`HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 245
Cache-Control: max-age=60
X-Request-Id: abc-123

{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}`}
          </CodeBlock>
        </Example>

        <Callout variant="tip">
          In HTTP/2 and HTTP/3, messages are no longer human-readable text. They are encoded into
          binary frames for performance. But the logical structure (method, headers, body) stays
          the same. Tools like browser DevTools still show them in the familiar text format.
        </Callout>
      </ConceptBlock>

      {/* ===== Headers ===== */}
      <ConceptBlock id="headers" title="Headers">
        <Definition term="HTTP Headers">
          Key-value pairs sent alongside requests and responses that carry metadata about the
          message. Headers control caching, authentication, content format, security policies,
          and much more.
        </Definition>

        <ComparisonTable
          headers={['Category', 'Header', 'Purpose']}
          rows={[
            ['General', 'Connection', 'Controls whether the connection stays open (keep-alive)'],
            ['Request', 'Host', 'The domain name of the target server (required in HTTP/1.1)'],
            ['Request', 'Accept', 'What content types the client can handle (e.g., application/json)'],
            ['Request', 'Authorization', 'Credentials for authentication (e.g., Bearer token)'],
            ['Request', 'User-Agent', 'Identifies the client software (browser, curl, etc.)'],
            ['Response', 'Content-Type', 'The format of the response body (e.g., text/html, application/json)'],
            ['Response', 'Content-Length', 'Size of the response body in bytes'],
            ['Response', 'Set-Cookie', 'Instructs the client to store a cookie'],
            ['Response', 'Cache-Control', 'Caching directives (max-age, no-cache, etc.)'],
            ['Security', 'X-Content-Type-Options', 'Prevents MIME-type sniffing (nosniff)'],
            ['Security', 'Strict-Transport-Security', 'Forces HTTPS for future requests (HSTS)'],
            ['Custom', 'X-Request-Id', 'Tracks a request across distributed systems'],
          ]}
        />

        <Callout variant="important">
          <p>
            Headers prefixed with <code>X-</code> were historically &quot;custom&quot; or
            &quot;experimental,&quot; but this convention was deprecated in RFC 6648. Modern custom
            headers should use meaningful names without the <code>X-</code> prefix. However, many
            widely-used headers like <code>X-Request-Id</code> and <code>X-Forwarded-For</code>
            still use the old convention.
          </p>
        </Callout>
      </ConceptBlock>

      {/* ===== Methods ===== */}
      <ConceptBlock id="methods" title="Methods">
        <Definition term="HTTP Method">
          A verb that tells the server what action to perform on the resource identified by
          the URL. Each method has specific semantic meaning, safety, and idempotency guarantees.
        </Definition>

        <ComparisonTable
          headers={['Method', 'Purpose', 'Has Body', 'Safe', 'Idempotent']}
          rows={[
            ['GET', 'Retrieve a resource', 'No', 'Yes', 'Yes'],
            ['HEAD', 'Same as GET but response has no body', 'No', 'Yes', 'Yes'],
            ['POST', 'Create a new resource or trigger an action', 'Yes', 'No', 'No'],
            ['PUT', 'Replace a resource entirely', 'Yes', 'No', 'Yes'],
            ['PATCH', 'Partially update a resource', 'Yes', 'No', 'No'],
            ['DELETE', 'Remove a resource', 'No', 'No', 'Yes'],
            ['OPTIONS', 'Describe communication options (used in CORS preflight)', 'No', 'Yes', 'Yes'],
          ]}
        />

        <Callout variant="note">
          <p>
            <strong>Safe</strong> means the method does not modify server state (read-only).
            <strong> Idempotent</strong> means calling it multiple times produces the same result
            as calling it once. GET is both safe and idempotent. POST is neither.
          </p>
        </Callout>

        <RealWorld title="PUT vs PATCH in practice">
          <p>
            <strong>PUT</strong> replaces the entire resource. If you PUT a user object without
            the email field, the email is deleted. <strong>PATCH</strong> only updates the fields
            you send. In practice, most APIs use PATCH for updates and reserve PUT for full
            replacements — but many APIs use them interchangeably, which is technically incorrect.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Idempotent vs Non-Idempotent ===== */}
      <ConceptBlock id="idempotent-vs-non-idempotent" title="Idempotent vs Non-Idempotent">
        <Definition term="Idempotency">
          An operation is idempotent if performing it multiple times has the same effect as
          performing it once. This is a critical concept for building reliable APIs and handling
          retries, network failures, and duplicate requests.
        </Definition>

        <ComparisonTable
          headers={['Property', 'Idempotent', 'Non-Idempotent']}
          rows={[
            ['Definition', 'Same result no matter how many times called', 'Each call may produce a different result'],
            ['Safe to retry?', 'Yes — retrying on timeout is safe', 'No — may create duplicates or unintended side effects'],
            ['HTTP Methods', 'GET, PUT, DELETE, HEAD, OPTIONS', 'POST, PATCH'],
            ['Example', 'DELETE /users/5 — deleting user 5 twice still results in user 5 being gone', 'POST /orders — submitting twice may create two orders'],
          ]}
        />

        <Example title="Why idempotency matters">
          <p>
            Imagine a payment API. A user clicks &quot;Pay&quot; and the request times out.
            Did the payment go through? The client doesn&apos;t know. If the endpoint is
            idempotent (e.g., using an idempotency key), the client can safely retry the
            request without risking a double charge.
          </p>
          <p>
            Common pattern: the client generates a unique <strong>idempotency key</strong> (e.g., a UUID)
            and sends it with the request. The server checks if it has already processed a request
            with that key. If yes, it returns the cached result instead of processing again.
          </p>
        </Example>

        <InterviewQuestion question="How would you make a POST endpoint idempotent?">
          <p>
            Use an <strong>idempotency key</strong>. The client sends a unique identifier
            (typically a UUID) in a header like <code>Idempotency-Key</code>. The server stores this key alongside
            the result of the first successful processing. On subsequent requests with the same
            key, the server returns the stored result instead of re-executing. This is the approach
            used by Stripe, PayPal, and most payment APIs.
          </p>
        </InterviewQuestion>
      </ConceptBlock>

      {/* ===== Status Codes ===== */}
      <ConceptBlock id="status-codes" title="Status Codes">
        <Definition term="HTTP Status Code">
          A three-digit number in the response&apos;s start line that indicates the outcome of
          the request. The first digit defines the category.
        </Definition>

        <ComparisonTable
          headers={['Range', 'Category', 'Meaning']}
          rows={[
            ['1xx', 'Informational', 'Request received, processing continues'],
            ['2xx', 'Success', 'Request was successfully received and processed'],
            ['3xx', 'Redirection', 'Further action needed to complete the request'],
            ['4xx', 'Client Error', 'The request contains an error on the client side'],
            ['5xx', 'Server Error', 'The server failed to fulfill a valid request'],
          ]}
        />

        <p>The most commonly encountered status codes:</p>

        <ComparisonTable
          headers={['Code', 'Name', 'When to use']}
          rows={[
            ['200', 'OK', 'Standard success for GET, PUT, PATCH'],
            ['201', 'Created', 'A new resource was successfully created (POST)'],
            ['204', 'No Content', 'Success but nothing to return (DELETE)'],
            ['301', 'Moved Permanently', 'Resource has a new permanent URL'],
            ['304', 'Not Modified', 'Client cache is still valid, no body sent'],
            ['400', 'Bad Request', 'Malformed syntax, invalid parameters'],
            ['401', 'Unauthorized', 'Authentication is missing or invalid'],
            ['403', 'Forbidden', 'Authenticated but not authorized for this resource'],
            ['404', 'Not Found', 'Resource does not exist'],
            ['405', 'Method Not Allowed', 'HTTP method not supported for this endpoint'],
            ['409', 'Conflict', 'Request conflicts with current state (e.g., duplicate)'],
            ['422', 'Unprocessable Entity', 'Valid syntax but semantic errors (validation failed)'],
            ['429', 'Too Many Requests', 'Rate limit exceeded'],
            ['500', 'Internal Server Error', 'Unhandled server-side exception'],
            ['502', 'Bad Gateway', 'Upstream server returned an invalid response'],
            ['503', 'Service Unavailable', 'Server is overloaded or under maintenance'],
            ['504', 'Gateway Timeout', 'Upstream server did not respond in time'],
          ]}
        />

        <CommonPitfall>
          <p>
            Don&apos;t return <code>200 OK</code> with an error message in the body. This is a
            common anti-pattern that breaks clients relying on status codes. If the operation
            failed, use the appropriate 4xx or 5xx code.
          </p>
        </CommonPitfall>

        <Quiz
          question="A user tries to access a resource they are logged in but don&apos;t have permission for. What status code should you return?"
          options={['401 Unauthorized', '403 Forbidden', '404 Not Found', '400 Bad Request']}
          correct={1}
          explanation="401 means 'not authenticated' (who are you?). 403 means 'authenticated but not authorized' (I know who you are, but you can't do this). Since the user is logged in but lacks permission, 403 is correct."
        />
      </ConceptBlock>

      {/* ===== Content Negotiation ===== */}
      <ConceptBlock id="content-negotiation" title="Content Negotiation">
        <Definition term="Content Negotiation">
          A mechanism where the client and server agree on the best representation of a resource.
          The client states its preferences via request headers, and the server responds with
          the most suitable format.
        </Definition>

        <ComparisonTable
          headers={['Header', 'Client Says', 'Server Decides']}
          rows={[
            ['Accept', '"I want JSON" (application/json)', 'Content-Type: application/json'],
            ['Accept-Language', '"I prefer French" (fr, en;q=0.5)', 'Content-Language: fr'],
            ['Accept-Encoding', '"I support gzip" (gzip, br)', 'Content-Encoding: gzip'],
            ['Accept-Charset', '"I prefer UTF-8" (utf-8)', 'charset=utf-8 in Content-Type'],
          ]}
        />

        <Callout variant="tip">
          The <code>q</code> parameter (quality value) indicates preference weight from 0 to 1.
          For example, <code>Accept-Language: fr;q=0.9, en;q=0.5</code> means &quot;I prefer
          French but English is acceptable.&quot; If the server can&apos;t satisfy any preference,
          it returns <code>406 Not Acceptable</code>.
        </Callout>
      </ConceptBlock>

      {/* ===== CORS ===== */}
      <ConceptBlock id="cors" title="CORS">
        <Definition term="Cross-Origin Resource Sharing (CORS)">
          A browser security mechanism that restricts web pages from making requests to a
          different origin (domain, protocol, or port) than the one serving the page.
          CORS headers tell the browser which cross-origin requests are allowed.
        </Definition>

        <p>
          By default, browsers enforce the <strong>Same-Origin Policy</strong>: JavaScript on
          <code> app.example.com</code> cannot fetch data from <code>api.different.com</code>.
          CORS relaxes this restriction in a controlled way via specific response headers.
        </p>

        <ComparisonTable
          headers={['Header', 'Purpose', 'Example Value']}
          rows={[
            ['Access-Control-Allow-Origin', 'Which origins can access the resource', 'https://app.example.com or *'],
            ['Access-Control-Allow-Methods', 'Which HTTP methods are permitted', 'GET, POST, PUT, DELETE'],
            ['Access-Control-Allow-Headers', 'Which custom headers can be sent', 'Authorization, Content-Type'],
            ['Access-Control-Allow-Credentials', 'Whether cookies/auth headers can be included', 'true'],
            ['Access-Control-Max-Age', 'How long to cache preflight results (seconds)', '86400'],
          ]}
        />

        <CommonPitfall>
          <p>
            Setting <code>Access-Control-Allow-Origin: *</code> is fine for public APIs but
            it <strong>cannot</strong> be used with <code>Access-Control-Allow-Credentials: true</code>.
            If you need to send cookies or auth headers cross-origin, you must specify the exact
            origin, not a wildcard.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Simple Requests & Preflight ===== */}
      <ConceptBlock id="simple-requests-and-preflight" title="Simple Requests & Preflight">
        <p>
          Not all cross-origin requests are treated equally. The browser classifies them into
          two categories: <strong>Simple Requests</strong> and requests that require a
          <strong> Preflight</strong>.
        </p>

        <ComparisonTable
          headers={['Criteria', 'Simple Request', 'Preflight Required']}
          rows={[
            ['Methods', 'GET, POST, HEAD only', 'PUT, PATCH, DELETE, or any other method'],
            ['Headers', 'Only "safe" headers (Accept, Content-Type with limited values, etc.)', 'Any custom header (Authorization, X-Custom-Header, etc.)'],
            ['Content-Type', 'text/plain, multipart/form-data, application/x-www-form-urlencoded', 'application/json or any other type'],
            ['What happens', 'Browser sends the request directly', 'Browser sends an OPTIONS request first to ask for permission'],
          ]}
        />

        <FlowDiagram
          chart={`sequenceDiagram
    participant B as Browser
    participant S as Server
    
    Note over B: Non-simple request detected
    B->>S: OPTIONS /api/data (Preflight)
    Note right of B: Origin: https://app.example.com<br/>Access-Control-Request-Method: PUT<br/>Access-Control-Request-Headers: Authorization
    S->>B: 204 No Content
    Note left of S: Access-Control-Allow-Origin: https://app.example.com<br/>Access-Control-Allow-Methods: PUT<br/>Access-Control-Max-Age: 86400
    Note over B: Permission granted
    B->>S: PUT /api/data (Actual Request)
    S->>B: 200 OK`}
          caption="CORS Preflight flow — the browser asks for permission before sending the real request"
        />

        <Callout variant="note">
          <p>
            The <code>Access-Control-Max-Age</code> header tells the browser how long to cache
            the preflight result. Without it, the browser sends an OPTIONS request before
            <em> every single</em> non-simple cross-origin request, which doubles your latency.
            Set it to a high value (e.g., 86400 = 24 hours) in production.
          </p>
        </Callout>

        <RealWorld title="Why most API calls trigger preflight">
          <p>
            If your frontend sends a request with <code>Content-Type: application/json</code> or
            includes an <code>Authorization</code> header (which nearly all authenticated APIs do),
            the request is <em>not</em> simple. The browser will always send a preflight
            OPTIONS request first. This is why CORS issues are one of the most common headaches
            in frontend-backend development.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Caching ===== */}
      <ConceptBlock id="caching" title="Caching">
        <Definition term="HTTP Caching">
          A mechanism to store copies of responses so that future identical requests can be served
          faster without hitting the origin server. Caching happens at multiple levels: browser,
          CDN, reverse proxy, and application.
        </Definition>

        <ComparisonTable
          headers={['Directive', 'Meaning']}
          rows={[
            ['max-age=N', 'Response is fresh for N seconds from the time of the request'],
            ['no-cache', 'Must revalidate with the server before using cached copy (confusing name — it does cache, but always checks)'],
            ['no-store', 'Never store this response anywhere (truly no caching)'],
            ['public', 'Any cache (CDN, proxy, browser) may store this response'],
            ['private', 'Only the end-user browser may cache this (not CDN/proxy)'],
            ['must-revalidate', 'Once stale, must check with origin before using cached copy'],
            ['s-maxage=N', 'Like max-age but only for shared caches (CDN/proxy)'],
            ['stale-while-revalidate=N', 'Serve stale content while revalidating in the background for N seconds'],
          ]}
        />

        <p>
          HTTP caching also uses <strong>conditional requests</strong> for revalidation:
        </p>
        <ul>
          <li>
            <strong>ETag / If-None-Match</strong> — the server assigns a fingerprint (hash) to
            the response. On the next request, the client sends the ETag back. If the content
            hasn&apos;t changed, the server returns <code>304 Not Modified</code> with no body.
          </li>
          <li>
            <strong>Last-Modified / If-Modified-Since</strong> — same concept but using timestamps
            instead of hashes.
          </li>
        </ul>

        <CommonPitfall>
          <p>
            <code>no-cache</code> does NOT mean &quot;don&apos;t cache.&quot; It means
            &quot;cache it, but revalidate with the server every time before using it.&quot;
            If you truly want zero caching, use <code>no-store</code>.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Persistent Connections ===== */}
      <ConceptBlock id="persistent-connections" title="Persistent Connections">
        <Definition term="Persistent Connection (Keep-Alive)">
          A TCP connection that remains open after the initial request-response cycle, allowing
          multiple HTTP requests to reuse the same connection instead of opening a new one each time.
        </Definition>

        <FlowDiagram
          chart={`sequenceDiagram
    participant C as Client
    participant S as Server

    Note over C,S: Without Keep-Alive (HTTP/1.0 default)
    C->>S: TCP Handshake
    C->>S: GET /page.html
    S->>C: Response
    C->>S: TCP Close
    C->>S: TCP Handshake (again!)
    C->>S: GET /style.css
    S->>C: Response
    C->>S: TCP Close

    Note over C,S: With Keep-Alive (HTTP/1.1 default)
    C->>S: TCP Handshake
    C->>S: GET /page.html
    S->>C: Response
    C->>S: GET /style.css (same connection!)
    S->>C: Response
    C->>S: GET /script.js (same connection!)
    S->>C: Response
    C->>S: TCP Close (when done)`}
          caption="Persistent connections eliminate repeated TCP handshake overhead"
        />

        <Callout variant="tip">
          In HTTP/1.1, persistent connections are the <strong>default</strong>. You have to
          explicitly send <code>Connection: close</code> to disable them. This is one of the
          biggest performance improvements HTTP/1.1 introduced over 1.0.
        </Callout>
      </ConceptBlock>

      {/* ===== Compression Types ===== */}
      <ConceptBlock id="compression-types" title="Compression Types">
        <Definition term="HTTP Compression">
          The process of encoding response bodies to reduce their size before transmission.
          The client advertises supported encodings via <code>Accept-Encoding</code>, and the
          server indicates which was used via <code>Content-Encoding</code>.
        </Definition>

        <ComparisonTable
          headers={['Algorithm', 'Header Value', 'Compression Ratio', 'Speed', 'Browser Support']}
          rows={[
            ['Gzip', 'gzip', 'Good (~70-80% for text)', 'Fast', 'Universal'],
            ['Brotli', 'br', 'Better (~20-25% smaller than gzip)', 'Slower to compress, fast to decompress', 'All modern browsers (HTTPS only)'],
            ['Deflate', 'deflate', 'Similar to gzip', 'Fast', 'Universal but less common'],
            ['Zstandard', 'zstd', 'Excellent (best ratio-to-speed)', 'Very fast', 'Growing support'],
          ]}
        />

        <Callout variant="best-practice">
          Use <strong>Brotli</strong> for static assets (pre-compressed at build time) and
          <strong> Gzip</strong> as a fallback. For dynamic content where compression happens on
          every request, Gzip is often preferred because Brotli&apos;s higher compression levels
          are too slow for real-time compression.
        </Callout>
      </ConceptBlock>

      {/* ===== HTTP Version History ===== */}
      <ConceptBlock id="http-09" title="HTTP 0.9">
        <p>
          The original HTTP (1991) was astonishingly simple. It had only one method
          (<code>GET</code>), no headers, no status codes, and could only transfer HTML.
          The connection closed immediately after the response.
        </p>

        <Example title="An entire HTTP 0.9 exchange">
          <CodeBlock language="bash">
{`GET /page.html

<html>Hello World</html>`}
          </CodeBlock>
          <p>
            That&apos;s it. No headers. No status line. No content type. Just a one-line request
            and a raw HTML response. The connection closes immediately after.
          </p>
        </Example>
      </ConceptBlock>

      <ConceptBlock id="http-10" title="HTTP 1.0">
        <p>
          HTTP 1.0 (1996, RFC 1945) introduced the fundamentals we still use today:
        </p>
        <ul>
          <li>Headers (request and response)</li>
          <li>Status codes (200, 404, 500, etc.)</li>
          <li>Additional methods (POST, HEAD)</li>
          <li>Content-Type header (serving images, not just HTML)</li>
          <li>HTTP version in the request line</li>
        </ul>

        <Callout variant="warning">
          HTTP 1.0&apos;s biggest limitation: <strong>one request per connection</strong>.
          Every request required a new TCP handshake. Loading a page with 20 images meant
          20 separate TCP connections. This was extremely wasteful and slow.
        </Callout>
      </ConceptBlock>

      <ConceptBlock id="http-11" title="HTTP 1.1">
        <p>
          HTTP 1.1 (1997, RFC 2068; revised in RFC 2616 and RFC 7230-7235) is the workhorse
          of the web. It introduced critical performance and reliability improvements:
        </p>
        <ul>
          <li><strong>Persistent connections</strong> (keep-alive) by default</li>
          <li><strong>Pipelining</strong> — sending multiple requests without waiting for each
            response (though rarely used in practice due to head-of-line blocking)</li>
          <li><strong>Chunked transfer encoding</strong> — streaming responses of unknown length</li>
          <li><strong>Host header</strong> — mandatory, enabling virtual hosting (multiple sites on one IP)</li>
          <li><strong>Cache-Control</strong> — fine-grained caching directives</li>
          <li><strong>Content negotiation</strong> — Accept, Accept-Language, Accept-Encoding</li>
          <li><strong>Range requests</strong> — resumable downloads</li>
        </ul>

        <CommonPitfall>
          <p>
            <strong>Head-of-line (HOL) blocking</strong> is HTTP/1.1&apos;s biggest problem.
            Even with persistent connections, responses must be returned in the same order as
            requests. If the first response is slow, all subsequent responses are blocked behind
            it. Browsers work around this by opening 6-8 parallel TCP connections per domain,
            but this wastes resources.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      <ConceptBlock id="http-20" title="HTTP 2.0">
        <p>
          HTTP/2 (2015, RFC 7540) was a major leap, solving HTTP/1.1&apos;s performance problems
          while maintaining full backward compatibility at the semantic level.
        </p>

        <ComparisonTable
          headers={['Feature', 'HTTP/1.1', 'HTTP/2']}
          rows={[
            ['Format', 'Text-based', 'Binary framing layer'],
            ['Multiplexing', 'No — one request at a time per connection', 'Yes — multiple streams on a single connection'],
            ['Header compression', 'None', 'HPACK compression'],
            ['Server Push', 'No', 'Yes — server can proactively send resources'],
            ['Prioritization', 'No', 'Yes — clients can weight streams'],
            ['Connections needed', '6-8 per domain', '1 per domain'],
          ]}
        />

        <FlowDiagram
          chart={`graph LR
    subgraph HTTP/1.1
      A1[Request 1] --> B1[Response 1]
      A2[Request 2] -->|Blocked until 1 finishes| B2[Response 2]
      A3[Request 3] -->|Blocked until 2 finishes| B3[Response 3]
    end
    subgraph HTTP/2
      C1[Stream 1] --> D1[Response 1]
      C2[Stream 2] --> D2[Response 2]
      C3[Stream 3] --> D3[Response 3]
    end`}
          caption="HTTP/2 multiplexing eliminates head-of-line blocking at the HTTP layer"
        />

        <Callout variant="note">
          HTTP/2 solves HOL blocking at the <em>HTTP layer</em>, but the problem still exists at
          the <em>TCP layer</em>. If a single TCP packet is lost, the entire TCP connection stalls
          (all streams). This is the motivation for HTTP/3.
        </Callout>
      </ConceptBlock>

      <ConceptBlock id="http-30-and-quic" title="HTTP 3.0 & QUIC">
        <Definition term="QUIC">
          A transport protocol built on <strong>UDP</strong> instead of TCP. It integrates
          TLS 1.3 directly into the transport layer, provides built-in multiplexing without
          head-of-line blocking, and supports connection migration (switching networks without
          dropping the connection).
        </Definition>

        <p>
          HTTP/3 (2022, RFC 9114) replaces TCP with QUIC as its transport layer. This is the
          most fundamental change in HTTP&apos;s history — swapping the transport protocol entirely.
        </p>

        <ComparisonTable
          headers={['Feature', 'HTTP/2 (over TCP)', 'HTTP/3 (over QUIC/UDP)']}
          rows={[
            ['Transport', 'TCP', 'QUIC (built on UDP)'],
            ['Handshake', 'TCP handshake + TLS handshake (2-3 RTTs)', '0-RTT or 1-RTT (TLS baked in)'],
            ['HOL Blocking', 'TCP-level HOL blocking still exists', 'Eliminated — streams are independent'],
            ['Connection migration', 'Drops when IP changes (e.g., WiFi → mobile)', 'Survives network changes via Connection IDs'],
            ['Encryption', 'Optional TLS layer', 'Always encrypted (TLS 1.3 mandatory)'],
          ]}
        />

        <InterviewQuestion question="Why does HTTP/3 use UDP instead of TCP?">
          <p>
            TCP&apos;s reliability mechanisms (ordered delivery, congestion control) are baked into
            the kernel and cannot be modified. TCP&apos;s head-of-line blocking and slow
            handshakes are fundamental limitations. By building QUIC on top of UDP, the protocol
            engineers could implement their own reliability, multiplexing, and encryption in user
            space — allowing faster iteration and eliminating TCP&apos;s structural issues. QUIC
            is not &quot;unreliable UDP&quot; — it implements its own reliability on top of UDP,
            but does so per-stream rather than per-connection.
          </p>
        </InterviewQuestion>
      </ConceptBlock>

      {/* ===== HOPS ===== */}
      <ConceptBlock id="hops" title="HOPS">
        <Definition term="Hop">
          Each intermediate device (router, proxy, load balancer, CDN edge server) that an
          HTTP request passes through on its way from client to server. Each transition between
          devices is one &quot;hop.&quot;
        </Definition>

        <FlowDiagram
          chart={`graph LR
    A[Client] -->|Hop 1| B[ISP Router]
    B -->|Hop 2| C[Internet Backbone]
    C -->|Hop 3| D[CDN Edge]
    D -->|Hop 4| E[Load Balancer]
    E -->|Hop 5| F[Reverse Proxy]
    F -->|Hop 6| G[Application Server]`}
          caption="A typical request may traverse 5-15 hops"
        />

        <p>
          Each hop adds latency. Some hops are transparent (network routers), while others
          are application-aware (proxies that can inspect and modify HTTP headers).
        </p>

        <Callout variant="tip">
          The <code>X-Forwarded-For</code> header tracks the chain of IP addresses as the request
          passes through proxies. The <code>Via</code> header records which intermediate proxies
          handled the request. These are essential for logging, rate limiting, and geo-routing.
        </Callout>
      </ConceptBlock>

      {/* ===== Multipart Uploads & Streaming ===== */}
      <ConceptBlock id="multipart-uploads-and-streaming" title="Multipart Uploads & Streaming">
        <Definition term="Multipart Form Data">
          An HTTP body encoding format (<code>multipart/form-data</code>) that allows a single
          request to carry multiple pieces of data with different content types — typically used
          for file uploads combined with metadata fields.
        </Definition>

        <p>
          When a standard JSON body isn&apos;t enough (e.g., uploading a profile picture along
          with a username), multipart encoding lets you send mixed content types in one request.
          Each part has its own headers (Content-Type, Content-Disposition) separated by a
          boundary string.
        </p>

        <Callout variant="note">
          <p>
            <strong>Chunked Transfer Encoding</strong> is a different concept — it allows the
            server to send a response in chunks without knowing the total size upfront. This is
            the foundation for streaming responses (e.g., streaming a large database export,
            Server-Sent Events).
          </p>
        </Callout>

        <ComparisonTable
          headers={['Approach', 'Use Case', 'How It Works']}
          rows={[
            ['Multipart Upload', 'File upload with metadata', 'Single request with boundary-separated parts'],
            ['Chunked Transfer', 'Streaming responses of unknown length', 'Response sent in chunks, each prefixed with its size'],
            ['Server-Sent Events (SSE)', 'One-way real-time server → client updates', 'Long-lived HTTP connection, server pushes events as text/event-stream'],
            ['WebSocket', 'Full-duplex real-time communication', 'Upgrades from HTTP to a persistent bidirectional socket'],
          ]}
        />

        <RealWorld title="Large file uploads in production">
          <p>
            For very large files (hundreds of MBs), multipart uploads are typically combined with
            <strong> resumable upload protocols</strong>. The client uploads the file in fixed-size
            chunks, each as a separate request. If the connection drops, the upload resumes from
            the last successful chunk instead of starting over. Cloud storage services (S3,
            Google Cloud Storage) all implement this pattern.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== End of Page ===== */}
      <Summary>
        <p>
          HTTP is a deceptively simple protocol — text-based requests and responses — but its
          nuances around methods, idempotency, caching, CORS, and versioning are what separate
          a working API from a production-grade one. Understanding the evolution from 0.9&apos;s
          single-line requests to HTTP/3&apos;s QUIC-based multiplexing gives you the context
          to make informed architectural decisions.
        </p>
      </Summary>

      <KeyTakeaways
        items={[
          'HTTP is stateless and follows a strict Request-Response model. State is layered on top via cookies, tokens, or sessions.',
          'Methods have semantic meaning — GET is safe and idempotent, POST is neither. Use idempotency keys for critical operations.',
          'Status codes communicate intent: 2xx for success, 4xx for client errors, 5xx for server errors. Never return 200 with an error body.',
          'CORS is a browser security mechanism. Most authenticated API calls trigger a preflight OPTIONS request. Cache preflight results with Access-Control-Max-Age.',
          'HTTP/1.1 introduced persistent connections. HTTP/2 added multiplexing. HTTP/3 replaced TCP with QUIC to eliminate all head-of-line blocking.',
          'Caching is controlled by Cache-Control headers. no-cache does NOT mean "don\'t cache" — use no-store for that.',
        ]}
      />

      <FurtherReading
        links={[
          { title: 'MDN — HTTP Overview', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
          { title: 'HTTP/2 Explained — Daniel Stenberg', url: 'https://http2-explained.haxx.se/' },
          { title: 'HTTP/3 Explained — Daniel Stenberg', url: 'https://http3-explained.haxx.se/' },
          { title: 'CORS in 100 Seconds — Fireship', url: 'https://www.youtube.com/watch?v=4KHiSt0oLJ0' },
        ]}
      />
    </SectionPage>
  );
}
