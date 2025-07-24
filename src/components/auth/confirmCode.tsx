/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormProps } from "antd";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useConfirmResetCodeMutation } from "../../redux/features/user/userApi";
import type { NotificationPlacement } from "antd/es/notification/interface";

type FieldType = {
  code?: string;
};

const ValidateCode: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [confirmCode, { isLoading }] = useConfirmResetCodeMutation();

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

  // Handle form submit
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // Call the confirm code mutation
      const result = await confirmCode({ code: values.code }).unwrap();
      if (result.success) {
        // Success case: Navigate to reset password page
        navigate("/reset-password");
      }
    } catch (error: any) {
      const errorMessage = error?.data?.Message;
      openNotification("topRight", errorMessage || "Code validation failed.");
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
            Validate code
          </h2>
          <p className="flex">Please enter the code from your email</p>
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
              label="Enter Code"
              name="code"
              style={{ paddingBottom: "20px" }}
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 56, span: 56 }} className="pt-8">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                Validate code
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ValidateCode;
