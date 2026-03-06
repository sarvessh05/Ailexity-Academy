from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import smtplib
from email.mime.text import MIMEText
import random
import os
import bcrypt
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
USERS_FILE = 'users.json'
OTP_STORAGE = {}  # Temporary storage: {email: {'otp': '123456', 'expires': datetime}}
# Secret key must match server.js if tokens are shared
SECRET_KEY = os.getenv('SECRET_KEY', 'change_this_secret_key_in_production')

# --- OAuth Configuration ---
from authlib.integrations.flask_client import OAuth
import jwt # pyjwt

app.secret_key = os.getenv('FLASK_SECRET_KEY', 'change_this_flask_secret_key_in_production')
# Session Config for Localhost Development
app.config['SESSION_COOKIE_SECURE'] = False  # Allow cookies over HTTP
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax' # fluctuating IP/Port can cause Strict to fail
app.config['PREFERRED_URL_SCHEME'] = 'http'
oauth = OAuth(app)

# Google Configuration
# GO TO: https://console.cloud.google.com/apis/credentials
app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID', 'your_google_client_id_here')
app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET', 'your_google_client_secret_here')

google = oauth.register(
    name='google',
    client_id=app.config['GOOGLE_CLIENT_ID'],
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# Facebook Configuration
# GO TO: https://developers.facebook.com/
app.config['FACEBOOK_CLIENT_ID'] = os.getenv('FACEBOOK_CLIENT_ID', 'your_facebook_client_id_here')
app.config['FACEBOOK_CLIENT_SECRET'] = os.getenv('FACEBOOK_CLIENT_SECRET', 'your_facebook_client_secret_here')

facebook = oauth.register(
    name='facebook',
    client_id=app.config['FACEBOOK_CLIENT_ID'],
    client_secret=app.config['FACEBOOK_CLIENT_SECRET'],
    access_token_url='https://graph.facebook.com/oauth/access_token',
    access_token_params=None,
    authorize_url='https://www.facebook.com/dialog/oauth',
    authorize_params=None,
    api_base_url='https://graph.facebook.com/',
    client_kwargs={'scope': 'email'},
)
# ---------------------------

# Helper to read users

def get_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

# Helper to save users
def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

# Send Email Function (Using Console Display for Testing)
# Send Email Function
def send_email(to_email, otp):
    """
    Sends the OTP to the specified email address using SMTP.
    If it fails (e.g., waiting for credentials), it falls back to printing to the console 
    so you can still proceed with testing.
    """
    # --------------------------------------------------------------------------
    # CONFIGURATION: Update these with your real email credentials
    # For Gmail: Use App Password (https://myaccount.google.com/apppasswords)
    # --------------------------------------------------------------------------
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = os.getenv('SMTP_EMAIL', 'your-email@gmail.com')
    SENDER_PASSWORD = os.getenv('SMTP_PASSWORD', 'your-app-password')
    # --------------------------------------------------------------------------

    try:
        # Create message container
        from email.mime.multipart import MIMEMultipart
        from email.mime.text import MIMEText

        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = to_email
        msg['Subject'] = "Your AILexity Academy Verification Code"

        body = f"""
        Hello,

        Your verification code for AILexity Academy is:

        {otp}

        This code is valid for 10 minutes.

        Regards,
        AILexity Academy Team
        """
        msg.attach(MIMEText(body, 'plain'))

        # Establish connection
        # Check if credentials are still default/placeholder
        if "your-email" in SENDER_EMAIL or "your-app-password" in SENDER_PASSWORD:
            raise ValueError("SMTP Credentials not configured in auth_server.py")

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, to_email, text)
        server.quit()

        print("="*50)
        print(f"✅ EMAIL SENT SUCCESSFULLY TO: {to_email}")
        print("="*50)
        return True

    except Exception as e:
        print("="*50)
        print(f"⚠️  EMAIL SENDING FAILED: {str(e)}")
        print(f"📧 (Fallback) OTP for {to_email}: {otp}")
        print("="*50)
        print("Check 'auth_server.py' lines 38-42 to configure your email credentials.")
        # Return True so the frontend doesn't break during testing/development
        # allowing the user to copy from console if email fails.
        return True

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email', '').strip().lower()
    
    if not email:
        return jsonify({'success': False, 'message': 'Email is required'}), 400
    
    users = get_users()
    user = next((u for u in users if u['email'] == email), None)
    
    if not user:
        # Security: Don't reveal if user exists or not, but for this app it might be fine to say "Email not registered" to be helpful
        return jsonify({'success': False, 'message': 'Email not registered'}), 404
        
    otp = str(random.randint(100000, 999999))
    expires = datetime.datetime.now() + datetime.timedelta(minutes=10)
    
    OTP_STORAGE[email] = {'otp': otp, 'expires': expires}
    
    if send_email(email, otp):
        return jsonify({'success': True, 'message': 'OTP sent successfully'})
    else:
        return jsonify({'success': False, 'message': 'Failed to send OTP'}), 500


# Data Files
ENROLLMENTS_FILE = 'enrollments.json'
ACTIVITIES_FILE = 'activities.json'

# --- Helpers ---
def load_json(filename):
    if not os.path.exists(filename):
        return []
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except:
        return []

def save_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/api/user/<user_id>/data', methods=['GET'])
def get_user_data(user_id):
    enrollments = load_json(ENROLLMENTS_FILE)
    activities = load_json(ACTIVITIES_FILE)
    
    # Filter for specific user
    user_enrollments = [e for e in enrollments if str(e.get('userId')) == str(user_id)]
    user_activities = [a for a in activities if str(a.get('userId')) == str(user_id)]
    
    return jsonify({
        'enrollments': user_enrollments,
        'activities': user_activities
    })

@app.route('/api/enroll', methods=['POST'])
def enroll_user():
    data = request.json
    enrollments = load_json(ENROLLMENTS_FILE)
    
    # Avoid duplicates
    if not any(e['userId'] == data['userId'] and e['courseId'] == data['courseId'] for e in enrollments):
        enrollments.append(data)
        save_json(ENROLLMENTS_FILE, enrollments)
        return jsonify({'success': True, 'message': 'Enrolled successfully'})
    return jsonify({'success': False, 'message': 'Already enrolled'})

@app.route('/api/activity', methods=['POST'])
def log_activity():
    data = request.json
    activities = load_json(ACTIVITIES_FILE)
    activities.append(data)
    save_json(ACTIVITIES_FILE, activities)
    return jsonify({'success': True})

# --- User Routes ---
@app.route('/verify-reset', methods=['POST'])
def verify_reset():
    data = request.json
    email = data.get('email', '').strip().lower()
    otp = data.get('otp')
    new_password = data.get('new_password')
    
    if not email or not otp or not new_password:
        return jsonify({'success': False, 'message': 'Missing fields'}), 400
        
    # Verify OTP
    stored_data = OTP_STORAGE.get(email)
    if not stored_data:
        return jsonify({'success': False, 'message': 'No OTP request found'}), 400
        
    if stored_data['otp'] != otp:
        return jsonify({'success': False, 'message': 'Invalid OTP'}), 400
        
    if datetime.datetime.now() > stored_data['expires']:
        return jsonify({'success': False, 'message': 'OTP expired'}), 400
        
    # Hash Password
    # Using bcrypt to match the Node.js implementation
    salt = bcrypt.gensalt(rounds=10)
    hashed = bcrypt.hashpw(new_password.encode('utf-8'), salt)
    hashed_str = hashed.decode('utf-8')
    
    # Update User
    users = get_users()
    user_index = next((i for i, u in enumerate(users) if u['email'] == email), -1)
    
    if user_index == -1:
        return jsonify({'success': False, 'message': 'User not found'}), 404
        
    users[user_index]['password'] = hashed_str
    save_users(users)
    
    # Clear OTP
    del OTP_STORAGE[email]
    
    return jsonify({'success': True, 'message': 'Password reset successfully'})

# --- OAuth Routes ---

# 0. SIMULATION ROUTES (Bypass API Keys)
@app.route('/api/auth/simulate/<provider>')
def simulate_login(provider):
    # Simulate a successful login for demo purposes
    fake_email = f"demo_user_{random.randint(100,999)}@{provider}.com"
    fake_name = f"Demo {provider.capitalize()} User"
    
    # Reuse the same processing logic
    return process_oauth_user(fake_name, fake_email, provider, None)

# 1. Google Login (Real)
@app.route('/api/auth/google')
def google_login():
    # Force the redirect_uri to be exactly what must be in Google Console
    redirect_uri = 'http://localhost:5000/api/auth/google/callback'
    print(f"DEBUG: Initiating Google Login with redirect_uri: {redirect_uri}")
    return google.authorize_redirect(redirect_uri)

@app.route('/api/auth/google/callback')
def google_callback():
    try:
        # Must pass same redirect_uri to fetch token
        token = google.authorize_access_token()
        
        # Use FULL URL for userinfo to avoid "No scheme supplied" errors
        # This endpoint provides standard OpenID Connect profile info
        resp = google.get('https://www.googleapis.com/oauth2/v3/userinfo')
        user_info = resp.json()
        
        email = user_info.get('email')
        name = user_info.get('name')
        picture = user_info.get('picture')
        
        print(f"DEBUG: Google Login Successful for {email}")
        return process_oauth_user(name, email, 'google', picture)
    except Exception as e:
        print(f"ERROR: Google Callback Failed: {e}")
        return f"Google Login Failed. Error: {str(e)} <br><a href='http://localhost:5000/login.html'>Back to Login</a>"

# 2. Facebook Login
@app.route('/api/auth/facebook')
def facebook_login():
    redirect_uri = url_for('facebook_callback', _external=True)
    return facebook.authorize_redirect(redirect_uri)

@app.route('/api/auth/facebook/callback')
def facebook_callback():
    try:
        token = facebook.authorize_access_token()
        resp = facebook.get('me?fields=id,name,email')
        user_info = resp.json()
        
        email = user_info.get('email')
        name = user_info.get('name')
        picture_data = user_info.get('picture', {}).get('data', {})
        picture = picture_data.get('url')
        
        # Facebook might not return email if user didn't grant permission or doesn't have one
        if not email:
            email = f"{user_info.get('id')}@facebook.com"
            
        return process_oauth_user(name, email, 'facebook', picture)
    except Exception as e:
         return f"Facebook Login Failed: {str(e)} <br><a href='http://localhost:5000/login.html'>Back to Login</a>"


def process_oauth_user(name, email, provider, picture):
    users = get_users()
    user = next((u for u in users if u['email'] == email), None)
    
    if not user:
        # Create new user
        user = {
            'id': str(random.randint(100000, 999999)),
            'name': name,
            'email': email,
            'password': f'oauth_{provider}_secure', # Placeholder, they won't use password login
            'enrolledCourses': [], # Initialize with empty courses
            'joinedDate': str(datetime.datetime.now()),
            'picture': picture # Store picture if available
        }
        users.append(user)
        save_users(users)
        print(f"DEBUG: Created new user {email}")
    else:
        print(f"DEBUG: User {email} exists. Logging in.")
        # Update picture if it wasn't there
        if picture and 'picture' not in user:
            user['picture'] = picture
            save_users(users)
    
    # Generate Token
    token_payload = {
        'id': user['id'],
        'email': user['email'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    
    token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')
    
    # Redirect to Frontend Dashboard with Token
    # We pass the FULL USER OBJECT (base64 encoded) to ensure the frontend updates immediately
    import base64
    user_json_str = json.dumps(user)
    user_b64 = base64.b64encode(user_json_str.encode('utf-8')).decode('utf-8')
    
    # Assuming the frontend is also served by this Flask app since we are in the same dir
    redirect_to = f"http://localhost:5000/student-dashboard.html?token={token}&data={user_b64}"
    
    return redirect(redirect_to)

from flask import url_for, redirect, send_from_directory

# --- STATIC FILE SERVING (Fix for "Site can't be reached") ---
@app.route('/')
def home():
    return send_from_directory('.', 'homepage.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    print("Starting Python Auth Server on port 5000...")
    app.run(port=5000, debug=True)
