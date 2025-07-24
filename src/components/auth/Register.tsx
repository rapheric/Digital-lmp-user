/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FormProps, NotificationArgsProps } from "antd";
import { Button, Form, Input, notification, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useState, useEffect } from "react";

type FieldType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

type NotificationPlacement = NotificationArgsProps["placement"];

const Register: React.FC = () => {
  const [register, { isLoading, data }] = useRegisterMutation();

  useEffect(() => {
    if (data?.Data) {
      localStorage.setItem("dlmp-access", JSON.stringify(data.Data));
    }
  }, [data]);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

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

  const onFinish = async (values: FieldType) => {
    if (values.password !== values.confirmPassword) {
      openNotification("topRight", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await register(values).unwrap();
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (error: any) {
      switch (error?.status) {
        case 500:
          openNotification("topRight", error?.data?.Error.ErrorMessage || "Server error");
          break;
        case 400:
          openNotification(
            "topRight",
            error?.data?.Error.ErrorMessage || "Validation error"
          );
          break;
        default:
          openNotification("topRight", "An error occurred , try again later");
      }
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="pb-10">
            <img src={logo} className="mx-auto h-20 w-auto" alt="Logo" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form
            form={form}
            name="register"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="horizontal"
          >
            <Form.Item<FieldType>
              label="Full names"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email address"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 56, span: 56 }}
              layout="vertical"
              className="pt-12"
            >
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={isLoading || loading}
              >
                {loading || isLoading ? <Spin /> : "Register"}
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 48, span: 56 }} className="pt-8">
              <Link to="/">Have an account? Login</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
