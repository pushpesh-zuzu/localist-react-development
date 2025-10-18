import React, { useEffect, useState } from "react";
import MultiStepForm from "../component/MultiStepForm/MultiStepForm";
import { useSelector } from "react-redux";
import NavigationDetectorWithConfirmations from "../component/common/navigationDetected/NavigationDetectorWithConfirmations";

function MultiStepWithImage() {
  const [hasMountedDetector, setHasMountedDetector] = useState(false);
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  useEffect(() => {
    if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
      setHasMountedDetector(true);
    }
    // ❌ Don't depend on buyerRequest.questions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMountedDetector]);
  return (
    <div>
      {/* {<NavigationDetectorWithConfirmations />} */}
      <MultiStepForm isQuestionWithImage />
    </div>
  );
}

export default MultiStepWithImage;
