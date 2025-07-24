import { useState } from 'react'
import Sidebar from '../../common/Sidebar';
import TopBar from '../../common/Topbar';
import { Button, Drawer, Form, FormProps, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


export default function Team() {
  
  type FieldType = {
    fullnames?: string;
    password?: string;
    phone?: string;
    email?: string;
    nationalid?: string;
  };

  const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walto2n@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.wa23lton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.warrlton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walt23ron@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walto2wwwqn@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.waqeqelton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ]
  
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    navigate('/validateotp')
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className='w-full'>
        <Drawer title="Create User" onClose={onClose} open={open}>
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
              label="Full names"
              name="fullnames"
              layout="vertical"
              className='pt-8'
              style={{ paddingBottom: '20px' }}
              rules={[{ required: true, message: 'Please input your full names!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Phone number"
              name="phone"
              layout="vertical"
              className='pt-8'
              style={{ paddingBottom: '20px' }}
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email address"
              name="email"
              layout="vertical"
              className='pt-8'
              style={{ paddingBottom: '20px' }}
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="National ID/Passport"
              name="nationalid"
              layout="vertical"
              className='pt-8'
              style={{ paddingBottom: '20px' }}
              rules={[{ required: true, message: 'Please input your nationalid!' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item<FieldType>
              label="Password"
              name="password"
              layout="vertical"
              className='pt-8'
              style={{ paddingBottom: '20px' }}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 56, span: 56 }} layout="vertical" className='pt-12'
            >
              <Button type="primary" htmlType="submit" className='w-full'>
                Create
              </Button>
            </Form.Item>


          </Form>
        </Drawer>
       

        <Sidebar></Sidebar>

        <div className="lg:pl-72">
          <TopBar></TopBar>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 text-red-700">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                      A list of all the users in your account including their name, title, email and role.
                    </p>
                  </div>
                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                    <Button type="primary" onClick={showDrawer}>Add user</Button>
                  </div>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                          <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                              Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Title
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Status
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                              Role
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {people.map((person) => (
                            <tr key={person.email}>
                              <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                <div className="flex items-center">
                                  <div className="h-11 w-11 flex-shrink-0">
                                    <img alt="" src={person.image} className="h-11 w-11 rounded-full" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-gray-900">{person.name}</div>
                                    <div className="mt-1 text-gray-500">{person.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <div className="text-gray-900">{person.title}</div>
                                <div className="mt-1 text-gray-500">{person.department}</div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                  Active
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                              <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                  Edit<span className="sr-only">, {person.name}</span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </main>
        </div>

      </div>
    </>


  )
}