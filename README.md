# MCP to convert colors
Very simple, it exposes a tool that can convert a color from one format to another. It supports:
- hex
- rgb
- hsl
- hsv

## Running Locally
To run locally:

- `pnpm dev`
- have a redis running locally
- setup your `.env` with the redis url (check `example.env`)

## Using with Cursor
To use with cursor, edit your `mcp.json` with:
```
"color-mmcp": {
    "url": "http://localhost:3000/api/sse",
    "env": {
    "REDIS_URL": "redis://localhost:6379"
    }
}
```