// app.js
import { loadPage } from "./firebase.js";

const components = {
  Hero: (p) => `
    <section class="p-10 text-center">
      <h1 class="text-4xl font-bold">${p.title}</h1>
      <p class="text-gray-500 mt-2">${p.subtitle}</p>
    </section>
  `,

  ComplaintForm: () => `
    <section class="p-6 max-w-xl mx-auto">
      <input class="border p-2 w-full mb-2" placeholder="หัวข้อ" />
      <textarea class="border p-2 w-full mb-2" placeholder="รายละเอียด"></textarea>
      <button class="bg-blue-600 text-white px-4 py-2">
        ส่งเรื่อง
      </button>
    </section>
  `
};

async function render() {
  const pageId = document.body.dataset.page;
  const page = await loadPage(pageId);
  const root = document.getElementById("app");

  page.sections.forEach(sec => {
    root.insertAdjacentHTML(
      "beforeend",
      components[sec.type](sec.props)
    );
  });
}

render();
