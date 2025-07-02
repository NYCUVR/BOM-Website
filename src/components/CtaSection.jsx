import React from 'react';

const CtaSection = () => {
  return (
    <div className="bg-gray-800 py-16 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          成為我們創新旅程的一部分
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          無論是技術交流、企業贊助，或是加入我們的團隊，我們都誠摯歡迎。
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/technical-white-paper.pdf" // Placeholder link
            className="rounded-md bg-brand-pink px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
          >
            下載技術白皮書
          </a>
          <a 
            href="/sponsorship" // Placeholder link
            className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
          >
            了解贊助方案 <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CtaSection; 