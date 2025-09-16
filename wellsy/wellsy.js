document.getElementById("wellsyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const advices = [];
  const data = new FormData(this);

 
  const sleep = data.get("sleep");
  if (sleep === "1" || sleep === "2") {
    advices.push("Try to get 7–9 hours of sleep to feel more rested.");
  }

  
  if (data.get("water") === "0") {
    advices.push("Drink more water today to stay hydrated.");
  }

 
  if (data.get("exercise") === "0") {
    advices.push("A short walk or some stretching can boost your energy.");
  }

 
  if (data.get("relax") === "0") {
    advices.push("Take a few minutes to relax or meditate to reduce stress.");
  }


  if (data.get("breaks") === "0") {
    advices.push("Remember to take short breaks from screens.");
  }

 
  if (data.get("fun") === "0") {
    advices.push("Do something fun or creative to lift your mood.");
  }

  
  if (data.get("connect") === "0") {
    advices.push("Try reaching out to a friend or family member.");
  }

  if (data.get("stress") === "high") {
    advices.push("Practice deep breathing or light exercise to ease stress.");
  }

  if (advices.length === 0) {
    advices.push("Great job! Keep maintaining these healthy habits. 🌟");
  }

  document.getElementById("result").innerHTML =
    "<h3>Your personalized advice:</h3><ul>" +
    advices.map(a => `<li>${a}</li>`).join("") +
    "</ul>";
});
