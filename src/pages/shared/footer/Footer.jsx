import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-100 ">
      <div className="footer py-10  text-base-content w-11/12 mx-auto">
        <div>
          <Link
            className="text-primary text-xl uppercase font-bold tracking-wider"
            to="/"
          >
            <h2 className="">Library</h2>
          </Link>
          <p>
            <br />
            Register now for unlimited access to books and resources
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <Link className="link link-hover">Marketing</Link>
          <Link className="link link-hover">Advertisement</Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link className="link link-hover">About us</Link>
          <Link to="/contact-me" className="link link-hover">
            Contact
          </Link>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <Link className="link link-hover">Terms of use</Link>
          <Link className="link link-hover">Privacy policy</Link>
          <Link className="link link-hover">Cookie policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
