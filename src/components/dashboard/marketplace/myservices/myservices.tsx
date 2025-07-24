
import React, { useState } from 'react';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { TiPlusOutline } from 'react-icons/ti';
import { MyServices } from './servicesData';

const { Option } = Select;

type FieldType = {
    search?: string;
};
const MyServicesList: React.FC = () => {
    const [open, setOpen] = useState(false);
    // type SearchProps = GetProps<typeof Input.Search>;

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter user name' }]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label="Url"
                                rules={[{ required: true, message: 'Please enter url' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="owner"
                                label="Owner"
                                rules={[{ required: true, message: 'Please select an owner' }]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: 'Please choose the type' }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            <div className='pb-18'>
                <Form>
                    <Form.Item<FieldType>
                        name="search"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                          <Button className='float-end mb-2' type="primary" onClick={showDrawer} icon={<TiPlusOutline />}>
                            Create New Service
                        </Button>
                        <Input placeholder="Search Services"
                        />
                      
                    </Form.Item>
                </Form>
            </div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4">

                {MyServices.map((person, id) => (
                    <li key={id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                         <div className='float-start'>
                                {person.role ?
                                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {person.role}
                                        </span> : ''
                                    }
                                </div>
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                                </div>
                                <p className="mt-1 truncate flex text-start text-sm text-gray-500">{person.dateBided}</p>
                                <p className="mt-1 truncate text-sm text-start text-gray-500">{person.description}</p>
                            </div>
                            <img alt="" src={person.imageUrl} className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
                        </div>
                       
                            <div className="mt-px flex divide-x divide-gray-200">
                                <div className="flex items-center justify-center flex-1 pt-2 pb-2">
                                    <Button type="primary" >
                                        Make a bid
                                    </Button>
                                </div>
                            </div>
                        
                    </li>
                ))}
            </ul>
        </>

    );
};

export default MyServicesList;
