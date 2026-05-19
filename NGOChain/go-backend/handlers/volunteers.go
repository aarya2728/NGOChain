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
)

func RegisterVolunteer(c *gin.Context) {
	var volunteer models.Volunteer
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	volunteer.ID = primitive.NewObjectID()
	volunteer.CreatedAt = time.Now()

	collection := database.GetCollection("volunteers")
	_, err := collection.InsertOne(context.TODO(), volunteer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register volunteer"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Volunteer registered successfully", "volunteer": volunteer})
}

func GetVolunteers(c *gin.Context) {
	collection := database.GetCollection("volunteers")

	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch volunteers"})
		return
	}
	defer cursor.Close(context.TODO())

	var volunteers []models.Volunteer
	if err = cursor.All(context.TODO(), &volunteers); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode volunteers"})
		return
	}

	c.JSON(http.StatusOK, volunteers)
}
