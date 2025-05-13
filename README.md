# Arbitration Session Scheduler

## Overview

The Arbitration Session Scheduler is an innovative application specifically designed to streamline the management of arbitration sessions. It empowers arbitrators by providing tools to efficiently organize and conduct sessions with claimants and respondents, minimizing scheduling conflicts and ensuring timely notifications. With its user-centric design, the application enhances productivity and simplifies session management.

## Features

- **Custom Calendar Views**: Effortlessly switch between daily, weekly, and monthly calendar views to effectively manage your sessions at a glance.
- **Seamless Session Scheduling**: Book sessions with ease using available slots while entering critical details such as participant emails and case numbers to ensure a comprehensive scheduling process.
- **Comprehensive Booking Management**: Easily create, update, and cancel arbitration sessions, providing flexibility and control over the scheduling process.
- **Advanced Error Handling**: The intuitive interface provides real-time feedback for scheduling conflicts and validates inputs to prevent errors before they occur.
- **Optimized Performance**: Experience a fast and responsive interface, thanks to advanced optimization techniques and efficient state management, ensuring smooth operation even during peak usage.

## Getting Started

### Prerequisites

- Ensure Node.js and npm are installed on your machine to run the application effectively.

## Assumptions

The development of the Arbitration Session Scheduler is based on the following assumptions:

- **User Roles**: It is assumed that the primary users are arbitrators, with distinct roles and permissions tailored to their specific needs.
- **Cases as Primary Entities**: Cases are considered the central entities that require scheduling and management. Each case involves a claimant and a respondent and is linked to a specific arbitrator, underscoring the importance of precise and organized scheduling.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using npm:

   ```bash
   npm install
   ```

## Login

1. To access the application, use the following credentials:
```js
export const fakeUsers = [
    {
        email: "ayush@presolv360.com",
        password: "123456",
        name: "Ayush",
        role: "arbitrator",
        id: "1"
    },
    {
        email: "sameer@presolv360.com",
        password: "password123",
        name: "John Doe",
        role: "arbitrator",
        id: "2"
    },
]```


