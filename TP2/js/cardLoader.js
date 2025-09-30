document.addEventListener('DOMContentLoaded', async () => {
    const url = 'https://vj.interfaces.jima.com.ar/api/v2';
    const container = document.querySelector('.genders-suggestion');

    try {
        const response = await fetch(url);
        const games = await response.json();

        // Agrupa los juegos por género
        const gamesByGenre = {};
        games.forEach(game => {
            if (Array.isArray(game.genres)) {
                game.genres.forEach(genre => {
                    if (!gamesByGenre[genre.name]) gamesByGenre[genre.name] = [];
                    gamesByGenre[genre.name].push(game);
                });
            }
        });

        // Limpia el contenedor
        container.innerHTML = '';

        // Renderiza cada género y sus juegos
        Object.entries(gamesByGenre).forEach(([genre, games]) => {
            const genreDiv = document.createElement('div');
            genreDiv.className = 'genre-section';
            genreDiv.innerHTML = `<h2>${genre}</h2>`;

            // Carrusel de tarjetas
            const carruselDiv = document.createElement('div');
            carruselDiv.className = 'cards-carrusel';

            // Filtrar y limitar a 6 juegos por género
            const filteredGames = games.slice(0, 6);

            filteredGames.forEach(game => {
                const card = document.createElement('div');
                card.className = 'card';

                let priceHtml = '';
                let playButtonHtml = '';

                if (game.price !== undefined && game.price !== null) {
                    priceHtml = `<p class="game-price">$${game.price} USD</p>`;
                } else {
                    const isPaid = Math.random() < 0.5;
                    if (isPaid) {
                        let price = (Math.random() * 39 + 1).toFixed(2);
                        let playButtonHtml = `<button class="btn-option-card">
                                                <div > <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 0.839816C0 1.29816 0.324139 1.69014 0.705624 1.69014H3.92709L5.45221 13.9766C5.65272 15.5655 6.36729 16.5614 7.74966 16.5614H18.8737C19.245 16.5614 19.5692 16.2033 19.5692 15.7226C19.5692 15.2413 19.245 14.8832 18.8737 14.8832H7.91152C7.36817 14.8832 7.03468 14.4354 6.94887 13.7531L6.79635 12.5781H18.8924C20.2841 12.5781 20.9991 11.5707 21.1992 9.97085L21.9618 4.05107C21.9822 3.91054 21.995 3.76861 22 3.62615C22 3.08903 21.6567 2.7195 21.1325 2.7195H5.57626L5.38551 1.29864C5.29035 0.436857 5.02355 0 4.05154 0H0.705217C0.324139 0 0 0.391978 0 0.839816ZM6.94927 20.1871C6.94927 21.2055 7.63578 21.9999 8.50287 21.9999C8.70613 22.0019 8.90769 21.9564 9.0958 21.866C9.28392 21.7756 9.45482 21.6421 9.59855 21.4734C9.74228 21.3046 9.85597 21.104 9.93298 20.8832C10.01 20.6623 10.0488 20.4257 10.0471 20.1871C10.048 19.9487 10.0087 19.7125 9.93142 19.4921C9.85414 19.2717 9.74043 19.0714 9.59685 18.9028C9.45327 18.7343 9.28267 18.6008 9.0949 18.5101C8.90713 18.4193 8.70591 18.3732 8.50287 18.3743C7.63578 18.3743 6.94927 19.1802 6.94927 20.1871ZM15.8617 20.1871C15.8617 21.2055 16.5575 21.9999 17.4153 21.9999C18.2828 21.9999 18.9689 21.2055 18.9689 20.1871C18.9689 19.1797 18.2828 18.3743 17.4153 18.3743C16.5575 18.3743 15.8617 19.1802 15.8617 20.1871Z" fill="#FDF9FB"/>
                                                    </svg>
                                                </div>
                                            </button>`;
                        priceHtml = `<p class="game-price">$${price} USD</p>
                                    <div>${playButtonHtml}</div>`;
                        game.price = price;
                    } else {
                       let price = "Gratis";
                        playButtonHtml = `<button class="btn-option-card">Jugar</button>`;
                         priceHtml = `<p class="game-price">${price}</p>`

                    }
                }

                card.innerHTML = `
                    <div class="show-card">
                        <img src="${game.background_image_low_res}" alt="${game.name}">
                        <button class="heart-reaction"><svg width="17.5" height="17.5" viewBox="0 0 20.5 20.5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99979 20C15.4609 20 20 15.4706 20 10C20 4.53903 15.4508 0 9.98975 0C4.51946 0 0 4.53903 0 10C0 15.4706 4.52908 20 9.99979 20ZM10.0002 18.3335C5.37199 18.3335 1.67535 14.6273 1.67535 10C1.67535 5.38191 5.36195 1.66653 9.98975 1.66653C14.6075 1.66653 18.323 5.38233 18.333 10C18.3426 14.6277 14.618 18.3335 10.0002 18.3335ZM7.59742 5.62746C5.91119 5.62746 4.68553 6.90203 4.68553 8.66644C4.68553 11.2942 7.46983 13.7058 9.50911 15.01C9.67602 15.1079 9.89145 15.2451 10.019 15.2451C10.1462 15.2451 10.3328 15.1079 10.4896 15.01C12.5289 13.7058 15.3036 11.2942 15.3036 8.66686C15.3036 6.90162 14.0876 5.62746 12.3917 5.62746C11.3426 5.62746 10.4896 6.23526 9.99895 7.14716C9.49949 6.23526 8.66579 5.62746 7.59742 5.62746Z" fill="#FDF9FB"/>
                        </svg></button>
                    </div>
                    <div class="card-information">
                        <div class="card-text">
                            <p class="body1">${game.name}</p>
                            ${priceHtml}
                            ${playButtonHtml}
                        </div>
                    </div>`;
                carruselDiv.appendChild(card);
            });

            genreDiv.appendChild(carruselDiv);
            container.appendChild(genreDiv);
        });
    } catch (error) {
        container.innerHTML = '<p>Error al cargar los juegos.</p>';
        console.error(error);
    }
});
