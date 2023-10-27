import React from 'react'

export default function SignUp() {
  return (
    <section className='w-full h-screen p-20 bg-red-500'>
        <section className="flex">
            <section className='flex w-1/3 justify-center items-center'>
                <p>Join Us</p>
            </section>
            <section className='bg-white flex flex-col w-2/3 h-full'>
                <section>
                    <h1>Create Account</h1>
                    <section className='flex'>
                        <button>Sign Up with Google</button>
                        <button>Sign Up with Facebook</button>
                    </section>
                </section>
            </section>
        </section>       
    </section>
  )
}
