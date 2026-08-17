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
import Exercise from '../../components/content/Exercise';
import { InterviewQuestion, RealWorld, CommonPitfall } from '../../components/content/Admonitions';
import { Summary, KeyTakeaways } from '../../components/content/Summary';
import { FurtherReading } from '../../components/content/FurtherReading';

export default function Serialization() {
  return (
    <SectionPage
      readingTime="22 min read"
      lastUpdated="Aug 2026"
      relatedTopics={[
        { title: 'HTTP Protocol', path: '/foundation/http-protocol' },
        { title: 'Routing', path: '/foundation/routing' },
      ]}
    >
      <p>
        In-memory data structures (objects, hash maps, structs, class instances) are stored as
        complex graphs of memory pointers specific to a single running process and runtime.
        When two distinct systems—such as a mobile client and a backend server, or two microservices—need
        to communicate, they cannot share raw memory addresses. They must agree on a universal,
        standardized wire format. <strong>Serialization and Deserialization</strong> are the bridge
        between internal machine state and network communication.
      </p>

      {/* ===== The Interoperability Standard ===== */}
      <ConceptBlock id="interoperability-standard" title="The Interoperability Problem">
        <Definition term="Serialization & Deserialization">
          <strong>Serialization (Marshalling / Encoding)</strong> is the process of converting an
          in-memory data structure or object into a standardized byte sequence or string suitable for
          transmission over a network or storage in a file. <br />
          <strong>Deserialization (Unmarshalling / Decoding)</strong> is the reverse process: reconstructing
          the structured in-memory object from the incoming stream of bytes or text.
        </Definition>

        <p>
          Without standard serialization, systems written in different programming languages (e.g., a Rust
          backend, a Python data service, and a JavaScript web browser) could never understand each
          other&apos;s internal data layouts, memory alignments, or pointer addresses.
        </p>

        <FlowDiagram
          chart={`graph LR
    subgraph System A [Client / Service A]
      A1[In-Memory Object<br/>User struct / dict] -->|Serialize| A2[Standard Wire Format<br/>JSON / Protobuf / Bytes]
    end
    A2 -->|HTTP / TCP Network| B1
    subgraph System B [Server / Service B]
      B1[Raw Byte Stream] -->|Deserialize| B2[In-Memory Object<br/>Class instance / Map]
    end`}
          caption="Data lifecycle: In-memory memory structures translated to wire streams and reconstructed on the destination"
        />

        <Callout variant="note">
          Why can&apos;t we just dump raw memory bytes over the network?
          Raw memory layouts depend on:
          1) <strong>Endianness</strong> (Big-Endian vs. Little-Endian CPU byte order),
          2) <strong>Pointer addresses</strong> (which are meaningless in another process&apos;s address space),
          3) <strong>Memory padding and alignment</strong> (which vary across compilers and architectures).
        </Callout>
      </ConceptBlock>

      {/* ===== Serialization Formats ===== */}
      <ConceptBlock id="serialization-formats" title="Serialization Formats Overview">
        <p>
          Serialization formats generally fall into two broad paradigms: <strong>Text-based</strong>
          (human-readable, self-describing, slightly heavier) and <strong>Binary-based</strong>
          (compact, machine-optimized, strict, often requiring pre-shared schemas).
        </p>

        <ComparisonTable
          headers={['Format', 'Type', 'Human Readable', 'Requires Schema', 'Typical Primary Use Case']}
          rows={[
            ['JSON', 'Text', 'Yes', 'Optional (JSON Schema)', 'Public REST APIs, Web/Mobile clients, Configs'],
            ['XML', 'Text', 'Yes', 'Optional (XSD / DTD)', 'Legacy enterprise systems, SOAP APIs, SVG, Android layouts'],
            ['YAML / TOML', 'Text', 'Yes', 'No', 'Human-authored configuration files (Kubernetes, CI/CD, Cargo)'],
            ['Protocol Buffers', 'Binary', 'No (without schema)', 'Yes (.proto definitions)', 'High-throughput microservices, gRPC, Internal RPCs'],
            ['MessagePack / BSON', 'Binary', 'No', 'No (self-describing)', 'Low-latency caching, MongoDB storage, binary JSON replacement'],
            ['Apache Avro', 'Binary', 'No', 'Yes (JSON schema)', 'Big data pipelines, Kafka event streaming, Hadoop'],
          ]}
        />

        <ProsConsList
          pros={[
            'Text-based formats (JSON, XML): Effortless debugging with standard tools (cURL, browser dev tools), human inspection, ubiquitous language ecosystem.',
            'Binary formats (Protobuf, MessagePack): Significant bandwidth savings (30-80% smaller), dramatically faster CPU serialization/parsing, zero ambiguity in field types.',
          ]}
          cons={[
            'Text-based formats: Verbose string parsing overhead, larger payload footprints, lack of native typing for complex types like raw byte arrays or exact decimals.',
            'Binary formats: Cannot easily inspect payloads on raw packet sniffers without schemas; requires build-time schema compilation and code-generation pipelines.',
          ]}
        />
      </ConceptBlock>

      {/* ===== JSON ===== */}
      <ConceptBlock id="json" title="JSON — JavaScript Object Notation">
        <Definition term="JSON (RFC 8259)">
          A lightweight, text-based, language-independent data interchange format. Derived from
          JavaScript object literal syntax, JSON defines only two structural collections
          (objects and arrays) and four primitive data types (string, number, boolean, null).
        </Definition>

        <Example title="Standard JSON payload demonstrating all primitive and composite types">
          <CodeBlock language="json">
{`{
  "transactionId": "tx_9841284719",
  "accountNumber": 40918231,
  "amount": 149.95,
  "currency": "USD",
  "isSettled": true,
  "notes": null,
  "tags": ["retail", "online", "recurring"],
  "metadata": {
    "ipAddress": "192.0.2.1",
    "riskScore": 0.02
  }
}`}
          </CodeBlock>
        </Example>

        <Callout variant="tip">
          While JSON originated in JavaScript, virtually every programming language in existence
          features native or hyper-optimized standard library parsers for it. In HTTP APIs, JSON is
          signaled with the <code>Content-Type: application/json</code> header.
        </Callout>
      </ConceptBlock>

      {/* ===== XML ===== */}
      <ConceptBlock id="xml" title="XML — eXtensible Markup Language">
        <Definition term="XML">
          A tag-based, hierarchical markup language designed to store and transport structured data.
          XML supports user-defined tags, attributes, namespaces, and strict schema validation
          via XSD (XML Schema Definition).
        </Definition>

        <Example title="Equivalent transaction data modeled in XML">
          <CodeBlock language="xml">
{`<?xml version="1.0" encoding="UTF-8"?>
<transaction id="tx_9841284719">
  <accountNumber>40918231</accountNumber>
  <amount currency="USD">149.95</amount>
  <isSettled>true</isSettled>
  <notes nil="true"/>
  <tags>
    <tag>retail</tag>
    <tag>online</tag>
    <tag>recurring</tag>
  </tags>
  <metadata>
    <ipAddress>192.0.2.1</ipAddress>
    <riskScore>0.02</riskScore>
  </metadata>
</transaction>`}
          </CodeBlock>
        </Example>

        <ComparisonTable
          headers={['Dimension', 'JSON', 'XML']}
          rows={[
            ['Syntax Style', 'Key-value pairs and arrays with brackets {} []', 'Opening/closing tags with attributes <tag attr="val"></tag>'],
            ['Verbosity', 'Low to moderate overhead', 'High overhead (repeated closing tags, namespace declarations)'],
            ['Data Types', 'Native types (number, string, bool, null, array, object)', 'Everything is text unless validated against an external XSD'],
            ['Comments Support', 'No standard comment support', 'Supported (<!-- comment -->)'],
            ['Modern API Adoption', 'De facto standard for REST and web APIs', 'Standard in financial legacy systems, SOAP, SAML, and telecommunications'],
          ]}
        />
      </ConceptBlock>

      {/* ===== Text Formats ===== */}
      <ConceptBlock id="text-formats" title="Text-Based Formats: YAML, TOML, and CSV">
        <p>
          Beyond JSON and XML, several specialized text formats solve specific problems in backend
          engineering:
        </p>

        <ComparisonTable
          headers={['Format', 'Key Characteristics', 'Ideal Use Case', 'Avoid When']}
          rows={[
            ['YAML', 'Indentation-based hierarchy, supports comments, anchors/aliases, rich typing', 'Configuration files (Kubernetes, Docker Compose, GitHub Actions)', 'High-volume API payloads (complex parsing, security attack surface)'],
            ['TOML', 'Minimalist, unambiguous key-value format mapped directly to hash tables', 'Application settings, package manifests (Rust Cargo.toml, Python pyproject.toml)', 'Deeply nested recursive object graphs'],
            ['CSV', 'Tabular, comma-delimited flat rows with minimal overhead', 'Bulk batch export/import, data science pipelines, database tabular dumps', 'Hierarchical or deeply nested data with variable schemas'],
          ]}
        />

        <CommonPitfall>
          <p>
            <strong>The YAML parsing hazard:</strong> YAML specifications are surprisingly complex.
            Unquoted country codes like <code>NO</code> (Norway) or boolean-like strings like <code>on</code>,
            <code>off</code>, <code>yes</code>, <code>no</code> can be silently parsed into boolean <code>false</code>
            or <code>true</code> in older parsers (the infamous &ldquo;Norway problem&rdquo;). Always quote strings
            in config files when ambiguity is possible.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Binary Formats ===== */}
      <ConceptBlock id="binary-formats" title="Binary Formats (Protocol Buffers, MessagePack, Avro)">
        <Definition term="Binary Serialization">
          A serialization technique that encodes data structures into compact binary sequences (raw bits and bytes)
          rather than human-readable ASCII/UTF-8 character strings. Keys are often replaced with numerical field tags,
          and numbers are packed with variable-length zigzag encodings.
        </Definition>

        <p>
          Consider an integer like <code>1000000</code>. In JSON, this requires 7 ASCII bytes (<code>&quot;1000000&quot;</code>).
          In binary varint encoding, it takes only 3 bytes. In a system handling 500,000 requests per second,
          this difference translates into massive CPU and bandwidth savings.
        </p>

        <Example title="Protocol Buffers schema definition (.proto)">
          <CodeBlock language="protobuf">
{`syntax = "proto3";

package payment;

message Transaction {
  string transaction_id = 1; // Field tag 1
  int64 account_number = 2;   // Field tag 2
  double amount = 3;          // Field tag 3
  string currency = 4;        // Field tag 4
  bool is_settled = 5;        // Field tag 5
  repeated string tags = 6;   // Array of strings
}`}
          </CodeBlock>
        </Example>

        <FlowDiagram
          chart={`graph TD
    A[Define .proto Schema] --> B[Run Protoc Compiler]
    B --> C[Generate Go / Java / Python / TS Classes]
    C --> D[Compile-time Type Safety]
    D --> E[Serialize to Compact Byte Array]
    E --> F[Deserialize with Identical Schema]`}
          caption="Protocol Buffers workflow: Contract-first development with code generation"
        />

        <ProsConsList
          pros={[
            'Drastically reduced bandwidth and packet fragmentation over WAN connections.',
            'Blazing fast serialization/deserialization speed (often 5x-10x faster than JSON).',
            'Enforced schema backward and forward compatibility through numerical field IDs.',
          ]}
          cons={[
            'Payable payloads cannot be easily inspected or debugged in Wireshark/cURL without the exact schema.',
            'Requires an active build step (compiler code generation) across all client and server languages.',
          ]}
        />
      </ConceptBlock>

      {/* ===== JSON Structure Deep Dive ===== */}
      <ConceptBlock id="json-structure" title="JSON Structure Deep Dive">
        <p>
          RFC 8259 specifies that a JSON document must be composed of two types of structures and four
          primitive values:
        </p>

        <ComparisonTable
          headers={['JSON Value', 'Syntax Example', 'Description', 'Language Considerations']}
          rows={[
            ['Object', '{"key": "value"}', 'Unordered collection of zero or more key/value pairs. Keys MUST be double-quoted strings.', 'Maps to Map, Dictionary, Struct, Hash, or Object.'],
            ['Array', '[1, "two", true]', 'Ordered sequence of zero or more values. Can be heterogeneous.', 'Maps to List, Vector, Slice, or Array.'],
            ['String', '"Hello \\n World"', 'Sequence of Unicode characters wrapped in double quotes. Supports backslash escapes.', 'Maps to String.'],
            ['Number', '42, -3.14, 1.5e10', 'Base 10 decimals. No octal/hex syntax, no NaN, no Infinity.', 'Double precision float (IEEE 754) in JS; integers/floats in backend languages.'],
            ['Boolean', 'true, false', 'Literal lowercase boolean flags.', 'Maps to native bool.'],
            ['Null', 'null', 'Literal lowercase representation of an empty or nonexistent value.', 'Maps to null, nil, None, or Optional.'],
          ]}
        />

        <CommonPitfall>
          <p>
            <strong>The 64-bit Integer Precision Trap (JavaScript &amp; IEEE 754):</strong><br />
            Standard JSON numbers have no explicit distinction between integers and floating-point values.
            JavaScript (and standard browser JSON parsers) represents all numbers as 64-bit floats, providing
            safe integers only up to <code>2^53 - 1</code> (<code>9,007,199,254,740,991</code>).
            If your backend generates 64-bit Snowflake IDs or database <code>BIGINT</code>s (such as <code>9018239120938129031</code>),
            the client will silently corrupt the last digits!
          </p>
          <p>
            <strong>The Fix:</strong> Always serialize 64-bit integers and high-precision financial decimals
            (BigDecimals) as <strong>strings</strong> in JSON responses.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== Nested Objects & Complex Structures ===== */}
      <ConceptBlock id="nested-objects" title="Nested Objects & Complex Structures">
        <p>
          Real-world domain models frequently contain nested relationships, embedded entities, and lists
          of associations.
        </p>

        <Example title="Hierarchical nested order with embedded line items and payment state">
          <CodeBlock language="json">
{`{
  "orderId": "ord_88129",
  "customer": {
    "id": "usr_401",
    "name": "Alex Mercer",
    "billingAddress": {
      "street": "100 Market St",
      "city": "San Francisco",
      "country": "US"
    }
  },
  "items": [
    {
      "sku": "KB-MECH-01",
      "title": "Mechanical Keyboard",
      "unitPrice": 129.00,
      "quantity": 1
    },
    {
      "sku": "CBL-USB-C",
      "title": "Braided USB-C Cable",
      "unitPrice": 15.50,
      "quantity": 2
    }
  ],
  "totals": {
    "subtotal": 160.00,
    "tax": 14.40,
    "grandTotal": 174.40
  }
}`}
          </CodeBlock>
        </Example>

        <Callout variant="warning">
          <strong>Beware Circular References:</strong> If an in-memory parent object references a child
          (e.g., <code>Order.customer</code>), and the child references the parent (e.g., <code>Customer.orders</code>),
          a naive recursive serializer will enter an infinite loop and crash the server with a
          <code>StackOverflowError</code> or <code>Maximum call stack size exceeded</code>. Always use DTOs
          (Data Transfer Objects) or ignore circular navigation properties during serialization.
        </Callout>
      </ConceptBlock>

      {/* ===== Common JSON Errors ===== */}
      <ConceptBlock id="json-errors" title="Common JSON Errors & Pitfalls">
        <p>
          JSON parser implementations are intentionally strict. A single invalid character causes the entire
          document parsing to fail with a syntax error.
        </p>

        <ComparisonTable
          headers={['Syntax Error', 'Invalid JSON Example', 'Correct JSON', 'Why It Fails']}
          rows={[
            ['Trailing Comma', '{"a": 1, "b": 2,}', '{"a": 1, "b": 2}', 'JSON standard explicitly forbids trailing commas in objects and arrays.'],
            ['Single Quotes', "{'name': 'Alice'}", '{"name": "Alice"}', 'JSON strings and keys MUST use standard double quotes (").'],
            ['Unquoted Keys', '{count: 10}', '{"count": 10}', 'Every object key must be a double-quoted string.'],
            ['Comments', '{"x": 1} // setting', '{"x": 1}', 'Standard JSON does not allow comments (use JSONC or YAML if comments are required).'],
            ['Undefined / NaN', '{"score": NaN, "fn": undefined}', '{"score": null}', 'JSON has no representation for NaN, Infinity, or undefined.'],
          ]}
        />

        <Exercise
          title="Spot the 4 Syntax Errors"
          solution={
            <div>
              <p>The 4 errors were:</p>
              <ol>
                <li>Single quotes around <code>&apos;serviceName&apos;</code> and <code>&apos;payments&apos;</code> (must be double quotes).</li>
                <li>Comment <code>// Primary port</code> (comments are illegal in standard JSON).</li>
                <li>Unquoted key <code>active</code> (all keys must be double-quoted).</li>
                <li>Trailing comma after <code>&quot;retries&quot;: 3,</code>.</li>
              </ol>
            </div>
          }
        >
          <CodeBlock language="javascript">
{`{
  'serviceName': 'payments',
  "port": 8080, // Primary port
  active: true,
  "retries": 3,
}`}
          </CodeBlock>
        </Exercise>
      </ConceptBlock>

      {/* ===== Custom Serialization ===== */}
      <ConceptBlock id="custom-serialization" title="Custom Serialization & Deserialization">
        <Definition term="Custom Serializer">
          A dedicated transformation hook or adapter that overrides default reflection/property mapping
          to convert domain objects into a tailored wire format (e.g., formatting dates, masking sensitive
          data, flattening complex structures, or renaming casing conventions).
        </Definition>

        <Example title="Common custom serialization use cases">
          <ComparisonTable
            headers={['Challenge', 'Default Behavior', 'Custom Serialization Solution']}
            rows={[
              ['Dates & Timestamps', 'Serializes as language-specific object or millisecond number', 'Enforce ISO 8601 UTC strings: "2026-08-17T14:30:00Z"'],
              ['Sensitive Fields', 'Exposes internal user passwords or tokens', 'Exclude field or transform to masked string: "****-****-1234"'],
              ['Key Casing Mismatch', 'Backend uses snake_case, frontend uses camelCase', 'Global naming strategy transformer hook'],
              ['Polymorphic Types', 'Loses subtype information upon serialization', 'Inject type discriminator property: {"type": "CREDIT_CARD", ...}'],
            ]}
          />
        </Example>

        <RealWorld title="Data Transfer Objects (DTO) Pattern">
          <p>
            In production backend architectures, you should <strong>never serialize database entities directly</strong>
            to HTTP responses. If a new column is added to the database table (e.g., <code>is_admin</code>, <code>internal_notes</code>),
            it could inadvertently be leaked to API clients. Always map domain entities to explicit, versioned
            <strong> DTOs</strong> before serialization.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Injection Attacks & Insecure Deserialization ===== */}
      <ConceptBlock id="injection-attacks" title="Injection Attacks & Insecure Deserialization">
        <Definition term="Insecure Deserialization (OWASP Top 10)">
          A critical vulnerability where untrusted user input is passed directly to a serializer/deserializer
          that can instantiate arbitrary classes or execute code during object reconstruction.
        </Definition>

        <p>
          Insecure deserialization is notoriously dangerous in languages with dynamic object graphs
          (e.g., Python <code>pickle</code>, Java <code>ObjectInputStream</code>, PHP <code>unserialize()</code>,
          Ruby <code>Marshal.load</code>). If an attacker tampers with a serialized byte stream or cookie,
          they can achieve <strong>Remote Code Execution (RCE)</strong>.
        </p>

        <FlowDiagram
          chart={`graph LR
    A[Attacker Crafts Malicious Payload<br/>Serialized Gadget Chain] --> B[Target Server]
    B --> C{Deserializes Untrusted Data}
    C -->|Instantiates Gadget Class| D[Arbitrary Code Execution / Data Corruption]
    C -->|Safe Parser: JSON/Protobuf| E[Strict Data-Only Structure Validated]`}
          caption="Insecure deserialization mechanism vs. safe data-only parsing"
        />

        <Callout variant="warning">
          <strong>Golden Rule of Deserialization Security:</strong><br />
          Never use native runtime object serializers (like Python <code>pickle</code> or Java <code>Serializable</code>)
          to parse data received from untrusted clients over the network. Always use pure, data-only interchange
          formats like JSON, Protocol Buffers, or MessagePack that deserialize into primitive data structures
          without invoking arbitrary class constructors or reflection gadget chains.
        </Callout>
      </ConceptBlock>

      {/* ===== Validation Before Serialization ===== */}
      <ConceptBlock id="validation-before-serialization" title="Validation at the Serialization Boundary">
        <p>
          Never assume that incoming deserialized data is valid just because it parsed as syntactically correct JSON.
          A request body containing <code>{`{"age": -99, "email": "not-an-email"}`}</code> is 100% valid JSON syntax,
          but completely invalid application data.
        </p>

        <FlowDiagram
          chart={`graph TD
    A[Raw Incoming HTTP Request Body] --> B[Syntactic Parsing<br/>JSON.parse / Parser]
    B -->|Syntax Error| C[400 Bad Request: Malformed JSON]
    B -->|Success| D[Schema & Type Validation<br/>JSON Schema / Zod / Pydantic]
    D -->|Validation Failure| E[422 Unprocessable Entity: Invalid Fields]
    D -->|Success| F[Domain Business Logic Processing]`}
          caption="The two-phase boundary verification: Syntax parsing followed by Schema validation"
        />

        <Checklist
          items={[
            'Enforce payload size limits before parsing to protect against memory exhaustion (DoS attacks).',
            'Strip or reject unknown properties (prevent Mass Assignment vulnerabilities).',
            'Validate data types, required fields, string lengths, and numeric ranges.',
            'Sanitize inputs to neutralize XSS and SQL injection payloads.',
          ]}
        />
      </ConceptBlock>

      {/* ===== JSON Schema ===== */}
      <ConceptBlock id="json-schema" title="JSON Schema">
        <Definition term="JSON Schema">
          An IETF standard specification that defines a declarative, machine-readable vocabulary
          for annotating and validating the structure, constraints, and data types of JSON documents.
        </Definition>

        <Example title="JSON Schema definition enforcing a strict user registration contract">
          <CodeBlock language="json">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "CreateUserRequest",
  "type": "object",
  "required": ["username", "email", "age"],
  "additionalProperties": false,
  "properties": {
    "username": {
      "type": "string",
      "minLength": 3,
      "maxLength": 20,
      "pattern": "^[a-zA-Z0-9_]+$"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 18,
      "maximum": 120
    },
    "role": {
      "type": "string",
      "enum": ["user", "manager"],
      "default": "user"
    }
  }
}`}
          </CodeBlock>
        </Example>

        <RealWorld title="Schema-Driven Development">
          <p>
            JSON Schema forms the foundation of modern API tooling:
          </p>
          <ul>
            <li><strong>OpenAPI / Swagger:</strong> Uses JSON Schema to document and validate request/response models.</li>
            <li><strong>IDE Autocompletion:</strong> Powers intelligent code suggestions in VS Code for <code>package.json</code>, <code>tsconfig.json</code>, and Kubernetes manifests.</li>
            <li><strong>Automated Testing:</strong> Validates backend integration test responses against contract definitions automatically.</li>
          </ul>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Compression ===== */}
      <ConceptBlock id="compression" title="Payload Compression (Gzip, Brotli, Zstandard)">
        <Definition term="HTTP Compression">
          The process of reducing the physical size of serialized payloads using lossless data compression
          algorithms before transmitting them over the network. The client and server negotiate algorithms
          using HTTP content negotiation headers.
        </Definition>

        <FlowDiagram
          chart={`graph LR
    Client -->|1. Accept-Encoding: gzip, br| Server
    Server -->|2. Serializes JSON & Compresses with Brotli| Server
    Server -->|3. Content-Encoding: br + Compressed Body| Client
    Client -->|4. Decompresses Brotli -> Parses JSON| Client`}
          caption="HTTP compression negotiation workflow"
        />

        <ComparisonTable
          headers={['Algorithm', 'HTTP Encoding Value', 'Compression Ratio', 'Compression Speed', 'Primary Use Case']}
          rows={[
            ['Gzip', 'gzip', 'Good (typical 60-80% text reduction)', 'Fast', 'Universal standard supported by virtually all clients & servers'],
            ['Brotli', 'br', 'Superior (15-25% smaller than gzip on text)', 'Fast decompression, adjustable compression', 'Modern web browsers, HTTPS static assets, API responses'],
            ['Zstandard (zstd)', 'zstd', 'Excellent', 'Blazing fast real-time compression/decompression', 'High-throughput microservices, internal data pipelines, Kafka streams'],
            ['Deflate', 'deflate', 'Moderate', 'Fast', 'Older standard, superseded by Gzip and Brotli'],
          ]}
        />

        <InterviewQuestion question="When should a backend server NOT compress an HTTP response?">
          <p>
            Compression is not a free lunch—it consumes server CPU cycles. You should avoid compression when:
          </p>
          <ol>
            <li><strong>Payloads are very small (&lt; 1 KB):</strong> The compression header overhead and CPU cost often exceed the trivial bandwidth savings (or can even make the payload larger!).</li>
            <li><strong>The data is already compressed:</strong> Compressing JPEG/PNG images, MP4 videos, PDF files, or Zip archives yields 0% size reduction while spiking CPU usage to 100%.</li>
            <li><strong>The server is CPU-bottlenecked:</strong> If server CPU utilization is above 90%, the latency delay caused by compression often outweighs network transit savings.</li>
          </ol>
        </InterviewQuestion>

        <Quiz
          question="A client sends a GET request with 'Accept-Encoding: gzip, br'. The server responds with a Brotli-compressed JSON payload. Which response header MUST the server include for the client to parse it?"
          options={[
            'Content-Type: application/brotli',
            'Content-Encoding: br',
            'Accept-Encoding: br',
            'Transfer-Encoding: gzip',
          ]}
          correct={1}
          explanation="The Content-Encoding header indicates the compression algorithm applied to the body (e.g. 'Content-Encoding: br'). The Content-Type remains 'application/json' so the client knows what format the data is once decompressed."
        />
      </ConceptBlock>

      {/* ===== End of Page ===== */}
      <Summary>
        <p>
          Serialization and deserialization are the fundamental mechanisms that enable distributed systems
          and heterogeneous clients to exchange data reliably. Choosing the right format—whether human-friendly
          JSON, schema-driven Protocol Buffers, or tabular CSV—depends on the balance of readability, bandwidth,
          and performance requirements. Coupling serialization with strict boundary validation, defensive DTO
          mapping, and HTTP compression ensures that your backend APIs remain fast, secure, and resilient.
        </p>
      </Summary>

      <KeyTakeaways
        items={[
          'Serialization converts in-memory objects into a universal wire format; Deserialization reconstructs the object on the destination system.',
          'Text formats (JSON, XML) prioritize human debuggability; binary formats (Protobuf, MessagePack) maximize performance and minimize bandwidth.',
          'JSON is the de facto web standard, but watch out for 64-bit integer truncation in JavaScript (always send BigInts as strings).',
          'Never deserialize untrusted client input using native runtime serializers (e.g., Python pickle, Java Serializable) due to remote code execution risks.',
          'Always validate data at the serialization boundary using schema validators (JSON Schema, Zod, Pydantic) before executing business logic.',
          'Use DTOs (Data Transfer Objects) to decouple database entity models from public API responses.',
          'Compress large text/JSON responses with Brotli or Gzip, but skip compression for payloads under 1 KB or already-compressed media files.',
        ]}
      />

      <FurtherReading
        links={[
          { title: 'RFC 8259 — The JavaScript Object Notation (JSON) Data Interchange Format', url: 'https://datatracker.ietf.org/doc/html/rfc8259' },
          { title: 'JSON Schema Official Specification', url: 'https://json-schema.org/' },
          { title: 'Protocol Buffers Documentation — Google', url: 'https://protobuf.dev/' },
          { title: 'OWASP Deserialization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html' },
        ]}
      />
    </SectionPage>
  );
}
