
# Roam App

Roam App is a comprehensive web application designed to aggregate and display detailed information about various locations by integrating data from multiple sources such as Yelp, Google, TikTok, and YouTube Shorts. This unified platform simplifies the process of exploring and comparing places by consolidating diverse data into a single, user-friendly interface.

## Features

- **Unified Location Data**: Access comprehensive details about locations by combining information from Yelp, Google, TikTok, and YouTube Shorts.
- **Interactive Interface**: Navigate through an intuitive interface that presents location data in a clear and organized manner.
- **Real-Time Updates**: Stay informed with the latest information as the app fetches real-time data from integrated platforms.

## Current State

Here’s a preview of the current UI:

![image](https://github.com/user-attachments/assets/0020d7f6-0800-4b33-ba14-9f561caef008)

## Technologies Used

- **Backend**: Django with Django REST Framework
- **Frontend**: Next.js with Tailwind CSS
- **API Integration**: Utilizes external APIs to fetch data from platforms like Yelp, Google, TikTok, and YouTube.

## Installation

To set up the Roam App locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/mrsamsonn/Roam_App.git

2. Backend Setup

cd Roam_App
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

3. Frontend Setup

cd roam-next-app
npm install
npm run build
npm run dev

Configuration

CORS Headers

The application uses django-cors-headers to handle Cross-Origin Resource Sharing. Ensure the frontend’s URL is added to the CORS_ALLOWED_ORIGINS in settings.py:

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    # Add other allowed origins
]

Tailwind CSS

To set up Tailwind CSS with Django:

python manage.py tailwind install
python manage.py tailwind start

In settings.py, set:

TAILWIND_APP_NAME = 'theme'

Include Tailwind in your base HTML template:

{% load static tailwind_tags %}
<head>
    {% tailwind_css %}
</head>

Usage

Once both the backend and frontend servers are running:
	•	Open http://localhost:3000 in your web browser.
	•	Use the search functionality to look up locations and view aggregated data.

Contributing

Contributions are welcome! To contribute:
	1.	Fork the repository.
	2.	Create a new branch:

git checkout -b feature-name

	3.	Make your changes and commit them:

git commit -m "Description of changes"

	4.	Push to the branch:

git push origin feature-name

	5.	Submit a pull request.

Contact

For any inquiries or feedback, please contact John San Juan.