import React, { useEffect } from 'react';
import * as Sentry from "@sentry/react";

interface SentryFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const SentryFeedback: React.FC<SentryFeedbackProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    let feedbackInstance: any = null;

    if (isOpen) {
      // Initialize Sentry Feedback
      feedbackInstance = Sentry.feedbackIntegration({
        colorScheme: "light",
        isNameRequired: true,
        isEmailRequired: true,
        onFormClose: () => {
          onClose();
        },
        onSubmitSuccess: () => {
          onClose();
        }
      });

      // Open the feedback dialog
      if (feedbackInstance) {
        feedbackInstance.openDialog();
      }
    }

    // Cleanup function
    return () => {
      if (feedbackInstance) {
        feedbackInstance.remove();
      }
    };
  }, [isOpen, onClose]);

  return null; // This component doesn't render anything visible
};

export default SentryFeedback;