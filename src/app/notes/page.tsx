import Link from 'next/link';
import { getSortedNotesData } from '../../lib/notes';
import styles from './page.module.css';

export default function Notes() {
    const allNotesData = getSortedNotesData();

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
                    {allNotesData.length > 0 ? (
                        allNotesData.map((note) => (
                            <div key={note.slug} className={styles.line}>
                                <span className={styles.prompt}>$ cat</span>
                                <Link href={`/notes/${note.slug}`} className={styles.filename}>
                                    {note.title}
                                </Link>
                                <span className={styles.meta}>[{note.date}] [{note.category}]</span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.line}>
                            <span className={styles.prompt}>$</span>
                            <span className={styles.filename}>ls -la</span>
                            <span className={styles.meta}>No notes found. Add markdown files to src/content/notes</span>
                        </div>
                    )}
                    <div className={styles.cursorLine}>
                        <span className={styles.prompt}>$</span>
                        <span className={styles.cursor}>_</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
