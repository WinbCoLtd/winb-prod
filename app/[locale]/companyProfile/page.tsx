import React from 'react';

const Profile = () => {
  return (
    <div className="relative w-full h-screen flex flex-col max-w-[1166px] max-h-auto mx-auto">
         <div className='h-[100px] bg-red-300'>Navbar</div>
         <div
        className="relative  w-auto h-screen flex flex-col bg-winb-blue"
        style={{
          backgroundImage: 'url(/companyProfile/profile.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          width: '976px', 
          height: '651px', 
        }}
      >
       
  <h1 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-semibold text-[36px] sm:text-[28px] md:text-[36px] lg:text-[40px] mt-[333px]">
  Company Profile
</h1>

      </div>
    </div>
  );
}

export default Profile;
