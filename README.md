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

1. [x] Minst 6 komponenter varav 2 är "statefulla"
- NewsFeed (stateful)
- FilterBar (stateful)
- ArticleCard
- ArticleHeader
- ArticleContent
- ArticleList
2. [x]React Router används för URL-uppdatering
3. [x]Git & GitHub har använts
4. [x]README.md fil finns
5. [x]Inlämning är i tid
6. [x]Muntlig presentation genomförd


##Krav för Väl Godkänt

7. [x]Alla G-krav är uppfyllda
8. [x]Styled Components används för CSS
9. [x]Data hämtas från Reddit API och Google Translate API