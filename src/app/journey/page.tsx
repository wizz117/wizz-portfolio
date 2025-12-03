import styles from './page.module.css';

const timeline = [
    {
        year: '2025 - Present',
        title: 'SECURITY_ENGINEER_INTERN',
        company: 'Locomex',
        description: 'Architected multi-tenant security for Django-React Native platform. Implemented defense-in-depth AWS security, LLM guardrails, and secure mobile-to-backend authentication.'
    },
    {
        year: '2024 - 2025',
        title: 'GRADUATE_ASSISTANT_CRYPTOGRAPHY',
        company: 'NYU Tandon',
        description: 'Supported graduate cryptography coursework, evaluated 100+ projects, and mentored students in encryption schemes and protocol design.'
    },
    {
        year: '2023 - 2025',
        title: 'MS_CYBERSECURITY',
        company: 'New York University',
        description: 'GPA: 4.0. Active member of NYU OSIRIS Cybersecurity Lab. Focus on Applied Cryptography and Network Security.'
    },
    {
        year: '2022 - 2023',
        title: 'SECURITY_ENGINEER_INTERN',
        company: 'CyberSophy',
        description: 'Executed 15+ penetration tests, enforced secure coding via SAST/SCA, and built features for CyberRaksha security assessment tool.'
    },
    {
        year: '2019 - 2023',
        title: 'BE_COMPUTER_SCIENCE',
        company: 'JNTU, Vardhaman College of Engineering',
        description: 'Bachelor of Engineering in Computer Science and Engineering.'
    }
];

export default function Journey() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CAREER_PATHWAY</h1>
            <div className={styles.timeline}>
                {timeline.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.year}>{item.year}</div>
                        <div className={styles.content}>
                            <h3 className={styles.role}>{item.title}</h3>
                            <h4 className={styles.company}>{item.company}</h4>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
