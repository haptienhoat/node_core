getCart()

async function getCart() {
    try {
        let response = await fetch(`http://localhost:3000/carts/${localStorage.getItem('username')}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        let data = await response.json()
        let totalprice = 0
        data.item.forEach(item => {
            totalprice += item.quantity * item.price
            let newItem = $(`<div class="block-cart">
            <div>
                <img class="img-product-cart" src="${item.image}" alt="${item.name}">
            </div>
            <div class="description-product-cart">
                <h5>${item.name}</h5>
                <p>${item.name}</p>
                <p> Số lượng: <input type="number" class="inputquantity" value=${item.quantity} name="${item.id}"></p>
                <p> Giá: ${item.price}</p>
                <button class="btn btn-primary remove-to-cart" name="${item.id}">Xóa khỏi giỏ hàng</button>
            </div>
        </div>
        <hr>`)
            $('.cart').append(newItem)
        });

        let payment = $(`<div class="total-product-cart">
        <p>Tổng tiền:</p>
        <p>${totalprice} đồng</p>
    </div>
    <div>
        <label for="">Số điện thoại :</label>
        <input type="text" id="phone">
    </div>
    <div>
        <label for="">Địa chỉ :</label>
        <input type="text" id="address">
    </div>
    <button class="btn btn-primary order">Đặt hàng</button>`)
        $('.cart').append(payment)
        $(".remove-to-cart").click(async function () {
            let response = await fetch(`http://localhost:3000/carts/remove/${$(this).attr("name")}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            let data = await response.json()
            alert('Xóa sản phẩm khỏi giỏ hàng thành công')
            window.location = `cart.html`;
        })
        $(".order").click(async function (event) {
            event.preventDefault()
            let item = data.item
            let price = totalprice
            let address = $('#address').val()
            let phone = $('#phone').val()
            try {
                let response = await fetch(`http://localhost:3000/orders`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({ item: item, price: price, phone: phone, address: address }),
                })
                let data = await response.json()
                if (data.statusCode == 400) {
                    alert(data.message)
                    window.location = `cart.html`;
                } else {
                    let responses = await fetch(`http://localhost:3000/payments`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                        },
                        body: JSON.stringify({ price: data.price, order_id: data._id }),
                    })
                    let datas = await responses.json()
                    alert('Đặt hàng thành công')
                    window.location = `home.html`;
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        })
        $('.inputquantity').on('input', async function () {
            try {
                let response = await fetch(`http://localhost:3000/products/${$(this).attr("name")}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                })
                let data = await response.json()
                response = await fetch(`http://localhost:3000/carts`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({ item: { id: data._id, quantity: $(this).val(), price: data.price, image: data.image, name: data.name } }),
                })
                data = await response.json()
            } catch (error) {
                console.log("Error: ", error)
            }
        });
    } catch (error) {
        console.log("Error: ", error)
    }
}