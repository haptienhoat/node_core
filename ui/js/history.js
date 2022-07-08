getHistory()

async function getHistory() {
    let response = await fetch(`http://localhost:3000/orders`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    })
    let data = await response.json()
    data.forEach(item => {
        let newItem = $(`<tr>
            <td>${item.price}</td>
            <td>${item.createdAt}</td>
            <td>${item.status}</td>
        </tr>`)
        let newItemTd = $(`<td>
        <a href="profile-order.html?id=${item._id}" class="btn btn-primary">Xem chi tiết</a>
    </td>`)
        let newItemA = $(`<a class="btn btn-primary destroyorder" data-toggle="modal" data-id="${item._id}"
        data-target="#destroy-product-modal">Hủy đơn hàng</a>
    <a class="btn btn-primary completeorder" data-toggle="modal" data-id="${item._id}"
        data-target="#complete-product-modal">Hoàn thành đơn hàng</a>`)
        if (item.status == "wait") {
            newItemTd.append(newItemA)
        }
        newItem.append(newItemTd)
        $('tbody').append(newItem)
    });
    let id
    $('.destroyorder').click(function () {
        id = $(this).attr("data-id")
        console.log(id)
    })
    $('.deleteorder').click(async function () {
        try {
            let response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            })
            let data = await response.json()
            alert('Hủy đơn hàng thành công')
            window.location = "history.html";
        } catch (error) {
            console.log("Error: ", error)
        }
    })
    $('.completeorder').click(function () {
        id = $(this).attr("data-id")
        console.log(id)
    })
    $('.completeorders').click(async function () {
        try {
            let response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            })
            let data = await response.json()
            window.location = "history.html";
        } catch (error) {
            console.log("Error: ", error)
        }
    })
}