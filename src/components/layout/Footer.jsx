export default function Footer({ setPage }) {
  return (
    <footer className="footer mt-lg">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-row">Swift<span>Parcel</span> Kenya</div>
          <p className="footer-desc-text">
            Kenya's trusted nationwide parcel delivery service. From Nairobi to every
            corner of the country, we deliver with speed, care, and transparency.
          </p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li onClick={() => setPage("book")}>Send a Parcel</li>
            <li onClick={() => setPage("track")}>Track Parcel</li>
            <li>Express Delivery</li>
            <li>Business API</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li onClick={() => setPage("coverage")}>Coverage Map</li>
            <li onClick={() => setPage("contact")}>Contact</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
            <li>Insurance Policy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 SwiftParcel Kenya Ltd. All rights reserved.</span>
        <span>🇰🇪 Proudly Kenyan</span>
      </div>
    </footer>
  );
}