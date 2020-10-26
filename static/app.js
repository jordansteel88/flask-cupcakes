const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
    return `
        <div class="cupcake_container" data-cupcake-id=${cupcake.id}
            <li class="cupcake-details">
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            </li>
            <img class="cupcake-image" src="${cupcake.image}">
        </div>
    `;
}

async function showCupcakes() {
    const res = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcake of res.data.cupcakes) {
        let newCupcake = generateCupcakeHTML(cupcake);
        $('#cupcake-list').append(newCupcake);
    }
}

$('#cupcake-form').on('submit', async function (evt) {
    evt.preventDefault();

    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let image = $('#image').val();

    const newCupcakeData = await axios.post(`${BASE_URL}/cupcakes`,
                                       {flavor, size, rating, image});

    let newCupcakeHTML = generateCupcakeHTML(newCupcakeData.data.cupcake);
    $('#cupcake-list').append(newCupcakeHTML);
    $('#cupcake-form').trigger('reset');
});

showCupcakes();
