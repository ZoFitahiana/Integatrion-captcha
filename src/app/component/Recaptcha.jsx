"use client"
import { useEffect } from 'react';

const Recaptcha = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="g-recaptcha"  data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}></div>
  );
};

export default Recaptcha;
