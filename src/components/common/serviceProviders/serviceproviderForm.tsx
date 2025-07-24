import { Drawer, Space, Button, Row, Form, Col, Input, Select, DatePicker } from 'antd';
import { useState } from 'react';
import { TiPlusOutline } from 'react-icons/ti';
// import { Form } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
    search?: string;
};

const ServiceProviderForm: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [availability, setAvailability] = useState('');
    const [experience, setExperience] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [serviceCategory, setServiceCategory] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const [open, setOpen] = useState(false);
    // type SearchProps = GetProps<typeof Input.Search>;

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!userName || !availability || !serviceCategory || !description || !serviceName || !serviceType) {
            setError('Please fill in all fields');
            return;
        }

        console.log({ name, availability, serviceCategory, description });
        setUserName('');
        setAvailability('');
        setServiceCategory('');
        setServiceName('');
        setDescription('');
        setExperience('');
        setError('');
    };
    // const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <>
        
        <Drawer
                title="Request "
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
                            New account
                        </Button>
                        <Input placeholder="Search Bids"
                        />
                      
                    </Form.Item>
                </Form>
        </div>

        <div className='w-full h-screen mx-auto '>

            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-40">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-600 ">Request to be a Service Provider</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row space-x-2 items-center w-full '>
                        <div className='w-1/2 '>
                            <div className="mb-4  text-gray-800">
                                <label className="block text-sm font-medium mb-1 text-gray-600 text-start" htmlFor="name">User Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="border bg-white border-gray-300 p-2 w-full rounded"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4  text-gray-800">
                                <label className="block mb-2 text-sm text-start font-medium text-gray-700">Select Service Category</label>
                                <select
                                    value={serviceCategory}
                                    onChange={(e) => setServiceCategory(e.target.value)}
                                    className="block   bg-white w-full p-2 border rounded-md"
                                    required
                                >
                                    <option className='bg-white text-gray-600 text-start' value="">Select...</option>
                                    <option className='bg-white text-gray-600 text-start' value="transport">Transport Services</option>
                                    <option className='bg-white text-gray-600 text-start' value="cleaning">Cleaning Services</option>
                                    <option className='bg-white text-gray-600 text-start' value="catering">Catering Services</option>
                                    <option className='bg-white text-gray-600 text-start' value="tutoring">Tutoring Services</option>
                                </select>
                            </div>
                            <div className="mb-4  text-gray-800">
                                <label className="block text-sm font-medium mb-1 text-gray-600 text-start" htmlFor="serviceType">Service Type</label>
                                <select
                                    id="serviceType"
                                    className="border bg-white border-gray-300 p-2 w-full rounded"
                                    value={serviceType}
                                    onChange={(e) => setServiceType(e.target.value)}
                                    required
                                >
                                    <option className='bg-white text-gray-600 text-start' value="">Select...</option>
                                    <option className='bg-white text-gray-600 text-start' value="delivery">Delivery</option>
                                    <option className='bg-white text-gray-600 text-start' value="customer_support">Customer Support</option>
                                    <option className='bg-white text-gray-600 text-start' value="technical_support">Technical Support</option>
                                    <option className='bg-white text-gray-600 text-start' value="cleaning">Cleaning</option>
                                    <option className='bg-white text-gray-600 text-start ' value="consulting">Consulting</option>
                                    <option className='bg-white text-gray-600 text-start' value="catering">Catering</option>
                                    <option className='bg-white text-gray-600 text-start' value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4 text-gray-800 bg-white">
                                <label className="block mb-2 text-start text-sm font-medium text-gray-700">Availability</label>
                                <select
                                    value={availability}
                                    onChange={(e) => setAvailability(e.target.value)}
                                    className=" bg-white block w-full p-2 border rounded-md"
                                    required
                                >
                                    <option  className='bg-white text-gray-600 text-start' value="">Select...</option>
                                    <option className='bg-white text-gray-600 text-start' value="full-time">Full Time</option>
                                    <option className='bg-white text-gray-600 text-start'  value="part-time">Part Time</option>
                                    <option value="on-demand">On Demand</option>
                                </select>
                            </div>

                        </div>
                        <div className='w-1/2'>
                            <div className="mb-4  text-gray-800">
                                <label className="block text-sm font-medium mb-1 text-gray-600 text-start" htmlFor="serviceName">Service Name</label>
                                <input
                                    type="text"
                                    id="serviceName"
                                    className="border bg-white border-gray-300 p-2 w-full rounded"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4  text-gray-800">
                                <label className="block text-sm font-medium mb-1 text-gray-600 text-start" htmlFor="experience">Experience</label>
                                <input
                                    type="text"
                                    id="experience"
                                    className="border bg-white border-gray-300 p-2 w-full rounded"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4  text-gray-800">
                                <label className="block text-sm font-medium mb-1 text-gray-600 text-start" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    className="border bg-white border-gray-300 p-2 w-full rounded"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className=' flex w-1/2'>
                        <button
                            type="submit"
                            className="w-full items-center bg-blue-500 text-white p-2 mt-2 rounded hover:bg-blue-600 transition"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default ServiceProviderForm;
