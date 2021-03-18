let addToy = false;
const toyCollection = document.getElementById("toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  fetchToys()
})

function fetchToys() {
  const toyUrl = "http://localhost:3000/toys"
  fetch(toyUrl)
  .then(resp => resp.json())
  .then(result => eachToy(result))
}

function eachToy(toys) {
  
  toys.forEach(toy => renderToys(toy))
  // console.log(toys)
}

function renderToys(toy) {
  // console.log(toy)
  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.setAttribute('src', toy.image)
  img.setAttribute("class", "toy-avatar")

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement("div")
  divCard.setAttribute("class", "card")
  divCard.append(h2, img, p, btn)
  toyCollection.append(divCard)
}

function postToy(newToy) {
  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      "name": newToy.name.value,
      "image": newToy.image.value,
      "likes": 0
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    renderToys(object)
  })
}

function likes(e) {
  e.preventDefault()
  // console.log(e)

  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      "likes": more
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then((newLike => {
    e.target.previousElementSibling.innerText = `${more} likes`
  }))
}