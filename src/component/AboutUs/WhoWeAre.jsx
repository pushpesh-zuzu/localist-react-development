import WithBlueTextBlack from "../common/headings/WithBlueTextBlack";
import styles from "./whoweare.module.css";

const WhoWeAre = () => {
  return (
    <div className={styles.mainContainer}>
      <WithBlueTextBlack firstblueText="Who" secondText="we are" />
      <p className={styles.content}>
        At <b>Localists</b>, we believe that trust and quality should never be
        compromised when it comes to your home or business. Every year, millions
        of UK households face issues with unreliable tradespeople—and we’re here
        to change that.
      </p>
      <p className={styles.content}>
        Since our launch, we’ve been dedicated to connecting people with{" "}
        <b> verified, trusted local professionals </b> who deliver work to the
        highest standards.
      </p>
      <div
        className={styles.detail}
       
      >
        <h3 style={{ textAlign: "left", marginBottom: "4px" }}>
          Setting the Standard
        </h3>
        <p>
          Not just anyone can join Localists. Every professional is carefully
          vetted through a series of strict checks before they’re approved.
          <ul>
            <li>We verify their identity and qualifications where required.</li>
          </ul>
          <ul>
            <li>
              We ensure they have a clean track record—no bankruptcies,
              directorship bans, or unresolved county court judgments.
            </li>
          </ul>
          <ul>
            <li>
              We check that they consistently provide excellent customer service
              and quality workmanship.
            </li>
          </ul>
          We don’t cut corners. Last year alone, hundreds of applicants were
          turned away because they didn’t meet our standards.
        </p>
        <h3>Ongoing Trust & Transparency</h3>
        <p>
          Approval isn’t a one-time process. To stay on Localists, professionals
          must maintain consistently positive reviews. We regularly monitor
          feedback and verify reviews to make sure they come from real people
          and reflect real experiences.
        </p>
        <h3>Peace of Mind for Every Customer</h3>
        <p>
          In the rare event that something doesn’t go as planned, we’re here to
          help put things right. Your satisfaction and protection are our
          priority, giving you confidence every time you book through Localists.
        </p>
        <p>
          With <b>Localists</b> , you’re not just hiring a professional—you’re
          choosing quality, reliability, and peace of mind.
        </p>
      </div>
    </div>
  );
};

export default WhoWeAre;
