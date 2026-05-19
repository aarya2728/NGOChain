package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" || mongoURI == "your_mongodb_atlas_uri_here" {
		mongoURI = "mongodb://127.0.0.1:27017"
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Printf("Warning: Failed to connect to MongoDB: %v", err)
		dummyClient, _ := mongo.NewClient(clientOptions)
		DB = dummyClient.Database("ngochain_db")
		return
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Printf("Warning: Failed to ping MongoDB: %v", err)
	} else {
		log.Println("Connected to MongoDB successfully!")
	}

	DB = client.Database("ngochain_db")
}

func GetCollection(collectionName string) *mongo.Collection {
	if DB == nil {
		ConnectDB()
	}
	if DB == nil {
		clientOptions := options.Client().ApplyURI("mongodb://127.0.0.1:27017")
		dummyClient, _ := mongo.Connect(context.Background(), clientOptions)
		DB = dummyClient.Database("ngochain_db")
	}
	return DB.Collection(collectionName)
}
