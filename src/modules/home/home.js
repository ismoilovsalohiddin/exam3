const BASE_URL = "http://localhost:8080"
fetch(`${BASE_URL}/posts`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then((res) => {
    if(res.ok){
        return res.json()
    }
})
.then((data) => {
    data.forEach(post => render(post))
})
// async function getPosts(){
//     const response = await fetch(`${BASE_URL}/posts`,{
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     const posts = await response.json()
//     posts.forEach(post => render(post))
// }

// getPosts()

const userData = localStorage.getItem("userData")
const user = JSON.parse(userData)
const elUserAvatar = document.querySelector(".header__user-avatar").textContent = user?.user?.name.slice(0, 2).toUpperCase()

const elList = document.querySelector(".main__list")
const template = document.querySelector(".template").content
function render (post){
    const clonedList = template.cloneNode(true)
    clonedList.querySelector('.post').id = post.id
    clonedList.querySelector('.post__img').src = post.image
    clonedList.querySelector('.post__text-title').innerHTML = post.title
    clonedList.querySelector('.post__text-boby').innerHTML = post.body
    clonedList.querySelector('.post__info-date-day').textContent = post.created_at
    if(post.user?.name && post.user?.surname){
        clonedList.querySelector('.post__author-name').textContent = post?.user?.name + ' ' + post?.user?.surname
    }else{
        clonedList.querySelector('.post__author-name').textContent = post?.user?.name
    }
    clonedList.querySelector('.post__author-view-count').textContent = post.views || 0
    elList.append(clonedList)
}

if(!localStorage.getItem("userData")){
    location.pathname = "/src/modules/login/index.html"
}