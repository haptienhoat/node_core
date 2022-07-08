getProduct()

async function getProduct() {
    try {
        let response = await fetch(`http://localhost:3000/products`)
        let data = await response.json()
        let product = data.products
        let category = data.categories
        category.forEach(item => {
            let newItem = $(`<option id="optioncategory">${item}</option> `)
            $('#selectcategory').append(newItem)
        })
        product.forEach(item => {
            let newItem = $(`<div class="col-sm-6 col-lg-4">
                    <div class="card card-product-item" style="width: 18rem;">
                        <a>
                            <img id="img-product" class="card-img-top" src="${item.image}" alt="${item.name}">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">
                            ${item.name}
                            </p>
                            <p class="card-text">
                                Số lượng: ${item.quantity}
                            </p>
                            <p class="card-text">
                                Giá: ${item.price}
                            </p>
                            <button class="btn btn-primary viewproduct" name="${item._id}">Xem chi tiết</button>
                        </div>
                    </div>
                </div>`)
            $('.row').append(newItem)
        });
        $(".viewproduct").click(function() {
            window.location = `profile-product.html?id=${$(this).attr("name")}`;
        })
        $('#selectcategory').on('change', async function() {
            $('.row').empty()
            try {
                let response = await fetch(`http://localhost:3000/products?category=${this.value}`)
                let data = await response.json()
                data.forEach(item => {
                    let newItem = $(`<div class="col-sm-6 col-lg-4">
                            <div class="card card-product-item" style="width: 18rem;">
                                <a>
                                    <img id="img-product" class="card-img-top" src="${item.image}" alt="${item.name}">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">
                                    ${item.name}
                                    </p>
                                    <p class="card-text">
                                        Số lượng: ${item.quantity}
                                    </p>
                                    <p class="card-text">
                                        Giá: ${item.price}
                                    </p>
                                    <button class="btn btn-primary viewproduct" name="${item._id}">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>`)
                    $('.row').append(newItem)
                });
                $(".viewproduct").click(function() {
                    window.location = `profile-product.html?id=${$(this).attr("name")}`;
                })
            } catch (error) {
                console.log("Error: ", error)
            }
          });
        $(".searchproduct").click(async function(event) {
            event.preventDefault()
            let key = $('.keyproduct').val()
            $('.row').empty()
            try {
                let response = await fetch(`http://localhost:3000/products?category=${key}`)
                let data = await response.json()
                data.forEach(item => {
                    let newItem = $(`<div class="col-sm-6 col-lg-4">
                            <div class="card card-product-item" style="width: 18rem;">
                                <a>
                                    <img id="img-product" class="card-img-top" src="${item.image}" alt="${item.name}">
                                </a>
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">
                                    ${item.name}
                                    </p>
                                    <p class="card-text">
                                        Số lượng: ${item.quantity}
                                    </p>
                                    <p class="card-text">
                                        Giá: ${item.price}
                                    </p>
                                    <button class="btn btn-primary viewproduct" name="${item._id}">Xem chi tiết</button>
                                </div>
                            </div>
                        </div>`)
                    $('.row').append(newItem)
                });
                $(".viewproduct").click(function() {
                    window.location = `profile-product.html?id=${$(this).attr("name")}`;
                })
            } catch (error) {
                console.log("Error: ", error)
            }
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}