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

func RegisterNGO(c *gin.Context) {
	var ngo models.NGO
	if err := c.ShouldBindJSON(&ngo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ngo.ID = primitive.NewObjectID()
	ngo.CreatedAt = time.Now()
	ngo.IsVerified = false // Needs admin verification

	collection := database.GetCollection("ngos")
	_, err := collection.InsertOne(context.TODO(), ngo)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register NGO"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "NGO registered successfully", "ngo": ngo})
}

func GetNGOs(c *gin.Context) {
	collection := database.GetCollection("ngos")
	
	cursor, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch NGOs"})
		return
	}
	defer cursor.Close(context.TODO())

	var ngos []models.NGO
	if err = cursor.All(context.TODO(), &ngos); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode NGOs"})
		return
	}

	c.JSON(http.StatusOK, ngos)
}
