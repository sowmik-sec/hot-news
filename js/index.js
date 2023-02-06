const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

const displayCategories = (categories) => {
  const newsCategory = document.getElementById("category");

  categories.forEach((category) => {
    const catDiv = document.createElement("div");
    //catDiv.innerHTML = `<a onclick='clickHandlerNews()' class="text-decoration-none text-dark fs-5 me-3" href="">${category.category_name}</a>`;
    catDiv.innerHTML = `<button onclick='clickHandleNews(${category.category_id})' class='btn fs-5'>${category.category_name}</button>`;
    //console.log(category);
    newsCategory.appendChild(catDiv);
  });
};

const clickHandleNews = (category_id) => {
  console.log(category_id);
  loadNewsCategory(category_id);
};

const loadNewsCategory = (category_id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data));
};

const displayNewsCategory = (data) => {
  console.log(data);
};

document.getElementById("blog").addEventListener("click", function () {
  document.getElementById("blog-section").classList.remove("d-none");
  document.getElementById("news-section").classList.add("d-none");
});

document.getElementById("news").addEventListener("click", function () {
  document.getElementById("blog-section").classList.add("d-none");
  document.getElementById("news-section").classList.remove("d-none");
});

loadCategories();
