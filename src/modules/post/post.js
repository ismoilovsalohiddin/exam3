const BASE_URL = "http://localhost:8080"

function navigate(path){
    location.pathname = path
}

if(!localStorage.getItem("userData")){
    navigate("/src/modules/login/index.html")
}
const elForm = document.querySelector(".post-form")
const elIputTitle = document.querySelector(".post-form__input-title")
const elIputBody = document.querySelector(".post-form__input-body")

const userData = localStorage.getItem("userData")
const user = JSON.parse(userData)
const elUserAvatar = document.querySelector(".header__user-avatar").textContent = user?.user?.name.slice(0, 2).toUpperCase()
console.log(user.user.name)
elForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const title = elIputTitle.value.trim()
    const body = elIputBody.value.trim()
    if(title && body){
        fetch(`${BASE_URL}/posts`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: user.user.id,
                viuw: 0,
                image:'https://picsum.photos/360/300/?random',
                id: Date.now(),
                created_at: new Date().toLocaleDateString(),
                user:{
                    name: user.user.name,
                }
            })
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            }
        })
        .then((data) => {
            if(!data.message){
                navigate("/src/modules/home/index.html")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
})