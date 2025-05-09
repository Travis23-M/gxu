import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';

const Customerservice = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // If the same item is clicked, close it
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2>Customer Service</h2>
        <p className="text-muted">We're here to help you with anything you need.</p>
      </div>

      {/* Contact Section */}
      <div className="row mb-5">
        <div className="col-md-6 text-center">
          <i className="bi bi-telephone fs-1 text-primary"></i>
          <h5 className="mt-3">Call Us</h5>
          <p>+254 7968 26961</p>
        </div>
        <div className="col-md-6 text-center">
          <i className="bi bi-envelope fs-1 text-primary"></i>
          <h5 className="mt-3">Email Us</h5>
          <p>GxU@gmail.com</p>
        </div>
      </div>

      {/* FAQs Section */}
      <div>
        <h4>Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          {/* Accordion Item 1 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className={`accordion-button ${activeIndex === 1 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(1)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                How do I track my order?
              </button>
            </h2>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${activeIndex === 1 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                After placing an order, you’ll receive a tracking link via email.
              </div>
            </div>
          </div>

          {/* Accordion Item 2 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className={`accordion-button ${activeIndex === 2 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(2)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                What is your return policy?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${activeIndex === 2 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                We accept returns within 30 days of purchase. Items must be unused and in original packaging.
              </div>
            </div>
          </div>

          {/* Accordion Item 3 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className={`accordion-button ${activeIndex === 3 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(3)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                How long does shipping take?
              </button>
            </h2>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${activeIndex === 3 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Shipping typically takes 1-3 days for domestic orders and 7-14 days for international orders.
              </div>
            </div>
          </div>

          {/* Accordion Item 4 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className={`accordion-button ${activeIndex === 4 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(4)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
              >
                Do you offer purchase points?
              </button>
            </h2>
            <div
              id="collapseFour"
              className={`accordion-collapse collapse ${activeIndex === 4 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes, we offer purchase points in various denominations based on the price range of your goods.
              </div>
            </div>
          </div>

          {/* Accordion Item 5 */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className={`accordion-button ${activeIndex === 5 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(5)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
              >
                Can I cancel my order?
              </button>
            </h2>
            <div
              id="collapseFive"
              className={`accordion-collapse collapse ${activeIndex === 5 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Orders can be canceled within 24 hours of purchase. After that, we may not be able to make changes to your order.
              </div>
            </div>
          </div>

          {/* New FAQ Item 1: Discounts */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className={`accordion-button ${activeIndex === 6 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(6)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
              >
                Do you offer any discounts?
              </button>
            </h2>
            <div
              id="collapseSix"
              className={`accordion-collapse collapse ${activeIndex === 6 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes! We offer discounts during major sales events like Black Friday and seasonal promotions.
              </div>
            </div>
          </div>

          {/* New FAQ Item 2: Updates on Discounts and Products */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className={`accordion-button ${activeIndex === 7 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(7)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
              >
                How can I know about new products or discounts?
              </button>
            </h2>
            <div
              id="collapseSeven"
              className={`accordion-collapse collapse ${activeIndex === 7 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Updates are usually on our website or you can follow us on our social media platforms, which are listed on the <Link to="/aboutus">About Us</Link> page.
              </div>
            </div>
          </div>

          {/* New FAQ Item 3: Payment Timing */}
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEight">
              <button
                className={`accordion-button ${activeIndex === 8 ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(8)}
                data-bs-toggle="collapse"
                data-bs-target="#collapseEight"
              >
                When do I pay for my goods?
              </button>
            </h2>
            <div
              id="collapseEight"
              className={`accordion-collapse collapse ${activeIndex === 8 ? 'show' : ''}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Payment is due at the time of purchase on our website through mobile payments such as M-pesa.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Customerservice;
