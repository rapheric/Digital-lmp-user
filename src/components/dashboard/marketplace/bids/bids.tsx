import React, {useState} from 'react';
import {Button, Col, DatePicker, Drawer, Input, Row, Select, Space, Form, Radio, InputNumber} from 'antd';
import {TiPlusOutline} from 'react-icons/ti';
// import { bids } from './bidsData';
// import {Card} from 'antd';


const {Option} = Select;

type FieldType = {
    search?: string;
};

const stats = [
    {name: 'Revenue', value: '$405,091.00', change: '+4.75%', changeType: 'positive'},
    {name: 'Overdue invoices', value: '$12,787.00', change: '+54.02%', changeType: 'negative'},
    {name: 'Outstanding invoices', value: '$245,988.00', change: '-1.39%', changeType: 'positive'},
    {name: 'Expenses', value: '$30,156.00', change: '+10.18%', changeType: 'negative'},
]

const BidsList: React.FC = () => {
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
            <style>{`
                .ant-card-head {
                    background-color: #e6f4ff !important;
                }
            `}</style>

            <Drawer
                title="Create a Bid"
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
                            Submit for approval
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="bid"
                                label="Bid"
                                rules={[{ required: true, message: 'Please enter the bid' }]}
                            >
                                <Input placeholder="Please enter the bid" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="country"
                                label="Country"
                                rules={[{ required: true, message: 'Please enter the Country' }]}
                            >
                                <Input placeholder="Please enter the Country" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="location"
                                label="Location"
                                rules={[{ required: true, message: 'Please enter the location' }]}
                            >
                                <Input placeholder="Please enter the location" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="expireson"
                                label="Expires on"
                                rules={[{ required: true, message: 'Please enter the expiry date' }]}
                            >
                                <Input
                                    placeholder="Please enter the expiry date"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="origin"
                                label="origin"
                                rules={[{ required: true, message: 'Please enter the origin' }]}
                            >
                                <Input
                                    placeholder="Please enter the origin"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="frequency"
                                label="Frequency"
                                rules={[{ required: false, message: 'please enter the frequency' }]}
                            >
                                <Input placeholder='please enter the frequency' />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="estimated time of delivery"
                                label="Estimated time of delivery"
                                rules={[{ required: false, message: 'please enter the estimated time of delivery' }]}
                            >
                                <Input placeholder='please enter the estimated time of delivery' />
                            </Form.Item>

                        </Col>


                        <Col span={12}>
                            <Form.Item
                                name="capacity"
                                label="capacity"
                                rules={[{ required: true, message: 'Please enter the capacity' }]}
                            >
                                <Input
                                    placeholder="Please enter the capacity"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="status"
                                label="Status"
                                rules={[{ required: true, message: 'Please select the status of the bid' }]}
                            >
                                <Select placeholder="Please select the status">
                                    <Option value="active">active</Option>
                                    <Option value="pending">pending</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="bid type"
                                label="Bid type"
                                rules={[{ required: true, message: 'Please choose the bid type' }]}
                            >
                                <Select placeholder="Please choose the bid type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="estimatedTimeOfSail"
                                label="Estimated time of sail"
                                rules={[{ required: false, message: 'please enter the estimated time of sail' }]}
                            >
                                <Input placeholder='please enter the estimated time of sail' />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="referenceNumber"
                                label="Reference number"
                                rules={[{ required: true, message: 'Please enter the Reference number' }]}
                            >
                                <Input
                                    placeholder="Please enter the Reference number"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="order quantity"
                                label="Order quantity"
                                rules={[{ required: true, message: 'Please enter the  order quantity' }]}
                            >
                                <InputNumber min={1} max={100}
                                             placeholder='quantity' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="placementDate"
                                label="Placement Date"
                                rules={[{ required: true, message: 'Please choose the Placement Date' }]}
                            >
                                <DatePicker.RangePicker
                                    style={{width: '100%'}}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="termsAndCondtions"
                                label="Terms and condtions"
                                rules={[{ required: false, message: 'please enter the estimated time of delivery' }]}
                            >
                                <Radio value={1}>I Agree to the Terms and Conditions</Radio>
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="details"
                                label="Details"
                                rules={[{ required: false, message: 'please enter the estimated time of delivery' }]}
                            >
                                <Input.TextArea />

                            </Form.Item>

                        </Col>
                    </Row>

                </Form>
            </Drawer>
            <div className='pb-18'>
                <Form>
                    <Form.Item<FieldType>
                        name="search"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Button className='float-end mb-2' type="primary" onClick={showDrawer} icon={<TiPlusOutline/>}>
                            Create Bid
                        </Button>
                        <Input placeholder="Search Bids"
                        />

                    </Form.Item>
                </Form>
            </div>


            {stats.map((stat) => (

                <div className="pb-4">
                    <dl className="mx-auto grid grid-cols-1 gap-px bg-white sm:grid-cols-2 lg:grid-cols-4  rounded-lg drop-shadow-lg">
                        <div
                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                            <dt className="text-sm font-medium leading-6 text-gray-500">Bid ID: {stat.name}</dt>
                            <dt className="text-sm font-medium leading-6 text-gray-500">Type: {stat.name}</dt>
                            <dd className="text-xs font-medium text-gray-700">{stat.name}</dd>
                            {/*<dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">{stat.change}</dd>*/}
                        </div>
                        <div
                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                            <dt className="text-sm font-medium leading-6 text-gray-500">Overdue invoices</dt>
                            <dd className="text-xs font-medium text-rose-600">+54.02%</dd>
                            {/*<dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$12,787.00</dd>*/}
                        </div>
                        <div
                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                            <dt className="text-sm font-medium leading-6 text-gray-500">Outstanding invoices</dt>
                            <dd className="text-xs font-medium text-gray-700">-1.39%</dd>
                            {/*<dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$245,988.00</dd>*/}
                        </div>
                        <div
                            className="float-right flex flex-wrap items-baseline justify-end gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                            <Button className='mb-2' size="small" type="primary" onClick={showDrawer}
                                    icon={<TiPlusOutline/>}>
                                View
                            </Button>
                            <dd className="text-xs font-medium text-rose-600">

                                <div className="pb-6 ">


                                </div>
                            </dd>


                        </div>


                    </dl>
                </div>

            ))}
        </>

);
};

export default BidsList;
