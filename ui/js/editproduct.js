getEditProduct()

async function getEditProduct() {
    try {
        let id = getUrlParameter('id', $(location).attr('href'))
        let response = await fetch(`http://localhost:3000/products/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        let data = await response.json()
        $('#editname').val(data.name)
        $('#editquantity').val(data.quantity)
        $('#editimage').val(data.image)
        $('#editcategory').val(data.category)
        $('#editdescription').val(data.description)
        $('#editprice').val(data.price)
        $('.updateproduct').click(async function () {
            event.preventDefault()
            let name = $("#editname").val()
            let image = $("#editimage").val()
            let category = $("#editcategory").val()
            let description = $("#editdescription").val()
            let price = $("#editprice").val()
            let quantity = $("#editquantity").val()
            try {
                let response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({ name: name, image: image, category: category, description: description, price: price, quantity: quantity }),
                })
                let data = await response.json()
                alert('Cập nhật sản phẩm thành công')
                window.location = `editproduct.html?id=${id}`;
            } catch (error) {
                console.log("Error: ", error)
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