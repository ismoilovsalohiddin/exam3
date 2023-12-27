const BASE_URL = "http://localhost:8080"
const elForm = document.querySelector(".form")
const elInputUsername = document.querySelector(".form__username-input")
const elInputPassword = document.querySelector(".form__password-input")
const elInputEmail = document.querySelector(".form-email-input")
const elInputName = document.querySelector(".form-name-input")

function navigate(path){
    location.pathname = path
}

if(localStorage.getItem("userData")){
    navigate("/src/modules/home/index.html")
}

elForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const username = elInputUsername.value.trim()
    const password = elInputPassword.value.trim()
    const email = elInputEmail.value.trim()
    const name = elInputName.value.trim()
    if(username && password && email && name){
        fetch(`${BASE_URL}/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                name: name,
                username: username,
                password: password,
            })
        })
        .then((res) => {
            if(!res.ok){
                return res.json()
            }
        })
        .then((data) => {
            if(!data.message){
                localStorage.setItem("userData",JSON.stringify(data))
                location.pathname = "/src/modules/home/index.html"
            }else{
                navigate("/src/modules/login/index.html")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
})