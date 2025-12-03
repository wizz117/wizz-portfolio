import { getAllNoteSlugs, getNoteData } from '../../../lib/notes';
import styles from './page.module.css';
import Link from 'next/link';

export async function generateStaticParams() {
    const paths = getAllNoteSlugs();
    return paths;
}

export default async function Note({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const noteData = await getNoteData(slug);

    return (
        <div className={styles.container}>
            <div className={styles.terminal}>
                <div className={styles.header}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.headerTitle}>user@cyber-portfolio:~/notes/{noteData.slug}</span>
                </div>
                <div className={styles.content}>
                    <Link href="/notes" className={styles.backLink}>
                        &lt; cd ..
                    </Link>

                    <h1 className={styles.title}>{noteData.title}</h1>
                    <span className={styles.meta}>
                        Date: {noteData.date} | Category: {noteData.category}
                    </span>

                    <div
                        className={styles.markdown}
                        dangerouslySetInnerHTML={{ __html: noteData.contentHtml || '' }}
                    />
                </div>
            </div>
        </div>
    );
}
