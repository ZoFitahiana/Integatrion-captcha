"use client"
import Recaptcha from "./Recaptcha";

const Home = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const recaptchaResponse = event.target['g-recaptcha-response'].value;

    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recaptchaResponse }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('reCAPTCHA vérifié avec succès');
    } else {
      console.log('Échec de la vérification reCAPTCHA');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Recaptcha />
      <button type="submit">Soumettre</button>
    </form>
  );
};

export default Home;
