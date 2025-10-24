import React, { useEffect, useState } from "react";
import styles from './TermsConditions.module.css';
import { useLocation, Link } from "react-router-dom";
import ContentForProfessonal from "./ContentForProfessonal";
import ContentForConsumers from "./ContentForConsumers";
const TermsAndCondition = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("professionals");

  // Set active tab from URL hash (#customers / #professionals)
  useEffect(() => {
    if (location.hash === "#professionals") {
      setActiveTab("professionals");
    } else {
      setActiveTab("customers");
    }
  }, [location]);
  console.log(location,'locationlocation')

  return (
    // 'hello'
    <div className={styles.container}>
      {/* Navigation Tabs */}
      <nav className={styles.navWrapper}>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link
              to="#consumers"
              className={`${styles.navLink} ${
                activeTab === "customers" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("customers")}
            >
              Consumers
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="#professionals"
              className={`${styles.navLink} ${
                activeTab === "professionals" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("professionals")}
            >
              Professionals
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          {activeTab === "customers" ? (
            // <CustomersTerms />
            <ContentForConsumers/>
          ) : (
            <ContentForProfessonal/>
            // <ProfessionalsTerms/>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomersTerms = () => {
  return (
    <>
      <h1 className={styles.mainHeading}>
        Terms & Conditions <br />
        for Customers
      </h1>

      <p className={styles.lastUpdated}>
        <span></span>
        <span>Last Updated: 05 September 2025</span>
      </p>

      <p className={styles.paragraph}>
        These Terms and Conditions govern the Facilitation Services that
        Bark.com will make available to you, and are in addition to any website
        terms of use that apply from time to time, to your use of the Website
        (as defined below). These Terms and Conditions (also, "Agreement")
        contain important information about your legal rights and obligations,
        and is a legally binding agreement between you ("you", the "Customer"),
        and Bark.com Global Limited ("we", "us", "Bark").
      </p>

      <p className={styles.paragraph}>
        You should read these Terms and Conditions carefully before using our
        Bark.com Website, as by using our Platform and Facilitation Services,
        and by clicking accept when prompted to the Website, you agree to be
        bound by all agreements which constitute Bark's Terms of Service,
        including the{" "}
        <a href="/terms" className={styles.link}>
          Terms of Use
        </a>
        ,{" "}
        <a href="/privacy" className={styles.link}>
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="/cookies" className={styles.link}>
          Cookies Policy
        </a>
        , and that you will comply with them.
      </p>

      <p className={styles.paragraph}>
        If you want to use our Website, you must first read and agree to this
        Agreement. If you do not understand this Agreement or you do not agree
        to all of its terms and conditions, you may not use our Website and do
        not click to accept this Agreement or "sign-up". If you are using our
        Facilitation Services on behalf of a business or a legal entity, you may
        only do so if you have authority to agree to the Terms of Service on
        behalf of that business or legal entity.
      </p>

      <p className={styles.paragraph}>
        You may only use the Website if you are at least 18 years old.
      </p>

      <p className={styles.paragraph}>
        For users located in the USA, this Agreement contains a mandatory
        individual arbitration provision and a class action/jury trial waiver
        provision in clause 8 below that require, unless you opt out pursuant to
        the instructions in the arbitration provision, the exclusive use of
        final and binding arbitration on an individual basis to resolve disputes
        between you and us, including any claims that arose or were asserted
        before you agreed to this Agreement.
      </p>

      <h2 className={styles.sectionHeading}>About us</h2>

      <p className={styles.paragraph}>
        We, Bark.com Global Limited ("we", "us", "Bark") make the Facilitation
        Services available to you via the Website. We are a company registered
        in England and Wales under company number 10614196, registered address
        85 Great Portland Street, London, England, W1W 7LT. Our VAT number is
        GB175306803.
      </p>

      <p className={styles.paragraph}>You can contact us:</p>

      <ul className={styles.contactList}>
        <li>
          By email at{" "}
          <strong>
            <a href="mailto:team@bark.com" className={styles.link}>
              team@bark.com
            </a>
          </strong>
        </li>
        <li>
          By phone at{" "}
          <strong>
            <a href="tel:+442036970237" className={styles.link}>
              020 3697 0237
            </a>
          </strong>
        </li>
        <li>
          By post at{" "}
          <strong>85 Great Portland Street, London, England, W1W 7LT</strong>
        </li>
      </ul>

      <h2 className={styles.sectionHeading}>
        <span className={styles.clauseNumber}>1.</span>
        <span>Definitions and Interpretation</span>
      </h2>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>1.1.</span>
        <span>
          In these Terms and Conditions, the following words and expressions
          have the following meanings:
        </span>
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.firstCol}>"Bark"</td>
              <td>
                a request from a Customer as referred to in clause 2.2 below;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"the Customer" / "you"</td>
              <td>
                businesses and consumers who use the Website to search for a
                Professional who can provide the professional services they
                require;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"Customer Contract"</td>
              <td>
                the contract between the Professional and the Customer for the
                provision of the Services;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"the Facilitation Services"</td>
              <td>
                the identification of relevant Professionals and the provision
                by Bark, of a Professional's contact details, as set out in
                clause 2.5;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"the Professional"</td>
              <td>
                means the person offering their professional services to
                Customers;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"the Services"</td>
              <td>
                the professional services provided by a Professional to a
                Customer;
              </td>
            </tr>
            <tr>
              <td className={styles.firstCol}>"the Website"</td>
              <td>
                means{" "}
                <a href="/" className={styles.link}>
                  www.Bark.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={styles.sectionHeading}>
        <span className={styles.clauseNumber}>2.</span>
        <span>The Facilitation Services</span>
      </h2>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>2.1.</span>
        <span>
          Bark.com operates the Website which has been established to facilitate
          introductions between potential customers and professionals for the
          provision of a wide range of services.
        </span>
      </p>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>2.2.</span>
        <span>
          Customers will be able to search the Website to find potential
          professionals, and the Website algorithms will help identify
          professionals who may be able to meet the Customer's requirements. We
          call Customer requests "Barks", and each Bark will result in us
          putting you in touch with Professionals who may be able to fulfil the
          criteria you have provided.
        </span>
      </p>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>2.3.</span>
        <span>
          To use the Facilitation Services, you will be required to accept these
          Terms and Conditions on submitting a Bark, and an agreement will be
          formed between you and us for the provision of the Facilitation
          Services at that point. You will need to enter into a separate
          contract with any Professionals you wish to instruct to provide you
          with Services. See below for more information.
        </span>
      </p>

      <div className={styles.importantNotice}>
        <p className={styles.numberedParagraph}>
          <span className={styles.clauseNumber}>2.11.</span>
          <span>
            The Facilitation Services shall be provided to you at no cost.
            <br />
            <br />
            <strong className={styles.important}>
              Important: <br />
              Bark.com acts only as a facilitator of the introductions referred
              to above, and the provision of any Services by a Professional to a
              Customer will be subject to an entirely separate legal contract.
              If there are any issues with performance of those Services by the
              Professional, you will have legal rights of redress against the
              Professional directly, and not against Bark.com.
            </strong>
          </span>
        </p>
      </div>

      <h2 className={styles.sectionHeading}>
        <span className={styles.clauseNumber}>3.</span>
        <span>Ending our contract</span>
      </h2>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>3.1.</span>
        <span>
          You can always end your contract with us, and you can do this by
          ceasing to use the Facilitation Services. If you have opened a
          customer account on the Website, you will need to contact us by email,
          phone or post using the details listed above.
        </span>
      </p>

      <h2 className={styles.sectionHeading}>
        <span className={styles.clauseNumber}>4.</span>
        <span>Ranking criteria for Professionals</span>
      </h2>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>4.1.</span>
        <span>
          When you place a request on the Website, Bark creates a list of
          Professionals who meet the requirements that you have specified.
          Professionals on the list are ranked by Bark.com based on a default
          algorithm which values certain criteria.
        </span>
      </p>

      <div className={styles.subClause}>
        <p className={styles.boldNumber}>4.2.</p>
        <div>
          <p className={styles.paragraph}>
            The possession of certain criteria enables the algorithm to select
            the best matches for your request. Among the Professionals who
            provide the Service requested in a specific location, the algorithm
            attributes a higher ranking to those who:
          </p>
          <div className={styles.subList}>
            <div className={styles.subItem}>
              <p className={styles.boldNumber}>4.2.1.</p>
              <p className={styles.paragraph}>
                have a full, up-to-date profile with signs of great experience
                prior to joining Bark.com;
              </p>
            </div>
            <div className={styles.subItem}>
              <p className={styles.boldNumber}>4.2.2.</p>
              <p className={styles.paragraph}>
                have positive performance on Bark.com and a strong review score;
              </p>
            </div>
            <div className={styles.subItem}>
              <p className={styles.boldNumber}>4.2.3.</p>
              <p className={styles.paragraph}>
                respond to Customer requests very quickly;
              </p>
            </div>
            <div className={styles.subItem}>
              <p className={styles.boldNumber}>4.2.4.</p>
              <p className={styles.paragraph}>
                are highly active on the Website; and/or
              </p>
            </div>
            <div className={styles.subItem}>
              <p className={styles.boldNumber}>4.2.5.</p>
              <p className={styles.paragraph}>
                have signed up to a subscription package.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>
        <span className={styles.clauseNumber}>7.</span>
        <span>Liability</span>
      </h2>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>7.2.</span>
        <span>
          <strong>
            Bark.com shall have no liability to you whatsoever in respect of the
            provision of the Services and/or your dealings with any of the
            Professionals who are listed on the Website. This means that any
            error or delay in the performance of the Services, any breach of
            obligations, and any fraudulent misrepresentation made by a
            Professional directly on the Website, is the full and complete
            responsibility of each Professional.
          </strong>
        </span>
      </p>

      <h3 className={styles.subHeading}>If you are an individual consumer</h3>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>7.6.</span>
        <span>
          Please note that we only provide Facilitation Services to consumers
          for domestic and private use. You agree not to use the Facilitation
          Service for any commercial or business purposes, and we have no
          liability to you for any loss of profit, loss of business, business
          interruption, or loss of business opportunity.
        </span>
      </p>

      <h3 className={styles.subHeading}>If you are a business customer</h3>

      <p className={styles.numberedParagraph}>
        <span className={styles.clauseNumber}>7.7.</span>
        <span>
          To the maximum extent permitted by applicable law, we exclude all
          conditions, warranties, representations or other terms which may apply
          to this website or any content on it, whether express or implied.
        </span>
      </p>
    </>
  );
};

// const ProfessionalsTerms = () => {
//   return (
//     <>
//       <h1 className={styles.mainHeading}>
//         Terms & Conditions <br />
//         for Professionals
//       </h1>
//       <p className={styles.lastUpdated}>
//         <span>(Marketplace Introductions)</span>
//         <br />
//         <span>Last Updated: 02 June 2025</span>
//       </p>

//       <p className={styles.paragraph}>
//         These Terms and Conditions will apply to the facilitation services that
//         Bark.com will make available to you, and are in addition to any website
//         Terms of Use that apply from time to time, to your use of the Website
//         (as defined below). These Terms and Conditions (also, "Agreement")
//         contain important information about your legal rights and obligations,
//         and is a legally binding agreement between you ("you", the
//         "Professional"), and Bark.com Global Limited ("we", "us", "Bark").
//       </p>

//       <p className={styles.paragraph}>
//         You should read these Terms and Conditions carefully before using our
//         Bark.com Website, as by using our Platform and Facilitation Services,
//         and by clicking accept when prompted to the Website, you agree to be
//         bound by all agreements which constitute Bark's Terms of Service,
//         including the Privacy Policy and Cookies Policy, and that you will
//         comply with them.
//       </p>

//       <h2 className={styles.sectionHeading}>About us</h2>

//       <p className={styles.paragraph}>
//         Bark.com makes the Facilitation Services available to you via the
//         Website. The company is registered in England and Wales with registered
//         company number 10614196, whose registered office is at 85 Great Portland
//         Street, London, England, W1W 7LT. Our VAT number is GB175306803.
//       </p>

//       <p className={styles.paragraph}>You can contact us:</p>

//       <ul className={styles.contactList}>
//         <li>
//           By email at{" "}
//           <strong>
//             <a href="mailto:team@bark.com" className={styles.link}>
//               team@bark.com
//             </a>
//           </strong>
//         </li>
//         <li>
//           By phone at{" "}
//           <strong>
//             <a href="tel:+442036970237" className={styles.link}>
//               020 3697 0237
//             </a>
//           </strong>{" "}
//           (for callers outside the UK please see the phone number listed at the
//           bottom of the home page)
//         </li>
//         <li>
//           By post at{" "}
//           <strong>85 Great Portland Street, London, England, W1W 7LT</strong>
//         </li>
//       </ul>

//       <h2 className={styles.sectionHeading}>
//         <span className={styles.clauseNumber}>1.</span>
//         <span>Definitions and Interpretation</span>
//       </h2>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>1.1.</span>
//         <span>
//           In these Terms and Conditions, the following words and expressions
//           have the following meanings:
//         </span>
//       </p>

//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <tbody>
//             <tr>
//               <td className={styles.firstCol}>"Bark"</td>
//               <td>
//                 a request from a Prospective Customer as referred to in clause
//                 2.3 below;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"Bark Verified"</td>
//               <td>
//                 the 'bark verified' subscription that allows Professionals to
//                 display a 'verified' badge where they have passed a verification
//                 process;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"Contact"</td>
//               <td>
//                 a Prospective Customer, whose contact details have been provided
//                 to a Professional, as part of the Facilitation Services;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"Credits"</td>
//               <td>
//                 the credits purchased by a Professional, which entitles the
//                 Professional to access relevant Barks;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"Credit Subscription"</td>
//               <td>
//                 means a subscription to receive a fixed number of Credits each
//                 month in return for a recurring monthly payment;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"Customer"</td>
//               <td>
//                 a Prospective Customer who chooses a Professional to provide
//                 services to them;
//               </td>
//             </tr>
//             <tr>
//               <td className={styles.firstCol}>"the Website"</td>
//               <td>
//                 means{" "}
//                 <a href="/" className={styles.link}>
//                   www.Bark.com
//                 </a>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <h2 className={styles.sectionHeading}>
//         <span className={styles.clauseNumber}>2.</span>
//         <span>
//           Bark's contractual model & a description of the facilitation service
//         </span>
//       </h2>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>2.1.</span>
//         <span>
//           The Bark.com Platform is a web-based communications platform which
//           enables connections between Customers and Professionals. "Customers"
//           are individuals and/or businesses seeking to obtain short-term
//           services from Professionals and are therefore clients of
//           Professionals, and "Professionals" are businesses seeking to provide
//           services for Customers.
//         </span>
//       </p>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>2.2.</span>
//         <span>
//           <strong>
//             PROFESSIONALS ARE INDEPENDENT BUSINESS OWNERS AND INDEPENDENT
//             CONTRACTORS OF CUSTOMERS AND NOT EMPLOYEES, PARTNERS,
//             REPRESENTATIVES, AGENTS, JOINT VENTURERS, INDEPENDENT CONTRACTORS OR
//             FRANCHISEES OF BARK.COM. BARK DOES NOT PERFORM SERVICES AND DOES NOT
//             EMPLOY INDIVIDUALS TO PERFORM SERVICES. BY CONNECTING PEOPLE AND
//             BUSINESSES SEEKING SERVICES WITH SERVICE PROVIDERS, BARK.COM
//             OPERATES AS AN ONLINE MARKETPLACE THAT CONNECTS CUSTOMERS WITH
//             SERVICE PROVIDERS (PROFESSIONALS) WHO WISH TO PROVIDE A VARIETY OF
//             SERVICES. SUCH SERVICES WILL BE SUPPLIED PURSUANT TO A CONTRACT
//             WHICH WILL BE AGREED BETWEEN A CUSTOMER AND PROFESSIONAL WITHOUT ANY
//             INVOLVEMENT OF BARK.COM.
//           </strong>
//         </span>
//       </p>

//       <div className={styles.importantNotice}>
//         <p className={styles.numberedParagraph}>
//           <span></span>
//           <span>
//             <strong className={styles.important}>
//               Important: <br />
//               Bark.com acts only as a facilitator of the Contacts referred to
//               above, and the provision of any services by a Professional
//               (including the Services provided by you) to a Customer will be
//               subject to an entirely separate legal contract, the terms of which
//               will be agreed between the Customer and the relevant Professional
//               (you), without any involvement of Bark.com. If there are any
//               issues with performance of those Services by you, the Customer
//               will have legal rights of redress against you, as the
//               Professional, directly pursuant to the contract you enter into
//               with them.
//             </strong>
//           </span>
//         </p>
//       </div>

//       <h2 className={styles.sectionHeading}>
//         <span className={styles.clauseNumber}>8.</span>
//         <span>Payment & Using Credits</span>
//       </h2>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>8.1.</span>
//         <span>
//           To have access to Contacts, you will be required to purchase Credits
//           from us. The cost of Credits will be shown on the Website before
//           purchase, and may be varied from time to time at Bark.com's
//           discretion. VAT (or local equivalent) shall be payable in addition to
//           the Fees.
//         </span>
//       </p>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>8.4.</span>
//         <span>
//           Where you have enabled the 'enquiries' feature in your account,
//           Prospective Customers will have the ability to contact you. The point
//           at which Credits will be deducted from your account will differ
//           depending on the method of contact, and is set out in the table below:
//         </span>
//       </p>

//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Type of contact</th>
//               <th>Description</th>
//               <th>When will Credits be deducted</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Booking request</td>
//               <td>A Prospective Customer submits an enquiry to you</td>
//               <td>On submission of the request</td>
//             </tr>
//             <tr>
//               <td>Calls</td>
//               <td>A Prospective Customer calls you from the Website</td>
//               <td>On a call being placed</td>
//             </tr>
//             <tr>
//               <td>Call back request</td>
//               <td>A Prospective Customer requests a call-back</td>
//               <td>On submission of the request</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <h2 className={styles.sectionHeading}>
//         <span className={styles.clauseNumber}>9.</span>
//         <span>Refunds</span>
//       </h2>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>9.1.</span>
//         <span>
//           All Credits purchased are non-refundable except as provided for in
//           this paragraph 9. We will not, for example, offer any return of
//           Credits if the Contact(s) we provide you with are correct, but where
//           the Prospective Customer chooses not to respond to your introduction,
//           or if you do not secure the job with the Prospective Customer. There
//           may be cases where a Prospective Customer decides not to choose any of
//           the professionals we introduce them to, and this is entirely at the
//           discretion of the Prospective Customer. In these instances, no refund
//           of Credits would apply.
//         </span>
//       </p>

//       <h2 className={styles.sectionHeading}>
//         <span className={styles.clauseNumber}>17.</span>
//         <span>Complaints</span>
//       </h2>

//       <p className={styles.numberedParagraph}>
//         <span className={styles.clauseNumber}>17.1.</span>
//         <span>
//           If you have a complaint about our service, any illegal content that
//           you have encountered on the Website, or the removal or suspension of
//           your account, or any content you have uploaded to the Website, you can
//           submit it by sending an email to{" "}
//           <a href="mailto:team@bark.com" className={styles.link}>
//             team@bark.com
//           </a>
//           . We will endeavour to review all complaints within 7 days of
//           submission and provide you with a written response. Where we require
//           further information, we will request this from you.
//         </span>
//       </p>
//     </>
//   );
// };

export default TermsAndCondition;
