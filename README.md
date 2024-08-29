# Pinderiku Streaming APP

## Table of Contents

- [Pinderiku Streaming APP](#pinderiku-streaming-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Built With](#built-with)
  - [Features](#features)
  - [Contact](#contact)

## Overview

[![Project Overview](/public/img/pinderiku-streamer-overview.jpg)](https://pinderiku.vercel.app/)

_Live demo can be found [here](https://pinderiku.vercel.app/)._

I made this project because I wanted to host the songs for my hobby musical project on an independent platform. While doing it I managed to improve my skills in Typescript, and TailwindCSS, since I was not familiarized with these as much as I was with the other technologies used.

There are a couple of little things that I was able to implement that were pretty cool:

- The Waveform.

![Waveform](/public/img/waveform.gif)

For this I used a package name [Wavesurfer.js](https://wavesurfer.xyz/), highly customized by myself for this project.

- The Sound Frequency Bars.

![Frequency Bars](/public/img/bars.gif)

For these I used two animated HTML canvas, mirrored vertically, to show the frequencies of the playing song.

- An animation on the song that is currently playing on the sidebar.

![Song Playing Animation](/public/img/song-playing.gif)

<!-- TODO:
    1. Describe my overall experience in a couple of sentences.
    2. List a few specific technical things that I learned or improved on.
    3. Share any other tips or guidance for others attempting this or something similar.
 -->

### Built With

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)](https://sass-lang.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

## Features

The app has all basic features of a song player. It can play, pause, skip songs, go forward/backwards on the current song, repeat functionality (repeat song, repeat all, no repeat) and volume control.

There are also individual pages for each song with a waveform synchronized with the bottom player:

![Individual Song Page](/public/img/individual-song-page.jpg)

and if the user clicks on the song's image on the right side of the page's waveform, a modal pops up so the user can see the image more clearly:

![Song Image Modal](/public/img/song-image.jpg)

At the moment the application only supports streaming of songs for one artist. Although it has support to sign in and register, these only allow the logged in user to like songs. I intend on expanding the app with more functionalities in the future, like user created playlists.

You can check what I'm currently working on for this project on [this Github project page](https://github.com/users/Whitthenstein/projects/5).

## Contact

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joao-m-branco/)

[My Portfolio Website](https://whitthenstein.vercel.app/)

<!-- TODO: Include icons and links to your RELEVANT, PROFESSIONAL 'DEV-ORIENTED' social media. LinkedIn and dev.to are minimum. -->
