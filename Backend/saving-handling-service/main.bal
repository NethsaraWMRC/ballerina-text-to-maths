import ballerina/http;
import ballerinax/mongodb;
import ballerina/log;

type Document record {
    string title;
    string year;
};

type FindByIdRequest record {
    string id;
};


// MongoDB client to connect to the database
mongodb:Client mongoDbClient = check new ({
    connection: [mondbUri]
});

// Define a service with a base path for the API
service /document on new http:Listener(8000) {

    resource function post insertDocument(http:Caller caller, http:Request req) returns error? {

        // Access the database and collection
        mongodb:Database documentDb = check mongoDbClient->getDatabase("Ballerina");
        mongodb:Collection documentCollection = check documentDb->getCollection("AutoSave");

        // Parse the JSON payload from the request
        json|error movieJson = req.getJsonPayload();
        if (movieJson is error) {
            return caller->respond("Invalid JSON payload");
        }

        // Convert the JSON payload to the Movie record
        Document|error movie = movieJson.cloneWithType(Document);
        if (movie is error) {
            return caller->respond("Error parsing JSON to Document record");
        }

        // Insert the movie record into the MongoDB collection
        check documentCollection->insertOne(movie);

        // Send a success response
        check caller->respond("Document inserted successfully");
    }


    // GET method to retrieve all documents
    resource function get getAllDocuments(http:Caller caller, http:Request req) returns error? {
    // Access the database and collection
    mongodb:Database documentDb = check mongoDbClient->getDatabase("Ballerina");
    mongodb:Collection documentCollection = check documentDb->getCollection("AutoSave");

    // Define a default filter and options (empty filter to get all documents)
    map<json> filter = {};
    mongodb:FindOptions options = {};

    // Find all documents in the collection
    stream<Document, error?> documentStream = check documentCollection->find(filter, options, (), Document);

    // Collect all documents into a JSON array
    Document[] documentArray = [];
    error? e = documentStream.forEach(function(Document doc) {
        documentArray.push(doc);
    });
    if (e is error) {
        return caller->respond("Failed to retrieve documents");
    } else {
        // Close the stream after use
        check documentStream.close();
    }

    // Respond with the array of documents
    check caller->respond(documentArray);
    }


     resource function get findDoc(http:Caller caller, http:Request req) returns http:ListenerError?|error {
        // Access the database and collection
        mongodb:Database documentDb = check mongoDbClient->getDatabase("Ballerina");
        mongodb:Collection documentCollection = check documentDb->getCollection("AutoSave");

        // Get the JSON payload from the request
        json payload = check req.getJsonPayload();

        // Destructure the id from the payload
        string id = check payload.id;

      

        // Create a filter to find the document by its _id field
        map<json> filter = { "_id": id };

        mongodb:FindOptions options = {};

        // Find a single document in the collection
        Document|mongodb:DatabaseError|mongodb:ApplicationError|error? foundDocument = documentCollection->findOne(filter, options, (), Document);

        if (foundDocument is Document) {
            // Send the found document as the response
            check caller->respond(foundDocument);
        } else if (foundDocument is error) {
            // Log and respond with the error message
            log:printError("Error occurred while finding the document");
            return caller->respond("An error occurred while finding the document!");
        } else {
            // Handle the case where no document was found
            return caller->respond("Document not found or an error occurred!");
        }
    }







}

public function main() returns error? {
    log:printInfo("API server is running on http://localhost:8000");
}
