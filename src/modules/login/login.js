const BASE_URL = "http://localhost:8080"

const elForm = document.querySelector(".form")
const elInputUsername = document.querySelector(".form__username-input")
const elInputPassword = document.querySelector(".form__password-input")

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
    if(username && password){
        fetch(`${BASE_URL}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
        })
        .then((data) => {
                if(!data.message){
                    localStorage.setItem("userData",JSON.stringify(data))
                    navigate("/src/modules/home/index.html")
                }
        })
        // .catch((err) => {
        //     console.log(err)
        // })
    }
})

