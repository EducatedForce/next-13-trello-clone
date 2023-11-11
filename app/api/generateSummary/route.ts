import {NextResponse} from "next/server";
import openai from "@/openai";

export const POST = async (request: Request) => {

  const {todos} = await request.json();


  const response = await openai.chat.completions.create(
    {
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      messages: [
        {
          role: "system",
          content: "When responding, welcome the user always as EducatedForce and say welcome to the Todo App! Limit the response to 200 characters",
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`
        }
      ],
      stream: false
    }
  );

  return NextResponse.json(response.choices[0].message);
};
