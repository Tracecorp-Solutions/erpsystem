import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react'; // 

function InvoiceDetails() {
    
    const handleMenuClick = ({ key }) => {
        // Implement logic based on the menu item clicked
        if (key === 'authorize') {
          console.log('Authorize Invoice clicked');
          // Add logic for authorize action
        } else if (key === 'reject') {
          console.log('Reject Invoice clicked');
          // Add logic for reject action
        }
      };
    
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="authorize">Authorize Invoice</Menu.Item>
          <Menu.Item key="reject" style={{ color: 'red' }}>
            Reject Invoice
          </Menu.Item>
        </Menu>
      );

  return (
    <div className="flex flex-col justify-end items-center px-16 pt-8 bg-white max-md:px-5">
      <div className="flex flex-col w-full max-w-[1200px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca01bd141ef3c6838d235f4d5f39236da6fb968e5e8a926fc57ed376a1cf296?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="self-end w-8 aspect-square"
        />
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9009977c571abc9efbe32602ba25dc59733103572bd5f39009eec5a1cdee5f43?apiKey=5bf51c3fc9cb49b480a07670cbcd768f&"
          className="mt-8 aspect-[1.09] w-[76px]"
        />
        <div className="flex gap-5 justify-between mt-2 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 justify-between text-neutral-600 max-md:flex-wrap">
            <div className="text-4xl font-semibold leading-[57.6px] max-md:max-w-full">
              Ogun State Water Corporation
            </div>
            <div className="justify-center px-6 py-2.5 my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 max-md:px-5">
              unpaid
            </div>
          </div>
          <div className="flex gap-2 justify-center py-2 pr-3 pl-4 my-auto text-base bg-blue-400 font-semibold leading-6 text-white whitespace-nowrap rounded-3xl">
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
              <div className="flex gap-2 justify-center py-3 pr-4 pl-6 my-auto text-base font-semibold leading-6 text-white whitespace-nowrap rounded-3xl bg-blue-400">
                <div>Actions</div>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="mt-6 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    invoice no
                  </div>
                  <div className="text-base font-semibold leading-6 text-neutral-600">
                    #5678
                  </div>
                </div>
                <div className="flex gap-1 mt-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    Address
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    Abeokuta, Nigeria Ogun
                  </div>
                </div>
                <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    phone
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    08139936865
                  </div>
                </div>
                <div className="flex gap-1 mt-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    issue date
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    18/06/2024
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="flex gap-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    invoice to
                  </div>
                  <div className="text-base font-semibold leading-6 text-neutral-600">
                    Grace Eze
                  </div>
                </div>
                <div className="flex gap-1 mt-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    Address
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    Abeokuta, Nigeria Ogun
                  </div>
                </div>
                <div className="flex gap-1 mt-1 whitespace-nowrap max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    phone
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    081220000789
                  </div>
                </div>
                <div className="flex gap-1 mt-1 max-md:flex-wrap">
                  <div className="my-auto text-xs font-medium tracking-wide uppercase text-neutral-400">
                    due date
                  </div>
                  <div className="text-base leading-6 text-neutral-600">
                    09/12/2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-4 mt-8 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap">
            <div>no.</div>
            <div>item</div>
          </div>
          <div className="text-neutral-400">qUANTITY</div>
          <div className="text-neutral-400">UNIT COST</div>
          <div>Amount due</div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-2 mt-2 w-full text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between max-md:flex-wrap">
            <div>1.</div>
            <div>Water pipes | 20 meters</div>
          </div>
          <div>3</div>
          <div>80,000</div>
          <div className="font-semibold text-right">240,000</div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-col self-end mt-2 max-w-full text-neutral-600 w-[386px]">
          <div className="flex gap-5 justify-between px-6 py-2 whitespace-nowrap rounded-3xl max-md:px-5">
            <div className="my-auto text-xs font-medium tracking-wide uppercase">
              VAT
            </div>
            <div className="text-base font-semibold leading-6">0</div>
          </div>
          <div className="flex gap-5 justify-between px-6 py-2 mt-2 rounded-3xl max-md:px-5">
            <div className="my-auto text-xs font-medium tracking-wide uppercase">
              Grand total
            </div>
            <div className="text-base font-semibold leading-6">240,000</div>
          </div>
        </div>
        <div className="shrink-0 mt-2 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:max-w-full" />
        <div className="flex flex-col items-start p-4 mt-8 rounded-lg bg-stone-100 max-md:pr-5 max-md:max-w-full">
          <div className="text-xs font-medium tracking-wide uppercase text-neutral-400 max-md:max-w-full">
            notes
          </div>
          <div className="mt-2 text-base leading-6 text-neutral-600 max-md:max-w-full">
            This is the total costing of all the materials on the customer
            invoice as generated by the Engineer
          </div>
        </div>
        <div className="justify-end py-6 mt-44 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="grow justify-center items-center px-8 py-4 w-full text-base leading-6 rounded-3xl bg-stone-100 text-neutral-600 max-md:px-5 max-md:mt-10">
                Send Invoice
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="grow justify-center px-8 py-4 w-full text-base font-semibold leading-6 text-white rounded-3xl bg-slate-500 max-md:px-5 max-md:mt-10">
                Download Invoice
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
