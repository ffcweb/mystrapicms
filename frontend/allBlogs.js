const blogList = document.getElementById("blog-list");
const paginationWrapper = document.getElementById("pagination");

let currentPage = 1;
const pageSize = 6;

document.addEventListener("DOMContentLoaded", () => {
  loadBlogs(currentPage);
});

function loadBlogs(page) {
  blogList.innerHTML = "<p>Loading...</p>";
  paginationWrapper.innerHTML = "";

  const url = `https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const blogs = data.data;
      const pagination = data.meta.pagination;
      blogList.innerHTML = "";

      blogs.forEach((blog) => {
        const card = document.createElement("div");
        card.className = "blog-card";

        const img = document.createElement("img");
        img.src = blog.image?.url || "fallback.jpg";
        img.alt = blog.Title || "Blog image";

        const title = document.createElement("h3");
        title.textContent = blog.Title || "Untitled";

        const excerpt = document.createElement("p");
        excerpt.className = "excerpt";
        excerpt.textContent = generateExcerpt(blog.description);

        const readMore = document.createElement("a");
        readMore.href = `blogdetail.html?doc=${blog.documentId}`;
        readMore.className = "read-more";
        readMore.textContent = "Read More →";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(excerpt);
        card.appendChild(readMore);

        blogList.appendChild(card);
      });

      createPaginationControls(pagination.page, pagination.pageCount);
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      blogList.innerHTML = "<p>Error loading blogs. Please try again later.</p>";
    });
}

function createPaginationControls(current, total) {
  const container = document.createElement("div");
  container.className = "pagination-controls";

  // Prev Button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "← Prev";
  prevBtn.disabled = current === 1;
  prevBtn.onclick = () => {
    if (current > 1) {
      currentPage--;
      loadBlogs(currentPage);
    }
  };
  container.appendChild(prevBtn);

  // Page Numbers
  for (let i = 1; i <= total; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = i === current ? "active-page" : "";
    pageBtn.onclick = () => {
      currentPage = i;
      loadBlogs(currentPage);
    };
    container.appendChild(pageBtn);
  }

  // Next Button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next →";
  nextBtn.disabled = current === total;
  nextBtn.onclick = () => {
    if (current < total) {
      currentPage++;
      loadBlogs(currentPage);
    }
  };
  container.appendChild(nextBtn);

  paginationWrapper.appendChild(container);
}

function generateExcerpt(descriptionBlocks) {
  if (!descriptionBlocks || !Array.isArray(descriptionBlocks)) return "";
  const text = descriptionBlocks
    .map((block) => block.children.map((child) => child.text).join(" "))
    .join(" ");
  return text.length > 120 ? text.slice(0, 80) + "..." : text;
}
