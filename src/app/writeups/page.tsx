import styles from './page.module.css';

const writeups = [
    {
        title: 'HTB University CTF 2024: Binary Badlands',
        platform: 'HTB',
        link: 'https://github.com/wizz117/HTB-UNI-2024-CTF-Writeups/blob/main/HTB_UNI_2024_CTF_Write-up_(vc2499).pdf'
    },
    {
        title: 'Offensive Security CTF: Binary Exploitation',
        platform: 'CTF',
        link: 'https://github.com/wizz117/Offensive-Security-CTF-Writeups'
    },
    {
        title: 'Simulated Client Penetration Test Report',
        platform: 'Pentest',
        link: 'https://github.com/wizz117/VAPT-Report/blob/main/Final_Project_Report_vc2499.pdf'
    },
];

export default function Writeups() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>MISSION_REPORTS</h1>
            <div className={styles.list}>
                {writeups.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.icon}>📄</div>
                        <div className={styles.details}>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <div className={styles.badges}>
                                <span className={styles.platform}>{item.platform}</span>
                            </div>
                        </div>
                        {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                                DECRYPT
                            </a>
                        ) : (
                            <button className={styles.downloadBtn}>DECRYPT</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
