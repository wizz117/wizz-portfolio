import styles from './page.module.css';

const notes = [
    { date: '2025-01-15', title: 'aws_security_specialty_notes.txt', category: 'Certifications' },
    { date: '2024-12-20', title: 'advanced_binary_exploitation_heap.md', category: 'Exploit Dev' },
    { date: '2024-11-10', title: 'kubernetes_security_hardening.log', category: 'Cloud Sec' },
    { date: '2024-10-05', title: 'post_quantum_crypto_research.pdf', category: 'Cryptography' },
];

export default function Notes() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>/var/log/notes</h1>
            <div className={styles.terminal}>
                <div className={styles.header}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.headerTitle}>user@cyber-portfolio:~/notes</span>
                </div>
                <div className={styles.content}>
                    {notes.map((note, index) => (
                        <div key={index} className={styles.line}>
                            <span className={styles.prompt}>$ cat</span>
                            <span className={styles.filename}>{note.title}</span>
                            <span className={styles.meta}>[{note.date}] [{note.category}]</span>
                        </div>
                    ))}
                    <div className={styles.cursorLine}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.cursor}>_</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
