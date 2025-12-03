import Link from 'next/link';
import styles from './Navbar.module.css';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'NOTES', path: '/notes' },
  { name: 'WRITEUPS', path: '/writeups' },
  { name: 'BLOGS', path: '/blogs' },
  { name: 'JOURNEY', path: '/journey' },
  { name: 'CERTS', path: '/certifications' },
  { name: 'PHOTOS', path: '/photography' },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className="glitch-text" data-text="WIZZ">WIZZ</span>
      </div>
      <ul className={styles.navLinks}>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path} className={styles.link}>
              {`[ ${item.name} ]`}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
