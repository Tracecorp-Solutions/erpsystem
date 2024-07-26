
import * as React from "react";

function CrmDashboard() {
return (
  <div className="flex flex-col flex-wrap content-start py-6 rounded-3xl bg-stone-100">
    <div className="flex flex-col items-start px-6 w-full max-md:px-5 max-md:max-w-full">
      <div className="text-xs font-medium tracking-wide uppercase text-neutral-400">
        3rd May, 2024
      </div>
      <div className="text-4xl font-semibold leading-[57.6px] text-neutral-600">
        Dashboard
      </div>
    </div>
    <div className="flex flex-col flex-wrap gap-y-5 justify-between content-start px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full rounded-xl bg-slate-500 max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium text-white capitalize">
                  <div className="my-auto">New Applications</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e62a2f0dfe32fef272f88a4628802b0ead234b8276035d9390952bebe29b3f20?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold text-white capitalize">
                    45
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1 self-end text-base text-lime-400 capitalize whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/091860ec44b73a54c7470e24e512cc236cabf31f078be0317bd5a1465c08b71d?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div>10%</div>
                    </div>
                    <div className="text-sm text-white">From last month</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full bg-white rounded-xl max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium capitalize text-slate-500">
                  <div className="my-auto">Pending Surveys</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold capitalize text-neutral-600">
                    20
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1 justify-center text-base font-medium text-orange-400 capitalize">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be46e1a7ed4966df013c3ba35441c4141cd4ad44172d15fe22d8dbcaee3524fa?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">5 Days</div>
                    </div>
                    <div className="text-sm text-neutral-400">
                      Avg. pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full bg-white rounded-xl max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium capitalize text-slate-500">
                  <div className="my-auto">Approved Applications</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold capitalize text-neutral-600">
                    30
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1 self-end text-base text-lime-400 capitalize whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/091860ec44b73a54c7470e24e512cc236cabf31f078be0317bd5a1465c08b71d?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-full aspect-square"
                      />
                      <div>15</div>
                    </div>
                    <div className="text-sm text-neutral-400">
                      From last month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full bg-white rounded-xl max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium capitalize text-slate-500">
                  <div className="my-auto">Pending Connections</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold capitalize text-neutral-600">
                    15
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1 justify-center text-base font-medium text-orange-400 capitalize">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be46e1a7ed4966df013c3ba35441c4141cd4ad44172d15fe22d8dbcaee3524fa?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">7 Days</div>
                    </div>
                    <div className="text-sm text-neutral-400">
                      Avg. pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-8 py-9 mt-5 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap">
          <div className="flex flex-col text-xs text-right whitespace-nowrap text-zinc-800 max-md:hidden">
            <div>100</div>
            <div className="mt-16 max-md:mt-10">75</div>
            <div className="mt-16 max-md:mt-10">50</div>
            <div className="mt-16 max-md:mt-10">25</div>
            <div className="mt-16 max-md:mt-10">0</div>
          </div>
          <div className="flex gap-5 justify-between self-end mt-24 max-md:flex-wrap max-md:mt-10">
            <div className="flex flex-col self-end mt-12 max-md:mt-10">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 rounded-xl bg-slate-500 h-[170px] w-[60px]" />
                <div className="shrink-0 self-end mt-12 bg-lime-400 rounded-xl h-[119px] w-[60px] max-md:mt-10" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                Jan 2024
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 rounded-xl bg-slate-500 h-[220px] w-[60px]" />
                <div className="shrink-0 self-end mt-36 bg-lime-400 rounded-xl h-[82px] w-[60px] max-md:mt-10" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                Feb 2024
              </div>
            </div>
            <div className="flex flex-col self-end mt-6">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 rounded-xl bg-slate-500 h-[196px] w-[60px]" />
                <div className="shrink-0 self-end mt-10 bg-lime-400 rounded-xl h-[157px] w-[60px]" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                Mar 2024
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 self-end mt-24 rounded-xl bg-slate-500 h-[119px] w-[60px] max-md:mt-10" />
                <div className="shrink-0 bg-lime-400 rounded-xl h-[220px] w-[60px]" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                Apr 2024
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 rounded-xl bg-slate-500 h-[220px] w-[60px]" />
                <div className="shrink-0 self-end mt-16 bg-lime-400 rounded-xl h-[154px] w-[60px] max-md:mt-10" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                May 2024
              </div>
            </div>
            <div className="flex flex-col self-end mt-36 max-md:mt-10">
              <div className="flex gap-1 justify-between">
                <div className="shrink-0 rounded-xl bg-slate-500 h-[76px] w-[60px]" />
                <div className="shrink-0 self-end mt-6 bg-lime-400 rounded-xl h-[51px] w-[60px]" />
              </div>
              <div className="mt-1 text-xs text-center text-zinc-800">
                Jun 2024
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-center self-start mt-6 text-sm capitalize text-neutral-400 max-md:flex-wrap">
          <div className="flex gap-3.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d0fb985bf2ca0a606171bcfeca19f2b2f409e87bb5d8f7d3d3eccfde0a4012c5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
              className="shrink-0 my-auto border-4 border-lime-400 border-solid aspect-[12.5] stroke-[4px] stroke-lime-400 w-[50px]"
            />
            <div>Total Collected Amount</div>
          </div>
          <div className="flex gap-3.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a4a8ee27217f0a8134a22f339b545cba011b279dbeb8e1fcdb0ae1beb33de94?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
              className="shrink-0 my-auto border-4 border-solid aspect-[12.5] border-slate-500 stroke-[4px] stroke-slate-500 w-[50px]"
            />
            <div>Total Billed Amount</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 py-4 mt-5 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="text-2xl font-semibold leading-10 text-slate-500">
            Recent Payments
          </div>
          <div className="flex gap-2 self-start px-4 py-2 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-600">
            <div className="my-auto">last 5</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e230b7ea2d550bf640ca159225698ee7a5b604118e1c573aef0dfaf7895e4553?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
              className="shrink-0 w-5 aspect-square"
            />
          </div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-3.5 mt-4 w-full text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex shrink gap-5 justify-between basis-auto grow-0">
            <div className="flex gap-4">
              <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
              <div className="my-auto">customer ref</div>
            </div>
            <div className="my-auto">customer name</div>
          </div>
          <div className="flex flex-auto gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
            <div>amount</div>
            <div>payment date</div>
            <div>trans ref</div>
            <div>vender ID</div>
            <div>status</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between px-6 py-3 mt-2 text-base leading-6 rounded-3xl text-neutral-600 max-md:flex-wrap max-md:px-5">
          <div className="flex gap-4 whitespace-nowrap">
            <div className="shrink-0 my-auto w-5 h-5 bg-white rounded border-2 border-solid border-neutral-500 border-opacity-10" />
            <div>219754905</div>
          </div>
          <div className="py-2">Grace Eze</div>
          <div className="py-2 whitespace-nowrap">20,000</div>
          <div className="py-1.5">5th May, 2024</div>
          <div className="py-2 whitespace-nowrap">478530</div>
          <div className="py-2">First Bank</div>
          <div className="flex flex-col justify-center my-auto text-xs font-medium tracking-wide uppercase whitespace-nowrap bg-white">
            <div className="px-3 py-1 rounded-xl bg-stone-100">completed</div>
          </div>
        </div>
        <div className="shrink-0 mt-2 mb-36 h-px border border-solid bg-neutral-500 bg-opacity-10 border-neutral-500 border-opacity-10 max-md:mb-10 max-md:max-w-full" />
      </div>
    </div>
  </div>
);
}

export default CrmDashboard;