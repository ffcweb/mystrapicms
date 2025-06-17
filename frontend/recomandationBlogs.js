function renderRecommendedPosts(currentDocId) {
  fetch("https://intuitive-excitement-a83f64758d.strapiapp.com/api/blogs?populate=*")
    .then(res => res.json())
    .then(data => {
      const blogs = data.data;

      // Filter out the current blog
      const recommended = blogs.filter(b => b.documentId !== currentDocId).slice(0, 3); // 3 recommendations

      const container = document.getElementById("recommended-posts");
      container.innerHTML = "";

      recommended.forEach(blog => {
        const title = blog.Title || "Untitled";
        const imageUrl = blog.image?.formats?.small?.url || blog.image?.url || "";
        const docId = blog.documentId;
        const readMoreLink = `blogdetail.html?doc=${docId}`;

        const card = document.createElement("div");
        card.className = "recommended-card";
        card.innerHTML = `
          ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ""}
          <h4>${title}</h4>
          <div class="card-footer">
            <a href="${readMoreLink}">Read More</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Failed to load recommended posts:", err);
    });
}
