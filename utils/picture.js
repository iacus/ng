// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (url, alt = "Missing alt text",picClass,lazy = false) => {
    if (lazy !== 'lazy') {
      return `<picture class="${picClass}">
      <img src="/images/${url}" alt="${alt}" />
    </picture>`;
  } else {
    return `<picture>
      <img src="/images/${url}" alt="${alt}" />
  </picture>`;
  }
  
  };
  