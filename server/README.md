<h1 align="center">KenroX</h1>
<p align="center">The ultimate grind system for warriors, Train Smarter with AI — Get Your Personalized Fitness & Diet Plan for Free.</p>


---

# 🔧 (API/SERVER) Setup

### 1. 📦 Install Dependencies

```bash
cd server
npm install
```

### 2. ⚙️ Environment Variables

##### Create a `.env` file in the `server` directory and add the following variables:

```env
PORT=                       # Port number (e.g., 5000)
CLIENT_URL=                 # Your frontend URL (e.g., http://localhost:5173)

GOOGLE_GEMINI_API_KEY=             # Gemini AI API key
MONGO_URI=                  # Your MongoDB connection string

CLOUDINARY_CLOUD_NAME=      # Cloudinary cloud name
CLOUDINARY_API_KEY=         # Cloudinary API key
CLOUDINARY_API_SECRET=      # Cloudinary API secret

GOOGLE_CLIENT_ID=           # Google Client Id (for google authentication)
GOOGLE_CLIENT_SECRET=       # Google CLient Secret (for google authentication)
GOOGLE_CALLBACK_URL=        # http://localhost:(PORT)/api/auth/google/callback (Make sure add the same url that you gave on google cloud platform)

JWT_SECRET=                 # Secret key for JWT authentication
```

### 3.📡 API Endpoints

## 🔐 User Endpoints:

<span style="color:green">**✅Craeting A New User:**</span>


- **URL**:              `/api/auth/signup`
- **Method**:           `POST`
- **Body**:             `fullname, email, password`
- **Credentials**:      `True`
- **Auth required**:    `No`

<span style="color:green">**🔓Login Existing User:**</span>

- **URL**:              `/api/auth/login`
- **Method**:           `POST`
- **Body**:             `email, password`
- **Credentials**:      `True`
- **Auth required**:    `No`

<span style="color:green">**🚪Logout User:**</span>

- **URL**:              `/api/auth/logout`
- **Method**:           `POST`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `(Optional)`

<span style="color:green">**✏️Update Existing User:**</span>

- **URL**:              `/api/auth/updateProfile`
- **Method**:           `PUT`
- **Body**:             `fullname(Optional), profile(Optional`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**👤Get Logged-In User Profile:**</span>

- **URL**:              `/api/auth/me`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

## 💪🏼 Plan Generate:

<span style="color:green">**📝Generate Plan:**</span>

- **URL**:              `/api/plan/generate`
- **Method**:           `POST`
- **Body**:             `age, height, weight, injuries, workout_days, fitness_goal, fitness_level`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📄Get Logged-In User's Plans:**</span>

- **URL**:              `/api/plan/getPlan`
- **Method**:           `GET`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**📤Activate Specific Plan:**</span>

- **URL**:              `/api/plan/active/:id` (It Requires Id Of plan That You Want To Activate)
- **Method**:           `PUT`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`

<span style="color:green">**🗑️Delete Specific Plan:**</span>

- **URL**:              `/api/plan/deletePlan/:id` (It Requires Id Of plan That You Want To Delete)
- **Method**:           `DELETE`
- **Body**:             `Null`
- **Credentials**:      `True`
- **Auth required**:    `Yes`


### 4. 🧪 Run Server

```bash
# For development
npm run dev

# For production
npm start
```

#### The server should now be running at: `http://localhost:(PORT)`

---

# 📌 Important Notes

- Ensure that `.env` files are properly configured in both the client and server folders.
- All external APIs and services (MongoDB, Gemini, Cloudinary) must be active and authorized.
- The application will not function correctly without valid API credentials.

---

# 🙌 Acknowledgements

#### Special thanks to the APIs and services that made this project possible:

- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [Cloudinary](https://cloudinary.com/)

#### Made with ❤️ by [Hammad Khatri](https://github.com/Hammad005)
