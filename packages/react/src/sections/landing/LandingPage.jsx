import React from 'react'
import Illustration from '../assets/illustration.svg'
import Security from '../assets/security.svg'
import Transaction from '../assets/Transaction.svg'
import Launch from '../assets/Launch.svg'
import Icon1 from '../assets/Icon1.svg'
import Icon2 from '../assets/Icon2.svg'
import Icon3 from '../assets/Icon3.svg'
import Path from '../assets/Path.svg'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BsBalloon, BsCardImage, BsCloudCheck, BsFacebook, BsInstagram, BsJournalArrowUp, BsSortNumericUpAlt, BsTiktok } from 'react-icons/bs'


export default function LandingPage() {
    const carouselContainerStyle = {
        height: '70vh', // 70% of the viewport height
      };
  return (
    <section className='min-h-screen'>
        {/* Navigation Bar */}
        <nav className='flex justify-between mx-10 h-14 items-center'>
           <a href="" className='font-semibold text-base text-red-700'>Abscrow</a>
            <section className='flex gap-8'>
                <a href="" className='text-gray-600 font-medium text-base hover:text-red-500 transition duration-300'>Home</a>
                <a href="" className='text-gray-600 font-medium text-base hover:text-red-500 transition duration-300'>Feature</a>
                <a href="" className='text-gray-600 font-medium text-base hover:text-red-500 transition duration-300'>Product</a>
                <a href="" className='text-gray-600 font-medium text-base hover:text-red-500 transition duration-300'>FAQ</a>
            </section> 
            <section className='flex gap-3 items-baseline'>
                <a href="" className='text-red-500 font-semibold hover:text-red-700 transition duration-300'>Login</a>
                <a href="" className='bg-red-500 px-2 py-1 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300'>Sign up</a>
            </section> 
        </nav>




    <div className="relative  overflow-hidden">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000} // 5 seconds per slide
      >
        <div className="carousel-slide" style={carouselContainerStyle}>
          <div className="w-full h-full  text-white flex items-center">
            <div className="flex-1 text-center p-6">
              <h1 className="text-6xl text-gray-600 font-semi-bold mr-4"> Welcome to <span className='text-red-500'>Abscrow</span>: Your Trusted Transaction Partner</h1>
              <p className="text-gray-400 text-lg mt-4">
              Connect with the world and make transactions hassle-free with Abscrow's blockchain innovation.
              </p>
              <button className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-6  font-semibold">
                Learn More
              </button>
            </div>
            <div className="flex-1">
            <img src={Security} className='object-contain w-full h-full' alt="SVG 1" />
            </div>
          </div>
        </div>
        <div className="carousel-slide " style={carouselContainerStyle}>
          <div className="w-full h-full  text-white flex items-center">
            <div className="flex-1 text-center p-6">
              <h1 className="text-6xl text-gray-600 font-semi-bold mr-4">Secure Online Payments</h1>
              <p className="text-gray-400 text-lg mt-4 line-clamp-3 mx-4">
              Experience the future of online payments with Abscrow. Your transactions are protected with cutting-edge blockchain technology
              </p>
              <button className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-6  font-semibold">
              Get Started
              </button>
            </div>

            <div className="flex-1">
              <img src={Transaction} className='object-contain w-full h-full' alt="SVG 1" />
            </div>
          </div>
        </div>

        
        <div className="carousel-slide" style={carouselContainerStyle}>
          <div className="w-full h-full text-white flex items-center">
            <div className="flex-1 text-center p-6">
              <h1 className="text-6xl text-gray-600 font-semi-bold mr-4">Revolutionizing Online Payments for a Safer Tomorrow</h1>
              <p className="text-gray-400 text-lg mt-4 line-clamp-3 mx-4">
              Discover a new era of secure and efficient online payments through the power of Abscrow's blockchain technology. Your transactions are safeguarded with the latest innovations
              </p>
              <button className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-6  font-semibold">
              Explore Features
              </button>
            </div>
            <div className="flex-1">
                <img src={Launch} className='object-contain w-full h-full' alt="SVG 1" />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
{/* How it Works */}
    <section className='flex w-full items-center flex-col mt-4 gap-2'>
        <h1 className='text-3xl text-gray-600 font-medium'>How It Works</h1>
        <p className='text-base text-gray-500'>Elevate Your Online Transactions with Abscrow in Simple clicks.</p>
        <section className='flex w-full mt-4 items-center justify-around'>
        <section className='flex gap-4'>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon1} alt="" />
                <h1 className='font-semibold text-lg'>Initiate Your Transaction</h1>
                <p className='text-gray-500 w-2/3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, perferendis.</p>
            </section>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon2} alt="" />
                <h1 className='font-semibold text-lg'>Lock in Your Funds</h1>
                <p className='text-gray-500 w-2/3'>Your payment is securely held in escrow by our smart contract..</p>
            </section>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon3} alt="" />
                <h1 className='font-semibold text-lg'>Funds Released</h1>
                <p className='text-gray-500 w-2/3'>Once everything is in order, the funds are automatically released.</p>
            </section>

        </section>

        </section>
    </section>


   

      {/* Our Values */}
    <section className='flex w-full items-center flex-col mt-6 gap-2'>
        <h1 className='text-3xl text-gray-600 font-medium'>Our Values</h1>
        <p className='text-base text-gray-500'>Elevate Your Online Transactions with Abscrow in Simple clicks.</p>
        <section className='flex w-full mt-4 items-center justify-around'>
        <section className='flex gap-4'>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon1} alt="" />
                <h1 className='font-semibold text-lg'>Integrity</h1>
                <p className='text-gray-500 w-2/3'> Integrity is a fundamental value in maintaining trust with customers, shareholders, and the broader community.</p>
            </section>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon2} alt="" />
                <h1 className='font-semibold text-lg'>Customer-Centricity</h1>
                <p className='text-gray-500 w-2/3'>Focusing on the needs and preferences of customers, providing quality service, and developing products and solutions that address their financial requirements.</p>
            </section>
            <section className='flex-1 w-full flex flex-col items-center'>
                <img src={Icon3} alt="" />
                <h1 className='font-semibold text-lg'>Innovation</h1>
                <p className='text-gray-500 w-2/3 text-justify'>Abscrow has often emphasized its commitment to innovation as a means to improve the customer experience and drive growth.</p>
            </section>

        </section>

        </section>
    </section>


    <div className="bg-white mx-auto w-4/5 flex gap-4 mt-3 rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-2/5">
          <img
            className="w-full h-auto"
            src={Path}
            alt="Card Image"
          />
        </div>
        <div className="p-4 md:w-3/5">
          <h2 className="text-2xl font-semibold mb-2">
            Your Path to Trustworthy Transactions Starts Here
          </h2>
          <p className="text-gray-600 mb-6 ">
            Abscrow is your Gateway to a world of trustworthy transactions. Powered by cutting-edge blockchain technology and smart contracts, we’ve redefined the way buyers and sellers interact, creating a secure and transparent ecosystem where every deal is handled with precision. Say goodbye to uncertainty and hello to the future of commerce with Abscrow.
          </p>
          <a
            href="#learn-more-link"
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-6  font-semibold"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>


     {/* Our Clients */}
     <section className='flex w-full items-center flex-col mt-8 mb-8 gap-2'>
        <h1 className='text-3xl text-gray-600 font-medium'>Our Clients</h1>
        <p className='text-base text-gray-500'>Some partners we have been working with over the years</p>
        <section className='flex w-full mt-4 items-center justify-around'>
            <BsCardImage fontSize={40}/>
            <BsInstagram fontSize={40}/>
            <BsFacebook fontSize={40}/>
            <BsCloudCheck fontSize={40}/>
            <BsJournalArrowUp fontSize={40}/>

        </section>
    </section>



    <div className="bg-white mx-auto w-4/5 flex gap-4 mt-3 rounded-lg overflow-hidden">
      <div className="md:flex">
        
        <div className="p-4 md:w-3/5">
          <h2 className="text-2xl font-semibold mb-2">
            Your Path to Trustworthy Transactions Starts Here
          </h2>
          <p className="text-gray-600 mb-6">
            Abscrow is your Gateway to a world of trustworthy transactions. Powered by cutting-edge blockchain technology and smart contracts, we’ve redefined the way buyers and sellers interact, creating a secure and transparent ecosystem where every deal is handled with precision. Say goodbye to uncertainty and hello to the future of commerce with Abscrow.
          </p>
          <a
            href="#learn-more-link"
            className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 mt-6 font-semibold"
          >
            Learn More
          </a>
        </div>
        <div className="md:w-2/5">
          <img
            className="w-full h-auto"
            src={Path}
            alt="Card Image"
          />
        </div>
      </div>
    </div>

    <footer className="bg-red-700 text-white">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="mb-6">
            <h2 className="text-base font-medium mb-3">Company</h2>
            <ul>
              <li><a href="#" className='text-sm'>About Us</a></li>
              <li><a href="#" className='text-sm'>Careers</a></li>
              <li><a href="#" className='text-sm'>Press</a></li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-medium mb-3">Products</h2>
            <ul>
              <li><a href="#" className='text-sm'>Features</a></li>
              <li><a href="#" className='text-sm'>Pricing</a></li>
              <li><a href="#" className='text-sm'>Support</a></li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-medium mb-3">Resources</h2>
            <ul>
              <li><a href="#" className='text-sm'>Blog</a></li>
              <li><a href="#" className='text-sm'>Documentation</a></li>
              <li><a href="#" className='text-sm'>Community</a></li>
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-base font-medium mb-3">Contact</h2>
            <ul>
              <li className='text-sm'>Email: info@example.com</li>
              <li className='text-sm'>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    </section>
    
  )
}
