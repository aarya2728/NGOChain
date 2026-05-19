package handlers

import (
	"context"
	"net/http"
	"ngochain-backend/database"
	"ngochain-backend/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func RecordDonation(c *gin.Context) {
	var record models.DonationRecord
	if err := c.ShouldBindJSON(&record); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	record.ID = primitive.NewObjectID()
	record.Timestamp = time.Now()

	collection := database.GetCollection("donations")
	_, err := collection.InsertOne(context.TODO(), record)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to record donation"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Donation recorded successfully", "record": record})
}

func GetDonations(c *gin.Context) {
	collection := database.GetCollection("donations")

	// Sort by newest first
	opts := options.Find().SetSort(bson.D{{Key: "timestamp", Value: -1}})
	cursor, err := collection.Find(context.TODO(), bson.M{}, opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch donations"})
		return
	}
	defer cursor.Close(context.TODO())

	var donations []models.DonationRecord
	if err = cursor.All(context.TODO(), &donations); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode donations"})
		return
	}

	c.JSON(http.StatusOK, donations)
}
