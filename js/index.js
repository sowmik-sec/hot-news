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
  newsCategory.innerHTML = ``;
  //console.log(categories);
  categories.forEach((category) => {
    const catDiv = document.createElement("div");
    // new nav start

    // new nav end
    // previous nav start
    catDiv.innerHTML = `<button id='${
      category.category_name
    }' onclick='clickHandleNews(${category.category_id}, "${
      category.category_name
    }", ${JSON.stringify(categories)})' class='btn fs-5'>${
      category.category_name
    }</button>`;
    // previous nav end
    //console.log(category);
    newsCategory.appendChild(catDiv);
  });
};

const clickHandleNews = (category_id, newsCategoryName, categories) => {
  //console.log(newsId);
  //console.log(categories);
  displayCategories(categories);
  document.getElementById(newsCategoryName).style.color = "blue";
  //document.getElementById(newsId).classList.add("active");
  loadNewsCategory(category_id, newsCategoryName);
};

const loadNewsCategory = (category_id, newsCategoryName) => {
  document.getElementById("spinner").classList.remove("d-none");

  fetch(
    `https://openapi.programming-hero.com/api/news/category/${
      "0" + category_id
    }`
  )
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data, newsCategoryName))
    .catch((error) => {
      console.log(error);
    });
};

loadNewsCategory(8);

const sortNews = (data, sortId) => {
  //const sortId = document.getElementById(sortId);
  //if (sortId === "high-low") {
  if (sortId === "high-low") {
    document.getElementById("default-id").innerText = "View(High to Low)";
  } else {
    document.getElementById("default-id").innerText = "View(Low to High)";
  }

  data.sort((x, y) => {
    if (x.total_view == null) {
      x.total_view = 0;
    }
    if (y.total_view == null) {
      y.total_view = 0;
    }
    if (
      parseInt(x.total_view) > parseInt(y.total_view) &&
      sortId === "high-low"
    ) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log("inside sort function");
  return data;
  //}
};

document.getElementById("high-low").addEventListener("click", function () {
  data = sortNews(data, "high-low");
});
document.getElementById("low-high").addEventListener("click", function () {
  data = sortNews(data, "low-high");
});

const displayNewsCategory = (data, newsCategoryName) => {
  document.getElementById("spinner").classList.add("d-none");
  const newList = document.getElementById("show-news");
  const itemCount = document.getElementById("item-count");
  itemCount.style.backgroundColor = "white";
  itemCount.classList.add("text-center");
  itemCount.classList.add("fs-4");
  itemCount.classList.add("py-2");
  itemCount.innerHTML = ``;
  itemCount.innerHTML = `<p>${data.length}  items found for category ${
    newsCategoryName ? newsCategoryName : "All Category"
  }</p>`;
  newList.innerHTML = ``;
  //console.log("fuck");
  data = sortNews(data, "high-low");

  //   data.sort((x, y) => {
  //     //console.log(x.total_view, y.total_view);
  //     if (x.total_view == null) {
  //       x.total_view = 0;
  //     }
  //     if (y.total_view == null) {
  //       y.total_view = 0;
  //     }
  //     if (parseInt(x.total_view) > parseInt(y.total_view)) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  data.forEach((item) => {
    //console.log(item);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
        <div class='d-flex justify-content-lg-between flex-lg-row flex-column mb-5 bg-white p-3 rounded'>
            <div>
                <img height='244' width='350' src='${item.image_url}'>
            </div>
            <div class='p-2 ms-2 d-flex flex-column justify-content-between'>
                <div class='mb-2'>
                    <h4>${item.title}</h4>
                    <p>${item.details.slice(0, 250) + "..."}</p>
                </div>
                
                <div class='d-flex justify-content-between align-items-center'>
                    <div class='d-flex'>
                        <div>
                            <img class='mt-1' width='40' height='40' style='border-radius:50%' src='${
                              item.author ? item.author.img : "Not Available"
                            }'>
                        </div>
                        <div class='ms-2'>
                            <p class='mb-0'>${
                              item.author ? item.author.name : "Not Available"
                            }</p>
                            <p class='mb-0'>${
                              item.author.published_date
                                ? item.author.published_date
                                : "Not Available"
                            }</p>
                            
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
                    <div>
                    <button onclick="handleShowDetail('${
                      item._id
                    }')" id='btn-show-detail' class='btn' data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                    
                    </div>
                </div>
            </div>
        </div>
    `;
    newList.appendChild(newsDiv);
  });
};

const handleShowDetail = (id) => {
  //   console.log(id);
  fetch(` https://openapi.programming-hero.com/api/news/${id}`)
    .then((res) => res.json())
    .then((data) => displaySingleNews(data.data[0]));
};

const displaySingleNews = (data) => {
  //console.log(data.title);
  document.getElementById("title-news").innerText = data.title;
  document.getElementById("main-news").innerText = data.details;
};

document.getElementById("blog").addEventListener("click", function () {
  document.getElementById("blog").style.color = "blue";
  document.getElementById("news").style.color = "black";
  document.getElementById("blog-section").classList.remove("d-none");
  document.getElementById("news-section").classList.add("d-none");
});

document.getElementById("news").addEventListener("click", function () {
  document.getElementById("blog").style.color = "black";
  document.getElementById("news").style.color = "blue";

  document.getElementById("blog-section").classList.add("d-none");
  document.getElementById("news-section").classList.remove("d-none");
});

loadCategories();
