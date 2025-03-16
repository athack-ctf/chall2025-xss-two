# Running This Challenge

Build
```
docker build -t athack-ctf/chall2025-xss-two:latest .
```

Run
```
docker run -d --name xss-two \
  --hostname xss-two \
  -p 52053:2025 \
  --memory 300m \
  --cpus 0.12 \
  athack-ctf/chall2025-xss-two:latest
```
