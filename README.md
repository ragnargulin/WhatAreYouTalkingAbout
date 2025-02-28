# What R U Talking About?!

What R U Talking About?! är en React-applikation som visar inlägg från olika länders Reddit-forum och erbjuder översättning till engelska. Användaren kan filtrera inlägg efter region, sortera efter popularitet/datum och översätta innehållet.

[Live demo](https://whatareyoutalkingabout.netlify.app/)

## Funktioner
- Visar Reddit-inlägg från slumpmässigt valda länder
- Filtrering efter världsdelar
- Sortering efter popularitet eller datum
- Översättning till engelska
- Cachning av inlägg och översättningar

## Teknologier
- React med TypeScript
- Styled Components för styling
- React Router för URL-hantering
- Reddit API för inlägg
- Google Translate API för översättningar
- Session Storage för cachning

## Installation
Klona repot:
```bash
git clone https://github.com/ragnargulin/whatareyoutalkingabout.git
```

Installera dependencies:
```bash
npm install
```

Starta utvecklingsservern:
```bash
npm run dev
```



##Krav för Godkänt
[x] Minst 6 komponenter varav 2 är "statefulla"
- NewsFeed (stateful)
- FilterBar (stateful)
- ArticleCard
- ArticleHeader
- ArticleContent
- ArticleList
[x]React Router används för URL-uppdatering
[x]Git & GitHub har använts
[x]README.md fil finns
[x]Inlämning är i tid
[x]Muntlig presentation genomförd

##Krav för Väl Godkänt
[x]Alla G-krav är uppfyllda
[x]Styled Components används för CSS
[x]Data hämtas från Reddit API och Google Translate API