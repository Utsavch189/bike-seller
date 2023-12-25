import React from 'react';

function AdminLogin() {
  return (
    <div className="h-[100vh] flex items-center bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="mx-6 xs:mx-16 sm:mx-32 md:mx-48 xl:mx-56 2xl:mx-96 lg:flex w-full rounded-md bg-white">
        <div className="hidden md:block md:w-[50%] md:bg-[url(https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] md:bg-cover md:bg-no-repeat md:rounded-l-md"></div>
        <div className="lg:w-[50%] flex flex-col gap-6 rounded-md bg-white">
          <div className="pt-6 flex justify-center">
            <div style={{ clipPath: "circle(50% at 50% 50%)" }} className="flex justify-center items-center w-32 h-32 md:w-44 md:h-44 bg-blue-800">
              <div style={{ clipPath: "circle(50% at 50% 50%)" }} className="w-[7.8rem] h-[7.8rem] md:w-[10.8rem] md:h-[10.8rem] bg-[url(https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] lg:bg-[url(https://images.unsplash.com/photo-1549958909-db7599598400?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-no-repeat"></div>
            </div>
          </div>
          <div className="font-[Poppins]">
            <div className="text-4xl text-center font-semibold text-slate-600">Bike.com</div>
            <div className="text-xl text-center text-slate-400">Welcome back!</div>
          </div>
          <form className="px-4 py-6 text-lg">
            <div className="mb-8 flex flex-col gap-4">
              <input className="p-3 rounded-md border" type="email" placeholder="Email" />
              <input className="p-3 rounded-md border" type="password" placeholder="Password" />
            </div>
            <button className="font-[Roboto] py-3 w-full rounded-md flex justify-center items-center hover:scale-105 duration-300 font-medium text-white bg-blue-800">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
