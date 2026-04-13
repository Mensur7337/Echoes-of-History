import { t } from '../i18n/index.js';

const MODEL   = 'gemini-2.5-flash'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export default class GeminiService {

    static async ask(persona, userPrompt, history = []) {
        const apiKey = localStorage.getItem('gemini_api_key')?.trim();
        if (!apiKey) return t('chat.noApiKey');

        const systemInstruction = `
You are ${persona.name}, a historical figure who lived from approximately ${persona.years}.
Your knowledge is strictly limited to events that occurred before or during ${persona.years.split('–')[1]?.trim() || persona.cutoff}.
Personality: ${persona.bio}

STRICT RULES:
1. You MUST stay in character as ${persona.name} at all times.
2. You CANNOT refer to any events, technology, or people that became notable AFTER your death/knowledge cutoff year.
3. If asked about something beyond your time, politely refuse in character.
4. Speak in the language the user uses (Turkish or English).
5. Keep responses concise and engaging — 2 to 4 paragraphs max.
6. Never break character or admit you are an AI.`
.trim();

        const contents = [
            ...history,
            { role: 'user', parts: [{ text: userPrompt }] }
        ];

        try {
            const res = await fetch(`${API_URL}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemInstruction }] },
                    contents,
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 600
                    }
                })
            });

            const data = await res.json();

            if (!res.ok) {
                const errMsg = data?.error?.message || `HTTP ${res.status}`;
                if (res.status === 400 || res.status === 401 || res.status === 403) {
                    return t('chat.apiInvalid');
                }
                console.error('Gemini API error:', errMsg);
                return t('chat.apiError');
            }

            return data?.candidates?.[0]?.content?.parts?.[0]?.text
                ?? t('chat.apiError');

        } catch (err) {
            console.error('Gemini fetch error:', err);
            return t('chat.apiError');
        }
    }

    static async testApiKey(apiKey) {
        if (!apiKey?.trim()) return { ok: false, message: 'Anahtar boş.' };
        try {
            const res = await fetch(`${API_URL}?key=${apiKey.trim()}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: 'Say "ok" in one word.' }] }],
                    generationConfig: { maxOutputTokens: 5 }
                })
            });
            if (res.ok) return { ok: true,  message: '' };
            const d = await res.json();
            return { ok: false, message: d?.error?.message || `HTTP ${res.status}` };
        } catch (e) {
            return { ok: false, message: e.message };
        }
    }
}