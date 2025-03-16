# Solution

## Injection

The `/calculator` page is vulnerable to a reflected client-side xss injection via the `dispaly` query parameter.

## Working Payload

```
http://localhost:52053/calculator?display=console.log(%22I_FOUND_AN_XSS!!!%22)*1
```
