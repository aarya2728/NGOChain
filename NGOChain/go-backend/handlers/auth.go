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
	"golang.org/x/crypto/bcrypt"
)

type AuthInput struct {
	Name          string `json:"name"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	Role          string `json:"role"`
	WalletAddress string `json:"walletAddress"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func RegisterUser(c *gin.Context) {
	var input AuthInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := database.GetCollection("users")

	// Check if user already exists
	var existing models.User
	err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&existing)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User with this email already exists"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	role := input.Role
	if role == "" {
		role = "User"
	}

	user := models.User{
		ID:            primitive.NewObjectID(),
		Name:          input.Name,
		Email:         input.Email,
		PasswordHash:  string(hashedPassword),
		Role:          role,
		WalletAddress: input.WalletAddress,
		CreatedAt:     time.Now(),
	}

	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully", "user": user})
}

func LoginUser(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := database.GetCollection("users")
	var user models.User
	err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"user":    user,
		"token":   "mock-jwt-token-" + user.ID.Hex(),
	})
}
