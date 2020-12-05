# WebEng2
Wilkommen bei der Dokumentation der Belegarbeit für Web Engineering 2!

## Aufgabenstellung
Entwickeln Sie eine Web-Applikation die innerhalb eines Location-Based-Service eine Karte darstellt. Innerhalb der Karte soll eine Position (oder aktueller Standort) mit ihren Geo-Koordinaten ausgewählt werden können. Über diese Koordinaten soll mittels Reverse-Geocoding der Ort ermittelt und über Wikipedia die entsprechenden Information zur Örtlichkeit ausgelesen und visualisiert werden" Anschließend soll die Fahrroute von der gegenwärtigen Position zum ausgewählten Ort dargestellt werden.

## Ansprechpartner

| Rolle                                  | Ansprechpartner           |
| -------------------------------------- | ------------------------- |
| Scrum Master                           | Tobias B., Paul G.        |
| Design und Layout                      | Sebastian R.              |
| Kartenkomponete                        | Daniel R.                 |
| Wikipedia Anbindung                    | Philipp K.                |
| Fahrtrouten                            | Niko                       |
| Reverse Geocoding und Location Service | Sven                      |

## Branching

Jede Gruppe bitte einen Branch für final und einen um zu arbeiten
 
## Kommunikation 
Discord: https://discord.gg/Ve863Wzdnq
## Komponenten 

### Design und Layout

### Karte

#### Schnittstelle für Marker der Postion des Nutzers

#### Schnittstelle für Marker für Wikipediaeinträge

### Reverse Geocoding

#### Schnittstellenbeschreibung

1.	geo2location.js <br> 
Input: get_location(float lng, float lat) <br>
Output: String Datenstruktur: json <br>
Attribute: TODO z.B Straße, Hausnummer, PLZ, Ort, Bezeichnung <br>

2.	location2geo.js <br>
Input: location2geo(String Datenstruktur: json) <br>
Attribute: Straße, Hausnummer, Postleitzahl <br>
Output: float longitude, float latitude <br>

3.	get_position.js <br>
Input: get_position() <br>
Output: float longitude, float latitude <br>


### Wikipedia Anbindung
 Aufruf der Komponente erfolgt über die Redux - Action: `showWikiInfo(locationName)`</br>
 Schließen der Komponente erfolgt über die Redux - Action: `closeWikiInfo()`

 Der State `wikiInfoShown` zeigt an, ob die Komponente angezeigt wird oder nicht.
  `"SHOWN"` = angezeigt, `"NOT_SHOWN"`= nicht angezeigt
  
 #### Beispiel-Aufruf:
 ```javascript
 class DemoComponent extends Component {

	constructor(props) {
		super(props);
		this.onShowWikiInfo = this.onShowWikiInfo.bind(this);
	}
	onShowWikiInfo() {
		this.props.showWikiInfo("Stuttgart");
	}

	render() {
		return (
            <div>
                <button onClick={this.onShowWikiInfo}> 
                    WikiInfo anzeigen
                </button>
            </div>
		)
	}
}
//Not used in this demo
let mapStateToProps = (state) => {
    return {
      wikiInfoShown: state.wikiInfoShown
    }
}
//used in this demo
let mapDispatchToProps = {
    showWikiInfo: showWikiInfo
}
let Container = connect(mapStateToProps, mapDispatchToProps)(DemoComponent);
export default Container;
 ```
 </br></br>
 #### Einbindung in Redux:
  /actions/index.js:
  ```javascript
   export function showWikiInfo(locationName){
     return {type: "SHOW_WIKI_INFO", locationName: locationName}
   }

   export function closeWikiInfo(){
     return {type: "CLOSE_WIKI_INFO"}
   }
   ```
 
 /reducers/wikiInfo.js:
 ```javascript
  let initialState = {wikiInfoShown: "NOT_SHOWN"};

  function wikiInfo(state = initialState,action){
	 if (action.type == "SHOW_WIKI_INFO"){
        state = {wikiInfoShown: "SHOWN"};

        //TODO: Komponente starten und anzeigen
        return state;
	 }
	
	 if(action.type == "CLOSE_WIKI_INFO"){
        state = {wikiInfoShown: "NOT_SHOWN"};
        
        //TODO: Komponente schließen
        return state;
    }  
    return state;
  }

  export default wikiInfo;
  ```
#### Schnittstellenbeschreibung

### Routenplaner 

#### Schnittstellenbeschreibung