import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <div>
      <h2 className="about">
        <u>ABOUT US</u>
      </h2>
      <p className="abouts">
        Welcome to GxU Home Appliances where you can buy and sell products
        online
      </p>

      <div className="row">
        <div className="col-md-6">
          <p className="">
            Welcome to GxU Home Appliances!
            <br />
            At GxU we believe that shopping should be an enjoyable and seamless
            experience. Our mission is to provide high-quality products that
            enhance your lifestyle while delivering exceptional customer service.
            We specialize in eco-friendly home goods, trendy home appliances, and
            cutting-edge electronics. Each product is carefully selected to ensure
            it meets our high standards of quality, sustainability, and style in a
            cost-friendly manner.
          </p>
        </div>

        <div className="col-md-6">
          <img src="images/re.jpg" alt="" className="product_img" />
        </div>
      </div>

      <div>
        <p className="abouty">
          <u>At GxU we are Guided by: </u>
        </p>
      </div>

      <div className="row p-4">
        <div className="col-md-4 badge bg-info me-2">
          <h6 className="text-dark">
            <b>QUALITY</b>
          </h6>
          <p className="text-dark">We believe in providing only the best products</p>
          <p className="text-dark">to our customers</p>
        </div>
        <div className="col-md-3 badge bg-warning me-2">
          <h6 className="text-dark">
            <b>Sustainability</b>
          </h6>
          <p className="text-dark">We're aimed at minimizing our environmental</p>
          <p className="text-dark">impact and promoting sustainable practices.</p>
        </div>
        <div className="col-md-4 badge bg-success me-2">
          <h6 className="text-dark">
            <b>Customer-Centric</b>
          </h6>
          <p className="text-dark">
            Your satisfaction is our top priority, we strive
          </p>
          <p className="text-dark">to provide you with a seamless shopping experience.</p>
        </div>
      </div>

      {/* Social Media Section */}
      <div>
        <p className="abouty">
          <u>Follow Us on Social Media</u>
        </p>
      </div>

      <div className="row p-4">
        <div className="col-md-6 text-center">
          <Link to="https://www.facebook.com" target="_blank" className="social-icon">
            <i className="bi bi-facebook fs-3 text-primary"></i> {/* Enlarged icon size */}
            <p className="text-dark">Facebook</p>
          </Link>
        </div>
        <div className="col-md-6 text-center">
          <Link to="https://www.instagram.com" target="_blank" className="social-icon">
            <i className="bi bi-instagram fs-3 text-danger"></i> {/* Enlarged icon size */}
            <p className="text-dark">Instagram</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
