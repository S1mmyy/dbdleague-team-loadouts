let killerData;
async function getKillerData()
{
  let data = await fetch("../killerData.json");
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