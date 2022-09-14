# Ročníkový projekt
  Zobrazení teřce a zásahu na obrazovce. Jako HW se využivá [SETA Target](https://www.seta-online.com/en-gb) terče.
### Webová aplikace využívající framework [Angular](https://angular.io/)

### To do:
  - zjistit propojení [HW](https://web.dev/serial/) s SW
  - vytvořit formulář na zadání parametrů uživatele
  - vytvořit zobrazení terče podle parametrů z formuláře
  - vytvořit výsledek po ukončení tréninku/soutěže
  - zdokrovat aplikaci

## Docker:
  ### Build Docker Image
    
    docker build -t test .
   
  ### Run Docker Container
   
    docker run -d -p 80:80 test:latest
