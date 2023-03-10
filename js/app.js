import sublinks from "./data.js"

const toggleBtn = document.querySelector(".toggle-btn")
const closeBtn = document.querySelector(".close-btn")
const sidebarWrapper = document.querySelector(".sidebar-wrapper")
const sidebar = document.querySelector(".sidebar-links")
const linkBtns = [...document.querySelectorAll(".link-btn")]
const submenu = document.querySelector(".submenu")
const hero = document.querySelector(".hero")
const nav = document.querySelector(".nav")

// hide/show sidebar
toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show")
})
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show")
})
sidebar.innerHTML = sublinks
  .map((item) => {
    const { links, page } = item
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map((link) => {
      return `<a href="${link.url}">
        <i class='${link.icon}'></i>${link.label}
        </a>`
    })
    .join("")}
    </div>
    </article>`
  })
  .join("")
linkBtns.forEach((btn) => {
  btn.addEventListener("mouseover", function (e) {
    const text = e.currentTarget.textContent
    const tempPage = sublinks.find(({ page }) => page === text)
    const tempBtn = e.currentTarget.getBoundingClientRect()

    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom - 3
    if (tempPage) {
      const { links, page } = tempPage
      submenu.style.left = `${center}px`
      submenu.style.top = `${bottom}px`
      submenu.classList.add("show")
      let columns = `col-${links.length}`
      if (links.length >= 4) columns = `col-4`

      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class ="submenu-center ${columns}">
      ${links
        .map((link) => {
          return `<a href="${link.url}">
        <i class='${link.icon}'></i>${link.label}
        </a>`
        })
        .join("")}

      </div>
      </section>
      `
    }
  })
})
hero.addEventListener("mouseover", (e) => {
  submenu.classList.remove("show")
})
nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link-btn")) submenu.classList.remove("show")
})
