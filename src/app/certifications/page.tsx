import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Certifications() {
    const certifications = [
        {
            title: "AWS Certified Security – Specialty",
            issuer: "Amazon Web Services",
            description: "Validates advanced technical skills and experience in designing and implementing security solutions on the AWS platform.",
            image: "/images/certs/aws-security.png",
            link: "https://www.credly.com/badges/8588f16f-6b35-423c-a4d3-512b9175f335"
        },
        {
            title: "AWS Certified AI Practitioner",
            issuer: "Amazon Web Services",
            description: "Demonstrates an understanding of Artificial Intelligence, Machine Learning, and Generative AI concepts and use cases on AWS.",
            image: "/images/certs/aws-ai.png",
            link: "https://www.credly.com/badges/51cca7ea-c550-4b46-98f1-b9b5b7332f76"
        },
        {
            title: "AWS Academy Cloud Foundations",
            issuer: "Amazon Web Services",
            description: "Certification of completion for the AWS Academy Cloud Foundations course, covering cloud concepts, AWS core services, security, architecture, pricing, and support.",
            image: "/images/certs/aws-foundations.png",
            link: "https://www.credly.com/badges/9d0a2272-7a4c-46d4-aabd-462198c46cce"
        },
        {
            title: "Google Cloud Certified",
            issuer: "Google Cloud",
            description: "Demonstrates proficiency in Google Cloud technologies and solutions.",
            image: "/images/certs/google-cloud.png",
            link: "https://www.skills.google/public_profiles/28b4fe3a-aa15-4ca6-b0a2-954ad88fdb06"
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>CERTIFICATIONS_LOG</h1>

            <div className={styles.grid}>
                {certifications.map((cert, index) => (
                    <div key={index} className={`${styles.card} cyber-border`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconWrapper}>
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    width={60}
                                    height={60}
                                    className={styles.certImage}
                                />
                            </div>
                            <h2 className={styles.certTitle}>{cert.title}</h2>
                        </div>

                        <p className={styles.description}>{cert.description}</p>

                        <div className={styles.meta}>
                            <span className={styles.issuer}>{cert.issuer}</span>
                            <Link href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                VERIFY_CREDENTIAL &gt;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
