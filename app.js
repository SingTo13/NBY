import { loadSite } from "./firebase.js";

const components = {
  Hero: ({ title, subtitle }) => `
    <section class="p-10 text-center">
      <h1 class="text-4xl font-bold">${title}</h1>
      <p class="text-gray-600 mt-2">${subtitle}</p>
    </section>
  `,
  TopicGrid: ({ columns }) => `
    <section class="p-10 grid gap-4"
      style="grid-template-columns: repeat(${columns}, 1fr)">
      <div class="border p-4">ตัวอย่างหัวข้อ</div>
      <div class="border p-4">ตัวอย่างหัวข้อ</div>
      <div class="border p-4">ตัวอย่างหัวข้อ</div>
    </section>
  `
};

async function render() {
  const site = await loadSite();
  const root = document.getElementById("app");

  site.pages.home.sections.forEach(sec => {
    const html = components[sec.type](sec.props);
    root.insertAdjacentHTML("beforeend", html);
  });

  document.documentElement.style.setProperty(
    "--primary",
    site.theme.primary
  );
}

render();
