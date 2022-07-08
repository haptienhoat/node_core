async function getProfile() {
    try {
        let response = await fetch(`http://localhost:3000/profiles`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
        let data = await response.json()
        $("#profileusername").val(data.username)
        $("#profileaddress").val(data.address)
        $("#profilegender").val(data.gender)
        $("#profiledate").val(data.date)
        $("#profilephone").val(data.phone)
        $('.updateprofile').click(async function (event) {
            event.preventDefault()
            let username = $("#profileusername").val()
            let address = $("#profileaddress").val()
            let gender = $("#profilegender").val()
            let date = $("#profiledate").val()
            let phone = $("#profilephone").val()
            try {
                let response = await fetch(`http://localhost:3000/profiles`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({ username: username, address: address, gender: gender, date: date, phone: phone }),
                })
                let data = await response.json()
                alert("Cập nhật thông tin thành công")
                window.location = `profile.html`;
            } catch (error) {
                console.log("Error: ", error)
            }
        })
    } catch (error) {
        console.log("Error: ", error)
    }
}

getProfile()