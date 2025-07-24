import Sidebar from '../../common/Sidebar';
import TopBar from '../../common/Topbar';
import {Alert, Button, Form, Radio} from "antd";
import {Avatar, Card, Flex} from 'antd';

import axios from "axios";
import {useEffect, useState} from "react";

const Shop = () => {
    // const isVerified = true;
    //   const [loading, setLoading] = useState<boolean>(true);

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://157.173.105.37:8001/cat/get/all',
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data["Data"]));
                setData(response.data["Data"]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const [openOption, setOpenOption] = useState<boolean>(true);

    const goBack = () => {
        setOpenOption(!openOption)
    }

    const providerRequest = () => {
        setOpenOption(!openOption)
    }
    return (
        <>
            <div className='w-full'>
                <Sidebar></Sidebar>
                <div className="lg:pl-72">
                    <TopBar></TopBar>
                    {openOption ? (<main className="">
                        <div className="relative min-h-screen bg-white">
                            {/*<VerifiedProvider verified={isVerified} />*/}
                            <h1 className="text-center">Service Providers</h1>
                            <div className="my-2 px-10">
                                <Alert
                                    message=""
                                    description="Request to be a Service Provider"
                                    type="warning"
                                    showIcon
                                    action={
                                        <div className="flex gap-2">
                                            <Button
                                                size="small"
                                                type="primary"
                                                onClick={providerRequest}
                                            >
                                                Request
                                            </Button>
                                            <Button size="small" type="default">
                                                Close
                                            </Button>
                                        </div>
                                    }
                                />
                            </div>

                            <div className="relative min-h-screen bg-white">
                                {/*<VerifiedProvider verified={isVerified} />*/}
                                <h1 className="text-center">Service Providers</h1>
                                <div className="my-2 px-10">
                                    <div className="grid grid-rows-4 grid-flow-col gap-4">

                                        <div>
                                            <Flex gap="middle">
                                                {/*<Switch checked={!loading} onChange={(checked) => setLoading(!checked)}/>*/}
                                                <Card loading={true} style={{minWidth: 300}}>
                                                    <Card.Meta
                                                        avatar={<Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>}
                                                        title="Card title"
                                                        description={
                                                            <>
                                                                <p>This is the description</p>
                                                                <p>This is the description</p>
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                                <Card loading={true} style={{minWidth: 300}}>
                                                    <Card.Meta
                                                        avatar={<Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>}
                                                        title="Card title"
                                                        description={
                                                            <>
                                                                <p>This is the description</p>
                                                                <p>This is the description</p>
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                                <Card loading={true} style={{minWidth: 300}}>
                                                    <Card.Meta
                                                        avatar={<Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>}
                                                        title="Card title"
                                                        description={
                                                            <>
                                                                <p>This is the description</p>
                                                                <p>This is the description</p>
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                                <Card loading={true} style={{minWidth: 300}}>
                                                    <Card.Meta
                                                        avatar={<Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>}
                                                        title="Card title"
                                                        description={
                                                            <>
                                                                <p>This is the description</p>
                                                                <p>This is the description</p>
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                                <Card loading={true} style={{minWidth: 300}}>
                                                    <Card.Meta
                                                        avatar={<Avatar
                                                            src="https://api.dicebear.com/7.x/miniavs/svg?seed=2"/>}
                                                        title="Card title"
                                                        description={
                                                            <>
                                                                <p>This is the description</p>
                                                                <p>This is the description</p>
                                                            </>
                                                        }
                                                    />
                                                </Card>
                                            </Flex>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>) : (

                        <div className="relative min-h-screen bg-white mt-10 w-full pb-10">
                            <Button
                                size="small"
                                type="primary"
                                onClick={goBack}
                                className='float-end mr-3 mt-3'
                            >
                                Go back
                            </Button><Button
                            size="small"
                            type="default"
                            onClick={goBack}
                            className='float-end mr-3 mt-3'
                        >
                            Submit Request for Approval
                        </Button>
                            <div
                                className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 space-x-2 max-w-7xl mx-auto'>


                                {data?.map(category => (
                                    <div>
                                        <Card bordered={false} style={{width: 300}}>

                                            <div className='flex flex-col space-y-1'>
                                                <h4 className='text-l text-gray-600 flex items-start'>{category["Category"]["Name"]}</h4>

                                                {/*{data.category.map(service => (*/}
                                                {/*<h4 className='text-l text-gray-600 flex items-start'>{service["Services"]["Name"]}</h4>*/}
                                                {/*    ))}*/}

                                                <ul>
                                                    {category["Services"].map((service: { Name: string }) => (
                                                        // <li><h4>{service["Name"]}</h4></li>

                                                        <Form.Item
                                                        name="conditions"
                                                        label=""
                                                        className='flex space-x-1 items-start'
                                                        rules={[{
                                                        required: false,
                                                        message: 'please enter the condition'
                                                    }]}
                                                >

                                                    <Radio value={service["Name"]}>{service["Name"]}</Radio>

                                                </Form.Item>
                                                    ))}
                                                </ul>





                                            </div>
                                        </Card>
                                    </div>
                                ))}


                            </div>


                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Shop