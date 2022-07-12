getHistoryPayment()

async function getHistoryPayment() {
    let response = await fetch(`http://localhost:3000/payments`, {
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
            <td>
        <a href="profile-order.html?id=${item.order_id}" class="btn btn-primary">Xem chi tiết</a>
    </td>
        </tr>`)
        $('tbody').append(newItem)
    });
}