import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.glitchWrapper}>
          <h1 className={styles.title}>
            <span className="glitch-text" data-text="WIZZ">WIZZ</span>
          </h1>
          <div className={styles.statusBadge}>STATUS: ONLINE</div>
        </div>

        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileDecor}>
              <span className={styles.decorDot}></span>
              <span className={styles.decorDot}></span>
              <span className={styles.decorDot}></span>
            </div>
            <span className={styles.profileLabel}>user@wizz:~/profile</span>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.profileGrid}>
              <div className={styles.profileItem}>
                <span className={styles.label}>FULL NAME</span>
                <span className={styles.value}>Vishnu Vardhan Ciripuram</span>
              </div>
              <div className={styles.profileItem}>
                <span className={styles.label}>CORE STACK</span>
                <span className={styles.value}>
                  Python, C/C++, Go, Rust, AWS, GCP, Kubernetes, Terraform,
                  Burp Suite, Metasploit, Wireshark, Nessus
                </span>
              </div>
            </div>

            <p className={styles.bioText}>
              Security Engineer specializing in offensive security and secure architecture.
              Expertise in conducting vulnerability assessments (Burp Suite, Nessus),
              automating threat detection, and implementing defense-in-depth strategies
              for cloud environments (AWS, Kubernetes).
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/projects" className={styles.cta}>
            INITIALIZE_PROJECTS
          </Link>
          <Link href="/journey" className={styles.ctaSecondary}>
            VIEW_LOGS
          </Link>
          <Link href="/certifications" className={styles.ctaSecondary}>
            ACCESS_CERTS
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>SKILL_MATRIX</h3>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCategory}>
            <h4>LANGUAGES</h4>
            <p>Python, C/C++, Go, Rust, Bash/Shell, SQL, JavaScript/TypeScript, Java, PowerShell, Assembly (x86/x64)</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>OFFENSIVE_SECURITY</h4>
            <p>Burp Suite Pro, Metasploit, Nessus, Wireshark, Nmap, Ghidra, Binary Ninja, Hashcat, Cobalt Strike, Empire, AirCrack-ng</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>CLOUD_SECURITY</h4>
            <p>AWS (IAM, GuardDuty, Inspector), GCP (SCC, IAM), Azure Sentinel, Kubernetes Security (RBAC, Network Policies), Docker Security</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>DEVSECOPS_&_CI/CD</h4>
            <p>Jenkins, GitLab CI, GitHub Actions, SonarQube (SAST), OWASP ZAP (DAST), Snyk, Trivy, Terraform (IaC), Ansible</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>FORENSICS_&_MONITORING</h4>
            <p>Splunk, ELK Stack, Prometheus, Grafana, Volatility, Autopsy, FTK Imager, Sysmon, OSQuery</p>
          </div>
          <div className={styles.skillCategory}>
            <h4>PLATFORMS_&_OS</h4>
            <p>Linux (Kali, Ubuntu, RHEL), Windows Server (AD, GPO), Android, iOS, macOS, VMWare, VirtualBox</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>CERTIFICATIONS</h3>
        <div className={styles.certGrid}>
          <Link href="https://www.credly.com/badges/8588f16f-6b35-423c-a4d3-512b9175f335" target="_blank" className={styles.certCard}>
            <div className={styles.certIconWrapper}>
              <Image
                src="/images/certs/aws-security.png"
                alt="AWS Certified Security – Specialty"
                width={80}
                height={80}
                className={styles.certImage}
              />
            </div>
            <div className={styles.certContent}>
              <h4>AWS Certified Security – Specialty</h4>
              <p>Advanced cloud security and compliance.</p>
            </div>
          </Link>
          <Link href="https://www.credly.com/badges/51cca7ea-c550-4b46-98f1-b9b5b7332f76" target="_blank" className={styles.certCard}>
            <div className={styles.certIconWrapper}>
              <Image
                src="/images/certs/aws-ai.png"
                alt="AWS Certified AI Practitioner"
                width={80}
                height={80}
                className={styles.certImage}
              />
            </div>
            <div className={styles.certContent}>
              <h4>AWS Certified AI Practitioner</h4>
              <p>Artificial Intelligence and Machine Learning on AWS.</p>
            </div>
          </Link>
          <Link href="https://www.credly.com/badges/9d0a2272-7a4c-46d4-aabd-462198c46cce" target="_blank" className={styles.certCard}>
            <div className={styles.certIconWrapper}>
              <Image
                src="/images/certs/aws-foundations.png"
                alt="AWS Academy Cloud Foundations"
                width={80}
                height={80}
                className={styles.certImage}
              />
            </div>
            <div className={styles.certContent}>
              <h4>AWS Academy Cloud Foundations</h4>
              <p>Core AWS services and cloud concepts.</p>
            </div>
          </Link>
          <Link href="https://www.skills.google/public_profiles/28b4fe3a-aa15-4ca6-b0a2-954ad88fdb06" target="_blank" className={styles.certCard}>
            <div className={styles.certIconWrapper}>
              <Image
                src="/images/certs/google-cloud.png"
                alt="Google Cloud Certified"
                width={80}
                height={80}
                className={styles.certImage}
              />
            </div>
            <div className={styles.certContent}>
              <h4>Google Cloud Certified</h4>
              <p>Cloud infrastructure and services.</p>
            </div>
          </Link>
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link href="/certifications" className={styles.ctaSecondary}>
            VIEW_ALL_CERTIFICATIONS
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>SYSTEM_MODULES</h3>
        <div className={styles.grid}>
          <Link href="/projects" className={`${styles.card} cyber-border`}>
            <h2>PROJECTS</h2>
            <p>CTF solutions, Forensic Automation, and Security Tools.</p>
          </Link>
          <Link href="/journey" className={`${styles.card} cyber-border`}>
            <h2>JOURNEY</h2>
            <p>Professional experience at Locomex, NYU, and CyberSophy.</p>
          </Link>
          <Link href="/notes" className={`${styles.card} cyber-border`}>
            <h2>NOTES</h2>
            <p>Personal knowledge base and cheat sheets.</p>
          </Link>
          <Link href="/writeups" className={`${styles.card} cyber-border`}>
            <h2>WRITEUPS</h2>
            <p>Detailed reports on CTFs and vulnerability assessments.</p>
          </Link>
          <Link href="/blogs" className={`${styles.card} cyber-border`}>
            <h2>BLOGS</h2>
            <p>Thoughts on Quantum Security and AI threats.</p>
          </Link>
          <Link href="/photography" className={`${styles.card} cyber-border`}>
            <h2>VISUALS</h2>
            <p>Photography and visual logs.</p>
          </Link>
        </div>
      </section>
    </div >
  );
}
