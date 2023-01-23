// Generate an picture tag with image src URLs which use Neltify image transforms

module.exports = (url, alt = "Missing alt text",picClass,lazy = false) => {
    if (lazy !== 'lazy') {
      return `<picture class=" ojete ${picClass}">
      <img src="/images/${url}" alt="${alt}" />
    </picture>`;
  } else {
    return `<picture class=="calor">
      <img src="/images/${url}" alt="${alt}" />
  </picture>`;
  }
  
  };
  