# Particle Accelerator

# Particle Project

## How to Get This App Running

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed on your machine. Then, install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the application using the following command:
   ```bash
   npm start
   ```

   The app should now be running on `http://localhost:3000` by default. You can
   set a different port by defining the `PORT` environment variable before
   running the command.

## Description

Particle Project is an interactive particle simulation web application. Users can customize various parameters to observe how particles behave in real-time.

## Features

- Adjust particle count, speed, size, transparency, colors, and falloff.
- Save, load, and reset settings.

## Contact

For any questions or suggestions, please open an issue or contact the maintainer.

## More Detailed Overview

The Particle Accelerator project is an interactive particle simulation tool that allows users to adjust various parameters to see how they affect the behavior of particles on a canvas. The application provides a user-friendly interface for customizing the simulation and saving/loading these configurations.

## Detailed Features List

### 1. Adjustable Parameters
- **Min Speed**: Controls the minimum speed of particles.
- **Max Speed**: Controls the maximum speed of particles.
- **Min Size**: Controls the minimum size of particles.
- **Max Size**: Controls the maximum size of particles.
- **Min Transparency**: Controls the minimum transparency of particles.
- **Max Transparency**: Controls the maximum transparency of particles.
- **Falloff**: Controls the falloff rate of particle trails.
- **Colors**: Allows selection of up to three different colors for the particles.

### 2. Save and Load Configuration
- **Save Current Parameters**: Saves the current parameters to a JSON file (`user_preferences.json`).
- **Load Saved Parameters**: Loads parameters from the saved configuration file (`user_preferences.json`).
- **Reset to Default Parameters**: Resets parameters to the default configuration defined in `defaults.json`.

### 3. Real-time Updates
- Parameters can be adjusted in real-time using range sliders and color pickers. The particle simulation updates immediately to reflect changes.

### 4. Canvas Resizing
- The canvas resizes dynamically with the browser window to ensure the simulation fits the available space.

### 5. Tooltips for Parameter Changes
- **Tooltip Feature**: When hovering over the "Save Current Parameters" button, a tooltip appears displaying the current values from `user_preferences.json` and the new values that will be written to the file. This helps users understand the changes before saving.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/particle-accelerator.git
    ```
2. Navigate to the project directory:
    ```sh
    cd particle-accelerator
    ```
3. Open `index.html` in your preferred web browser.

## Usage

- Adjust the parameters in the sidebar using the provided range sliders and color pickers.
- Click "Save Current Parameters" to save your current configuration.
- Click "Load Saved Parameters" to load the previously saved configuration.
- Click "Reset to Default Parameters" to reset the configuration to the default values.

## Files

- **index.html**: The main HTML file that contains the structure of the application.
- **styles.css**: The CSS file that contains styles for the application.
- **script.js**: The JavaScript file that contains the logic for handling parameter adjustments, saving/loading configurations, and particle simulation.
- **defaults.json**: The JSON file that contains the default configuration parameters.
- **user_preferences.json**: The JSON file used to save and load user preferences.

## Contributing

Contributions are welcome! Please create a pull request or open an issue to discuss your ideas for improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

