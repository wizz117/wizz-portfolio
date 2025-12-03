import styles from './page.module.css';

// Placeholder images (using colored divs for now as I don't have real images)
const photos = [
    { id: 1, color: '#1a1a1a', height: '300px', title: 'Urban Decay' },
    { id: 2, color: '#222', height: '400px', title: 'Neon Nights' },
    { id: 3, color: '#111', height: '250px', title: 'Server Room' },
    { id: 4, color: '#151515', height: '350px', title: 'Cyber Cafe' },
    { id: 5, color: '#2a2a2a', height: '300px', title: 'Hardware' },
    { id: 6, color: '#1e1e1e', height: '450px', title: 'Code Rain' },
];

export default function Photography() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>VISUAL_LOGS</h1>
            <div className={styles.grid}>
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className={styles.item}
                        style={{ backgroundColor: photo.color, height: photo.height }}
                    >
                        <div className={styles.overlay}>
                            <span>{photo.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
