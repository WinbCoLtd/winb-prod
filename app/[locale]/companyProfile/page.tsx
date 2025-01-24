
import React from "react";

const Profile = () => {
  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto px-4 py-2">
      <div className="h-[127px] bg-winb-ash text-white mt-[23px] sm:mt-[12px]">
        Navbar
      </div>

      <div
        className="relative w-full flex flex-col bg-winb-blue mt-16 sm:mt-8 sm:p-2   rounded-md"
        style={{
          backgroundImage: "url(/companyProfile/profile.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className=" mt-[65px] text-black font-semibold  lg:text-[36px] md:text-[32px] sm:text-[28px] xs:text-[24px] xxs:text-[24px] leading-tight text-center">
          Company Profile
        </h1>

        <div className="mt-[200px] sm:mt-[80px] xs:mt-[60px] xxs:mt-[50px] px-10 sm:px-4 xs:px-3 xxs:px-3 text-justify">
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            WIN-B Co. Ltd., founded in 2024, specializes in exporting Japanese
            used cars. We offer a diverse selection of vehicles from all major
            Japanese manufacturers, including Toyota, Honda, Nissan, Mitsubishi,
            Mazda, Subaru, Isuzu, Suzuki, Daihatsu, and more, covering a wide
            range of models. Purchasing a used car online from Japan can be
            challenging, but we simplify the process to make it seamless and
            hassle-free for you.
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            Recognizing the growing demand and unique requirements of the
            international market, we founded this organization after conducting
            extensive research. This involved addressing challenges from the
            ground up, both domestically and globally, and understanding the
            regulations and needs of customers in different countries. Our
            mission is to simplify the car-buying experience while adhering to
            all necessary systems and standards.
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            With access to over 230,000 vehicles auctioned weekly across Japan,
            you can easily find the car that fits your preferences and budget.
            We are committed to helping you secure the best deal, ensuring you
            buy a car you are completely satisfied with, all at or below your
            preferred price. This customer-focused approach has contributed to
            our rapid global growth and a loyal customer base worldwide.
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            We deeply value your interest in our organization. For any
            inquiries, questions, feedback, or suggestions about our services,
            vehicle quality, or company, please don’t hesitate to reach out.
            Your insights are invaluable in helping us enhance the quality of
            our offerings to better serve your needs. Simply fill out the
            contact form below to share your thoughts.
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            Please feel free to contact us, we look forward to hearing from you.
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-bold">
            Dear Valued Customer,
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            If you have any inquiries, questions, comments, or suggestions
            regarding our services, vehicle quality, company, etc., please feel
            free to contact us. Your opinions, suggestions, and comments will be
            our assets to accelerate and improve the quality of our services as
            per your interests and needs. Just fill in the contact form below to
            send us your feedback. Thank you very much,
          </p>
          <br />
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-bold mb-4">
            Minami Naori
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
