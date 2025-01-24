import Navbar from "@/components/Navbar";
import React from "react";

const Profile = () => {
  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <div className="min-h-[783px] mb-9 relative w-full flex flex-col mt-16 sm:mt-8 sm:p-4 md:p-8 bg-company-profile bg-cover bg-center object-center bg-no-repeat items-center justify-center">
        <h1 className=" text-black font-semibold  lg:text-[36px] md:text-[32px] sm:text-[28px]xxs:text-[24px] leading-tight text-center">
          会社概要
        </h1>

        <div className="max-w-[1029px] font-semibold text-xl text-[#000743] text-center mt-8">
          <p className="">
            WIN-Bへようこそ！
            [Year]に設立されたWIN-Bは、簡単かつ効率的に車両を売買できるプラットフォームとして知られるようになりました。自動車業界で信頼される名前として、私たちは売り手と買い手の両方にシームレスな体験を提供し、最高のサービスと満足を保証します。
          </p>
          <p className="">
            私たちの使命：
            WIN-Bの使命は、車両の売買プロセスを簡素化し、市場で最高のオプションを提供することです。さまざまな車両の好みや要件に応える包括的なプラットフォームを提供することに専念しています。
            私たちのビジョン：
            ユーザーフレンドリーな体験と信頼性の高いサービスを保証し、車両販売業界をリードすることを目指しています。ユーザーが自信を持って車両を売買できるコミュニティを創造し、品質と透明性へのコミットメントを支持します。
          </p>
          <p className="">
            私たちの提供するもの：
            多様なメーカーとモデルからなる膨大な車両データベース。
            製造元、モデル、状態、場所など、さまざまな基準に基づいて完璧な車両を見つけるための高度な検索機能。
          </p>
          <p className="lg:text-[18px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] font-semibold">
            写真、仕様、特徴を含む詳細な車両リスト。
            車両の詳細の正確性と品質を保証する専用の管理チーム。
            買い手が簡単に車両についての問い合わせやメールを送ることができるユーザーフレンドリーなプラットフォー
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
