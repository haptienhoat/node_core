getProfileProduct()

async function getProfileProduct() {
    try {
        let id = getUrlParameter('id', $(location).attr('href'))
        let response = await fetch(`http://localhost:3000/products/${id}`)
        let data = await response.json()

        let newItem = $(`<div class="col-lg-3">
        </div>
        <div class="col-lg-9">
            <h2>${data.name}</h2>
            <img id="img-product-profile" src="${data.image}" alt="${data.name}">
            <p>Mô tả: ${data.description}</p>
            <p>Giá: ${data.price} đồng</p>
            <input type="number" class="inputquantity" value=0> <br>
            <button class="btn btn-primary btn-add-to-cart">Thêm vào giỏ hàng</button>
        </div>`)
        $('.row').append(newItem)

        $(".btn-add-to-cart").click(async function (event) {
            event.preventDefault()
            if (!localStorage.getItem('username')) {
                $('.modals').css('display', 'block')
                $('#login').css('display', 'block')
            } else {
                let item = {
                    name: data.name,
                    price: data.price,
                    id: data._id,
                    quantity: $('.inputquantity').val(),
                    image: data.image
                }
                try {
                    let response = await fetch(`http://localhost:3000/carts`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                        },
                        body: JSON.stringify({ item: item }),
                    })
                    let data = await response.json()
                    window.location = `cart.html`;
                } catch (error) {
                    console.log("Error: ", error)
                }
            }
        })
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