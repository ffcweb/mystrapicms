
const apiUrl = "https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?populate=*";

// Helper to convert rich text blocks to plain text
function getPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map(block => block.children?.map(child => child.text).join(" ") || "")
    .join("\n");
}

async function fetchBlogs() {
  try {
    const response = await fetch(apiUrl);
    const json = await response.json();
    const blogs = json.data;

    const blogList = document.getElementById("blog-list");
    blogList.innerHTML = "";

    blogs.forEach(blog => {
      const title = blog.Title || "Untitled";
      const description = getPlainText(blog.description) || "No description.";
      const date = blog.date || blog.createdAt || "No date";

      // Correct image URL path based on your API response
      const imageUrl = blog.image?.url || null;

      const card = document.createElement("div");
      card.className = "blog-post";

      card.innerHTML = `
          ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width:100%; border-radius: 5px;">` : ""}
          <h3>${title}</h3>
          <small>Published: ${new Date(date).toLocaleDateString()}</small>
          <p>${description.substring(0, 70)}...</p>
        `;

      blogList.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading blogs:", error);
    document.getElementById("blog-list").innerHTML = "<p>Error loading blogs.</p>";
  }
}

fetchBlogs();