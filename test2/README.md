# Conference webpage README

Overview:
This web application showcases six different operational scenarios with animated visualizations. Each scenario includes playback controls for the animations, allowing users to play, pause, and scrub through the timeline. The animations illustrate various aspects of a command center operation including data flow, sensor monitoring, and alert systems.

# Installation & Setup:

1. Clone this repository
2. Ensure you have the required files in the correct directories
3. Ensure that you can use TailwindCLI
4. Run TailwindCLI using "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch"
5. Open index.html in a web browser or deploy to a web server

# Features:

Six different operational scenarios with Lottie animations
Interactive playback controls for each animation
Play/pause toggle
Progress bar with draggable scrubber
Time display showing current position and total duration
Responsive design for various screen sizes
Touch support for mobile devices

# Scenarios Displayed:

Scenario 1: Data from sensors transiting back to command center (Nexus)
Scenario 2: ATAK Clients communicating through ATAK Server in Command Center
Scenario 3: Command Center monitors all sensors, and alerts all subscribed clients
Scenario 4: An alert is sent to users when a specific license plate is recognized
Scenario 5: When vibration is detected, users are alerted and can stream video from nearby camera
Scenario 6: When a node leaves the mesh, devices can reconnect to another nearby node to ensure connectivity
