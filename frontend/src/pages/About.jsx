import React from "react";
import about1 from "../assets/about-1.svg";
import about2 from "../assets/about-2.svg";
import about3 from "../assets/about-3.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full">
          <h1 className="text-5xl text-[#c97642] capitalize font-bold text-center mb-10">
            About Us
          </h1>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="bg-[#333] rounded-md p-2">
              <div className="w-full flex justify-center">
                <div className="w-1/2">
                  <img className="w-full" src={about1} alt="About" />
                </div>
              </div>
              <h3 className="text-[#c97642] text-3xl text-center font-bold capitalize">
                Made With Love
              </h3>
              <p className="text-slate-300 text-center text-2xl mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                repellendus eveniet nulla, harum dignissimos eos omnis nihil
                veniam tempore. Aliquid non quae neque eaque laboriosam magnam
                ut quam vitae impedit?
              </p>
            </div>

            <div className="bg-[#333] rounded-md p-2">
              <div className="w-full flex justify-center">
                <div className="w-1/2">
                  <img className="w-full" src={about2} alt="About" />
                </div>
              </div>
              <h3 className="text-[#c97642] text-3xl text-center font-bold capitalize">
                30 minutes delivery
              </h3>
              <p className="text-slate-300 text-center text-2xl mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                repellendus eveniet nulla, harum dignissimos eos omnis nihil
                veniam tempore. Aliquid non quae neque eaque laboriosam magnam
                ut quam vitae impedit?
              </p>
            </div>

            <div className="bg-[#333] rounded-md p-2">
              <div className="w-full flex justify-center">
                <div className="w-1/2">
                  <img className="w-full" src={about3} alt="About" />
                </div>
              </div>
              <h3 className="text-[#c97642] text-3xl text-center font-bold capitalize">
                shared with friends
              </h3>
              <p className="text-slate-300 text-center text-2xl mt-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                repellendus eveniet nulla, harum dignissimos eos omnis nihil
                veniam tempore. Aliquid non quae neque eaque laboriosam magnam
                ut quam vitae impedit?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
