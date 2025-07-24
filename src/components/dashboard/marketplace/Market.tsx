import Sidebar from '../../common/Sidebar';
import TopBar from '../../common/Topbar';
import BidsList from './bids/bids';
import {useState} from 'react';
import type {ConfigProviderProps, RadioChangeEvent} from 'antd';
import {Radio} from 'antd';
// import {Typography} from 'antd';
import ServicesList from "./services/services.tsx";
import Servicerequest from "./servicerequest/servicerequest.tsx";

// const {Title} = Typography;
type SizeType = ConfigProviderProps['componentSize'];

export default function Market() {
  const [size, setSize] = useState<SizeType>('small');
  const [current, setCurrent] = useState("bids");

  const onChange = (e: RadioChangeEvent) => {
    console.log('onChange', e.target.value);
    setCurrent(e.target.value);
    setSize(e.target.value);
    console.log(size)
  };

  const renderContent = () => {
    switch(current) {
      case "bids":
        return <BidsList />;
      case "services":
        return <ServicesList />;
      case "servicerequests":
        return <Servicerequest/>;
      case "businessdetails":
        return <div>Business Details Content</div>;
      default:
        return <BidsList />;
    }
  };

  return (
      <>
        <div className='w-full bg-white h-screen'>
          <Sidebar></Sidebar>
          <div className="lg:pl-72">
            <TopBar></TopBar>
            <main className="py-10">
              <div className="px-4 sm:px-6 lg:px-8 text-red-700">
                <div>
                  <Radio.Group value={current} onChange={onChange} style={{marginBottom: 16}}>
                    <Radio.Button value="bids">Bids Listing</Radio.Button>
                    <Radio.Button value="services">My Services</Radio.Button>
                    <Radio.Button value="servicerequests">Service Requests (From Bidders)</Radio.Button>
                    <Radio.Button value="businessdetails">Business Details</Radio.Button>
                  </Radio.Group>
                </div>

                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </>
  )
}