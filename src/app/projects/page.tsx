import styles from './page.module.css';

const projects = [
    {
        id: 1,
        title: 'OFFENSIVE_SECURITY_CTF',
        description: 'Solved 50+ challenges across reverse engineering, binary exploitation (shellcode, ROP, heap), web attacks (SQLi, XSS), and cryptographic vulnerabilities.',
        tags: ['CTF', 'Binary Exploitation', 'Reverse Engineering'],
        link: '#'
    },
    {
        id: 2,
        title: 'AWS_FORENSIC_AUTOMATION',
        description: 'Automated forensic framework using AWS Lambda, CloudWatch, and SecurityHub to acquire memory dumps and evidence from EC2 instances.',
        tags: ['AWS', 'Lambda', 'Forensics', 'Python'],
        link: '#'
    },
    {
        id: 3,
        title: 'PENTEST_VULN_ASSESSMENT',
        description: 'Conducted penetration testing for a simulated client, identifying 6+ critical vulnerabilities including anonymous FTP, SSH reuse, and root escalation.',
        tags: ['Pentesting', 'Network Security', 'Reporting'],
        link: '#'
    },
    {
        id: 4,
        title: 'QUANTUM_RESISTANT_SEC',
        description: 'Engineered communication protocols using Crystals Kyber and McEliece encryption to optimize resilience against quantum-based cyber attacks.',
        tags: ['Cryptography', 'Post-Quantum', 'Research'],
        link: '#'
    }
];

export default function Projects() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>PROJECT_ARCHIVE</h1>
            <div className={styles.grid}>
                {projects.map((project) => (
                    <div key={project.id} className={`${styles.card} cyber-border`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.id}>ID: {project.id.toString().padStart(3, '0')}</span>
                            <div className={styles.dots}></div>
                        </div>
                        <h2 className={styles.projectTitle}>{project.title}</h2>
                        <p className={styles.description}>{project.description}</p>
                        <div className={styles.tags}>
                            {project.tags.map(tag => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                        <a href={project.link} className={styles.link}>ACCESS_CODE &gt;</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
