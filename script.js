document.addEventListener("DOMContentLoaded", function () {
  fetch('https://repo-tech2edge.github.io/tasks/sample.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched data:', data);

      // Update carousel indicators and items
      const carouselIndicators = document.querySelector('.carousel-indicators');
      const carouselInner = document.querySelector('.carousel-inner');

      data.episodes.forEach((episode, index) => {
        // Create indicators
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.className = index === 0 ? 'active' : '';
        indicator.ariaLabel = `Slide ${index + 1}`;
        if (index === 0) indicator.ariaCurrent = 'true';
        carouselIndicators.appendChild(indicator);

        // Create carousel items
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        const img = document.createElement('img');
        img.src = episode.img;
        img.className = 'd-block w-100';
        img.alt = episode.title || 'No title';
        const caption = document.createElement('div');
        caption.className = 'carousel-caption d-none d-md-block';
        caption.innerHTML = `
          <h5>${episode.title || 'No title'}</h5>
          <p>${episode.description || 'No description available'}</p>
          <button type="button" class="btn btn-danger">Resume</button>
          <button type="button" class="btn btn-light">+ My List</button>
        `;
        item.appendChild(img);
        item.appendChild(caption);
        carouselInner.appendChild(item);
      });

      // Update API data cards
      const apiDataContainer = document.getElementById('apiData');
      data.characters.forEach(item => {
        const imageUrl = item.img;
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-logo" style="background-image: url('https://example.com/logo.png');"></div>
          <img src="${imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Age: ${item.age}</p>
            <p class="card-text">Profession: ${item.profession}</p>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imageModal" onclick="showImage('${imageUrl}', '${item.name}')">View Image</button>
          </div>
        `;
        apiDataContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

function showDescription() {
  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc.style.display === "none") {
    heroDesc.style.display = "block";
  } else {
    heroDesc.style.display = "none";
  }
}

function showImage(imageSrc, imageAlt) {
  document.getElementById('modalImage').src = imageSrc;
  document.getElementById('modalImage').alt = imageAlt;
  document.getElementById('imageModalLabel').textContent = imageAlt;
}

function scrollLeft() {
  const container = document.querySelector('.horizontal-scroll');
  container.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

function scrollRight() {
  const container = document.querySelector('.horizontal-scroll');
  container.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}