$('.addproduct').click(async function addProduct(event) {
    event.preventDefault()
    let name = $("#addname").val()
    let image = $("#addimage").val()
    let category = $("#addcategory").val()
    let description = $("#adddescription").val()
    let price = $("#addprice").val()
    let quantity = $("#addquantity").val()
    try {
        let response = await fetch(`http://localhost:3000/products`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({ name: name, image: image, category: category, description: description, price:price, quantity:quantity }),
        })
        let data = await response.json()
        alert('Thêm sản phẩm thành công')
        window.location = `addproduct.html`;
    } catch (error) {
        console.log("Error: ", error)
    }
})

