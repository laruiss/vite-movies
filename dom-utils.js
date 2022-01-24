export const $ce = (tag) => document.createElement(tag);


export const $h = (htmlPart) => {
  // 1
  const div = document.createElement("div");
  // 2
  div.innerHTML = htmlPart;
  // 3
  return div.firstElementChild;
};

export const $ = selector => document.querySelector(selector)
export const $$ = selector => document.querySelectorAll(selector)
