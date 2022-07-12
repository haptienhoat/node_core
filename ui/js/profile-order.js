getProfileOrder()

async function getProfileOrder() {
    try {
        let id = getUrlParameter('id', $(location).attr('href'))
        let response = await fetch(`http://localhost:3000/orders/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        let data = await response.json()
        data.item.forEach(item => {
            let newItem = $(`<div class="block-cart">
            <div>
                <img class="img-product-cart" src="${item.image}" alt="${item.name}">
            </div>
            <div class="description-product-cart">
                <h5>${item.name}</h5>
                <p>${item.name}</p>
                <p> Số lượng: ${item.quantity}</p>
                <p> Giá: ${item.price}</p>
            </div>
        </div>
        <hr>`)
            $('.cart').append(newItem)
        });

        let payment = $(`<div class="total-product-cart">
        <p>Tổng tiền:</p>
        <p>${data.price} đồng</p>
    </div>
    <p>Địa chỉ: ${data.address} </p>
    <p>Số điện thoại: ${data.phone} </p>`)
        $('.cart').append(payment)
    } catch (error) {
        console.log("Error: ", error)
    }
}

function getUrlParameter(name, urlweb) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(urlweb);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}