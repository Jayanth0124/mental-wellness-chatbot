# AI Health - Mental Wellness Companion

## Setup Instructions

### OpenAI API Key Configuration

To use the AI features, you need to configure your OpenAI API key:

1. **Get your API key**:
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Click "Create new secret key"
   - Copy the generated key

2. **Configure the API key**:
   - Open the `.env` file in the root directory
   - Replace `your_openai_api_key_here` with your actual API key
   - The file should look like:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

### Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

### Troubleshooting

If you see the error "The OPENAI_API_KEY environment variable is missing":
- Make sure you've created the `.env` file in the root directory
- Ensure the API key is correctly formatted in the `.env` file
- Restart the development server after adding the API key

### Security Note

- Never commit your actual API key to version control
- The `.env` file is already included in `.gitignore`
- If you accidentally expose your API key, regenerate it immediately from the OpenAI dashboard
