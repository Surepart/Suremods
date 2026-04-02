


//drop down logic
const logo = document.getElementById("logoBtn");
const dropdown = document.getElementById("dropdownMenu");

logo.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
});

document.addEventListener("click", (e) => {
    const isClickInsidePanel = dropdown.contains(e.target);
    const isClickOnLogo = logo.contains(e.target);

    if (!isClickInsidePanel && !isClickOnLogo) {
        dropdown.classList.remove("show");
    }
});




//tags

function filterProjects(tag) {
    const items = document.querySelectorAll(".projects-link");

    items.forEach(item => {
        const tags = item.dataset.tags;

        if (!tags) return;

        if (tag === "all") {
            item.style.display = "";
            return;
        }

        const tagList = tags
            .toLowerCase()
            .split(",")
            .map(t => t.trim());

        item.style.display = tagList.includes(tag.toLowerCase())
            ? ""
            : "none";
    });
}
function getTag() {
    const params = new URLSearchParams(window.location.search);
    return params.get("tag") || "all";
}

//feed
const projects = [
    {
        link: "projects/project1.html",
        img: "res/images/projects/project1/e.png",
        title: "Emino Mod (SurvivalCraft 2.1)",
        tags: "survivalcraftt"
    },
    {
        link: "projects/project12.html",
        img: "res/images/projects/project1/e.png",
        title: "Test Project",
        tags: "survivalcraftt"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "Test Project",
        tags: "mod"
    },
     {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 1",
        tags: "mod"
    },
     {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MCPE",
        tags: "MCPE, mod"
    },

    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "survivalcraft",
        tags: "survivalcraftt,mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 2",
        tags: "mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 3",
        tags: "mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 4",
        tags: "mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 5",
        tags: "mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 6",
        tags: "mod"
    },
    {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 7",
        tags: "mod"
    },
     {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 8",
        tags: "mod"
    },
     {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 9",
        tags: "mod"
    },
     {
        link: "projects/project13.html",
        img: "res/images/projects/project1/e.png",
        title: "MODS 10",
        tags: "mod"
    }
];


function getPage() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page")) || 1;
}

const pageSize = 6;

function renderProjects() {
    const grid = document.querySelector(".projects-grid");
    grid.innerHTML = "";

    const page = getPage();
    const tag = getTag();

    let filtered = projects;

    if (tag !== "all") {
        filtered = projects.filter(p =>
            p.tags.toLowerCase().split(",").includes(tag.toLowerCase())
        );
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const items = filtered.slice(start, end);
    


    items.forEach(p => {
        const el = document.createElement("a");
        el.href = p.link;
        el.className = "projects-link";
        el.setAttribute("data-tags", p.tags);

        el.innerHTML = `
            <div class="projects-item">
                <img src="${p.img}">
                <p>${p.title}</p>
            </div>
        `;

        grid.appendChild(el);
    });
}

renderProjects();

document.getElementById("nextBtn").addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);

    const page = parseInt(params.get("page")) || 1;
    params.set("page", page + 1);

    window.location.search = params.toString();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);

    const page = parseInt(params.get("page")) || 1;
    if (page > 1) {
        params.set("page", page - 1);
        window.location.search = params.toString();
    }
});

function setTag(tag) {
    const params = new URLSearchParams(window.location.search);
    params.set("tag", tag);
    params.set("page", 1); // reset page when filtering
    window.location.search = params.toString();
}