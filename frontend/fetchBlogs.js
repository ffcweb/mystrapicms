const apiUrl = "https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?populate=*";

function getPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map(block => block.children?.map(child => child.text).join(" ") || "")
    .join(" ");
}

async function fetchBlogs() {
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    const blogs = json.data;

    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = "";

    // blogs.forEach(blog => {
    blogs.slice(0, 2).forEach(blog => {
      const readMoreLink = `blogdetail.html?doc=${blog.documentId}`;

      const title = blog.Title || "Untitled";
      const description = getPlainText(blog.description) || "No description.";
      const date = blog.Published || blog.publishedAt || blog.createdAt || null;

      const formattedDate = date
        ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        : "No date";

      const imageUrl = blog.image?.formats?.small?.url || blog.image?.url || null;

      const card = document.createElement("div");
      card.className = "blog-post";

      card.innerHTML = `
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width:100%; border-radius: 5px;">` : ""}
        <h3>${title}</h3>
        <small>Published: ${formattedDate}</small>
        <p>${description.substring(0, 120)}...</p>
        <a href="${readMoreLink}" class="read-more-btn btn">Read More</a>
      `;

      blogList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
    document.getElementById("blog-list").innerHTML = "<p>Error loading blogs.</p>";
  }
}

fetchBlogs();
