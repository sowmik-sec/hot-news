const loadCategories = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/categories`
  );
  const data = await res.json();
  displayCategories(data.data.news_category);
  //displayCategories(data);
  // .then((res) => res.json())
  // .then((data) => displayCategories(data.data.news_category))
  // .catch((error) => {
  //   console.log(error);
  // });
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
  fetch(
    `https://openapi.programming-hero.com/api/news/category/${
      "0" + category_id
    }`
  )
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data))
    .catch((error) => {
      console.log(error);
    });
};

const displayNewsCategory = (data) => {
  const newList = document.getElementById("show-news");
  newList.innerHTML = ``;
  data.forEach((item) => {
    console.log(item);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class='d-flex justify-content-between mb-5'>
            <div>
                <img height='244' src='${item.image_url}'>
            </div>
            <div class='p-2 ms-2 d-flex flex-column justify-content-between'>
                <div class='mb-2'>
                    <h4>${item.title}</h4>
                    <p>${item.details.slice(0, 250) + "..."}</p>
                </div>
                
                <div class='d-flex justify-content-between'>
                    <div class='d-flex'>
                        <div>
                            <img width='40' height='40' style='border-radius:50%' src='${
                              item.author ? item.author.img : "Not Available"
                            }'>
                        </div>
                        <div class='ms-2'>
                            ${item.author ? item.author.name : "Not Available"}
                            ${
                              item.author.published_date
                                ? item.author.published_date
                                : "Not Available"
                            }
                        </div>
                    </div>
                    <div>
                        <p>${
                          item.total_view ? item.total_view : "Not Available"
                        }</p>
                    </div>
                    <div>
                        <p>${item.rating.number}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    newList.appendChild(newsDiv);
  });
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
