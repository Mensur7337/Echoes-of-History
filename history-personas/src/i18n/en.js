export default {
  nav: { explore:"Explore", history:"History", login:"Log In", register:"Sign Up" },
  landing: {
    title:"Which historical figure would you like to speak with?",
    subtitle:"AI brings history's greatest minds to life. Choose one and start talking.",
    searchPlaceholder:"Search historical figures...",
    loginRequired:"You need to log in to start a conversation."
  },
  modal: {
    knowledgeLimit:"Knowledge Limit", knowledgeLimitValue:"Up to {{year}}",
    about:"About", startBtn:"Start Conversation", wikipedia:"Wikipedia", wikipediaLabel:"Sources",
  },
  chat: {
    newChat:"＋ New Chat", changePersona:"👥 Change Persona", settings:"⚙️ Settings",
    send:"Send", inputPlaceholder:"Message {{name}}...",
    greeting:"Greetings! I am {{name}}. Ask me anything about my life, my work, or the world as I knew it.",
    ttsOn:"Text-to-speech on", ttsOff:"Text-to-speech off",
    micOn:"Microphone active — speak...", micOff:"Voice input",
    newChatTitle:"New Chat",
    newChatMessage:"Your current conversation will be saved and a new chat will begin. Continue?",
    noApiKey:"Please enter your Gemini API key in Settings.",
    apiError:"Connection error. Check your API key and internet connection.",
    apiInvalid:"Invalid API key or quota exceeded.",
    knowledgeCapLabel:"📚 Up to {{year}}",
    writting:"Writes"
  },
  history: {
    title:"Conversation History", subtitle:"All your wise conversations through history.",
    empty:"You haven't started a conversation yet.", session:"Session {{n}}"
  },
  settings: {
    title:"Settings", appearance:"Appearance", dark:"🌙 Dark", light:"☀️ Light", auto:"🖥️ Auto",
    language:"Language", profile:"Profile Information", changePhoto:"Change Photo",
    firstName:"First Name", lastName:"Last Name", email:"Email", saveProfile:"Update Profile",
    profileSaved:"Profile updated!", ai:"AI Configuration",
    apiKeyLabel:"Gemini API Key", apiKeyPlaceholder:"Enter your API key here...",
    apiKeyHelper:"Your key is stored only on this device. Never sent to any server.",
    apiKeySave:"Save", apiKeySaved:"API key saved!",
    apiKeyTest:"Test Connection", apiKeyTestOk:"✅ Connection successful!",
    apiKeyTestFail:"❌ Failed: {{msg}}",
    session:"Session", logoutDesc:"You will be redirected to the login page after signing out.",
    logout:"Sign Out", logoutConfirm:"Are you sure you want to sign out?",
    danger:"Danger Zone", dangerDesc:"Your account will be permanently deleted.",
    deleteAccount:"Delete Account", deleteTitle:"Delete Account",
    deleteDesc:"Enter your email and password to confirm.",
    deleteConfirmBtn:"Yes, delete", deleteCancel:"Cancel", deleteError:"Credentials do not match!"
  },
  auth: {
    loginTab:"Log In", registerTab:"Sign Up", firstName:"First Name", lastName:"Last Name",
    email:"Email", password:"Password", profilePic:"Profile Photo (optional)",
    loginBtn:"Log In", registerBtn:"Create Account",
    invalidEmail:"Invalid email address.", loginError:"Incorrect email or password.",
    registerSuccess:"Registration successful! You can now log in.",
    registerError:"This email is already registered."
  },
  confirm: { yes:"Yes", no:"No" },
  notFound: { title:"This era has not yet been discovered.", button:"Back to Home" }
};
