
const apiUrl = "https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs";

// Convert rich text description array to plain text
function getPlainText(descriptionArray) {
  if (!descriptionArray || !Array.isArray(descriptionArray)) return "";
  // Combine all children texts from all blocks
  return descriptionArray
    .map(block =>
      block.children.map(child => child.text).join("")
    )
    .join("\n");
}

async function fetchBlogs() {
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    const blogs = json.data;

    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = ""; // Clear loading text

    if (blogs.length === 0) {
      blogList.innerHTML = "<p>No blogs found.</p>";
      return;
    }

    blogs.forEach(blog => {
      const title = blog.Title || blog.attributes?.Title || "Untitled";
      const description = getPlainText(blog.description || blog.attributes?.description);

      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
  <h3>${title}</h3>
  <p>${description.substring(0, 200)}...</p>
  `;
      blogList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
    document.getElementById("blog-list").innerHTML = "<p>Error loading blogs.</p>";
  }
}

fetchBlogs();

