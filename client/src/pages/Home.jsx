import { Analytics } from "../components/Analytics";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>We are the world best it company</p>
              <h1>welcome to the My Technical</h1>
              <p>
                Are you ready to take your business to the next level with
                cutting-edge IT solutions? Look no further! At Thapa Technical,
                we specialize in providing innovative IT services and solutions
                tailored to meet your unique needs.
              </p>
              <div className="btn-group">
                <a href="/contact">
                  <button>Connect Now</button>
                </a>
                <a href="/service">
                  <button className="secondary-btn">Learn More</button>
                </a>
              </div>
            </div>

            {/* hero images */}

            <div className="hero-images">
              <img src="/images/home.png" alt="" width="400" height="500" />
            </div>
          </div>
        </section>
      </main>

      <Analytics/>

      {/* Third sdection */}

      <section className="section-hero">
          <div className="container grid grid-two-cols">

            {/* hero images */}

            <div className="hero-images">
              <img src="/images/design.png" alt="" width="400" height="500" />
            </div>

            <div className="hero-content">
              <p>We are here to help you</p>
              <h1>Get started today</h1>
              <p>
                Ready to take the first step towards a more efficient and secure
                IT infrastructure? Contact us today for a free consultation and
                let&#39;s discuss how Thapa Technical can help your business thrive in 
                the digital age.
              </p>
              <div className="btn-group">
                <a href="/contact">
                  <button>Connect Now</button>
                </a>
                <a href="/service">
                  <button className="secondary-btn">Learn More</button>
                </a>
              </div>
            </div>
          </div>
        </section>
    </>
  );
};
