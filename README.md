# Stand Up Bot

> A form to publish daily Stand Ups on discord

## New Release (1.0.0) (sneak peek)

- Much improved rendering time!
- covid api shows lazy loading
- all users can now publish
- gradients background for border
- on admin page can toggle dev mode and reset session
- loading indicator on CRUD actions
- Tests!

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
