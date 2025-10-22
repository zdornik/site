
  let currentPage = location.pathname.split('/').pop();
  if (currentPage === "") {
    currentPage = "index.html";
  }
  let links = document.querySelectorAll("a.item");
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    let href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("current", "page");
    }
  }


