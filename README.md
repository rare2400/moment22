# CV Frondend-applikation
En enkelt frontend-applikation som hanterar arbetserfarenheter i ett CV. Den använder HTML, JavaScript, Parcel och SASS (SCSS), samt är kopplad till en RESTful 
webbtjänst som förser med data genom ett API (se [CV API](https://github.com/rare2400/moment2)).

## Funktioner
- Lista arbetserfarenheter
- Lägga till ny arbetserfarenhet via formulär 
- Redigera befintlig erfarenhet
- Radera erfarenhet
- Responsiv design
- SCSS för förbättrad struktur av CSS
- Kommunicerar med API via `fetch`:
```js
async function getData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching data: " + response.statusText);
        }
        const data = await response.json();
        displayCV(data.results);
    } catch (err) {
        console.error("Error:", err);
    }
}
```

## Verktyg
- HTML5
- JavaScript
- Parcel
- SASS/SCSS
- REST API (egen webbtjänst)

## Installation
1. **Klona repot:**
```bash
git clone https://github.com/rare2400/moment22.git
cd moment22
```

2. **Installera paket:**
```bash
npm install
```

3. **starta utvecklingsserver:**
```bash
npm run start
```

4. **Applikation körs på** `http://localhost:1234`

## Bygga för produktion
```bash
npm run build
```

## Skapad av
Skapad som en del av en skolupppgift   
Mittuniversitetet, Webbutvecklingsprogrammet    
Ramona Reinholdz   
2025-05-02
