import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const WelcomeWebPage = () => {
  return (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Sandy D. Repairs!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Downtown Foo City, Sandy D. Repairs provides a
          trained staff ready to meet your tech repair needs. We are your
          one-stop solution for all your electronic devices repair needs.
          Whether it's a laptop, a smartphone, a tablet, a TV, or anything else,
          we can fix it for you at an affordable price and with a fast
          turnaround time.
        </p>
        <address className="public__addr">
          Sandy D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Sandy Davidson</p>
      </main>
      <footer>
        <Link to="/login">
          Employee Login
          <FontAwesomeIcon icon={faRightLong} />
        </Link>
      </footer>
    </section>
  );
};

export default WelcomeWebPage;
