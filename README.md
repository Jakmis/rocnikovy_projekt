# Ročníkový projekt
  Zobrazení teřce a zásahu na obrazovce. Jako HW se využivá [SETA Target](https://www.seta-online.com/en-gb) terče.
### Webová aplikace využívající framework [Angular](https://angular.io/)

### To do:
  - zjistit propojení [HW](https://web.dev/serial/) s SW
    - [Serial Port Monitor](https://www.com-port-monitoring.com/)
    - [Serial Port Package](https://serialport.io/)
    - [How to acces Serial Device](https://www.losant.com/blog/how-to-access-serial-devices-in-docker)
  - vytvořit formulář na zadání parametrů uživatele
    - [Template-Driven Form](https://timdeschryver.dev/blog/a-practical-guide-to-angular-template-driven-forms) 
  - vytvořit zobrazení terče podle parametrů z formuláře
  - vytvořit výsledek po ukončení tréninku/soutěže
  - zdokrovat aplikaci:
    - Vylepšit pomocí Docker Compose ✓
    - Automatizovat pomoci [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
  - Možné implementace:
    - [Redis](https://redis.io/)
    - [Kubernetes](https://kubernetes.io/)

## Docker Compose:
  ### Docker Compose Run
    docker compose up
    
    localhost:4200
