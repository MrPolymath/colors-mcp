import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import convert from "color-convert";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "convertColor",
      "Convert a color from one format to another (hex, rgb, hsl, hsv)",
      {
        color: z.string().describe("The color string to convert (e.g., '#RRGGBB', 'rgb(r,g,b)' or 'hsl(h,s,l)')"),
        fromFormat: z.enum(["hex", "rgb", "hsl", "hsv"]).describe("The format of the input color string"),
        toFormat: z.enum(["hex", "rgb", "hsl", "hsv"]).describe("The desired output format"),
      },
      async ({ color, fromFormat, toFormat }) => {
        try {
          let result: string | number[];
          const colorInput = fromFormat === "hex" ? color.replace("#", "") : JSON.parse(color);

          if (fromFormat === "hex") {
            if (toFormat === "rgb") {
              result = convert.hex.rgb(colorInput as string);
            } else if (toFormat === "hsl") {
              result = convert.hex.hsl(colorInput as string);
            } else if (toFormat === "hsv") {
              result = convert.hex.hsv(colorInput as string);
            } else {
              result = colorInput as string; // hex to hex
            }
          } else if (fromFormat === "rgb") {
            if (toFormat === "hex") {
              result = "#" + convert.rgb.hex(colorInput as [number,number,number]);
            } else if (toFormat === "hsl") {
              result = convert.rgb.hsl(colorInput as [number,number,number]);
            } else if (toFormat === "hsv") {
              result = convert.rgb.hsv(colorInput as [number,number,number]);
            } else {
              result = colorInput; // rgb to rgb
            }
          } else if (fromFormat === "hsl") { // hsl
            if (toFormat === "hex") {
              result = "#" + convert.hsl.hex(colorInput as [number,number,number]);
            } else if (toFormat === "rgb") {
              result = convert.hsl.rgb(colorInput as [number,number,number]);
            } else if (toFormat === "hsv") {
              result = convert.hsl.hsv(colorInput as [number,number,number]);
            } else {
              result = colorInput; // hsl to hsl
            }
          } else { // hsv
            if (toFormat === "hex") {
              result = "#" + convert.hsv.hex(colorInput as [number,number,number]);
            } else if (toFormat === "rgb") {
              result = convert.hsv.rgb(colorInput as [number,number,number]);
            } else if (toFormat === "hsl") {
              result = convert.hsv.hsl(colorInput as [number,number,number]);
            } else {
              result = colorInput; // hsv to hsv
            }
          }
          return {
            content: [
              { type: "text", text: `Converted color: ${toFormat === "hex" ? result : `${toFormat}(${result})`}` },
            ],
          };
        } catch (error: unknown) {
          let message = "Unknown error";
          if (error instanceof Error) {
            message = error.message;
          }
          return {
            content: [
              { type: "text", text: `Error converting color: ${message}` },
            ],
          };
        }
      }
    );
  },
  {
    capabilities: {
      tools: {
        convertColor: {
          description: "Convert a color from one format to another (hex, rgb, hsl, hsv)",
        }
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    basePath: "/api",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };