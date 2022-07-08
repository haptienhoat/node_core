getManagerProduct()

async function getManagerProduct() {
    let response = await fetch(`http://localhost:3000/products`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        let data = await response.json()
        data.products.forEach(item => {
            let newItem = $(`<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>
                <a href="editproduct.html?id=${item._id}" class="btn btn-primary">Sửa</a>
                <a class="btn btn-primary destroyproduct" data-toggle="modal" data-id="${item._id}"
                    data-target="#destroy-product-modal">Xóa</a>
            </td>
        </tr>`)
            $('tbody').append(newItem)
        });
        let id
        $('.destroyproduct').click(function() {
            id = $(this).attr("data-id")
            console.log(id)
        })
        $('.deleteproduct').click(async function() {
            try {
                let response = await fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                })
                let data = await response.json()
                alert('Xóa sản phẩm thành công')
                window.location = "managerproduct.html";
            } catch (error) {
                console.log("Error: ", error)
            }
        })
}