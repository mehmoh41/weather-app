import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center">
        <h3 className="font-normal md:text-xl mr-2 md:mr-5 text-gray-400">
          Today
        </h3>
        <h3 className="font-normal md:text-xl text-blue-500">Week</h3>
      </div>
      <div className="flex items-center">
        <div className="bg-blue-400 w-8 h-8 rounded-full relative ml-2">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            fill="#fff"
          >
            <style type="text/css"></style>
            <g id="Layer_1" />
            <g id="Layer_2">
              <g>
                <path d="M15,21c-3.3,0-6-2.7-6-6V9c0-3.3,2.7-6,6-6s6,2.7,6,6c0,0.6-0.4,1-1,1s-1-0.4-1-1c0-2.2-1.8-4-4-4s-4,1.8-4,4v6    c0,2.2,1.8,4,4,4s4-1.8,4-4c0-0.6,0.4-1,1-1s1,0.4,1,1C21,18.3,18.3,21,15,21z" />
              </g>
              <g>
                <path d="M5.5,8C4.1,8,3,6.9,3,5.5S4.1,3,5.5,3S8,4.1,8,5.5S6.9,8,5.5,8z M5.5,5C5.2,5,5,5.2,5,5.5S5.2,6,5.5,6S6,5.8,6,5.5    S5.8,5,5.5,5z" />
              </g>
            </g>
          </svg>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 md:ml-4 relative">
          <svg
            className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 12h7v2h-7v7h-2V8a4 4 0 0 1 4-4h7v2h-7a2 2 0 0 0-2 2v4zm-7.5-2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            </g>
          </svg>
        </div>
        <div className="flex bg-white px-3 py-1 rounded-xl items-center ml-14">
          <img
            src="/images/user.jpg"
            alt=""
            className="w-8 h-8 rounded-full "
          />
          <p className="text-gray-700 font-regular tracking-wide ml-3">
            Aliya scheil
          </p>
        </div>
      </div>
    </div>
  );
}
