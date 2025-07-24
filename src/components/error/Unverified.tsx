/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Alert, Button, notification, Spin } from "antd";
import { useRequestEmailCodeMutation } from "../../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";

interface VerificationWarningProps {
  onCancel: () => void;
}

const VerificationWarning: React.FC<VerificationWarningProps> = ({
  onCancel,
}) => {
  const [verify, { isLoading }] = useRequestEmailCodeMutation();
  const navigate = useNavigate();

  const openNotification = (description: string) => {
    notification.error({
      message: "Verification Failed",
      description,
      placement: "topRight",
    });
  };

  const onVerify = async () => {
    try {
      await verify(undefined).unwrap();
      notification.success({
        message: "Verification Email Sent",
        description: "A verification email has been sent to your address.",
        placement: "topRight",
      });

      navigate("/validateotp");
    } catch (error: any) {
      switch (error?.status) {
        case 500:
          openNotification("Server error. Please try again later.");
          break;
        case 400:
          openNotification("Validation error. Please check your inputs.");
          break;
        default:
          openNotification("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="my-2 px-10">
      <Alert
        message=""
        description="Please verify your account to access all features."
        type="warning"
        showIcon
        action={
          <div className="flex gap-2">
            <Button
              size="small"
              type="primary"
              onClick={onVerify}
              disabled={isLoading}
            >
              {isLoading ? <Spin size="small" /> : "Verify"}
            </Button>
            <Button size="small" type="default" onClick={onCancel}>
              Close
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default VerificationWarning;
