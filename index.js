const contestants = document.querySelector(".con");
const scale = document.querySelector(".scale");
const leader = document.querySelector(".leader");
const body = document.querySelector("body");
const avVotes = document.querySelector(".av");
const mainView = document.querySelector(".view");
const select = document.querySelector("#housemate");
const manualVotes = document.querySelector("#range");

// house mate data
const data = [
  {
    name: "Dorathy",
    image: "./assets/image2.png",
    votes: 0,
    id: 0,
  },
  {
    name: "Nengi",
    image: "./assets/nengi.jpg",
    votes: 0,
    id: 1,
  },
  {
    name: "Erica",
    image: "./assets/erica.jpg",
    votes: 0,
    id: 2,
  },
  {
    name: "Laycon",
    image: "./assets/laycon.png",
    votes: 0,
    id: 3,
  },
  {
    name: "Tolani ",
    image: "./assets/tolani.jpg",
    votes: 0,
    id: 4,
  },
  {
    name: "Kiddwaya",
    image: "./assets/kidd.png",
    votes: 0,
    id: 5,
  },
];

let availableVotes = 100;
let percentage = availableVotes;
let housemate = "";
let range = 0;

// main function displaying vote ui
function main() {
  const allContestants = data
    .map((each) => {
      return `<div class="card md:flex lg:flex flex-wrap md:p-2 lg:p-2 text-center my-2 shadow-lg border-t-2 border-blue-700 rounded py-2 ${each.name} ">
      <div class="img text-center lg:m-auto  lg:w-24 lg:flex lg:justify-center lg:items-center">
        <img
          src="${each.image}"
          alt="Dorathy"
          class="rounded-full w-12 h-12 m-auto lg:w-20 lg:h-20 img "
        />
      </div>
      <div class="lg:text-center lg:m-auto">
        <h2 class="text-gray-700 p-2 font-bold text-lg">${each.name}</h2>
        <div class="shadown-lg w-full m-auto flex justify-center">
          <p
            class=" dec border-2 py-1 px-6 py-2 cursor-pointer font-bold text-gray-900"
        
          >
            -
          </p>
          <p class="text-gray-900 font-bold border-2 px-8 py-2 votes">0

          </p>
          <p
            class=" inc border-2 py-1 px-6 py-2 cursor-pointer font-bold text-gray-900"

          >
            +
          </p>
        </div>
      </div>
      
    </div>`;
    })
    .join("");

  contestants.innerHTML = allContestants;
}
main();

// button dexrementing vote
const decrement = document.querySelectorAll(".dec");
decrement.forEach((node) => {
  node.addEventListener("click", () => {
    if (percentage >= 100) {
      return;
    }
    data.map((ele, idx) => {
      let parent = node.parentElement;
      let grand = parent.parentElement;
      let great = grand.parentElement;
      if (great.classList.contains(ele.name)) {
        let votes = great.querySelector(".votes");
        if (ele.votes <= 0) {
          return;
        }
        votes.innerHTML = ele.votes = ele.votes - 1;

        percentage = percentage + 1;
        scale.style.width = percentage + "%";
        avVotes.innerHTML = percentage;
      }
    });
  });
});

// button incrementing vote
const incremant = document.querySelectorAll(".inc");
incremant.forEach((node, idx) => {
  node.addEventListener("click", () => {
    if (percentage <= 0) {
      const warn = document.querySelectorAll(".warn");
      warn[idx].classList.remove("show");

      setTimeout(() => {
        warn[idx].classList.add("show");
      }, 3000);
      return;
    }
    data.map((ele, idx) => {
      let parent = node.parentElement;
      let grand = parent.parentElement;
      let great = grand.parentElement;
      if (great.classList.contains(ele.name)) {
        let votes = great.querySelector(".votes");
        votes.innerHTML = ele.votes = ele.votes + 1;

        percentage = percentage - 1;
        scale.style.width = percentage + "%";
        avVotes.innerHTML = percentage;
      }
    });
  });
});

// leaders board
const sorted = () => {
  const whoEvicted = document.querySelector(".lea");
  const evict = document.querySelector(".evicted");
  const leads = data
    .sort((a, b) => a.votes - b.votes)
    .map((each) => {
      return `
      <div
      class="flex flex-wrap  justify-between mt-6 shadow-lg border-t-2 border-blue-800 rounded p-4"
    >
      <div class="flex justify-center items-center">
        <img src="${each.image}" alt="Erica.png"  class="rounded-full w-12 h-12 m-auto lg:w-20 lg:h-20 img "/>
        <span class="text-blue-900 font-bold mt-1 mx-2">${each.name}</span>
      </div>

      <div
        class="flex justify-center items-center mx-4 mt-2 items-center w-12 h-12 rounded-full bg-blue-800 text-white font-bold"
      >
        ${each.votes}
      </div>
      
    </div>`;
    })
    .join("");

  whoEvicted.innerHTML = leads;
  let lastPerson = data.sort((a, b) => a.votes - b.votes)[0];
  evict.innerHTML = lastPerson.name;
};

// displaying leders board
const leadersBlock = document.querySelector(".leads");
leader.addEventListener("click", () => {
  leadersBlock.classList.remove("show");
  mainView.classList.add("show");

  sorted();
});

// displaying main ui view
document.querySelector(".btn").addEventListener("click", () => {
  leadersBlock.classList.add("show");
  mainView.classList.remove("show");
});

// user select
select.addEventListener("input", () => {
  housemate = select.value;
});

// user vote manual input
manualVotes.addEventListener("input", () => {
  document.querySelector(".input_select").innerHTML = manualVotes.value;
  range = manualVotes.value;
});

console.log(housemate, range);

document.querySelector(".btn_vote").addEventListener("click", () => {
  if (!housemate) return;
  const filtered = data.filter((each) => {
    if (each.name === housemate) {
      if (percentage < 0) return;
      let picked = (each.votes = Number(each.votes + range));
      let hm = document.querySelector(`.${housemate}`);
      let child = hm.querySelector(".votes");
      percentage = percentage - picked;

      child.innerHTML = picked;

      scale.style.width = percentage + "%";
      avVotes.innerHTML = percentage;
    }
    return each;
  });
});
