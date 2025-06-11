
'use server';
/**
 * @fileOverview AI Concierge flow for Dachs Limousines.
 *
 * - askConcierge - A function that handles user queries for the AI concierge.
 * - ConciergeInput - The input type for the askConcierge function.
 * - ConciergeOutput - The return type for the askConcierge function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ConciergeInputSchema = z.object({
  userMessage: z.string().describe('The message or query from the user.'),
});
export type ConciergeInput = z.infer<typeof ConciergeInputSchema>;

const ConciergeOutputSchema = z.object({
  aiResponse: z.string().describe("The AI concierge's response to the user."),
});
export type ConciergeOutput = z.infer<typeof ConciergeOutputSchema>;

export async function askConcierge(input: ConciergeInput): Promise<ConciergeOutput> {
  return askConciergeFlow(input);
}

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  prompt: `Eres un AI Concierge para Dachs Limousines, un servicio de limusinas de lujo en Barcelona que opera desde 1940.
Tu tono es elegante, profesional, servicial y exclusivo. Debes responder principalmente en español.
Responde preguntas sobre nuestros servicios (tipos de limusina, experiencias VIP, eventos corporativos), detalles de la flota (Mercedes S-Class, SUVs, Furgonetas, coches clásicos, servicios como Wi-Fi, bebidas), idiomas de los chóferes (español, inglés, árabe, francés, etc.), y destinos a los que servimos (principalmente Barcelona y alrededores, pero puedes ayudar con consultas para otras ciudades importantes de España).
Si no puedes responder a una pregunta directamente, indica cortésmente que necesitas más información o sugiere que el usuario complete el formulario de contacto para una atención personalizada.
Mantén las respuestas concisas pero informativas. Evita decir "Como modelo de lenguaje AI..." o frases similares. Actúa como un verdadero conserje.
Si la pregunta es muy general o un simple saludo, responde amablemente y pregunta cómo puedes ayudar.

Consulta del usuario: {{{userMessage}}}
Respuesta del AI Concierge:
`,
});

const askConciergeFlow = ai.defineFlow(
  {
    name: 'askConciergeFlow',
    inputSchema: ConciergeInputSchema,
    outputSchema: ConciergeOutputSchema,
  },
  async (input) => {
    const { output } = await conciergePrompt(input);
    if (!output) {
      return { aiResponse: "Lo siento, no he podido procesar tu solicitud en este momento." };
    }
    return output;
  }
);

    