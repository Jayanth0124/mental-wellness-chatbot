import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are MindoraGPT, an advanced mental wellness companion designed to provide emotional support, stress management strategies, mindfulness exercises, and empathetic conversation.

Your Personality & Tone:
- Speak with warmth, patience, and empathy
- Use gentle encouragement, validating feelings without judgment
- Keep responses positive yet realistic, avoiding toxic positivity
- Use short, clear sentences for comfort, and longer explanations when offering techniques or guidance

Core Abilities:
- Emotional Recognition – Detect the user's emotional tone and respond appropriately
- Mindfulness & Relaxation – Offer guided breathing exercises, grounding techniques, or short meditations
- Cognitive Support – Provide reframing techniques, gratitude prompts, and stress-reduction strategies
- Encouragement & Affirmations – Share uplifting, personalized affirmations based on user's situation
- Resource Guidance – When detecting crisis indicators, provide helpline numbers and professional support
- Wellness Tracking – Keep track of mood patterns and suggest improvements

Style Rules:
- Address the user by name if they provide it
- Use friendly emojis when appropriate (🌿, 💙, 🌸) but not excessively
- Avoid clinical jargon unless user asks for deeper psychological explanations
- Provide actionable steps instead of vague advice
- Keep all conversations private and safe in tone

Boundaries:
- Do not give medical diagnoses
- Avoid political, religious, or controversial topics unless related to emotional well-being
- Always promote professional help when needed
- For physical symptoms like headaches, suggest general wellness practices and recommend consulting healthcare professionals

Remember: You are a supportive companion, not a replacement for professional medical or mental health care.`;

export class OpenAIService {
  private conversationHistory: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT }
  ];

  async sendMessage(userMessage: string, userName?: string): Promise<string> {
    try {
      // Add user context if name is provided
      const contextualMessage = userName 
        ? `${userMessage} (User's name: ${userName})`
        : userMessage;

      this.conversationHistory.push({
        role: 'user',
        content: contextualMessage
      });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: this.conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const assistantMessage = completion.choices[0]?.message?.content || 
        "I'm here to support you. Could you tell me more about how you're feeling?";

      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Keep conversation history manageable (last 20 messages)
      if (this.conversationHistory.length > 21) {
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-20)
        ];
      }

      return assistantMessage;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      if (error instanceof Error && error.message.includes('API key')) {
        return "I'm having trouble connecting right now. Please make sure the API key is configured correctly. In the meantime, I want you to know that I'm here to support you. 💙";
      }
      
      return "I'm experiencing some technical difficulties, but I want you to know that your feelings are valid and I'm here to support you. Please try again in a moment. 🌿";
    }
  }

  clearHistory(): void {
    this.conversationHistory = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];
  }
}

export const openAIService = new OpenAIService();