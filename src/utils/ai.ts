// Adding AI image generation functionality
export async function generateResponse(message: string): Promise<string> {
  const notificationStore = useNotificationStore.getState();

  // Simulate AI processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const normalizedMessage = message.toLowerCase();

  // Track user intent for analytics
  trackIntent(normalizedMessage);

  // AI Image Generation
  if (normalizedMessage.includes('generate image') || normalizedMessage.includes('show me')) {
    const imagePrompt = normalizedMessage.replace('generate image', '').replace('show me', '').trim();
    const imageUrl = await generateImageFromPrompt(imagePrompt);
    if (imageUrl) {
      return `🖼️ Here is the image based on your request: ${imageUrl}`;
    } else {
      return `❌ Sorry, I couldn't generate an image for that. Please try a different prompt.`;
    }
  }

  // General knowledge queries
  const knowledgeResponse = searchKnowledgeBase(normalizedMessage);
  if (knowledgeResponse) {
    return `💡 AI Integration Benefits:
- Automates repetitive tasks
- Enhances customer service
- Provides actionable insights

🔍 Need more details? Just ask!`;
  }

  // Services related queries
  if (normalizedMessage.includes('service') || normalizedMessage.includes('offer')) {
    notificationStore.addNotification({
      type: 'info',
      title: 'Services Inquiry',
      message: 'User asked about available services',
    });
    return `✨ Services We Offer:
1️⃣ AI Integration Basic: $89/month
2️⃣ One-Time Chatbot Setup: $599
3️⃣ Elite Red Carpet Service: $999/month

📌 Let me know which one interests you!`;
  }

  // Fallback response
  return `🤔 I’m not sure I understand. Can you rephrase or ask about something specific? I’m here to help!`;
}

async function generateImageFromPrompt(prompt: string): Promise<string | null> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();
    return data.data[0]?.url || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}