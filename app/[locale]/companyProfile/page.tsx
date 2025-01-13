import React from 'react';

const Profile = () => {
  return (
    <div className="relative w-full  flex flex-col max-w-[1166px] max-h-auto mx-auto">
         <div className='h-[127px] bg-red-300 mt-[23px]'>Navbar</div>
         <div
        className="relative  w-auto h-screen flex flex-col bg-winb-blue mt-[72px]"
        style={{
          backgroundImage: 'url(/companyProfile/profile.png)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          width: '1166px', 
          height: '933px', 
        }}
      >
       
      <h1 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-semibold text-[36px] mt-[119px]">
      Company Profile
      </h1>

      <div className='mt-[202px] ml-10 mr-10 text-justify'>
      <p className='text-[18px] font-semibold'>WIN-B Co. Ltd. was established in 2024 as a Japanese used car exporter. As a Japanese used car exporter, we export all kinds of used Japanese cars. We carry all major manufacturers of Japanese cars, including Toyota, Honda, Nissan, Mitsubishi, Mazda, Subaru, Isuzu, Suzuki, Daihatsu, and many more with a wide range of models. Buying a used car online from Japan is a difficult task. We make it easier for you.</p><br/>

      <p className='text-[18px] font-semibold'>After studying the demand and requirements in the international market, steps were taken to create a new organization. There was a most difficult task research from root to top in both domestic and international market, which was the toughest struggle to face. Seeing the difficulties of the buyers and the rules and regulations of their country's system, this organization was established.</p><br/>

      <p className='text-[18px] font-semibold'>You can choose the car you need from 230,000 used cars sold every week at auctions nationwide. We are sure that you will find the right car in your budget very easily and quickly.</p><br/>


      <p className='text-[18px] font-semibold'>We always try to win at or below the price you give us and help you buy only the car you are happy with at that price.

      This system has enabled our business to grow rapidly around the world and is now used by many customers.

      Thank you for your interest in our organization.</p><br/>

      <p className='text-[18px] font-semibold'>Please feel free to contact us, we look forward to hearing from you. </p><br/>


      <p className='text-[18px] font-bold'>Dear Valued Customer,</p><br/>

      <p className='text-[18px] font-semibold'>If you have any inquiries, questions, comments or suggestions regarding our services, vehicle quality, company etc., please feel free to contact us. Your opinions, suggestions and comments will be our assets to accelerate and improve the quality of our services as per your interests and needs. Just fill in the contact form below to send us your feedback. Thank you very much,</p><br/>
      <p className='text-[18px] font-bold'>Lahiru Bawantha</p>
      </div>


      </div>
     
    </div>
  );
}

export default Profile;
