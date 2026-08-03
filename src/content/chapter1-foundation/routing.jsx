import SectionPage from '../../components/content/SectionPage';
import ConceptBlock from '../../components/content/ConceptBlock';
import Definition from '../../components/content/Definition';
import Callout from '../../components/ui/Callout';
import ComparisonTable from '../../components/content/ComparisonTable';
import FlowDiagram from '../../components/content/FlowDiagram';
import Example from '../../components/content/Example';
import Quiz from '../../components/content/Quiz';
import { InterviewQuestion, RealWorld, CommonPitfall } from '../../components/content/Admonitions';
import { Summary, KeyTakeaways } from '../../components/content/Summary';
import { FurtherReading } from '../../components/content/FurtherReading';
import ProsConsList from '../../components/content/ProsConsList';

export default function Routing() {
  return (
    <SectionPage
      readingTime="18 min read"
      lastUpdated="Aug 2026"
      relatedTopics={[
        { title: 'HTTP Protocol', path: '/foundation/http-protocol' },
        { title: 'Middlewares', path: '/request-processing/middlewares' },
      ]}
    >
      <p>
        When a request arrives at your backend, the very first question is: <em>which piece of
        code should handle this?</em> That decision is made by the <strong>router</strong>. Routing
        is the mechanism that maps incoming URLs and HTTP methods to specific handler functions —
        it is the switchboard of your entire application.
      </p>

      {/* ===== How Routing Maps URLs ===== */}
      <ConceptBlock id="how-routing-maps-urls" title="How Routing Maps URLs">
        <Definition term="Routing">
          The process of examining an incoming HTTP request&apos;s URL path and method, then
          dispatching it to the appropriate handler function. A <strong>router</strong> is
          the component responsible for maintaining a table of registered routes and finding
          the best match for each incoming request.
        </Definition>

        <p>
          Think of a router like a phone switchboard operator. A call (request) comes in with
          a destination (URL + method). The operator (router) looks up the routing table and
          connects the call to the right department (handler). If no match is found, the
          operator returns a busy signal (404 Not Found).
        </p>

        <FlowDiagram
          chart={`graph LR
    A[Incoming Request<br/>GET /api/users/42] --> B{Router}
    B -->|matches /api/users/:id| C[getUserById handler]
    B -->|no match| D[404 Not Found]

    E[Incoming Request<br/>POST /api/users] --> B
    B -->|matches POST /api/users| F[createUser handler]`}
          caption="The router matches the URL pattern and HTTP method to a handler function"
        />

        <Callout variant="note">
          Routing is purely about <strong>dispatching</strong>. The router does not execute
          business logic itself — it just decides <em>who</em> handles the request. The actual
          work happens in the handler (also called a controller, action, or endpoint depending
          on the framework).
        </Callout>
      </ConceptBlock>

      {/* ===== Routing & HTTP Methods ===== */}
      <ConceptBlock id="routing-and-http-methods" title="Routing & HTTP Methods">
        <p>
          A route is not just a URL — it is the combination of a <strong>URL pattern</strong> and
          an <strong>HTTP method</strong>. The same path can be handled by completely different
          functions depending on the method. This is a core principle of RESTful API design.
        </p>

        <ComparisonTable
          headers={['Method', 'Path', 'Purpose', 'Handler']}
          rows={[
            ['GET', '/api/users', 'List all users', 'listUsers'],
            ['POST', '/api/users', 'Create a new user', 'createUser'],
            ['GET', '/api/users/:id', 'Get a specific user', 'getUserById'],
            ['PUT', '/api/users/:id', 'Replace a user entirely', 'replaceUser'],
            ['PATCH', '/api/users/:id', 'Update specific user fields', 'updateUser'],
            ['DELETE', '/api/users/:id', 'Delete a user', 'deleteUser'],
          ]}
        />

        <p>
          Notice how <code>/api/users</code> maps to two different handlers — one for GET
          (retrieve) and one for POST (create). And <code>/api/users/:id</code> maps to four
          different handlers depending on the method. The router considers <em>both</em> the
          path and the method when matching.
        </p>

        <Callout variant="tip">
          If a request matches the path but not the method (e.g., sending a PATCH to a path that
          only has GET and POST handlers), the server should return <code>405 Method Not
          Allowed</code>, not <code>404 Not Found</code>. The resource exists — the method
          is just wrong.
        </Callout>
      </ConceptBlock>

      {/* ===== Path Parameters ===== */}
      <ConceptBlock id="path-parameters" title="Path Parameters">
        <Definition term="Path Parameter">
          A dynamic segment in a URL path that acts as a variable placeholder. It captures a
          value from the URL and makes it available to the handler. Typically denoted with a
          colon prefix (e.g., <code>:id</code>) or curly braces (e.g., <code>&#123;id&#125;</code>)
          depending on the framework.
        </Definition>

        <Example title="Path parameters in action">
          <p>
            Given the route pattern: <code>/api/users/:userId/posts/:postId</code>
          </p>
          <p>
            And a request to: <code>/api/users/42/posts/7</code>
          </p>
          <p>
            The router extracts: <code>userId = &quot;42&quot;</code>, <code>postId = &quot;7&quot;</code>
          </p>
        </Example>

        <CommonPitfall>
          <p>
            Path parameters are <strong>always extracted as strings</strong>. If your handler
            expects a number, you must explicitly parse and validate it. Forgetting this leads
            to subtle bugs — for example, comparing <code>&quot;42&quot; === 42</code> returns
            false in many languages. Always validate and cast path parameters before using them.
          </p>
        </CommonPitfall>

        <Callout variant="best-practice">
          Use path parameters for <strong>resource identifiers</strong> — the specific entity
          you&apos;re operating on. Use query parameters for everything else (filtering, sorting,
          pagination). <code>/users/42</code> identifies user 42. <code>/users?role=admin</code>
          filters the user list.
        </Callout>
      </ConceptBlock>

      {/* ===== Query Parameters ===== */}
      <ConceptBlock id="query-parameters" title="Query Parameters">
        <Definition term="Query Parameter">
          Key-value pairs appended to a URL after a <code>?</code> character. Multiple parameters
          are separated by <code>&amp;</code>. They are used for optional, non-hierarchical data
          like filtering, sorting, pagination, and search.
        </Definition>

        <Example title="Common query parameter patterns">
          <ComparisonTable
            headers={['URL', 'Purpose']}
            rows={[
              ['/api/users?page=2&limit=20', 'Pagination'],
              ['/api/users?role=admin&active=true', 'Filtering'],
              ['/api/users?sort=created_at&order=desc', 'Sorting'],
              ['/api/users?search=alice', 'Search'],
              ['/api/users?fields=name,email', 'Field selection (sparse fieldsets)'],
            ]}
          />
        </Example>

        <ComparisonTable
          headers={['Aspect', 'Path Parameters', 'Query Parameters']}
          rows={[
            ['Purpose', 'Identify a specific resource', 'Filter, sort, paginate, or modify a collection'],
            ['Required?', 'Usually required — the route won\'t match without them', 'Usually optional — sensible defaults apply'],
            ['Position in URL', 'Part of the path (/users/42)', 'After the ? (/users?page=2)'],
            ['Affects caching', 'Yes — different path = different cache entry', 'Yes — different query string = different cache entry'],
            ['Example', '/api/orders/ORD-789', '/api/orders?status=shipped&from=2024-01-01'],
          ]}
        />

        <RealWorld title="Pagination patterns in production APIs">
          <p>
            There are two dominant pagination patterns: <strong>offset-based</strong>
            (<code>?page=3&amp;limit=20</code>) and <strong>cursor-based</strong>
            (<code>?cursor=eyJpZCI6NDJ9&amp;limit=20</code>). Offset-based is simpler but
            breaks with large datasets (skipping millions of rows is slow). Cursor-based is
            more efficient — the cursor is an opaque token pointing to the last item seen.
            APIs like Twitter, Slack, and Stripe use cursor-based pagination.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Static vs Dynamic Routes ===== */}
      <ConceptBlock id="static-vs-dynamic-routes" title="Static vs Dynamic Routes">
        <p>
          Routes fall into two categories based on whether the path contains variable segments.
        </p>

        <ComparisonTable
          headers={['Type', 'Example', 'Matches', 'Use Case']}
          rows={[
            ['Static', '/api/health', 'Exactly /api/health', 'Fixed endpoints — health checks, login, docs'],
            ['Static', '/api/users', 'Exactly /api/users', 'Collection endpoints'],
            ['Dynamic', '/api/users/:id', '/api/users/42, /api/users/abc', 'Single-resource endpoints'],
            ['Dynamic', '/api/:version/users', '/api/v1/users, /api/v2/users', 'Versioned endpoints'],
          ]}
        />

        <Callout variant="important">
          <p>
            When both a static and dynamic route could match, <strong>static routes take
            priority</strong>. For example, if you have both <code>/users/me</code> (static)
            and <code>/users/:id</code> (dynamic), a request to <code>/users/me</code> should
            match the static route, not the dynamic one with <code>id = &quot;me&quot;</code>.
            Most routers handle this correctly, but route order can matter in some frameworks.
          </p>
        </Callout>
      </ConceptBlock>

      {/* ===== Nested & Hierarchical Routes ===== */}
      <ConceptBlock id="nested-and-hierarchical-routes" title="Nested & Hierarchical Routes">
        <p>
          Nested routes express <strong>parent-child relationships</strong> between resources
          directly in the URL structure. They make the resource hierarchy explicit and intuitive.
        </p>

        <FlowDiagram
          chart={`graph TD
    A["/api/users"] --> B["/api/users/:userId"]
    B --> C["/api/users/:userId/posts"]
    C --> D["/api/users/:userId/posts/:postId"]
    D --> E["/api/users/:userId/posts/:postId/comments"]
    E --> F["/api/users/:userId/posts/:postId/comments/:commentId"]`}
          caption="Resource hierarchy expressed through nested URL segments"
        />

        <Example title="Nested route structure for a blog API">
          <ComparisonTable
            headers={['Route', 'Description']}
            rows={[
              ['GET /api/users/:userId', 'Get a user'],
              ['GET /api/users/:userId/posts', 'Get all posts by a user'],
              ['POST /api/users/:userId/posts', 'Create a post for a user'],
              ['GET /api/users/:userId/posts/:postId', 'Get a specific post by a user'],
              ['GET /api/users/:userId/posts/:postId/comments', 'Get comments on a post'],
            ]}
          />
        </Example>

        <CommonPitfall>
          <p>
            <strong>Don&apos;t over-nest.</strong> URLs deeper than 3 levels become hard to
            read and maintain. If a resource can be identified globally (e.g., a post has a
            unique ID across all users), prefer a flat route:
          </p>
          <ul>
            <li>❌ <code>/users/42/posts/7/comments/99</code> (3 levels deep)</li>
            <li>✅ <code>/comments/99</code> (if comment IDs are globally unique)</li>
            <li>✅ <code>/posts/7/comments</code> (1 level of nesting is fine)</li>
          </ul>
          <p>
            A good rule of thumb: nest only when the child resource <em>cannot exist</em>
            without the parent.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Wildcard, RegEx & Catch-all ===== */}
      <ConceptBlock id="wildcard-regex-catch-all" title="Wildcard, RegEx & Catch-all">
        <p>
          Beyond static and parameterized routes, routers support more powerful pattern matching
          for special cases.
        </p>

        <ComparisonTable
          headers={['Pattern Type', 'Syntax (typical)', 'Example', 'Use Case']}
          rows={[
            ['Wildcard', '/files/*', 'Matches /files/a, /files/a/b/c', 'Serving static files, catch-all sub-paths'],
            ['RegEx Constraint', '/users/:id(\\d+)', 'Matches /users/42 but NOT /users/abc', 'Restricting parameter format'],
            ['Catch-all', '/* (registered last)', 'Matches anything not caught by other routes', 'Custom 404 pages, SPA fallbacks'],
          ]}
        />

        <Callout variant="tip">
          Catch-all routes should <strong>always be registered last</strong>. They act as a
          safety net for any request that didn&apos;t match a more specific route. In single-page
          applications, the catch-all typically serves <code>index.html</code> so client-side
          routing can take over.
        </Callout>

        <RealWorld title="RegEx constraints in practice">
          <p>
            Without a regex constraint, a route like <code>/users/:id</code> will match
            <code>/users/42</code> AND <code>/users/settings</code>. If you also have a
            static route <code>/users/settings</code>, the order of registration determines
            which wins. Adding a constraint like <code>:id(\d+)</code> (digits only) eliminates
            the ambiguity entirely — <code>/users/settings</code> will never accidentally match
            the dynamic route.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Route Matching ===== */}
      <ConceptBlock id="route-matching" title="Route Matching">
        <p>
          When multiple route patterns could match an incoming request, the router must decide
          which one wins. Different routers use different strategies, but the general priority
          order is:
        </p>

        <ol>
          <li><strong>Exact static match</strong> — <code>/users/me</code> beats <code>/users/:id</code></li>
          <li><strong>Parameterized match</strong> — <code>/users/:id</code> beats <code>/users/*</code></li>
          <li><strong>Wildcard / catch-all</strong> — <code>/*</code> matches anything left</li>
        </ol>

        <FlowDiagram
          chart={`graph TD
    A[Request: GET /users/me] --> B{Check static routes}
    B -->|"/users/me" exists| C[Match: static handler]
    B -->|not found| D{Check parameterized routes}
    D -->|"/users/:id" exists| E["Match: dynamic handler (id='me')"]
    D -->|not found| F{Check wildcard routes}
    F -->|"/*" exists| G[Match: catch-all handler]
    F -->|not found| H[404 Not Found]`}
          caption="Route matching priority — most specific wins"
        />

        <Callout variant="warning">
          <p>
            Some routers use <strong>first-match</strong> (the first registered route that
            matches wins) while others use <strong>best-match</strong> (the most specific
            match wins regardless of registration order). If your router uses first-match,
            registration order is critical — always register specific routes before generic ones.
          </p>
        </Callout>

        <Quiz
          question="You have these routes registered: (1) /api/users/:id, (2) /api/users/me, (3) /api/*. A request comes in for GET /api/users/me. In a best-match router, which route wins?"
          options={['/api/users/:id (dynamic)', '/api/users/me (static)', '/api/* (wildcard)', 'Depends on registration order']}
          correct={1}
          explanation="In a best-match router, the most specific match wins. '/api/users/me' is an exact static match, which has higher priority than the parameterized '/api/users/:id' or the wildcard '/api/*'."
        />
      </ConceptBlock>

      {/* ===== Route Grouping ===== */}
      <ConceptBlock id="route-grouping" title="Route Grouping">
        <Definition term="Route Group">
          A way to organize related routes under a shared prefix and/or shared middleware.
          Groups reduce repetition and make it clear which routes share common behavior
          (like authentication, rate limiting, or a URL prefix).
        </Definition>

        <Example title="Route grouping by prefix and middleware">
          <p>
            Instead of repeating the prefix and auth middleware on every route:
          </p>
          <ComparisonTable
            headers={['Ungrouped (repetitive)', 'Grouped (clean)']}
            rows={[
              ['GET  /api/v1/admin/users   [auth, adminOnly]', 'Group: /api/v1/admin  [auth, adminOnly]'],
              ['POST /api/v1/admin/users   [auth, adminOnly]', '    GET  /users'],
              ['GET  /api/v1/admin/reports [auth, adminOnly]', '    POST /users'],
              ['DELETE /api/v1/admin/users/:id [auth, adminOnly]', '    GET  /reports'],
              ['', '    DELETE /users/:id'],
            ]}
          />
        </Example>

        <RealWorld title="Common grouping patterns">
          <p>
            Most production APIs group routes into at least three tiers:
          </p>
          <ul>
            <li><strong>Public</strong> — <code>/api/public/*</code> — no auth required (login, health checks, public data)</li>
            <li><strong>Authenticated</strong> — <code>/api/*</code> — requires a valid token</li>
            <li><strong>Admin</strong> — <code>/api/admin/*</code> — requires admin role</li>
          </ul>
          <p>
            Each group applies its own middleware stack, keeping the route definitions clean
            and the security boundaries explicit.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Versioning & Versioning Techniques ===== */}
      <ConceptBlock id="versioning" title="Versioning & Versioning Techniques">
        <Definition term="API Versioning">
          The practice of maintaining multiple versions of an API simultaneously so that
          existing clients continue to work while new features or breaking changes are
          introduced. Versioning is essential for any API with external consumers.
        </Definition>

        <p>
          When you need to make a breaking change (removing a field, changing a response
          structure, renaming an endpoint), you can&apos;t just update the existing API — that
          would break every client using it. Instead, you release a new version and give clients
          time to migrate.
        </p>

        <ComparisonTable
          headers={['Technique', 'Example', 'Where Version Lives']}
          rows={[
            ['URL Path', '/api/v1/users, /api/v2/users', 'In the URL'],
            ['Custom Header', 'Api-Version: 2', 'In a request header'],
            ['Accept Header', 'Accept: application/vnd.myapi.v2+json', 'In the Accept header (media type versioning)'],
            ['Query Parameter', '/api/users?version=2', 'In query string'],
          ]}
        />

        <ProsConsList
          pros={[
            'URL Path — Most common and most visible. Easy to test in a browser. Easy to route.',
            'Header-based — Keeps URLs clean. Follows HTTP semantics (content negotiation).',
          ]}
          cons={[
            'URL Path — Duplicates entire route trees. Looks like a different resource when it\'s the same.',
            'Header-based — Harder to test (can\'t just paste a URL). Easy to forget the header.',
            'Query Parameter — Not recommended. Mixes resource identification with metadata.',
          ]}
        />

        <InterviewQuestion question="How do you decide when to bump an API version?">
          <p>
            Only create a new version for <strong>breaking changes</strong> — changes that would
            cause existing clients to fail. Examples: removing a field, changing a field type,
            renaming an endpoint, or changing error response format. Additive changes (adding new
            fields, new endpoints) are backward-compatible and do NOT require a new version.
          </p>
          <p>
            Best practice: version your API from day one (<code>/v1/</code>), even if you don&apos;t
            plan on v2 yet. It&apos;s much harder to retrofit versioning later. Maintain at most
            2-3 active versions and set clear deprecation timelines.
          </p>
        </InterviewQuestion>
      </ConceptBlock>

      {/* ===== Secure Routes ===== */}
      <ConceptBlock id="secure-routes" title="Secure Routes">
        <p>
          Not every route should be accessible to everyone. <strong>Secure routes</strong> are
          routes protected by authentication and/or authorization checks, typically implemented
          through middleware that runs before the handler.
        </p>

        <FlowDiagram
          chart={`graph LR
    A[Request] --> B{Auth Middleware}
    B -->|No token / invalid| C[401 Unauthorized]
    B -->|Valid token| D{Authorization Check}
    D -->|Insufficient role| E[403 Forbidden]
    D -->|Authorized| F[Route Handler]`}
          caption="Middleware guard chain for secure routes"
        />

        <ComparisonTable
          headers={['Route Type', 'Protection Level', 'Example']}
          rows={[
            ['Public', 'No auth required', 'GET /api/health, POST /api/auth/login'],
            ['Authenticated', 'Valid token required', 'GET /api/users/me, POST /api/posts'],
            ['Role-based', 'Token + specific role required', 'DELETE /api/admin/users/:id (admin only)'],
            ['Owner-only', 'Token + must own the resource', 'PUT /api/users/:id (can only edit yourself)'],
          ]}
        />

        <Callout variant="best-practice">
          <p>
            Default to <strong>deny</strong>. Make all routes require authentication by default
            (via a global middleware), then explicitly mark specific routes as public. This is
            much safer than the reverse — if you forget to add auth to a new route, it&apos;s
            automatically protected instead of accidentally exposed.
          </p>
        </Callout>
      </ConceptBlock>

      {/* ===== End of Page ===== */}
      <Summary>
        <p>
          Routing is the backbone of your API&apos;s interface. It maps incoming requests to the
          right handlers using URL patterns, HTTP methods, and pattern-matching rules. Clean
          route design — with sensible nesting, clear parameter conventions, proper versioning,
          and security boundaries — makes your API intuitive to consume, easy to maintain, and
          safe by default.
        </p>
      </Summary>

      <KeyTakeaways
        items={[
          'A route is the combination of a URL pattern + HTTP method, not just a path.',
          'Use path parameters for resource identifiers (/users/:id) and query parameters for filtering, sorting, and pagination.',
          'Static routes take priority over dynamic routes in most routers. Register specific routes before generic ones.',
          'Don\'t over-nest routes beyond 2-3 levels. Flatten when child resources have globally unique IDs.',
          'Version your API from day one via URL path (/v1/). Only bump versions for breaking changes.',
          'Default to deny — protect all routes by default and explicitly whitelist public ones.',
        ]}
      />

      <FurtherReading
        links={[
          { title: 'RESTful API Design — Best Practices', url: 'https://restfulapi.net/' },
          { title: 'Microsoft REST API Guidelines', url: 'https://github.com/microsoft/api-guidelines' },
          { title: 'API Versioning Has No Right Answer', url: 'https://apisyouwonthate.com/blog/api-versioning-has-no-right-way' },
        ]}
      />
    </SectionPage>
  );
}
