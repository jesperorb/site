---
title: Stockholm - Uppsala Commuter Info
description: Building a PWA that displays trafic info for trains between Stockholm and Uppsala.
date: 2023-04-10
tags:
  - TypeScript
  - Svelte
  - Trafikverket API
layout: post
---

## Intro 
Last spring I started commuting between Stockholm and Uppsala. To be able to see info more clearly about departures I built a small PWA that can be "installed" as a bookmark on your phone.

<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1rem">
  <img src="{{ '/img/sthlm-uppsala.png' | url }}" style="max-height: 500px;" alt="Screenshot of how the application looks like" />
</div>

**[Live site: sthlm-uppsala.vercel.app](https://sthlm-uppsala.vercel.app/)**.

## Features

- Easily reachable refresh button
- Easily reachable "Swap destination-origin" button
- Filter by "Only Movingo"
- Two layout modes: dense and normal (dense for smaller phones)
- Ability to select departure date and time freely

The app is built with Svelte and TypeScript.