
import "../../styles/Wall.css";

export default function Wall() {
  return (
    <main className="wall">

      <section className="wall-section" id="projects">
        <div className="wall-label">
          <span>01</span>
          <h2>Projects</h2>
        </div>

        <div className="shelf shelf-one" />
      </section>

      <section className="wall-section">
        <div className="wall-label">
          <span>02</span>
          <h2>Engineering</h2>
        </div>

        <div className="shelf shelf-two" />
      </section>

      <section className="wall-section" id="about">
        <div className="wall-label">
          <span>03</span>
          <h2>About Me</h2>
        </div>

        <div className="shelf shelf-three" />
      </section>

      <section className="wall-section" id="contact">
        <div className="wall-label">
          <span>04</span>
          <h2>Contact</h2>
        </div>

        <div className="shelf shelf-four" />
      </section>

    </main>
  );
}
