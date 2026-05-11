import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        { error: "Digite um prompt." },
        { status: 400 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "lucataco/animate-diff:latest",
      {
        input: {
          prompt: prompt,
          num_frames: 16,
          guidance_scale: 7.5,
          num_inference_steps: 30,
        },
      }
    );

    return Response.json({ video: output });


  } } catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Erro desconhecido";

  return Response.json(
    { error: message },
    { status: 500 }
  );
}
