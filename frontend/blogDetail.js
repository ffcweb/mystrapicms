const params = new URLSearchParams(window.location.search);
const docId = params.get('doc');

if (!docId) {
  document.body.innerHTML = "<p>Blog not found.</p>";
} else {
  fetch(`https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?filters[documentId][$eq]=${docId}&populate=*`)
    .then(res => res.json())
    .then(data => {
      const blog = data.data[0];
      if (blog) {
        renderBlog(blog);
      } else {
        document.body.innerHTML = "<p>Blog not found.</p>";
      }
    })
    .catch(err => {
      console.error("Failed to load blog:", err);
      document.body.innerHTML = "<p>Error loading blog.</p>";
    });
}

// Function to render the blog content
/**
 * Renders the blog content in the specified container.
 * @param {Object} blog - The blog object containing the details to display.
 */

function renderBlog(blog) {
  document.title = blog.Title;

  const container = document.getElementById("blog-detail");
  container.innerHTML = ""; // Clear previous content if any

  const title = document.createElement("h1");
  title.textContent = blog.Title;

  const img = document.createElement("img");
  img.src = blog.image?.url || "";
  img.alt = blog.Title;

  const content = document.createElement("div");
  blog.description.forEach(para => {
    const p = document.createElement("p");
    p.textContent = para.children.map(child => child.text).join("");
    content.appendChild(p);
  });


  // Function to render (to call)recommended posts
  renderRecommendedPosts(blog.documentId);


  container.append(title, img, content);
}
