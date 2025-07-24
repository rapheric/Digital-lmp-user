/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useResetPasswordMutation } from "../../redux/features/user/userApi";
import type { NotificationPlacement } from "antd/es/notification/interface";

type FieldType = {
  confirmPassword: string;
  password: string;
};

const ValidatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Notification handler
  const openNotification = (
    placement: NotificationPlacement,
    description: string
  ) => {
    api.error({
      message: `Error in your request`,
      description: description.toUpperCase(),
      placement,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      openNotification("topRight", "Passwords do not match!");
      return;
    }

    try {
      const result = await resetPassword({ password }).unwrap();
      if (result.success) {
        navigate("/login");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Password reset failed.";
      openNotification("topRight", errorMessage);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="pb-10">
            <img src={logo} className="mx-auto h-20 w-auto" alt="Logo" />
          </div>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            name="basic"
            labelCol={{ span: 56 }}
            wrapperCol={{ span: 56 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="horizontal"
          >
            <Form.Item<FieldType>
              label="Enter password"
              name="password"
              style={{ paddingBottom: "55px" }}
              rules={[
                { required: true, message: "Please enter new password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              style={{ paddingBottom: "20px" }}
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 56, span: 56 }} className="pt-10">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Set New Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ValidatePassword;
