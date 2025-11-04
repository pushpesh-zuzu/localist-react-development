import { useState } from "react";
import MultiStepForm from "../component/MultiStepForm/MultiStepForm";
import { useSelector } from "react-redux";

function MultiStepWithImage() {
  const [hasMountedDetector, setHasMountedDetector] = useState(false);
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  return (
    <div>
      <MultiStepForm isQuestionWithImage />
    </div>
  );
}

export default MultiStepWithImage;
