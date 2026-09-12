let userTargets = JSON.parse(localStorage.getItem("fitness_targets")) || {
  cal: 1500,
  prot: 130,
  carb: 130,
  fat: 45,
};
document.getElementById("logDate").value = new Date()
  .toISOString()
  .split("T")[0];
let db = JSON.parse(localStorage.getItem("fitness_db")) || {};
let favoriteFoods = JSON.parse(localStorage.getItem("fitness_favorites")) || [
  {
    name: "My Post-Workout Shake",
    cal: 200,
    prot: 30,
    carb: 10,
    fat: 2,
    meal: "Snacks",
  },
];
let unlockedBadges = JSON.parse(localStorage.getItem("fitness_badges")) || [];

let calChartInstance = null;
let macroChartInstance = null;
let weightChartInstance = null;

const achievementsList = [
  // Streaks (1-10)
  { id: "first_log", title: "First Step", desc: "Log your very first meal entry", icon: "🌱" },
  { id: "streak_3", title: "Momentum Builder", desc: "Maintain a 3-day logging streak", icon: "🔥" },
  { id: "streak_7", title: "Habit Master", desc: "Maintain a 7-day logging streak", icon: "⭐" },
  { id: "streak_14", title: "Two-Week Titan", desc: "Maintain a 14-day logging streak", icon: "🗓️" },
  { id: "streak_21", title: "Habit Formed", desc: "Maintain a 21-day logging streak", icon: "⚡" },
  { id: "streak_30", title: "Monthly Machine", desc: "Maintain a 30-day logging streak", icon: "🛡️" },
  { id: "streak_60", title: "Two-Month Warrior", desc: "Maintain a 60-day logging streak", icon: "⚔️" },
  { id: "streak_90", title: "Quarter Century", desc: "Maintain a 90-day logging streak", icon: "🎖️" },
  { id: "streak_180", title: "Half-Year Hero", desc: "Maintain a 180-day logging streak", icon: "👑" },
  { id: "streak_365", title: "Year of Consistency", desc: "Maintain a 365-day logging streak", icon: "🏆" },

  // Protein & Nutrition Goals (11-20)
  { id: "protein_crusher", title: "Protein Crusher", desc: "Hit your daily protein target", icon: "💪" },
  { id: "protein_beast", title: "Protein Beast", desc: "Exceed 150g of protein in a single day", icon: "🥩" },
  { id: "protein_titan", title: "Protein Titan", desc: "Exceed 200g of protein in a single day", icon: "🦾" },
  { id: "macro_balanced", title: "Macro Balanced", desc: "Hit targets for Protein, Carbs, and Fat perfectly", icon: "🎯" },
  { id: "calorie_sniper", title: "Calorie Sniper", desc: "Hit target calories within a +/- 20 kcal margin", icon: "🎯" },
  { id: "clean_eater", title: "Clean Slate", desc: "Log 5 separate meal entries in one day", icon: "🥗" },
  { id: "favorite_creator", title: "Recipe Creator", desc: "Save your first custom meal as a favorite", icon: "⭐" },
  { id: "snack_master", title: "Smart Snacker", desc: "Log a healthy snack category entry", icon: "🍎" },
  { id: "carb_keeper", title: "Carb Controller", desc: "Keep total carbs under your carb cap limit", icon: "🍞" },
  { id: "fat_optimizer", title: "Fat Optimizer", desc: "Keep total fat under your fat cap limit", icon: "🥑" },

  // Hydration Milestones (21-25)
  { id: "water_start", title: "First Sip", desc: "Log your first water intake entry", icon: "💧" },
  { id: "water_goal", title: "Hydrated", desc: "Reach 2,500ml water intake in a day", icon: "🌊" },
  { id: "water_hydro", title: "Hydro Homie", desc: "Reach 3,500ml water intake in a day", icon: "🧊" },
  { id: "water_ocean", title: "Ocean Deep", desc: "Reach 5,000ml water intake in a day", icon: "🐳" },
  { id: "water_streak_3", title: "Aqua Consistent", desc: "Hit 2,500ml water intake for 3 consecutive days", icon: "💦" },

  // Weight & Body Comp (26-35)
  { id: "weight_logged", title: "Scale Tracker", desc: "Record your morning body weight", icon: "⚖️" },
  { id: "waist_logged", title: "Tape Measurer", desc: "Record your morning waist measurement", icon: "📏" },
  { id: "weight_loss_1", title: "First Drop", desc: "Lose your first 1 kg from initial record", icon: "📉" },
  { id: "weight_loss_3", title: "Making Progress", desc: "Lose 3 kg total from your initial weight", icon: "📉" },
  { id: "weight_loss_5", title: "Halfway There", desc: "Lose 5 kg total from your initial weight", icon: "📉" },
  { id: "weight_goal_hit", title: "Goal Weight Achieved", desc: "Reach your target weight window (63-65 kg)", icon: "🎯" },
  { id: "weight_stable", title: "Stable Weight", desc: "Record weight consistently for 7 days straight", icon: "📊" },
  { id: "body_metrics", title: "Data Driven", desc: "Log both weight and waist on the same day", icon: "📋" },
  { id: "weight_heavy_log", title: "Dedicated Weigh-In", desc: "Log 30 weight entries total", icon: "📈" },
  { id: "weight_century", title: "Scale Veteran", desc: "Log 100 weight entries total", icon: "🏅" },

  // Activity & Exercise (36-45)
  { id: "activity_first", title: "First Sweat", desc: "Log any workout or walking activity", icon: "👟" },
  { id: "distance_5km", title: "5K Crusher", desc: "Log a distance of 5 km or more in a day", icon: "🏃" },
  { id: "distance_10km", title: "10K Master", desc: "Log a distance of 10 km or more in a day", icon: "🏃‍♂️" },
  { id: "workout_logged", title: "Gym Goer", desc: "Log a structured workout session", icon: "🏋️" },
  { id: "walk_and_workout", title: "Dual Threat", desc: "Complete a 'Walk + Workout' activity day", icon: "🔥" },
  { id: "active_week", title: "Active Week", desc: "Log physical activity 5 days in a single week", icon: "🗓️" },
  { id: "rest_day_smart", title: "Smart Recovery", desc: "Log a formal 'Rest Day' activity entry", icon: "🧘" },
  { id: "cardio_king", title: "Cardio King", desc: "Log more than 60 minutes of duration", icon: "⏱️" },
  { id: "consistency_cardio", title: "Pacing Out", desc: "Log 10 total activity sessions", icon: "👟" },
  { id: "iron_pumper", title: "Iron Pumper", desc: "Log 30 total activity sessions", icon: "🦾" },

  // App Power User & Miscellaneous (46-50)
  { id: "backup_master", title: "Data Saver", desc: "Export your data backup JSON file", icon: "📥" },
  { id: "copycat_meals", title: "Time Saver", desc: 'Use the "Copy Yesterday\'s Meals" tool', icon: "📋" },
  { id: "tdee_calculator", title: "Math Whiz", desc: "Compute and apply personalized TDEE targets", icon: "✨" },
  { id: "century_meals", title: "Century Feeds", desc: "Log 100 individual food item entries total", icon: "🍔" },
  { id: "ultimate_master", title: "Dashboard Grandmaster", desc: "Unlock 40 out of 50 total achievements", icon: "🏆" }
];

function updateHeaderTargetsUI() {
  document.getElementById("headerTargets").innerText =
    `Target: ${userTargets.cal} kcal | ~${userTargets.prot}g Protein | Goal 63-65 kg`;
}

function openTargetModal() {
  document.getElementById("editCal").value = userTargets.cal;
  document.getElementById("editProt").value = userTargets.prot;
  document.getElementById("editCarb").value = userTargets.carb || 130;
  document.getElementById("editFat").value = userTargets.fat || 45;
  document.getElementById("targetModal").classList.add("active");
}

function closeTargetModal() {
  document.getElementById("targetModal").classList.remove("active");
}

function computeTDEE() {
  const age = parseFloat(document.getElementById("calcAge").value) || 25;
  const gender = document.getElementById("calcGender").value;
  const height = parseFloat(document.getElementById("calcHeight").value) || 170;
  const weight = parseFloat(document.getElementById("calcWt").value) || 70;
  const mult =
    parseFloat(document.getElementById("calcActivity").value) || 1.55;

  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === "male" ? bmr + 5 : bmr - 161;

  const tdee = Math.round(bmr * mult);
  const targetCal = Math.max(1200, tdee - 500);
  const targetProt = Math.round(weight * 2.0);

  document.getElementById("editCal").value = targetCal;
  document.getElementById("editProt").value = targetProt;
  document.getElementById("editCarb").value = Math.round((targetCal * 0.4) / 4);
  document.getElementById("editFat").value = Math.round((targetCal * 0.25) / 9);

  // Check achievement for using TDEE Calculator
  unlockBadge("tdee_calculator");

  alert(
    `Computed TDEE: ~${tdee} kcal/day. Suggested deficit target (${targetCal} kcal) applied!`,
  );
}

function saveTargets() {
  userTargets.cal =
    parseInt(document.getElementById("editCal").value) || userTargets.cal;
  userTargets.prot =
    parseInt(document.getElementById("editProt").value) || userTargets.prot;
  userTargets.carb = parseInt(document.getElementById("editCarb").value) || 130;
  userTargets.fat = parseInt(document.getElementById("editFat").value) || 45;

  localStorage.setItem("fitness_targets", JSON.stringify(userTargets));
  updateHeaderTargetsUI();
  updateDashboard();
  closeTargetModal();
}

function switchTab(tabId, btn) {
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".nav-item button")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");

  if (tabId === "analyticsTab") {
    renderAnalytics("week");
    renderHeatmap();
  } else if (tabId === "trophiesTab") {
    renderBadges();
  }
}

function getSelectedDate() {
  return document.getElementById("logDate").value;
}

function ensureDateExists(date) {
  if (!db[date])
    db[date] = {
      weight: null,
      waist: null,
      activityType: "",
      distance: null,
      duration: null,
      water: 0,
      foods: [],
    };
  if (db[date].water === undefined) db[date].water = 0;
}

function saveDB() {
  localStorage.setItem("fitness_db", JSON.stringify(db));
  checkAchievements();
  updateDashboard();
  renderHistory();
}

function loadDateData() {
  const date = getSelectedDate();
  ensureDateExists(date);
  const dayData = db[date];

  document.getElementById("weight").value =
    dayData.weight !== null ? dayData.weight : "";
  document.getElementById("waist").value =
    dayData.waist !== null ? dayData.waist : "";
  document.getElementById("activityType").value = dayData.activityType || "";
  document.getElementById("distance").value =
    dayData.distance !== null ? dayData.distance : "";
  document.getElementById("duration").value = dayData.duration || "";

  renderFoodList();
  updateWaterUI();
  updateDashboard();
}

function addWater(amount) {
  const date = getSelectedDate();
  ensureDateExists(date);
  db[date].water = Math.max(0, db[date].water + amount);
  if (db[date].water > 0) unlockBadge("water_start");
  saveDB();
  updateWaterUI();
}

function updateWaterUI() {
  const date = getSelectedDate();
  ensureDateExists(date);
  const currentWater = db[date].water || 0;
  const targetWater = 2500;
  document.getElementById("waterCountText").innerText =
    `${currentWater} / ${targetWater} ml`;
  document.getElementById("waterProgressFill").style.width =
    `${Math.min(100, Math.round((currentWater / targetWater) * 100))}%`;
}

function copyYesterdayMeals() {
  const currDateStr = getSelectedDate();
  const currDateObj = new Date(currDateStr);
  currDateObj.setDate(currDateObj.getDate() - 1);
  const yestStr = currDateObj.toISOString().split("T")[0];

  if (!db[yestStr] || !db[yestStr].foods || db[yestStr].foods.length === 0) {
    alert(`No meal records found for yesterday (${yestStr}) to copy.`);
    return;
  }

  ensureDateExists(currDateStr);
  if (
    db[currDateStr].foods.length > 0 &&
    !confirm(`Overwrite today's meals with yesterday's items?`)
  ) {
    return;
  }

  db[currDateStr].foods = JSON.parse(JSON.stringify(db[yestStr].foods));
  unlockBadge("copycat_meals");
  saveDB();
  renderFoodList();
  alert("Successfully copied yesterday's meals!");
}

function applyPresetFood() {
  const select = document.getElementById("presetSelect");
  if (!select.value) return;
  const item = JSON.parse(select.value);
  populateFoodInputs(item);
  select.selectedIndex = 0;
}

function applyFavoriteFood() {
  const select = document.getElementById("favoriteSelect");
  if (!select.value) return;
  const item = JSON.parse(select.value);
  populateFoodInputs(item);
  select.selectedIndex = 0;
}

function populateFoodInputs(item) {
  document.getElementById("foodName").value = item.name;
  document.getElementById("fCal").value = item.cal;
  document.getElementById("fProt").value = item.prot;
  document.getElementById("fCarb").value = item.carb;
  document.getElementById("fFat").value = item.fat;
  if (item.meal) document.getElementById("mealCategory").value = item.meal;
}

function renderFavoritesDropdown() {
  const select = document.getElementById("favoriteSelect");
  select.innerHTML =
    '<option value="" disabled selected>-- Select favorite --</option>';
  favoriteFoods.forEach((fav) => {
    const opt = document.createElement("option");
    opt.value = JSON.stringify(fav);
    opt.innerText = `${fav.name} (${fav.cal} kcal)`;
    select.appendChild(opt);
  });
}

function saveAsFavorite() {
  const name = document.getElementById("foodName").value.trim();
  const cal = parseInt(document.getElementById("fCal").value) || 0;
  const prot = parseInt(document.getElementById("fProt").value) || 0;
  const carb = parseInt(document.getElementById("fCarb").value) || 0;
  const fat = parseInt(document.getElementById("fFat").value) || 0;
  const meal = document.getElementById("mealCategory").value;

  if (!name || cal <= 0)
    return alert("Enter food name and calories before saving as a favorite.");

  const newFav = { name, cal, prot, carb, fat, meal };
  favoriteFoods.push(newFav);
  localStorage.setItem("fitness_favorites", JSON.stringify(favoriteFoods));
  unlockBadge("favorite_creator");
  renderFavoritesDropdown();
  alert(`Saved "${name}" to your Custom Favorites!`);
}

function addFoodItem() {
  const date = getSelectedDate();
  ensureDateExists(date);

  const name = document.getElementById("foodName").value.trim();
  const cal = parseInt(document.getElementById("fCal").value) || 0;
  const prot = parseInt(document.getElementById("fProt").value) || 0;
  const carb = parseInt(document.getElementById("fCarb").value) || 0;
  const fat = parseInt(document.getElementById("fFat").value) || 0;
  const meal = document.getElementById("mealCategory").value;

  if (!name || cal <= 0) return alert("Enter food name and calorie count.");

  db[date].foods.push({ name, cal, prot, carb, fat, meal });

  if (meal === "Snacks") unlockBadge("snack_master");

  document.getElementById("foodName").value = "";
  document.getElementById("fCal").value = "";
  document.getElementById("fProt").value = "";
  document.getElementById("fCarb").value = "";
  document.getElementById("fFat").value = "";

  saveDB();
  renderFoodList();
}

function deleteFoodItem(index) {
  const date = getSelectedDate();
  if (db[date] && db[date].foods) {
    db[date].foods.splice(index, 1);
    saveDB();
    renderFoodList();
  }
}

function renderFoodList() {
  const date = getSelectedDate();
  const containerEl = document.getElementById("foodItemsContainer");
  containerEl.innerHTML = "";

  if (!db[date] || db[date].foods.length === 0) {
    containerEl.innerHTML = `<p style="color:var(--text-muted); font-size:0.8rem; padding: 6px;">No foods logged for this date.</p>`;
    return;
  }

  ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach((cat) => {
    const catFoods = db[date].foods
      .map((item, originalIdx) => ({ ...item, originalIdx }))
      .filter((item) => (item.meal || "Lunch") === cat);

    if (catFoods.length > 0) {
      const groupDiv = document.createElement("div");
      groupDiv.className = "meal-group";

      const title = document.createElement("div");
      title.className = "meal-group-title";
      const badgeClass = `badge-${cat.toLowerCase()}`;
      title.innerHTML = `<span class="${badgeClass}">${cat}</span>`;
      groupDiv.appendChild(title);

      const ul = document.createElement("ul");
      ul.className = "food-list";

      catFoods.forEach((item) => {
        const li = document.createElement("li");
        li.className = "food-item";
        li.innerHTML = `
              <div class="food-info">
                <b>${item.name}</b>
                <span>${item.cal} kcal | P: ${item.prot}g | C: ${item.carb || 0}g | F: ${item.fat || 0}g</span>
              </div>
              <button class="delete-btn" onclick="deleteFoodItem(${item.originalIdx})">✕</button>
            `;
        ul.appendChild(li);
      });

      groupDiv.appendChild(ul);
      containerEl.appendChild(groupDiv);
    }
  });
}

function saveDayDetails() {
  const date = getSelectedDate();
  ensureDateExists(date);

  const wVal = parseFloat(document.getElementById("weight").value);
  const waistVal = parseFloat(document.getElementById("waist").value);
  const distVal = parseFloat(document.getElementById("distance").value);

  db[date].weight = !isNaN(wVal) ? wVal : null;
  db[date].waist = !isNaN(waistVal) ? waistVal : null;
  db[date].activityType = document.getElementById("activityType").value;
  db[date].distance = !isNaN(distVal) ? distVal : null;
  db[date].duration = document.getElementById("duration").value || null;

  if (!isNaN(wVal) && wVal > 0) unlockBadge("weight_logged");
  if (!isNaN(waistVal) && waistVal > 0) unlockBadge("waist_logged");
  if (!isNaN(wVal) && !isNaN(waistVal) && wVal > 0 && waistVal > 0)
    unlockBadge("body_metrics");
  if (db[date].activityType) unlockBadge("activity_first");
  if (db[date].activityType === "Workout") unlockBadge("workout_logged");
  if (db[date].activityType === "Walk + Workout")
    unlockBadge("walk_and_workout");
  if (db[date].activityType === "Rest Day") unlockBadge("rest_day_smart");
  if (!isNaN(distVal) && distVal >= 5) unlockBadge("distance_5km");
  if (!isNaN(distVal) && distVal >= 10) unlockBadge("distance_10km");

  saveDB();
  alert("Day activity saved!");
}

function getDayTotals(dayObj) {
  if (!dayObj || !dayObj.foods) return { cal: 0, prot: 0, carb: 0, fat: 0 };
  return dayObj.foods.reduce(
    (acc, f) => {
      acc.cal += f.cal;
      acc.prot += f.prot;
      acc.carb += f.carb || 0;
      acc.fat += f.fat || 0;
      return acc;
    },
    { cal: 0, prot: 0, carb: 0, fat: 0 },
  );
}

function calculateStreak() {
  let streak = 0;
  let checkDate = new Date();
  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    if (db[dateStr] && db[dateStr].foods && db[dateStr].foods.length > 0) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      if (streak === 0 && dateStr === new Date().toISOString().split("T")[0]) {
        checkDate.setDate(checkDate.getDate() - 1);
        const yestStr = checkDate.toISOString().split("T")[0];
        if (db[yestStr] && db[yestStr].foods && db[yestStr].foods.length > 0) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
      }
      break;
    }
  }
  return streak;
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }
}

function unlockBadge(badgeId) {
  if (!unlockedBadges.includes(badgeId)) {
    unlockedBadges.push(badgeId);
    const badgeMeta = achievementsList.find((b) => b.id === badgeId);
    if (badgeMeta) {
      alert(
        `🏆 Achievement Unlocked: ${badgeMeta.title}! Check the Achievements tab.`,
      );
    }
    localStorage.setItem("fitness_badges", JSON.stringify(unlockedBadges));
    triggerConfetti();
  }
}

function checkAchievements() {
  const currentStreak = calculateStreak();
  const todayStr = getSelectedDate();
  const todayTotals = getDayTotals(db[todayStr]);
  const hasLoggedAny = Object.values(db).some(
    (d) => d.foods && d.foods.length > 0,
  );

  // Streak checks
  if (hasLoggedAny) unlockBadge("first_log");
  if (currentStreak >= 3) unlockBadge("streak_3");
  if (currentStreak >= 7) unlockBadge("streak_7");
  if (currentStreak >= 14) unlockBadge("streak_14");
  if (currentStreak >= 21) unlockBadge("streak_21");
  if (currentStreak >= 30) unlockBadge("streak_30");
  if (currentStreak >= 60) unlockBadge("streak_60");
  if (currentStreak >= 90) unlockBadge("streak_90");
  if (currentStreak >= 180) unlockBadge("streak_180");
  if (currentStreak >= 365) unlockBadge("streak_365");

  // Nutrition & Macros checks
  if (todayTotals.prot >= userTargets.prot) unlockBadge("protein_crusher");
  if (todayTotals.prot >= 150) unlockBadge("protein_beast");
  if (todayTotals.prot >= 200) unlockBadge("protein_titan");
  if (
    todayTotals.prot >= userTargets.prot &&
    todayTotals.carb <= userTargets.carb &&
    todayTotals.fat <= userTargets.fat &&
    todayTotals.cal > 0
  )
    unlockBadge("macro_balanced");

  if (
    todayTotals.cal >= userTargets.cal - 20 &&
    todayTotals.cal <= userTargets.cal + 20
  )
    unlockBadge("calorie_sniper");

  if (db[todayStr] && db[todayStr].foods && db[todayStr].foods.length >= 5)
    unlockBadge("clean_eater");
  if (todayTotals.carb <= userTargets.carb && todayTotals.cal > 0)
    unlockBadge("carb_keeper");
  if (todayTotals.fat <= userTargets.fat && todayTotals.cal > 0)
    unlockBadge("fat_optimizer");

  // Hydration checks
  const water = db[todayStr]?.water || 0;
  if (water >= 2500) unlockBadge("water_goal");
  if (water >= 3500) unlockBadge("water_hydro");
  if (water >= 5000) unlockBadge("water_ocean");

  // Total food items count check
  let totalFoodEntries = 0;
  Object.values(db).forEach((d) => {
    if (d.foods) totalFoodEntries += d.foods.length;
  });
  if (totalFoodEntries >= 100) unlockBadge("century_meals");

  // Weight entries count check
  let totalWeightEntries = Object.values(db).filter(
    (d) => d.weight !== null && d.weight > 0,
  ).length;
  if (totalWeightEntries >= 30) unlockBadge("weight_heavy_log");
  if (totalWeightEntries >= 100) unlockBadge("weight_century");

  // Grandmaster check (unlocking 40+)
  if (unlockedBadges.length >= 40) unlockBadge("ultimate_master");
}

function renderBadges() {
  const container = document.getElementById("badgesContainer");
  container.innerHTML = "";
  let unlockedCount = 0;

  achievementsList.forEach((badge) => {
    const isUnlocked = unlockedBadges.includes(badge.id);
    if (isUnlocked) unlockedCount++;

    const card = document.createElement("div");
    card.className = `badge-card ${isUnlocked ? "unlocked" : ""}`;
    card.innerHTML = `
          <div class="badge-icon">${badge.icon}</div>
          <div class="badge-info">
            <h4>${badge.title}</h4>
            <p>${badge.desc}</p>
            <span style="font-size: 0.7rem; color: ${isUnlocked ? "var(--success)" : "var(--text-muted)"}; margin-top: 4px; display: block;">
              ${isUnlocked ? "Unlocked ✓" : "Locked"}
            </span>
          </div>
        `;
    container.appendChild(card);
  });

  document.getElementById("badgeCounterText").innerText =
    `${unlockedCount} / ${achievementsList.length} Unlocked`;
}

function renderHeatmap() {
  const container = document.getElementById("activityHeatmap");
  container.innerHTML = "";

  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const isLogged =
      db[dateStr] && db[dateStr].foods && db[dateStr].foods.length > 0;

    const cell = document.createElement("div");
    cell.className = `heatmap-cell ${isLogged ? "logged" : ""}`;
    cell.innerText = d.getDate();
    cell.title = `${dateStr}: ${isLogged ? "Logged" : "No logs"}`;
    container.appendChild(cell);
  }
}

function updateDashboard() {
  const todayStr = getSelectedDate();
  const todayTotals = getDayTotals(db[todayStr]);
  const currentStreak = calculateStreak();

  document.getElementById("streak-num").innerText = `${currentStreak} Days`;
  document.getElementById("streak-sub").innerText =
    currentStreak > 0 ? `Active logging streak!` : `Log meals today to start!`;

  document.getElementById("today-cal").innerText = `${todayTotals.cal} kcal`;
  document.getElementById("cal-progress-fill").style.width =
    `${Math.min(100, Math.round((todayTotals.cal / userTargets.cal) * 100))}%`;

  const pTarget = userTargets.prot || 130;
  const cTarget = userTargets.carb || 130;
  const fTarget = userTargets.fat || 45;

  document.getElementById("label-prot").innerText =
    `${todayTotals.prot}/${pTarget}g`;
  document.getElementById("label-carb").innerText =
    `${todayTotals.carb}/${cTarget}g`;
  document.getElementById("label-fat").innerText =
    `${todayTotals.fat}/${fTarget}g`;

  document.getElementById("prot-fill").style.width =
    `${Math.min(100, Math.round((todayTotals.prot / pTarget) * 100))}%`;
  document.getElementById("carb-fill").style.width =
    `${Math.min(100, Math.round((todayTotals.carb / cTarget) * 100))}%`;
  document.getElementById("fat-fill").style.width =
    `${Math.min(100, Math.round((todayTotals.fat / fTarget) * 100))}%`;

  const alertBox = document.getElementById("targetAlert");
  const alertTitle = document.getElementById("alertTitle");
  const alertDesc = document.getElementById("alertDesc");

  const calDiff = userTargets.cal - todayTotals.cal;
  const protDiff = pTarget - todayTotals.prot;

  if (todayTotals.cal === 0) {
    alertBox.className = "alert-banner state-red";
    alertTitle.innerText = "🧠 AI Coach: No Food Logged Today";
    alertDesc.innerText = `Target is ${userTargets.cal} kcal & ${pTarget}g protein. Log your meals to track progress!`;
  } else if (calDiff > 400) {
    alertBox.className = "alert-banner state-yellow";
    alertTitle.innerText = `🧠 AI Coach: Large Deficit (Short by ${calDiff} kcal)`;
    alertDesc.innerText = `Consider adding a protein shake or light meal to reach your target safely.`;
  } else {
    alertBox.className = "alert-banner state-green";
    alertTitle.innerText = "🧠 AI Coach: Target Achieved!";
    alertDesc.innerText = `Great consistency! You've logged ${todayTotals.cal} kcal and ${todayTotals.prot}g protein today.`;
  }

  const dates = Object.keys(db).sort((a, b) => new Date(b) - new Date(a));
  const weights = dates
    .map((d) => db[d].weight)
    .filter((w) => w !== null && w > 0);

  if (weights.length > 0) {
    const last7 = weights.slice(0, 7);
    const avg = last7.reduce((a, b) => a + b, 0) / last7.length;
    document.getElementById("week-wt").innerText = `${avg.toFixed(1)} kg`;
    document.getElementById("weight-trend").innerText =
      `Latest: ${weights[0].toFixed(1)} kg`;
  } else {
    document.getElementById("week-wt").innerText = `-- kg`;
  }

  let sumCal = 0,
    count = 0;
  dates.slice(0, 7).forEach((d) => {
    const t = getDayTotals(db[d]);
    if (t.cal > 0) {
      sumCal += t.cal;
      count++;
    }
  });

  if (count > 0) {
    const avgCal = Math.round(sumCal / count);
    document.getElementById("week-cal").innerText = `${avgCal} kcal`;
    document.getElementById("weekly-deficit").innerText =
      `Est. Deficit: ~${Math.max(0, 2000 - avgCal) * count} kcal/wk`;
  }
}

function renderAnalytics(range, btn) {
  if (btn) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  const dates = Object.keys(db).sort((a, b) => new Date(a) - new Date(b));
  let labels = [];
  let caloriesData = [];
  let weightData = [];
  let totalP = 0,
    totalC = 0,
    totalF = 0;

  let limit = 7;
  if (range === "day") limit = 1;
  else if (range === "week") limit = 7;
  else if (range === "month") limit = 30;
  else if (range === "year") limit = 365;

  const filteredDates =
    range === "day" ? [getSelectedDate()] : dates.slice(-limit);

  filteredDates.forEach((d) => {
    labels.push(d);
    const t = getDayTotals(db[d]);
    caloriesData.push(t.cal);
    weightData.push(db[d] && db[d].weight ? db[d].weight : null);

    totalP += t.prot;
    totalC += t.carb;
    totalF += t.fat;
  });

  const commonTooltipOptions = {
    backgroundColor: "#1d1e2e",
    titleColor: "#f8fafc",
    bodyColor: "#8e95ad",
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    padding: 10,
    boxPadding: 4,
    usePointStyle: true,
  };

  const ctxCal = document.getElementById("calorieChart").getContext("2d");
  if (calChartInstance) calChartInstance.destroy();

  const gradCal = ctxCal.createLinearGradient(0, 0, 0, 250);
  gradCal.addColorStop(0, "rgba(99, 102, 241, 0.4)");
  gradCal.addColorStop(1, "rgba(99, 102, 241, 0.0)");

  calChartInstance = new Chart(ctxCal, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Calories (kcal)",
          data: caloriesData,
          borderColor: "#6366f1",
          backgroundColor: gradCal,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#6366f1",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: commonTooltipOptions },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8e95ad" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8e95ad" },
        },
      },
    },
  });

  const ctxWt = document.getElementById("weightChart").getContext("2d");
  if (weightChartInstance) weightChartInstance.destroy();

  const gradWt = ctxWt.createLinearGradient(0, 0, 0, 250);
  gradWt.addColorStop(0, "rgba(0, 210, 211, 0.4)");
  gradWt.addColorStop(1, "rgba(0, 210, 211, 0.0)");

  weightChartInstance = new Chart(ctxWt, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Weight (kg)",
          data: weightData,
          borderColor: "#00d2d3",
          backgroundColor: gradWt,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          spanGaps: true,
          pointBackgroundColor: "#00d2d3",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: commonTooltipOptions },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8e95ad" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.05)" },
          ticks: { color: "#8e95ad" },
        },
      },
    },
  });

  const ctxDonut = document.getElementById("macroDonutChart").getContext("2d");
  if (macroChartInstance) macroChartInstance.destroy();

  macroChartInstance = new Chart(ctxDonut, {
    type: "doughnut",
    data: {
      labels: ["Protein (g)", "Carbs (g)", "Fat (g)"],
      datasets: [
        {
          data: [totalP, totalC, totalF],
          backgroundColor: ["#e056fd", "#00d2d3", "#ff9f43"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#8e95ad", font: { family: "Plus Jakarta Sans" } },
        },
        tooltip: commonTooltipOptions,
      },
      cutout: "70%",
    },
  });
}

function openMealDetailModal(date) {
  document.getElementById("mealModalTitle").innerText = `Meals for ${date}`;
  const contentEl = document.getElementById("mealModalContent");
  contentEl.innerHTML = "";

  if (!db[date] || !db[date].foods || db[date].foods.length === 0) {
    contentEl.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No foods logged for this date.</p>`;
  } else {
    ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach((cat) => {
      const catFoods = db[date].foods.filter(
        (item) => (item.meal || "Lunch") === cat,
      );
      if (catFoods.length > 0) {
        const groupDiv = document.createElement("div");
        groupDiv.className = "meal-group";
        groupDiv.innerHTML = `<div class="meal-group-title"><span class="badge-${cat.toLowerCase()}">${cat}</span></div>`;

        const ul = document.createElement("ul");
        ul.className = "food-list";
        catFoods.forEach((item) => {
          const li = document.createElement("li");
          li.className = "food-item";
          li.innerHTML = `<div class="food-info"><b>${item.name}</b><span>${item.cal} kcal | P: ${item.prot}g | C: ${item.carb || 0}g | F: ${item.fat || 0}g</span></div>`;
          ul.appendChild(li);
        });
        groupDiv.appendChild(ul);
        contentEl.appendChild(groupDiv);
      }
    });
  }

  document.getElementById("mealDetailModal").classList.add("active");
}

function closeMealDetailModal() {
  document.getElementById("mealDetailModal").classList.remove("active");
}

function renderHistory() {
  const tbody = document.getElementById("historyBody");
  tbody.innerHTML = "";

  const dates = Object.keys(db).sort((a, b) => new Date(b) - new Date(a));
  if (dates.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--text-muted)">No history available.</td></tr>`;
    return;
  }

  dates.forEach((d) => {
    const day = db[d];
    const t = getDayTotals(day);

    let actText = day.activityType || "--";
    if (day.distance) actText += ` (${day.distance}km)`;

    const tr = document.createElement("tr");
    tr.innerHTML = `
          <td><b>${d}</b></td>
          <td>${day.weight ? day.weight.toFixed(1) + " kg" : "--"}</td>
          <td><b>${t.cal}</b></td>
          <td><span style="color:var(--accent-protein); font-weight:600;">${t.prot}p</span> / <span style="color:var(--accent-carbs); font-weight:600;">${t.carb}c</span> / <span style="color:var(--accent-fat); font-weight:600;">${t.fat}f</span></td>
          <td>${actText}</td>
          <td><button class="btn-target" onclick="openMealDetailModal('${d}')">👁️ View Meals (${day.foods ? day.foods.length : 0})</button></td>
          <td><button class="delete-btn" onclick="deleteDateRecord('${d}')">✕</button></td>
        `;
    tbody.appendChild(tr);
  });
}

function deleteDateRecord(date) {
  if (confirm(`Delete history entry for ${date}?`)) {
    delete db[date];
    saveDB();
    loadDateData();
  }
}

function exportData() {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db));
  const anchor = document.createElement("a");
  anchor.setAttribute("href", dataStr);
  anchor.setAttribute(
    "download",
    `fitness_backup_${new Date().toISOString().split("T")[0]}.json`,
  );
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  unlockBadge("backup_master");
}

function importData(event) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      db = JSON.parse(e.target.result);
      saveDB();
      loadDateData();
      alert("Data restored!");
    } catch (err) {
      alert("Invalid JSON payload.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

updateHeaderTargetsUI();
renderFavoritesDropdown();
loadDateData();
renderHistory();
checkAchievements();