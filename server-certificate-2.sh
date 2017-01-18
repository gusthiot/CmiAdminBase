#!/usr/bin/env bash

# define certificate config file : ca.cnf

openssl genrsa -aes256 -out ca.key.pem 4096
# choose passphrase

openssl req -config ca.cnf \
      -key ca.key.pem \
      -new -x509 -days 9999 -sha256 \
      -out ca.cert.pem
# give passphrase

openssl genrsa -aes256 \
      -out server.key.pem 2048
# choose passphrase

openssl req -config ca.cnf \
      -key ca.key.pem \
      -new -sha256 -out server.csr.pem
# give passphrase

openssl ca -config ca.cnf \
      -days 375 -notext -md sha256 \
      -in server.csr.pem \
      -out server.cert.pem \
      -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial

























# define certificate config file : ca.cnf

openssl req -new -x509 -days 9999 -config ca.cnf -keyout ca-key.pem -out ca-crt.pem

openssl genrsa -out server-key.pem 4096

# define server config file : server.cnf

openssl req -new -config server.cnf -key server-key.pem -out server-csr.pem

openssl x509 -req -extfile server.cnf -days 999 -passin "pass:password" -in server-csr.pem -CA ca-crt.pem -CAkey ca-key.pem -CAcreateserial -out server-crt.pem