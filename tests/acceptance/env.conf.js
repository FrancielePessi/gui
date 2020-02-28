const env = {
    //Ambiente Kubernetes 
    //dojot_host: process.env.DOJOT_HOST || 'http://10.50.11.240:30001',
    //mqtt_host: process.env.MQTT_HOST || 'http://10.50.11.240:30002',
    
    // Ambiente localhost
    dojot_host: process.env.DOJOT_HOST || 'http://localhost:8000',
    mqtt_host: process.env.MQTT_HOST || 'http://localhost',

};

module.exports = env;
