# Stand Up Bot

> A form to publish daily Stand Ups on discord

## Architecture

This app is build on:

- React JS
- Hasura GraphQL
- Netlify functions

## SETUP

To run the app, you need create an `.env` file and copy the keys from `.env.sample` and fill in the values.

## GC Awards intergration

- [x] add a table for GC awardee
- [x] the GC app receives the token to mutate Hasura server
- [x] on receive mutation, Hasura calls discord webhook to post in Discord
