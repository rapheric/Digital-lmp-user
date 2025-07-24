/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useRequestEmailCodeMutation } from "../../redux/features/user/userApi";
import type { NotificationPlacement } from "antd/es/notification/interface";

type FieldType = {
  email?: string;
};

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [requestCode, { isLoading }] = useRequestEmailCodeMutation();

  // Notification handler for errors
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

  // Handle form submission
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // Call the API to request the email code
      const result = await requestCode({ email: values.email }).unwrap();
      if (result.success) {
        // Success: navigate to the authenticate page
        navigate("/authenticate");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Request failed.";
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
            Password Reset
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
              label="Enter Email"
              name="email"
              style={{ paddingBottom: "20px" }}
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 56, span: 56 }} className="pt-12">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Reset
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 48, span: 56 }} className="pt-8">
              <Link to="/">Back to Login</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
