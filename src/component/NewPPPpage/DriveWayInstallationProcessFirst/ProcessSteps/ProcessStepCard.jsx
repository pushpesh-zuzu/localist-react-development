// ProcessStepCard.jsx
import styles from "./ProcessSteps.module.css";
import H5 from '../../UITypography/H5';
import Paragrah from '../../UITypography/Paragrah';
import InfoBadge from './InfoBadge'
import TagIcon from "../../../../assets/ReactIcons/TagIcon";
import CheckSquareIcon from "../../../../assets/ReactIcons/CheckSquareIcon";
import UserCheckIcon from "../../../../assets/ReactIcons/UserCheckIcon";

const iconMap = {
  tagIcon: <TagIcon />,
  checkSquareIcon: <CheckSquareIcon/>,
  userCheckIcon: <UserCheckIcon />,
};

const ProcessStepCard = ({ step, title, description, badges }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.stepCircle}>{step}</div>

      <div className={styles.card}>
        <H5 className={styles.title}>{title}</H5>
        <Paragrah className={styles.description} bold={false}>{description}</Paragrah>
        
         {/* ✅ badges are OPTIONAL */}
        {badges?.length > 0 && (
          <div className={styles.badgeRow}>
            {badges.map((badge, index) => (
              <InfoBadge
                key={index}
                text={badge.text}
                icon={iconMap[badge.icon]}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProcessStepCard;
