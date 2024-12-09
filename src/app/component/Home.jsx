"use client"

import Recaptcha from "./Recaptcha";

const Home = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (window.grecaptcha) {
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then((token) => {
                    fetch('/api/verify-recaptcha', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ recaptchaToken: token }),
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
                });
            });
        } else {
            console.error('grecaptcha object is not available');
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
