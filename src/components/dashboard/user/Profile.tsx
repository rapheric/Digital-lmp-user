/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Sidebar from "../../common/Sidebar";
import TopBar from "../../common/Topbar";
import { Button, Drawer, Form, Input, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/constants";
import VerificationWarning from "../../error/Unverified";
import { useEditProfileMutation, useUpdatePasswordMutation } from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";


export default function Profile() {
  type FieldType = {
    email?: string;
    fullName?: string;
    phone?: string;
    bio?: string,
    userId?: string,
  };

  type FieldResetType = {
    oldpassword?: string;
    newpassword?: string;
  };


  const user = getUser();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  
  const [openReset, setOpenReset] = useState(false);
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const {
    // data: userData,
    refetch: refetchUserDetails,
    isLoading:load,
  } = useLoadUserQuery( null );

  const [updatePassword] = useUpdatePasswordMutation();
  const [showWarning, setShowWarning] = useState(
    user?.ValidatedDetails === "none"
  );

  
  const handleCancelWarning = () => {
    setShowWarning(false);
  };


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const showResetDrawer = () => {
    setOpenReset(true);
  };

  const onResetClose = () => {
    setOpenReset(false);
  };

  const onFinish = async (values: FieldType) => {
    try {
      values.userId = user?.UserId;
      const response = await editProfile(values).unwrap();
      console.log(response);
      message.success("Profile updated successfully!");

     const updatedUser= await refetchUserDetails()
     console.log("New user",updatedUser.data.Data)
     localStorage.setItem("user-profile", JSON.stringify(updatedUser?.data?.Data))
      

      onClose();
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      console.log("Update error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onResetFinish = async (values: FieldType) => {
    try {
      console.log('values ', values)
      const response = await updatePassword(values).unwrap();
      console.log(response);
      message.success("Password updated successfully!");
      onClose();
    } catch (error: any) {
      message.error(`Failed to reset the password. ${error.data["Error"]["ErrorMessage"]}`);
      console.log("Update error:", error);
    }
  };

  const onResetFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="w-full">
        <Drawer title="Update User" onClose={onClose} open={open}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              fullName: user?.fullName,
              phone: user?.phone,
              email: user?.email,
              bio: user?.Bio,
              userid: user?.UserId,
            }}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Full names"
              name="fullName"
            >
              <Input/>
            </Form.Item>
          

            <Form.Item<FieldType>
              label="Phone number"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
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
              label="Bio"
              name="bio"
              rules={[{ required: true, message: "Please input your bio!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading || load}
                className="w-full"
              >
                Update the account
              </Button>
            </Form.Item>
          </Form>
        </Drawer>

        <Drawer title="Reset User Password" onClose={onResetClose} open={openReset}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onResetFinish}
            onFinishFailed={onResetFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            
            <Form.Item<FieldResetType>
              label="Old Password"
              name="oldpassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldResetType>
              label="New Password"
              name="newpassword"
              
            >
              <Input.Password />
            </Form.Item>

            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                Update the account
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <Sidebar></Sidebar>

        <div className="lg:pl-72">
          <TopBar></TopBar>

          <main className="py-10">
            {showWarning && (
              <VerificationWarning onCancel={handleCancelWarning} />
            )}
            <div className="px-4 sm:px-6 lg:px-8 text-red-700">
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-6 sm:px-6">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Bio Information 
                  </h3>
                  <p className="text-start	mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Personal details and application.
                  </p>
                </div>
                <div className="border-t border-gray-100">
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        Full name
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                        {user?.fullName || "Margot Foster"}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        Phone number
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user?.phone || "edit to add this details"}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        Email address
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user?.email || "example@gmail.com"}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        National Identification
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user?.Identification || "edit to add Id"}
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        Roles
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                        {user?.UserType || "User"}
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium text-gray-900">
                        About
                      </dt>
                      <dd className="text-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user?.Bio || "edit to add bio"}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-start text-sm font-medium leading-6 text-gray-900">
                        Update Bio
                      </dt>
                      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <li className="flex items-center justify-end py-4 pl-4 pr-5 text-sm leading-6">
                          <div className="ml-4 flex-shrink-0 ">
                            <Button type="primary" onClick={showDrawer}>
                              Click to update Profile
                            </Button>
                            <Button type="primary" className="ml-4" onClick={showResetDrawer}>
                              Click to reset password
                            </Button>
                          </div>
                        </li>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
