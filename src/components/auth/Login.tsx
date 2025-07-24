/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormProps, NotificationArgsProps } from "antd";
import { Button, Form, Input, notification, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";

type FieldType = {
  username: string;
  password: string;
  remember?: boolean;
};

type NotificationPlacement = NotificationArgsProps["placement"];

const Login: React.FC = () => {
  const [login, { isLoading, data }] = useLoginMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.Success && data.Data) {
      console.log("Login response data:", data);
      const { access_token, refresh_token } = data.Data;
      console.log(access_token);
      localStorage.setItem("dlmp-access", JSON.stringify(access_token));
      localStorage.setItem("dlmp-refresh", JSON.stringify(refresh_token));
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    }
  }, [data, navigate]);

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
    setLoading(true);
    try {
      const result = await login(values).unwrap();
      console.log("Success:", result);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.data?.Error.ErrorMessage || "An error occurred , please try again later";
      openNotification("topRight", errorMessage);
    } finally {
      setLoading(false);
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="pb-10">
            <img src={logo} className="mx-auto h-20 w-auto" alt="Logo" />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            form={form}
            name="login"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Enter Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Enter Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="pt-12">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading || isLoading}
              >
                {loading || isLoading ? <Spin /> : "Login"}
              </Button>
            </Form.Item>

            <Form.Item className="pt-8">
              <Link to="/register" className="text-blue-500 hover:underline">
                New user? Create account
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
