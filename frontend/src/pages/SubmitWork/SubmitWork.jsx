/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SubmitWorkThank from "../../components/InputSubmitWork/SubmitWorkThank";
import SubmitWorkValidation from "../../components/InputSubmitWork/SubmitWorkValidation";
import SubmitWorkImport from "../../components/InputSubmitWork/SubmitWorkImport";

function SubmitWork() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fonction pour passer à l'étape suivante
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Fonction pour revenir à l'étape précédente
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 2);
  };

  return (
    <>
      {/* Conditionnellement rendre les composants en fonction de l'étape actuelle */}
      {currentStep === 1 && (
        <SubmitWorkImport
          onNextStep={goToNextStep}
          onImageSelect={(image) => {
            console.info(image);
            setSelectedImage(image);
          }}
        />
      )}
      {currentStep === 2 && (
        <SubmitWorkValidation
          onPreviousStep={goToPreviousStep}
          onNextStep={goToNextStep}
          selectedImage={selectedImage} // Passez le chemin de l'image au composant de validation
        />
      )}
      {currentStep === 3 && (
        <SubmitWorkThank onPreviousStep={goToPreviousStep} />
      )}
    </>
  );
}

export default SubmitWork;
