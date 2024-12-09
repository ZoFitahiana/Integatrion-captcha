"use client";

import Recaptcha from "./Recaptcha";

const Home = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const recaptchaResponse = window.grecaptcha.getResponse();

        if (recaptchaResponse) {
            fetch('/api/verify-recaptcha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recaptchaToken: recaptchaResponse }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log('reCAPTCHA vérifié avec succès');
                    } else {
                        console.log('Échec de la vérification reCAPTCHA');
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de la vérification reCAPTCHA:', error);
                });
        } else {
            console.error('reCAPTCHA non validé');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Recaptcha />
            <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}></div>
            <button type="submit">Soumettre</button>
        </form>
    );
};

export default Home;
