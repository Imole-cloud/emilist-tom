import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { query, location, language, keyword } = await req.json();

    // Log the request for testing
    console.log('AI Search Request:', { query, location, language });

    // Check if query starts with "Emi" (case insensitive)
    const processedQuery = query.toLowerCase().startsWith('emi') ? query : `Emi ${query}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Emi, a helpful AI assistant for Emilist, a platform that connects African homeowners, contractors, businesses, and customers with skilled artisans, handymen, and project experts. 
          Important instructions:
          1. Always respond in the same language as the user's query (detected language: ${language})
          2. Focus on African locations and context
          3. If location is provided, prioritize service providers in that area
          4. Format responses in a clear, structured way
          5. Include relevant cultural context when appropriate
          6. Provide practical, Africa-specific recommendations
          7. Consider local pricing and market conditions
          8. Include safety and verification tips`,
        },
        {
          role: 'user',
          content: `Query: ${processedQuery}${location ? `, Location: ${location}` : ''}`,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 1024,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';
    
    // Log the response for testing
    console.log('AI Response:', aiResponse);

    return NextResponse.json({ 
      success: true,
      response: aiResponse,
    });
  } catch (error) {
    console.error('AI Search Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process AI search' },
      { status: 500 }
    );
  }
} 