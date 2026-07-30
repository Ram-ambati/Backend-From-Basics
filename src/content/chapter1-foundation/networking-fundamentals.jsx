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

export default function NetworkingFundamentals() {
  return (
    <SectionPage
      readingTime="12 min read"
      lastUpdated="Jul 2026"
      relatedTopics={[
        { title: 'HTTP Protocol', path: '/foundation/http-protocol' },
        { title: 'TLS/SSL', path: '/foundation/networking-fundamentals#tls-ssl' },
      ]}
    >
      <p>
        Networking is the backbone of all backend systems. Every request your application handles
        travels across a network — understanding how that journey works is essential for building
        reliable, performant backend services.
      </p>

      {/* ===== DNS ===== */}
      <ConceptBlock id="dns" title="DNS">
        <Definition term="Domain Name System (DNS)">
          A hierarchical, distributed naming system that translates human-readable domain names
          (like <code>example.com</code>) into IP addresses (like <code>93.184.216.34</code>) that
          computers use to identify each other on the network.
        </Definition>

        <p>
          When you type a URL into your browser, the first thing that happens is a DNS lookup.
          Your machine needs to find the IP address of the server hosting that domain. This
          resolution follows a chain: browser cache → OS cache → recursive resolver → root
          nameserver → TLD nameserver → authoritative nameserver.
        </p>

        <FlowDiagram
          chart={`graph LR
    A[Browser] --> B[Recursive Resolver]
    B --> C[Root Nameserver]
    C --> D[TLD Nameserver]
    D --> E[Authoritative Nameserver]
    E --> B
    B --> A`}
          caption="DNS resolution chain"
        />

        <Callout variant="tip">
          DNS responses are heavily cached at every level. A typical TTL (Time To Live) for
          DNS records is 300 seconds (5 minutes). This means changes to DNS records don&apos;t
          propagate instantly.
        </Callout>

        <p>
          Common DNS record types you&apos;ll encounter in backend work:
        </p>
        <ComparisonTable
          headers={['Record Type', 'Purpose', 'Example']}
          rows={[
            ['A', 'Maps domain to IPv4 address', 'example.com → 93.184.216.34'],
            ['AAAA', 'Maps domain to IPv6 address', 'example.com → 2606:2800:...'],
            ['CNAME', 'Alias from one domain to another', 'www.example.com → example.com'],
            ['MX', 'Mail exchange server', 'example.com → mail.example.com'],
            ['TXT', 'Arbitrary text (SPF, DKIM, verification)', 'v=spf1 include:...'],
          ]}
        />

        <Example title="DNS lookup with nslookup">
          <CodeBlock language="bash">
{`# Look up the A record for a domain
nslookup example.com

# Look up a specific record type
nslookup -type=MX example.com

# Use a specific DNS server
nslookup example.com 8.8.8.8`}
          </CodeBlock>
        </Example>
      </ConceptBlock>

      {/* ===== IP Address ===== */}
      <ConceptBlock id="ip-address" title="IP Address">
        <Definition term="IP Address">
          A unique numerical label assigned to every device connected to a network.
          It serves two purposes: identifying the host (or network interface) and providing
          the location of the host in the network for routing.
        </Definition>

        <p>
          There are two versions of IP addresses in use today:
        </p>

        <ComparisonTable
          headers={['Feature', 'IPv4', 'IPv6']}
          rows={[
            ['Format', '32-bit (4 octets)', '128-bit (8 groups of hex)'],
            ['Example', '192.168.1.1', '2001:0db8:85a3::8a2e:0370:7334'],
            ['Total addresses', '~4.3 billion', '~340 undecillion'],
            ['Notation', 'Dotted decimal', 'Colon-separated hex'],
          ]}
        />

        <Callout variant="note">
          <p>
            <strong>Reserved IP ranges</strong> you should know:
          </p>
          <ul>
            <li><code>127.0.0.1</code> — Loopback (localhost)</li>
            <li><code>192.168.x.x</code> — Private network (home/office)</li>
            <li><code>10.x.x.x</code> — Private network (large orgs)</li>
            <li><code>0.0.0.0</code> — All interfaces (used when binding a server)</li>
          </ul>
        </Callout>

        <RealWorld title="Binding to 0.0.0.0 vs 127.0.0.1">
          <p>
            When you start a development server, you often see it listening on <code>127.0.0.1:3000</code>.
            This means it only accepts connections from your own machine. If you bind to
            <code>0.0.0.0:3000</code> instead, the server accepts connections from any
            network interface — useful when testing from other devices on the same network.
          </p>
        </RealWorld>
      </ConceptBlock>

      {/* ===== Ports ===== */}
      <ConceptBlock id="ports" title="Ports">
        <Definition term="Port">
          A 16-bit number (0–65535) that identifies a specific process or service on a machine.
          While an IP address identifies the machine, the port identifies which application
          on that machine should receive the data.
        </Definition>

        <p>
          Think of the IP address as a building&apos;s street address and the port as the apartment
          number. The combination of IP + port is called a <strong>socket address</strong>.
        </p>

        <ComparisonTable
          headers={['Port Range', 'Name', 'Usage']}
          rows={[
            ['0–1023', 'Well-known ports', 'Reserved for standard services (HTTP: 80, HTTPS: 443, SSH: 22)'],
            ['1024–49151', 'Registered ports', 'Assigned to specific services (MySQL: 3306, PostgreSQL: 5432)'],
            ['49152–65535', 'Dynamic/Ephemeral', 'Temporary ports assigned to client connections'],
          ]}
        />

        <CommonPitfall>
          <p>
            A common mistake is hardcoding port numbers. Always use environment variables
            (e.g., <code>process.env.PORT</code>) so your app can adapt to different environments.
            Cloud platforms like Heroku and Railway assign ports dynamically.
          </p>
        </CommonPitfall>
      </ConceptBlock>

      {/* ===== TCP ===== */}
      <ConceptBlock id="tcp" title="TCP">
        <Definition term="Transmission Control Protocol (TCP)">
          A connection-oriented, reliable transport protocol. It guarantees that data arrives
          in order, without duplication, and retransmits lost packets automatically.
        </Definition>

        <p>
          TCP establishes a connection using a <strong>three-way handshake</strong> before any
          data is sent:
        </p>

        <FlowDiagram
          chart={`sequenceDiagram
    participant C as Client
    participant S as Server
    C->>S: SYN
    S->>C: SYN-ACK
    C->>S: ACK
    Note over C,S: Connection established
    C->>S: Data transfer
    S->>C: ACK`}
          caption="TCP three-way handshake"
        />

        <p>
          TCP provides reliability through several mechanisms: sequence numbers to order packets,
          acknowledgments to confirm receipt, checksums to detect corruption, and flow control
          to prevent overwhelming the receiver.
        </p>

        <Callout variant="best-practice">
          HTTP, HTTPS, SSH, FTP, SMTP, and most database protocols run over TCP because
          they require reliable, ordered data delivery.
        </Callout>
      </ConceptBlock>

      {/* ===== UDP ===== */}
      <ConceptBlock id="udp" title="UDP">
        <Definition term="User Datagram Protocol (UDP)">
          A connectionless, unreliable transport protocol. It sends datagrams without
          establishing a connection and provides no guarantees about delivery, ordering,
          or duplicate protection.
        </Definition>

        <ProsConsList
          pros={[
            'Very low latency — no handshake overhead',
            'No head-of-line blocking',
            'Lightweight — minimal protocol overhead (8-byte header vs 20-byte TCP)',
            'Supports multicast and broadcast',
          ]}
          cons={[
            'No delivery guarantees — packets can be lost',
            'No ordering — packets may arrive out of order',
            'No congestion control — can flood the network',
            'Application must handle reliability if needed',
          ]}
        />

        <RealWorld>
          <p>
            UDP is used in video streaming, online gaming, VoIP, and DNS lookups — situations where
            speed matters more than perfect reliability. A dropped video frame is better than
            a delayed one.
          </p>
        </RealWorld>

        <Quiz
          question="Which protocol would you choose for a real-time multiplayer game?"
          options={['TCP', 'UDP', 'Both equally suitable', 'Neither']}
          correct={1}
          explanation="UDP is preferred for real-time games because low latency is critical. A slightly delayed game state update is worse than a lost one, since the next update will correct it."
        />
      </ConceptBlock>

      {/* ===== TLS/SSL ===== */}
      <ConceptBlock id="tls-ssl" title="TLS / SSL">
        <Definition term="Transport Layer Security (TLS)">
          A cryptographic protocol that provides secure communication over a network. TLS is the
          successor to SSL (Secure Sockets Layer). When you see HTTPS, the &quot;S&quot; means the
          connection is secured with TLS.
        </Definition>

        <p>
          TLS provides three guarantees:
        </p>
        <ul>
          <li><strong>Confidentiality</strong> — data is encrypted, unreadable by eavesdroppers</li>
          <li><strong>Integrity</strong> — data cannot be tampered with in transit</li>
          <li><strong>Authentication</strong> — the server proves its identity via certificates</li>
        </ul>

        <Callout variant="important">
          <p>
            SSL is deprecated and insecure. When people say &quot;SSL certificate,&quot; they
            almost always mean a TLS certificate. Always use TLS 1.2 or TLS 1.3 in production.
          </p>
        </Callout>

        <InterviewQuestion question="What happens during a TLS handshake?">
          <p>
            The TLS handshake establishes a secure connection: (1) The client sends a ClientHello
            with supported cipher suites and TLS versions. (2) The server responds with its
            certificate and chosen cipher suite. (3) The client verifies the certificate against
            trusted CAs. (4) Both sides derive session keys using asymmetric encryption.
            (5) All subsequent communication uses symmetric encryption with the session keys.
          </p>
        </InterviewQuestion>
      </ConceptBlock>

      {/* ===== Sockets ===== */}
      <ConceptBlock id="sockets" title="Sockets">
        <Definition term="Socket">
          An endpoint for communication between two machines. A socket is defined by the
          combination of an IP address and a port number. It&apos;s the programming abstraction
          that allows applications to send and receive data over the network.
        </Definition>

        <p>
          In backend programming, you rarely work with raw sockets directly — frameworks abstract
          this away. But understanding sockets helps you debug connection issues and reason about
          performance.
        </p>

        <Example title="A Conceptual Socket Server">
          <p>
            While actual implementation varies by language, the fundamental steps to create a server socket are universal:
          </p>
          <ol>
            <li><strong>Create</strong> the socket (specify IPv4/IPv6 and TCP/UDP).</li>
            <li><strong>Bind</strong> the socket to a specific IP address and port (e.g., <code>0.0.0.0:8080</code>).</li>
            <li><strong>Listen</strong> for incoming connections.</li>
            <li><strong>Accept</strong> a connection, which creates a <em>new</em> socket specifically for communicating with that client.</li>
            <li><strong>Receive and Send</strong> data over the new client socket.</li>
            <li><strong>Close</strong> the connection when finished.</li>
          </ol>
        </Example>
      </ConceptBlock>

      {/* ===== Connection Lifecycle ===== */}
      <ConceptBlock id="connection-lifecycle" title="Connection Lifecycle">
        <p>
          Every network connection follows a lifecycle: <strong>establish → transfer → close</strong>.
          For TCP, this means the three-way handshake to open, data exchange with acknowledgments,
          and a four-way teardown (FIN/ACK) to close.
        </p>

        <Callout variant="deep-dive">
          <p>
            Connection pooling reuses established connections instead of creating new ones for
            each request. This is critical for database connections and HTTP keep-alive. Creating
            a new TCP connection involves a handshake (1 RTT), and with TLS it&apos;s 2–3 RTTs
            — that overhead adds up fast under load.
          </p>
        </Callout>
      </ConceptBlock>

      {/* ===== Latency ===== */}
      <ConceptBlock id="latency" title="Latency">
        <Definition term="Latency">
          The time it takes for a packet of data to travel from source to destination.
          Usually measured in milliseconds (ms). Lower is better.
        </Definition>

        <p>
          Latency is affected by: physical distance (speed of light in fiber), number of
          network hops, processing time at each hop, and queuing delays under load.
        </p>

        <ComparisonTable
          headers={['Scenario', 'Typical Latency']}
          rows={[
            ['Same machine (localhost)', '< 0.1 ms'],
            ['Same data center', '0.5 – 1 ms'],
            ['Same region (e.g., US East)', '1 – 5 ms'],
            ['Cross-continent', '50 – 150 ms'],
            ['Around the world', '200 – 300 ms'],
          ]}
        />

        <Callout variant="best-practice">
          Keep your backend services and databases in the same region (or data center) to
          minimize latency. A cross-continent database call adds 100+ ms to every request.
        </Callout>
      </ConceptBlock>

      {/* ===== Bandwidth ===== */}
      <ConceptBlock id="bandwidth" title="Bandwidth">
        <Definition term="Bandwidth">
          The maximum amount of data that can be transmitted over a network connection per
          unit of time. Measured in bits per second (bps), typically Mbps or Gbps.
        </Definition>

        <p>
          Bandwidth is the &quot;width of the pipe&quot; — it determines throughput but not speed.
          A connection with high bandwidth but high latency will transfer large files quickly
          once they start, but each individual request still takes time to initiate.
        </p>

        <Callout variant="note">
          Don&apos;t confuse bandwidth with latency. Bandwidth is how much data you can send;
          latency is how fast it arrives. A freight train has high bandwidth but high latency.
          A sports car has low latency but low bandwidth.
        </Callout>
      </ConceptBlock>

      {/* ===== RTT ===== */}
      <ConceptBlock id="rtt" title="Round Trip Time (RTT)">
        <Definition term="Round Trip Time (RTT)">
          The time it takes for a packet to travel from source to destination and back.
          RTT = 2 × one-way latency (approximately). It&apos;s the key metric that determines
          how fast a client-server interaction completes.
        </Definition>

        <p>
          RTT matters because many protocols require multiple round trips before useful work
          begins:
        </p>
        <ul>
          <li><strong>TCP handshake</strong> — 1 RTT</li>
          <li><strong>TLS handshake</strong> — 1–2 additional RTTs</li>
          <li><strong>HTTP request/response</strong> — 1 RTT</li>
        </ul>
        <p>
          So an HTTPS request to a server requires at least 3 RTTs before you see any data.
          This is why protocols like HTTP/2, HTTP/3, and TLS 1.3 focus on reducing handshake
          round trips.
        </p>

        <Example title="Measure RTT with ping">
          <CodeBlock language="bash">
{`# Measure RTT to a server
ping example.com

# Output shows round-trip time:
# 64 bytes from 93.184.216.34: time=12.3 ms`}
          </CodeBlock>
        </Example>
      </ConceptBlock>

      {/* ===== End of Page ===== */}
      <Summary>
        <p>
          Networking fundamentals form the foundation of everything in backend engineering. Every
          HTTP request, database query, and API call travels across a network using these core
          concepts. DNS resolves names to IPs, TCP provides reliable transport, TLS adds security,
          and understanding latency, bandwidth, and RTT helps you build performant systems.
        </p>
      </Summary>

      <KeyTakeaways
        items={[
          'DNS translates domain names to IP addresses through a hierarchical resolution chain.',
          'TCP is reliable and connection-oriented; UDP is fast and connectionless — choose based on your use case.',
          'TLS (not SSL) provides encryption, integrity, and authentication for HTTPS.',
          'Latency is the time for data to travel; bandwidth is how much data the pipe can carry.',
          'RTT compounds with handshakes — an HTTPS request requires at least 3 round trips.',
          'Keep services and databases in the same region to minimize latency.',
        ]}
      />

      <FurtherReading
        links={[
          { title: 'How DNS Works (comic)', url: 'https://howdns.works/' },
          { title: 'High Performance Browser Networking — Ilya Grigorik', url: 'https://hpbn.co/' },
          { title: 'Beej\'s Guide to Network Programming', url: 'https://beej.us/guide/bgnet/' },
        ]}
      />
    </SectionPage>
  );
}
