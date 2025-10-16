const holidays = [
  {name: "New Year's Day", month:1, day:1, theme:"newyear", desc:"Celebrate the start of a new year!"},
  {name: "Valentine's Day", month:2, day:14, theme:"valentine", desc:"A day for love and friendship."},
  {name: "St. Patrick's Day", month:3, day:17, theme:"fun", desc:"Celebrate Irish culture and luck!"},
  {name: "April Fool's Day", month:4, day:1, theme:"fun", desc:"Lighthearted pranks and jokes."},
  {name: "Easter", month:4, day:21, theme:"easter", desc:"Celebrate rebirth and new beginnings."},
  {name: "Mother's Day", month:5, day:12, theme:"fun", desc:"Honor mothers and motherhood."},
  {name: "Memorial Day", month:5, day:27, theme:"fun", desc:"Remember fallen soldiers."},
  {name: "Father's Day", month:6, day:16, theme:"fun", desc:"Celebrate fathers and fatherhood."},
  {name: "Independence Day", month:7, day:4, theme:"fun", desc:"Fireworks and American independence."},
  {name: "National Ice Cream Day", month:7, day:21, theme:"fun", desc:"Enjoy a sweet treat!"},
  {name: "Labor Day", month:9, day:2, theme:"fun", desc:"Celebrate workers and achievements."},
  {name: "Rosh Hashanah", month:9, day:16, theme:"fun", desc:"Jewish New Year."},
  {name: "Halloween", month:10, day:31, theme:"halloween", desc:"Spooky fun and costumes."},
  {name: "Diwali", month:11, day:12, theme:"fun", desc:"Festival of lights."},
  {name: "Thanksgiving", month:11, day:28, theme:"fun", desc:"Give thanks with a feast."},
  {name: "Hanukkah", month:12, day:7, theme:"fun", desc:"Jewish festival of lights."},
  {name: "Christmas", month:12, day:25, theme:"christmas", desc:"Celebrate joy, family, and giving."},
  {name: "Boxing Day", month:12, day:26, theme:"fun", desc:"Holiday after Christmas."},
  {name: "Chinese New Year", month:2, day:10, theme:"fun", desc:"Lunar New Year celebration."},
  {name: "National Pizza Day", month:2, day:9, theme:"fun", desc:"Celebrate everyone's favorite cheesy delight."},
  {name: "Good Friday", month:3, day:29, theme:"fun", desc:"Christian holiday commemorating Jesus' crucifixion."},
  {name: "Martin Luther King Jr. Day", month:1, day:20, theme:"fun", desc:"Honor the life and legacy of Dr. MLK."}
];

const dashboard = document.getElementById("dashboard");
const popup = document.getElementById("holidayPopup");
const closePopup = document.getElementById("closePopup");
const popupTitle = document.getElementById("popupTitle");
const popupDate = document.getElementById("popupDate");
const popupCountdown = document.getElementById("popupCountdown");
const popupDesc = document.getElementById("popupDescription");
const search = document.getElementById("search");

function getNextDate(h) {
  const now = new Date();
  let year = now.getFullYear();
  let date = new Date(year, h.month-1, h.day);
  if (date < now) date = new Date(year+1, h.month-1, h.day);
  return date;
}

function formatCountdown(ms) {
  const days = Math.floor(ms/(1000*60*60*24));
  const hours = Math.floor((ms/(1000*60*60))%24);
  const minutes = Math.floor((ms/(1000*60))%60);
  const seconds = Math.floor((ms/1000)%60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function renderDashboard() {
  dashboard.innerHTML = "";
  const now = new Date();
  let filtered = holidays.filter(h => h.name.toLowerCase().includes(search.value.toLowerCase()));
  filtered.sort((a,b)=> getNextDate(a)-getNextDate(b));

  filtered.forEach(h=>{
    const next = getNextDate(h);
    const diff = next - now;
    const card = document.createElement("div");
    card.className="card";
    card.innerHTML = `<h3>${h.name}</h3><p>${formatCountdown(diff)}</p>`;
    card.onclick = ()=>openPopup(h);
    dashboard.appendChild(card);
  });
}

function openPopup(h) {
  popup.classList.remove("hidden");
  popupTitle.textContent = h.name;
  popupDate.textContent = "Date: " + getNextDate(h).toDateString();
  popupCountdown.textContent = formatCountdown(getNextDate(h)-new Date());
  popupDesc.textContent = h.desc;
  popup.querySelector(".popup-content").className = "popup-content theme-" + h.theme;
}

closePopup.onclick = ()=>popup.classList.add("hidden");
window.onclick = e=>{if(e.target==popup) popup.classList.add("hidden");};
search.oninput = renderDashboard;

renderDashboard();
setInterval(renderDashboard,1000);
