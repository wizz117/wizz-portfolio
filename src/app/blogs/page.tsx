import styles from './page.module.css';

const blogs = [
    {
        id: 1,
        title: 'The Future of Quantum Cryptography',
        excerpt: 'Exploring the implications of quantum computing on current encryption standards.',
        date: '2024-11-01',
        readTime: '5 min read'
    },
    {
        id: 2,
        title: 'Social Engineering in the AI Era',
        excerpt: 'How deepfakes and LLMs are changing the landscape of phishing attacks.',
        date: '2024-10-15',
        readTime: '8 min read'
    },
    {
        id: 3,
        title: 'Securing Kubernetes Clusters',
        excerpt: 'Best practices for hardening your container orchestration infrastructure.',
        date: '2024-09-20',
        readTime: '12 min read'
    }
];

export default function Blogs() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THOUGHT_STREAM</h1>
            <div className={styles.grid}>
                {blogs.map((blog) => (
                    <article key={blog.id} className={styles.card}>
                        <div className={styles.meta}>
                            <span>{blog.date}</span>
                            <span>{blog.readTime}</span>
                        </div>
                        <h2 className={styles.blogTitle}>{blog.title}</h2>
                        <p className={styles.excerpt}>{blog.excerpt}</p>
                        <a href="#" className={styles.readMore}>READ_FULL_STREAM &gt;</a>
                    </article>
                ))}
            </div>
        </div>
    );
}
