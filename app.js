console.log("app.js is loaded");
let data;
const dropdownEl = d3.select("#dropdown");
const infoEl = d3.select("#info");

d3.json("./MOCK_DATA.json").then((response) => {
  data = response;
  //   console.log(data);
  populateDropdown();
});

function populateDropdown() {
  const ids = data.map((obj) => obj.id);

  //   for (const id of ids) {
  //     dropdownEl.append("option").text(`id ${id}`).property("value", id);
  //   }

  // for (let i = 0; i < ids.length; i++) {
  //   const id = ids[i];
  //   dropdownEl.append("option").text(`id ${id}`).property("value", id);
  // }

  ids.forEach((id) => {
    dropdownEl.append("option").text(`id ${id}`).property("value", id);
  });
  onDropdownChange(ids[0]);
  //   console.log(ids);
}

function onDropdownChange(selectedId) {
  //   console.log(selectedId);
  populateInfo(selectedId);
  createCharts(selectedId);
}

function populateInfo(id) {
  const currentInfo = data.find((obj) => obj.id == id);

  infoEl.html("");
  infoEl.append("h4").text(`ID: ${currentInfo.id}`);
  infoEl
    .append("h4")
    .text(`NAME: ${currentInfo.first_name} ${currentInfo.last_name}`);
  infoEl.append("h4").text(`EMAIL: ${currentInfo.email}`);
}

function createCharts(id) {
  const currentInfo = data.find((obj) => obj.id == id);
  const y = currentInfo.data.map((obj) => Math.ceil(Math.random() * 100));
  const x = currentInfo.data.map(
    (obj) => `marker ${Math.ceil(Math.random() * 100)}`
  );
  console.log(x);

  var barData = [
    {
      x: x,
      y: y,
      type: "bar",
    },
  ];

  Plotly.newPlot("bar", barData);
}
