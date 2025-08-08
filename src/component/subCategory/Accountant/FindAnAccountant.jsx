import styles from "./FindAnAccountant.module.css";
import findAccountantimage from "../../../assets/Images/subcategory/find-accountant.png";
import { handleScrollToBottom } from "../../../utils/scroll";

const FindAnAccountant = ({ title }) => {
  return (
    <>
      <div className={styles.findAnAccountant_container}>
        <div className={styles.findAnAccountant_container_wrap}>
          <div className={styles.findAnAccountant_content}>
            <h2 className={styles.findAnAccountant_heading}>
              Find Local Fence & Gate Installers Near You
            </h2>
            <p className={styles.findAnAccountant_paragrap}>
              Add privacy, security, and style to your property with expertly
              installed fences and gates. Whether you need to define your
              boundaries, enhance kerb appeal, or improve safety, Localists.com
              will connect you with trusted local professionals who can help
              keep your home looking smart and feeling secure
            </p>
            <h3>Installation Times and Planning Permission</h3>
            <p className={styles.findAnAccountant_paragrap}>
              The time it takes to install a fence or gate depends on the type
              of project. Automatic gates generally take between two and three
              days to fit, while most fences can be installed in as little as
              one to three days. In some cases, planning permission is required.
              For example, you will need permission if your driveway gates are
              taller than one metre and located next to a public road or
              footpath. Similarly, you will need permission if your fence
              exceeds two metres in height, or more than one metre if it borders
              a road or public pathway
            </p>
            <h3>Costs and Choosing the Right Option</h3>
            <p className={styles.findAnAccountant_paragrap}>
              The cost of fence and gate installation varies depending on the
              size, style, and materials you choose. Your installer will be able
              to provide expert advice on the full range of options, helping you
              find the most suitable solution for your needs and budget. Many
              homeowners choose to install fences and gates for several reasons.
              Privacy is a key consideration, giving you peace of mind both
              inside your home and when enjoying your garden. Security is
              another major factor, as strong fencing and gates can deter
              intruders, prevent wildlife from entering your property, and keep
              pets and children safe. They also mark clear property boundaries,
              helping to avoid disputes with neighbours, and can add instant
              visual appeal, potentially increasing the value of your home.
            </p>
          </div>
          {/* <div className={styles.findAnAccountant_image}>
            <img src={findAccountantimage} />
          </div> */}
        </div>
        <button
          onClick={() => handleScrollToBottom()}
          className={styles.findAnAccountant_button}
        >
          Get quotes from {title}s near you
        </button>
        <div className={styles.findAnAccountant_container_wrap}>
          <div className={styles.findAnAccountant_content}>
            <h3>Types of Fencing</h3>
            <p className={styles.findAnAccountant_paragrap}>
              There are many different styles of fencing available. Solid fence
              panels, such as Closeboard or Feather Edge designs, provide
              complete privacy and robust security. Decorative or semi-solid
              panels, including Venetian and Louvre styles, allow light and air
              to pass through while adding visual charm. Trellis fencing is
              ideal for plant lovers, allowing climbing greenery to flourish and
              sunlight to filter through the upper sections. Picket fencing, a
              traditional favourite for front gardens, enhances the appearance
              of a home while providing light security.
            </p>
            <h3>Types of Gates</h3>
            <p className={styles.findAnAccountant_paragrap}>
              Gates are equally versatile and are available in wood, aluminium,
              steel, PVC, and wrought iron, with options for both manual and
              automatic operation. Sliding gates are perfect for properties with
              limited space, opening smoothly to the side. Swing gates bring
              classic style and can be fitted with manual or automated
              mechanisms. Retractable gates are a practical choice for compact
              areas, folding neatly away, while vertical pivot gates offer a
              striking and space-saving solution
            </p >
            <h3>Find trusted fence & gate installers near you today.</h3>
            <p className={styles.findAnAccountant_paragrap}>
              Get free quotes, compare reviews, and choose the right
              professional for your home – all in one place at{" "}
              <span style={{ fontWeight: 700 }}>Localists.com.</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindAnAccountant;
