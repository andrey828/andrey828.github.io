FROM gcc:latest
WORKDIR /app
COPY . .
RUN g++ -o processor processor.cpp
RUN gcc -o kernel kernel.c
CMD ["./processor"]

