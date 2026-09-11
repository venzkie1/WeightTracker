Fitness, Weight & Food Logger
A lightweight, dark-themed web application designed to help users track daily weight, physical activity, food intake, and macronutrient distribution with real-time feedback, gamified milestones, and deficit alerts.

Tech Stack
Frontend: HTML5, CSS3 (Custom Dark Mode UI / Flexbox & Grid), Vanilla JavaScript (ES6+)

Libraries / Assets: Chart.js (Analytics curves & donut charts), Canvas Confetti (Milestone celebrations)

State Management & Storage: LocalStorage (Client-side persistence)

Data Interchange: JSON (Export / Import Backup System)

Key Features
1. Header Analytics & Real-Time Alerts
Goal & TDEE Configuration: Customizable daily calorie and macronutrient targets, complete with an automated TDEE calculator.

7-Day Trend Tracking: Automatically calculates 7-day weight averages, weekly caloric averages, and estimated weekly deficits.

Macro Split Bars: Visual progress indicators for Protein, Carbs, and Fat consumption.

Smart AI Coach Alerts: Dynamic status cards giving real-time feedback on your daily caloric progress and protein intake.

2. Daily Logger Tab
Body & Workout Tracking: Log daily weight (kg), waist measurements, workout type, distance, and duration.

Meal Logging & Copying: Group food items by meal category (Breakfast, Lunch, Dinner, Snacks) with a quick-copy tool to duplicate yesterday's meals.

Staples & Custom Favorites: Quick-add dropdown for standard items as well as custom-saved favorite foods.

Water Intake Tracker: Dedicated daily hydration tracker with quick-add volume buttons.

Live Macro Calculation: Instant calorie and macronutrient updates upon adding or removing food entries.

3. Statistics & Analytics Tab
Interactive Charts: Visual curves for Caloric Intake Trends, Macronutrient Split Ratios, and Weight Progression (kg) powered by Chart.js.

30-Day Consistency Heatmap: A GitHub-style activity grid visualizing your active logging consistency over the past month.

4. Achievements & Trophies Tab
Gamified Milestones: Earn badges and unlock trophies for hitting streaks (3-day, 7-day), logging your first meal, tracking weight, hitting protein goals, and staying hydrated.

Celebration Effects: Automated confetti bursts and alert banners fired instantly upon unlocking new achievements.

5. History Log Tab
Archival Table: Consolidated history view showing past dates, weight trend, total calories, macro split (P/C/F), and logged activity.

Meal Details Modal: Clickable "View Meals" breakdown popup showing itemized food entries for any recorded date.

Data Portability (JSON Export/Import): Complete data backup and restore via standard JSON payloads for seamless data transfer and offline backups.