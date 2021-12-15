#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>
/* GLOBAL VARS */
const char *ssid = "MOVISTAR_42BE";
const char *password = "yR4reQ59TUn5eggk2ieq";
const int analGPIO = 34;
float potValue = 0;
String output;

StaticJsonDocument<2048> doc;
JsonObject variables = doc.createNestedObject("variables");

/*EXECUTED AT START*/
void setup()
{
  delay(10);
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  Serial.print("Conectando...");
  while (WiFi.status() != WL_CONNECTED)
  { //Check for the connection
    delay(500);
    Serial.print(".");
  }
  
  Serial.print("Conectado con éxito, mi IP es: ");
  Serial.println(WiFi.localIP());
}

/*MAIN LOOP FOR THE APP*/
void loop()
{
  /*POTENCIOMETER ANALOG READING*/  
  potValue = analogRead(analGPIO);
  
  /*Check WiFi connection status IS WORKING*/
  if (WiFi.status() == WL_CONNECTED)
  {     
    HTTPClient http;
    /**
     * JSON CONFIG TO SEND
    */ 
    doc["dId"] = "tambure";       
    variables["humedad"] = potValue;
    variables["temp"] = "29";
    variables["bulb"] = true;
    /* JSON SERIALIZE AND SAVE IT IN OUTPUT*/
    serializeJson(doc, output);   
    
    /** SERVER API PATH **/
    http.begin("http://192.168.1.39:3000/api/data/tambure");
    
    /*WE SET THE HEADERS FOR THE PETITION, THIS IS KEY TO HAVE A GOOD DATA CORRELATION BETWEEN THE DEVICE AND THE SERVER*/
    http.addHeader("Content-Type", "application/json; charset=utf-8"); 

    /*WE SEND THE PETITION TO THE API AND RECOVER THE API RESPONSE*/
    int codigo_respuesta = http.POST(output); 

    /* RESOLVE THE PETITION RESPONSE*/
    if (codigo_respuesta > 0)
    {
      Serial.println("Código HTTP ► " + String(codigo_respuesta)); //Print return code
      
      if (codigo_respuesta == 200)
      {
        String cuerpo_respuesta = http.getString();
        Serial.println("El servidor respondió ▼ ");
        Serial.println(cuerpo_respuesta);
      }
    }
    else
    {
      Serial.print("Error enviando POST, código: ");
      Serial.println(codigo_respuesta);
    }
    http.end(); //libero recursos
  }
  else
  {
    Serial.println("Error en la conexión WIFI");
  }
  doc.clear();
  delay(5000);
}
