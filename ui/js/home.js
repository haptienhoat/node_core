if (!localStorage.getItem('username')) {
    $('.dropdown').css('display', 'none')
    $('.cartproduct').css('display', 'none')
    $('.historyorder').css('display', 'none')
    $('.itemlogin').css('display', 'block')
    $('.itemsignup').css('display', 'block')
} else {
    $('.dropdown').css('display', 'block')
    $('.cartproduct').css('display', 'block')
    $('.historyorder').css('display', 'block')
    $('.itemlogin').css('display', 'none')
    $('.itemsignup').css('display', 'none')
    $('.dropdown-toggle').text(localStorage.getItem('username'))
    if (!localStorage.getItem('roles').includes("admin")) {
        $('.addproduct').css('display', 'none')
        $('.managerproduct').css('display', 'none')
    } else {
        $('.addproduct').css('display', 'block')
        $('.managerproduct').css('display', 'block')
    }
}

$('#linklogin').click(function () {
    $('.modals').css('display', 'block')
    $('#login').css('display', 'block')
    $('#signup').css('display', 'none')
})

$('#linksignup').click(function () {
    $('.modals').css('display', 'block')
    $('#signup').css('display', 'block')
    $('#login').css('display', 'none')
})

$('#splogin').click(function () {
    $('#login').css('display', 'block')
    $('#signup').css('display', 'none')
})

$('#spsignup').click(function () {
    $('#signup').css('display', 'block')
    $('#login').css('display', 'none')
})

$('.modals').click(function (e) {
    if (!($('.modals-body').is(e.target)) && $('.modals-body').has(e.target).length === 0) {
        $('.modals').hide();
    }
});

$('.btn-login').click(async (event) => {
    event.preventDefault()
    let username = $("#usernamelogin").val()
    let password = $("#passwordlogin").val()
    console.log(username + " and " + password)
    try {
        let response = await fetch(`http://localhost:3000/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        let data = await response.json()
        if (data.statusCode == 401 || data.statusCode == 500) {
            $('.message-login').text("Tài khoản hoặc mật khẩu không chính xác")
        } else {
            localStorage.setItem('username', data.username);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('username', data.username);
            localStorage.setItem('roles', data.roles);
            window.location = "home.html";
        }
    } catch (error) {
        console.log("Error: ", error)
    }
})

$(".logout").click(function (event) {
    event.preventDefault()
    delete localStorage.username;
    delete localStorage.accessToken;
    delete localStorage.roles;
    window.location = "home.html";
})

$('.btn-signup').click(async (event) => {
    event.preventDefault()
    let username = $("#usernamesignup").val()
    let password = $("#passwordsignup").val()
    console.log(username + " and " + password)
    try {
        let response = await fetch(`http://localhost:3000/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password, roles: ["user"] }),
        })
        let data = await response.json()
        $('.message-signup').text(data.message)
    } catch (error) {
        console.log("Error: ", error)
    }
})
