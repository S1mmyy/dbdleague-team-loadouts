// load killer data from file
let killerData;
async function getKillerData()
{
  let data = await fetch("json/killerData.json");
  data = await data.text();
  data = JSON.parse(data).data;
  return data;
}
killerData = await getKillerData();

let killerSelectElement = document.getElementById("killerSelect");
function populateKillerList()
{
  for (let i = 0; i < killerData.length; i++)
  {
    let killerOption = document.createElement("option");
    killerOption.textContent = "The " + killerData[i].character;
    killerOption.value = "The " + killerData[i].character;
    killerSelectElement.appendChild(killerOption);
  }
}
populateKillerList();

killerSelectElement.onchange = function updateKillerImage()
{
  // filter the killer data to get the link of the selected one
  let killerObj = killerData.filter(obj => {
    return ("The " + obj.character) == killerSelectElement.value;
  });
  let killerImgLink = killerObj[0].characterImage;

  document.getElementById("killerImg").src = killerImgLink;
}

// define drag events
let listBoxElements = document.getElementsByClassName("perkBox");
for (let i = 0; i < listBoxElements.length; i++)
{
  listBoxElements[i].addEventListener("dragover", dragover_handler);
  listBoxElements[i].addEventListener("drop", drop_handler);
}
let perkImgElements = document.getElementsByClassName("perkImg");
for (let i = 0; i < perkImgElements.length; i++)
{
  perkImgElements[i].addEventListener("dragstart", drag_handler);
}

function dragover_handler(ev)
{
  ev.preventDefault();
}

function drop_handler(ev)
{
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function drag_handler(ev)
{
  ev.dataTransfer.setData("text", ev.target.id);
}