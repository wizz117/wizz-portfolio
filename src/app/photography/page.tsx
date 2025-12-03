'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Photography() {
    const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

    const photos = [
        { src: '/images/photography/A7302549-Enhanced-NR.JPG', alt: 'Enhanced Night Shot' },
        { src: '/images/photography/IMG_2225.jpg', alt: 'Photography Shot 1' },
        { src: '/images/photography/IMG_1516.jpg', alt: 'Photography Shot 2' },
        { src: '/images/photography/IMG_1706.jpg', alt: 'Photography Shot 3' },
        { src: '/images/photography/IMG_6054.jpg', alt: 'Photography Shot 4' },
        { src: '/images/photography/IMG_6997.jpg', alt: 'Photography Shot 5' },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>VISUAL_LOGS</h1>
            <p className={styles.subtitle}>Captured moments from the field.</p>

            <div className={styles.gallery}>
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={styles.photoCard}
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className={styles.image}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {selectedPhoto && (
                <div className={styles.overlay} onClick={() => setSelectedPhoto(null)}>
                    <div className={styles.overlayContent}>
                        <Image
                            src={selectedPhoto.src}
                            alt={selectedPhoto.alt}
                            fill
                            className={styles.overlayImage}
                            quality={100}
                        />
                    </div>
                    <button className={styles.closeButton} onClick={() => setSelectedPhoto(null)}>
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}
