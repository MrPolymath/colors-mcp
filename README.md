# MCP to convert colors
Very simple, it exposes a tool that can convert a color from one format to another. It supports:
- hex
- rgb
- hsl
- hsv

## Using the MCP
The MCP is available at https://colors-mcp.vercel.app/api/sse

## Running Locally
To run locally:

- `pnpm dev`
- have a redis running locally
- setup your `.env` with the redis url (check `example.env`)
- the MCP is available in `localhost:3000/api/sse`

## Using with Cursor
To use with cursor, edit your `mcp.json` with:
```
"color-mcp": {
    "url": "https://colors-mcp.vercel.app/api/sse"
}
```