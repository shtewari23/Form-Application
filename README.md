# Multi-Step Form Application

A React-based multi-step form application that guides users through a series of forms to collect user information, validate inputs, and submit data to a backend API. The application includes responsive UI components, step navigation, and error handling.

## Features

- Multi-step form with three distinct forms
- Validation for each step using Yup
- Responsive design with Material UI and Tailwind CSS
- Integration with backend API for data submission
- Lazy loading for optimized performance

## Project Structure

### Components

1. **MultiStepForm**
   - Main component managing the stepper and form navigation.
   - Handles state management for form data and step transitions.
   - Renders `Form1`, `Form2`, and `Form3` based on the current step.

2. **Form1**
   - Collects email and password from the user.
   - Validates inputs using Yup and `react-hook-form`.

3. **Form2**
   - Collects first name, last name, and address.
   - Includes form validation and handles data submission to the next step.

4. **Form3**
   - Collects country code, phone number, and terms acceptance.
   - Handles final data submission and API integration.

5. **Posts**
   - Displays a list of posts fetched from an API.
   - Utilizes React memo and lazy loading for the `CardMedia` component and optimized rendering.

6. **SideInfo**
   - Provides additional information alongside the form.
   - Styled with a gradient background and icons to highlight features.

## How to Run the Application

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/multi-step-form.git
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Development

1. **Start the Development Server**

   ```bash
   npm run dev

   ```

   This will start the application in development mode and open it in your default web browser.

2. **Navigate to the Application**

   Open http://localhost:5173/ in your browser to view the application.

### Production

1. **Build the Application**

   ```bash
   npm run build
   # or
   yarn build
   ```

   This will create a production-ready build of your application in the `build` directory.



