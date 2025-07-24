import type { FormProps, GetProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import logo from '../../assets/logo.png';

type FieldType = {
    password?: string;
};

type OTPProps = GetProps<typeof Input.OTP>;


const ValidatePassword: React.FC = () => {


    const navigate = useNavigate();


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        navigate('/')

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">


                <div className='pb-10'>
                    <img src={logo} className="mx-auto h-20 w-auto" />
                </div>

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
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
            className='justify-center'

        >

            

            <Form.Item<FieldType>
                label="Enter One Time Password"
                name="password"
                layout="vertical"
                style={{ paddingBottom: '15px' }}

                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Flex gap="middle" align="flex-center" vertical className='pt-4'>
                    <Input.OTP length={4} {...sharedProps} />

                </Flex>

            </Form.Item>

            <Form.Item wrapperCol={{ offset: 56, span: 56 }} layout="vertical" className='pt-12'
            >
                <Button type="primary" htmlType="submit" className='w-full' >
                    Validate Password
                </Button>
            </Form.Item>

            {/* <Form.Item wrapperCol={{ offset: 48, span: 56 }} className='pt-8' >
                <Link to="/reset">Forgot password? Reset</Link>
            </Form.Item> */}
        </Form>
            </div>
            </div>
      
    )
};

export default ValidatePassword;