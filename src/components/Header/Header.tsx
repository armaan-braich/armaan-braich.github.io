import "../../styles/Header.css";

export default function Header() {
    return (
        <header className="site-header">
            <a className="site-logo" href="#">
                Armaan Braich
            </a>

            <nav className="site-nav">
                <a href="#projects">Projects</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}