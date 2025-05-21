// src/utils/generateTOC.js
// Generates a nested TOC with Tailwind & daisyUI styling
export function generateTOC(items) {
  // Build a nested tree
  const root = { title: null, children: {} };

  for (const { params: { title, slug } } of items) {
    const parts = slug.split('/');
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      if (!node.children[key]) {
        node.children[key] = { title: null, slug: parts.slice(0, i + 1).join('/'), children: {} };
      }
      node = node.children[key];
    }
    node.title = title;
  }

  // Recursive render
  function render(node, level) {
    const hasChildren = Object.keys(node.children).length > 0;
    // Level 1: root wrapper
    if (level === 0) {
      return Object.values(node.children).map(child => render(child, 1)).join('');
    }

    // H1 items (level 1)
    if (level === 1) {
      const childrenHtml = hasChildren
        ? `<ul class="pl-4">
${Object.values(node.children).map(c => render(c, 2)).join('')}
</ul>`
        : '';
      return `  <li class="mb-2">
    <h2 class="menu-title text-lg">${node.title}</h2>
    ${childrenHtml}
  </li>`;
    }

    // Levels 2+ use details dropdown
    const childrenList = hasChildren
      ? `<ul class="pl-4 mt-1">
${Object.values(node.children).map(c => render(c, level + 1)).join('')}
</ul>`
      : '';

    if (hasChildren) {
      return `    <li>
      <details class="my-1">
        <summary class="cursor-pointer font-medium">${node.title}</summary>
${childrenList}
      </details>
    </li>`;
    }

    // Leaf nodes
    return `<li class="mt-1"><a class="hover:underline" href="/${node.slug}">${node.title}</a></li>`;
  }

  return render(root, 0);
}
