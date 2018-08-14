#!/usr/bin/env bash

# define certificate config file : ca.cnf

openssl genrsa -aes256 -out ca.key.pem 4096
# choose passphrase

openssl req -config ca.cnf \
      -key ca.key.pem -subj "/" \
      -new -x509 -days 9999 -sha256 -extensions v3_ca \
      -out ca.cert.pem
# give passphrase

openssl genrsa -aes256 \
      -out server.key.pem 2048
# choose passphrase

openssl req -config ca.cnf \
      -key ca.key.pem -subj "/" \
      -new -sha256 -out server.csr.pem
# give passphrase

openssl ca -config ca.cnf \
      -extensions server_cert \
      -days 375 -notext -md sha256 \
      -in server.csr.pem \
      -out server.cert.pem
# give passphrase



