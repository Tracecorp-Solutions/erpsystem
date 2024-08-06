import * as React from "react";
import { LineChart } from "./LineChart";

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
    <div className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full bg-white rounded-xl max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium text-slate-500">
                  <div className="my-auto">Total Tickets</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold text-neutral-600">
                    1200
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 self-end text-base text-lime-400 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/091860ec44b73a54c7470e24e512cc236cabf31f078be0317bd5a1465c08b71d?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div>15%</div>
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
                <div className="flex gap-4 justify-between text-base font-medium text-slate-500">
                  <div className="my-auto">Open Tickets</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between items-start pt-3 mt-4">
                  <div className="text-2xl font-bold text-neutral-600">
                    350
                  </div>
                  <div className="mt-3 text-sm text-neutral-400">
                    This week
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center py-6 w-full bg-white rounded-xl max-md:mt-5">
              <div className="flex flex-col px-4">
                <div className="flex gap-4 justify-between text-base font-medium text-slate-500">
                  <div className="my-auto">Resolved Tickets</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between mt-4">
                  <div className="self-start mt-3 text-2xl font-bold text-neutral-600">
                    750
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 justify-center self-end text-base font-medium text-orange-400 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be46e1a7ed4966df013c3ba35441c4141cd4ad44172d15fe22d8dbcaee3524fa?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                        className="shrink-0 w-6 aspect-square"
                      />
                      <div className="my-auto">5%</div>
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
                <div className="flex gap-4 justify-between text-base font-medium text-slate-500">
                  <div className="my-auto">Open High Priority Tickets</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8250156c18eb8cc82ec07eb5b03e3e8142c2539e1b499528a7382360588ebbc5?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
                    className="shrink-0 w-6 aspect-square"
                  />
                </div>
                <div className="flex gap-4 justify-between items-start pt-3 mt-4">
                  <div className="text-2xl font-bold text-neutral-600">
                    100
                  </div>
                  <div className="mt-3 text-sm text-neutral-400">
                    This week
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-8 py-9 mt-5 bg-white rounded-3xl max-md:px-5 max-md:max-w-full">
        <div className="flex relative flex-col pb-11 min-h-[373px] max-md:max-w-full">
          <LineChart/>
          {/* <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/64a27504-4291-4e02-9c3c-23aaa0ceb5be?apiKey=0d95acea82cc4b259a61e827c24c5c6c&&apiKey=0d95acea82cc4b259a61e827c24c5c6c"
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative shrink-0 bg-white h-[331px] max-md:max-w-full" /> */}
        </div>
      </div>
      <div className="mt-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-6 py-4 w-full bg-white rounded-3xl max-md:px-5 max-md:mt-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <div className="text-2xl font-semibold leading-10 text-slate-500">
                  Recent Activity
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
              <div className="mt-4 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pb-20">
                      <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-3xl bg-stone-100 text-neutral-400 max-md:pr-5">
                        time
                      </div>
                      <div className="py-4 pr-1 pl-4 text-base bg-white border-b border-neutral-500 border-opacity-10 text-neutral-400">
                        10:30 AM
                      </div>
                      <div className="shrink-0 h-14 bg-white border-b border-neutral-500 border-opacity-10" />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pb-20">
                      <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-none bg-stone-100 text-neutral-400 max-md:pr-5">
                        Action
                      </div>
                      <div className="py-4 pr-1 pl-4 text-base bg-white border-b border-neutral-500 border-opacity-10 text-neutral-400">
                        Ticket #0021 Resolved by John Doe
                      </div>
                      <div className="shrink-0 h-14 bg-white border-b border-neutral-500 border-opacity-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-6 py-4 w-full bg-white rounded-3xl max-md:px-5 max-md:mt-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <div className="text-2xl font-semibold leading-10 text-slate-500">
                  Top Complaints
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
              <div className="mt-4 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pb-20">
                      <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase rounded-3xl bg-stone-100 text-neutral-400 max-md:pr-5">
                        complaint type
                      </div>
                      <div className="py-4 pr-1 pl-4 text-base bg-white border-b border-neutral-500 border-opacity-10 text-neutral-400">
                        Water Leakage
                      </div>
                      <div className="shrink-0 h-14 bg-white border-b border-neutral-500 border-opacity-10" />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pb-20">
                      <div className="py-4 pr-1 pl-4 text-xs font-medium tracking-wide uppercase rounded-none bg-stone-100 text-neutral-400 max-md:px-5">
                        number of tickets
                      </div>
                      <div className="py-4 pr-1 pl-4 text-base whitespace-nowrap bg-white border-b border-neutral-500 border-opacity-10 text-neutral-400 max-md:px-5">
                        50
                      </div>
                      <div className="shrink-0 h-14 bg-white border-b border-neutral-500 border-opacity-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default CrmDashboard