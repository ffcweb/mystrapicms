

// Fetch and display all blog posts from the Strapi API using a flat structure 
// and generate excerpts from the description blocks.

document.addEventListener("DOMContentLoaded", () => {
  const blogList = document.getElementById("blog-list");

  fetch("https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?populate=*")
    .then((res) => res.json())
    .then((data) => {
      const blogs = data.data;

      if (!blogs || blogs.length === 0) {
        blogList.innerHTML = "<p>No blog posts available.</p>";
        return;
      }

      blogs.forEach((blogObj) => {
        const blog = blogObj; // Flat structure

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
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      blogList.innerHTML = "<p>Error loading blogs. Please try again later.</p>";
    });
});

function generateExcerpt(descriptionBlocks) {
  if (!descriptionBlocks || !Array.isArray(descriptionBlocks)) return "";
  const text = descriptionBlocks
    .map((block) => block.children.map((child) => child.text).join(" "))
    .join(" ");
  return text.length > 120 ? text.slice(0, 80) + "..." : text;
}
